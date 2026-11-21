# 34 — Từ URD đến SRS và đặc tả chức năng

## Mục tiêu

Biết chọn mức tài liệu phù hợp, viết requirement đủ rõ cho Product/Engineering/QA, và nối nhu cầu người dùng qua giao diện, process, API, data và test. Đây là hướng dẫn thực hành; tên gọi URD/SRS và ranh giới tài liệu khác nhau giữa các tổ chức. Không bắt buộc mọi dự án phải có hai file riêng.

Trong bài này:

- **URD (User Requirements Document)** mô tả người dùng/stakeholder cần đạt outcome gì, vì sao, trong bối cảnh nào và phạm vi ra sao.
- **SRS (Software/System Requirements Specification)** mô tả hệ thống cần làm gì và những quality/interface constraints nào để thỏa need đã được xác nhận.
- **Functional specification** là cách tổ chức các yêu cầu hành vi, luồng, rule, input/output và exception. Có nhóm gộp vào SRS/backlog; có nhóm tách riêng.

Đây là quy ước làm việc cho mock project, không phải khẳng định một cấu trúc tài liệu duy nhất là bắt buộc.

## 1. Ranh giới tài liệu

| Artifact | Câu hỏi chính | Nội dung điển hình | Không nên thay thế |
|---|---|---|---|
| Business case/charter | Vì sao nên đầu tư, phạm vi và lợi ích kỳ vọng là gì? | Outcome, options, assumption, cost/benefit, risk | Bằng chứng discovery hoặc requirement chi tiết |
| URD | Người dùng/nghiệp vụ đang cần gì và thành công nghĩa là gì? | Stakeholder, problem/evidence, user need, context, scope, business outcome, constraint, acceptance ở cấp nhu cầu | Thiết kế API/database/UI cụ thể |
| SRS | Hệ thống phải đáp ứng gì để thỏa need? | System context, function, rule, state, interface/data, NFR, exception, verification, traceability | Hướng dẫn code hoặc kiến trúc chi tiết nếu chưa phải constraint được duyệt |
| Story/AC | Team cần xây/test phần nào trong delivery? | Actor, capability, value, testable behavior, dependency | Toàn bộ business rationale/decision history |
| UML/BPMN/DFD/ERD | Mối quan hệ/hành vi/quy trình/dữ liệu được biểu diễn ra sao? | View theo mục đích, có ID/link | Requirement narrative hoặc owner/approval |

Lưu một nguồn sự thật cho từng nội dung: ví dụ rule ở rule catalog, API contract ở API spec, trạng thái duyệt ở decision log. Có thể đặt chúng trong một trang/wiki hoặc nhiều file; tránh copy khiến các bản lệch nhau.

## 2. URD mẫu cho case đặt bàn

### URD-01 — Khách gửi yêu cầu đặt bàn ngoài giờ điện thoại

| Thuộc tính | Nội dung mô phỏng |
|---|---|
| ID / trạng thái | URD-01 / Draft — giả thuyết học tập, chưa có stakeholder thật xác nhận |
| Người dùng | Khách muốn gửi yêu cầu đặt bàn; persona giả lập |
| Need | Có thể gửi yêu cầu khi không gọi được nhà hàng và nhận reference để tra cứu kết quả xử lý |
| Bằng chứng hiện có | Chưa có interview/data thật; giả thuyết từ charter, cần kiểm chứng |
| Outcome cần đo | Tỷ lệ request được tiếp nhận/xử lý; baseline, denominator, thời gian đo và target đều TBD |
| Phạm vi đề xuất | Form gửi request và trạng thái trả lời rõ `PENDING`; staff vẫn quyết định xác nhận theo policy |
| Ngoài phạm vi hiện tại | Thanh toán/đặt cọc, SMS, loyalty, tự động xác nhận — chỉ thêm khi được duyệt |
| Open questions | Khách cần thấy slot còn chỗ hay gửi request tùy chọn? `PENDING` có giữ capacity không? Contact nào bắt buộc? Ai duyệt? |

**Chú ý BA:** câu “tăng số booking 20%” không được tự ghi thành outcome đã duyệt khi chưa có baseline, cách đo và owner. “Làm app đặt bàn” là solution request; cần hỏi vấn đề/outcome đứng sau.

## 3. SRS / functional spec mẫu

Requirement phải có ID ổn định, một nghĩa chính, source/owner/status, rationale, fit criterion và link upstream/downstream. Các dòng sau đều là draft.

| ID | Yêu cầu hệ thống | Fit criterion / liên kết | Gap/status |
|---|---|---|---|
| SYS-FR-01 | Hệ thống phải nhận ngày, khung giờ, số khách và thông tin liên hệ tối thiểu theo policy đã duyệt. | Thiếu/sai field trả validation có field/code; không tạo reservation/history; `FR-01`, `AC-US01-02/03`, API draft `POST /api/reservations`, UAT-02/03 | Contact fields/retention cần Product + Privacy xác nhận; Draft |
| SYS-FR-02 | Trước khi nhận request, hệ thống phải áp dụng giờ hoạt động và capacity rule đã duyệt cho đúng slot/resource. | Slot đóng/không đủ capacity có outcome/error nhất quán; không tạo booking chiếm chỗ; `BRULE-01/02/07`, BPMN gateway, UAT-04/05 | Capacity unit/state/PENDING policy TBD; Draft |
| SYS-FR-03 | Sau khi request hợp lệ được ghi, hệ thống phải trả reference và trạng thái thể hiện rõ đang chờ staff quyết định. | Response/UI cùng reference và `PENDING`; không dùng copy gây hiểu là confirmed; `FR-04`, `US-01`, `AC-US01-01`, Figma submitted state, UAT-01 | State/wording cần Product review; Draft |
| SYS-FR-04 | Khi staff được ủy quyền quyết định request, hệ thống phải kiểm tra transition hợp lệ và lưu actor, thời gian, old/new status và reason theo policy. | Unauthorized/invalid transition không đổi state; audit truy được; `BRULE-04/05`, `NFR-02/03`, UAT-06/07/10 | Role matrix, timezone/retention/reason TBD; Draft |
| SYS-FR-05 | Khi cùng một submit được retry sau timeout, hệ thống phải ngăn booking trùng và cho phép client đối chiếu kết quả đã ghi. | AC-RETRY-01; T-RETRY-01/02/03/04 | Key/TTL/payload mismatch chưa duyệt; Draft |
| SYS-NFR-01 | Hệ thống phải duy trì invariant capacity khi các request cạnh tranh cùng slot theo policy đã duyệt. | AC-CONC-01/02; T-CONC-03/04/05/06/07; ghi evidence build, seed, request refs, state/occupancy | Engineering chọn biện pháp; business chưa chốt capacity policy; Draft |
| SYS-NFR-02 | Staff chỉ được đọc/thay đổi dữ liệu theo quyền nghiệp vụ đã duyệt; log/test phải giảm thiểu thông tin liên hệ nhạy cảm. | Negative authorization, masking/access review; `NFR-02/04` | Chưa có role/privacy policy hoặc security run; Draft |

Một NFR kiểu “nhanh, thân thiện, bảo mật cao” chưa testable. Hãy hỏi quality metric, điểm đo, tải/môi trường, quyền, threat, data scope, ngưỡng và owner. Không tự tạo SLA cho dễ viết.

### Trace mẫu: URD → SRS → delivery → verification

| Tầng truy vết | ID/artifact | Nội dung và trạng thái | Công cụ/đầu ra tiếp theo |
|---|---|---|---|
| User need | `URD-01` | Khách muốn gửi request khi không gọi được và nhận reference; **giả thuyết**, chưa có interview/data thật | Interview worksheet xác minh tần suất, workaround và outcome; chưa dùng như fact |
| Business outcome | `BR-02` | Giảm cơ hội đặt bàn bị bỏ lỡ khi phone channel unavailable; baseline/target TBD | Charter/KPI definition; Product xác nhận problem và cách đo |
| System requirement | `SYS-FR-03` / `FR-04` | Sau khi request hợp lệ được ghi, trả reference và `PENDING`; không ám chỉ booking đã confirm | SRS/backlog; hỏi Product/Operations về wording/state |
| Delivery slice | `US-01` + `AC-US01-01` | Khách gửi form hợp lệ, nhận mã và trạng thái chờ xác nhận | Jira khi có workspace; hiện có thể luyện trong Markdown, chưa tạo issue thật |
| Process/UI/API | `UC-01`, BPMN To-Be, Figma submitted state, `POST /api/reservations` | Cùng thể hiện request được nhận nhưng đang chờ quyết định; API contract draft trả `201`/`PENDING` | diagrams.net mô hình, Figma prototype, Postman collection; mỗi tool là artifact khác nhau, chưa phải evidence user need |
| Verification | `UAT-01` | Slot còn capacity, gửi form hợp lệ; kỳ vọng có mã và trạng thái Chờ xác nhận | Postman có thể kiểm API contract; UI cần review/prototype test riêng; test chưa chạy |
| Data/evidence | Reservation fixture + history | Có thể đối chiếu một request/reference và initial state trên cùng môi trường/test seed | SQL/Excel dùng fixture được ghi rõ nguồn; mock API memory không tự đồng bộ với SQLite fixture |

**Trace review:** nếu `URD-01` chưa được xác nhận thì các downstream artifact chứng minh tài liệu nhất quán, không chứng minh nhu cầu có thật. Nếu Product đổi policy sang auto-confirm, hãy tạo decision/change record rồi rà `SYS-FR-03`, BRULE-03, UI copy, API response, process, UAT và RTM; không âm thầm sửa một artifact.

## 4. Từ tài liệu sang toolchain BA

| Việc BA | Artifact/tool | Câu hỏi review |
|---|---|---|
| Thu thập need và quyết định | Interview notes, Miro/FigJam workshop, decision log | Fact hay assumption? Ai là source/approver? |
| Mô hình process và phạm vi chức năng | BPMN, Use Case, sitemap/function list, draw.io/Visual Paradigm | Actor, trigger, alternate/error path, system boundary có rõ? |
| Phân tích system/data | DFD, UML sequence/activity, ERD/data dictionary | Mỗi interface/state/entity phục vụ requirement nào? Có dữ liệu nào không cần thu? |
| Đặc tả và delivery | URD/SRS/functional spec, Jira story/AC, Confluence/wiki | ID/source/version/owner/status và dependency nhất quán? |
| Prototype và API | Figma, OpenAPI/contract, Postman | UI có thể hiện `PENDING`/error đúng không? Response có thỏa AC? |
| Verification/impact | SQL fixture, Excel RTM/UAT, issue/defect/change log | Test có chạy không? Evidence gắn đúng build/seed? Đổi một rule ảnh hưởng gì? |

Tool cụ thể có thể thay thế nhau một phần. Thành thạo BA nghĩa là chọn artifact đúng câu hỏi, giữ trace và giao tiếp trade-off; không phải thuộc mọi nút ở mọi sản phẩm.

## 5. Review checklist trước khi baseline

- Mỗi need truy về stakeholder/source và business outcome; evidence, assumption, decision được tách rõ.
- Mỗi requirement có ID, một ý, actor/system boundary, điều kiện và kết quả quan sát được.
- Validation, boundary, alternate/error, retry/duplicate, permission và data protection có đề cập khi liên quan.
- Business rule có owner/approver/version/effective scope; rule chưa duyệt vẫn `Draft/TBD`.
- Story/AC, BPMN/UML/DFD/ERD, API, Figma, test và RTM không mâu thuẫn về state/capacity/actor.
- NFR có fit criterion hoặc ghi rõ open gap; không biến chữ “nhanh/an toàn/dễ dùng” thành pass/fail.
- Change log có impact, decision authority, date/version và link artifact/test cần cập nhật.
- Reviewers phù hợp: Product/Operations cho policy, Engineering cho khả thi/interface, QA cho testability, Security/Privacy cho dữ liệu/quyền.

## 6. Template copy cho tài liệu dự án

```text
ID / title:
Status / version / date:
Source / requester / owner / approver:
Problem or user need / evidence:
Rationale / intended outcome / measure:
Scope / out of scope:
Requirement (one testable statement):
Business rule / assumptions / constraints:
Acceptance or fit criteria:
Exceptions / boundary / error behavior:
Data / API / process / prototype links:
Verification evidence / test link:
Open questions / dependencies / risk:
Change history / decision reference:
```

Không cần điền mọi trường bằng phỏng đoán. Ghi `TBD`, ai phải trả lời và quyết định đang block artifact nào.

## 7. Bài thực hành portfolio

1. Tự viết lại URD-01 dựa trên một giả thuyết khác, đánh dấu bằng chứng cần thu thập và ngoài phạm vi.
2. Chọn SYS-FR-03, tạo một story/AC; cập nhật prototype state, API response, UAT và RTM.
3. Chọn SYS-NFR-01, hỏi Engineering/QA cần setup/evidence gì; không tự chọn concurrency algorithm.
4. Tạo bản cá nhân có version/date và ghi 3 quyết định chưa được duyệt. Không trình bày mock stakeholder/test như kinh nghiệm thật.

**Gate:** reviewer có thể truy mỗi dòng từ source → requirement → model/interface → test/evidence; không có contradiction; open gap có owner. Nếu chưa có reviewer/runtime thực, ghi rõ chưa Verified.
