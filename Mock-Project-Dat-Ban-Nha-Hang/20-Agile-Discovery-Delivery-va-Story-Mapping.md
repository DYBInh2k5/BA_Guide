# 20 — Agile Discovery, Story Mapping và Delivery

## Mục tiêu

Bài này luyện cách biến business case thành lát cắt MVP nhỏ có thể kiểm chứng, cộng tác với Product Owner/design/engineering, và theo dõi tới khi release. Scrum là một framework; BA không chỉ “viết ticket” hay là người duy nhất sở hữu yêu cầu. Product Owner chịu trách nhiệm tối đa hóa giá trị sản phẩm và quyết định thứ tự backlog; BA giúp khám phá, phân tích, làm rõ và giữ thông tin dùng chung.

Case nhà hàng vẫn là mô phỏng. Không có sprint thật, velocity thật, stakeholder thật hay quyết định release.

## 1. Discovery trước delivery

### Discovery hỏi “có nên làm gì và vì sao?”

- Khách/nhân viên gặp vấn đề nào? Bằng chứng nào ủng hộ?
- Kết quả nào quan trọng và baseline đo ra sao?
- Hành vi/quy trình hiện tại và ngoại lệ là gì?
- Giải pháp nào rẻ/nhanh hơn build? Giả định quan trọng nào có thể sai?
- Prototype, usability test, data sample hoặc spike nào giúp giảm bất định nhanh nhất?

### Delivery hỏi “làm thế nào để tạo, kiểm thử và vận hành thay đổi?”

- Story có nhỏ và rõ để team estimate không?
- API/data/security/accessibility/dependency đã được xem xét chưa?
- Acceptance evidence, instrumentation và rollout/rollback đã rõ chưa?

Discovery và delivery tiếp diễn song song. Không cần chờ mọi chi tiết được biết mới bắt đầu; cần đưa uncertainty và quyết định có thể đảo ngược ra ánh sáng, rồi ưu tiên học điều rủi ro nhất.

## 2. Story Map cho luồng đặt bàn

Trục ngang là activities theo trải nghiệm; mỗi activity chứa task/story. Cắt ngang theo chiều dọc để chọn một lát cắt có giá trị end-to-end. Sơ đồ chỉnh sửa được: [20-Reservation-Story-Map.drawio](./20-Reservation-Story-Map.drawio).

| Khám phá | Tìm slot | Gửi yêu cầu | Xử lý tại nhà hàng | Nhận kết quả | Đến nhà hàng |
|---|---|---|---|---|---|
| Khách hiểu trạng thái và chính sách | Chọn ngày/giờ/số khách; xem availability | Nhập liên hệ; gửi; nhận mã PENDING | Lễ tân lọc queue; xác nhận/từ chối; ghi lý do | Nhận email; tra cứu lỗi gửi | Lễ tân đối chiếu booking và cập nhật show/no-show |
| Rủi ro/open question: tự xác nhận hay duyệt? | Đơn vị capacity? slot/timezone? | chống gửi trùng/idempotency? | quyền, SLA, conflict update? | email retry/fallback? | định nghĩa đến trễ/no-show? |

### Lát cắt đề xuất để kiểm chứng MVP

1. Staff nhập cấu hình giờ mở/capacity tối thiểu; phải có quy tắc rõ và kiểm tra giới hạn.
2. Khách gửi request hợp lệ; hệ thống trả mã và trạng thái `PENDING`.
3. Lễ tân xem queue và xác nhận/từ chối; lịch sử lưu actor/thời điểm.
4. Khách thấy kết quả và thông báo; lỗi gửi email không làm mất quyết định.
5. Đo thời gian xử lý, lỗi capacity, notification failure và completeness từ event có định nghĩa.

Không đặt show/no-show làm blocker trước khi sản phẩm có dữ liệu check-in đáng tin. Hủy tự phục vụ và SMS được tách khỏi MVP cho đến khi chính sách/giá trị được xác minh.

## 3. Slicing và refinement

Một story nhỏ nên tạo giá trị hoặc học được điều cụ thể, có thể demo và test độc lập. Nếu story gồm nhiều actor, nhiều quyết định hoặc nhiều hệ thống, chia theo workflow, business rule, happy/exception path hoặc capability. Tránh chia “frontend/backend” nếu mỗi nửa không thể kiểm chứng giá trị/hành vi.

### Ví dụ chia US-01

- **RES-01A — Validate thông tin form:** trường bắt buộc, định dạng, ngày quá khứ; AC và lỗi rõ.
- **RES-01B — Kiểm tra slot/capacity:** rule xác nhận, slot đóng/hết chỗ, hai request đồng thời; kỹ thuật thiết kế kiểm soát race.
- **RES-01C — Tạo request PENDING:** mã duy nhất, persist, chống duplicate khi retry hoặc nêu open question.
- **RES-01D — Hiển thị kết quả tạo:** chỉ hiện màn success khi response thành công; nếu timeout không khẳng định đã tạo hay chưa.

Slicing cuối cần team review để không tách làm hỏng logic giao dịch. Cập nhật `03-Requirements-Backlog.md`, use case, sequence và UAT cùng lúc để giữ traceability.

## 4. Event, artifact và cách BA cộng tác trong Scrum

| Hoạt động | BA đóng góp | Đầu ra hữu ích | Câu hỏi cần giữ rõ |
|---|---|---|---|
| Product discovery / stakeholder workshop | hỏi, tổng hợp, xác định evidence/gap | problem statement, map, assumption/evidence log | Ta đang giải vấn đề gì? Ai xác nhận? |
| Backlog refinement | làm rõ value, scope, AC, dependency, edge case | story/AC, link, open questions | Có thể estimate/test/demo được chưa? |
| Sprint planning | trả lời ngữ cảnh, scope và acceptance intent | sprint goal, selected work | Team có đủ capacity và dependency đã được xử lý? |
| Daily Scrum | tham gia khi cần phối hợp/ra quyết định; không biến thành báo cáo riêng cho BA | blocker/owner/action rõ | Ai cần quyết định gì để flow tiếp tục? |
| Sprint review | chuẩn bị scenario/người dùng, thu phản hồi trên increment | feedback, updated backlog | Demo có chứng minh outcome/hành vi không? |
| Retrospective | chia sẻ ma sát trong elicitation, AC, handoff | cải tiến cách làm có owner | Việc gì lặp lại khiến chất lượng/flow giảm? |
| Release/readiness review | xác minh quy trình, dữ liệu, support, metric, comms | checklist rollout, runbook, decision | Có thể rollback/giảm tác động nếu chỉ số xấu? |

BA không phải lúc nào cũng cần dự mọi meeting. Mục tiêu là đúng người tham gia đúng quyết định, không thêm họp nếu artifact/trao đổi bất đồng bộ đủ dùng.

## 5. Quality gates nhẹ

### Definition of Ready (team agreement, không phải luật Scrum)

- Outcome/actor và nguồn truy vết rõ.
- AC bao quát happy path, validation, quyền và ngoại lệ quan trọng.
- Data, dependencies, NFR và câu hỏi mở ảnh hưởng thiết kế được nêu.
- Test data/bằng chứng pass có thể xác định.
- Kích thước đủ nhỏ để team ước lượng và hoàn thành trong flow/sprint.

### Definition of Done (team agreement)

- Code/config đã review theo chuẩn team; test cần thiết hoàn tất.
- AC đạt; lỗi accessibility/security/performance liên quan được xử lý.
- Log/metric, tài liệu vận hành và nội dung khách dùng được cập nhật khi cần.
- Không có dữ liệu thật trong môi trường/lab nếu không được phép.
- Increment được demo; trạng thái story và evidence truy vết cập nhật.

Không dùng checklist để lách chất lượng: nếu blocker lớn chưa rõ, đưa câu hỏi/spike/discovery item, không viết AC mơ hồ để story trông “ready”.

## 6. Thay đổi giữa sprint và dependency

Nếu sponsor thêm SMS giữa sprint:
1. Ghi CR riêng; không lén chèn scope vào story đang làm.
2. Đánh giá mục tiêu sprint và tác động; PO/team quyết định thương lượng scope hoặc bảo vệ sprint goal.
3. BA kiểm tra privacy/consent, provider/chi phí, fallback, logging, AC, test và vận hành.
4. Ghi quyết định Deferred/Approved/Rejected và link impact; update baseline/backlog.

Nếu RES-02 bị chặn bởi API capacity: tạo dependency có owner/ngày cần; tìm phần song song có giá trị (rule workshop, prototype error state, API contract draft, test cases) và đánh dấu giả định. Không báo tiến độ “xong” khi dependency khiến hành vi chưa thể kiểm chứng.

## 7. Thước đo delivery — dùng có ngữ cảnh

- **Lead/cycle time:** thời gian từ lúc bắt đầu/được yêu cầu tới hoàn tất; dùng tìm bottleneck, không chấm điểm cá nhân.
- **Throughput:** số work item hoàn thành trong kỳ; cần giữ kích thước/loại item nhất quán.
- **WIP/blocked time:** công việc đang mở và thời gian chờ; xem dependency/handoff.
- **Defect escape/reopen:** lỗi phát hiện sau release hoặc item mở lại; phân tích chất lượng và nguyên nhân.
- **Outcome metric:** SLA, duplicate rate, show-up; đánh giá giải pháp, không phải productivity của dev.

Velocity là công cụ forecast nội bộ của team khi họ thống nhất estimation; không so giữa các team hoặc dùng làm mục tiêu cá nhân. Không tối ưu số ticket hoàn thành nếu value/quality giảm.

## 8. Tool lab theo đầu vào → thao tác → bằng chứng

| Công cụ | Thực hành trong case study | Evidence cần giữ |
|---|---|---|
| Jira | Tạo Epic/story trong project học tập có quyền; ghi AC/open question; link issue; board state phản ánh flow; filter blocked/ready | Issue key, links, history và demo evidence. Connector site đã có; nếu chưa có project được cấp quyền, luyện bằng CSV/Markdown staging |
| Confluence/Markdown | Ghi decision log, glossary, workshop notes đã ẩn dữ liệu, link từ page tới Jira | Owner/version/date, source và decision |
| FigJam | Chuyển story map từ draw.io, chạy affinity clustering, dot vote và assumptions | Board có legend, mục tiêu session, kết quả và người xác nhận |
| Figma | Prototype trạng thái PENDING, lỗi validation, capacity unavailable, staff decision | User flow, prototype link, review feedback và version |
| Postman | Test API happy/error/edge; lưu environment variable local không commit secret | Collection, response assertion, request ID/test case link |
| SQL/Excel | Kiểm tra record trạng thái, timestamp, duplicates; tổng hợp KPI | Query/sheet, data dictionary, sample lineage và caveat |
| draw.io | Cập nhật BPMN/sequence sau khi quyết định scope thay đổi | Version, legend, traceability và reviewer |

Tool click path đổi theo phiên bản và cấu hình workspace. Học theo outcome và artifact giúp kỹ năng chuyển được giữa Jira, Azure DevOps, Linear, Notion hoặc công cụ tương tự.

## Bài tập

1. Mở sơ đồ `.drawio` bằng diagrams.net, đánh dấu MVP cut và ít nhất 4 câu hỏi chưa có bằng chứng; sau đó thử chuyển bố cục sang FigJam.
2. Chia US-01 thành lát cắt demo được; chọn thứ tự dựa vào rủi ro/learning, không theo thói quen UI trước API.
3. Viết acceptance criteria cho timeout sau POST: làm sao xác định request đã được tạo chưa, tránh tạo duplicate, và thông điệp nào trung thực với khách?
4. Nếu sprint goal là giảm xử lý thủ công mà sponsor đề nghị SMS, hãy nêu lựa chọn scope/dependency và decision owner.
5. Chọn một metric flow và một outcome metric; giải thích không dùng chúng để đánh giá cá nhân/team theo cách nào.

## Đầu ra portfolio

Đính kèm story map có MVP cut, 2–3 story đã slice, link AC→test→evidence và decision log cho một thay đổi giữa sprint. Gắn nhãn artefact nào là mô phỏng và ghi công cụ nào thực sự đã thao tác.

