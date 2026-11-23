# 47 — API timeout, retry và đối soát trạng thái

## Mục tiêu

Phân tích được timeout mà không đoán giao dịch đã thất bại; hỏi đúng policy cho retry; phân biệt một lần submit được gửi lại với một booking mới có chủ ý; và thiết kế bằng chứng đối soát. Case và API ở bài này là mock học tập, không phải dịch vụ production.

## Mô hình tư duy

Client gửi một request. Timeout có nghĩa client không nhận được response trong thời gian chờ. Nó **không tự cho biết** server đã nhận, đã commit, đã từ chối hay đang xử lý.

| Điểm xảy ra sự cố | Điều client quan sát | Điều có thể đã xảy ra ở server | Hành động BA cần hỗ trợ làm rõ |
|---|---|---|---|
| Request chưa tới server | Timeout / lỗi kết nối | Chưa có transaction | Có thể gửi lại sau khi kiểm tra contract; ghi nhận request identity |
| Server nhận nhưng chưa commit | Timeout | Đang xử lý, rollback hoặc kết quả chưa rõ | Cần trạng thái xử lý/retry contract; không báo booking thành công |
| Server commit, response bị mất | Timeout | Booking đã được ghi | Retry mù có thể tạo booking thứ hai nếu thiếu idempotency; cần tra cứu/replay cùng thao tác |
| Server trả lỗi nghiệp vụ nhưng response bị mất | Timeout | Ví dụ capacity conflict đã được ghi log; booking không được tạo theo contract | Cần khả năng truy vấn/đối soát để UI không đoán |
| Client tự gửi một thao tác mới | Response bình thường | Đây là submit mới nếu key/reference mới theo contract | Không gộp hai ý định khác nhau chỉ vì payload giống nhau |

## Phân biệt retry với submit mới

- **Retry:** gửi lại cùng một ý định nghiệp vụ vì kết quả lần trước chưa rõ. Nhận diện thường cần request token/idempotency key hoặc correlation reference do contract định nghĩa.
- **Submit mới:** người dùng quyết định tạo một yêu cầu khác, dù body có thể giống request trước. Cần nhận diện ý định mới; không nên khử trùng chỉ dựa trên tên/điện thoại/thời gian gần nhau nếu chưa có business rule.
- **Idempotent effect:** lặp lại cùng thao tác trong phạm vi contract tạo một kết quả nghiệp vụ có thể đối chiếu và không nhân đôi side effect. Đây không đồng nghĩa mọi request giống nhau trên thế giới chỉ tạo một record mãi mãi.

Các quyết định phải có owner: định dạng key, phạm vi key theo actor/operation, thời hạn lưu, hành vi cùng key/body khác, request đồng thời cùng key, replay response, cách tra cứu khi client mất key, và cách xử lý side effect (ví dụ email/SMS). BA ghi outcome/rule và acceptance; Engineering đề xuất protocol/storage; Security/Operations review bảo vệ key, log, retention và vận hành.

## Requirement/AC/test mẫu (đều là draft)

**Need:** Sau submit, khách cần biết yêu cầu đã được nhà hàng tiếp nhận hay chưa. Hiện là need giả lập; cần xác minh bằng phỏng vấn/quan sát/dữ liệu liên hệ.

**Requirement draft:** Hệ thống phải cho phép đối chiếu kết quả của cùng một thao tác submit sau lỗi mất response mà không tạo thêm reservation cho thao tác đó.

**Business rule draft:** Một request identity đã được chấp nhận chỉ tạo một reservation effect trong thời hạn policy được duyệt. Key, TTL và xử lý payload mismatch còn mở.

**AC-RETRY-DRAFT-01:**

```gherkin
Given một submit với request identity K đã được commit
And client không nhận response ban đầu
When client retry cùng K với payload đã dùng
Then hệ thống không tạo thêm reservation cho K
And trả kết quả có thể đối chiếu với reservation đã lưu
And occupancy/history không ghi nhận thao tác đó hai lần
```

**Oracle cần có:** approved retry/idempotency rule, API contract/version và capacity/history rule liên quan. Chưa được duyệt thì test expected result là `Blocked/Open`; không tự đặt HTTP code.

**Test condition:** test harness tạo request K; buộc rớt response sau commit; gửi lại cùng key/body; kiểm tra response, reservation count, occupancy/history. Cần Engineering/QA hỗ trợ injection điểm mất response và state observation. Một Postman request tuần tự không đủ tự mô phỏng “commit rồi mất response”.

## Thực hành trên mock hiện tại

Đọc implementation ở `practice-api/server.js`, nhánh `POST /api/reservations`, và hướng dẫn trong [Postman Lab](./15-Postman-Practice-Lab.md): mock chưa nhận idempotency key; mỗi request hợp lệ tạo reservation mới trong memory. Vì vậy:

1. Chỉ dùng dữ liệu tổng hợp và môi trường local.
2. Khởi động/restart server để có seed xác định; ghi build/commit và thời điểm.
3. Gửi request hợp lệ một lần; lưu status/body/reference.
4. Gửi lại cùng body lần hai; ghi actual, không sửa thành expected.
5. Tra cứu hai reference/count bằng API mock, ghi điều bạn quan sát.
6. Kết luận giới hạn: điều này chỉ mô tả implementation hiện tại; không mô phỏng mất response sau commit, không chứng minh sản phẩm thật có/không idempotency, và không kiểm chứng concurrency.

Nếu bạn chưa tự chạy, ghi `Not run`. Không dùng row mẫu hoặc source code làm evidence rằng bạn đã thực hành Postman.

## Bảng quyết định để refine với stakeholder/team

| Câu hỏi | Owner cần tham vấn | Khi còn mở |
|---|---|---|
| Cái gì định danh một thao tác submit duy nhất? | Product + Engineering | Không thể kết luận request nào là retry |
| Key có hiệu lực bao lâu và khi hết hạn thì sao? | Product + Engineering + Operations | Không thể kết luận retry muộn có tạo bản ghi mới |
| Cùng key nhưng body khác trả hành vi gì? | Product + Engineering | Không được âm thầm đổi kết quả cũ |
| Request đồng thời cùng key được hợp nhất/serialize thế nào? | Engineering + QA | Chưa có bằng chứng concurrency |
| Client có thể tra cứu kết quả qua reference nào khi response mất? | Product + Engineering + UX | UX không nên báo “đã đặt” hoặc yêu cầu bấm submit lại mù |
| Notification side effect lặp có bị ngăn/đối soát không? | Engineering + Operations | Booking có thể không trùng nhưng tin nhắn vẫn trùng |
| Log/key/contact data được bảo vệ và lưu trong bao lâu? | Security/Privacy + Operations | Chưa đủ căn cứ về privacy/retention |

## Execution log của người học

```text
Ngày/giờ, build/commit:
Local environment / seed:
Request body và header đã khử dữ liệu:
Lần 1 status/body/reference:
Lần 2 status/body/reference:
Observed reservation count/state:
Kết quả có đúng business oracle đã duyệt không? Nguồn:
Verdict: Pass / Fail / Blocked / Not run:
Điều mock chứng minh:
Điều mock không chứng minh:
Requirement/decision cần tạo hoặc cập nhật:
```

## Câu hỏi phỏng vấn BA

Khi khách hỏi “Em có thể bấm gửi lại không?”, hãy trả lời trong phạm vi evidence hiện có. Một câu trả lời thận trọng có thể là: “Hiện trạng thái chưa xác định; mình sẽ kiểm tra bằng mã tra cứu/trạng thái request theo quy trình đã duyệt. Nếu chưa có cách tra cứu hoặc retry an toàn, cần Product/Engineering quyết định nội dung hướng dẫn và xử lý trước khi phát hành.” Không tự hứa hệ thống chống trùng nếu chưa có contract/evidence.

Đính kèm execution log tự chạy và một hàng trace Need→Requirement→AC→Test→Actual trong workbook trước khi yêu cầu review năng lực API/Postman.
