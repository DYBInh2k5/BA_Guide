# 03 — Requirements & Backlog

## Business requirements
- BR-01: Giảm lỗi điều phối đặt bàn và tăng khả năng theo dõi trạng thái.
- BR-02: Giảm cơ hội đặt bàn bị bỏ lỡ khi kênh điện thoại không hoạt động; baseline và mức cải thiện cần được xác minh. Kênh online là một option, chưa phải business outcome.

## Functional requirements
- FR-01: Khách nhập ngày, giờ, số khách, tên và thông tin liên hệ.
- FR-02: Hệ thống từ chối khung giờ ngoài giờ hoạt động.
- FR-03: Hệ thống không cho gửi yêu cầu nếu sức chứa khả dụng không đáp ứng.
- FR-04: Sau khi gửi, hệ thống hiển thị mã yêu cầu và trạng thái “Chờ xác nhận”.
- FR-05: Nhân viên có thể xác nhận/từ chối yêu cầu và ghi lý do.
- FR-06: Khách nhận email khi trạng thái thay đổi.
- FR-07: Nhân viên có thể tìm theo ngày, tên hoặc mã yêu cầu.
- FR-08: Nhân viên có thể hủy yêu cầu/đặt bàn theo chính sách được duyệt.

## Non-functional requirements (cần xác nhận với kỹ thuật)
- NFR-01: Trang gửi yêu cầu phản hồi trong 3 giây ở tải dự kiến.
- NFR-02: Chỉ nhân viên đã đăng nhập mới xem/sửa danh sách khách.
- NFR-03: Lưu dấu thời gian và người thực hiện khi đổi trạng thái.
- NFR-04: Thông tin liên hệ chỉ dùng cho mục đích xử lý đặt bàn và được bảo vệ theo chính sách dữ liệu của nhà hàng.

## Phân biệt các loại requirement, AC và test case

Các artifact có liên quan nhưng trả lời câu hỏi khác nhau:

| Loại | Trả lời câu hỏi | Ví dụ đặt bàn | Ghi chú |
|---|---|---|---|
| Business requirement / outcome | Tổ chức muốn cải thiện điều gì? | Tăng khả năng theo dõi trạng thái request | Cần metric/baseline và owner; không mặc định giải pháp |
| Business rule | Quy tắc nghiệp vụ nào luôn chi phối quyết định? | Request mới được tạo ở `PENDING`; nhân viên phải xác nhận trước khi khách được coi là đã có bàn | Rule cần source, approver, phạm vi, ngoại lệ, effective version |
| Functional requirement (FR) | Hệ thống phải làm gì để hỗ trợ actor/rule? | Hệ thống tạo reference và lưu trạng thái `PENDING` sau submit hợp lệ | Mô tả hành vi/response; không nhất thiết chỉ định màn hình hay công nghệ |
| Non-functional requirement (NFR) / quality attribute | Hành vi cần tốt đến mức nào, trong điều kiện nào? | p95 submit latency dưới target đã duyệt ở profile tải đã thống nhất | “3 giây” hiện là draft vì thiếu tải, percentile, điểm đo và môi trường; xem module 21 |
| User story | Ai cần outcome nào, vì sao? | Là khách, tôi muốn gửi request để nhà hàng xem xét và phản hồi | Cách diễn đạt backlog; không thay rule/AC |
| Acceptance criteria (AC) | Điều kiện nào phải đúng để story/requirement được chấp nhận? | Với input hợp lệ và capacity đủ, một reference được tạo, status là `PENDING`, occupancy theo policy chỉ tính đúng một lần | Có thể nhiều AC cho happy path, validation, permission và exception |
| Test case | Người kiểm thử chuẩn bị dữ liệu và thao tác cụ thể nào? | Seed slot còn 4 chỗ; submit party size 5; kiểm tra response, reservation, history, occupancy | Gồm setup, steps, expected/actual result, evidence; có thể chạy tự động hoặc thủ công |

**Cách nhớ:** business rule là “luật chơi”; FR là “hệ thống cần làm gì”; NFR là “mức chất lượng trong điều kiện xác định”; AC là “kết quả cần đúng”; test case là “cách tái hiện và ghi bằng chứng”. Một câu có thể cần liên kết nhiều loại artifact, không nên nhét hết vào một story description.

**Ví dụ biến AC thành test case:**

- **AC:** Với input hợp lệ và capacity evaluation đủ, hệ thống tạo một request có reference và trạng thái `PENDING`.
- **TC-US01-VALID-01 setup:** dùng slot test; capacity service/test stub trả “available”; dữ liệu khách hư cấu; gọi đúng môi trường test.
- **Steps:** submit một lần; ghi lại payload/reference; mở màn tra cứu được phép hoặc truy vấn test database.
- **Expected:** customer UI/API thể hiện cùng reference và `PENDING`; đúng một reservation và một initial history event được tạo.
- **Actual/evidence:** để trống tới khi chạy test; lưu timestamp, build, sanitized request/response và record IDs.
- **Open dependency:** expected occupancy sau khi tạo `PENDING` phụ thuộc policy giữ chỗ chưa duyệt. Test phần occupancy đó phải ở `Blocked` hoặc chỉ chạy với policy đã được chốt; không tự chọn kết quả.

AC nêu điều phải đúng nhưng thường chưa đủ setup để QA tái hiện. Test case cụ thể hóa data, precondition, bước, expected/actual và bằng chứng.

**Phân quyền:** “Chỉ nhân viên có quyền mới được xem/sửa queue” có thể được ghi thành functional access-control requirement và liên kết với security NFR/policy. Cách phân loại phụ thuộc taxonomy của tổ chức; quan trọng là quyền, action, data scope và negative case có thể truy vết, không chỉ gắn nhãn.

## MVP user stories

### US-01 — Gửi yêu cầu đặt bàn (Must)
As a khách hàng, I want gửi yêu cầu đặt bàn với ngày giờ và số người, so that nhà hàng có thể xem xét và phản hồi yêu cầu.

Acceptance criteria:
- **AC-US01-01 — happy path:** Given ngày/giờ nằm trong lịch nhận đặt, when tôi nhập đủ trường hợp lệ và gửi, then hệ thống tạo mã yêu cầu ở trạng thái “Chờ xác nhận”.
- **AC-US01-02 — thiếu kênh liên hệ:** Given khách không cung cấp cả số điện thoại lẫn email, when gửi, then hệ thống chỉ rõ yêu cầu liên hệ theo policy và không tạo yêu cầu.
- **AC-US01-03 — party size không hợp lệ:** Given số người không hợp lệ, when gửi, then hệ thống báo lỗi field tương ứng và không tạo yêu cầu.
- **AC-US01-04 — capacity không đủ:** Given thông tin hợp lệ, slot đang mở nhưng capacity evaluation trả available capacity nhỏ hơn party size, when tôi gửi, then UI/API báo slot không khả dụng, cho phép chọn slot khác và không tạo reservation/initial history; occupancy không đổi do request bị từ chối.

`AC-US01-02` và `AC-US01-03` tách hai nguyên nhân để QA có thể tạo data và expected result riêng. Validation precedence khi nhiều field cùng sai cần được chốt nếu sản phẩm phải trả lỗi theo thứ tự cụ thể.

### US-02 — Xử lý yêu cầu (Must)
As a lễ tân, I want xem và xác nhận/từ chối yêu cầu, so that danh sách đặt bàn phản ánh quyết định của nhà hàng.

Acceptance criteria:
- Given tôi là nhân viên đã đăng nhập và yêu cầu đang chờ, when tôi xác nhận, then trạng thái đổi thành “Đã xác nhận” và ghi người/thời điểm.
- Given yêu cầu bị từ chối, when tôi nhập lý do và xác nhận từ chối, then trạng thái đổi thành “Từ chối” và lý do được lưu.
- Given trạng thái đã kết thúc, when tôi thử xác nhận lần nữa, then hệ thống không tạo chuyển trạng thái không hợp lệ.
- **AC-US02-04 — không có yêu cầu chờ (draft; nếu dùng queue):** Given nhân viên có quyền mở hàng đợi và không có yêu cầu nào khớp phạm vi/lọc hiện tại, when hàng đợi được tải, then không hiển thị dòng yêu cầu và hiển thị empty state theo nội dung UX đã duyệt; exact copy và hành động tiếp theo còn `TBD`.

Phân biệt hàng đợi thực sự không có yêu cầu chờ với trường hợp bộ lọc không tìm thấy kết quả nếu người dùng cần thông điệp/hành động khác nhau. AC này là draft phụ thuộc phương án queue và review UX; không phải policy đã duyệt.

### US-03 — Nhận kết quả qua email (Should)
As a khách hàng, I want nhận email khi yêu cầu được xác nhận hoặc từ chối, so that tôi biết có thể đến nhà hàng hay không.

Acceptance criteria:
- Khi trạng thái thay đổi sang xác nhận/từ chối, hệ thống gửi email có mã yêu cầu và thông tin cần thiết.
- Nếu gửi email lỗi, trạng thái đặt bàn vẫn được lưu và lỗi gửi được ghi nhận để nhân viên xử lý.

Tham khảo [AC-CR01-NOTIFY-FAIL draft và test design](./17-Change-Control-va-Risk-Management.md#ví-dụ-ac-và-test-cho-lỗi-gửi-thông-báo-draft-để-học) để luyện nhánh lỗi. Đây là ví dụ phân tích; SMS vẫn là change request chưa duyệt và retry/timeout policy còn mở.

### US-04 — Tra cứu yêu cầu (Must — đề xuất)
As a lễ tân, I want tìm yêu cầu theo ngày, tên hoặc mã, so that tôi có thể xử lý đúng yêu cầu trong ca.

Acceptance criteria:
- Given tôi đã đăng nhập, when tìm theo mã chính xác, then hệ thống hiển thị yêu cầu khớp hoặc trạng thái không tìm thấy.
- Given tôi lọc theo ngày, then chỉ hiển thị yêu cầu trong khoảng ngày đã chọn và cho biết trạng thái.
- Dữ liệu danh sách phải tuân theo phân quyền; nhân viên không được xem ngoài quyền được giao.

### US-05 — Hủy đặt bàn (Chưa đưa vào MVP)
As a khách hàng hoặc nhân viên được ủy quyền, I want hủy đặt bàn theo chính sách, so that chỗ được giải phóng và trạng thái được cập nhật chính xác.

Chưa viết AC để cam kết triển khai vì chính sách hủy, thời hạn, người có quyền hủy, trạng thái hợp lệ và thông báo khách chưa được xác nhận. Liên kết yêu cầu FR-08; cần refinement sau khi stakeholder chốt quy tắc.
## Definition of Ready
Mục tiêu rõ; actor xác định; quy tắc/ngoại lệ được nêu; AC kiểm thử được; phụ thuộc và câu hỏi còn mở được ghi lại.

## Definition of Done (MVP)
AC đạt; kiểm thử liên quan hoàn tất; phân quyền được xác nhận; email lỗi có xử lý; stakeholder nghiệm thu; tài liệu trạng thái được cập nhật.



