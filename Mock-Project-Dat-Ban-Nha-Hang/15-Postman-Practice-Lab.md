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
4. Giữ cửa sổ server mở. Trong Postman Desktop v12, collection v3 ở `postman-v3/` dùng `baseUrl=http://127.0.0.1:3000`. Trước khi mở/import, kiểm tra workspace đang chọn và repo đang gắn trong **Local Files**. Nếu hiện thông báo workspace đã kết nối với repo khác, đừng chọn **Connect Current Folder** trừ khi bạn chủ ý đổi liên kết repo. Import collection vào workspace Postman sẽ lưu collection trong workspace đó; nếu đang ở Cloud View, collection có thể được đồng bộ lên Postman Cloud. Tách workspace/destination trước khi thực hành. Xem [hướng dẫn Postman về import dữ liệu và repo local](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data) và [Local Files/Native Git](https://learning.postman.com/docs/use/native-git/sync).
5. Mở request `00 - Health check` rồi gửi `GET {{baseUrl}}/api/health`. Kết quả dự kiến theo mock server là `200`, `status: ok`, `mode: training-mock`, `persistence: in-memory`. Ghi kết quả thực tế bạn nhận được; chưa chạy thì không đánh dấu Pass.

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

Trong collection có ví dụ gửi hợp lệ, slot không đủ chỗ, validation, list, confirm/reject, kiểm tra history, và mô phỏng email lỗi. Header `X-Simulate-Email-Failure: true` chỉ thay đổi response mô phỏng; không gọi email provider. Source v2.1 JSON và bản Local Mode v3 YAML phải được giữ đồng bộ nếu sửa request.

## Đọc response như BA

- **Không nhận được HTTP response**: kiểm tra server đã chạy, URL/port đúng, proxy/firewall, rồi phân loại đây là lỗi kết nối chứ chưa phải lỗi API.
- **HTTP 400**: API hiểu request nhưng dữ liệu không hợp lệ; đọc `fields` để biết trường cần sửa.
- **HTTP 409**: xung đột với khả năng nhận hoặc trạng thái hiện tại; xem `code` và expected behavior.
- **HTTP 401** trên thao tác staff: thử lại với `X-Training-Staff: demo`; đây chỉ là stub để thấy khác biệt quyền public/staff.
- **HTTP 201**: yêu cầu đã được ghi nhận ở trạng thái `PENDING`, chưa đồng nghĩa nhà hàng đã xác nhận.
- Sau `PATCH`, kiểm tra history và so trạng thái mới. Với header giả lập lỗi email, API vẫn giữ quyết định; response báo `FAILED_SIMULATED`.

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
4. Gửi `GET /api/reservations` không có header và có header; so kết quả.
5. Xác nhận yêu cầu `RSV-DEMO-001`, rồi thử từ chối lại cùng mã; phân loại lỗi chuyển trạng thái.
6. Gửi quyết định với `X-Simulate-Email-Failure: true`; kiểm tra reservation vẫn đổi trạng thái và email chỉ là mô phỏng.
7. Dừng/restart server và ghi nhận dữ liệu memory được reset. Giải thích vì sao mock API này không thích hợp cho UAT dữ liệu thật.

## Giới hạn và câu hỏi tiếp nối
Mock không lưu bền, không chống gọi đồng thời qua nhiều process, chưa triển khai idempotency/retry, không có auth thật, không áp dụng retention, không gửi email, và không thay thế review bảo mật. Các giới hạn này là cơ hội BA để hỏi NFR, vận hành, retry, audit và môi trường UAT. Collection/API là hợp đồng học tập; nhóm dự án thật phải thống nhất contract trước khi dùng.

