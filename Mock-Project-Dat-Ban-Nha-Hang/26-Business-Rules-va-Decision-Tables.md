# 26 — Business Rules và Decision Tables

## Mục tiêu

Business rule là chính sách/constraint nghiệp vụ quyết định điều gì được phép, không phải cách code thực hiện. Decision table giúp thấy tổ hợp điều kiện, kết quả, khoảng trống và mâu thuẫn trước khi đưa logic vào UI/API/SQL/test.

Các rule dưới đây kế thừa case study giả lập. Trạng thái `Draft/TBD` nghĩa là chưa được stakeholder xác nhận. Workbook Excel để lọc rule và thử điều kiện: [Business-Rules-Decision-Table-Lab.xlsx](./outputs/decision-table-lab/Business-Rules-Decision-Table-Lab.xlsx).

## 1. Rule catalog có source/owner/status

| ID | Rule draft | Nguồn / owner cần xác nhận | Status / open point |
|---|---|---|---|
| BRULE-01 | Chỉ nhận yêu cầu vào khung giờ nhà hàng mở trong timezone nghiệp vụ | Chủ nhà hàng + quản lý ca; lịch giờ mở | Draft — giờ lễ/exception/timezone TBD |
| BRULE-02 | Không nhận party nếu capacity khả dụng của slot nhỏ hơn party size | Quản lý ca + người quản trị capacity | Draft — capacity tính theo ghế, bàn hay tổ hợp? concurrent request? |
| BRULE-03 | Request mới được lưu với trạng thái `PENDING` cho đến quyết định của staff | Product/business owner + operations | Draft — auto-confirm có nằm trong policy không? charter hiện là staff review option |
| BRULE-04 | Chỉ staff có quyền mới xác nhận/từ chối request đang `PENDING` | Business owner + Security | Draft — role/permission matrix, quyền theo ca TBD |
| BRULE-05 | Mỗi transition trạng thái ghi actor, timestamp, old/new state và reason khi policy yêu cầu | Data/operations owner | Draft — retention, timezone, reason requirement TBD |
| BRULE-06 | Thông báo là side effect sau khi state change được lưu; lỗi gửi không rollback quyết định | Product + Engineering/Support | Draft — retry, idempotency, fallback và trạng thái gửi TBD |
| BRULE-07 | Input invalid, slot closed hoặc capacity không đủ thì không tạo reservation | Product + Operations | Draft — error message và dữ liệu được giữ lại cần usability review |
| BRULE-08 | Khi nhiều request được xử lý đồng thời cho cùng resource/slot, tổng booking chiếm chỗ sau xử lý không vượt capacity đã duyệt | Product/Operations xác nhận định nghĩa “chiếm chỗ”; Engineering đề xuất kiểm soát nhất quán | Draft — capacity unit, trạng thái chiếm chỗ, ưu tiên tranh chỗ và phạm vi resource TBD; xem AC-CONC-01 |
| BRULE-09 | Khi cùng một thao tác submit được gửi lại do timeout, hệ thống không tạo thêm booking cho cùng lần submit và trả kết quả có thể đối chiếu | Product xác nhận trải nghiệm; Engineering/Security/Operations review cách nhận diện và thời hạn | Draft — token, TTL, payload mismatch và cách tra cứu TBD; xem AC-RETRY-01 |

Rule tốt: một nghĩa, phạm vi rõ, không tự mâu thuẫn, chỉ rõ effective date/version, source/approver, exception và cách test. Tránh nhúng kỹ thuật như “dùng mutex” vào business rule; đó là solution design.

## 2. Decision table — tiếp nhận reservation request

**Điều kiện:** `C1` input hợp lệ; `C2` slot mở; `C3` capacity khả dụng ≥ party size.

| Conditions / action | R1 | R2 | R3 | R4 |
|---|---:|---:|---:|---:|
| C1: input valid? | No | Yes | Yes | Yes |
| C2: slot open? | — | No | Yes | Yes |
| C3: enough capacity? | — | — | No | Yes |
| A1: báo validation error, không tạo record | X |  |  |  |
| A2: báo slot không nhận, không tạo record |  | X |  |  |
| A3: báo hết chỗ, không tạo record |  |  | X |  |
| A4: tạo code + `PENDING` và trả trạng thái |  |  |  | X |
| A5: capacity bị giữ ngay khi `PENDING`? | — | — | — | **TBD decision** |

`—` nghĩa điều kiện không cần xét sau khi rule trước đã chặn. R4 chưa hoàn toàn implementable vì cách giữ capacity khi PENDING còn mơ hồ; phải chốt before baseline. Cũng cần xác định validation order khi request vừa invalid vừa slot closed, để UI/API trả lỗi nhất quán.

## 3. Capacity decision — lỗ hổng cần quyết định

Nếu capacity khả dụng = `capacity - occupancy`, business phải định nghĩa `occupancy`:

| Booking state | Có tính vào occupancy? | Vì sao cần quyết định |
|---|---|---|
| PENDING vừa tạo | TBD | Giữ chỗ tạm thời có thể ngăn oversell nhưng gây “kẹt” nếu staff xử lý chậm |
| CONFIRMED | TBD, thường cần được tính nhưng owner phải chốt | Chỗ đã hứa cho khách không được cấp lại |
| REJECTED | TBD | Thường không tiêu thụ chỗ sau khi từ chối |
| CANCELLED | TBD | Khi nào giải phóng; có audit hay refund/deposit ngoài scope? |
| EXPIRED / no response | TBD | Có reservation timeout? Ai/cái gì giải phóng và sau bao lâu? |

Công thức chỉ đúng nếu slot size, buffer, party size, table-combination và cập nhật đồng thời được định nghĩa. Trong mock SQL hiện tại, PENDING và CONFIRMED được tính vào occupancy như giả định; không coi đó là policy đã duyệt.

## 4. Decision table — xử lý request của nhân viên

| Current state | Staff authorized? | Action | Reason supplied? | Expected result | Rule |
|---|---|---|---|---|---|
| PENDING | Yes | Confirm | N/A | `CONFIRMED` + audit history | BRULE-04/05 |
| PENDING | Yes | Reject | Yes, nếu policy yêu cầu | `REJECTED` + reason + audit history | BRULE-04/05 |
| PENDING | No | Confirm/Reject | Any | Deny; state unchanged | BRULE-04/NFR-02 |
| CONFIRMED/REJECTED | Yes | Confirm/Reject again | Any | Reject invalid transition; state unchanged | State machine/FR-05 |
| PENDING | Yes | Reject | No | TBD: block or allow with no reason | Policy gap; define before AC |

Mỗi row tạo candidate test scenario; QA/business owner xác nhận priority, data and expected outcome.

## 5. Decision table → BPMN/API/AC/UAT

| Decision row | Requirement/design link | Test/evidence |
|---|---|---|
| R1 invalid | FR-01/US-01, `POST /api/reservations` | UAT-02/03; 4xx validation, không có reservation row |
| R2 slot closed | BRULE-01/FR-02/UC-01 | UAT-04; status/error code và no insert |
| R3 capacity insufficient | BRULE-02/FR-03/RES-02 | UAT-05; capacity stays within limit; concurrency test cần kỹ thuật |
| Concurrent requests tranh capacity | BRULE-08/FR-03/FN-03 | AC-CONC-01; T-CONC-03/04; chưa chạy, cần QA/Engineering và capacity policy được duyệt |
| R4 valid request | BRULE-03/FR-04/US-01 | UAT-01; một reservation code, trạng thái/occupancy đúng theo policy đã duyệt |
| Retry cùng lần submit sau timeout | BRULE-09/FR-04/US-01 | AC-RETRY-01; T-RETRY-01/02/03; chưa chạy, contract và payload/key policy TBD |
| Staff deny/transition | BRULE-04/05, US-02/UC-02 | UAT-06/07/10 + authorization negative test |
| Email failure | BRULE-06/FR-06/US-03 | UAT-08; state persists, notification failure observable |

BPMN gateway thể hiện decision order; sequence thể hiện message/system interaction; bảng này là logic điều kiện-kết quả. Không thay thế cái này bằng cái kia.

## 6. Cách review rule

1. Ghi một rule cho một ý, ID ổn định, source, owner, status và version.
2. Đặt rule vào decision table/decision tree để tìm overlap/gap.
3. Nêu outcome cho trường hợp invalid, boundary, concurrent và retry.
4. Kiểm tra rule không mâu thuẫn với charter/FR/AC, API/data model và flow.
5. Xin business approver chốt policy; engineering đánh giá implementation; QA thiết kế test.
6. Khi đổi rule, cập nhật impact matrix, diagrams, stories, API contract, tests và support docs.

## Công cụ

- **Excel:** decision matrix có thể lọc theo rule owner/status/test; dùng validation/formatting để làm lộ TBD, nhưng decision phải có nguồn.
- **BPMN/draw.io:** exclusive gateway cho nhánh điều kiện; label rõ rule ID trên gateway/flow.
- **DMN modeler:** dùng khi bảng quyết định phức tạp, version/deployment cần quản trị; không cần thêm engine cho vài rule đơn giản.
- **Jira/Confluence:** rule/story/test linkage và approved decision log; Jira/Confluence chưa kết nối hiện tại.
- **Postman/SQL:** xác minh API response/data effects sau khi rule được approved; mock output không phải business policy.

## Bài tập

1. Chọn rule BRULE-02 và điền capacity unit, pending hold, cancellation release, timezone và concurrency owner — để `TBD` nếu chưa có approver.
2. Thêm một decision-table column cho request timeout/retry; định nghĩa điều kiện idempotency và expected state.
3. Tìm một trường hợp chồng lấn giữa validation error và slot unavailable; chọn error precedence và nói ai duyệt.
4. Chọn một hàng trong decision table, nối tới BPMN gateway, API response và một test evidence.
5. Nếu stakeholder không đồng ý auto-confirm, cập nhật rule/status/impact mà không xóa request lịch sử.

## Đầu ra portfolio

Một rule catalog có source/owner/version, decision table đủ cases, BPMN/API/test traceability và decision log cho một unresolved policy. `TBD` được thể hiện là gap, không điền bằng phỏng đoán.

