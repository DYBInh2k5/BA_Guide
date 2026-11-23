# 05 — API & UAT

## API contract draft
`POST /api/reservations`

Request:
```json
{
  "customerName": "Nguyen An",
  "phone": "0900000000",
  "email": "an@example.com",
  "partySize": 4,
  "startAt": "2026-12-05T19:00:00+07:00",
  "note": "Gần cửa sổ nếu có"
}
```

Success `201 Created`:
```json
{
  "reservationCode": "RSV-20261205-0012",
  "status": "PENDING",
  "message": "Yêu cầu đã được gửi, đang chờ nhà hàng xác nhận."
}
```

Validation error `400 Bad Request`: trả danh sách field và mã lỗi rõ ràng. Hết sức chứa: đề xuất `409 Conflict` với mã `SLOT_UNAVAILABLE`. Các mã trạng thái/API là bản nháp để BA/Dev thống nhất.

## UAT scenarios

| ID | Điều kiện | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| UAT-01 | Khung giờ còn sức chứa; AC-US01-01 | Gửi form hợp lệ | Tạo mã; trạng thái Chờ xác nhận |
| UAT-02 | Thiếu số điện thoại và email; AC-US01-02 | Gửi form | Báo lỗi liên hệ; không tạo yêu cầu |
| UAT-03 | Số người bằng 0; AC-US01-03 | Gửi form | Báo lỗi số người; không tạo yêu cầu |
| UAT-04 | Ngoài giờ hoạt động | Chọn giờ và gửi | Không cho gửi; giải thích giờ hợp lệ |
| UAT-05 | Input hợp lệ; slot mở; available capacity < party size | Gửi yêu cầu | API draft `409 SLOT_UNAVAILABLE`; UI báo không khả dụng; không tạo reservation/initial history; occupancy không đổi do request bị từ chối |
| UAT-06 | Nhân viên đăng nhập, yêu cầu đang chờ | Xác nhận | Trạng thái xác nhận; lưu người và thời điểm |
| UAT-07 | Nhân viên từ chối yêu cầu | Nhập lý do, từ chối | Trạng thái từ chối; lý do được lưu |
| UAT-08 | Email provider lỗi | Nhân viên xác nhận | Trạng thái vẫn lưu; có dấu lỗi gửi để xử lý |
| UAT-09 | Người chưa đăng nhập mở trang quản lý | Truy cập danh sách | Bị yêu cầu đăng nhập; không lộ dữ liệu |
| UAT-10 | Yêu cầu đã từ chối | Thử xác nhận lại | Bị chặn hoặc theo quy tắc chuyển trạng thái đã duyệt |
| UAT-11 | Nhân viên test mở danh sách với ngày không có record trong seed | Gửi GET list với filter ngày; kiểm tra response, sau đó review UI riêng | Mock có thể trả `200`, `total: 0`, `items: []`; API không thay thế kiểm tra empty state UI |

UAT-08 có walkthrough về tiền điều kiện, expected result riêng cho booking/audit/notification, evidence và trạng thái run trong [bài Use Case và UAT](./13-Use-Case-Data-Flow-UAT.md#uat-08-walkthrough--quyết-định-lưu-email-lỗi). Collection mock chỉ mô phỏng notification failure; không phải kiểm chứng provider thật.

### UAT-05 walkthrough cho mock API

**Mục tiêu:** kiểm tra request hợp lệ nhưng vượt capacity khả dụng bị từ chối rõ ràng và không tạo reservation trong mock memory. Đây là kiểm tra luồng đơn, không chứng minh xử lý đồng thời.

**Điều kiện của seed mock khi server vừa khởi động:** slot `2026-12-05T19:00:00+07:00` có capacity 10 ghế; seed có 4 `PENDING` và 2 `CONFIRMED`; mock tính cả hai trạng thái vào occupancy nên còn 4 ghế. Đây là giả định trong code mẫu, không phải policy production.

**Liên hệ quyết định:** UAT-05 là scenario phân biệt được hai giả định của [DEC-01](./DEC-01-Capacity-Policy-Draft.md). Nếu chỉ `CONFIRMED` giữ chỗ thì fixture counterfactual còn 8 ghế và request 5 người có thể đi tiếp; nếu `PENDING` cũng giữ chỗ thì còn 4 và request bị từ chối. Vì DEC-01 vẫn `Open`, walkthrough bên dưới chỉ kiểm tra nhánh của mock hiện tại; nó không chứng minh policy nghiệp vụ đúng hay đã được phê duyệt. Phép tính đối chứng được ghi ở [capacity sensitivity fixture](./outputs/sql-capacity-demo/Capacity-Policy-Sensitivity.md).

**Request:**

```http
POST http://127.0.0.1:3000/api/reservations
Content-Type: application/json
```

```json
{
  "customerName": "UAT-05 Sample Guest",
  "phone": "0900000005",
  "partySize": 5,
  "startAt": "2026-12-05T19:00:00+07:00"
}
```

**Các bước và evidence:**

1. Khởi động lại mock nếu cần seed ban đầu; gửi request trên trong Postman.
2. Ghi status/body. Mong đợi `409`, `code = SLOT_UNAVAILABLE`, `availableSeats = 4`, không có `reservationCode`.
3. Dùng `GET /api/reservations?date=2026-12-05&name=UAT-05` với header `X-Training-Staff: demo`. Mong đợi `total = 0`; không tìm thấy reservation mang tên test.
4. Kiểm tra riêng UI/prototype: khách thấy slot không khả dụng, không thấy mã/trạng thái `PENDING` thành công, và có đường chọn slot khác.
5. Lưu request/response, thời điểm chạy, server seed version và ảnh UI/prototype làm evidence.

**Ví dụ execution do trợ lý chạy bằng Postman CLI — không phải bằng chứng người học:** ngày 2026-11-23, request trên trả `409 Conflict`, `code = SLOT_UNAVAILABLE`, `availableSeats = 4`; response không có `reservationCode`. CLI hiển thị 40 ms và exit code `1` vì HTTP status là 4xx, trong khi request này không có assertion thất bại. Follow-up `GET /api/reservations?date=2026-12-05&name=UAT-05` với header training trả `200`, `items: []`, `total: 0` (36 ms, exit code `0`). Kết quả chứng minh mock runtime hiện tại từ chối request và không tạo record khớp tên tại thời điểm kiểm tra; nó không phê duyệt policy capacity. Vì DEC-01 vẫn `Open`, ghi **mock branch matched / policy UAT Blocked**, không gộp hai kết luận thành một `Pass`. UI chưa được kiểm tra và learner chưa tự chạy các request này.

Không dùng query trong `Reservation-Practice.sql` để khẳng định trạng thái của mock API: SQL script tạo một database fixture độc lập; server hiện giữ dữ liệu trong memory. API check ở bước 3 chứng minh không có reservation trong mock runtime tại lúc chạy, còn AC về UI cần evidence riêng. Nếu seed thay đổi hoặc server không restart, tính lại occupancy trước khi chạy và ghi giá trị thật.

**Coverage còn thiếu:** test này không chứng minh hai request đồng thời không vượt capacity. Cần scenario riêng với engineering/QA, rule concurrency đã chốt và một cách quan sát state trước/sau.

### UAT-11 — filter trả danh sách rỗng

Đây là bài thực hành cho **kết quả lọc rỗng**, không khẳng định toàn bộ hàng đợi không có dữ liệu. Fixture của mock có record ngày `2026-12-05`; query ngày `2026-12-06` để có điều kiện không khớp theo seed hiện tại.

```http
GET http://127.0.0.1:3000/api/reservations?date=2026-12-06
X-Training-Staff: demo
```

Ghi actual status/body trong Postman. Expected của mock contract: HTTP `200`, `total: 0`, `items: []`. Nếu seed đã thay đổi, ghi ngày/query thực tế trước khi kết luận. Header `X-Training-Staff` chỉ là role stub để học, không phải security evidence.

Sau đó kiểm tra riêng prototype/build UI với cùng điều kiện. Ghi version/frame và kết quả empty state. Nếu thiết kế chưa có hoặc copy/CTA chưa được duyệt, UI portion là `Blocked/Open`, không phải Pass. Một API response rỗng không chứng minh người dùng được hướng dẫn đúng; “không có record toàn queue” và “filter không tìm thấy” cũng có thể cần hai state khác nhau. Xem [UAT-11 walkthrough và evidence log](./42-UAT-Evidence-Defect-Triage-and-Signoff.md#bài-lab-uat-11-filter-không-có-kết-quả).
## UAT exit criteria (draft)
- Tất cả luồng trọng yếu UAT-01, 05, 06, 09 đạt.
- Không còn lỗi nghiêm trọng chưa có quyết định xử lý.
- Chủ nhà hàng/quản lý ký xác nhận các quy tắc còn mở và quyết định go/no-go.


