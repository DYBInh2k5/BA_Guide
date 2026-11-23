# 22 — Requirements Traceability và Impact Analysis

## Mục tiêu

Traceability giúp trả lời: yêu cầu này đến từ mục tiêu nào, được thực hiện ở đâu, kiểm chứng bằng test/evidence nào và tạo outcome nào? Impact analysis dùng liên kết đó để dự đoán những phần cần đổi khi có yêu cầu mới, thay đổi quy tắc hoặc phát hiện defect.

Bảng dưới phản ánh hồ sơ **đang có trong case study giả lập**, không chứng nhận coverage của sản phẩm thật. “Có artifact” không đồng nghĩa đã được stakeholder duyệt hay test chạy pass. Workbook thực hành có filter, summary formula và CR impact sheet: [Requirements-Traceability-and-Impact-Analysis.xlsx](./outputs/ba-rtm-empty-state-update-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx).

## 1. Traceability matrix bản hiện tại

| Need / requirement | Story / use case | Quy trình / UI / API / data | Verification | Outcome / status |
|---|---|---|---|---|
| BR-02: giảm yêu cầu đặt bàn bị bỏ lỡ khi điện thoại không hoạt động (outcome, baseline TBD) | US-01 / UC-01 | To-Be BPMN; Figma form + submitted PENDING; `POST /api/reservations` trong sequence/collection | UAT-01 happy path; UAT-02/03 validation; UAT-04/05 slot/time/capacity | Missed-request rate / after-hours demand cần baseline; BR-02 chưa có target và cần stakeholder xác nhận. BR-02 là outcome, không phải yêu cầu kênh online |
| FR-01: nhập thông tin booking | US-01 / UC-01 | Form, data model Reservation, API payload | AC-US01-01/02/03; UAT-01/02/03; API negative cases | Complete data rate là chỉ số chẩn đoán; status: artifact có, target chưa đặt |
| FR-02/03: giờ mở và sức chứa | US-01, RES-02 / UC-01 | To-Be BPMN decision, sequence check slot/capacity, capacity data | UAT-04/05; AC-CONC-01/02; T-CONC-03/04/05/06/07 được thiết kế, chưa chạy | Capacity breach/duplicate incident; rule và đơn vị capacity còn cần chốt |
| BRULE-08: invariant capacity khi request đồng thời (Draft/TBD) | US-01 / UC-01; FN-03 | Sequence capacity check; reservation/occupancy data; audit nhận/xử lý request và policy version | AC-CONC-01/02; T-CONC-03/04/05/06/07 (được thiết kế, chưa chạy) | Không vượt capacity đã duyệt; capacity unit, trạng thái chiếm chỗ, ưu tiên/tie-breaker, fallback và resource scope cần Product/Operations xác nhận; Engineering/QA xác định cách chứng minh |
| FR-04: mã + PENDING | US-01, RES-03 / UC-01 | Figma submitted state; response body/API; reservation code/status | AC-US01-01/UAT-01; AC-RETRY-01; T-RETRY-01/02/03/04 được thiết kế, chưa chạy | Giảm nhầm lẫn với booking đã xác nhận; chưa có bằng chứng người dùng thật |
| BRULE-09: retry an toàn cùng lần submit (Draft/TBD) | US-01 / UC-01 | Submit API contract; reservation identity/audit; token mechanism chưa được quyết định | AC-RETRY-01; T-RETRY-01/02/03/04 (được thiết kế, chưa chạy) | Không tạo booking trùng và có kết quả đối chiếu; key/TTL, payload mismatch, đồng gửi cùng key cần Product/Engineering xác nhận |
| FR-05: xác nhận/từ chối + lý do | US-02, RES-05 / UC-02 | Staff queue prototype; sequence state transition; status history | UAT-06/07/10; UAT-11 cho AC-US02-04 (queue rỗng, draft); invalid transition/conflict | SLA, audit history; owner và quyền duyệt cần xác minh; UAT-11 chưa chạy |
| FR-06: email khi đổi trạng thái | US-03, RES-06 / UC-04 | Sequence email provider, Postman mock; notification log | UAT-08 thành công/lỗi | Email failure rate và repeat contact; template/provider/retry policy chưa duyệt |
| FR-07: tra cứu | US-04, RES-04 / UC-03 | Staff queue filters; API/data query | UAT-09 search/filter + authorization | Thời gian tìm/queue aging chưa có baseline |
| FR-08: hủy | US-05 / UC-05 | Chính sách và trạng thái chưa đặc tả | Chưa cam kết test; AC chưa viết | Ngoài MVP tạm thời; trace gap có chủ đích đến khi policy được chốt |
| NFR-01: performance | liên quan UC-01 / RES-01A–C | API/browser, sequence và load profile | Performance/load test chưa có; “3 giây” thiếu percentile, điểm đo, tải | Không tuyên bố pass; cần target, owner, test evidence |
| NFR-02: staff access | US-04/US-02 / UC-02/03 | Role matrix chưa đầy đủ; auth/API/UI | UAT-09 có check quyền ở mức nghiệp vụ; cần negative authorization/security tests | Chỉ yêu cầu đăng nhập chưa bao phủ least privilege |
| NFR-03: status audit | US-02/RES-07 / UC-02 | Reservation history/data model + sequence | UAT-06/07/10; đối chiếu actor/state/time | Auditability; retention/timezone/immutability cần xác nhận |
| NFR-04: data protection | US-01/02/04 | Contact data, access, retention và log | Chưa có privacy/security acceptance suite | Chỉ dùng data giả trong lab; policy và retention chưa chốt |

**Quy ước trạng thái gợi ý:** `Draft`, `Under review`, `Approved`, `Implemented`, `Verified`, `Deferred`, `Rejected`. Hiện tài liệu là **Draft/learning artifact**. Đừng gắn `Verified` chỉ vì có test case viết sẵn; cần execution result, build/version, người chạy và evidence.

## 2. Hai chiều traceability

- **Forward:** objective/need → business requirement → functional/NFR → story/AC → design/API/data → test → release evidence → outcome metric. Tìm yêu cầu chưa được thiết kế hoặc kiểm chứng.
- **Backward:** test/feature/data field → story/requirement → need/decision. Tìm chức năng không có rationale hoặc artifact không có owner.
- **Horizontal:** cùng một business rule đi qua process, UI, API, data, roles, error handling và operations. Ví dụ capacity không chỉ là form validation; phải thống nhất booking đồng thời và dữ liệu cấu hình.

Traceability là tập liên kết hữu ích, không bắt buộc mọi nhóm dùng một spreadsheet. Có thể quản lý bằng Jira issue links + Confluence, model repository hoặc bảng Excel/Markdown. Chọn mức chi tiết theo rủi ro và chi phí đổi.

## 3. Impact analysis mẫu cho CR-01 — thêm SMS

### Liên kết trực tiếp

`Need: khách bỏ lỡ kết quả? (bằng chứng chưa có) → BR-01/BR-02? (chưa chứng minh liên quan) → FR-06/US-03/UC-04 → notification flow/API/provider → consent & contact data → error/retry tests → failure/contact KPI → operations/support.`

Không tự gắn SMS vào BR vì nhu cầu/giá trị cần xác thực trước. Sau discovery, có thể tạo requirement mới nếu kênh, consent và business outcome đã rõ.

### Ma trận tác động

| Vùng | Trạng thái hiện tại | Tác động nếu CR-01 approved | Công việc/owner |
|---|---|---|---|
| Strategy/business case | SMS ngoài MVP; evidence chưa có | Cost/benefit và trade-off mới | Sponsor/Product + Finance xác nhận |
| Scope/backlog | FR-06 email, US-03 | Thêm channel preference/consent, SMS status, priority/dependency | PO quyết định; BA cập nhật backlog/AC |
| Process/stakeholder | Nhân viên xử lý email failure | Consent, opt-out, số sai, escalation | Operations + privacy/security |
| UI/prototype | Form và PENDING/customer result | Copy/consent hoặc channel choice, trạng thái gửi | Design/BA; cập nhật Figma sau duyệt |
| API/data | Email provider mock | SMS provider, delivery callback, idempotency, status schema | Engineering/architecture; data minimization |
| Security/privacy | NFR-02/04 còn cần refine | Contact consent, retention, log masking, access | Privacy/security owner chốt controls |
| Testing | UAT-08 email path | Delivery, failure, retry, duplicate, opt-out, provider down | QA + vendor sandbox; map cases tới new AC |
| Operations | Chưa có SMS support | Alert, spend limits, runbook, failure owner, vendor escalation | Ops/support + vendor owner |
| Metrics | Email failure, SLA | Channel delivery, cost per delivered, repeat contact | Data owner; tránh suy ra đọc tin từ sent status |
| Schedule/cost | Chưa estimate | Vendor/license/usage, integration, support/training | Engineering/Finance estimate; approver thay baseline |

### Kết luận phân tích

CR-01 không phải một dòng “gửi SMS” đơn giản. Nó chạm business case, consent/data, provider, API, prototype, test, chi phí, vận hành và KPI. Quyết định phù hợp hiện tại: **Deferred/under discovery** cho tới khi xác minh khách có bỏ lỡ email, sponsor chốt outcome, privacy/security kiểm tra chính sách và có estimate/provider. Người phê duyệt change phải là role được governance chỉ định; chức danh không tự quyết định quyền phê duyệt.

### Impact analysis candidate CR-02 — tự xác nhận khi còn chỗ

Sponsor đề xuất: “Nếu còn chỗ thì tự xác nhận ngay; thêm SMS cho khách.” Để tách phạm vi, CR-02 ở đây phân tích **auto-confirm**; SMS là CR-01 và vẫn cần consent/provider/chi phí riêng. Hai đề xuất chưa được duyệt và chưa có evidence vận hành.

| Vùng | Tác động/unknown nếu auto-confirm được xem xét | Owner cần tham gia |
|---|---|---|
| Outcome/business case | Mục tiêu có thể là giảm thời gian chờ hoặc cuộc gọi hỏi lại; chưa có baseline, tần suất, denominator hay outcome target được duyệt | Product + Operations + Data owner |
| Business rules | BRULE-01/02/03/08: giờ nhận đặt, đơn vị capacity, `PENDING` có giữ chỗ, thời điểm chuyển `CONFIRMED`, walk-in và ngoại lệ | Business owner + Operations |
| Process/roles | Ai xử lý ngoại lệ, slot conflict hoặc khách cần chỉnh request? Hệ thống được quyền xác nhận đến đâu; khi nào chuyển cho nhân viên? | Product + ca trưởng + lễ tân |
| Backlog/scope | US-01/US-02 và dependency; cần phân biệt nhận request, kiểm tra capacity, và cam kết confirmed; có thể cần tách lát cắt thay vì gộp SMS vào CR-02 | Product Owner + BA |
| State/data/audit | State transition do system hay nhân viên; audit actor, event/time, capacity snapshot và nguồn authoritative cần rõ | Operations + data owner + Engineering |
| API/concurrency | Đọc còn chỗ rồi ghi booking có bị tranh chấp khi hai request đồng thời hoặc walk-in cập nhật không? Cần invariant và outcome conflict được duyệt; cơ chế kỹ thuật do Engineering thiết kế | Architecture/Engineering + QA |
| UI/prototype | Copy phải phân biệt “đã tiếp nhận”, “đang chờ” và “đã xác nhận”; state unavailable/conflict/fallback cần được review | Product/Design + Operations |
| Notification | SMS không tự động thuộc scope CR-02; cần kiểm tra consent, số sai, provider failure, retry/duplicate, cost và support trước khi quyết định CR-01 | Privacy/Security + Engineering + Support |
| Test/UAT | Bao phủ capacity vừa đủ, thiếu, thay đổi sau khi hiển thị, hai request cạnh tranh, retry, staff override/failure; test oracle phụ thuộc rule đã duyệt | QA + Operations + Engineering |
| Operations/metrics | Ai theo dõi confirm sai hoặc conflict? Cần đo thời gian nhận→quyết định, conflict rate và contact hỏi lại bằng source/denominator đã chốt | Operations + Support + Data owner |
| Schedule/cost/risk | Chưa estimate cho policy, đồng bộ nguồn capacity, concurrency, integration hay training; không gán story point/đưa sprint trước refinement | Delivery team + Finance/PO |

**Kết luận hiện tại:** giữ CR-02 `Under discovery`; chưa đưa auto-confirm vào baseline. Trước mắt, xác minh policy capacity, nguồn dữ liệu đa kênh và decision authority. So sánh ít nhất ba option — staff-confirmed, conditional auto-confirm theo rule được duyệt, hoặc chỉ tiếp nhận request và thông báo đang chờ — với outcome/risk/evidence rõ. Không giả định SMS được phê duyệt cùng CR-02.

**Điều có thể cập nhật ngay:** change log ở trạng thái New/Under Analysis, decision log `DEC-01`/`BRULE-02` ở Open, câu hỏi discovery và impact links. **Chỉ cập nhật sau decision approval:** baseline business rule, product AC, API/state model, prototype final, UAT expected outcomes, release commitment và KPI target.

### Worked example — evidence owner, reviewer và decision authority

| Impact row | Evidence cần có | Evidence owner / reviewer | Decision authority | Trước khi baseline |
|---|---|---|---|---|
| API/concurrency | Capacity event/source cho online, phone và walk-in; timestamp/timezone/completeness; cách cập nhật và confirm hiện tại; scenario nhiều request cạnh tranh. Không suy ra dữ liệu thiếu là không có conflict. | **Evidence owner:** Operations + data/system owner cung cấp source và giới hạn; Engineering mô tả behavior hiện tại; QA rà scenario/checkability. | Business owner chốt policy capacity/`PENDING`; Engineering owner phê duyệt thiết kế kỹ thuật theo governance riêng. | Không baseline auto-confirm hay response contract trước khi capacity unit, state occupancy, conflict outcome và decision authority rõ. Cơ chế kiểm soát đồng thời do Engineering chọn và QA xác minh sau đó. |
| Operations/metrics | Call/support logs đã khử định danh, trạng thái reservation và timestamp; định nghĩa “repeat contact”, cửa sổ quan sát, mẫu số/các kênh thiếu, thời gian nhận→quyết định. Không dùng số mô phỏng làm baseline. | **Evidence owner:** Operations/Support + data owner; BA ghi phương pháp và caveat; Product review metric definition. | Product Owner/sponsor được governance chỉ định chốt outcome target và chấp nhận baseline. | Chưa cam kết mục tiêu giảm cuộc gọi/thời gian. Ghi metric candidate và kế hoạch thu evidence; không chuyển target minh họa thành KPI đã duyệt. |

**Phân biệt trách nhiệm:** evidence owner lấy/giải thích nguồn; reviewer kiểm tra chất lượng hoặc tính khả thi; decision authority chấp nhận policy/trade-off. Một người có thể kiêm vai trò nếu governance cho phép, nhưng không suy ra quyền duyệt chỉ từ chức danh.

**Ánh xạ công cụ:** Jira discovery task lưu owner, evidence deliverable và dependency; Excel/RTM lưu nguồn, thời gian, denominator và caveat; Confluence giữ decision status `Open` cho tới khi authority xác nhận. Ghi bằng chứng vào công cụ không tự biến nó thành quyết định được duyệt.

## 4. Workflow impact analysis khi thay đổi

1. Ghi change/defect ID, requester, ngày, lý do, bằng chứng và trạng thái.
2. Xác định node thay đổi trực tiếp; truy ngược nguồn và xuôi tới artifacts/evidence/outcomes.
3. Ghi impact loại: thêm/sửa/xóa, effort, schedule, cost, risk, operational, privacy/security, migration/training.
4. Liệt kê options: reject, defer, scope trade, phase, approve; note uncertainty.
5. Lấy estimate/input từ đúng owner; BA không tự ước lượng thay kỹ thuật/finance.
6. Approver quyết định; cập nhật baseline, version, issue links, test/metric và thông báo.
7. Sau implement, cập nhật trạng thái traceability bằng test result/release evidence; theo dõi outcome khi có dữ liệu.

## 5. Thực hành trên công cụ

- **Jira:** link issue “implements / tests / blocks”; dùng filter tìm approved requirement chưa verified hoặc story không có parent/source. Jira chưa kết nối trong workspace hiện tại.
- **Confluence:** đặt decision log và NFR catalog có owner/version; Jira issue trỏ về trang rule được duyệt.
- **Excel:** mỗi row một relationship; filter status, requirement type, release, owner; conditional formatting highlight `No test`, `Unapproved`, `No source`. Tránh gộp nhiều ID vào một ô nếu muốn lọc.
- **FigJam:** workshop impact map CR-01 theo nhánh process/data/API/test/ops/metrics; chốt assumptions/owner ngay trên board.
- **Figma/draw.io:** chỉ cập nhật prototype và sequence sau khi scope quyết định; giữ revision link để review delta.
- **Postman/SQL:** khi story được implement, nối request/test ID và query evidence với acceptance criteria; ghi môi trường/build.

### Worked example — hiển thị người phụ trách request (Draft)

Giả sử sau discovery có xác nhận rằng nhân viên cần biết ai đang theo dõi từng request. Đây là yêu cầu giả lập để học traceability, chưa phải quyết định nghiệp vụ hay yêu cầu đã được phê duyệt.

```text
Stakeholder evidence (cần xác minh)
  → Need: ca sau nhận biết request còn follow-up và người phụ trách
  → FR-QUEUE-01 (Draft): staff có quyền xem request và owner hiện tại
  → AC-QUEUE-01 (Draft): request đã ghi nhận hiển thị trạng thái và owner; chưa gán thì thể hiện rõ chưa gán
  → UI / process / data / permissions / API
  → UAT + authorization + audit evidence (chưa chạy)
```

| Vùng bị ảnh hưởng | Câu hỏi impact cần trả lời trước baseline |
|---|---|
| Quy trình / BPMN | Ai nhận trách nhiệm gán owner? Thời điểm nào? Request chưa gán được xử lý ra sao? |
| UI / prototype | Owner hiển thị ở queue, chi tiết hay cả hai? Copy cho request chưa gán do ai duyệt? |
| Dữ liệu / API | Nguồn owner là ai? Có lưu thay đổi assignment và thời điểm không? API hiện tại có dữ liệu này chưa? Chưa chọn endpoint hay schema. |
| Role / security | Vai trò nào xem, gán, đổi owner? Nhân viên có chỉ thấy request của ca mình không? |
| Test / evidence | Bao phủ đã gán, chưa gán, đổi owner, user không có quyền và audit history; expected result phải dựa trên policy được duyệt. |
| Operations / metrics | Ai theo dõi queue chưa gán? Có escalation/SLA không? Nếu đo thời gian nhận owner, cần định nghĩa start/end và nguồn event. |

**Không kết luận:** chưa mặc định mọi request phải có owner ngay khi nhận; chưa thêm endpoint, database field, SLA hoặc quyền cụ thể. Product/Operations xác nhận need và policy; Security xác nhận role; Engineering đề xuất data/API; QA thống nhất test/evidence. Khi các câu trả lời ảnh hưởng acceptance còn mở, giữ requirement `Draft/Blocked` và không đánh dấu `Verified`.

## Bài tập

1. Chọn NFR-01. Liệt kê upstream source, owner, downstream artifacts/tests và evidence đang thiếu.
2. Thêm acceptance criteria cho timeout/ retry để không tạo booking trùng; map nó tới sequence, API, data uniqueness và test.
3. Đánh dấu 3 dòng matrix là `Verified` chỉ khi có đủ evidence. Hiện case study không có test execution/release thật, nên câu trả lời đúng có thể là “chưa dòng nào đạt Verified”.
4. Với CR-01, chọn hai artifact có thể cập nhật ngay ở trạng thái discovery và hai artifact chỉ được sửa sau approval.

## Đầu ra portfolio

Một traceability matrix có status/owner/evidence link, impact map cho một change request, và một ví dụ truy ngược feature tới business need. Ghi rõ gap, open question và decision authority.



### Workbook thực hành CR-02

Dùng workbook [CR02-Impact-Analysis-Practice.xlsx](outputs/cr02-impact-practice-20261123/CR02-Impact-Analysis-Practice.xlsx) để thực hành impact register, evidence log, decision authority và traceability. Các dữ kiện vận hành đều ghi chưa thu thập; workbook không chứng minh năng lực của học viên cho đến khi bạn tự hoàn thành và được review.

