-- SQL evidence lab for BRULE-02. SQLite only; all rows below are synthetic.
-- Temporary tables live only for this database connection. No customer data is included.
-- COHORT-A groups two near-simultaneous requests for this exercise only.
-- The cohort window and PENDING hold behavior are not approved business rules.

DROP TABLE IF EXISTS temp.ba_lab_incoming_request;
DROP TABLE IF EXISTS temp.ba_lab_reservation_asof;
DROP TABLE IF EXISTS temp.ba_lab_capacity_snapshot;

CREATE TEMP TABLE ba_lab_capacity_snapshot (
    slot_id TEXT PRIMARY KEY,
    slot_start_at TEXT NOT NULL,
    capacity_seats INTEGER NOT NULL CHECK (capacity_seats > 0),
    walk_in_buffer_seats INTEGER NOT NULL CHECK (walk_in_buffer_seats >= 0),
    snapshot_at TEXT NOT NULL
);

CREATE TEMP TABLE ba_lab_reservation_asof (
    reservation_id TEXT PRIMARY KEY,
    slot_id TEXT NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0),
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED')),
    channel TEXT NOT NULL,
    snapshot_at TEXT NOT NULL
);

CREATE TEMP TABLE ba_lab_incoming_request (
    request_id TEXT PRIMARY KEY,
    slot_id TEXT NOT NULL,
    cohort_id TEXT NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0),
    channel TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status = 'PENDING')
);

INSERT INTO ba_lab_capacity_snapshot
    (slot_id, slot_start_at, capacity_seats, walk_in_buffer_seats, snapshot_at)
VALUES
    ('SLOT-20261127-1900', '2026-11-27T19:00:00+07:00', 16, 1, '2026-11-27T18:01:59+07:00');

INSERT INTO ba_lab_reservation_asof
    (reservation_id, slot_id, party_size, status, channel, snapshot_at)
VALUES
    ('EXIST-001', 'SLOT-20261127-1900', 5, 'CONFIRMED', 'ONLINE', '2026-11-27T18:01:59+07:00'),
    ('EXIST-002', 'SLOT-20261127-1900', 4, 'CONFIRMED', 'PHONE', '2026-11-27T18:01:59+07:00'),
    ('EXIST-003', 'SLOT-20261127-1900', 2, 'PENDING', 'IN_PERSON', '2026-11-27T18:01:59+07:00');

INSERT INTO ba_lab_incoming_request
    (request_id, slot_id, cohort_id, party_size, channel, created_at, status)
VALUES
    ('NEW-001', 'SLOT-20261127-1900', 'COHORT-A', 4, 'ONLINE', '2026-11-27T18:02:00+07:00', 'PENDING'),
    ('NEW-002', 'SLOT-20261127-1900', 'COHORT-A', 3, 'PHONE', '2026-11-27T18:02:05+07:00', 'PENDING');

-- Query 1: compare the combined incoming demand under two unresolved policies.
-- Capacity = 16, walk-in buffer = 1, existing CONFIRMED = 9 seats,
-- existing PENDING = 2 seats, new request demand = 7 seats.
WITH occupancy AS (
    SELECT
        slot_id,
        SUM(CASE WHEN status = 'CONFIRMED' THEN party_size ELSE 0 END) AS confirmed_seats,
        SUM(CASE WHEN status = 'PENDING' THEN party_size ELSE 0 END) AS pending_seats
    FROM ba_lab_reservation_asof
    GROUP BY slot_id
), demand AS (
    SELECT slot_id, cohort_id, SUM(party_size) AS incoming_seats
    FROM ba_lab_incoming_request
    GROUP BY slot_id, cohort_id
), scenario AS (
    SELECT
        c.slot_id,
        d.cohort_id,
        'Existing PENDING does not hold seats' AS policy_scenario,
        c.capacity_seats,
        c.walk_in_buffer_seats,
        o.confirmed_seats,
        o.pending_seats,
        d.incoming_seats,
        c.capacity_seats - c.walk_in_buffer_seats - o.confirmed_seats AS available_before_new_requests
    FROM ba_lab_capacity_snapshot c
    JOIN occupancy o ON o.slot_id = c.slot_id
    JOIN demand d ON d.slot_id = c.slot_id
    UNION ALL
    SELECT
        c.slot_id,
        d.cohort_id,
        'Existing PENDING holds seats' AS policy_scenario,
        c.capacity_seats,
        c.walk_in_buffer_seats,
        o.confirmed_seats,
        o.pending_seats,
        d.incoming_seats,
        c.capacity_seats - c.walk_in_buffer_seats - o.confirmed_seats - o.pending_seats AS available_before_new_requests
    FROM ba_lab_capacity_snapshot c
    JOIN occupancy o ON o.slot_id = c.slot_id
    JOIN demand d ON d.slot_id = c.slot_id
)
SELECT
    slot_id,
    cohort_id,
    policy_scenario,
    capacity_seats,
    walk_in_buffer_seats,
    confirmed_seats,
    pending_seats,
    incoming_seats,
    available_before_new_requests,
    CASE
        WHEN incoming_seats > available_before_new_requests
        THEN incoming_seats - available_before_new_requests
        ELSE 0
    END AS demand_shortfall_seats,
    CASE
        WHEN incoming_seats > available_before_new_requests THEN 'CAPACITY_CONFLICT_RISK'
        ELSE 'WITHIN_AVAILABLE_CAPACITY'
    END AS analysis_result
FROM scenario
ORDER BY policy_scenario;

-- Query 2: each incoming request fits alone against six seats, but the cohort
-- totals seven. This is a concurrency warning, not proof of actual overbooking.
WITH occupancy AS (
    SELECT slot_id, SUM(CASE WHEN status = 'CONFIRMED' THEN party_size ELSE 0 END) AS confirmed_seats
    FROM ba_lab_reservation_asof
    GROUP BY slot_id
)
SELECT
    r.request_id,
    r.slot_id,
    r.cohort_id,
    r.party_size,
    c.capacity_seats - c.walk_in_buffer_seats - o.confirmed_seats AS available_if_existing_pending_is_excluded,
    CASE
        WHEN r.party_size <= c.capacity_seats - c.walk_in_buffer_seats - o.confirmed_seats
        THEN 'FITS_ALONE'
        ELSE 'DOES_NOT_FIT_ALONE'
    END AS individual_result
FROM ba_lab_incoming_request r
JOIN ba_lab_capacity_snapshot c ON c.slot_id = r.slot_id
JOIN occupancy o ON o.slot_id = r.slot_id
ORDER BY r.created_at;

-- Review questions:
-- 1. Who approved the capacity unit, walk-in buffer, cohort window and PENDING policy?
-- 2. Does the real source include phone and in-person reservations and cancellations?
-- 3. What historical events are needed to reconstruct occupancy at each created_at?
-- 4. Do not label CAPACITY_CONFLICT_RISK as actual overbooking until outcome evidence exists.
