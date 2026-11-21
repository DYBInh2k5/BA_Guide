# 18 — Portfolio Case Study: Đặt bàn nhà hàng trực tuyến

> **Loại dự án:** case study cá nhân phục vụ học tập. Bối cảnh, stakeholder, nhu cầu, dữ liệu, quyết định và kết quả đều giả lập. Không trình bày như dự án khách hàng thật hay kinh nghiệm đi làm.

## Tóm tắt một phút

Nhà hàng giả định tiếp nhận đặt bàn qua điện thoại và mạng xã hội, ghi chép rời rạc nên có nguy cơ phản hồi chậm, trùng lịch và thiếu dữ liệu theo dõi. Case study đề xuất MVP đặt bàn online với kiểm tra giờ/sức chứa, hàng đợi cho lễ tân, cập nhật trạng thái và thông báo email. Bộ hồ sơ mô phỏng quy trình BA từ charter, khám phá stakeholder, yêu cầu, mô hình quy trình và dữ liệu tới prototype, API, UAT, KPI, change control và risk management.

## Vai trò và cách làm

- **Vai trò mô phỏng:** Business Analyst cá nhân trong bài tập end-to-end; không có sponsor/nhóm delivery thật.
- **Cách tiếp cận:** ghi rõ giả định/câu hỏi mở; tách need, yêu cầu và giải pháp; giữ traceability từ mục tiêu tới nghiệm thu; cân nhắc tác động nghiệp vụ và vận hành.
- **Phạm vi MVP giả định:** gửi yêu cầu; kiểm tra giờ/sức chứa; nhân viên xem, tra cứu, xác nhận/từ chối; lưu trạng thái và gửi email.
- **Ngoài phạm vi:** thanh toán/đặt cọc, tối ưu nhiều chi nhánh, tích hợp POS, SMS và hủy tự phục vụ khi chưa thống nhất chính sách.

> **Trạng thái evidence người học:** Bộ hồ sơ trong workspace là tài liệu mẫu do trợ lý chuẩn bị. Chưa có bằng chứng bạn tự thao tác/review, nên scorecard cá nhân vẫn `Chưa đánh giá`. Các phần giới thiệu, STAR và CV bên dưới chỉ là khung tham khảo; chỉ chuyển thành tuyên bố cá nhân sau khi thay bằng việc bạn thực sự làm và evidence mở được.

## Vấn đề và mục tiêu

**Problem statement giả định:** Việc tiếp nhận đặt bàn qua nhiều kênh và ghi chép thủ công có thể khiến lễ tân bỏ lỡ hoặc xử lý chậm yêu cầu, khó kiểm soát sức chứa và khó đo tỷ lệ khách đến. Cần xác minh quy mô vấn đề bằng phỏng vấn và dữ liệu vận hành trước khi đầu tư.

**Mục tiêu sản phẩm:** tạo một kênh online có trạng thái rõ cho khách và một queue thao tác cho lễ tân; tránh thông điệp khiến khách hiểu yêu cầu `PENDING` là booking đã xác nhận.

**Chỉ số đề xuất trong charter, chưa được stakeholder duyệt:** ≥90% yêu cầu được xử lý trong 5 phút; giảm 30% tỷ lệ sự cố trùng; show-up rate theo dõi với mục tiêu ban đầu 80%; không vượt sức chứa trong UAT. Định nghĩa và baseline cần được thống nhất trước khi dùng để ra quyết định.

## Phân tích và thiết kế trong case study mẫu

1. Xác định problem statement, stakeholder giả định, câu hỏi elicitation và RACI.
2. Mô tả As-Is/To-Be, pain point, gap và quy tắc cần làm rõ bằng BPMN/draw.io.
3. Viết business/functional/non-functional requirements, user story, acceptance criteria, ưu tiên và Definition of Ready/Done.
4. Mô hình hóa use case, luồng dữ liệu, data model, sequence và truy vết yêu cầu → UAT.
5. Tạo prototype Figma ba trạng thái: form khách, đã gửi `PENDING`, queue lễ tân.
6. Chuẩn bị collection Postman và mock API local; viết SQL thực hành với dữ liệu giả lập.
7. Lập kế hoạch đo lợi ích và dashboard Excel; nêu giới hạn so sánh trước/sau.
8. Phân tích change request CR-01 (thêm SMS) và risk register; chưa giả định yêu cầu này được duyệt.

## Đầu ra và bằng chứng

- [Project charter](./01-Project-Charter.md)
- [Stakeholder elicitation](./02-Stakeholders-Elicitation.md) và [stakeholder map/RACI](./08-Stakeholder-Map-RACI.md)
- [Requirements/backlog](./03-Requirements-Backlog.md), [refinement/Jira practice](./11-Backlog-Refinement-va-Jira.md)
- [BPMN As-Is](./09-Reservation-As-Is.drawio), [BPMN To-Be](./10-Reservation-To-Be.drawio) và [bài phân tích](./10-Gap-Analysis-va-To-Be.md)
- [Use case, data flow và UAT](./13-Use-Case-Data-Flow-UAT.md), [UML Use Case Diagram draft](./39-Reservation-Use-Case.drawio)
- [Figma prototype](https://www.figma.com/design/xjmPRRKTD2DUC0r7YTxD0c?node-id=6-224) và [sequence/user flow](./14-Sequence-Diagram-va-Figma-Flow.md)
- [Postman lab](./15-Postman-Practice-Lab.md), [collection](./Postman-Collection.json), [SQL lab](./Reservation-Practice.sql)
- [Solution evaluation](./16-Solution-Evaluation-va-Benefit-Realization.md), [Excel tracker](./outputs/ba-learning/BA-Benefit-Realization-Tracker.xlsx)
- [Change control/risk register](./17-Change-Control-va-Risk-Management.md)
- [Agile discovery/story mapping](./20-Agile-Discovery-Delivery-va-Story-Mapping.md) và [story map chỉnh sửa được](./20-Reservation-Story-Map.drawio)
- [NFR và operational readiness](./21-NFR-Quality-Attributes-va-Operational-Readiness.md)
- [Traceability và impact analysis](./22-Traceability-va-Impact-Analysis.md) và [RTM workbook Excel](./outputs/ba-rtm-empty-state-update-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx)
- [URD/SRS và functional specification](./34-URD-SRS-va-Functional-Specification.md)
- [Tư duy hệ thống, SDLC và chọn approach](./35-Systems-Thinking-SDLC-va-Approach-Selection.md) — decision brief giả lập, scope/gate và bài toán system boundary.
- [Sơ đồ system context draft](./35-Reservation-System-Context.drawio) — boundary và luồng tương tác; các nguồn capacity/tích hợp chưa biết được ghi mở, không xem như sự kiện thật.
- [Lab nối Context → BPMN](./37-Context-to-BPMN-Bridge-Lab.md) — thực hành chỉ mô hình hóa phần có nguồn, chú thích handoff chưa xác minh và chuẩn bị câu hỏi elicitation.
- [Worksheet Gap Analysis → To-Be → kiểm chứng](./38-Gap-Analysis-Practice-Worksheet.md) — tạo evidence chain cá nhân; chỉ đưa bản do người học làm và review vào portfolio.
- [BA planning và governance](./23-BA-Planning-va-Governance.md)
- [BA tool mastery tracker](./24-BA-Tool-Mastery-Tracker.md)
- [Capstone thực hành end-to-end](./43-Capstone-BA-End-to-End-Practice.md) — worksheet tự làm và rubric review; chưa phải bằng chứng cá nhân cho đến khi bạn hoàn thành.
- [Portfolio presentation storyboard 5 phút](./33-Portfolio-Presentation-Storyboard.md) và [deck Figma Slides bản nháp](https://www.figma.com/slides/krV104F5r4J0nAtzKvZUXZ) — deck do trợ lý tạo, dùng làm khung học tập; chưa được visual QA và không phải bằng chứng năng lực cá nhân.
- [Root cause/problem validation](./25-Root-Cause-Analysis-va-Problem-Validation.md) và [fishbone draw.io](./25-Reservation-Fishbone.drawio)
- [Business rules/decision tables](./26-Business-Rules-va-Decision-Tables.md) và [workbook Excel](./outputs/decision-table-lab/Business-Rules-Decision-Table-Lab.xlsx)
- [Functional decomposition/Sitemap/Function List](./29-Functional-Decomposition-Sitemap-Function-List.md) và [AI/framework practice](./30-AI-BA-va-Ban-do-Frameworks.md)
- [Workshop ra quyết định](./27-Decision-Facilitation-va-Workshop.md), [decision brief BRULE-02](./28-Decision-Brief-BRULE-02.md), [evidence lab Excel](./outputs/evidence-analysis-lab/Pending-Decision-Evidence-Lab.xlsx) và [capacity analysis SQL](./Reservation-Capacity-Analysis-Lab.sql)

## Bài học từ dữ liệu mô phỏng

Workbook tạo 56 ngày baseline và 56 ngày pilot giả lập. Công thức cho kết quả SLA 83,3% → 92,6%; duplicate incident rate 3,05% → 1,52% (giảm tương đối khoảng 50,1%); show-up 78,5% → 80,5%. Đây **chỉ là minh họa cách tính**, không chứng minh sản phẩm đạt lợi ích. Trước khi kết luận thực tế cần dữ liệu đã xác thực, định nghĩa nhất quán, kiểm tra chất lượng và xem xét mùa vụ/nhân sự/kênh.

## Khuyến nghị bước triển khai giả định

1. Phỏng vấn sponsor, quản lý và lễ tân; quan sát ca làm và thu baseline hiện tại.
2. Chốt đơn vị đo sức chứa, quy tắc giữ bàn/hủy/no-show, quyền truy cập và xác nhận thủ công/tự động.
3. Review backlog, prototype, lỗi/ngoại lệ API và NFR với kỹ thuật, vận hành và bảo mật.
4. Chạy UAT theo ma trận traceability; chỉ ký nghiệm thu với kết quả và bằng chứng thật.
5. Nếu pilot được phê duyệt, đo KPI định kỳ và quyết định tiếp tục/điều chỉnh/dừng theo tiêu chí đã thống nhất.

## Mẫu câu giới thiệu khi phỏng vấn

> “Tôi xây dựng một case study BA cá nhân cho bài toán đặt bàn nhà hàng. Tôi bắt đầu từ vấn đề giả định và ghi rõ các giả định cần xác minh, rồi phát triển charter, stakeholder questions, As-Is/To-Be, backlog có acceptance criteria, mô hình use case/data, prototype, API/UAT và kế hoạch đo KPI. Tôi cũng phân tích một change request thêm SMS và các rủi ro như sức chứa sai hoặc KPI thiếu dữ liệu. Toàn bộ kết quả và stakeholder là mô phỏng; điểm tôi muốn thể hiện là cách tôi cấu trúc vấn đề, truy vết yêu cầu và xác định bằng chứng cần có trước quyết định.”

### Gợi ý STAR trung thực

- **Situation:** case study giả định có quy trình đặt bàn nhiều kênh, khó theo dõi trạng thái.
- **Task:** mô phỏng vai trò BA và lập bộ hồ sơ có thể đưa tới refinement/UAT.
- **Action:** phân tích stakeholder/flow, viết yêu cầu và tiêu chí, nối mô hình với test, tạo prototype/API lab và kế hoạch KPI.
- **Result:** hoàn thành bộ artifact học tập có thể rà soát; chưa có kết quả vận hành hoặc xác nhận từ khách hàng thật.

### Mẫu ghi trong CV — chỉ dùng sau khi tự làm và xác minh nội dung

Đặt ở mục **Projects / Case Studies**, không ghi như một vị trí việc làm. Chỉ thay phần ngoặc bằng việc bạn thực sự tự thao tác, có file/version để mở và giải thích được.

> **BA learning case study — Restaurant Reservation (fictional, individual project)** — Analyzed a simulated booking workflow; personally created/revised **[artifact you completed]**, traced **[specific need/requirement]** to **[AC/test evidence you actually produced]**, and documented **[one risk/decision/open question]**. No real client, production release, or verified business outcome; **[state AI/tool assistance accurately]**.

Nếu chưa tự tạo artifact/evidence, dùng dòng trung thực hơn: “Đang thực hành case study BA giả lập; hoàn thiện artifact cá nhân và kiểm chứng kỹ năng theo lộ trình.” Không dùng số trong dashboard giả lập làm thành tích CV; không ghi Jira/Figma/Postman/SQL thành kỹ năng thành thạo chỉ vì workspace có file mẫu.

## Checklist trước khi xuất bản portfolio

- [ ] Đổi thông tin cá nhân giả lập và kiểm tra không lộ dữ liệu thật.
- [ ] Gắn nhãn case study học tập ở trang đầu và mỗi chart chứa số liệu giả lập.
- [ ] Mở lại file draw.io, prototype, collection, workbook và kiểm tra link/quyền truy cập.
- [ ] Bỏ artifact nháp hoặc bổ sung trạng thái/version/owner.
- [ ] Rà sự nhất quán ID và thuật ngữ giữa charter, backlog, sơ đồ, API và UAT.
- [ ] Thay mọi quyết định/metric chưa xác nhận bằng câu hỏi mở, không biến giả định thành fact.
- [ ] Chuẩn bị walkthrough 5 phút và câu trả lời về giới hạn, trade-off, rủi ro.

## Tiêu chí tự đánh giá năng lực

Chấm 0–2: **0** chưa làm được; **1** làm được với hướng dẫn; **2** tự giải thích được lựa chọn và bằng chứng.

| Năng lực | Điểm |
|---|---:|
| Làm rõ problem, stakeholder và câu hỏi elicitation | 0–2 |
| Mô tả quy trình và quy tắc nghiệp vụ | 0–2 |
| Viết yêu cầu/AC kiểm thử được, xử lý phạm vi | 0–2 |
| Mô hình hóa và duy trì traceability | 0–2 |
| Giao tiếp với design/engineering qua Figma, API, SQL | 0–2 |
| UAT, KPI, change control, risk và quyết định | 0–2 |
| Trình bày insight, giới hạn và trade-off | 0–2 |

Điểm này là công cụ tự học, không phải chứng chỉ nghề nghiệp. Tiếp theo nên luyện phỏng vấn stakeholder bằng role-play, sửa backlog từ phản hồi, rồi xây phiên bản portfolio ngắn 5 phút.















