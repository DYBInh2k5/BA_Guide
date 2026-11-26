# 55 — Postman UAT Execution Worksheet

## Mục tiêu học tập

Thực hành vòng kiểm thử API ở vai trò BA: chuẩn bị test basis, chạy request, ghi bằng chứng, đối chiếu actual với expected, và phân loại kết quả mà không biến hành vi của mock thành chính sách nghiệp vụ.

> Đây là môi trường học tập cục bộ. Chỉ dùng dữ liệu giả. Không đưa ảnh chụp có token, email cá nhân hoặc dữ liệu khách hàng vào portfolio.

## Trước khi chạy

1. Đọc [15-Postman-Practice-Lab.md](15-Postman-Practice-Lab.md), khởi động mock server và chọn environment `BA Local`.
2. Gửi `00 - Health check`. Ghi lại kết quả thực tế trước khi chạy các case khác.
3. Với case cần seed ban đầu, khởi động lại server để tạo fixture sạch. Sau khi restart, health check lại.
4. Lưu kết quả vào bản sao worksheet này. Không sửa số liệu để khớp ví dụ.

## Execution log

**Người chạy:** ___  **Ngày/giờ và timezone:** ___  **Commit/source version:** ___  **Postman version:** ___

| Case | Test basis / trạng thái | Request và điều kiện trước | Expected | Actual status/body | Bằng chứng (tên file, đã che dữ liệu nhạy cảm) | Verdict và lý do |
|---|---|---|---|---|---|---|
| ENV-01 Health | Contract mock; executable | `GET /api/health`; server đang chạy | `200`, `status=ok`, `mode=training-mock` | ___ | ___ | ___ |
| API-01 Valid booking | Contract mock; executable | POST hợp lệ, dùng payload giả | `201`, `PENDING`, có reference | ___ | ___ | ___ |
| API-02 Required contact | Contract mock; executable | Xóa cả phone và email | `400`, validation chỉ rõ field | ___ | ___ | ___ |
| API-03 Capacity | Fixture mock; executable | Reset server; 12 khách vào 19:00 | `409 SLOT_UNAVAILABLE`; không tạo booking | ___ | ___ | ___ |
| UAT-05 Capacity policy | DEC-01 đang Open; policy verdict Blocked | Reset server; gửi request 10, party size 5 | Theo implementation mock: `409`; không có reference. Chưa có expected đã được business owner duyệt | ___ | ___ | ___ |
| API-04 Staff access | Contract mock; executable | GET danh sách không header, sau đó có `X-Training-Staff: demo` | Không header: `401`; header demo: `200` | ___ | ___ | ___ |
| AUTHZ-01 Staff thiếu quyền từ chối | Role/permission model chưa được mock hỗ trợ; Blocked | Tài khoản đã xác thực nhưng không có permission từ chối, gửi `PATCH`, rồi đọc lại trạng thái/history | Request bị từ chối; trạng thái vẫn `PENDING`, không có quyết định từ chối. HTTP code/message chờ API/security contract | N/A — mock hiện chỉ phân biệt header demo với thiếu header | ___ | Blocked — không đánh đồng `401` thiếu thông tin staff với authorization failure |

**Quy ước verdict:** `Pass` chỉ khi actual đáp ứng expected đã được chấp thuận; `Fail` khi actual khác expected đó; `Blocked` khi thiếu quyết định/điều kiện cần; `Not Run` khi chưa thực thi. Với UAT-05, ghi riêng `mock branch matched` nếu actual giống implementation, và giữ policy verdict là `Blocked` cho tới khi DEC-01 được người có thẩm quyền quyết định.

Với `AUTHZ-01`, mock không có cách tạo tài khoản đã xác thực nhưng thiếu permission. Không chạy request thiếu header rồi dùng kết quả `401` để kết luận đã kiểm thử authorization; ghi rõ coverage gap và owner cần chốt role model/API contract.

### Workshop discovery — ma trận quyền truy cập

Điền ma trận này cùng Product/Operations/Security trước khi chốt `AUTHZ-01`. `TBD` là câu hỏi cần quyết định, không có nghĩa mặc định là Deny hay Allow. Xác định rõ cả **actor**, **dữ liệu/phạm vi**, và **hành động**; không gộp quyền xem với quyền thay đổi trạng thái.

| Actor / trạng thái đăng nhập | Dữ liệu/phạm vi | Xem queue | Xem lịch sử | Confirm | Reject | Nguồn / người có thẩm quyền |
|---|---|---|---|---|---|---|
| Khách chưa đăng nhập | Queue nội bộ | TBD | TBD | TBD | TBD | ___ |
| Khách đặt bàn | Yêu cầu của chính mình | TBD | TBD | TBD | TBD | ___ |
| Nhân viên đã xác thực | Yêu cầu trong phạm vi nhà hàng | TBD | TBD | TBD | TBD | ___ |
| Nhân viên đã xác thực nhưng thiếu quyền quyết định | Yêu cầu đang `PENDING` | TBD | TBD | TBD | TBD | ___ |
| Quản lý | Yêu cầu/lịch sử trong phạm vi quản lý | TBD | TBD | TBD | TBD | ___ |

Sau khi authority xác nhận ma trận, mỗi ô liên quan thành test scenario: role/permission, dữ liệu đầu vào, request, expected response theo API contract, rồi truy vấn trạng thái/history để kiểm tra hậu điều kiện. Chọn mã `401` hay `403` là quyết định contract/API; không suy ra mã chỉ từ nhãn “không có quyền”.

## Phân tích UAT-05

1. Ghi status, response `code`, `availableSeats` và có/không `reservationCode`.
2. Gọi `GET /api/reservations?date=2026-12-05` với header staff giả. Kiểm tra có bản ghi mới của `UAT-05 Sample Guest` hay không.
3. Tách ba kết luận:
   - **Observation:** điều gì thật sự xuất hiện trong request/response và danh sách?
   - **Implementation behavior:** mock đang tính occupancy theo cách nào?
   - **Business decision:** ai có thẩm quyền xác nhận PENDING có giữ chỗ không, và quyết định ở đâu?
4. Không kết luận rằng API production an toàn với concurrent requests chỉ từ một lần chạy tuần tự.

**Observation:** ___

**Mock behavior:** ___

**Policy / decision needed:** ___

**Câu hỏi gửi Product/Operations:** “Khi booking ở trạng thái PENDING, số ghế có được giữ trong thời hạn nào? Ai được quyền xác nhận thời hạn và cách giải phóng ghế?”

**Mẫu execution UAT-05 do trợ lý chạy — không phải evidence người học:** Mock local nhận request `partySize=5` vào slot 19:00 và trả HTTP `409`, `code=SLOT_UNAVAILABLE`, `availableSeats=4`; Postman CLI exit code `1` do response 4xx. Response không có `reservationCode`. Lần chạy này chưa gọi lại list endpoint để kiểm tra hậu điều kiện nên chưa ghi “đã xác minh không tạo record”. Mock đang tính 4 ghế PENDING cùng 2 CONFIRMED vào occupancy; policy verdict vẫn `Blocked` vì DEC-01 còn Open. Để tự hoàn tất case, chạy GET danh sách ngay trong cùng phiên mock, ghi actual và tách implementation behavior khỏi policy decision.

## Phân loại lỗi

Nếu không có HTTP response, ghi `Blocked / environment` và kiểm tra server/port trước. Nếu có HTTP 4xx/5xx, đó là response để phân tích; không tự động gọi là lỗi kết nối. Nếu HTTP trả đúng nhánh mock nhưng test basis nghiệp vụ chưa được chốt, lưu observation và mở decision, không tự đặt expected policy.

## Bản tóm tắt portfolio

Sau khi tự chạy, viết 4–6 câu, dùng số liệu của bạn:

> Tôi chuẩn bị và chạy ___ API test cases bằng Postman trên mock local version ___. Tôi đối chiếu status/body với test basis và lưu ___ bằng chứng đã làm sạch. Case ___ có kết quả ___. UAT-05 hiện ___ vì quyết định DEC-01 ___. Giới hạn kết quả: ___; bước tiếp theo là xác nhận ___ với ___ .

Không ghi worksheet của trợ lý là bằng chứng cá nhân. Khi hoàn thành, có thể đưa bản đã ẩn dữ liệu vào portfolio; không đưa secret, dữ liệu thật hay thông tin riêng tư.

## Mini lab — Không tìm thấy mã đặt bàn

Phân biệt **không có kết quả trong một danh sách** với **không tồn tại một tài nguyên được yêu cầu trực tiếp**. Hai API có thể có contract khác nhau.

1. Trong Postman, tạo request `GET {{baseUrl}}/api/reservations?code=RSV-NOT-FOUND` và header `X-Training-Staff: demo`.
2. Gửi request sau khi mock server chạy. Source hiện tại lọc danh sách theo mã, rồi trả list; vì vậy dự đoán theo implementation là HTTP `200` với `items: []` và `total: 0`. Ghi response thực tế, không ghi dự đoán như lần chạy đã hoàn thành.
3. So sánh với `GET {{baseUrl}}/api/reservations/RSV-NOT-FOUND/history`: mock trả HTTP `404` và `RESERVATION_NOT_FOUND` cho resource history không tồn tại.
4. Hỏi Product/Engineering xem lookup theo mã được định nghĩa là filter collection hay đọc một resource cụ thể, và thống nhất API contract. Không lấy status của endpoint history làm expected cho endpoint list.

**Ghi nhận:** `200 + []`/`404` ở đây là implementation hiện tại của mock, chưa tự nó chứng minh contract sản phẩm đã được phê duyệt. Dùng `X-Training-Staff: demo` chỉ để diễn tập header; không phải kiểm tra bảo mật.

**Mẫu execution do trợ lý chạy — không phải evidence người học:** 2026-11-23, server mock local trên `127.0.0.1:3013`, hai GET dùng header demo. `GET /api/reservations?code=RSV-NOT-FOUND` trả HTTP `200`, `items: []`, `total: 0`; `GET /api/reservations/RSV-NOT-FOUND/history` trả HTTP `404`, `RESERVATION_NOT_FOUND`. Cổng riêng được dùng cho lần chạy này và server đã dừng. Hãy tự chạy lại trong Postman để ghi evidence cá nhân; không đánh dấu case của bạn là đã chạy dựa trên ví dụ này.

**Mẫu execution request 12 do trợ lý chạy — không phải learner evidence:** HTTP `404 Not Found`, body `code=RESERVATION_NOT_FOUND`, message không rỗng; 3 assertions pass; Postman CLI exit code `1` do response là 4xx. Ghi riêng ba trạng thái này trong execution log: response status, assertion results, CLI process exit code.
