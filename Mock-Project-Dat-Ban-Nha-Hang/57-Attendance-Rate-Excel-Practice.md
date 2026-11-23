# 57 — Định nghĩa và tính tỷ lệ khách đến bằng Excel

## Mục tiêu BA

Biến câu hỏi mơ hồ “khách đến bao nhiêu phần trăm?” thành metric có cohort, đơn vị đếm, kỳ đo, quy tắc trạng thái và giới hạn rõ ràng. Không gán booking chưa cập nhật thành no-show.

## Định nghĩa dùng trong lab

- **Đơn vị đếm (grain):** một booking đã xác nhận, không phải số khách hoặc số lượt check-in.
- **Cohort:** reservation có slot bắt đầu trong kỳ, đã qua thời gian chờ cập nhật, được xác nhận trước giờ bắt đầu và không phải bản ghi test.
- **Tử số:** số booking trong cohort có outcome cuối là `ATTENDED`.
- **Mẫu số:** số booking trong cohort có outcome cuối là `ATTENDED` hoặc `NO_SHOW`.
- **Tỷ lệ khách đến:** `ATTENDED / (ATTENDED + NO_SHOW)`.
- **Outcome chưa rõ:** giữ trong cohort coverage, báo riêng; không tự xếp là đến hoặc no-show.
- **Hủy trước slot, booking tương lai, walk-in và test record:** loại khỏi metric booking cohort này; có thể đo riêng nếu có câu hỏi nghiệp vụ phù hợp.

Đây là một định nghĩa luyện tập, chưa phải chính sách đã được stakeholder nhà hàng duyệt. Nếu nhà hàng muốn tính tỷ lệ trên mọi booking đã xác nhận, kể cả booking chưa cập nhật, phải nêu rõ đó là **tỷ lệ kết quả được ghi nhận** và theo dõi outcome coverage để tránh che giấu dữ liệu thiếu.

## Workbook thực hành

Mở [workbook Attendance Rate Practice](./outputs/attendance-rate-practice-20261123/Attendance-Rate-Practice.xlsx). Dữ liệu hoàn toàn giả lập cho kỳ 01–20/11/2026. Trên sheet `Practice`, tự đánh dấu các dòng được tính, ghi lý do loại/giữ, rồi điền số attended, no-show, unknown và phép tính. Chỉ mở `Answer Key` sau khi hoàn tất.

Kết quả tham chiếu của fixture là **4 / (4 + 2) = 66,7%**. Có thêm 2 booking đến hạn nhưng chưa có outcome; outcome coverage là **6 / 8 = 75%**. Hai tỷ lệ trả lời hai câu hỏi khác nhau. Một bản ghi đi trễ 10 phút được gắn `ATTENDED` trong fixture để nhắc rằng grace period phải do business owner xác nhận.

## Cách làm trong Excel

1. Chốt kỳ theo **giờ bắt đầu slot**, không dùng ngày nhân viên nhập trạng thái nếu hai trường này trả lời mục đích khác nhau.
2. Lọc slot trong kỳ và đã qua cutoff; loại test record, walk-in và booking bị hủy trước giờ bắt đầu theo định nghĩa lab.
3. Đếm booking `ATTENDED` và `NO_SHOW` riêng. Tách `UNKNOWN` để làm rõ vấn đề chất lượng dữ liệu.
4. Tính `ATTENDED / (ATTENDED + NO_SHOW)`; nếu mẫu số bằng 0 thì ghi `N/A`, không ghi 0%.
5. Tính outcome coverage: `(ATTENDED + NO_SHOW) / tổng booking đến hạn trong cohort`. Xem mức coverage trước khi so sánh tuần/kênh.
6. Ghi nguồn dữ liệu, thời điểm trích xuất, timezone, cutoff, bộ lọc, người xác nhận rule và giới hạn trước khi đưa vào dashboard/portfolio.

## Câu hỏi cần BA xác minh

- Khi nào booking được xem là `ATTENDED`: lễ tân check-in, khách đến bàn, hay dịch vụ bắt đầu? Có grace period cho khách trễ không?
- Hủy sau giờ bắt đầu, đổi giờ, booking nhiều lần sửa, khách đến một phần hoặc một booking nhiều người được xử lý thế nào?
- Ai cập nhật `NO_SHOW`, vào thời điểm nào? `UNKNOWN` bao lâu thì được đối soát?
- Slot dùng timezone nào; kỳ báo cáo chốt theo giờ nào; dữ liệu đồng bộ trễ bao lâu?
- Walk-in có cần KPI riêng? Không trộn walk-in vào tỷ lệ booking nếu mục đích là đánh giá reservation.
- Có được phân đoạn theo kênh không, và mỗi kênh có cách ghi trạng thái/check-in tương đương không?

## Bài tập portfolio

Viết một metric specification ngắn gồm tên, mục tiêu, grain, cohort, tử số, mẫu số, exclusions, unknown handling, nguồn, owner, cadence và ba câu hỏi cần stakeholder quyết định. Sau đó ghi một kết luận có điều kiện: “Trong fixture giả lập..., tỷ lệ là...; outcome coverage là...; chưa thể kết luận...”. Không trình bày dữ liệu lab như kết quả thật của nhà hàng.

**Đầu ra cá nhân cần review:** bản workbook tự làm hoặc ảnh vùng công thức + metric specification do bạn viết. Workbook mẫu/đáp án của trợ lý không phải evidence năng lực của học viên.
