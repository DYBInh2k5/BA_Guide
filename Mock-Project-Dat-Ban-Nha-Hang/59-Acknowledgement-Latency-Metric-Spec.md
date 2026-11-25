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

## Bài tập của người học

Tạo bản copy và tự điền:

1. Chọn một trong hai định nghĩa kết thúc: khách thấy trạng thái trên trang, hoặc provider xác nhận giao thông báo. Giải thích trade-off và đổi tên metric cho chính xác.
2. Viết lại cohort và timezone dưới dạng quyết định cần Product/Data duyệt; không tự giả làm policy đã duyệt.
3. Nêu cách xử lý retry, duplicate request, timestamp thiếu và provider timeout chưa rõ.
4. Viết ba câu hỏi phỏng vấn Operations/Engineering có thể làm thay đổi metric design.
5. Đề xuất bảng event tối thiểu; chỉ rõ field nào đang có, field nào cần instrument, owner và privacy review.
6. Viết một đoạn diễn giải cho lãnh đạo gồm metric, coverage, giới hạn và quyết định kế tiếp. Không đặt target nếu chưa có baseline/authority.

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
