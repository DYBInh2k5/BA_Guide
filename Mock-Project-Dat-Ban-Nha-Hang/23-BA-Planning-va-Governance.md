# 23 — BA Planning, Monitoring và Governance

## Mục tiêu

BA cần lập kế hoạch cách phân tích, duy trì stakeholder collaboration, quản lý thông tin/phiên bản, theo dõi chất lượng và cải tiến cách làm. BA plan không phải bản sao project plan; nó nêu **cách BA sẽ làm rõ và quản lý thay đổi** để team ra quyết định đúng lúc.

Tài liệu này là kế hoạch mẫu cho case study; chưa có team, sponsor hay lịch dự án thật. Vai trò/authority phải xác nhận khi khởi động dự án thực tế.

## 1. Chọn BA approach theo bối cảnh

| Cách tiếp cận | Khi phù hợp | Điểm mạnh | Rủi ro cần quản lý |
|---|---|---|---|
| Predictive / theo giai đoạn | Scope/quy định ổn định; phụ thuộc nghiệm thu, vendor, migration; thay đổi cần baseline rõ | Ước lượng/approval theo giai đoạn, kiểm soát tài liệu rõ | Feedback đến muộn, tài liệu lớn có thể lỗi thời |
| Adaptive / iterative | Nhu cầu chưa rõ; có thể thử prototype/pilot; feedback nhanh và rẻ | Học sớm, slice giá trị, thay đổi có cơ chế backlog | Scope drift, thiếu traceability/quality nếu chỉ chạy theo ticket |
| Hybrid | Governance/contract cần baseline nhưng UI/workflow cần khám phá và lặp | Kiểm soát phần rủi ro cao, học lặp phần bất định | Cần ranh giới và decision authority rõ, tránh hai quy trình song song |

**Đề xuất case study:** discovery/validation và prototype theo vòng lặp; baseline MVP/change approvals rõ trước build; delivery theo increment nhỏ có AC, UAT và quality gates. Lựa chọn này là giả thuyết thực hành, không phải kết luận stakeholder.

## 2. BA work plan mẫu

| Work package | Câu hỏi/hoạt động | Artifact/evidence | Người cần tham gia | Gate / điều kiện tiếp |
|---|---|---|---|---|
| Problem & strategy | Làm rõ mục tiêu, current state, dữ liệu hiện có | Problem statement, evidence log, options | Sponsor, quản lý, BA | Sponsor xác nhận vấn đề/ưu tiên |
| Elicitation | Quan sát ca, phỏng vấn, workshop, document analysis | Notes, source, open questions, decisions | Lễ tân, quản lý, khách đại diện | Facts/assumptions được phân biệt |
| Process & requirements | Mô hình As-Is/To-Be; viết rules, story, AC, NFR | BPMN, glossary, backlog, NFR catalog | Ops, PO, engineering, QA | Scope và acceptance owner rõ |
| Design & feasibility | Prototype/API/data/security review; thử hypothesis | Figma, sequence, ERD, spike findings | Design, engineering, security | Feasibility/risks được review |
| Verification | Traceability, test scenarios, UAT readiness | RTM, UAT plan, evidence, defects | QA, users, PO | Exit criteria và approver rõ |
| Release/evaluation | Readiness, training/support, baseline and benefits | Runbook, decision log, metric dashboard | Ops, sponsor, support | Go/no-go, rollback, review date |

Kế hoạch phải có owner, dự kiến thời gian, dependencies và cập nhật khi discovery cho thấy scope/risk khác. Không dùng artifact count thay cho tiến độ.

## 3. Governance và decision rights

Mỗi loại quyết định cần một người **Accountable/approver** đã được xác định; BA có thể điều phối và đề xuất nhưng không tự duyệt thay.

| Decision | Approver cần xác nhận | BA chuẩn bị |
|---|---|---|
| Business outcome, KPI, benefit tolerance | Sponsor / Product Owner theo governance | Evidence, definition, trade-off, forecast confidence |
| Chính sách sức chứa, confirmation, hủy/no-show | Business owner được ủy quyền | Rule options, scenarios, process impact |
| Scope/MVP/priority | Product Owner/sponsor | Traceability, impact, dependencies, options |
| Kiến trúc/API/performance threshold kỹ thuật | Tech lead/architecture | Business context, use case, NFR intent, constraints |
| Security/privacy/data retention | Owner chuyên môn theo policy | Data inventory, access scenarios, purpose/retention questions |
| UAT sign-off | Đại diện nghiệp vụ được giao quyền | Scenarios, expected outcome, evidence, known limitation |
| Release go/no-go | Release approver/operations | Readiness evidence, open risks, rollback and impact |

Nếu không xác định được approver, ghi decision gap, deadline và người escalation; không điền theo chức danh mà chưa kiểm tra authority.
### Ví dụ phân vai cho ba quyết định

Đây là **mẫu giả lập cần xác minh**, không phải authority đã được nhà hàng chốt.

| Quyết định | Ai cung cấp thông tin | Ai tham vấn | Ai phê duyệt cuối (cần xác minh) | Vai trò BA |
|---|---|---|---|---|
| Capacity / nhận booking | Quản lý ca cung cấp sơ đồ bàn, số ghế, buffer, peak pattern; lễ tân cung cấp tình huống thực tế | Operations, engineering về concurrency/config | Business owner được ủy quyền, ví dụ chủ nhà hàng hoặc quản lý có delegated authority | Thu rule/scenario, làm rõ đơn vị đo, ghi ngoại lệ, trình options |
| Ngưỡng SLA | Operations/Product cung cấp giờ làm, nhu cầu khách, baseline; engineering/QA đưa benchmark và cách đo | Support, architecture, operations | Sponsor/Product Owner quyết mức dịch vụ chấp nhận được; technical owner xác nhận khả thi | Tách outcome nghiệp vụ khỏi threshold kỹ thuật, theo dõi TBD tới khi có quyết định |
| Retention dữ liệu liên hệ | Data/operations owner lập inventory, mục đích sử dụng và nhu cầu tra cứu | Privacy/security/legal/records owner theo chính sách tổ chức | Người có thẩm quyền dữ liệu/privacy theo governance nội bộ; sponsor không tự thay thế kiểm soát chuyên môn | Thu use case, data flow, retention need; ghi decision và trace tới controls/test |

Phân biệt **RACI**: người “Responsible” làm phân tích/chuẩn bị khác với người “Accountable” duyệt. Kỹ thuật có thể tư vấn/đánh giá khả thi nhưng không nhất thiết có quyền đặt business policy; ngược lại, sponsor chốt business priority nhưng không nên tự tuyên bố một security/privacy control đạt. Nếu authority chưa biết, trường approver để `TBD`, ghi escalation path và không baseline hóa requirement.

## 4. Information management — một nguồn sự thật

- Mỗi artifact có ID/tên, owner, trạng thái, version, ngày cập nhật, reviewer/approver nếu có, nguồn/evidence, liên quan tới requirement.
- Trạng thái tách rõ: Draft → In review → Approved baseline → Superseded; artifact test có Planned → Executed → Passed/Failed/Blocked.
- Decision log giữ lựa chọn, lý do, alternatives, người quyết, ngày hiệu lực và impact. Không sửa ngầm quyết định cũ; thêm entry mới.
- Glossary định nghĩa booking/request/confirmed/capacity/duplicate/no-show và timezone; cùng thuật ngữ xuyên UI, API, data, support.
- Quyền truy cập theo need-to-know; chỉ dùng data giả ở portfolio/lab; secrets không lưu trong collection/repo; log tránh dữ liệu liên hệ không cần thiết.
- Jira giữ trạng thái/owner/dependency; Confluence hoặc Markdown giữ bối cảnh, rule, decision; Figma/draw.io là bản vẽ có version; RTM link chúng lại. Tránh copy nội dung dài ở nhiều chỗ mà không có canonical owner.

## 5. Collaboration plan

| Stakeholder | Cadence / kênh gợi ý | BA chuẩn bị | Họ xác nhận |
|---|---|---|---|
| Sponsor/PO | Weekly decision checkpoint, bất đồng bộ qua decision log | Decision needed, evidence, options, due date | Outcome, priority, trade-off |
| Quản lý/lễ tân | Quan sát ca + workshop theo chủ đề; prototype review | Scenario, BPMN, open questions, sample data | Rule, usability, exception, operational owner |
| Khách | Phỏng vấn/usability test theo consent và kế hoạch nghiên cứu | Script, prototype, neutral tasks | Hiểu trạng thái, completion friction, trust |
| Engineering/QA | Refinement theo backlog, NFR/API review | Story, AC, traceability, data examples | Feasibility, estimates, test strategy, dependencies |
| Security/privacy/ops | Review trước baseline/release và khi change ảnh hưởng | Data flow, role matrix, failure scenarios | Controls, readiness, runbook, policy |

Cuộc họp cần có mục tiêu, decision maker, pre-read, note taker/owner và cách xác nhận. Gửi notes nhanh; đánh dấu correction window; record action/decision, không chép transcript thành requirement mà chưa phân tích.

## 6. BA performance & improvement

Theo dõi chất lượng flow và quyết định, không dùng để chấm điểm cá nhân hay gây khuyến khích “viết nhiều ticket”. Chọn số liệu hữu ích cùng team, đặt baseline rồi mới đặt mục tiêu.

- Decision lead time: thời gian từ request tới quyết định; xem approval bottleneck.
- Clarification/rework: số item quay lại do rule/AC mơ hồ; phân tích nguyên nhân, không đổ lỗi.
- Ready quality: tỷ lệ story được estimate mà không có blocker lớn; định nghĩa “ready” thống nhất.
- Trace/test gaps: requirement không có owner/test/evidence; phân đoạn theo risk.
- Stakeholder feedback: độ hữu ích, mức tham gia, người bị ảnh hưởng nào chưa được nghe.
- Outcome measures (SLA, duplicate, show-up) thuộc đánh giá giải pháp; không dùng velocity thay thế benefit.

Mỗi review định kỳ chọn một cải tiến nhỏ, owner và thời điểm kiểm tra hiệu quả. Nếu metric thúc đẩy hành vi xấu hoặc tốn công hơn giá trị, bỏ hoặc đổi nó.

## 7. Tool operating model

| Tool | System of record gợi ý | BA action | Governance rule |
|---|---|---|---|
| Jira | Issue status, owner, priority, dependency, decision links | Lọc blocked/ready, link test/epic, giữ history | Connector site đã kết nối; quyền và workflow cần xác nhận ở project học tập với admin/team |
| Confluence | Quy tắc, glossary, meeting/decision records, approved specs | Link canonical page từ issue | Page owner/version/approval rõ; không chứa data nhạy cảm không được phép |
| Figma/FigJam | Prototype, workshop map và feedback | Version/snapshot, link decision/requirement | Prototype không tự động là production behavior hoặc stakeholder approval |
| draw.io | Process/sequence/ERD | Version file, legend, source/owner | Update khi rule thay đổi; review link với requirements |
| Postman/SQL/Excel | API sample, data reconciliation, KPI/RTM | Dùng environment/dữ liệu giả; lưu evidence có version | Không commit secret/PII; kết quả mock không phải production proof |

## 8. Working agreement mẫu cho dự án

1. Câu hỏi có owner và ngày cần quyết định; quá hạn thì BA nêu impact/escalation.
2. Không đưa story vào sprint nếu thiếu AC, dependency quan trọng hoặc acceptance owner, trừ khi team chấp thuận discovery spike riêng.
3. Change request có impact note trước khi PO/approver quyết; giữ version cũ và rationale.
4. Artifact status, source, version, links được cập nhật cùng release/decision.
5. Data giả, environment sandbox; không đặt secret hoặc thông tin khách thật vào repo/portfolio.
6. Review BA approach tại refinement/release retrospective, sửa khi team/hệ thống đổi.

## Bài tập

1. Chọn predictive, adaptive hoặc hybrid cho case study; nêu 3 tín hiệu khiến lựa chọn này phù hợp và một dấu hiệu phải xem lại.
2. Ai phải approve ba quyết định: auto-confirm hay staff review, ngưỡng SLA, retention dữ liệu? Ghi role cần xác minh.
3. Chọn canonical location cho glossary, backlog, prototype và test evidence; tránh copy-paste nhiều phiên bản.
4. Chọn một BA performance measure, nêu cách nó có thể bị gaming và cách tránh.
5. Viết một mini governance plan 1 trang cho change request SMS.

## Đầu ra portfolio

Một BA approach/work plan, RACI có decision authority đã xác minh hoặc label TBD, information management plan, collaboration cadence, change/approval workflow và một ví dụ process improvement có before/after evidence. Trong case study này, các vai trò vẫn giả định, chưa có phê duyệt thật.

