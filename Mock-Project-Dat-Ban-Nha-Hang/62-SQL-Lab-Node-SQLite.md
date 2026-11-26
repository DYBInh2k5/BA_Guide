# 62 — Chạy SQL trên fixture đặt bàn bằng Node.js

## Mục tiêu

Tự chạy một truy vấn SELECT trên dữ liệu giả lập, đọc kết quả và giải thích giới hạn của kết luận BA. Runner dùng `node:sqlite` có sẵn trong Node.js 22.5 trở lên; không cần cài database server hay tạo file dữ liệu thật.

## Bắt đầu

Mở Terminal ở thư mục gốc của repo `BA_Guide`, rồi chạy:

```powershell
node .\Mock-Project-Dat-Ban-Nha-Hang\run-reservation-sql.mjs
```

Runner nạp schema và dữ liệu giả lập từ `Reservation-Practice.sql` vào database trong bộ nhớ, sau đó chạy nội dung trong `Reservation-SQL-Query.sql`. Nó chỉ chấp nhận một câu lệnh bắt đầu bằng `SELECT`; mỗi lần chạy lại bắt đầu từ fixture sạch. Cảnh báo Node.js cho biết `node:sqlite` còn experimental ở phiên bản này, không phải lỗi truy vấn.

## Bài thực hành

1. Ghi lại số dòng và `seats_remaining` của từng slot.
2. Sửa `Reservation-SQL-Query.sql` thành truy vấn liệt kê `reservation_code`, `party_size`, `status` cho các yêu cầu `PENDING`; chạy lại runner.
3. Thêm cột `start_at` bằng cách JOIN với `availability_slot`, rồi sắp xếp theo thời gian.
4. Đổi bộ lọc sang `CONFIRMED`. So sánh số chỗ với kết quả ban đầu.
5. Viết 2–3 câu: nếu `PENDING` không giữ chỗ thì còn chỗ theo giả định nào? Ai có thẩm quyền xác nhận quy tắc đó? Dữ liệu fixture chưa thể chứng minh điều gì về nhà hàng thật?

Gợi ý cho câu 2: nối `reservation` với `availability_slot` qua `slot_id`, lọc `status = 'PENDING'`. Hãy tự viết SELECT trước khi mở ví dụ ở bài [12 — Data modeling, SQL và Postman](./12-Data-Modeling-SQL-API.md).

## Bằng chứng học tập

Trong tracker, ghi ngày làm, câu SQL do bạn viết, kết quả quan sát, một giả định/chính sách cần xác nhận và điều bạn sửa sau khi xem kết quả. Chỉ đánh dấu đã thực hành sau khi chính bạn chạy và giải thích được truy vấn. Dữ liệu trong repo hoàn toàn giả lập; không đưa dữ liệu cá nhân thật vào bài.

Runner do trợ lý chuẩn bị; việc tạo runner không được tính là bằng chứng kỹ năng của người học.
