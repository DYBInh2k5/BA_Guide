# 59 — Metric specification: thời gian xác nhận đã nhận yêu cầu

## Mục tiêu học tập

Chuyển lời stakeholder “khách muốn biết yêu cầu đã được nhận” thành metric có thể tính và kiểm tra, đồng thời tách outcome khỏi giải pháp SMS. Đây là case mô phỏng; mọi lời kể, event và quyết định dưới đây chưa được nhà hàng thật xác nhận.

## Bối cảnh và trạng thái thông tin

Sponsor mô phỏng cho biết tuần trước “có thể hai khách” gọi hỏi trạng thái; lễ tân chưa ghi riêng loại cuộc gọi này; quản lý “thường xác nhận trong khoảng 20 phút”. Sponsor muốn khách biết yêu cầu đã được tiếp nhận và đề xuất SMS mỗi lần đổi trạng thái.

| Statement | Phân loại | Trạng thái |
|---|---|---|
| Có thể hai khách gọi hỏi tuần trước | Ước lượng được báo cáo | Chưa đối chiếu log, chưa phải baseline |
| Quản lý thường xác nhận trong khoảng 20 phút | Ước lượng về quy trình | Cần quan sát/đối chiếu timestamp; chưa phải SLA |
| Khách cần biết yêu cầu đã được nhận | Need/outcome candidate | Cần Product/Operations xác nhận nghĩa của “đã nhận” |
| Gửi SMS mỗi lần đổi trạng thái | Solution proposal | Chưa duyệt; cần so sánh option, cost, consent và failure handling |

## Metric candidate

**Tên:** Acknowledgement latency — thời gian từ lúc hệ thống tiếp nhận yêu cầu đến lúc khách được thông báo đã nhận.

**Câu hỏi quản trị:** trong các yêu cầu thuộc phạm vi đo, khách được báo đã nhận nhanh đến mức nào?

**Đơn vị phân tích:** một reservation request duy nhất. Retry gửi thông báo không tạo thêm request và không nhân bản mẫu số.

**Cohort:** reservation request hợp lệ được tạo trong kỳ báo cáo, theo timezone do Product/Data xác nhận. Loại test/internal request bằng cờ có nguồn rõ. Không tự loại request bị hủy nếu chưa có quyết định về cohort.

**Bắt đầu:** `request_received_at` — timestamp server ghi nhận request đã qua validation và được lưu thành công. Nếu request bị từ chối trước khi lưu, không đưa vào cohort chính; có thể báo riêng tỷ lệ reject.

**Kết thúc:** `customer_acknowledged_at` — event xác nhận khách thực sự nhìn thấy thông báo “đã nhận yêu cầu”. Chưa biết hệ thống có thể quan sát việc khách nhìn thấy hay không. `message_queued_at`, `provider_accepted_at` hoặc HTTP 200 không mặc nhiên chứng minh khách đã nhận/đọc.

**Công thức:** `customer_acknowledged_at - request_received_at`, tính bằng giây. Báo cáo median và p90; luôn báo số request đủ timestamp và độ phủ.

**Coverage:** số request trong cohort có cả timestamp bắt đầu và timestamp kết thúc chia cho tổng request trong cohort. Báo riêng số/ tỷ lệ thiếu event, reject, timeout chưa rõ và duplicate event. Không âm thầm loại bản ghi thiếu để làm metric trông tốt hơn.

**Phân đoạn hữu ích:** channel, ngày/ca, outcome delivery. Chỉ so sánh nếu event được capture cùng quy tắc giữa các phân đoạn; mẫu nhỏ/coverage thấp phải được chú thích.

## Metric liên quan nhưng không thay thế nhau

| Metric | Đo điều gì | Không chứng minh điều gì |
|---|---|---|
| Acknowledgement latency | Tốc độ hệ thống báo đã tiếp nhận request | Khách đã hiểu, request đã được staff xác nhận, hay bàn đã được giữ |
| Staff decision time | Thời gian từ nhận request tới quyết định confirm/reject | Khách đã được thông báo quyết định |
| Notification delivery rate | Tỷ lệ thông báo được provider xác nhận đã giao theo định nghĩa đã duyệt | Khách đọc/hiểu thông báo hoặc SMS giảm cuộc gọi |
| Repeat status inquiry rate | Tỷ lệ request gắn với cuộc gọi/tin nhắn hỏi trạng thái lặp | Nguyên nhân là thiếu notification nếu chưa có phân tích bổ sung |

Không gộp bốn metric thành một “response time”. Chúng có event, owner và hành động khác nhau.

## Event/data cần xác minh với Product, Engineering, Operations và Privacy

| Event/field candidate | Câu hỏi xác nhận | Owner cần có |
|---|---|---|
| `request_received_at` | Ghi ở thời điểm nào; timezone; request trùng/idempotency xử lý ra sao? | Engineering |
| `customer_acknowledged_at` | Có thể quan sát khách thấy thông báo không? Nếu chỉ biết provider accepted, metric phải đổi tên/ý nghĩa thế nào? | Product + Engineering |
| `request_id` / `notification_id` | Khóa nào nối request với thông báo; retry/dedup thế nào; bảo vệ dữ liệu ra sao? | Engineering + Privacy |
| `channel` / `notification_status` | Taxonomy hợp lệ, terminal state và unknown outcome là gì? | Product + Operations |
| `test_flag` / `created_at` | Nhận diện traffic test và chốt cutoff/cohort bằng nguồn nào? | Data/Engineering |
| Repeat inquiry event | Có ghi call log và liên kết được với request không? Nếu không, pilot cần quy trình capture nào? | Operations |

## Data quality và cách diễn giải

- Timestamp kết thúc trước timestamp bắt đầu là lỗi dữ liệu, không chuyển thành latency âm hợp lệ.
- Nhiều attempt của cùng notification: tính theo quy tắc metric đã duyệt (ví dụ lần đầu đạt terminal success); giữ attempt-level data cho reliability analysis.
- Nếu chỉ biết provider nhận request gửi, đổi tên thành `time_to_provider_acceptance`; không gọi là thời điểm khách đã nhận.
- Nếu không có timestamp khách nhìn thấy, đánh dấu câu hỏi metric chưa khả thi; xem xét proxy nhưng phải ghi rõ proxy và không tuyên bố tương đương.
- Tỷ lệ gọi hỏi lại hiện chưa đo được từ lời kể “có thể hai khách”. Cần call log hoặc pilot logging với định nghĩa “repeat”, liên kết request, kỳ quan sát và owner.
- Không kết luận SMS gây giảm gọi hỏi lại từ before/after đơn giản nếu còn thay đổi ca trực, quy trình, mùa vụ hoặc cách ghi log.

## Đề xuất instrumentation và quyết định

1. Discovery với Operations/Data để xác nhận nguồn timestamp và khả năng ghi nhận call inquiry.
2. Product xác nhận “được báo đã nhận” khác “được nhân viên xác nhận”; chọn event đúng với need.
3. Engineering/Privacy đánh giá dữ liệu liên kết, consent, retention, duplicate/retry và quyền truy cập.
4. Ghi decision log về cohort, timezone, event kết thúc, unknown, retry và owner; giữ `Open` cho tới khi người có thẩm quyền duyệt.
5. Chỉ sau khi có baseline/coverage đủ dùng mới đề xuất target và so sánh option như UI status, email hoặc SMS.

## Trace slice: need → requirement → AC → UAT → metric

Giữ hai luồng có liên quan nhưng khác nhau: **trạng thái chức năng cho khách** và **đo hiệu năng thông báo trạng thái**. Một metric latency tốt không tự chứng minh UI đúng; UI đúng cũng không tự chứng minh khách đã đọc.

| ID | Artifact | Nội dung nháp | Điều kiện trước khi baseline |
|---|---|---|---|
| N-ACK | Need | Khách cần biết hệ thống đã nhận yêu cầu, không hiểu nhầm là bàn đã được xác nhận | Product/Operations xác nhận need và wording |
| R-ACK-01 | Functional requirement | Sau khi lưu request thành công, trang kết quả hiển thị trạng thái đã nhận và đang chờ staff decision | Product duyệt state/copy; Engineering xác nhận behavior |
| AC-ACK-01 | Acceptance criterion | Request lưu thành công → hiển thị copy được duyệt; copy không khẳng định reservation đã confirmed | Baseline state model và copy được duyệt |
| AC-ACK-02 | Acceptance criterion | Request không lưu thành công → không hiển thị trạng thái “đã nhận” như thành công | Product duyệt error behavior |
| TC-ACK-01/02 | UAT cases | Một case lưu thành công; một case lỗi lưu. Ghi expected, actual, build, evidence, verdict | UAT tester dùng build và test data được chỉ định |
| MET-ACK-01 | Measurement spec | Đo `request_received_at` → candidate `status_rendered_at` hoặc delivery event đúng nghĩa; report coverage | Engineering/Data xác nhận event, grain và khả năng nối request |

### Worked UAT-ACK-02 — lỗi lưu request hợp lệ

**AC-ACK-02 — bản nháp:** Given request hợp lệ nhưng persistence thất bại, when khách gửi request, then giao diện không hiển thị trạng thái “Đã nhận yêu cầu” như thành công, hiển thị thông báo lỗi đã được Product duyệt, và hệ thống không tạo reservation thành công. Product còn phải duyệt wording/retry behavior; Engineering phải cung cấp cách kích hoạt lỗi trong môi trường UAT.

| Trường execution log | Giá trị cần ghi |
|---|---|
| Test ID / trace | `TC-ACK-02`; `N-ACK → R-ACK-01 → AC-ACK-02` |
| Preconditions | Build/environment được chỉ định; request test hợp lệ; phương thức fault injection được Engineering phê duyệt; không dùng dữ liệu khách thật |
| Steps | Gửi request; kích hoạt persistence failure theo hướng dẫn môi trường; ghi thời gian và mã correlation nếu có |
| Expected | Không xuất hiện success/received state; error copy khớp bản Product duyệt; không có reservation thành công; response/API expectation theo contract đã duyệt |
| Actual/evidence | Ghi UI copy thực tế, HTTP/body nếu scope có API, correlation ID, build, environment, timestamp và kết quả đối chiếu persistence |
| Verdict | `Pass` chỉ khi expected oracle đã duyệt và đủ evidence; `Fail` nếu chạy được và actual mâu thuẫn baseline; `Blocked/Not run` nếu chưa có build, oracle, fault injection hoặc quyền kiểm tra cần thiết |

Không đặt status code hoặc thông báo cụ thể khi API contract/copy chưa được duyệt. Không gọi là defect chỉ vì stakeholder chưa quyết định error behavior; nếu case đã chạy theo baseline duyệt và actual lệch, mới mở defect với bước tái hiện và evidence. Nếu request đã lưu nhưng response timeout làm kết quả không rõ, đó là trạng thái ambiguous cần reconciliation/idempotency analysis, không được giả định “không tạo reservation”. Xem [bài 47 — API timeout, retry và đối soát trạng thái](./47-API-Timeout-Retry-Reconciliation-Lab.md) để phân biệt lỗi trước commit với response bị mất sau commit và lập test idempotency đúng oracle.

`status_rendered_at` chỉ chứng minh client render trạng thái nếu event thực sự được instrument; không chứng minh người dùng đọc hoặc hiểu. Nếu chỉ có provider event thì metric phải đổi tên thành `time_to_provider_acceptance`. Không gắn target trước khi event, cohort, timezone và baseline được duyệt.

### Dùng công cụ để tạo evidence cá nhân

| Công cụ | Thao tác luyện tập | Artifact để review |
|---|---|---|
| Jira hoặc CSV backlog cá nhân | Tạo story R-ACK-01; gắn AC, priority rationale, source N-ACK, dependency và trạng thái draft | Issue/story có ID, owner/reviewer và link trace |
| FigJam/Miro | Vẽ state flow `Submitted → Received/Pending → Confirmed/Rejected`; đánh dấu lỗi/unknown và câu hỏi policy | Board có legend cho reported/assumption/decision/open item |
| Figma | Vẽ success/error state với copy giả lập đã dán nhãn draft; không thiết kế “confirmed” khi request chỉ mới nhận | Prototype hoặc wireframe, nối state với AC |
| Postman | Chỉ khi API có response contract tương ứng: gửi success/error request, lưu status/body và đối chiếu oracle được duyệt | Collection/run log; mock không được ghi là production behavior |
| SQL/Excel | Nếu event fixture tồn tại, tính latency và coverage; đối soát unknown, duplicate, retry trước khi diễn giải | Query/workbook cá nhân, định nghĩa metric và caveat |

Không giả vờ rằng hiện tại có Jira project, quyền chỉnh Figma, API event hay dữ liệu sản phẩm phù hợp. Nếu tool/access không có, dùng CSV, draw.io, Markdown hoặc fixture và ghi rõ mức mô phỏng.

### Jira mini-lab — stage backlog bằng CSV

File [Jira-ACK-Backlog-Staging.csv](./Jira-ACK-Backlog-Staging.csv) có một Epic, một Story draft và một discovery Task. Đây là dữ liệu thực hành riêng, không làm thay đổi backlog gốc. `Work item ID` trong CSV là ID để map hierarchy lúc import, không phải Jira key. Mọi scope/priority còn là đề xuất.

1. Mở file bằng Excel/LibreOffice/Google Sheets hoặc import vào Jira sandbox do bạn/team chỉ định; không dùng project công việc không liên quan.
2. Kiểm tra encoding, dấu phẩy/quote, Work type, parent đứng trước child và Description giữ đủ AC/open questions.
3. Nếu sandbox không sẵn có, review CSV offline: xác nhận có 3 rows gồm 1 Epic, 1 Story, 1 Task và cả hai item con parent ID `1`.
4. Nếu import thật, chụp import mapping/log đã khử thông tin nhạy cảm; mở từng item, kiểm tra hierarchy/copy/IDs trước khi gọi backlog usable.
5. Dependency Task `blocks` Story chỉ tạo thành issue link riêng sau khi người phụ trách refinement xác nhận. `Parent=1` chỉ thể hiện Epic hierarchy, không biểu diễn dependency.

Không gán sprint, assignee, due date hoặc story point khi team chưa xác nhận. Nếu không có quyền/sandbox, đánh dấu `Not imported`; việc mở CSV không được tính là thực hành Jira đã hoàn tất.

### State modeling lab — business state khác UI state

Đừng vẽ trạng thái reservation cùng một máy trạng thái với trạng thái submit trên trình duyệt. Reservation mô tả lifecycle nghiệp vụ; UI mô tả điều client quan sát trong một lần tương tác. Diagram dưới đây là hypothesis để review, không phải policy được duyệt.

| Model | Transition candidate | Guard/evidence trước transition | Open decision |
|---|---|---|---|
| Reservation | `Submitted → Pending` | Persistence thành công; có request ID | `PENDING` giữ capacity không? status có tạo khi notification/UI lỗi không? |
| Reservation | `Pending → Confirmed` | Actor có quyền; quyết định được ghi nhận | Role/authority và capacity rule nào cho phép confirm? |
| Reservation | `Pending → Rejected` | Actor có quyền; outcome được lưu | Reason bắt buộc/tùy chọn và rule thông báo? |
| UI interaction | `Editing → Submitting` | Khách submit; client khóa thao tác theo UX policy | Double click / submit đồng thời được xử lý thế nào? |
| UI interaction | `Submitting → Success` | Có response/evidence persistence thành công | Nội dung copy nào đã được Product duyệt? |
| UI interaction | `Submitting → Error` | Hệ thống xác nhận request không được lưu | Error copy, giữ form, retry behavior là gì? |
| UI interaction | `Submitting → Outcome unknown` | Timeout/mất response; commit chưa xác định | Cách tra cứu/reconcile và retry cùng ý định theo API contract? |

**UAT trace:** `TC-ACK-01` kiểm tra thành công chỉ sau khi persistence được xác nhận; `TC-ACK-02` kiểm tra lỗi đã xác nhận và không có reservation thành công; `TC-ACK-03` kiểm tra timeout ambiguity theo idempotency/reconciliation contract ở [bài 47](./47-API-Timeout-Retry-Reconciliation-Lab.md). Nếu chưa có oracle/fault injection, `TC-ACK-03` là `Blocked/Not run`, không tự ghi `Fail` hay `Pass`.

**Thao tác draw.io:** tạo hai diagram riêng, dùng tên state rõ và gắn guard/trigger trên mũi tên; thêm legend `Draft / Approved / Open`. Trace mỗi transition đến requirement/AC/test ID. Không thêm arrow chỉ vì muốn “hoàn thành sơ đồ”; trước hết phải có source/authority. Nếu dùng FigJam/Figma chưa có edit access, tự lưu bản draw.io/Markdown cá nhân và ghi tool thay thế.

## Bài tập của người học

Tạo bản copy và tự điền:

1. Chọn một trong hai định nghĩa kết thúc: khách thấy trạng thái trên trang, hoặc provider xác nhận giao thông báo. Giải thích trade-off và đổi tên metric cho chính xác.
2. Viết lại cohort và timezone dưới dạng quyết định cần Product/Data duyệt; không tự giả làm policy đã duyệt.
3. Nêu cách xử lý retry, duplicate request, timestamp thiếu và provider timeout chưa rõ.
4. Viết ba câu hỏi phỏng vấn Operations/Engineering có thể làm thay đổi metric design.
5. Đề xuất bảng event tối thiểu; chỉ rõ field nào đang có, field nào cần instrument, owner và privacy review.
6. Viết một đoạn diễn giải cho lãnh đạo gồm metric, coverage, giới hạn và quyết định kế tiếp. Không đặt target nếu chưa có baseline/authority.
7. Tạo trace slice ID riêng cho need → requirement → AC → UAT → metric; ghi tool/file, trạng thái draft/approved, owner và evidence. Nếu dùng artifact mẫu, hãy tự tạo bản copy và chỉnh nội dung để có bằng chứng do bạn làm.
8. Vẽ riêng state diagram nghiệp vụ và UI; gắn guard cho `Submitting → Success`, `Submitting → Error`, `Submitting → Outcome unknown`, rồi đánh dấu source/owner cho từng transition.

### Rubric tự review (0–2 mỗi tiêu chí)

| Tiêu chí | 0 | 1 | 2 |
|---|---|---|---|
| Outcome và solution | Gộp need với SMS | Tách nhưng còn lẫn ở metric | Metric đo đúng outcome và giữ SMS là option |
| Cohort/grain | Không rõ mẫu số | Có cohort nhưng thiếu rule | Request-level, scope/exclusion có owner quyết định |
| Event semantics | Gọi provider accepted là customer received | Có nêu caveat | Tên, event và claim khớp nhau |
| Data quality | Bỏ qua unknown/retry | Có liệt kê | Định nghĩa coverage, dedup, unknown và invalid timestamp |
| Governance | Tự chốt policy/target | Có open questions | Mỗi quyết định có owner/evidence/status |
| Diễn giải nhân quả | Tuyên bố SMS làm giảm call | Nêu giới hạn chung | Xác định confounder và kế hoạch đo phù hợp |

Tổng điểm không phải chứng chỉ. Chỉ chấm artifact do người học tự tạo; mẫu trong repo là tài liệu trợ giảng giả lập.

## Evidence portfolio

Lưu metric spec cá nhân, source/event dictionary, decision log có trạng thái, truy vấn hoặc bảng tính tự viết và ảnh/log execution nếu đã tự chạy. Ghi tool/version, fixture hay dữ liệu thật, ngày, giới hạn và phần nào do trợ lý hỗ trợ. Không ghi dữ liệu mô phỏng là kết quả khách hàng.
