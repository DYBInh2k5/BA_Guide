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
| Tỷ lệ sự kiện gửi không thành công | Sự kiện gửi có trạng thái khác `DELIVERED` / tổng sự kiện gửi; retry được tính là sự kiện riêng và `UNKNOWN_TIMEOUT` nằm trong tử số | Log email; hỗ trợ/IT | Hàng tuần | Chỉ số vận hành chẩn đoán; chưa đặt mục tiêu |
| Tỷ lệ thông báo thất bại cuối cùng (đề xuất) | Message ID duy nhất có trạng thái cuối `BOUNCED` hoặc `FAILED_PERMANENT` / Message ID duy nhất đã có ít nhất một lần thử gửi; báo cáo `UNKNOWN_TIMEOUT` riêng | Log email; hỗ trợ/IT | Hàng tuần | Chưa đặt mục tiêu; cần xác nhận quy tắc trạng thái cuối |
| Độ đầy đủ dữ liệu | Booking có đủ trường bắt buộc / booking tạo ra | Booking; BA/owner dữ liệu | Hàng tuần | Chỉ số chẩn đoán, chưa đặt mục tiêu |

**Cần thống nhất trước khi đo:** định nghĩa “đã xử lý”, giờ hoạt động, một sự cố trùng lịch, booking đến hạn/no-show, nguồn dữ liệu chuẩn, múi giờ, cách loại dữ liệu thử nghiệm và người chịu trách nhiệm. Chỉ so sánh nhóm kênh và kỳ có cách ghi nhận tương đương.

### Worked metric design — yêu cầu online bị ảnh hưởng bởi bản ghi trùng

Đây là **định nghĩa ứng viên để discovery**, chưa được Product/Operations phê duyệt:

| Thành phần | Định nghĩa ứng viên | Cần xác nhận |
|---|---|---|
| Câu hỏi | Trong các yêu cầu đặt bàn online đủ điều kiện, bao nhiêu phần trăm bị ảnh hưởng bởi bản ghi trùng đã xác minh? | Stakeholder muốn đo số incident hay số yêu cầu/khách bị ảnh hưởng? Hai câu hỏi cần numerator khác nhau. |
| Grain | Một `request_id` duy nhất trong production; retry cùng logical request không tạo thêm đơn vị đếm nếu hệ thống có thể nhận diện. | Nguồn khóa ổn định và cách nối retry với request ban đầu. |
| Tử số | Số `request_id` duy nhất được Operations xác nhận thuộc một nhóm bản ghi trùng trong kỳ. | Định nghĩa “trùng”: cùng khách/slot, duplicate do retry, hay booking vượt capacity? Không gộp các tình huống này nếu chúng có nguyên nhân khác nhau. |
| Mẫu số | Tổng `request_id` online đủ điều kiện nhận trong cùng kỳ và cùng phạm vi vận hành. | Có tính request invalid, bị hủy hoặc không tạo booking không? Loại test/spam theo rule nào? |
| Unknown | Request đang điều tra hoặc thiếu liên kết incident được báo riêng; không tự gắn là trùng hay sạch. | Owner, thời hạn phân loại và cách báo classification coverage. |
| Nguồn / owner | Reservation/request ledger nối với incident log; Operations xác nhận incident, Product/business owner duyệt định nghĩa và cách dùng metric. | Nguồn nào là canonical, timezone, timestamp chọn kỳ và version định nghĩa. |

**Cảnh báo grain:** “số incident / số request” và “số request bị ảnh hưởng / tổng request” là hai metric khác nhau. Nếu một incident gồm ba request bị ảnh hưởng, metric theo incident đếm `1`, metric theo request bị ảnh hưởng đếm `3`. Chọn theo quyết định cần hỗ trợ, không theo dữ liệu nào dễ lấy hơn. Baseline và pilot phải dùng cùng định nghĩa, nguồn, kỳ và phạm vi trước khi so sánh.

Hai KPI email trên trả lời câu hỏi **vận hành gửi thông báo**, không chứng minh khách đã đọc/thấy email hay lợi ích kinh doanh đã tăng. Khi retry tạo nhiều dòng log, tỷ lệ theo sự kiện có thể khác tỷ lệ theo từng thông báo; vì vậy phải ghi rõ grain (đơn vị đếm), quy tắc chọn trạng thái cuối và cách xử lý trạng thái chưa xác định. Bài thực hành Excel dùng Message ID duy nhất và tách `UNKNOWN_TIMEOUT`; xem [Bài 56 — Thực hành KPI email bằng Excel](56-Email-Delivery-Metric-Excel-Practice.md). Muốn đánh giá kết quả cho khách hàng/nhà hàng, cần đo thêm chỉ số riêng như tỷ lệ khách xác nhận sau nhắc lịch hoặc tỷ lệ khách đến; phải xác định nguồn, mẫu số, kỳ đo và yếu tố gây nhiễu trước khi kết luận.

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
