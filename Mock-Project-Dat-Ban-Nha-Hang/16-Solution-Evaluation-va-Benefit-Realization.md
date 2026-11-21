# 16 — Đánh giá giải pháp và hiện thực hóa lợi ích

## Bài học: kiểm tra kết quả sau khi đưa giải pháp vào vận hành

**UAT** trả lời: sản phẩm có đáp ứng yêu cầu và quy tắc đã thống nhất không? **Đánh giá giải pháp** trả lời: sau khi dùng trong vận hành, kết quả kinh doanh có cải thiện không? UAT có thể đạt trong khi lợi ích không đạt, ví dụ nhân viên vẫn không cập nhật trạng thái hoặc dữ liệu ban đầu sai.

### Kế hoạch đo lường đề xuất

| Chỉ số | Định nghĩa/tử số và mẫu số | Nguồn/owner đề xuất | Nhịp xem | Mục tiêu charter |
|---|---|---|---|---|
| Xử lý trong 5 phút | Yêu cầu online có thời gian nhận→xử lý ≤5 phút / tổng yêu cầu online trong giờ hoạt động | Nhật ký sự kiện; quản lý vận hành | Hàng tuần | ≥90%, cần xác nhận |
| Tỷ lệ sự cố trùng lịch | Sự cố trùng / yêu cầu online; so sánh mức thay đổi tương đối giữa pilot và baseline | Sổ sự cố + booking; quản lý | Hàng tuần | Giảm 30%, cần xác nhận |
| Tỷ lệ khách đến | Booking đã đến / booking được xác nhận đã đến hạn | Trạng thái booking; lễ tân | Hàng tuần | ≥80% ban đầu, cần xác nhận |
| Vi phạm sức chứa | Số sự cố đặt vượt năng lực cấu hình | Booking + cấu hình; quản lý | Mỗi sự cố/tháng | 0 trong UAT; cần định nghĩa riêng cho vận hành |
| Tỷ lệ lỗi thông báo | Thông báo gửi lỗi / tổng lần gửi | Log email; hỗ trợ/IT | Hàng tuần | Chưa đặt mục tiêu |
| Độ đầy đủ dữ liệu | Booking có đủ trường bắt buộc / booking tạo ra | Booking; BA/owner dữ liệu | Hàng tuần | Chỉ số chẩn đoán, chưa đặt mục tiêu |

**Cần thống nhất trước khi đo:** định nghĩa “đã xử lý”, giờ hoạt động, một sự cố trùng lịch, booking đến hạn/no-show, nguồn dữ liệu chuẩn, múi giờ, cách loại dữ liệu thử nghiệm và người chịu trách nhiệm. Chỉ so sánh nhóm kênh và kỳ có cách ghi nhận tương đương.

### Đọc đúng mức thay đổi KPI

Dashboard giả lập minh họa tỷ lệ sự cố trùng lịch từ **3,05%** (baseline) xuống **1,52%** (pilot). Có hai cách diễn đạt khác nhau:

- **Chênh lệch tuyệt đối:** `1,52% − 3,05% = −1,53 điểm phần trăm`.
- **Giảm tương đối:** `(3,05% − 1,52%) / 3,05% ≈ 50,2%` so với baseline.

Nếu charter draft nói “giảm 30%”, cần ghi rõ đó là **giảm tương đối** hay **giảm 30 điểm phần trăm**; hai mục tiêu khác nhau rất lớn. Trong ví dụ workbook, con số giảm tương đối vượt 30%, nhưng đó chỉ là dữ liệu giả lập. Nó không chứng minh giải pháp đã gây ra thay đổi; phải kiểm tra denominator, định nghĩa incident, chất lượng ghi nhận và các yếu tố gây nhiễu trước khi trình bày lợi ích thực.

### Thiết kế so sánh và giới hạn

Workbook đi kèm chứa 56 ngày baseline và 56 ngày pilot giả lập. Đây chỉ là số liệu luyện công thức, không phải số liệu nhà hàng. So sánh trước/sau đơn giản chưa chứng minh quan hệ nhân quả: mùa vụ, khuyến mãi, thay đổi nhân sự, lượng khách hoặc chất lượng ghi nhận cũng có thể làm kết quả đổi. Trong thực tế, giữ định nghĩa chỉ số nhất quán, ghi lại thay đổi đồng thời, phân đoạn theo ngày/khung giờ/kênh nếu đủ mẫu, và cân nhắc nhóm đối chứng hoặc pilot theo giai đoạn.

### Cách dùng workbook

1. Mở tab `Dashboard`: đọc KPI baseline/pilot và chart; phần kết quả công thức không tự xác nhận mục tiêu draft.
2. Tab `Daily Data`: kiểm tra 112 bản ghi tổng hợp giả lập, mỗi dòng là một ngày; các số lượng là dữ liệu đầu vào.
3. Tab `Metric Guide`: xem định nghĩa, owner, cadence và câu hỏi chất lượng dữ liệu.
4. Thực hành Excel: lọc `Period`, tính tổng/tỷ lệ bằng `SUMIFS`, tạo PivotTable theo tuần, thêm slicer nếu Excel hỗ trợ, và so sánh chart theo kỳ. Không kết luận từ mẫu giả lập.

### Bài tập BA

- Viết lại định nghĩa “xử lý trong 5 phút” thành quy tắc đo có xử lý ngoại lệ ngoài giờ.
- Nêu 3 yếu tố gây nhiễu cho so sánh baseline/pilot và một cách giảm tác động.
- Nếu giảm trùng lịch nhưng tỷ lệ khách đến giảm, bạn sẽ hỏi thêm ai và xin thêm dữ liệu gì?
- Đề xuất quyết định **tiếp tục / điều chỉnh / dừng** cùng tiêu chí, owner và thời điểm review. Đừng chỉ nêu một con số; giải thích bằng chứng và độ tin cậy.

### Đầu ra cần đưa vào portfolio

Một trang kết quả gồm mục tiêu, định nghĩa KPI, nguồn dữ liệu, biểu đồ có baseline, phát hiện, giới hạn, khuyến nghị, quyết định của stakeholder và việc cần theo dõi tiếp. Ghi rõ số liệu nào là thực tế, số liệu nào là giả lập.
