# 35 — Tư duy hệ thống, SDLC và chọn cách triển khai

## Mục tiêu

Nhìn được toàn bộ luồng giá trị và tác động liên hoàn trước khi đề xuất requirement; hiểu các chặng phổ biến trong vòng đời sản phẩm/hệ thống; lựa chọn cách làm dự đoán trước, thích ứng hoặc kết hợp theo rủi ro và mức độ chưa rõ. Bài này bám chủ đề Giai đoạn 1 trong ảnh học liệu.

## 1. Tư duy hệ thống: đừng nhìn riêng một màn hình

Hệ thống gồm người, quy trình, policy, dữ liệu, phần mềm, kênh tích hợp và môi trường vận hành. Một thay đổi ở một điểm có thể chuyển tải việc sang nơi khác hoặc tạo hành vi ngoài dự kiến.

Khi nhận một đề xuất như “làm web đặt bàn”, BA hỏi theo 6 góc:

1. **Outcome:** tổ chức muốn cải thiện kết quả nào? Ai chịu trách nhiệm đo?
2. **Boundary:** hệ thống/nhóm nào nằm trong phạm vi? Điều gì ở ngoài?
3. **Actors:** khách, lễ tân, quản lý ca, Product, Engineering, QA, nhà cung cấp thông báo — ai làm gì?
4. **Flow:** request đi qua kênh, quyết định, dữ liệu và trạng thái nào?
5. **Constraint/feedback:** sức chứa, giờ mở, quyền, email lỗi, staff workload, privacy ảnh hưởng ra sao?
6. **Unintended effects:** cải thiện metric ở một điểm có thể làm xấu metric khác không?

### Ví dụ: tăng số form gửi không đồng nghĩa tăng giá trị

Form online có thể giảm cuộc gọi nhỡ; đồng thời có thể tăng request vượt capacity hoặc làm hàng đợi `PENDING` dài hơn. Nếu đo riêng số submit, nhóm có thể báo “tăng trưởng” trong khi staff không kịp xử lý và khách tưởng đã được xác nhận.

Vì vậy hãy nối **input → process → output → outcome**:

| Mắt xích | Case đặt bàn | Câu hỏi BA |
|---|---|---|
| Input | Request online và thông tin khách | Có thu đúng mức tối thiểu? Data có đầy đủ/chính xác? |
| Process | Validate slot/capacity; staff review; quyết định | Ai xử lý? Queue aging/exception nào xuất hiện? |
| Output | Reference, trạng thái, thông báo | Request có được ghi một lần? `PENDING` có rõ là chưa confirmed? |
| Outcome | Khách nhận phản hồi đúng lúc; không vượt capacity | Baseline/denominator/target/owner nào chứng minh lợi ích? |

Không suy ra nguyên nhân từ tương quan. Ví dụ, “sau khi có form, show-up tăng” chưa chứng minh form gây tăng; mùa vụ, giờ mở, nhân sự và promotion cũng có thể tác động.

## 2. SDLC là vòng đời; không phải một quy trình duy nhất

Tên chặng và thứ tự cụ thể khác theo tổ chức. Một vòng đời hữu ích để BA định vị công việc:

| Chặng | Câu hỏi/đầu ra BA thường hỗ trợ | Ví dụ artifact |
|---|---|---|
| Opportunity/discovery | Vấn đề có thật không? Ai gặp? Bằng chứng nào? | Interview, problem statement, baseline plan |
| Feasibility/option | Có phương án nào? Trade-off, cost, risk, dependency? | Business case, option analysis, decision brief |
| Define/plan | Scope, owner, decision rights, requirement và approach thế nào? | Charter, URD/SRS/backlog, plan, traceability |
| Design/build | Hành vi/process/data/interface nào cần làm rõ? | BPMN, UML/DFD/ERD, Figma, API contract, story/AC |
| Verify/accept | Có thỏa requirement và quality/risk criteria? | Test/UAT, defect log, evidence, sign-off |
| Release/operate | Hỗ trợ, monitor, quyền, training, fallback ra sao? | Runbook, operational readiness, release/change note |
| Evaluate/learn | Outcome có đạt? Có unintended effect? Tiếp tục/sửa/dừng? | Metric review, benefits realization, lessons learned |

BA có thể tham gia nhiều chặng cùng lúc; không phải đợi “chốt hết yêu cầu” rồi mới làm việc tiếp theo. Requirement discovery tiếp tục khi có feedback và evidence mới.

## 3. Predictive, adaptive và hybrid

Đây là lựa chọn về cách quản lý uncertainty, feedback và change — không phải chọn một bộ tài liệu/công cụ cố định.

| Tín hiệu bối cảnh | Cách làm có thể phù hợp | Lưu ý cho BA |
|---|---|---|
| Policy, scope và dependency tương đối ổn định; nhiều phê duyệt/bàn giao; thay đổi muộn đắt | Predictive/staged: baseline, gate, estimate và approve theo chặng | Ghi rõ change control, assumption, acceptance và cách xử lý thay đổi; vẫn có thể prototype/test sớm |
| Nhu cầu/solution còn uncertain; stakeholder feedback nhanh; có thể release lát cắt nhỏ an toàn | Adaptive/iterative: discovery liên tục, backlog, increment, inspect/adjust | Giữ outcome/traceability, refinement, quality gate và decision log; “Agile” không có nghĩa bỏ tài liệu/test |
| Có phần policy/security/compliance cần gate, nhưng UI/flow có thể học qua pilot | Hybrid: gate rõ cho constraint trọng yếu, iterate phần còn uncertainty | Nêu ranh giới: phần nào cần approval trước, phần nào được thử, tiêu chí dừng và cơ chế rollback |

Đừng kết luận Waterfall “không đổi” hay Agile “không lập kế hoạch”. Mọi dự án đều có planning, change, verification và governance; khác nhau ở cách phân bổ chúng theo thời gian và mức độ lặp.

## 4. Chọn approach cho case đặt bàn — recommendation có điều kiện

**Bằng chứng hiện có:** case study là giả lập; chưa có stakeholder, baseline, policy capacity, privacy review hay đội delivery thật. Vì vậy đây là phương án học tập, không phải quyết định dự án thật.

**Đề xuất để thảo luận:** discovery sớm và iterative cho form/prototype/queue vì nhu cầu và UX chưa kiểm chứng; giữ decision gate trước pilot cho capacity/PENDING policy, quyền, privacy, vận hành và readiness. Mỗi increment phải có acceptance/test evidence và phương án rollback phù hợp.

| Thử nghiệm/lát cắt | Giả thuyết cần học | Gate/điều kiện |
|---|---|---|
| Prototype form + submitted state | Khách hiểu “đã nhận request” khác “đã có bàn” | Review copy/flow với người dùng đại diện trước khi xem là validated |
| Queue staff bằng dữ liệu giả | Nhân viên có thể tìm, xử lý, ghi reason trong workflow đề xuất | Operations xác nhận policy, quyền và quy trình exception |
| API capacity check | Hành vi khi slot hết chỗ rõ ràng và invariant không bị phá khi request song song | Product/Operations duyệt capacity rule; Engineering/QA có thiết kế kiểm tra/evidence |
| Pilot nếu được duyệt | Có thể xử lý request và đo outcome trong vận hành thật | Privacy/security, support, rollback, baseline/metric owner và go/no-go được duyệt |

**Trade-off:** iterate sớm giảm rủi ro xây nhầm UX; pilot thiếu rule/monitoring có thể gây quá tải staff hoặc hứa sai với khách. Gate không thay thế discovery; discovery không thay thế operational readiness.

## 5. BA trong Waterfall/Agile/Scrum

BA là năng lực và trách nhiệm phân tích, không nhất thiết là chức danh có cùng cấu trúc ở mọi team.

- Trong delivery theo chặng: BA có thể phối hợp lập kế hoạch, elicitation, baseline/traceability, review change, hỗ trợ design/build/test, nghiệm thu và handover.
- Trong Scrum: Product Owner accountable về quản lý Product Backlog và value; Developers chịu trách nhiệm tạo Increment chất lượng. BA có thể làm trong team, cùng PO/Developers; BA không tự động là owner duy nhất của requirement hay người ghi biên bản mọi event.
- Dù theo cách nào: làm rõ need, model, rule, exception, data/interface, testability, trade-off và impact; giữ thông tin đúng người/đúng thời điểm.

### Ranh giới BA với các vai trò gần nhau

Chức danh và quyền hạn thay đổi theo tổ chức; bảng dưới nói về **accountability thường gặp**, không phải RACI áp dụng cho mọi nơi. Xác nhận decision rights và governance thực tế ở đầu dự án.

| Vai trò | Trọng tâm thường thấy | BA phối hợp thế nào | BA không tự mặc định |
|---|---|---|---|
| Sponsor / business owner | Outcome, funding, policy/business decision trong phạm vi được ủy quyền | Chuẩn bị evidence, options, impact và decision brief | Thay sponsor phê duyệt benefit, policy, scope hoặc baseline |
| Product Owner / Product Manager | Product value, direction và thứ tự backlog theo operating model của tổ chức | Làm rõ need, requirement, option/trade-off; hỗ trợ refinement và feedback | Là owner duy nhất của mọi requirement, hay tự đổi priority/commitment |
| Project Manager / Delivery Lead | Kế hoạch, dependency, governance, delivery coordination và reporting theo mô hình team | Cung cấp phạm vi, assumptions, impact, stakeholder/action needs | Tự cam kết estimate/schedule thay delivery team hoặc project governance |
| UX / Product Designer / Researcher | Nghiên cứu hành vi, interaction, information architecture và trải nghiệm | Cung cấp flow, business rule, edge case; cùng kiểm tra prototype và usability findings | Dùng wireframe thay evidence nhu cầu hay tự phê duyệt policy |
| Solution Architect / Engineering | Kiến trúc, integration, data/technical design, nonfunctional trade-off | Làm rõ business scenario, interface need, constraints, error/operational behavior | Quy định implementation cụ thể mà không qua design owner; hoặc biến design thành policy nghiệp vụ |
| QA / Test Analyst | Verification strategy, test design/execution, defect/evidence theo governance | Cùng biến requirement/risk thành AC, scenario, expected result và traceability | Tuyên bố pass thay người test khi chưa chạy, hay ký business acceptance thay approver |
| Operations / Service Owner | Quy trình vận hành, workload, support, exception, service readiness | Elicit As-Is, ownership, controls, training, runbook, metric và feedback | Giả định thiết kế mới sẽ được dùng/chấp nhận nếu chưa review với họ |
| Business Analyst | Phân tích need/problem, stakeholder, rules, process/data, options, requirements, traceability và change impact | Tạo hiểu biết chung, phát hiện gap, giữ decision/evidence rõ, hỗ trợ verification và learning | Tự nhận quyền quyết business/technical, hoặc coi tài liệu do mình viết là đã được duyệt |

**Câu hỏi phân vai nên hỏi:** “Ai chịu trách nhiệm cuối cùng cho quyết định này; ai cung cấp evidence; ai cần được consult; quyết định được ghi ở đâu; ai xác nhận hiệu lực?” Chức danh không tự nói lên authority; hãy kiểm tra decision log/RACI/governance.

**Ví dụ BRULE-02:** Operations giải thích capacity thực tế và exception; Product/business owner chốt policy giữ chỗ; Engineering đánh giá cách kiểm tra đồng thời; QA/BA cùng làm rõ scenario/evidence; BA ghi option, dependency, decision và truy các artifact bị ảnh hưởng. BA không nên tự chọn “PENDING giữ 10 phút” nếu chưa có business approval.

## 6. Phân loại project type trước khi chọn tool/approach

| Loại công việc | Rủi ro/câu hỏi nổi bật | Artifact/tool thường hữu ích |
|---|---|---|
| Sản phẩm số mới | Problem-solution fit, adoption, iterative feedback | Discovery, story map, prototype, analytics plan |
| Tích hợp/API | Ownership, contract, error/retry, data consistency, vendor dependency | Context/sequence, API contract, Postman, integration test design |
| Migration/thay hệ thống | Data mapping, cutover, reconciliation, training, rollback | Data inventory, mapping, migration plan, reconciliation/UAT |
| Regulatory/policy change | Effective date, scope, audit, approval, evidence | Decision log, traceability, control matrix, sign-off |
| Tự động hóa quy trình | Exception, human override, queue, SLA, responsibility shift | As-Is/To-Be BPMN, rule table, service/ops requirements |
| Analytics/data product | Metric semantics, lineage, quality, access, refresh | Metric dictionary, source map, SQL checks, dashboard definition |

Một dự án có thể thuộc nhiều loại. Chọn tool theo câu hỏi cần trả lời, không chọn tool trước rồi ép vấn đề vào nó.

## 7. Bài tập chọn approach (có đáp án tham khảo)

### Scenario A — thay quy định capacity

Nhà hàng có thể sắp đổi policy phân bổ chỗ; quản lý ca cần audit; sai capacity gây hứa quá số ghế. UI chưa có bằng chứng người dùng cần gì.

**Phân tích mẫu:** policy, audit và invariant cần decision/approval trước pilot; UX còn uncertain nên prototype có thể iterate. Đề xuất hybrid có gate cho policy/security/operational readiness và vòng lặp discovery cho UI. Hỏi owner về effective date, unit, trạng thái chiếm chỗ, override và test evidence. Chưa thể ước lượng lịch hay tuyên bố cách nào chắc chắn tối ưu khi chưa có team/constraints.

### Scenario B — chưa biết khách có muốn gửi online request

**Phân tích mẫu:** uncertainty về need cao. Bắt đầu discovery/experiment nhỏ: interview/quan sát/đo kênh hiện tại, so sánh option, thử prototype; chưa đầu tư xây toàn bộ booking platform. Xác định trước success/stop criteria và cách tránh làm lộ data thật trong thử nghiệm.

### Tự làm trên case study

1. Vẽ system boundary: khách, nhà hàng/staff, booking service, email provider; ghi external actor/data flow và phần chưa biết.
2. Chọn một lát cắt có thể kiểm chứng; nêu hypothesis, metric/evidence, reviewer và rủi ro chuyển tải công việc.
3. Chọn predictive, adaptive hay hybrid; đưa 3 lý do dựa trên uncertainty, change cost, feedback, dependency/risk.
4. Ghi một gate và một phần được iterate; nêu điều kiện go/no-go và rollback nếu phù hợp.
5. Đánh dấu mỗi dữ kiện là fact, assumption, decision hoặc open question; không biến ví dụ mẫu thành lời kể stakeholder thật.

**Rubric:** chọn approach theo evidence/context (không theo thời trang); xét hệ thống end-to-end; nêu trade-off/risk; chỉ rõ decision owner và fit criteria; ghi uncertainty có ảnh hưởng đến estimate/approval.

## Portfolio output

Một context/boundary view, lifecycle/approach decision brief một trang, backlog/lát cắt đầu tiên, gate/rollback criteria và decision log. Ghi rõ đây là phương án cá nhân giả lập hay quyết định được stakeholder duyệt; hai loại bằng chứng không được đánh đồng.

### Worked example trong dự án

- [Sơ đồ system context dạng draw.io](./35-Reservation-System-Context.drawio) — mở/chỉnh sửa bằng diagrams.net.
- [Bản xem nhanh SVG](./35-Reservation-System-Context.svg).

Sơ đồ hiện là **draft học tập**: khách và nhân viên nhà hàng tương tác với hệ thống quản lý booking đề xuất; email provider được thể hiện như dịch vụ ngoài dự kiến. Nguồn dữ liệu sức chứa, tích hợp/callback và các luồng chưa xác minh được giữ là câu hỏi mở. Sơ đồ không khẳng định đã có hệ thống, nhà cung cấp hay quy trình thật.
