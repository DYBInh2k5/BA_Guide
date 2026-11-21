# 30 — AI hỗ trợ BA và bản đồ BABOK/PMBOK/ISTQB/Scrum

## Mục tiêu

Dùng AI để tăng tốc bản nháp và phát hiện câu hỏi còn thiếu; BA vẫn chịu trách nhiệm nguồn, logic, bảo mật, trao đổi stakeholder và phê duyệt. Phần này nối các chủ đề trên ba ảnh gốc với project guide.

## 1. Bản đồ nội dung từ ảnh vào project guide

| Chủ đề trên ảnh | Artifact hiện có / bài học | Đầu ra năng lực |
|---|---|---|
| Vai trò BA, tư duy hệ thống, SDLC, Waterfall/Agile/Scrum, loại dự án CNTT | `01`, `09`, `19`, `20`, `23`, `35` | Chọn approach theo context; không mặc định mọi dự án dùng Scrum; trace boundary, lifecycle, trade-off và gate |
| Elicitation, BABOK, BPMN, Use Case, Sitemap, Function List | `02`, `06`–`13`, `25`–`29` | Khám phá, mô hình, phân rã chức năng, trace nhu cầu tới test |
| UI/UX, functional spec, UML, API, ERD/DFD, URD/SRS | `03`–`05`, `12`–`15`, `21`–`22`, `29`, `34` | Đặc tả đủ để design/build/test; chọn đúng diagram và mức chi tiết |
| Figma, Postman, Visual Paradigm, draw.io, Miro | `09`–`15`, `24`, `29`, `44` | Luyện tool theo artifact; chuyển Use Case giữa draw.io/Visual Paradigm và workshop giữa Miro/FigJam; ghi blocker khi thiếu access/license |
| Change Request, Scrum, backlog, story, AC | `11`, `17`, `20`, `22`–`23` | Refinement, impact analysis, change governance |
| AI trong công việc BA | Bài này và tool lab dưới đây | Draft nhanh, kiểm chứng source/coverage, không đưa data nhạy cảm vào công cụ trái policy |
| PMBOK và Advanced ISTQB | Bản đồ framework ở mục 2 | Phối hợp project management/testing; không nhầm certification của vai trò khác với BA |

Để áp dụng frameworks lên một tình huống thay đổi xuyên suốt, làm [Lab 45 — Frameworks BA/PMBOK/Scrum/ISTQB](./45-Frameworks-BA-PMBOK-Scrum-ISTQB-Lab.md). Đây là bài mapping và thực hành tư duy, không phải khóa ôn thi hay chứng chỉ.

URD/SRS là dạng tài liệu có thể dùng theo bối cảnh, không phải output bắt buộc cho mọi team Agile. UML/DFD/ERD cũng là phương tiện làm rõ, không phải checklist bắt buộc; chọn notation theo người đọc và quyết định cần hỗ trợ.

Ảnh quảng bá còn nêu kinh nghiệm giảng viên, dự án thực tế và giới thiệu việc làm. Đây là thông tin do quảng cáo đưa ra, chưa được kiểm chứng trong lộ trình này; hãy xác minh trực tiếp với đơn vị đào tạo trước khi dùng làm căn cứ chọn khóa học.

## 1A. Hiểu danh sách công cụ trong source repo

Source repo có danh sách Jira/Confluence, draw.io, Excel, SQL, Power BI, Figma, Miro, Postman và các công cụ chuyên sâu. Hãy xem đây là **bản đồ lựa chọn**, không phải checklist “BA nào cũng phải dùng tất cả” hay thứ tự thăng cấp cố định theo số năm. Công ty, ngành, quy mô đội, license, governance và loại quyết định cần hỗ trợ sẽ quyết định bộ công cụ thực tế.

| Nhiệm vụ BA | Năng lực có thể chuyển giao | Ví dụ tool trong case study | Khi nào dùng tool tương đương |
|---|---|---|---|
| Lưu yêu cầu và quyết định có version/owner | Documentation, lifecycle, traceability | Markdown/Excel; Jira/Confluence khi có account | Team dùng Azure DevOps, Notion hoặc công cụ nội bộ |
| Mô hình hóa quy trình/hệ thống | Chọn notation, actor/boundary/exception | draw.io | Visio, Lucidchart, Visual Paradigm, PlantUML |
| Phỏng vấn/workshop | Elicitation, facilitation, synthesis | Worksheet và draw.io; FigJam khi mở được | Miro/Mural hoặc bảng giấy |
| Hiểu API và integration | Đọc contract, request/response/error | Postman collection + mock API | Insomnia, curl, Swagger UI, test harness |
| Phân tích dữ liệu | Data literacy, định nghĩa metric, kiểm tra chất lượng | SQL/Excel | PostgreSQL client, Power BI/Tableau, Sheets |
| Làm rõ trạng thái giao diện | Journey, states, validation/error | Figma prototype hiện có | Balsamiq, giấy phác thảo, prototype tương đương |

Không học để thuộc menu của từng sản phẩm. Học một luồng đầu-cuối (ví dụ need → BPMN → story/AC → API/test evidence), rồi chuyển sang tool khác và chứng minh đầu ra vẫn nhất quán. Power BI hay Tableau chỉ nên ưu tiên khi công việc cần dữ liệu/dashboards; không có quy tắc nghề nghiệp phổ quát “80% BA dùng cùng một stack”.

`00-README.md` của source repo mô tả 14 chủ đề “đủ để từ người mới đến Senior BA”. Hãy hiểu đây là tuyên bố về phạm vi tài liệu, không phải bằng chứng rằng chỉ đọc tài liệu là đạt cấp senior. Mức độ nghề nghiệp còn cần thực hành với độ phức tạp, phạm vi trách nhiệm, trade-off, phối hợp stakeholder và kết quả có thể giải thích; trong dự án học tập này, scorecard giữ ở `Chưa đánh giá` tới khi người học tự tạo evidence.

### Phát triển nghề theo phạm vi trách nhiệm, không chỉ theo năm

Các title và số năm khác nhau giữa tổ chức. Bảng sau là **lăng kính phát triển năng lực**, không phải chuẩn tuyển dụng hay cam kết lương:

| Phạm vi thường gặp | Dấu hiệu trách nhiệm tăng lên | Evidence portfolio phù hợp |
|---|---|---|
| Entry / Junior | Làm rõ task được giao, ghi nguồn, dựng sơ đồ/backlog dưới review, hỏi khi thiếu rule | Một story/AC được reviewer góp ý, flow đơn giản, ghi nhận sửa gì và vì sao |
| BA độc lập / intermediate | Sở hữu một workflow hoặc feature slice; điều phối elicitation/refinement; xử lý ambiguity và trace tới UAT | Một vertical slice end-to-end, decision log, RTM có owner/status, feedback đã áp dụng |
| Senior / Lead analyst | Giúp framing problem/options; điều phối trade-off nhiều nhóm; dự báo impact/risk; cải thiện chất lượng phân tích hoặc coaching | Decision brief có options/evidence, change impact liên hệ nhiều artifact, facilitation notes và lessons learned |
| BA manager / practice lead | Xây cách làm, năng lực team, governance/staffing và quality across projects | Operating model, capability framework, metrics/quality review; có bằng chứng adoption chứ không chỉ template |
| Product / enterprise / data paths | Chuyển trọng tâm sang outcome/product strategy, enterprise change hoặc analysis/data | Artifact domain-specific; cho thấy trách nhiệm chuyển giao và giới hạn vai trò rõ |

Không cần “đợi đủ X năm” mới được nhận việc khó, cũng không suy ra seniority chỉ từ title. Đánh giá theo độ phức tạp và phạm vi thực tế bạn từng chịu trách nhiệm, quyết định nào bạn được quyền influence, ai review, và outcome nào có evidence. Các mức lương ghi trong source repo không kèm nguồn/thời điểm/định nghĩa thị trường nên không dùng làm benchmark; tra cứu nhiều nguồn tuyển dụng/báo cáo địa phương mới nhất trước khi thương lượng.

## 2. Frameworks có phạm vi khác nhau

| Nguồn | Trọng tâm | BA dùng ra sao |
|---|---|---|
| BABOK Guide / IIBA Business Analysis Standard | Thực hành, tasks, techniques và năng lực Business Analysis; IIBA mô tả 6 knowledge areas trong BABOK | Bản đồ kiến thức nghề BA; dùng để kiểm tra coverage, không biến thành lifecycle tuần tự cứng |
| PMBOK Guide / PMI | Project management, governance, stakeholder, scope, schedule, finance/resources, risk và value delivery; bản 8 xuất bản Nov 2025 | Phối hợp với PM về project governance/plan/risk/value; BA không thay vai trò project manager |
| Scrum Guide | Khung Scrum, accountabilities, events, artifacts và commitments; nguồn chính thức hiện liệt kê bản Nov 2020 | BA work có thể nằm trong Product Owner/Developers/cộng tác team; Scrum Guide không định nghĩa chức danh BA riêng |
| ISTQB CTAL-TA / CTAL-TM | Advanced Test Analyst (test analysis/design/functional & quality testing) và Advanced Test Management (test planning/monitoring/team/risk) | BA tăng testability/AC/UAT collaboration; không thay tester/test manager hay cấp chứng chỉ chỉ bằng đọc bài |

PMI hiện ghi PMBOK Guide bản thứ 8, xuất bản tháng 11/2025; Scrum Guides ghi bản chính thức hiện tại là November 2020. ISTQB CTAL-TA v4.0 là bản mới nhất trên trang chứng nhận; CTAL-TM v3.0 có syllabus riêng. Kiểm tra exam/prerequisite tại Member Board trước khi đăng ký vì quy định theo thị trường có thể đổi.

## 3. AI có thể hỗ trợ công việc nào?

| Công việc BA | Dùng AI cho bản nháp | BA phải tự xác minh |
|---|---|---|
| Chuẩn bị elicitation | Tạo câu hỏi mở cho actor/context/rule/exception | Không gài đáp án; câu hỏi đáp ứng mục tiêu workshop |
| Phân tích ghi chú | Nhóm theme, tách fact/assumption/decision/open question | Mỗi insight truy được tới dòng nguồn; không bịa kết luận |
| Requirements | Gợi ý story, AC, negative/boundary case | Rule đúng owner, thuật ngữ/glossary và source chuẩn |
| Mô hình hóa | Gợi ý actors, flow, states, sequence hoặc data fields | Đủ exception/alternate, notation đúng, diagram không tự mâu thuẫn |
| Kiểm thử/UAT | Sinh scenario từ AC/decision table | Expected result có căn cứ; test không thay stakeholder approval |
| Data/API | Giải thích query/response, đề xuất data quality checks | Chạy trong môi trường an toàn; kiểm tra SQL, API contract và data handling |
| Change/portfolio | Gợi ý impact map, tóm tắt và cấu trúc câu chuyện | Xác nhận artifact bị ảnh hưởng; nói trung thực về mock vs real work |

## 4. Prompt pattern có thể tái sử dụng

```text
Vai trò: Bạn là trợ lý phân tích BA cho bài tập đặt bàn giả lập.
Bối cảnh: [đưa đoạn brief không nhạy cảm và link/ID source].
Nhiệm vụ: Tách nội dung thành FACT, ASSUMPTION, DECISION, OPEN QUESTION.
Đầu ra: Bảng gồm statement, loại, source quote ngắn/ID, stakeholder cần xác minh, artifact liên quan.
Ràng buộc: Không tự điền policy, số liệu hoặc acceptance criteria chưa có. Ghi UNKNOWN nếu thiếu evidence.
Kiểm tra: Nêu mâu thuẫn, thông tin cần hỏi và các điểm có thể sai.
```

Chỉ đưa vào model thông tin mà organization cho phép. Không nhập PII khách, thông tin tài khoản, API key, bí mật doanh nghiệp hay nội dung confidential vào dịch vụ AI cá nhân. Nếu dùng AI trong workflow công ty, tuân thủ policy, retention, access và disclosure của tổ chức.

## 5. Human review checklist

- [ ] Mọi claim có source hoặc nhãn giả định/TBD.
- [ ] Không biến option thành requirement hoặc recommendation thành decision.
- [ ] Actor, state, boundary, exception, permission và negative case được xem xét.
- [ ] ID/term thống nhất với backlog, process, API/data, UAT/RTM.
- [ ] Có reviewer/approver đúng thẩm quyền; AI không được ghi Approved.
- [ ] Không chứa data nhạy cảm trái policy; ghi rõ artifact có AI hỗ trợ nếu quy định yêu cầu.
- [ ] Output được mở bằng đúng tool đích và review layout/diagram/response trước khi chia sẻ.

## 6. Tool practice

1. Dùng prompt pattern trên với một đoạn mô tả case giả lập từ `01-Project-Charter.md`.
2. So sánh output AI với source; đánh dấu ít nhất một suy luận chưa có căn cứ và sửa lại.
3. Dùng AI gợi ý ba negative/boundary AC cho BRULE-02, nhưng giữ tất cả policy chưa duyệt ở `TBD`.
4. Tạo một change impact summary cho CR-01, đối chiếu RTM trước khi chấp nhận.
5. Lưu prompt, câu trả lời đã ẩn danh, reviewer note và corrected artifact như evidence học tập.

## Nguồn chính thức tham khảo

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)
- [PMI — PMBOK Guide](https://www.pmi.org/standards/pmbok)
- [Scrum Guides — Download official Scrum Guide](https://scrumguides.org/download)
- [ISTQB — Advanced Level Test Analyst v4.0](https://istqb.org/certifications/certified-tester-advanced-level-test-analyst/)
- [ISTQB — Advanced Level Test Management v3.0](https://istqb.org/certifications/certified-tester-advanced-level-test-management-ctal-tm-v3-0/)

Nội dung phiên bản được kiểm tra ngày 21-11-2026. Xem site chính thức trước kỳ thi/chứng nhận; bài học này không tái tạo syllabus độc quyền và không cấp chứng chỉ.

## 7. Kiểm tra nhanh thông tin chứng chỉ trong source repo

Phần chứng chỉ của source repo có một số điều kiện ECBA cũ và giá/claim giá trị nghề nghiệp chưa có nguồn kiểm chứng. Theo trang chính thức đã xem ngày **2026-11-21**:

| Credential | Thông tin eligibility hiện trên nguồn chính thức | Cách dùng trong lộ trình |
|---|---|---|
| IIBA ECBA | FAQ hiện tại nói không có eligibility requirement cụ thể; thí sinh đồng ý Code of Ethical Conduct và Terms. | Có thể cân nhắc để xác nhận kiến thức nền; không coi việc hoàn thành case study này là giờ PD đủ điều kiện. |
| IIBA CCBA | 3,750 giờ BA trong 7 năm; ít nhất 21 giờ PD trong 4 năm; 2 references. Work history có ngưỡng phân bổ theo Knowledge Areas. | Phù hợp khi có experience thật đủ điều kiện; kiểm tra handbook và cách khai giờ hiện hành. |
| IIBA CBAP | 7,500 giờ BA trong 10 năm; ít nhất 35 giờ PD trong 4 năm; 2 references; tối thiểu 900 giờ ở 4 trong 6 KAs, tổng ít nhất 3,600 giờ trong các KA đó. | Credential cho người đã có work history; project giả lập không thay thế kinh nghiệm ứng tuyển. |
| PMI-PBA | PMI hiện liệt kê ba đường: secondary degree + 60 tháng BA experience; bachelor trở lên + 36 tháng; hoặc GAC-accredited degree + 24 tháng; cả ba cần 35 contact hours. | Eligibility thay theo loại bằng; mở handbook/ECO chính thức trước khi nộp. |

Phần trong source repo ghi ECBA cần 21 PD hours là không khớp FAQ ECBA hiện hành; bảng nguồn cũ cũng nêu giá và lộ trình nhiều năm như số cố định. Không dùng giá, số câu thi, thời lượng, lương hay câu “chứng chỉ làm tăng cơ hội/mức lương” từ tài liệu cũ nếu chưa xác minh với nguồn chính thức và thị trường/thời điểm hiện tại.

Nguồn primary để xác minh lại: [IIBA Certification FAQ](https://www.iiba.org/business-analysis-certifications/certification-faq/), [IIBA Certification Fees](https://www.iiba.org/business-analysis-certifications/certification-fees/), [PMI-PBA certification](https://www.pmi.org/certifications/business-analysis-pba). Quy định và phí có thể thay đổi; kiểm tra handbook/fee page mới nhất trước khi đăng ký.

