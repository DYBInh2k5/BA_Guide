-- SQL lab: show-up rate for the fictional restaurant reservation case.
-- Separate learning fixture: the production-like reservation schema has no check-in outcome.
-- No customer PII is stored here. All rows are synthetic.

DROP TABLE IF EXISTS attendance_practice;
CREATE TABLE attendance_practice (
  booking_id TEXT PRIMARY KEY,
  slot_start TEXT NOT NULL, -- ISO 8601 local slot time with offset
  booking_status TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('ATTENDED','NO_SHOW','UNKNOWN','CANCELLED','PENDING')),
  channel TEXT NOT NULL,
  is_test INTEGER NOT NULL DEFAULT 0 CHECK (is_test IN (0,1)),
  note TEXT
);

INSERT INTO attendance_practice
  (booking_id, slot_start, booking_status, outcome, channel, is_test, note)
VALUES
 ('B-101','2026-11-02T18:00:00+07:00','CONFIRMED','ATTENDED','WEB',0,''),
 ('B-102','2026-11-03T19:00:00+07:00','CONFIRMED','NO_SHOW','PHONE',0,''),
 ('B-103','2026-11-04T18:30:00+07:00','CONFIRMED','ATTENDED','WEB',0,'Late 10m; grace rule needs approval'),
 ('B-104','2026-11-05T20:00:00+07:00','CONFIRMED','UNKNOWN','WEB',0,'No check-in update'),
 ('B-105','2026-11-06T18:00:00+07:00','CANCELLED','CANCELLED','PHONE',0,'Cancelled before slot'),
 ('B-106','2026-11-07T19:00:00+07:00','WALK_IN','ATTENDED','WALK_IN',0,'Outside reservation cohort'),
 ('B-107','2026-11-08T18:30:00+07:00','CONFIRMED','NO_SHOW','WEB',0,''),
 ('B-108','2026-11-10T18:00:00+07:00','CONFIRMED','ATTENDED','PHONE',0,''),
 ('B-109','2026-11-25T19:00:00+07:00','CONFIRMED','PENDING','WEB',0,'Future slot; outside period'),
 ('B-110','2026-11-12T19:00:00+07:00','CONFIRMED','ATTENDED','WEB',0,''),
 ('B-111','2026-11-13T18:30:00+07:00','CONFIRMED','UNKNOWN','PHONE',0,'No outcome recorded'),
 ('TEST-01','2026-11-15T18:00:00+07:00','CONFIRMED','ATTENDED','WEB',1,'Test record; exclude');

-- Fix the reporting window and as-of cutoff for reproducibility.
-- Cohort: confirmed reservations, slot in period, slot has passed, not test.
-- Unknown outcomes remain in due-cohort coverage but not in finalized show-rate denominator.
WITH due_cohort AS (
  SELECT *
  FROM attendance_practice
  WHERE slot_start >= '2026-11-01T00:00:00+07:00'
    AND slot_start <  '2026-11-21T00:00:00+07:00'
    AND slot_start <  '2026-11-23T00:00:00+07:00' -- as-of time includes update lag
    AND booking_status = 'CONFIRMED'
    AND is_test = 0
), counts AS (
  SELECT
    COUNT(*) AS due_confirmed_reservations,
    SUM(CASE WHEN outcome = 'ATTENDED' THEN 1 ELSE 0 END) AS attended,
    SUM(CASE WHEN outcome = 'NO_SHOW' THEN 1 ELSE 0 END) AS no_show,
    SUM(CASE WHEN outcome = 'UNKNOWN' THEN 1 ELSE 0 END) AS unknown_outcome
  FROM due_cohort
)
SELECT
  due_confirmed_reservations,
  attended,
  no_show,
  unknown_outcome,
  ROUND(1.0 * attended / NULLIF(attended + no_show, 0), 4) AS attendance_rate,
  ROUND(1.0 * (attended + no_show) / NULLIF(due_confirmed_reservations, 0), 4) AS outcome_coverage
FROM counts;

-- Exercise 1: calculate attendance_rate by channel, retaining the same eligibility rules.
-- Exercise 2: return every due reservation whose outcome is UNKNOWN for reconciliation.
-- Exercise 3: explain whether including unknown as NO_SHOW changes the business question.
