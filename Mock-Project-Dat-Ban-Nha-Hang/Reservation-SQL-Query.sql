-- Bài đầu tiên: xem sức chứa theo slot từ view trong fixture.
SELECT start_at, capacity, seats_occupied, seats_remaining
FROM slot_utilization
ORDER BY start_at;
