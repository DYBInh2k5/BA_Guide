# 17 — Change Control và Risk Management

## Mục tiêu học tập

BA cần xử lý yêu cầu thay đổi có kiểm soát: hiểu lý do, phân tích tác động, đưa ra lựa chọn và ghi quyết định. BA cũng giúp nhóm nhận diện bất định trước khi nó thành sự cố. Đây là ví dụ mô phỏng; chưa có stakeholder thật phê duyệt.

## Tình huống thay đổi giả định: thêm SMS xác nhận

Sau khi xem prototype, sponsor đề nghị gửi SMS xác nhận để giảm khách bỏ lỡ email. SMS từng được nêu ngoài MVP ở charter. Đây là **change request CR-01**, chưa phải yêu cầu được duyệt.

### Phiếu yêu cầu thay đổi

| Trường | Nội dung minh họa |
|---|---|
| ID / trạng thái | CR-01 / New — pending impact analysis |
| Người yêu cầu / ngày | Sponsor / ngày ghi nhận cần điền |
| Nhu cầu / bằng chứng | Muốn giảm khách không nhận được kết quả; cần xác minh bằng ticket hỗ trợ hoặc phỏng vấn, hiện chưa có dữ liệu |
| Đề xuất | Gửi SMS khi trạng thái booking chuyển sang xác nhận hoặc từ chối |
| Phạm vi hiện tại | MVP chỉ gửi email (BR/FR-06, US-03) |
| Ngoài phạm vi bị ảnh hưởng | SMS được nêu rõ là ngoài MVP trong charter |
| Quyết định | Chờ impact analysis và người có thẩm quyền; không tự động thêm vào sprint |

### Phân tích tác động cần làm trước quyết định

| Khía cạnh | Câu hỏi phân tích | Kết quả sơ bộ để xác minh |
|---|---|---|
| Giá trị | Vấn đề khách bỏ lỡ email xảy ra thường xuyên tới đâu? | Xin số liệu email bounce/open nếu hợp pháp, khiếu nại, phỏng vấn khách |
| Quy trình | Ai được phép gửi lại? Khách có thể từ chối SMS? | Quy tắc đồng ý, opt-out, số điện thoại sai và retry còn mở |
| Yêu cầu | FR/US/AC nào cần đổi? | FR-06/US-03; thêm trạng thái gửi SMS, lỗi, retry, nội dung và thời điểm |
| Dữ liệu & riêng tư | Có cơ sở xử lý số điện thoại và lưu log không? | Cần privacy/security review theo chính sách áp dụng; giảm dữ liệu nhạy cảm trong log |
| Hệ thống/API | Có nhà cung cấp SMS, giới hạn, timeout, webhook? | Chưa chọn provider; hỏi kỹ thuật về chi phí, SLA và sandbox |
| Vận hành | Ai theo dõi thất bại, xử lý khách không nhận? | Cần owner, runbook, cảnh báo và đối soát |
| Kiểm thử | Cần test nào mới? | Gửi thành công/lỗi, số sai, retry không gửi trùng, opt-out, trạng thái booking vẫn đúng |
| Lịch & chi phí | Có ảnh hưởng mốc MVP/ngân sách không? | Product/engineering ước lượng sau khi phạm vi rõ |
| Tài liệu & traceability | Tài liệu nào phải cập nhật? | Charter, backlog, API/data flow, sequence, UAT, hướng dẫn vận hành |

### Ví dụ AC và test cho lỗi gửi thông báo (draft để học)

Đây là AC ứng viên cho **lỗi xác định được** từ nhà cung cấp, không phải quyết định rằng SMS đã được duyệt hoặc retry đã được thiết kế. Ví dụ “provider trả số điện thoại không hợp lệ” có kết quả thất bại rõ; timeout không thuộc AC này vì provider có thể đã nhận/gửi dù hệ thống chưa nhận response.

**AC-CR01-NOTIFY-FAIL (draft):** Given booking đã ở trạng thái `CONFIRMED`, người nhận đã có consent hợp lệ, và provider trả về một lỗi gửi xác định, when hệ thống xử lý kết quả gửi, then trạng thái booking vẫn là `CONFIRMED`, lần gửi được ghi nhận là thất bại với loại lỗi phù hợp, và nhân viên có quyền có thể nhận biết cần follow-up mà không thấy đầy đủ số điện thoại trong log vận hành.

Các phần `FAILED`, loại lỗi, view cho nhân viên và cách mask dữ liệu là **đề xuất cần product/operations/privacy/security/engineering xác nhận** trước khi baseline. Nếu scope MVP vẫn chỉ có email, áp dụng cùng nguyên tắc “lỗi thông báo không rollback booking” ở US-03/UAT-08; không tự mở rộng sang SMS.

**Test design (chưa chạy):** dùng booking fixture `CONFIRMED`, consent hợp lệ và provider stub trả lỗi permanent `INVALID_RECIPIENT`; kích hoạt một lần gửi; kiểm tra booking vẫn `CONFIRMED`, attempt được lưu theo error category đã duyệt, và log/view tuân thủ quyền cùng quy tắc che dữ liệu. Chưa có actual result/evidence nên không được đánh dấu Pass.

**Dependency trước khi test/approve:** chốt provider error taxonomy (permanent vs transient vs timeout/unknown), nghĩa của trạng thái sent/delivered, quy tắc retry và chống gửi trùng, consent/opt-out, dữ liệu lưu/masking/retention, ai xử lý exception. Với timeout, cần case riêng: không khẳng định “chưa gửi”; thiết kế đối soát/idempotency trước khi retry để tránh thông báo trùng.

### Các lựa chọn cho người quyết định

1. **Từ chối hiện tại:** giữ MVP email; ghi lý do và đưa CR-01 vào change log để xem lại khi có bằng chứng.
2. **Hoãn sang phase 2:** giữ mốc MVP, tạo epic tương lai; đặt điều kiện xem lại và người chịu trách nhiệm.
3. **Chấp thuận có điều kiện:** chỉ sau khi xác minh consent/privacy, provider/chi phí, phạm vi kiểm thử, owner vận hành và có ước lượng tác động. Điều chỉnh baseline phạm vi/lịch chính thức.

BA phân tích và trình bày hệ quả; người có thẩm quyền quyết định theo governance đã thống nhất. Khi duyệt, ghi ngày, người quyết định, điều kiện, baseline mới và các artifact cần cập nhật.

## Quy trình change control

`Ghi nhận → Làm rõ nhu cầu → Phân tích tác động → Ước lượng lựa chọn → Quyết định → Cập nhật baseline & truy vết → Truyền thông → Kiểm tra triển khai`

Không xóa yêu cầu gốc. Giữ trạng thái rõ: New, Under Analysis, Approved, Rejected, Deferred, Implemented. Mỗi thay đổi phải truy từ mục tiêu/need tới yêu cầu, backlog item, thiết kế/API, test và bằng chứng nghiệm thu.

## Risk register mẫu

Xác suất và mức ảnh hưởng dưới đây là đánh giá ban đầu để học, không phải đánh giá của nhà hàng. Thang 1–5; điểm = xác suất × ảnh hưởng, cần hiệu chỉnh cùng stakeholder.

| ID | Rủi ro / nguyên nhân | P×I ban đầu | Tín hiệu cảnh báo | Phòng ngừa / ứng phó | Owner đề xuất | Liên kết |
|---|---|---:|---|---|---|---|
| R-01 | Sức chứa cấu hình không khớp sơ đồ bàn thực tế gây overbooking | 3×5=15 | Chênh số bàn trống với thực tế; UAT capacity fail | Workshop quy tắc; test slot cuối và request đồng thời; nếu xảy ra thì tạm khóa slot và đối soát | Quản lý + kỹ thuật | FR-03, UAT-05, CR-01 nếu thay quy tắc |
| R-02 | Lễ tân không cập nhật trạng thái do quy trình mới làm tăng thao tác | 3×4=12 | Booking quá hạn xử lý, queue backlog | Shadowing, usability review, đào tạo; escalation/ca trực hỗ trợ | Quản lý vận hành | US-02, KPI SLA |
| R-03 | Định nghĩa KPI không thống nhất hoặc timestamp thiếu làm sai kết luận | 3×4=12 | Nhiều nguồn cho ra tỷ lệ khác nhau, thiếu event | Chốt data dictionary, timezone, event và owner trước baseline; đánh dấu dữ liệu thiếu | BA + data owner | Bài 16, workbook |
| R-04 | Email lỗi/trễ khiến khách không biết booking được xác nhận | 3×3=9 | Bounce/failure tăng, khiếu nại | Theo dõi log, retry có giới hạn, hướng dẫn nhân viên tra cứu; đối soát thủ công | IT/support | US-03, UAT-08 |
| R-05 | Nhân viên thấy dữ liệu khách ngoài phạm vi quyền | 2×5=10 | Truy cập trái phép hoặc export bất thường | Role test, quyền tối thiểu, audit; thu hồi quyền và xử lý theo quy trình sự cố | Security/IT | NFR-02/04, UAT-09 |
| R-06 | Mở rộng SMS làm trễ MVP hoặc phát sinh chi phí ngoài dự toán | 3×4=12 | Provider chưa chọn, estimate vượt kế hoạch | Tách CR-01; ước lượng chi phí, consent, vận hành trước khi quyết định | Sponsor/product | Charter, CR-01 |

Rủi ro là điều chưa chắc chắn có thể xảy ra; issue là điều đã xảy ra và cần xử lý. Nếu R-01 trở thành overbooking thật, tạo issue, giữ liên kết tới risk ID để học từ nguyên nhân.

## Thực hành công cụ

- **Jira:** tạo CR-01 dạng issue/change request; liên kết epic/story/test; dùng trạng thái chờ phân tích, duyệt, hoãn. Nếu Jira chưa kết nối, thực hành trên bảng markdown/backlog hiện có.
- **Confluence hoặc tài liệu dự án:** lưu quyết định, phiên bản baseline và risk register có owner/ngày review.
- **FigJam:** workshop impact mapping: nhu cầu → actor → quy trình → hệ thống → dữ liệu → test → vận hành.
- **Excel:** thêm owner, ngày review, trạng thái, điểm P×I; lọc rủi ro cao và theo dõi trend. Điểm số giúp ưu tiên thảo luận, không thay phán đoán.
- **draw.io/Figma/Postman:** cập nhật sơ đồ, prototype hoặc API collection chỉ sau khi scope được duyệt; sau đó cập nhật traceability và UAT.

## Bài tập

Hãy viết quyết định đề xuất cho CR-01 bằng 4 phần: (1) lựa chọn, (2) bằng chứng còn thiếu, (3) impact lớn nhất, (4) ai phải approve. Sau đó chọn một risk và viết trigger cụ thể cùng hành động khi trigger xảy ra.

## Portfolio evidence

Đưa vào case study một change request đã phân tích, decision log (kể cả quyết định giả lập có nhãn), risk register và một ví dụ truy vết impact tới backlog/test. Không trình bày đánh giá giả lập như quyết định thật.
