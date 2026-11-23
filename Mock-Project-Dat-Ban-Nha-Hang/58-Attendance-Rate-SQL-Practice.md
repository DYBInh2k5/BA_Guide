# 58 — Phân tích tỷ lệ khách đến bằng SQL

## Mục tiêu

Thực hiện cùng metric ở [bài 57 — Excel](./57-Attendance-Rate-Excel-Practice.md) bằng SQLite. Lab này luyện chuyển business definition thành filter và phép tổng hợp, đồng thời giữ nguyên caveat về dữ liệu chưa rõ.

## Lưu ý mô hình dữ liệu

Schema reservation hiện tại không có check-in/no-show. Vì vậy file SQL dưới đây tạo bảng fixture riêng `attendance_practice`, không sửa schema reservation cốt lõi và không giả vờ rằng hệ thống hiện đã ghi nhận khách đến. Dữ liệu không có PII và hoàn toàn giả lập.

## Thực hành

1. Mở `Attendance-Rate-Analysis-Lab.sql` trong SQLite/DB Browser for SQLite hoặc SQLite extension của VS Code.
2. Chạy script từ đầu. Đọc CTE `due_cohort` và đối chiếu từng điều kiện với định nghĩa trong bài 57.
3. Xác nhận kết quả: 8 booking xác nhận đã đến hạn; 4 attended, 2 no-show, 2 unknown; tỷ lệ theo outcome đã chốt là **66,7%**, coverage là **75%**.
4. Tự viết ba query được giao ở cuối file: tỷ lệ theo channel; danh sách unknown để đối soát; và phân tích tác động nếu coi unknown là no-show.
5. Gửi query, kết quả, và một đoạn giải thích ngắn cho mỗi bộ lọc. Chỉ sau đó xem workbook Excel để so chéo số liệu.

## BA cần diễn giải

- `attendance_rate` là tỷ lệ trong những booking có outcome đã chốt (`ATTENDED` hoặc `NO_SHOW`), không phải tỷ lệ của mọi booking đến hạn.
- `outcome_coverage` cho biết mức độ đầy đủ của trạng thái. Coverage thấp làm giảm độ tin cậy khi so sánh kênh hoặc thời kỳ.
- Coi `UNKNOWN` là `NO_SHOW` có thể làm tỷ lệ thấp giả tạo; loại unknown mà không báo coverage có thể làm kết quả trông tốt giả tạo.
- Phân tích theo channel chỉ có ý nghĩa nếu capture check-in và quy tắc phân loại giống nhau giữa các kênh.

## Bài tập nâng cao

Viết lại metric spec để stakeholder phê duyệt: xác định booking nào thuộc cohort nếu trạng thái booking hiện tại đã đổi sau slot, cutoff cập nhật no-show, grace period cho khách trễ, timezone, kênh walk-in và cách xử lý booking đổi lịch. Nêu query nào sẽ thay đổi theo từng quyết định. Không tự chọn business policy chỉ vì SQL dễ viết.

## Portfolio evidence

Lưu file query cá nhân, ảnh kết quả chạy, ngày chạy, phiên bản SQLite, định nghĩa KPI và caveat. Ghi rõ fixture là synthetic. Script mẫu và kết quả có sẵn không chứng minh bạn đã tự thao tác; hãy lưu bản sửa và giải thích được cohort/filter của chính mình.
