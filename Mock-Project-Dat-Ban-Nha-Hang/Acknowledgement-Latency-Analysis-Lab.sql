-- Synthetic practice fixture only. Not production data or proof of user execution.
-- Grain: one row per deduplicated reservation request.
-- Dedup policy is outside this lab and must be defined upstream.

DROP TABLE IF EXISTS acknowledgement_latency_practice;

CREATE TABLE acknowledgement_latency_practice (
    request_id TEXT PRIMARY KEY,
    channel TEXT NOT NULL,
    request_received_at TEXT NOT NULL,
    status_rendered_at TEXT,
    is_test INTEGER NOT NULL DEFAULT 0 CHECK (is_test IN (0, 1))
);

INSERT INTO acknowledgement_latency_practice
  (request_id, channel, request_received_at, status_rendered_at, is_test)
VALUES
  ('ACK-001', 'WEB',   '2026-11-02T18:00:00+07:00', '2026-11-02T18:00:04+07:00', 0),
  ('ACK-002', 'WEB',   '2026-11-03T19:10:00+07:00', '2026-11-03T19:10:07+07:00', 0),
  ('ACK-003', 'WEB',   '2026-11-04T11:15:00+07:00', '2026-11-04T11:15:09+07:00', 0),
  ('ACK-004', 'WEB',   '2026-11-05T20:20:00+07:00', NULL,                         0),
  ('ACK-005', 'WEB',   '2026-11-06T17:40:00+07:00', '2026-11-06T17:39:59+07:00', 0),
  ('ACK-006', 'PHONE', '2026-11-07T18:00:00+07:00', '2026-11-07T18:00:12+07:00', 0),
  ('ACK-007', 'PHONE', '2026-11-08T19:00:00+07:00', '2026-11-08T19:00:18+07:00', 0),
  ('ACK-008', 'PHONE', '2026-11-09T12:00:00+07:00', NULL,                         0),
  ('ACK-009', 'PHONE', '2026-11-10T18:30:00+07:00', '2026-11-10T18:30:06+07:00', 0),
  ('ACK-010', 'WEB',   '2026-11-11T18:00:00+07:00', '2026-11-11T18:00:02+07:00', 1),
  ('ACK-011', 'PHONE', '2026-10-31T23:59:59+07:00', '2026-11-01T00:00:03+07:00', 0);

-- Learner task:
-- 1) Define the eligible cohort with half-open local date range [Nov 1, Dec 1).
-- 2) Exclude test traffic. Do not treat missing end time as zero latency.
-- 3) Separate missing end timestamps from end-before-start invalid timestamps.
-- 4) Report eligible_count, complete_timestamp_count, valid_latency_count,
--    timestamp_completeness, valid_latency_coverage, missing_count, invalid_count.
-- 5) For valid latency only, calculate median and nearest-rank p90 by channel.
--    Median for an even count is the mean of the two central observations.
--    Nearest-rank p90 position is ceil(0.9 * n) = integer (9*n + 9)/10.
-- 6) Explain why fixture channel differences are not evidence of performance.
-- Write your own query before reading/running the worked query below.

WITH eligible AS (
  SELECT request_id, channel, request_received_at, status_rendered_at
  FROM acknowledgement_latency_practice
  WHERE is_test = 0
    AND julianday(request_received_at) >= julianday('2026-11-01T00:00:00+07:00')
    AND julianday(request_received_at) <  julianday('2026-12-01T00:00:00+07:00')
),
classified AS (
  SELECT *,
    CASE
      WHEN status_rendered_at IS NULL THEN 'MISSING_END'
      WHEN julianday(status_rendered_at) < julianday(request_received_at) THEN 'INVALID_NEGATIVE'
      ELSE 'VALID'
    END AS latency_quality,
    CASE
      WHEN status_rendered_at IS NOT NULL
       AND julianday(status_rendered_at) >= julianday(request_received_at)
      THEN (julianday(status_rendered_at) - julianday(request_received_at)) * 86400.0
    END AS latency_seconds
  FROM eligible
),
ranked AS (
  SELECT channel, latency_seconds,
         ROW_NUMBER() OVER (PARTITION BY channel ORDER BY latency_seconds) AS rn,
         COUNT(*) OVER (PARTITION BY channel) AS n
  FROM classified
  WHERE latency_quality = 'VALID'
),
latency_stats AS (
  SELECT channel,
         AVG(CASE WHEN rn IN ((n + 1) / 2, (n + 2) / 2)
                  THEN latency_seconds END) AS median_seconds,
         MAX(CASE WHEN rn = (9 * n + 9) / 10
                  THEN latency_seconds END) AS p90_seconds
  FROM ranked
  GROUP BY channel
),
quality AS (
  SELECT channel,
         COUNT(*) AS eligible_count,
         SUM(CASE WHEN status_rendered_at IS NOT NULL THEN 1 ELSE 0 END)
           AS complete_timestamp_count,
         SUM(CASE WHEN latency_quality = 'VALID' THEN 1 ELSE 0 END)
           AS valid_latency_count,
         SUM(CASE WHEN latency_quality = 'MISSING_END' THEN 1 ELSE 0 END)
           AS missing_count,
         SUM(CASE WHEN latency_quality = 'INVALID_NEGATIVE' THEN 1 ELSE 0 END)
           AS invalid_count
  FROM classified
  GROUP BY channel
)
SELECT q.channel,
       q.eligible_count,
       q.complete_timestamp_count,
       q.valid_latency_count,
       ROUND(1.0 * q.complete_timestamp_count / NULLIF(q.eligible_count, 0), 4)
         AS timestamp_completeness,
       ROUND(1.0 * q.valid_latency_count / NULLIF(q.eligible_count, 0), 4)
         AS valid_latency_coverage,
       q.missing_count,
       q.invalid_count,
       ROUND(s.median_seconds, 2) AS median_seconds,
       ROUND(s.p90_seconds, 2) AS p90_seconds
FROM quality q
LEFT JOIN latency_stats s ON s.channel = q.channel
ORDER BY q.channel;
