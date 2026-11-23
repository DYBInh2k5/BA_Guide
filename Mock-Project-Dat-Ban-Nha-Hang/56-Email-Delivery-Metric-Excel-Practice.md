# 56 — Đo tỷ lệ email gửi thất bại bằng Excel

## Mục tiêu

Thực hành cách BA định nghĩa metric trước khi trình bày một tỷ lệ, kiểm tra grain của dữ liệu, phân biệt lần gửi với thông báo duy nhất, và ghi giới hạn của kết luận.

## Workbook

Mở [workbook thực hành Email Delivery Metric](./outputs/notification-failure-rate-practice-20261123/Email-Delivery-Metric-Practice.xlsx). Sheet `Practice` có event log hoàn toàn giả lập, danh sách mã notification duy nhất, ô vàng để phân loại trạng thái cuối và điền phép tính. Sheet `Answer Key` chứa công thức, kết quả mẫu và phần diễn giải.

## Metric trong bài tập

- **Kỳ:** 01/11/2026–30/11/2026, theo event date trong fixture.
- **Grain:** một `Message ID` là một thông báo; retry là lần gửi bổ sung của cùng thông báo.
- **Mẫu số:** số Message ID duy nhất có ít nhất một lần gửi trong kỳ.
- **Tử số:** thông báo có trạng thái cuối `BOUNCED` hoặc `FAILED_PERMANENT` theo quy ước của fixture.
- **Tỷ lệ:** tử số / mẫu số.
- **Unknown:** `UNKNOWN_TIMEOUT` báo riêng; chưa coi là thành công hay lỗi chắc chắn.

Với fixture mẫu, có 10 thông báo, 3 lỗi xác định, 1 trạng thái chưa rõ. Tỷ lệ lỗi mẫu là 30%; tỷ trọng chưa rõ là 10%. Có 12 event lần gửi. Tỷ lệ event không `DELIVERED` chia cho tổng event là 50%, nhưng đây là metric ở grain lần gửi và không thay thế tỷ lệ lỗi theo notification duy nhất.

## Cách làm

1. Đọc log và nhóm theo `Message ID`.
2. Với mã có nhiều lần gửi, xác định trạng thái cuối từ chuỗi event; không tính mỗi retry thành một notification mới.
3. Phân loại status cuối trên sheet Practice bằng danh sách chọn.
4. Điền số notification duy nhất, số lỗi chắc chắn, tỷ lệ và số unknown vào các ô vàng.
5. Mở Answer Key để đối chiếu. Giải thích tại sao tỷ lệ 50% ở cấp event khác 30% ở cấp notification.
6. Trả lời hai câu hỏi phân tích: event giao nhận có chứng minh khách đã đọc không; cần evidence nào để đánh giá lợi ích của SMS?

## BA cần xác nhận trước khi dùng dữ liệu thật

Định nghĩa trạng thái cuối và loại lỗi; cách xử lý timeout chưa rõ; mã nào dùng để deduplicate; timestamp nào xác định kỳ; event log có bao phủ các kênh email hay không; ai được xem dữ liệu chi tiết và thời gian lưu. Ưu tiên báo cáo tổng hợp, tối thiểu hóa PII, và nhờ Privacy/Security review nếu cần truy cập log có định danh.

Tỷ lệ bounce/failure không chứng minh người nhận đọc email và không chứng minh SMS giải quyết vấn đề. Để đánh giá SMS, cần câu hỏi outcome, baseline đáng tin cậy, tiêu chí so sánh phù hợp, consent/opt-out, chi phí và cách xử lý gửi trùng/lỗi.

## Bằng chứng cá nhân cho portfolio

Sau khi tự làm trong một bản copy, ghi ngày chạy, thay đổi bạn làm, kết quả kiểm tra, và một giới hạn bạn phát hiện. Có thể viết:

> Tôi phân tích ___ event giả lập trong Excel, nhóm ___ Message ID, phân loại ___ trạng thái cuối và tính ___ / ___ = ___%. Tôi tách ___ timeout chưa rõ khỏi lỗi xác định và phát hiện tỷ lệ theo attempt không cùng grain. Dataset là dữ liệu học tập giả lập; tôi chưa dùng kết quả này để khẳng định hiệu quả vận hành hay lợi ích SMS.

Không ghi workbook mẫu hoặc phép tính do trợ lý chuẩn bị thành evidence cá nhân. Chỉ ghi nội dung bạn tự làm và có thể giải thích.
