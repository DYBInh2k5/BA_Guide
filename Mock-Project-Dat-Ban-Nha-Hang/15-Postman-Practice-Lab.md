# 15 — Postman Practice Lab: chạy mock API tại máy

## Mục tiêu
Gửi request thật trong Postman, đọc status code/body, chạy assertions, và phân biệt lỗi nghiệp vụ với lỗi kết nối. Server dùng Node.js built-in modules, không cần npm package.

## Ranh giới bài lab
Đây là mock cục bộ để học, không phải backend production:
- Chỉ lắng nghe trên `127.0.0.1`, không gửi email thật và không có đăng nhập an toàn.
- `X-Training-Staff: demo` là header giả để diễn tập quyền; không phải authentication.
- Dữ liệu chỉ nằm trong memory; dừng/restart server sẽ reset các đặt chỗ mẫu và request mới.
- Slot, giờ, capacity, trạng thái và sample data đều giả lập. Không nhập dữ liệu khách thật.

## Khởi động
1. Cài Node.js nếu máy chưa có.
2. Mở PowerShell tại thư mục dự án `Mock-Project-Dat-Ban-Nha-Hang`.
3. Chạy:
   ```powershell
   node .\practice-api\server.js
   ```
4. Giữ cửa sổ server mở. Bản local có environment không chứa secret tại `postman-v3/postman/environments/BA Local.environment.yaml`, với `baseUrl=http://127.0.0.1:3000`. Trong Postman Desktop v12, trước khi mở request hãy kiểm tra workspace và thư mục trong **Local Files**. Nếu thấy repo này trong Local Files, dùng Local View; không chọn **Push to Postman Cloud** nếu bạn chỉ muốn làm local. Import collection vào workspace cloud có thể lưu/sync tài nguyên lên Postman Cloud. Xem [Postman Local Files/Native Git](https://learning.postman.com/docs/use/native-git/sync).
5. Mở request `00 - Health check`, chọn environment `BA Local`, rồi gửi `GET {{baseUrl}}/api/health`. Kết quả dự kiến theo mock server là `200`, `status: ok`, `mode: training-mock`, `persistence: in-memory`. Ghi status/body/thời gian và test result thực tế; chưa chạy thì không đánh dấu Pass.

### Chạy request file bằng Postman CLI (local)

Nếu Local Files đang hiển thị YAML nhưng Postman Desktop chưa mở được Request Builder, Postman CLI có thể chạy trực tiếp một `*.request.yaml` cùng local environment file. Từ thư mục `postman-v3/`, chạy:

```powershell
postman environment lint ".\postman\environments\BA Local.environment.yaml"
postman request ".\00 - Health check.request.yaml" --environment ".\postman\environments\BA Local.environment.yaml" --report-events=false
```

`--report-events=false` tắt gửi sự kiện request vào Postman API Catalog/Application Inventory. Lệnh chỉ gọi endpoint local nêu trong request file; không push request/environment lên Postman Cloud. Không dùng URL `localhost` production hay secret thật trong bài này. Xem [Postman CLI request](https://learning.postman.com/docs/postman-cli/postman-cli-requests/) và [Postman CLI environment](https://learning.postman.com/docs/postman-cli/postman-cli-environments/).

**Ví dụ chạy bởi trợ lý — không phải bằng chứng người học:** Postman CLI 1.93 chạy health request một lần vào 2026-11-23; actual `200 OK`, body có `status=ok`, `mode=training-mock`, `persistence=in-memory`; 2 assertions qua; thời gian CLI báo 17 ms. Đây chỉ là health check trên mock local, không kiểm chứng capacity, UAT policy hoặc nghiệp vụ đặt bàn. Người học cần tự chạy và lưu execution log riêng để được review năng lực.

`Postman-Collection.json` vẫn được giữ làm bản interchange v2.1. Postman v12 Local Mode dùng collection v3 YAML, nên dự án có thêm bản chuyển đổi ở `postman-v3/`. Có thể tái tạo sau khi cập nhật collection bằng Postman CLI:

```powershell
npm install -g postman-cli
postman collection migrate .\Postman-Collection.json --output .\postman-v3-next
```

Ví dụ dùng thư mục output mới để không ghi đè bản `postman-v3` đang có.

Xem thêm hướng dẫn chính thức về [Postman collection schemas](https://learning.postman.com/docs/use/use-collections/collections-schemas), [migrate collection v2.1 sang v3](https://learning.postman.com/docs/postman-cli/postman-cli-collections) và [kết nối thư mục local](https://learning.postman.com/docs/use/native-git/setup/).

Nếu chạy trong cửa sổ PowerShell thì dừng bằng Ctrl+C. Nếu service được chạy nền, dừng bằng: `$apiProcessId = (Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object -First 1 -ExpandProperty OwningProcess); Stop-Process -Id $apiProcessId`. Nếu cổng 3000 đang bận, đặt port trước khi khởi động: `$env:PORT=3001; node .\practice-api\server.js`, rồi đổi `baseUrl` sang port 3001.

## API luyện tập

| Method / Path | Actor / header | Expected |
|---|---|---|
| `GET /api/health` | public | `200` health mock |
| `POST /api/reservations` | customer | `201 PENDING`, `400 VALIDATION_ERROR`, hoặc `409 SLOT_UNAVAILABLE` |
| `GET /api/reservations?date=2026-12-05` | `X-Training-Staff: demo` | `200` list mẫu và filter |
| `GET /api/reservations?status=PENDING` | `X-Training-Staff: demo` | `200` pending items |
| `GET /api/reservations/{code}/history` | `X-Training-Staff: demo` | `200` trạng thái history |
| `PATCH /api/reservations/{code}/decision` | `X-Training-Staff: demo` | `200` decision, `400` validation, `404` missing, `409` invalid transition |

Trong collection có ví dụ gửi hợp lệ, slot không đủ chỗ, validation, list, confirm/reject, kiểm tra history, mô phỏng email lỗi và request thủ công `10 - UAT-05 - capacity policy discriminator`. Request 10 dùng party size 5 để quan sát nhánh mock hiện tại; nó không có assertion chọn policy. Header `X-Simulate-Email-Failure: true` chỉ thay đổi response mô phỏng; không gọi email provider. Source v2.1 JSON và bản Local Mode v3 YAML phải được giữ đồng bộ nếu sửa request.

### Ranh giới kiểm thử quyền truy cập

Mock chỉ kiểm tra header `X-Training-Staff: demo`: không có/khác giá trị này thì thao tác staff trả `401`; có giá trị `demo` thì được gán cùng một staff ID. Mock **không mô hình hóa người dùng đã xác thực nhưng thiếu quyền cụ thể**, role khác nhau hoặc policy ai được từ chối. Vì vậy, request không header chỉ kiểm tra nhánh thiếu thông tin staff; nó không chứng minh AC “nhân viên không có quyền không thể đổi trạng thái”.

Để kiểm chứng AC phân quyền đầy đủ, test basis cần một role model đã được authority xác nhận, ví dụ tài khoản staff không có permission xử lý; sau đó thử `PATCH` và truy vấn lại trạng thái/history để xác nhận không có quyết định từ chối được ghi. HTTP status/message chính xác phải theo security/API contract đã duyệt. Trong mock hiện tại, ghi case này là `Blocked — role/permission model chưa được mô hình hóa`, không báo `Pass` chỉ vì request thiếu header trả `401`.

## Đọc response như BA

- **Không nhận được HTTP response**: kiểm tra server đã chạy, URL/port đúng, proxy/firewall, rồi phân loại đây là lỗi kết nối chứ chưa phải lỗi API.
- **HTTP 400**: API hiểu request nhưng dữ liệu không hợp lệ; đọc `fields` để biết trường cần sửa.
- **HTTP 409**: xung đột với khả năng nhận hoặc trạng thái hiện tại; xem `code` và expected behavior.
- **HTTP 401** trên thao tác staff: thử lại với `X-Training-Staff: demo`; đây chỉ là stub để thấy khác biệt quyền public/staff.
- **HTTP 201**: yêu cầu đã được ghi nhận ở trạng thái `PENDING`, chưa đồng nghĩa nhà hàng đã xác nhận.
- Sau `PATCH`, kiểm tra history và so trạng thái mới. Với header giả lập lỗi email, API vẫn giữ quyết định; response báo `FAILED_SIMULATED`.

### Phân biệt HTTP verdict và Postman CLI exit code

UAT-05 mong đợi API trả `409` cho fixture hiện tại. Postman CLI có thể trả exit code `1` khi response không phải 2xx/3xx, dù không có assertion nào thất bại; vì vậy không dùng riêng exit code như verdict nghiệp vụ. Đối chiếu status/body với test basis và kiểm tra hậu điều kiện (record có được tạo hay không). Với DEC-01 còn `Open`, có thể ghi “mock branch matched”, nhưng policy UAT vẫn `Blocked`.

**Ví dụ chạy bởi trợ lý — không phải bằng chứng người học:** request `02 - Create reservation - unavailable slot` trả `HTTP 409 Conflict`, `code=SLOT_UNAVAILABLE`, `availableSeats=4`; cả hai assertion về status và error code đều pass, nhưng Postman CLI trả exit code `1` vì response thuộc nhóm 4xx. Đây là nhánh mock đã chạy đúng theo test basis của fixture; không chứng minh policy capacity đã được business phê duyệt. Cần giữ riêng ba cột: HTTP status/body, assertion result, và UAT/business verdict.

### Coverage boundary — lịch mở cửa

Mock chưa mô hình hóa lịch hoạt động hay quy tắc thời điểm mở/đóng. Slot 20:00 trong fixture được đánh dấu `isOpen=false` đồng thời có capacity bằng 0; API trả chung `409 SLOT_UNAVAILABLE` cho slot đóng, slot không tồn tại và slot không đủ sức chứa. Do đó, response này chỉ chứng minh nhánh “không khả dụng” tổng hợp, không kiểm chứng độc lập BRULE-01 về giờ hoạt động.

Để kiểm thử BRULE-01, BA cần được xác nhận lịch theo ngày, múi giờ, cách hiểu đúng thời điểm mở/đóng, ngày nghỉ và thông điệp/API contract. Sau đó Engineering cần cung cấp fixture có slot ngoài lịch nhưng capacity còn chỗ, cùng slot biên mở/đóng. Trước khi có các dữ liệu đó, ghi test design là **Blocked / Not executable**; không coi `409` hiện tại là bằng chứng UAT đạt. Nếu quan sát mock, lưu riêng request/response và kiểm tra không phát sinh reservation như bằng chứng hành vi fixture.

### Coverage boundary — timeout/retry và idempotency

`POST /api/reservations` trong mock hiện chưa nhận idempotency key. Mỗi request hợp lệ đi tới nhánh tạo reservation và thêm record mới vào bộ nhớ (`practice-api/server.js`, nhánh `POST /api/reservations`). Vì vậy, gửi cùng một payload hai lần trong Postman sẽ tạo hai lần submit độc lập theo implementation hiện tại. Kết quả đó **không chứng minh** cách xử lý retry của một sản phẩm thật và cũng chưa phải kiểm thử BRULE-09.

BA vẫn có thể dùng Postman để luyện cách chuẩn bị test contract sau khi Product/Engineering chốt policy:

| Kịch bản cần có trong contract | Request cần gửi | Bằng chứng cần so sánh |
|---|---|---|
| Retry sau timeout, cùng key và payload | Gửi lần đầu; mô phỏng mất response; gửi lại cùng key/payload | Reservation reference và trạng thái trả về; chỉ một booking/occupancy được ghi nhận |
| Cùng key nhưng payload đổi | Gửi key đã dùng với body khác | Hành vi conflict/validation đã thống nhất; không âm thầm sửa booking trước |
| Key mới cho một thao tác mới | Gửi key mới theo policy | Quyết định có cho tạo booking mới hay yêu cầu phát hiện booking trùng; phải có owner xác nhận |

Cho đến khi mock hỗ trợ contract này, đánh dấu các test trên là **Not executable against current mock**; có thể lưu test design ở trạng thái Draft/Blocked theo workflow nhóm. Không thêm header giả hoặc đoán HTTP status rồi gọi đó là expected result.

## Bài thực hành
1. Gửi request hợp lệ từ collection; ghi status, response body và test result.
2. Xóa cả phone và email để tạo `400`; nêu lỗi field.
3. Gửi 12 khách vào slot 19:00 để tạo `409`; giải thích vì sao không tạo reservation.
4. Restart server để reset seed, gửi request 10 với party size 5. Ghi status/body thực tế; theo mock hiện tại dự kiến `409`, `availableSeats: 4`, không có reservation code. Đây chỉ là hành vi fixture vì `PENDING` đang được tính vào occupancy.
5. So sánh với giả định chỉ `CONFIRMED` giữ chỗ: fixture counterfactual có 8 ghế, nên request có thể trả `201 PENDING` nếu các rule khác hợp lệ. Nhánh này chưa được cài trong mock; không mong đợi Postman cho kết quả `201` từ server hiện tại và không ghi policy giả định thành oracle.
6. Gửi `GET /api/reservations` không có header và có header; so kết quả.
7. Xác nhận yêu cầu `RSV-DEMO-001`, rồi thử từ chối lại cùng mã; phân loại lỗi chuyển trạng thái.
8. Gửi quyết định với `X-Simulate-Email-Failure: true`; kiểm tra reservation vẫn đổi trạng thái và email chỉ là mô phỏng.
9. Dừng/restart server và ghi nhận dữ liệu memory được reset. Giải thích vì sao mock API này không thích hợp cho UAT dữ liệu thật.

## Giới hạn và câu hỏi tiếp nối
Mock không lưu bền, không chống gọi đồng thời qua nhiều process, chưa triển khai idempotency/retry, không có auth thật, không áp dụng retention, không gửi email, và không thay thế review bảo mật. Các giới hạn này là cơ hội BA để hỏi NFR, vận hành, retry, audit và môi trường UAT. Collection/API là hợp đồng học tập; nhóm dự án thật phải thống nhất contract trước khi dùng.


## Request 11 — assertion cho mã không khớp

Request `11 - Staff - code not found` kiểm tra implementation mock cho filter `?code=RSV-NOT-FOUND`: HTTP `200`, `items` là mảng rỗng, `total` bằng 0. Ba `pm.test` là ba assertion riêng: status, cấu trúc/kết quả list và tổng số bản ghi. Đây là assertion về mock hiện tại, chưa phải contract nghiệp vụ được stakeholder duyệt.

Chạy bằng Postman CLI từ thư mục repo:

```powershell
postman request ".\postman-v3\11 - Staff - code not found.request.yaml" --environment ".\postman-v3\postman\environments\BA Local.environment.yaml" --report-events=false
```

Nếu server chưa chạy, CLI không thể lấy response. Hãy khởi động mock theo hướng dẫn đầu bài trước. Lần chạy mẫu của trợ lý được ghi riêng trong worksheet; cần chạy lại để lưu evidence cá nhân. Bản v2.1 JSON và Local Mode v3 YAML đều có request này.

## Request 12 — resource history không tồn tại

Request `12 - Staff - missing history resource` gọi trực tiếp history của mã không có trong mock. Ba assertion kiểm tra `404`, `RESERVATION_NOT_FOUND` và message dạng chuỗi không rỗng. Chạy bằng Postman CLI giống request 11, thay tên file YAML bằng `12 - Staff - missing history resource.request.yaml`.

**Mẫu execution do trợ lý chạy:** response `404`, cả 3 assertion pass, CLI exit code `1` vì CLI cũng xem HTTP 4xx là request failure. Đây không phải assertion failure. Khi báo cáo, ghi cả HTTP verdict (404 đúng theo mock contract) lẫn assertion result và exit code; không gọi chính sách sản phẩm đã được duyệt chỉ dựa trên mock.
