-- SQLite practice schema for the fictional restaurant reservation case.
-- Capacity policy assumption for learning: PENDING and CONFIRMED reservations occupy seats.
-- Confirm this rule with the business before using it in a real product.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS staff_user (
  staff_id INTEGER PRIMARY KEY,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('RECEPTIONIST', 'SHIFT_MANAGER', 'OWNER')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS availability_slot (
  slot_id INTEGER PRIMARY KEY,
  start_at TEXT NOT NULL UNIQUE, -- ISO 8601 with timezone, for example 2026-12-05T19:00:00+07:00
  capacity INTEGER NOT NULL CHECK (capacity >= 0),
  is_open INTEGER NOT NULL DEFAULT 1 CHECK (is_open IN (0, 1))
);

CREATE TABLE IF NOT EXISTS reservation (
  reservation_id INTEGER PRIMARY KEY,
  reservation_code TEXT NOT NULL UNIQUE,
  slot_id INTEGER NOT NULL REFERENCES availability_slot(slot_id),
  customer_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED')),
  note TEXT,
  created_at TEXT NOT NULL,
  CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS reservation_status_history (
  history_id INTEGER PRIMARY KEY,
  reservation_id INTEGER NOT NULL REFERENCES reservation(reservation_id),
  old_status TEXT CHECK (old_status IS NULL OR old_status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED')),
  new_status TEXT NOT NULL CHECK (new_status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED')),
  changed_by_staff_id INTEGER REFERENCES staff_user(staff_id),
  changed_at TEXT NOT NULL,
  reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_reservation_slot_status ON reservation(slot_id, status);
CREATE INDEX IF NOT EXISTS idx_reservation_created_at ON reservation(created_at);
CREATE INDEX IF NOT EXISTS idx_reservation_customer_name ON reservation(customer_name);
CREATE INDEX IF NOT EXISTS idx_history_reservation_changed_at ON reservation_status_history(reservation_id, changed_at);

-- Draft rule: pending and confirmed both consume capacity; rejected/cancelled do not.
CREATE VIEW IF NOT EXISTS slot_utilization AS
SELECT s.slot_id, s.start_at, s.capacity, s.is_open,
       COALESCE(SUM(CASE WHEN r.status IN ('PENDING', 'CONFIRMED') THEN r.party_size ELSE 0 END), 0) AS seats_occupied,
       s.capacity - COALESCE(SUM(CASE WHEN r.status IN ('PENDING', 'CONFIRMED') THEN r.party_size ELSE 0 END), 0) AS seats_remaining
FROM availability_slot s
LEFT JOIN reservation r ON r.slot_id = s.slot_id
GROUP BY s.slot_id, s.start_at, s.capacity, s.is_open;

-- Re-runnable seed for practice only: sample people and reservations are fictional.
INSERT OR IGNORE INTO staff_user(staff_id, display_name, role) VALUES
  (1, 'Lan Tran (sample)', 'RECEPTIONIST'),
  (2, 'Minh Le (sample)', 'SHIFT_MANAGER');

INSERT OR IGNORE INTO availability_slot(slot_id, start_at, capacity, is_open) VALUES
  (101, '2026-12-05T19:00:00+07:00', 10, 1),
  (102, '2026-12-05T19:30:00+07:00', 8, 1),
  (103, '2026-12-05T20:00:00+07:00', 0, 0);

INSERT OR IGNORE INTO reservation(reservation_id, reservation_code, slot_id, customer_name, phone, email, party_size, status, note, created_at) VALUES
  (1001, 'RSV-DEMO-001', 101, 'Nguyen An (sample)', '0900000000', 'an@example.test', 4, 'PENDING', 'Dataset giả', '2026-11-20T10:00:00+07:00'),
  (1002, 'RSV-DEMO-002', 101, 'Tran Binh (sample)', '0900000001', NULL, 2, 'CONFIRMED', NULL, '2026-11-20T10:10:00+07:00'),
  (1003, 'RSV-DEMO-003', 102, 'Le Chi (sample)', NULL, 'chi@example.test', 3, 'REJECTED', 'Slot đã đầy (sample reason)', '2026-11-20T10:20:00+07:00');

INSERT INTO reservation_status_history(reservation_id, old_status, new_status, changed_by_staff_id, changed_at, reason)
SELECT 1001, NULL, 'PENDING', NULL, '2026-11-20T10:00:00+07:00', 'Khách gửi yêu cầu (sample)'
WHERE NOT EXISTS (SELECT 1 FROM reservation_status_history WHERE reservation_id = 1001 AND new_status = 'PENDING');
INSERT INTO reservation_status_history(reservation_id, old_status, new_status, changed_by_staff_id, changed_at, reason)
SELECT 1002, NULL, 'PENDING', NULL, '2026-11-20T10:10:00+07:00', 'Khách gửi yêu cầu (sample)'
WHERE NOT EXISTS (SELECT 1 FROM reservation_status_history WHERE reservation_id = 1002 AND new_status = 'PENDING');
INSERT INTO reservation_status_history(reservation_id, old_status, new_status, changed_by_staff_id, changed_at, reason)
SELECT 1002, 'PENDING', 'CONFIRMED', 1, '2026-11-20T10:15:00+07:00', NULL
WHERE NOT EXISTS (SELECT 1 FROM reservation_status_history WHERE reservation_id = 1002 AND new_status = 'CONFIRMED');
INSERT INTO reservation_status_history(reservation_id, old_status, new_status, changed_by_staff_id, changed_at, reason)
SELECT 1003, NULL, 'PENDING', NULL, '2026-11-20T10:20:00+07:00', 'Khách gửi yêu cầu (sample)'
WHERE NOT EXISTS (SELECT 1 FROM reservation_status_history WHERE reservation_id = 1003 AND new_status = 'PENDING');
INSERT INTO reservation_status_history(reservation_id, old_status, new_status, changed_by_staff_id, changed_at, reason)
SELECT 1003, 'PENDING', 'REJECTED', 2, '2026-11-20T10:25:00+07:00', 'Slot đã đầy (sample reason)'
WHERE NOT EXISTS (SELECT 1 FROM reservation_status_history WHERE reservation_id = 1003 AND new_status = 'REJECTED');
