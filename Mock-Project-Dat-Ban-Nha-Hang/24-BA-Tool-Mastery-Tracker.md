# 24 — BA Tool Mastery Tracker

## Mục đích

Đây là tracker để đi từ “đã có artifact mẫu” tới “tự làm và giải thích được”. File/project do trợ lý tạo **không chứng minh người học đã thành thạo**. Cột năng lực người học bắt đầu ở `Chưa đánh giá` cho tới khi bạn tự thao tác và có evidence.

Thành thạo công cụ không có nghĩa phải biết mọi sản phẩm thương mại. Hãy học theo nhóm năng lực có thể chuyển giao: backlog/knowledge base, process modeling, prototyping/workshops, API/data, analytics, testing/governance. Mỗi tool có giao diện khác nhau nhưng cùng mục tiêu BA.

## Thang năng lực

| Cấp | Mô tả | Bằng chứng tối thiểu |
|---|---|---|
| 0 — Chưa thử | Chưa tự thao tác | Chưa có evidence |
| 1 — Làm theo hướng dẫn | Hoàn thành bài lab theo từng bước | Artifact đầu tiên và ghi lại blocker |
| 2 — Tự làm | Tạo/sửa artifact từ brief mới, không dựa hoàn toàn vào mẫu | Artifact mở được, có version, nội dung đúng và giải thích lựa chọn |
| 3 — Có thể dẫn dắt | Chọn tool phù hợp, hỗ trợ stakeholder/team, xử lý lỗi và trade-off | Walkthrough, review feedback, traceability và phương án thay thế |

Mỗi assessment điền: `ngày | artifact/link | task tự làm | reviewer/feedback | điều cần luyện`. Không chấm bản assistant làm là level của người học.

## Công cụ và bài thực hành trong dự án

| Công cụ / nhóm | Evidence đang có trong workspace | Bài tự làm tiếp theo | Tiêu chí để lên level 2 |
|---|---|---|---|
| Markdown / tài liệu BA | Charter, elicitation, URD/SRS, functional spec, backlog, NFR, governance, portfolio, [Need → Requirement → AC → Test Oracle](./46-Need-Requirement-AC-Test-Oracle.md) và [phỏng vấn stakeholder về CR](./48-Stakeholder-Interview-Change-Request-Practice.md) | Tự hỏi sponsor theo role-play, ghi reported/evidence/assumption/options/decision/unknown, tóm tắt và xin xác nhận; nối kết quả tới requirement/AC/test oracle | Câu hỏi trung lập; source/owner/authority rõ; không nhầm proposal với approval; trace từ need tới verification |
| diagrams.net / draw.io | BPMN As-Is/To-Be, story map, fishbone, system context, [Use Case Diagram](./39-Reservation-Use-Case.drawio) và [bản annotation mẫu](./09-Reservation-As-Is-Annotation-Example.drawio) do trợ lý tạo | So sánh mẫu với [lab Context → BPMN](./37-Context-to-BPMN-Bridge-Lab.md), rồi tự tạo bản mới: ghi nguồn RP-01, khoanh bước giả định và đặt open question mà không nối flow chưa xác minh | Tự dựng boundary/process/use case; actor và mục tiêu đúng; flow/association không bị nhầm; unknowns có owner/evidence; file mở được và có version; phân biệt sample do trợ lý chuẩn bị với artifact cá nhân |
| Visual Paradigm | Có hướng dẫn chọn công cụ UML, chưa có bằng chứng người học đã tự thao tác Visual Paradigm | Làm [lab chuyển công cụ](./44-Lab-Chuyen-Cong-Cu-Visual-Paradigm-Miro-FigJam.md): dựng cùng Use Case Diagram như draw.io; ghi blocker nếu chưa có license/access | Artifact tự tạo mở được; UML semantics nhất quán; giải thích khác biệt thao tác/export; không tự nhận đã dùng nếu chỉ xem hướng dẫn |
| Figma Design | Ba màn form/PENDING/staff queue | Tạo clickable prototype giữa các trạng thái; thêm validation/unavailable/error state | Người review hoàn thành task mà không bị hiểu PENDING là confirmed; feedback ghi lại |
| FigJam | [BA Practice Project — Restaurant Reservation](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23) có sáu chặng lifecycle và khu 07 Trace & Practice (evidence → hypothesis → need → options → requirement → acceptance → test); board do trợ lý tạo và phần mới đã được chụp ảnh kiểm tra | Tự dựng story map hoặc impact workshop, gom ý, vote và lưu quyết định | Board do trợ lý tạo chỉ là tài liệu mẫu; cần artifact người học tự dựng, có quyết định và evidence để đánh giá |
| Jira | Hướng dẫn refinement, issue IDs trong repo và [CSV backlog staging](./Jira-Backlog-Import-Staging.csv); chưa có issue Jira thật | Sau khi Atlassian được kết nối: chọn project học tập, import bản copy, tạo Epic/Story, link blocks/tests và filter blocked/ready | Issue có owner/status/AC/source links; board phản ánh flow thật; history truy được; người học tự giải thích được field mapping |
| Confluence | Governance guidance và [canonical page/decision log lab](./52-Confluence-Decision-Log-and-Canonical-Page.md) | Tạo trang chuẩn cho một business rule; ghi owner/status/evidence/authority và link tới requirement, Jira/story, test | Version/owner/approval rõ; phân biệt Draft với Approved; không copy backlog/AC thành nhiều nguồn mâu thuẫn |
| Postman | Collection JSON và mock API local `127.0.0.1:3000` | Import collection, chọn environment an toàn, đọc request/response và tự chạy lab sau khi review | Giải thích method/path/auth/body/status/error; lưu assertion/evidence phù hợp. Mock data reset khi server khởi động lại |
| SQL / relational data | `Reservation-Practice.sql`, data model và `Reservation-Capacity-Analysis-Lab.sql` | Chạy fixture trên SQLite; so sánh occupancy khi PENDING không giữ chỗ và khi giữ chỗ | Giải thích shortfall, cohort và vì sao risk không đồng nghĩa overbooking; không dùng PII |
| Excel | Benefit tracker, RTM, decision table, evidence lab, [workbook CR-SMS](./outputs/cr-sms-framework-practice-20261123/CR-SMS-Options-Impact-Traceability.xlsx) và [bài ưu tiên backlog 53–54](./53-Backlog-Priority-Excel-Practice.md) | Làm bản copy C-02 theo [hướng dẫn có lập luận mẫu](./54-Huong-Dan-Uu-Tien-Backlog-Excel.md); tiếp tục tự nhập hai bộ trọng số/điểm trong `Decision Matrix`; so sensitivity, điền CR impact và trace Need→Test | Công thức score đúng; weights = 100%; mỗi score có source/assumption; actual/verdict tách biệt; caveat rõ; MoSCoW có scope release và owner quyết định |
| API / JSON / HTTP | Sequence, mock server, Postman collection và [lab timeout/retry/đối soát](./47-API-Timeout-Retry-Reconciliation-Lab.md) | Phân tích timeout ambiguity, chạy cùng body hai lần trên mock local, lưu actual và đối chiếu giới hạn implementation | Không kết luận timeout là thất bại; phân biệt retry với submit mới; test oracle, key policy, build và evidence được ghi rõ |
| AI assistants | Prompt pattern và human review checklist trong `30-AI-BA-va-Ban-do-Frameworks.md` | Dùng AI phân loại fact/assumption/open question từ brief giả lập, truy vết source và sửa hallucination | Không đưa dữ liệu nhạy cảm; mọi claim truy được nguồn; người học giải thích được phần mình chấp nhận/sửa |
| Portfolio / presentation | Case study cá nhân giả lập, [storyboard 5 phút](./33-Portfolio-Presentation-Storyboard.md) và [deck Figma Slides bản nháp](https://www.figma.com/slides/krV104F5r4J0nAtzKvZUXZ); deck do trợ lý tạo, dự kiến 8 slide nội dung, chưa được visual QA và có thể còn slide trống cuối do giới hạn Figma MCP | Tự làm lại/chỉnh sửa artifact trước khi trình bày; dùng deck nháp làm khung, kiểm tra/xóa slide trống nếu có, trình bày 5 phút và trả lời “bằng chứng nào thật, điểm nào giả lập?” | Câu chuyện ngắn, trung thực; giải thích trade-off, giới hạn và quyết định cần stakeholder; artifact cá nhân mở được |

### Trạng thái tích hợp và môi trường (kiểm tra 23-11-2026)

| Công cụ | Bằng chứng hiện tại | Cách luyện có thể làm |
|---|---|---|
| Figma / FigJam | Figma Design prototype có trong portfolio. FigJam board [BA Practice Project — Restaurant Reservation](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23) đã được tạo trong team Cody empire theo lựa chọn của người dùng và xác minh bằng ảnh render. Đây là board mẫu do trợ lý tạo. Board trống trùng lặp [BA Practice — BRULE-02 Decision Workshop](https://www.figma.com/board/HJaxjtgrTZm8gz3afLZAgZ) được tạo nhầm trong lần tiếp tục; chưa thể thêm/xác minh nội dung do giới hạn tool call Starter, không dùng làm evidence. | Người học tự dựng story map hoặc impact workshop, thêm nguồn/evidence, decision log và giải thích trade-off; chỉ chấm kỹ năng sau khi review artifact tự làm. |
| Jira / Confluence (Atlassian) | Chưa kết nối trong phiên. Atlassian plugin đã được đề xuất kết nối; chờ phiên xác nhận kết nối. | Dùng [CSV staging lab](./51-Jira-CSV-Backlog-Staging-Lab.md) và bản copy CSV. Sau khi kết nối được xác nhận, chọn đúng project học tập trước khi nhập. |
| ClickUp | Tool hiện diện nhưng truy vấn user trả về `no authorized workspaces`; chưa đọc hoặc ghi được workspace. | Kết nối/cấp quyền workspace rồi xác minh bằng thao tác chỉ đọc; không tạo project/task khi chưa xác định đúng workspace/list. |
| Postman | Có nguồn interchange `Postman-Collection.json` v2.1 và collection Local Mode v3 YAML trong `postman-v3/` (10 request). Postman Desktop v12 đang mở và controls đọc được; Local Files hiện gắn với repo `DYBInh2k5/Phat-Trien-Du-An-Phan-Mem`, không phải case study đặt bàn. Khi chọn folder dự án BA, app báo workspace đang kết nối repo khác. Chưa chọn **Connect Current Folder**, chưa import collection, chưa gửi request. Mock API `127.0.0.1:3000` có thể dừng khi phiên kết thúc. | Chọn workspace/destination riêng trước khi import; import vào cloud workspace sẽ lưu collection ở đó, còn liên kết Local Files hiện tại không được đổi nếu chưa quyết định. Sau khi chuẩn bị workspace, mở request health check, tự gửi, rồi làm request validation/capacity. Ghi status/body, environment, thời gian và evidence; chỉ dùng dữ liệu giả. |
| Miro / bảng workshop | Chưa có Miro board/tool trực tiếp. FigJam board mẫu đã tồn tại từ trước, nhưng Figma connector hiện chưa xác nhận kết nối nên chưa thể kiểm tra hoặc chỉnh sửa board live. | Làm [lab workshop chuyển giao Miro/FigJam](./44-Lab-Chuyen-Cong-Cu-Visual-Paradigm-Miro-FigJam.md); sau khi Figma xác nhận kết nối, mở board mẫu rồi tự dựng workshop riêng. |
| SQL / database | SQL script có trong workspace; chưa có bằng chứng script đã được thực thi trên database. | Chọn SQLite/PostgreSQL cục bộ, dùng dữ liệu giả lập và lưu query/output làm evidence. |
| Excel | Benefit tracker, RTM, decision table và evidence lab đều có trong `outputs`. Người học chưa tự thao tác theo evidence. | Lọc dataset giả lập, đối chiếu summary với source rows rồi ghi missing data và caveat. |

Kết nối plugin và năng lực người học là hai trạng thái khác nhau: tool sẵn có không chứng minh đã thực hành; file mẫu do trợ lý tạo không được tính là evidence cấp độ của người học. Trạng thái công cụ có thể thay đổi, nên kiểm tra lại trước lab thực tế.
## Lộ trình lab theo thứ tự phụ thuộc

### Lab A — Process → requirements

Mở As-Is/To-Be, chọn một pain point, cập nhật quy tắc, viết story+AC, truy tới test trong RTM. Bắt đầu trên draw.io và Markdown; đưa vào Jira sau khi có kết nối.

### Lab B — Design → API

Dựa trên một story, bổ sung state/exception trong Figma; xác định request/response/error; đọc collection Postman và liên hệ mỗi response với AC. Không gửi dữ liệu khách thật.

### Lab C — Data → metric

Chạy SQL bằng dataset giả lập; kiểm tra duplicate, state transition và timestamp; đối chiếu metric trong Excel với định nghĩa ở bài 16. Ghi lý do số liệu khác nhau.

### Lab D — Change → governance

Mô phỏng CR-01: làm impact map, cập nhật RTM, ghi decision log; giữ nguyên baseline nếu chưa duyệt. Dùng Jira link/change status và Confluence page khi đã kết nối.

### Lab E — UAT → portfolio

Thực hiện [lab UAT-11, defect triage và sign-off](./42-UAT-Evidence-Defect-Triage-and-Signoff.md): ghi actual response trong Postman, tách API verdict khỏi UI verdict, phân loại defect/change/open decision và lập readiness summary. Nối UAT acceptance sang release readiness ở bài 21 và benefit review ở bài 16; không suy ra outcome từ sign-off. Sau đó tạo walkthrough portfolio 5 phút, ghi rõ mock/test thật ở phạm vi nào.

## Lộ trình học 8 tuần

Gợi ý nhịp học: **3 buổi/tuần, mỗi buổi 45–60 phút**. Buổi 1 học khái niệm và đọc ví dụ; buổi 2 tự thao tác công cụ; buổi 3 giải thích lựa chọn, ghi evidence, nhận review. Điều chỉnh lịch theo thời gian của bạn; không chuyển một tuần thành “đạt” chỉ vì đã đọc tài liệu.

| Tuần | Chủ đề | Tài liệu chính | Bài tự làm / đầu ra checkpoint |
|---|---|---|---|
| 1 | Tư duy BA/hệ thống, SDLC, outcome, stakeholder, lập kế hoạch, root cause | `01`, `02`, `06`, `07`, `08`, `23`, `25`, `32`, `35` | Role-play, problem statement, system boundary, evidence vs assumption, stakeholder/decision map và approach brief có trade-off/gate |
| 2 | Elicitation, process modeling và decision tables | `04`, `09`, `10`, `26`, `27`, `29`, `37`, `38` + BPMN + sitemap/function tree + decision table Excel | Vẽ flow có exception; điều phối workshop BRULE-02; hoàn thành Gap Analysis worksheet và trace một To-Be change tới AC/test |
| 3 | Requirements lifecycle, URD/SRS, backlog và traceability | `03`, `11`, `13`, `22`, `34` + RTM Excel | Tạo URD need → system requirement → story/AC → use case/test; sửa requirement từ feedback và cập nhật trace |
| 4 | Data, API, solution design và prototype | `12`, `13`, `14`, `29` + Figma/draw.io | Cập nhật data/API flow và prototype error state; ghi open questions |
| 5 | Kiểm chứng, NFR và dữ liệu vận hành | `05`, `15`, `21`, `16`, `27` + Postman/SQL/Excel evidence lab | Đọc API response, viết NFR scenario, tính KPI và giải thích test evidence |
| 6 | Strategy, business case, change và risk | `17`, `19`, `22`, `23`, `28`, `45` | Phân tích CR-01, BRULE-02 và lab framework cho CR-SMS; lập decision brief có evidence gap, recommendation, role/authority và impact map |
| 7 | Agile discovery/delivery và phối hợp công cụ | `20`, `23`, `24`, `30` + AI/Jira/Confluence nếu đã kết nối | Story map, cắt MVP, dùng AI draft rồi review traceability; cập nhật owner, dependency, decision |
| 8 | Capstone và portfolio | `16`, `18`, `24`, `43` + toàn bộ artifact đã tự chỉnh | Hoàn thành [capstone BA end-to-end](./43-Capstone-BA-End-to-End-Practice.md), walkthrough 5 phút, RTM sạch, lessons learned, scorecard chỉ chấm khi có evidence |

### Gate để chuyển tuần

- Có artifact tự làm được lưu ở workspace hoặc tool, không chỉ đọc bản mẫu.
- Có thể giải thích source, assumption, decision, trade-off và ai phải xác nhận.
- Trace ít nhất một outcome → requirement → design/data → test/evidence.
- Ghi blocker/open question và bước tiếp theo; không tự đánh dấu Verified nếu chưa chạy/được review.

Nếu một tuần chưa đạt gate, tiếp tục luyện đúng kỹ năng đó; lộ trình không phải kỳ thi tốc độ.
## Scorecard cho người học

Để trống cho đến khi tự thực hành:

| Tool group | Cấp hiện tại 0–3 | Evidence | Reviewer | Lần ôn tiếp |
|---|---:|---|---|---|
| Documentation/traceability | Chưa đánh giá |  |  |  |
| Process modeling | Chưa đánh giá |  |  |  |
| Figma/FigJam | Chưa đánh giá |  |  |  |
| Jira/Confluence | Chưa đánh giá |  |  |  |
| Postman/API | Chưa đánh giá |  |  |  |
| SQL/Excel/analytics | Chưa đánh giá |  |  |  |
| UAT/quality/governance | Chưa đánh giá |  |  |  |
| AI-assisted BA | Chưa đánh giá |  |  |  |
| Portfolio/communication | Chưa đánh giá |  |  |  |

## Bài đầu tiên để bắt đầu ngay

Chọn một requirement trong RTM có `Gap` hoặc `Partial`. Tự mở file tương ứng bằng tool được nêu, chỉnh artifact, cập nhật source/version và viết 3 dòng: **đã làm gì, quyết định nào cần xác nhận, evidence nào chứng minh kết quả**. Sau khi bạn gửi artifact/ảnh hoặc phần bạn đã làm, mình sẽ review như BA lead và cập nhật scorecard dựa trên evidence thực.

### Lộ trình thực hành 3 buổi đầu

| Buổi | Tool và thời lượng gợi ý | Thao tác của người học | Evidence để review |
|---|---|---|---|
| 1 — Process model (30 phút) | draw.io | Mở một bản copy của `09-Reservation-As-Is.drawio`; thêm annotation cho lời kể giả lập và open point về ownership; không vẽ handoff chưa xác minh; lưu bản của bạn với ngày/version. | File `.drawio` tự sửa + ảnh export + 2 câu giải thích fact vs open question |
| 2 — API request (30–45 phút) | Node mock + Postman | Theo [Postman Lab](./15-Postman-Practice-Lab.md); import collection; gọi health, một request hợp lệ, một validation error; đọc status/body và liên kết từng response với AC. Không dùng dữ liệu khách thật. | Request/response đã khử dữ liệu nhạy cảm + ghi build/seed/expected vs actual |
| 3 — Evidence analysis (30–45 phút) | Excel | Mở `outputs/evidence-analysis-lab/Pending-Decision-Evidence-Lab.xlsx`; lọc `PENDING`, tự đếm record và so với summary; tạo một PivotTable theo channel/status và viết một caveat về sample hoặc missing evidence. | Workbook bản copy + pivot + 3 dòng: nguồn, kết quả, giới hạn |

Ba buổi dùng cùng một case study, nhưng mỗi tool trả lời câu hỏi khác nhau: draw.io diễn tả process hypothesis; Postman kiểm tra API mock; Excel kiểm tra fixture. Chưa có artifact/evidence do người học tự tạo thì giữ trạng thái scorecard `Chưa đánh giá`.














