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

**Quy ước verdict:** `Pass` chỉ khi actual đáp ứng expected đã được chấp thuận; `Fail` khi actual khác expected đó; `Blocked` khi thiếu quyết định/điều kiện cần; `Not Run` khi chưa thực thi. Với UAT-05, ghi riêng `mock branch matched` nếu actual giống implementation, và giữ policy verdict là `Blocked` cho tới khi DEC-01 được người có thẩm quyền quyết định.

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
