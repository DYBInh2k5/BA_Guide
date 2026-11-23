# Dự án mẫu BA: Đặt bàn nhà hàng trực tuyến

## Mục tiêu học tập

Thực hành vòng đời BA từ khám phá vấn đề đến đặc tả, mô hình hóa, backlog và UAT. Đây là case study giả lập; mọi số liệu bên dưới là giả định để học.

## Học theo lộ trình
Bắt đầu tại [Lộ trình BA từ nền tảng đến portfolio](./00-BA-Learning-Roadmap.md), sau đó cập nhật [BA Tool Mastery Tracker](./24-BA-Tool-Mastery-Tracker.md).

## Giả thuyết bối cảnh để luyện tập
Scenario giả định nhà hàng nhận đặt bàn qua điện thoại và mạng xã hội, có thể ghi chép thủ công. Trùng bàn, bỏ lỡ yêu cầu và thiếu dữ liệu là giả thuyết cần kiểm chứng; chưa có nhà hàng, stakeholder hay dữ liệu vận hành thật.

## Phương án sản phẩm giả định
- Option để đánh giá: cho khách xem khung giờ còn chỗ và gửi yêu cầu đặt bàn trực tuyến.
- Giúp nhân viên xác nhận, quản lý và cập nhật trạng thái đặt bàn.
- Nếu option được chọn: đo tỷ lệ yêu cầu được xử lý và tỷ lệ khách đến đúng hẹn.

## Bộ hồ sơ
1. `01-Project-Charter.md` — mục tiêu, phạm vi, giả định, chỉ số.
2. `02-Stakeholders-Elicitation.md` — stakeholder, kế hoạch khảo sát, câu hỏi phỏng vấn.
3. `03-Requirements-Backlog.md` — yêu cầu, user stories, tiêu chí chấp nhận, ưu tiên.
4. `04-Process-and-Data.md` — quy trình, mô hình dữ liệu, luồng đặt bàn.
5. `05-API-and-UAT.md` — API mẫu và test UAT.
6. `06-Bai-tap-Kham-pha-van-de.md` — worksheet phỏng vấn stakeholder.
7. `07-Minh-hoa-Phong-van-va-Phan-tich.md` — hội thoại giả lập, problem statement, chỉ số và As-Is flow.
8. `08-Stakeholder-Map-RACI.md` — stakeholder register, power-interest, RACI và engagement plan.
9. `09-BPMN-Modeling-Lesson.md` — BPMN 2.0, quy trình As-Is và bài thực hành draw.io.
10. `09-Reservation-As-Is.drawio` — sơ đồ quy trình As-Is nháp để mở và chỉnh sửa trong draw.io.
11. `Postman-Collection.json` — collection mẫu để import vào Postman.
12. `10-Gap-Analysis-va-To-Be.md` — phân tích khoảng cách, đề xuất To-Be và truy vết pain point → yêu cầu → nghiệm thu.
13. `10-Reservation-To-Be.drawio` — sơ đồ To-Be mẫu để mở và chỉnh sửa trong diagrams.net.
14. `11-Backlog-Refinement-va-Jira.md` — ưu tiên backlog, tiêu chí Ready và bài tập chuyển story sang Jira.
15. `12-Data-Modeling-SQL-API.md` và `Reservation-Practice.sql` — mô hình dữ liệu, SQL và bài thực hành Postman.
16. `13-Use-Case-Data-Flow-UAT.md` — đặc tả use case, data flow, ma trận truy vết và quy trình nghiệm thu UAT.
17. `14-Sequence-Diagram-va-Figma-Flow.md` — sequence diagrams, user flow và link prototype Figma.
18. `practice-api/server.js` và `15-Postman-Practice-Lab.md` — mock API local và hướng dẫn luyện Postman.
19. `16-Solution-Evaluation-va-Benefit-Realization.md` và `outputs/ba-learning/BA-Benefit-Realization-Tracker.xlsx` — đo lợi ích sau triển khai, dashboard Excel với dữ liệu giả lập.
20. `17-Change-Control-va-Risk-Management.md` — phân tích CR-01, tác động thay đổi, decision log và risk register.
21. `18-Portfolio-Case-Study.md` — câu chuyện dự án, map artifact, lời giới thiệu phỏng vấn và checklist portfolio trung thực.
22. `19-Strategic-Analysis-va-Business-Case.md` — options analysis, feasibility, benefits map, kinh tế dự án và recommendation có điều kiện.
23. `20-Agile-Discovery-Delivery-va-Story-Mapping.md` và `20-Reservation-Story-Map.drawio` — story map, slicing, refinement, Scrum collaboration, quality gates và tool lab.
24. `21-NFR-Quality-Attributes-va-Operational-Readiness.md` — quality scenarios, NFR catalog, traceability, verification và readiness trước pilot/release.
25. `22-Traceability-va-Impact-Analysis.md` và `outputs/ba-rtm-empty-state-update-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx` — trace hai chiều, dashboard gap/status và impact analysis mẫu cho CR-01; [workbook thực hành CR-02](./outputs/cr02-impact-practice-20261123/CR02-Impact-Analysis-Practice.xlsx) có sheet Worked Example và sheet bài tập còn trống; bổ sung AC-US02-04/UAT-11 ở trạng thái draft.
26. `23-BA-Planning-va-Governance.md` — BA approach/work plan, decision rights, information management, collaboration và cải tiến cách làm BA.
27. `24-BA-Tool-Mastery-Tracker.md` — scorecard năng lực người học, bài lab theo tool và điều kiện đánh giá bằng evidence.
28. `25-Root-Cause-Analysis-va-Problem-Validation.md` và `25-Reservation-Fishbone.drawio` — fishbone, 5 Whys, evidence plan và thử nghiệm giả thuyết nguyên nhân.
29. `26-Business-Rules-va-Decision-Tables.md` và `outputs/decision-table-lab/Business-Rules-Decision-Table-Lab.xlsx` — rule catalog, decision table tiếp nhận booking, capacity/state gaps và trace tới UAT.
30. `27-Decision-Facilitation-va-Workshop.md` — workshop 45 phút, lựa chọn BRULE-02, decision/action log và tool lab liên công cụ.
31. `outputs/evidence-analysis-lab/Pending-Decision-Evidence-Lab.xlsx` — fixture 20 reservation requests giả lập để luyện lọc, công thức thời gian xử lý và nhận diện missing evidence.
32. `Reservation-Capacity-Analysis-Lab.sql` — lab SQLite so sánh rủi ro capacity giữa hai giả định xử lý PENDING.
33. `28-Decision-Brief-BRULE-02.md` — decision brief mô phỏng, evidence gap, options, khuyến nghị có điều kiện và impact map.
34. `29-Functional-Decomposition-Sitemap-Function-List.md` — phân rã chức năng, sitemap, function list và trace tới Use Case/AC/UAT.
35. `30-AI-BA-va-Ban-do-Frameworks.md` — AI human review lab và bản đồ BABOK/PMBOK/ISTQB/Scrum nối với các chủ đề trong ảnh gốc.
36. `31-Concurrency-Idempotency-va-Test-Design.md` — phân tích tranh chỗ đồng thời, retry sau timeout, acceptance criteria và test evidence.
37. `32-Stakeholder-Interview-Roleplay.md` — role-play elicitation, khung ghi chép, evidence plan và rubric tự đánh giá.
38. `32-Discovery-Interview-Workshop.drawio` — canvas chỉnh sửa được cho problem/evidence/assumption/open question/action.
39. `33-Portfolio-Presentation-Storyboard.md` — storyboard portfolio 5 phút, lời nói, Q&A và cách trình bày evidence; [deck Figma Slides bản nháp](https://www.figma.com/slides/krV104F5r4J0nAtzKvZUXZ) do trợ lý tạo để học viên cá nhân hóa (8 slide dự kiến, chưa visual QA, có thể còn slide trống cuối).
40. `34-URD-SRS-va-Functional-Specification.md` — ranh giới URD/SRS/functional spec, ví dụ đặc tả và trace sang process/API/data/UAT; tên gọi tùy quy ước tổ chức.
41. `35-Systems-Thinking-SDLC-va-Approach-Selection.md` — system boundary, lifecycle, loại dự án IT, predictive/adaptive/hybrid và bài chọn approach theo evidence.
42. `35-Reservation-System-Context.drawio` và `35-Reservation-System-Context.svg` — sơ đồ ngữ cảnh hệ thống draft có thể chỉnh sửa và bản xem nhanh.
43. `36-System-Context-Drawio-Lab.md` — bài lab tự dựng sơ đồ trong diagrams.net, kiểm tra flow, open question và rubric portfolio.
44. `37-Context-to-BPMN-Bridge-Lab.md` — chuyển ranh giới system context thành BPMN As-Is có chú thích nguồn và khoảng trống elicitation.
45. `38-Gap-Analysis-Practice-Worksheet.md` — worksheet tự phân tích evidence/hypothesis/options, viết To-Be và trace tới AC/test.
46. `39-Reservation-Use-Case.drawio` — UML Use Case Diagram draft với system boundary, actor và mục tiêu; policy/permission còn mở.
47. [FigJam BA Practice Project — Restaurant Reservation](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23) — board có sáu chặng lifecycle cùng khu 07 Trace & Practice để nối evidence → requirement → acceptance → test; phần mới đã được chụp ảnh kiểm tra.
48. `40-Gap-Analysis-Coached-Example.md` — worked example có evidence labels, hypothesis có thể bác bỏ, options trade-off, To-Be giả thuyết, trace tới test và lab FigJam.
49. `postman-v3/` — Postman Collection v3 YAML, 10 request để dùng trong Local Mode; `Postman-Collection.json` vẫn là nguồn interchange v2.1.
50. `41-BPMN-to-Requirements-Lab.md` — nối evidence/quy trình As-Is với need, requirement, AC, test evidence và traceability; có tool lab FigJam/draw.io/Jira-or-spreadsheet.
51. `42-UAT-Evidence-Defect-Triage-and-Signoff.md` — bài lab UAT-11 với execution log, worked example giả lập, defect/change triage và ba gate UAT → release readiness → benefit review.
52. `43-Capstone-BA-End-to-End-Practice.md` — capstone tự làm từ discovery tới decision, requirements, tool practice, change impact và portfolio pitch.
53. `44-Lab-Chuyen-Cong-Cu-Visual-Paradigm-Miro-FigJam.md` — dựng cùng mô hình UML trên draw.io/Visual Paradigm và chạy workshop evidence-to-decision trên Miro/FigJam.
54. `45-Frameworks-BA-PMBOK-Scrum-ISTQB-Lab.md` — áp dụng BABOK, PMBOK, Scrum và ISTQB vào cùng CR SMS; map quyết định, role, test basis và trace.
55. `outputs/cr-sms-framework-practice-20261123/CR-SMS-Options-Impact-Traceability.xlsx` — workbook Excel thực hành decision matrix, sensitivity, change impact và trace Need→Test; có sheet ví dụ minh họa và sheet thực hành để trống.
56. `46-Need-Requirement-AC-Test-Oracle.md` — phân biệt need, requirement, design decision, AC, test case và oracle bằng CR-SMS; có worked example, bài phân loại và vertical slice.
57. `47-API-Timeout-Retry-Reconciliation-Lab.md` — mô hình hóa timeout ambiguity, retry/idempotency policy, bài chạy mock Postman và giới hạn evidence.
58. `48-Stakeholder-Interview-Change-Request-Practice.md` — worked role-play sponsor đề xuất SMS, cách hỏi need/evidence/outcome/authority và rubric phỏng vấn.

## Lộ trình học trong case study

| Chặng | Năng lực BA | Thực hành/công cụ | Đầu ra |
|---|---|---|---|
| 1 | Tư duy BA, stakeholder, SDLC, BABOK | Phân biệt vấn đề, nhu cầu, giải pháp; phỏng vấn mô phỏng | Problem statement, stakeholder map |
| 2 | Elicitation và phân tích quy trình | Miro hoặc FigJam cho workshop; draw.io cho BPMN | As-Is/To-Be, quy tắc nghiệp vụ, pain points |
| 3 | Quản lý và đặc tả yêu cầu | Jira/Confluence hoặc tài liệu Markdown | BRD/FRD, user stories, acceptance criteria, traceability |
| 4 | Mô hình hóa hệ thống | Visual Paradigm/draw.io | Use case, activity, sequence, ERD, data dictionary |
| 5 | Phân tích trải nghiệm và giao diện | Figma | User flow, wireframe, prototype và phản hồi stakeholder |
| 6 | API và dữ liệu | Postman, SQL, Excel; Power BI khi có dữ liệu phù hợp | API request/response, truy vấn kiểm tra, chỉ số sản phẩm |
| 7 | Delivery và chất lượng | Jira, Scrum, UAT, change control | Backlog, sprint-ready stories, test cases, sign-off, change impact |
| 8 | Portfolio và ứng tuyển | Case study, thuyết trình, phỏng vấn mô phỏng | Bộ hồ sơ dự án và câu chuyện STAR |

## Nguyên tắc học
- Không coi nội dung giả lập trong hồ sơ là sự thật đã được stakeholder xác nhận.
- Mỗi quyết định phải truy được về mục tiêu, stakeholder hoặc bằng chứng.
- Học công cụ theo nhiệm vụ BA: đầu vào là gì, thao tác nào cần làm, đầu ra dùng cho ai.
- Jira/Confluence hiện chưa kết nối tài khoản. Mock API Postman đang chạy tại `http://127.0.0.1:3000` trong phiên học này; chỉ dùng dữ liệu giả lập và không dùng dữ liệu khách thật. Import collection/chạy request trong Postman cần thao tác thủ công trong app ở phiên này.
- Board FigJam dự án mẫu: [BA Practice Project — Restaurant Reservation](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23), tạo trong team Cody empire theo lựa chọn của người dùng; đã kiểm tra ảnh render và chỉnh chiều cao khung để nội dung không tràn. Board là tài liệu học do trợ lý soạn, không phải evidence kỹ năng người học.

## Tiến độ
Lộ trình gợi ý: [8 tuần học và thực hành tool](./24-BA-Tool-Mastery-Tracker.md#lộ-trình-học-8-tuần). Năng lực vẫn ở trạng thái chưa đánh giá cho tới khi có artifact tự thực hành.
- [x] Tạo case study và bộ hồ sơ nền.
- [ ] Chặng 1: khám phá vấn đề và xác nhận stakeholder.
- [ ] Chặng 2: mô tả quy trình hiện tại và quy trình mong muốn.
- [ ] Chặng 3: rà soát, ưu tiên và truy vết yêu cầu.
- [ ] Chặng 4–7: mô hình, prototype, API/data, delivery/UAT, change control và risk management.
- [ ] Chặng 8: portfolio và phỏng vấn.

Bài tiếp theo sau BPMN: [từ quy trình đến yêu cầu có thể kiểm chứng](./41-BPMN-to-Requirements-Lab.md). Các tài liệu khác: [worksheet Gap Analysis → To-Be → kiểm chứng](./38-Gap-Analysis-Practice-Worksheet.md), [worked example có hướng dẫn](./40-Gap-Analysis-Coached-Example.md), [lab system context với diagrams.net](./36-System-Context-Drawio-Lab.md), [lab nối context sang BPMN](./37-Context-to-BPMN-Bridge-Lab.md), [worksheet khám phá vấn đề](./06-Bai-tap-Kham-pha-van-de.md), [ví dụ phỏng vấn](./07-Minh-hoa-Phong-van-va-Phan-tich.md), [role-play phỏng vấn stakeholder](./32-Stakeholder-Interview-Roleplay.md), [stakeholder map/RACI](./08-Stakeholder-Map-RACI.md), [bài BPMN](./09-BPMN-Modeling-Lesson.md), [bài Gap Analysis/To-Be](./10-Gap-Analysis-va-To-Be.md), [bài backlog/Jira](./11-Backlog-Refinement-va-Jira.md), [bài dữ liệu/API](./12-Data-Modeling-SQL-API.md), [bài Use Case/UAT](./13-Use-Case-Data-Flow-UAT.md), [bài sequence/Figma](./14-Sequence-Diagram-va-Figma-Flow.md), [bài Postman API lab](./15-Postman-Practice-Lab.md), [bài đánh giá giải pháp và workbook Excel](./16-Solution-Evaluation-va-Benefit-Realization.md), [bài change control và risk management](./17-Change-Control-va-Risk-Management.md), [case study portfolio](./18-Portfolio-Case-Study.md), [bài Strategic Analysis và Business Case](./19-Strategic-Analysis-va-Business-Case.md), [bài Agile Discovery/Delivery](./20-Agile-Discovery-Delivery-va-Story-Mapping.md), [bài NFR/Operational Readiness](./21-NFR-Quality-Attributes-va-Operational-Readiness.md), [bài Traceability/Impact Analysis](./22-Traceability-va-Impact-Analysis.md), [bài BA Planning/Governance](./23-BA-Planning-va-Governance.md), [tool mastery tracker](./24-BA-Tool-Mastery-Tracker.md), [bài root cause/problem validation](./25-Root-Cause-Analysis-va-Problem-Validation.md), [bài business rules/decision tables](./26-Business-Rules-va-Decision-Tables.md), [bài workshop ra quyết định](./27-Decision-Facilitation-va-Workshop.md), [bài concurrency/retry/test design](./31-Concurrency-Idempotency-va-Test-Design.md), [bài URD/SRS và functional spec](./34-URD-SRS-va-Functional-Specification.md), [bài tư duy hệ thống/SDLC/chọn approach](./35-Systems-Thinking-SDLC-va-Approach-Selection.md), [sơ đồ system context editable](./35-Reservation-System-Context.drawio).




































## Bài tiếp theo

- [49 — Backlog refinement và chẻ User Story](./49-Backlog-Refinement-va-Story-Splitting-Lab.md): chẻ epic, viết AC, làm rõ dependency và kiểm tra độ sẵn sàng.
- [50 — Ưu tiên backlog bằng quyết định có căn cứ](./50-Backlog-Prioritization-Decision-Lab.md): dùng MoSCoW, evidence, dependency và decision log để thảo luận phạm vi release.
- [51 — Chuẩn bị backlog để nhập vào Jira](./51-Jira-CSV-Backlog-Staging-Lab.md): kiểm tra CSV staging, map field và xác minh parent/dependency sau import.
- [CSV backlog staging](./Jira-Backlog-Import-Staging.csv): 1 Epic + 5 Story + 1 discovery Task giả lập; chưa được nhập vào Jira.
- [52 — Confluence: trang chuẩn và decision log](./52-Confluence-Decision-Log-and-Canonical-Page.md): giữ một nguồn chuẩn, trace quyết định tới Jira và test, ghi rõ draft/approved.
- [53 — Thực hành ưu tiên backlog bằng Excel](./53-Backlog-Priority-Excel-Practice.md): tự lập luận priority cho C-02, ghi dependency/evidence/authority và thử cập nhật khi policy thay đổi.
- [Workbook thực hành C-02](./outputs/priority-practice-20261123/Backlog-Priority-Practice.xlsx): bản mẫu còn trống để người học tự điền.
