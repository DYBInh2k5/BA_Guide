# 00 — Lộ trình học BA từ ba ảnh tham khảo đến portfolio

## Cách dùng lộ trình

Repo có hơn 50 bài và artifact. Đừng học theo số bài tăng dần một cách máy móc. Học theo phụ thuộc: hiểu vấn đề → lấy bằng chứng → mô hình hóa → đặc tả → phối hợp delivery/test → đánh giá kết quả → kể câu chuyện portfolio.

Case xuyên suốt là đặt bàn nhà hàng trực tuyến. Đây là mô phỏng, không có stakeholder, dữ liệu khách hàng hay kết quả production thật. Artifact do trợ lý chuẩn bị chỉ là tài liệu mẫu, không phải bằng chứng bạn đã thành thạo.

- Nhịp gợi ý: 3 buổi mỗi tuần, 45–60 phút/buổi.
- Mỗi chặng tạo một artifact do bạn tự sửa hoặc tự dựng, ghi nguồn/giả định/trạng thái, rồi giải thích lựa chọn.
- Nếu không có tài khoản/tool, hoàn thành cùng loại đầu ra trong file local hoặc công cụ thay thế; ghi rõ tool và blocker thay vì nhận đã sử dụng tool chưa mở được.
- Cập nhật [BA Tool Mastery Tracker](./24-BA-Tool-Mastery-Tracker.md). Level chỉ tăng sau khi có artifact cá nhân và review.

## Lộ trình 8 chặng

| Chặng | Năng lực | Bài nên học trong repo | Công cụ / bài lab | Checkpoint portfolio |
|---|---|---|---|---|
| 1. Nền tảng và tư duy hệ thống | Vai trò BA; problem, need, outcome; SDLC; Waterfall/Agile; stakeholder, root cause, governance | `01`, `07`, `08`, `23`, `25`, `35`, `45` | Scrum.org concepts; sơ đồ system context trong draw.io | Problem statement có evidence/hypothesis; stakeholder + decision-authority map; BA approach ngắn |
| 2. Khảo sát và phân tích quy trình | Interview/workshop; source labeling; As-Is/To-Be; BPMN; gap analysis; business rules | `02`, `06`, `09`, `10`, `26`, `27`, `32`, `37`, `38`, `40`, `41` | Miro hoặc FigJam để gom ý; draw.io để dựng BPMN; Excel decision table | Interview note; BPMN As-Is có nguồn/unknown; To-Be options; rule/decision table được đánh dấu draft |
| 3. Phân tích chiến lược và giải pháp | Need vs solution; options including no-change; feasibility, risks, benefit hypotheses, prioritization | `16`, `19`, `25`, `27`, `28`, `30`, `50` | Excel options matrix; AI để phản biện giả định, không quyết thay stakeholder | Decision brief có trade-off, điều kiện/gate, owner và evidence còn thiếu |
| 4. Yêu cầu và đặc tả | Need → requirement → rule → story/AC; URD/SRS; decomposition, slicing, backlog, NFR | `03`, `11`, `21`, `29`, `34`, `46`, `49`, `51` | Jira hoặc CSV staging; Confluence canonical page; Markdown làm phương án local | Backlog nhỏ có source, AC testable, status/owner và liên kết tới need |
| 5. Mô hình hệ thống và trải nghiệm | Context, use case, data flow, ERD, sequence, UI flow, state/error | `12`, `13`, `14`, `29`, `35`, `36`, `39`, `44` | draw.io hoặc Visual Paradigm cho UML; Figma cho prototype; FigJam/Miro cho workshop | Một vertical slice nối process → use case/sequence → data → prototype; policy/open question không bị tự quyết |
| 6. API, dữ liệu và phân tích | HTTP/JSON; validation; status/error; SQL; concurrency/retry; metric và denominator | `05`, `12`, `15`, `31`, `47`; `Reservation-Practice.sql`; `Reservation-Capacity-Analysis-Lab.sql` | Postman collection; SQLite/SQL; Excel cho evidence và trace | Execution log do bạn tự chạy; query có giải thích; phân biệt actual với expected và nêu giới hạn mock |
| 7. Change, test và vận hành | Change impact; risk; traceability; test basis/oracle; UAT; defect triage; release/benefit review | `17`, `20`, `22`, `27`, `42`, `45`, `48`, `52`; workbook CR-02 | Jira + Confluence trong project/space học tập được cấp; Excel RTM/evidence; Postman; AI để rà coverage | CR brief, decision log, impact/trace matrix, test evidence và readiness gap có trạng thái rõ |
| 8. Capstone và ứng tuyển | Tổng hợp, walkthrough, phản biện, portfolio trung thực, STAR/interview | `18`, `33`, `43`; các artifact chặng 1–7 | Slides/Figma Slides hoặc tài liệu portfolio; mock interview | Case study 5 phút nêu bối cảnh mô phỏng, phần bạn tự làm, trade-off, evidence, giới hạn và bài học |

## Bản đồ công cụ theo ảnh

### Đối chiếu bốn giai đoạn trong ảnh

| Giai đoạn trong ảnh | Chủ đề | Bài tương ứng trong repo | Công cụ được nêu |
|---|---|---|---|
| 1. Nền tảng và tư duy nghiệp vụ | Vai trò BA, loại dự án CNTT, SDLC, Waterfall và Agile/Scrum, phối hợp trong dự án | `01`, `08`, `10`, `23`, `35`, `45` | Scrum.org; logo thứ hai trong ảnh không đủ rõ để nhận diện chắc chắn |
| 2. Khảo sát và phân tích hệ thống | BABOK, elicitation, BPMN, Use Case, sitemap, function list, kiểm soát scope | `02`, `06`, `08`, `09`, `29`, `32`, `37`, `38`, `41` | Miro hoặc FigJam; draw.io |
| 3. Thiết kế chi tiết và tài liệu | UI/UX, đặc tả chức năng, UML, API, ERD/DFD, URD/SRS | `12`, `13`, `14`, `34`, `36`, `39`, `44` | Figma, Postman, Visual Paradigm hoặc draw.io |
| 4. Delivery, AI và nghề nghiệp | AI cho BA, change request, Scrum, backlog, user story, acceptance criteria, capstone và phỏng vấn | `11`, `17`, `20`, `30`, `43`, `45`, `48`, `49`, `50`, `51` | Jira, ChatGPT và Claude |

Ảnh giới thiệu khóa học còn nêu PMBOK/Advanced ISTQB, giảng viên có kinh nghiệm, dự án thực tế và cam kết giới thiệu việc làm. Repo có bài so sánh BABOK/PMBOK/Scrum/ISTQB để học cách áp dụng framework; đây là case mô phỏng, không xác minh nội dung lớp học, kinh nghiệm giảng viên hay cam kết tuyển dụng của đơn vị quảng bá. Logo ứng dụng trong ảnh giúp định hướng nhóm công cụ, không phải bằng chứng cần thành thạo mọi phiên bản/sản phẩm trên thị trường.

### Năng lực thực hành theo công cụ

| Nhóm công cụ được nêu | Nhiệm vụ BA cần tự làm | Bằng chứng thành thạo có thể review |
|---|---|---|
| Scrum.org / Jira | Hiểu cách team quản lý backlog; tạo/sửa issue, refine, link và theo dõi trạng thái | Một backlog slice có priority rationale, AC, dependencies, source/trace links và filter phù hợp |
| Miro / FigJam | Facilitate discovery, affinity grouping, journey/story/impact mapping, quyết định/open actions | Board có source labels, synthesis, owner/action và decision log; board mẫu không tính là evidence cá nhân |
| draw.io / Visual Paradigm | Dựng BPMN, UML, context, sequence, ERD; review semantics và version | File mở được; đúng notation/boundary; có assumptions/unknowns; giải thích được vì sao chọn model |
| Figma | User flow, wireframe/prototype, validation/loading/error/empty states | Prototype người review dùng được; feedback được ghi và nối với requirement/AC |
| Postman | Chọn environment, gửi request, đọc status/header/body, lưu assertion/evidence | Collection/environment an toàn; execution log có actual, expected oracle, build và giới hạn |
| Excel / SQL / Power BI | Lọc/đối soát dữ liệu, công thức/metric, trace; biểu diễn insight có nguồn | Kết quả truy được về rows/query; định nghĩa metric, mẫu số, caveat và không biến fixture thành số thật |
| ChatGPT / Claude | Phân loại thông tin, tạo câu hỏi, phản biện coverage, rà ambiguity; người BA chịu trách nhiệm | Prompt/đầu vào đã khử nhạy cảm; output được fact-check; ghi rõ chỗ AI bị sửa/bác bỏ và nguồn xác nhận |

## Checkpoint và cách chấm

Mỗi checkpoint được review theo sáu tiêu chí, không theo số trang hay số tool đã mở:

1. **Nguồn gốc:** fact, reported information, assumption, hypothesis, proposal và decision được phân biệt.
2. **Đủ cụ thể:** requirement/diagram/test có actor, condition, state, exception và scope phù hợp.
3. **Có thể kiểm chứng:** acceptance/test có expected result được policy/source có thẩm quyền hậu thuẫn.
4. **Truy vết được:** need/source → requirement/rule → delivery artifact → test/evidence.
5. **Quản trị được:** owner, reviewer, authority, status, version và open question rõ.
6. **Giải thích được:** bạn nói được trade-off, giới hạn, điều chưa biết và bước tiếp theo.

Trạng thái hiện tại của người học chưa được đánh giá khi chưa có artifact cá nhân. Không cộng điểm chỉ vì đã đọc bài, mở tool hay nhận file mẫu.

## Trạng thái kết nối và phương án tiếp tục

Trạng thái công cụ phụ thuộc vào phiên và quyền từng workspace. Trong lần kiểm tra 26-11-2026, Figma whoami xác nhận Full seat/admin trong Bình Võ Duy's team và ssb_got 1, cùng View seat ở Bình's Starter team; team Cody empire đã chọn trước đây không có trong danh sách này. Membership cấp team không xác nhận quyền sửa từng file. Atlassian site báo read-write ở cấp sản phẩm; lần kiểm tra project/space trước đó không tìm được Jira BA sandbox có quyền tạo và tạo Confluence draft riêng tư bị `permission_denied`, nên hiện chưa có issue/page học tập. Chỉ ghi vào project/space được chỉ định cho học tập. GitHub đã kết nối. ClickUp chưa có workspace được cấp quyền. Postman Desktop không xuất hiện trong app inventory nên UI/Local Files chưa xác nhận; `postman --version` là `1.93.0`, Node.js là `v22.20.0`. Các lần CLI chạy health check, UAT-05 và request not-found trước đây do trợ lý thực hiện, không phải evidence người học thực hành; request history not-found trả HTTP 404 với 3 assertions pass và CLI exit code 1 vì status 4xx. UAT-05 khớp nhánh mock/no-insert, nhưng policy vẫn Blocked khi DEC-01 Open. Môi trường `BA Local` chỉ chứa `baseUrl`, không có secret. Chưa xác nhận Miro connector; FigJam/draw.io là phương án tương đương để luyện kỹ năng chuyển giao. Không ghi là đã dùng ứng dụng gốc nếu chưa thao tác.

### Cập nhật kết nối mới hơn — 26-11-2026

Figma và GitHub profile đã xác thực. Figma whoami hiện xác nhận Full seat/admin ở Bình Võ Duy's team và ssb_got 1, View seat ở Bình's Starter team; file-level edit access cần kiểm tra riêng. Atlassian truy cập được site tổ chức và báo read-write ở cấp sản phẩm; lần kiểm tra quyền trước đó không tìm thấy project Jira `BA` có create access, còn tạo page draft trong personal Confluence space bị `permission_denied`. Vì vậy, vẫn dùng CSV/Markdown trong repo tới khi có project/space học tập được admin/team chỉ định. Tìm plugin Miro không trả về kết nối; có thể luyện kỹ năng tương đương bằng FigJam hoặc draw.io.

## Điểm bắt đầu của người học

Repo có nhiều tài liệu và ví dụ do trợ lý chuẩn bị, nhưng chưa có artifact cá nhân được review. Vì vậy, bắt đầu ở **Chặng 1 — Nền tảng và tư duy hệ thống** dù một số file nâng cao đã có sẵn. Không tính file mẫu hoặc lần chạy do trợ lý thực hiện là bằng chứng năng lực của người học.

### Buổi 1 — Từ yêu cầu giải pháp tới nhu cầu

Đọc [01 — Giới thiệu Business Analysis](../01-Gioi-Thieu-BA.md) và [Project Charter mô phỏng](./01-Project-Charter.md). Trong case này, giả thuyết về bỏ sót/trùng lịch chưa được xác minh; “xây app” chỉ là một phương án cần đánh giá.

Tự làm một ghi chú ngắn với bốn phần:

1. **Reported information:** điều stakeholder nói hoặc điều quan sát được, kèm nguồn. Nếu chưa có stakeholder thật, ghi `giả lập`.
2. **Hypothesis / unknown:** điều có thể đúng nhưng chưa có evidence, như nguyên nhân gây trùng lịch.
3. **Need:** outcome cần cải thiện, chưa khóa vào một giải pháp cụ thể.
4. **Câu hỏi khám phá:** viết ba câu hỏi trung lập để phân biệt vấn đề, tần suất/tác động và cách làm hiện tại.

Bài kiểm tra nhanh: nếu quản lý nói “hãy làm app để khỏi trùng bàn”, bạn chưa ghi đó là business need. Hãy hỏi về một trường hợp gần nhất, cách hiện tại được xử lý, ảnh hưởng quan sát được, và cách xác nhận kết quả sẽ tốt hơn. Chỉ sau khi có evidence mới mô tả problem/need và so sánh app với phương án quy trình khác.

### Thứ tự thực hành tiếp theo

Học theo phụ thuộc của công việc BA; các file nâng cao ở dưới là thư viện, không phải yêu cầu phải làm trước.

1. **Nền tảng:** hoàn thành ghi chú ở trên và [bài khám phá vấn đề](./06-Bai-tap-Kham-pha-van-de.md). Phân biệt câu “làm app” là đề xuất giải pháp với vấn đề/need cần kiểm tra.
2. **Stakeholder và evidence:** dùng [bài elicitation](./02-Stakeholders-Elicitation.md) cùng [sơ đồ incident stakeholder/evidence](./Double-Booking-Incident-Stakeholder-Evidence-Map.drawio). Lưu một bản copy; chọn stakeholder phỏng vấn trước, câu hỏi và artifact cần xin. Scenario này là giả lập, không dùng dữ liệu khách thật.
3. **Quy trình:** trước khi vẽ As-Is, kiểm tra các bước với nguồn/role-play. Dùng [lab context → BPMN](./37-Context-to-BPMN-Bridge-Lab.md) để học notation; đó là role-play khác, nên chỉ chuyển giao kỹ thuật modeling và không trộn lời kể giữa hai scenario. Nếu chưa xác minh được các bước của incident đặt trùng, giữ câu hỏi mở, chưa vẽ process như sự thật.
4. **Requirements:** học [Need → Requirement → AC → Test Oracle](./46-Need-Requirement-AC-Test-Oracle.md). Gắn source, status, owner và open question; dùng `Draft/Unknown` khi chưa có authority hoặc policy.
5. **Backlog và công cụ delivery:** dùng [Jira CSV staging lab](./51-Jira-CSV-Backlog-Staging-Lab.md) hoặc Markdown/CSV local. Chỉ import vào Jira project sandbox học tập nếu được cấp; hiện chưa có project đích phù hợp. Sau đó mới refinement/priority bằng [bài 53](./53-Backlog-Priority-Excel-Practice.md) và [hướng dẫn 54](./54-Huong-Dan-Uu-Tien-Backlog-Excel.md).
6. **Verification và analytics:** khi đã có requirement/test basis, làm [Postman UAT worksheet 55](./55-Postman-UAT-Execution-Worksheet.md), rồi Excel/SQL metric labs. Chỉ lưu actual do bạn tự chạy; mock không phải bằng chứng production.

Mỗi checkpoint cần một bản do bạn tự làm để được review. File mẫu, role-play do trợ lý tạo và lần chạy do trợ lý thực hiện không được tính là evidence cá nhân; khi chưa có artifact cá nhân, năng lực vẫn `Chưa đánh giá`.

### Lab Excel — định nghĩa metric và grain dữ liệu

Dùng [bài 56 — Email Delivery Metric](./56-Email-Delivery-Metric-Excel-Practice.md) và [workbook thực hành](./outputs/notification-failure-rate-practice-20261123/Email-Delivery-Metric-Practice.xlsx) để nhóm event theo notification, phân biệt retry với thông báo duy nhất, tính numerator/denominator và báo riêng timeout chưa rõ. Đây là dữ liệu giả lập; chỉ bản tự làm của người học mới được dùng làm evidence cá nhân.

Tiếp tục với [bài 57 — Attendance Rate](./57-Attendance-Rate-Excel-Practice.md) và [workbook thực hành](./outputs/attendance-rate-practice-20261123/Attendance-Rate-Practice.xlsx): xác định cohort booking đến hạn, tách outcome chưa rõ khỏi no-show, tính tỷ lệ khách đến và outcome coverage. Chỉ số và dữ liệu đều giả lập; tự hoàn thành bản copy rồi gửi lại để được review.

Sau đó chuyển cùng metric sang [bài 58 — Attendance Rate bằng SQL](./58-Attendance-Rate-SQL-Practice.md) và [script SQLite](./Attendance-Rate-Analysis-Lab.sql). Giữ nguyên định nghĩa Excel, chạy query, phân đoạn theo kênh và liệt kê unknown để đối soát; chỉ so kết quả sau khi tự viết query.

### Bài 59 — Từ need tới metric specification

Đọc [metric specification acknowledgement latency](./59-Acknowledgement-Latency-Metric-Spec.md). Bài này tiếp tục role-play sponsor ở bài 48: chọn đúng event kết thúc, định nghĩa cohort/grain/coverage, tách thời gian hệ thống nhận request khỏi thời gian staff ra quyết định, và lập danh sách event cần instrument. Tự tạo bản copy, điền bài tập và dùng rubric tự review. Mini backlog [Jira-ACK-Backlog-Staging.csv](./Jira-ACK-Backlog-Staging.csv) cho phép luyện import/hierarchy offline hoặc trong Jira sandbox; hiện chưa import vào Jira. Metric/brief mẫu vẫn là giả lập; chưa chấm mastery cho tới khi có artifact cá nhân.

Trong cùng bài, thực hành trace slice `Need → Requirement → AC → UAT → Metric`; chọn một công cụ sẵn có để làm artifact riêng (CSV/Markdown/draw.io nếu Jira hoặc Figma không có quyền phù hợp). Ghi rõ trạng thái draft/approved, owner, evidence và giới hạn mock.

Chuyển definition sang [bài 60 — acknowledgement latency bằng SQL](./60-Acknowledgement-Latency-SQL-Practice.md) và [script fixture SQLite](./Acknowledgement-Latency-Analysis-Lab.sql). Tự viết query trước khi mở answer key; báo timestamp completeness và valid-latency coverage riêng, kèm missing/invalid và sample caveat. Không dùng fixture để tuyên bố KPI thật.

Sau khi có metric analysis, làm [bài 61 — từ metric tới decision brief](./61-Metric-to-Decision-Brief-Lab.md): so sánh discovery/status/email/SMS; ghi DEC-ACK-01 ở trạng thái Open; xác định evidence gap, pilot outcome/guardrail và người có thẩm quyền. Không đặt target hoặc tuyên bố SMS gây giảm cuộc gọi từ fixture mô phỏng.

Bài 61 cũng có worksheet phỏng vấn/coding H1 (chưa biết đã nhận), H2 (chưa được xác nhận bàn) và H3 (lý do khác); thực hành ghi nguồn, coverage, unknown và cách kiểm tra giả thuyết trước khi khuyến nghị option.

Dùng [CSV 12 case giả lập](./Status-Inquiry-Coding-Practice.csv) để tự làm Excel PivotTable và tính linkage coverage. Phân biệt Unknown với H3; phần gợi ý trong bài 61 chỉ mở sau khi bạn đã tự coding.

Hoặc dùng [workbook Excel có sẵn](./outputs/status-inquiry-coding-lab-20261126/Status-Inquiry-Coding-Practice.xlsx) để nhập phân loại và xem formula summary cập nhật. Bảng category × channel là Pivot-style summary bằng COUNTIFS, không phải native PivotTable; nếu muốn luyện PivotTable gốc, bắt đầu từ sheet Coding practice và tự Insert PivotTable trong Excel.
