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
| 7. Change, test và vận hành | Change impact; risk; traceability; test basis/oracle; UAT; defect triage; release/benefit review | `17`, `20`, `22`, `27`, `42`, `45`, `48`, `52`; workbook CR-02 | Jira + Confluence khi có kết nối; Excel RTM/evidence; Postman; AI để rà coverage | CR brief, decision log, impact/trace matrix, test evidence và readiness gap có trạng thái rõ |
| 8. Capstone và ứng tuyển | Tổng hợp, walkthrough, phản biện, portfolio trung thực, STAR/interview | `18`, `33`, `43`; các artifact chặng 1–7 | Slides/Figma Slides hoặc tài liệu portfolio; mock interview | Case study 5 phút nêu bối cảnh mô phỏng, phần bạn tự làm, trade-off, evidence, giới hạn và bài học |

## Bản đồ công cụ theo ảnh

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

Trạng thái công cụ phụ thuộc vào phiên, cần kiểm tra lại trước mỗi lab. ClickUp chưa có workspace được cấp quyền; Jira/Confluence chưa kết nối. Postman Desktop v12 đã mở và Local Files hiển thị các request YAML trong `postman-v3`; CLI 1.93 đã thực hiện một health check local với 2 assertions pass và telemetry tắt. Đây là lần chạy của trợ lý, không được tính là evidence người học thực hành; Desktop Request Builder chưa chạy request. Môi trường local `BA Local` chỉ chứa `baseUrl`, không có secret. Miro và Visual Paradigm có thể thay bằng FigJam/draw.io để luyện kỹ năng chuyển giao; không ghi là đã dùng ứng dụng gốc nếu chưa thao tác.

## Tiếp tục bài đang học

Đang ở chặng backlog và quyết định release. Mở [bài 53 — Thực hành ưu tiên backlog bằng Excel](./53-Backlog-Priority-Excel-Practice.md), lưu một bản sao của [workbook C-02](./outputs/priority-practice-20261123/Backlog-Priority-Practice.xlsx), rồi tự điền các ô vàng. Sau khi nhận review, chuyển một discovery item và story đã refinement sang CSV staging ở [bài 51](./51-Jira-CSV-Backlog-Staging-Lab.md); chỉ import khi workspace Jira được kết nối và đã xác nhận đúng project/field mapping. Năng lực chỉ được đánh giá từ artifact do người học tự làm.

## Bắt đầu từ nền tảng

Làm [bài 22 — Traceability và Impact Analysis](./22-Traceability-va-Impact-Analysis.md) cùng workbook [CR-02 Impact Analysis Practice](./outputs/cr02-impact-practice-20261123/CR02-Impact-Analysis-Practice.xlsx). Chọn I-02, điền Evidence Log cho một phép thử concurrency bằng biến N, rồi ghi điều kiện nào cần authority quyết định. Tiếp theo dùng [bài 47 — API timeout/retry/reconciliation](./47-API-Timeout-Retry-Reconciliation-Lab.md) để nối requirement tới request, actual response và giới hạn mock. Gửi artifact do bạn tự điền để nhận review; đến khi đó trạng thái năng lực vẫn là `Chưa đánh giá`.
