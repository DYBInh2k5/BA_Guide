# 61 — Từ metric tới decision brief

## Mục tiêu

Luyện cách chuyển phân tích metric thành một quyết định có thể review: nêu câu hỏi, evidence, giới hạn, lựa chọn, trade-off, người có thẩm quyền và bước kế tiếp. BA cung cấp phân tích và khuyến nghị; sponsor/Product owner quyết định scope/đầu tư.

Tình huống này dựa trên fixture acknowledgement latency ở [bài 60](./60-Acknowledgement-Latency-SQL-Practice.md). Dữ liệu hoàn toàn synthetic. Output SQLite hiện có do trợ lý chạy in-memory để đối chiếu, không phải dữ liệu khách hàng hoặc bằng chứng execution của người học.

## Decision brief mẫu

### Câu hỏi cần quyết định

Có nên đưa SMS vào MVP để giảm việc khách gọi hỏi tình trạng yêu cầu đặt bàn không?

### Tóm tắt evidence hiện có

- Stakeholder mô phỏng kể rằng có thể hai khách gọi hỏi trạng thái trong tuần; không có call log được xác nhận.
- Metric fixture có 9 request; valid latency coverage 60% WEB, 75% PHONE.
- Fixture không đo repeat inquiry, delivery, khách đọc/thấy trạng thái hoặc staff decision time.
- Event semantics, dedup/cohort/timezone, consent, provider, chi phí và owner vận hành còn mở.

## Discovery worksheet — phân biệt lý do khách hỏi trạng thái

### Giả thuyết cần kiểm tra

- **H1:** khách gọi vì không biết hệ thống đã nhận yêu cầu chưa.
- **H2:** khách gọi vì chưa biết yêu cầu đã được nhà hàng xác nhận bàn chưa.
- **H3:** khách gọi vì một nguyên nhân khác (ví dụ cần đổi thông tin, hỏi chính sách, hoặc staff chưa có thông tin để trả lời).

Các giả thuyết có thể cùng đúng. Mỗi cuộc gọi cần được phân loại theo điều khách hỏi đầu tiên và nội dung thực tế; không ép vào H1/H2 nếu chưa đủ dữ liệu.

### Câu hỏi phỏng vấn trung lập

**Với Operations/lễ tân**

1. “Trong lần gần nhất khách hỏi trạng thái, khách dùng từ nào hoặc hỏi điều gì đầu tiên?”
2. “Request khi đó đang ở trạng thái nào, được gửi lúc nào, ai đang xử lý?”
3. “Nhân viên đã trả lời/tra cứu bằng nguồn nào? Có workaround nào?”
4. “Có log hoặc mã request để đối chiếu không? Những trường hợp nào không được ghi?”

**Với khách hàng (nếu có research được duyệt)**

1. “Sau khi gửi yêu cầu, anh/chị mong điều gì xảy ra tiếp theo?”
2. “Thông tin nào lúc đó còn chưa rõ?”
3. “Anh/chị đã làm gì để tìm câu trả lời?”
4. “Điều gì khiến anh/chị biết việc đặt bàn đã được xác nhận?”

Tránh mở đầu bằng “Anh/chị có muốn nhận SMS không?” vì câu hỏi này mặc định giải pháp trước khi hiểu need.

### Call review log mẫu

| Case ID giả danh | Nguồn/ngày | Request state tại lúc gọi | Câu hỏi đầu tiên (đã khử định danh) | Phân loại | Evidence quality | Follow-up |
|---|---|---|---|---|---|---|
| CALL-SIM-01 | Role-play giả lập | Pending | “Nhà hàng đã nhận yêu cầu của tôi chưa?” | H1 candidate | Simulated, không phải customer evidence | Hỏi thời điểm gửi; đối chiếu state/timestamp |
| CALL-SIM-02 | Role-play giả lập | Pending | “Bàn đã được xác nhận chưa?” | H2 candidate | Simulated, không phải customer evidence | Hỏi staff approval delay và cách khách được báo |

Trong nghiên cứu thật, dùng ID giả danh, tuân thủ quyền truy cập/consent/retention của tổ chức, không lưu tên/số điện thoại vào portfolio. Nếu call log không có request ID, ghi rõ không thể nối case với lifecycle event.

### Cách tổng hợp mà không suy rộng quá mức

1. Chốt coding guide H1/H2/H3 và lựa chọn “không rõ/khác”; người review thứ hai kiểm tra một phần mẫu nếu phù hợp.
2. Ghi cohort, khoảng thời gian, channel, số cuộc gọi đủ điều kiện, số không phân loại được và tỷ lệ log có thể nối với request.
3. Báo counts và coverage trước; không gọi mẫu thuận tiện là đại diện toàn bộ khách.
4. Nếu cả H1/H2 vẫn chưa phân biệt được, quan sát thêm hoặc cải thiện logging; không chọn SMS chỉ vì sponsor đã đề xuất.
5. Chỉ sau khi need và outcome rõ mới so sánh status page, staff queue, email/SMS và quy trình/no-change.

**Ví dụ diễn giải giả lập:** “Trong 12 case được review trong một pilot nhỏ, 5 được phân loại H1, 4 H2, 2 H3 và 1 chưa rõ; 8/12 có thể nối với request record. Đây là mô tả mẫu pilot, không đại diện khách hàng và chưa chứng minh giải pháp nào hiệu quả.” Các số này chỉ minh họa cách viết, không thuộc fixture thật.

### Excel lab — tự coding 12 case giả lập

Dùng [workbook coding](./outputs/status-inquiry-coding-lab-20261126/Status-Inquiry-Coding-Practice.xlsx) hoặc [CSV nguồn](./Status-Inquiry-Coding-Practice.csv). Workbook có sheet Summary với linkage coverage và bảng đếm category × channel bằng công thức; sheet Coding practice có dropdown H1/H2/H3/Unknown, confidence, follow-up và trạng thái coding. Bảng đếm mô phỏng PivotTable bằng COUNTIFS/COUNTIF, không phải native PivotTable. Mọi case và câu hỏi đều hư cấu; không dùng làm bằng chứng customer research.

1. Lưu một bản copy riêng rồi mở bằng Excel.
2. Tự phân loại cột Analyst category thành H1, H2, H3 hoặc Unknown; ghi Confidence và Follow-up question. Đừng xem dòng trống là H3.
3. Đối chiếu bảng summary theo category/channel. Để luyện PivotTable gốc, tự Insert PivotTable từ sheet Coding practice và thêm category/channel vào Rows/Columns; đếm Case ID và Linked to request.
4. Tính capture/linkage coverage = case có request reference / tổng case. Báo unknown riêng; không bỏ khỏi báo cáo.
5. Viết 3 dòng insight: điều dataset mô tả, điều chưa thể suy ra, bằng chứng tiếp theo cần thu.

Đừng mở phần gợi ý trước khi phân loại xong:

<details>
<summary>Gợi ý tự đối chiếu (không phải đáp án duy nhất)</summary>

H1 candidate: CALL-SIM-01. H2 candidate: CALL-SIM-02, 08. H3 candidate: CALL-SIM-04, 06, 11, 12. Unknown/ambiguous: CALL-SIM-03, 05, 07, 09, 10. Câu 05 nói về thiếu tin nhắn nhưng chưa rõ khách muốn biết request đã được nhận hay quyết định booking; câu 09 “email xác nhận” cũng chưa nêu xác nhận tiếp nhận hay xác nhận bàn. Câu 03/10 gợi ý vấn đề submit/technical state nhưng chưa xác định persistence. Câu 07 không đủ nội dung để biết nhu cầu. Câu 11 là câu hỏi availability chung, không gắn request; có thể xếp H3 nếu coding guide cho phép ngoài-scope status inquiry hoặc đánh dấu out-of-scope riêng. Hãy ghi coding rule của bạn và follow-up thay vì coi đây là đáp án duy nhất.

Dataset có 12 case, 10 case có request reference (83,3% linkage coverage). CALL-SIM-07 và CALL-SIM-11 không có reference; “Unknown” về lý do và “unlinked” về reference là hai chiều phân loại khác nhau. Tỷ lệ này chỉ mô tả fixture 12 dòng; không gọi là coverage của khách hàng thật.

</details>

### Khuyến nghị BA

**Chưa nên phê duyệt SMS như giải pháp đã chứng minh hiệu quả.** Trước tiên, Product/Operations xác nhận need và cách capture call inquiry; Engineering/Data xác nhận event, coverage và khả năng instrument; Privacy/Operations rà consent, retention, failure handling. Có thể so sánh SMS với status page/email sau khi có mục tiêu, tiêu chí lựa chọn và evidence đủ tin cậy.

Khuyến nghị này không cấm một thử nghiệm có kiểm soát nếu authority quyết định thử; nó chỉ nói evidence hiện tại chưa chứng minh SMS giải quyết vấn đề.

### Lựa chọn và trade-off

| Option | Giá trị có thể có | Rủi ro/chi phí | Bằng chứng/điều kiện trước |
|---|---|---|---|
| A. Giữ nguyên, thu baseline | Chi phí thay đổi thấp; làm rõ tần suất và loại inquiry | Khách vẫn có thể không rõ trạng thái; logging tốn thời gian | Operations duyệt định nghĩa inquiry/capture; Data kiểm tra coverage |
| B. Làm rõ trạng thái trên web | Có thể giảm mơ hồ tại điểm khách vừa gửi request | Chỉ giúp người quay lại trang; cần privacy/access design nếu lookup | Product duyệt wording/state; UX review; Engineering xác nhận trạng thái nguồn |
| C. Thông báo email khi nhận request | Có thể tạo xác nhận ngoài trang | Delivery failure, email sai, consent/operational support | Chọn event trigger, provider, template, retry và owner |
| D. SMS khi nhận hoặc đổi trạng thái | Kênh trực tiếp, có thể hữu ích với khách không mở email | Cost, consent/opt-out, số điện thoại sai, duplicate/failure và support | Privacy/Legal theo quy trình tổ chức; Product/Operations duyệt trigger; Engineering đánh giá provider |

Không gán điểm số option khi chưa có tiêu chí/weights do decision owner xác nhận. Không coi “không làm gì” là mặc định vô hại; ghi rõ outcome và rủi ro tiếp tục.

## Decision log entry — trạng thái Open

| Trường | Nội dung |
|---|---|
| Decision ID | DEC-ACK-01 (ID học tập, chưa phải Jira key) |
| Decision | Chọn có đưa thông báo SMS vào scope hay tiếp tục discovery |
| Status | Open — chưa có authority thật/phê duyệt |
| Decision owner | Product Owner/Sponsor cần xác nhận |
| Contributors | Operations, Engineering, Data, Privacy |
| Evidence gap | Baseline inquiry, event validity/coverage, consent, cost, provider reliability, user preference |
| Recommendation | Hoãn quyết định scope; đóng evidence gaps trọng yếu trước hoặc thiết kế pilot có approval |
| Review trigger | Sau khi owner định nghĩa measurement plan và nhận baseline/pilot proposal |
| Trace | N-ACK → MET-ACK-01 → option analysis → DEC-ACK-01 → CR/backlog nếu được duyệt |

## Pilot readiness gate (đề xuất, không phải policy)

Trước khi đề xuất pilot, ghi rõ:

1. **Question:** pilot kiểm tra giả thuyết nào, ví dụ “thông báo lúc request được nhận làm giảm repeat status inquiry”?
2. **Population/unit:** người dùng/request nào được tính; cách xử lý request lặp và channel.
3. **Treatment/comparator:** thông báo nào, so với trạng thái hiện tại nào; phân bổ do ai duyệt.
4. **Primary outcome:** định nghĩa repeat inquiry, event source, grain, denominator và observation window.
5. **Guardrails:** sai thông báo, gửi trùng, opt-out/complaint, delivery failure, vận hành và privacy issue.
6. **Data quality:** timestamp completeness, valid coverage, missing/unknown và minimum evidence threshold do owner duyệt trước khi nhìn kết quả.
7. **Stop/rollback:** ai có quyền dừng, điều kiện dừng và cách xử lý khách đã nhận tin.
8. **Decision after pilot:** tiếp tục, điều chỉnh hay dừng; không tuyên bố nhân quả nếu thiết kế/mẫu không hỗ trợ.

Không tự đặt sample size, target reduction, SLA hoặc ngưỡng dừng trong bài tập. Các ngưỡng cần decision owner/analytics xác nhận dựa trên rủi ro và thiết kế đo lường.

## Bài tập người học

Tạo bản copy decision brief và:

1. Viết lại decision question trong một câu, không giả định SMS là lựa chọn duy nhất.
2. Phân loại từng thông tin thành reported / measured fixture / assumption / open decision.
3. Chọn một option bạn đề xuất để phân tích tiếp; nêu evidence nào có thể làm bạn đổi khuyến nghị.
4. Viết primary outcome và một guardrail cho pilot; ghi owner cần duyệt định nghĩa.
5. Điền DEC-ACK-01 với status Open, decision owner, evidence gap và review trigger.
6. Tạo một slide readout có finding → limitation → recommendation → decision request.
7. Soạn coding guide H1/H2/H3 và ghi cách xử lý cuộc gọi không rõ/không nối được với request.
8. Hoàn thành bản copy CSV, PivotTable và insight 3 dòng; lưu ảnh hoặc workbook cá nhân cùng ngày/tool/version.

### Rubric (0–2)

| Tiêu chí | Dấu hiệu mức 2 |
|---|---|
| Evidence | Không dùng fixture hoặc lời kể như dữ liệu thật |
| Options | Có no-change/discovery và ít nhất hai cách giải quyết need |
| Trade-off | Có benefit, cost/risk, dependency và điều kiện |
| Governance | Authority, status, contributors và review trigger rõ |
| Measurement | Outcome, grain, denominator, coverage và guardrail có owner |
| Communication | Tách finding, limitation, recommendation và decision request |

File mẫu/điểm do trợ lý điền không chứng minh năng lực cá nhân. Lưu bản tự làm và ghi tool, version, reviewer, feedback, phần AI hỗ trợ và phần bạn đã tự sửa.
