# 29 — Functional Decomposition, Sitemap và Function List

## Mục tiêu

Chuyển nhu cầu thành cấu trúc chức năng có thể thảo luận với stakeholder, thiết kế, engineering và QA. Ba artifact phục vụ các câu hỏi khác nhau:

- **Sitemap:** người dùng đi tới trang/màn hình nào và cấu trúc thông tin ra sao?
- **Function List:** sản phẩm có capability/chức năng nào, actor, rule và trạng thái nào liên quan?
- **Use Case:** actor đạt một mục tiêu qua tương tác nào, gồm main/alternate/exception flow?

Chúng có thể liên kết nhưng không thay thế nhau. Function List không phải backlog, sitemap không phải BPMN, Use Case không phải thiết kế UI.

## 1. Phân rã chức năng cho case đặt bàn

```text
Reservation service
├── Khám phá nhà hàng
│   ├── Xem thông tin/địa chỉ/giờ hoạt động
│   └── Xem chính sách đặt bàn
├── Gửi yêu cầu đặt bàn
│   ├── Nhập ngày, giờ, party size, thông tin liên hệ
│   ├── Xem khung giờ có thể gửi request
│   ├── Kiểm tra dữ liệu và điều kiện nhận
│   └── Gửi request và nhận mã/trạng thái PENDING
├── Theo dõi kết quả
│   ├── Xem trạng thái request
│   └── Nhận thông báo kết quả
└── Quản lý request — staff
    ├── Xem hàng đợi/lọc request
    ├── Mở chi tiết và lịch sử
    ├── Xác nhận hoặc từ chối theo quyền
    └── Xem lỗi gửi thông báo
```

Đây là phân rã capability, chưa chứng minh khách cần mọi chức năng. Nhãn “xem khung giờ có thể gửi request” không được diễn giải thành đảm bảo đã giữ chỗ; cần policy và thông điệp đã duyệt.

## 2. Sitemap mẫu

```text
Website nhà hàng
├── Trang chủ
├── Thực đơn
├── Địa chỉ và giờ hoạt động
├── Chính sách đặt bàn
└── Đặt bàn
    ├── Nhập thông tin
    ├── Rà soát request
    └── Kết quả gửi request — PENDING/chờ xác nhận
```

Khu vực staff có thể là ứng dụng riêng hoặc vùng đăng nhập; không suy ra điều đó từ sitemap public. Xác nhận audience, quyền truy cập, mobile/desktop và cách khách quay lại kiểm tra trạng thái.

Sitemap biểu diễn hierarchy/navigability, không biểu diễn thời gian, nhánh quyết định đầy đủ, system message hay backend call. Vẽ user flow cho thứ tự tương tác; BPMN cho trách nhiệm/quy trình; sequence cho message giữa actor/system.

Node “Kết quả gửi request — PENDING/chờ xác nhận” trong sitemap hiện chỉ biểu diễn màn hình sau lần gửi đầu. Nó chưa xác nhận khách có thể quay lại tra cứu trạng thái sau đó.

## 3. Function List mẫu

| ID | Chức năng | Actor | Trigger/input | Kết quả quan sát được | Rule/requirement link | Open question |
|---|---|---|---|---|---|---|
| FN-01 | Nhập reservation request | Customer | Ngày/giờ, party size, contact | Form giữ được dữ liệu hợp lệ để gửi | FR-01, BRULE-07 | Phone/email: một hay cả hai? |
| FN-02 | Kiểm tra giờ nhận request | System | Slot và giờ hoạt động | Cho gửi hoặc báo slot không nhận | BRULE-01 | Holiday/timezone/exception source? |
| FN-03 | Kiểm tra capacity | System + operations data | Slot, party size, occupancy | Response thể hiện availability theo policy đã duyệt | BRULE-02/07 | Capacity unit, PENDING hold, concurrent update? |
| FN-04 | Tạo request `PENDING` | System | Request hợp lệ, capacity check | Mã request và trạng thái chờ staff | BRULE-03 | Auto-confirm có thuộc scope không? |
| FN-05 | Xử lý hàng đợi | Staff | Request mới hoặc filter | Xem chi tiết/trạng thái/lịch sử | US-02, BRULE-04/05 | Role, filter và SLA vận hành? |
| FN-06 | Gửi thông báo trạng thái | System | State transition đã lưu | Khách nhận thông tin phù hợp | FR-06, BRULE-06 | Kênh, retry, failure display? |
| FN-07 — candidate | Khách tra cứu trạng thái sau lần gửi | Customer | Mã/link hoặc phương thức truy cập chưa chốt | Candidate: xem trạng thái của đúng yêu cầu; field và access scope TBD | BR-01; Jira CSV staging item 5 là candidate chưa duyệt; chưa có FR/UC được duyệt | Khách cần tự tra cứu ngoài màn hình ban đầu/email không? Cách truy cập, thời hạn, dữ liệu hiển thị và authority còn mở; không map sang FR-08 vì FR-08 là hủy |

Function IDs là nhãn mô phỏng để truy vết. Khi scope thay đổi, sửa source/owner/status và nối tới use case/story/AC/API/test; không chỉ đổi tên chức năng.

`FN-07` được thêm để làm lộ câu hỏi scope/traceability, không phải cam kết MVP. `FR-04` chỉ nói hiển thị mã và `PENDING` sau khi gửi; `FR-06` nói email khi trạng thái đổi; `US-04` là nhân viên tra cứu. CSV staging item 5 có một candidate story cho khách tự tra cứu nhưng source cũ `FR-08` bị map sai: `FR-08` là hủy đặt bàn. Candidate này chỉ liên hệ tạm với `BR-01`; cần sponsor xác nhận outcome/scope và access/security trước khi tạo FR/UC được duyệt hoặc import vào Jira thật.

## 4. Nối sang Use Case, story và acceptance criteria

| Function | Use case | Story candidate | Acceptance evidence |
|---|---|---|---|
| FN-01/02/03/04 | UC-01 Submit reservation request | US-01 Customer sends a request | UAT valid/invalid/closed/capacity/concurrent cases; response/status/data effect |
| FN-05 | UC-02 Staff reviews request | US-02 Staff confirms or rejects | Authorized/unauthorized/invalid-transition cases and state history |
| FN-06 | UC-03 Notify customer | US-03 Customer receives result | Success/failure after state commit; mock API only simulates email |
| FN-07 — candidate | Use case chưa tạo | CSV staging item 5 là story candidate; chưa phải Jira issue/story được duyệt | Cần quyết định self-service status lookup, identity/access method, data scope và expiry trước khi chốt AC/UAT |

Story/AC cần xác định population, precondition, event, expected result và lỗi; tránh coi function name là yêu cầu đủ chi tiết. Trace tới [backlog](./03-Requirements-Backlog.md), [Use Case/UAT](./13-Use-Case-Data-Flow-UAT.md) và [API/Postman lab](./15-Postman-Practice-Lab.md).

## 5. Tool lab

- **draw.io:** tạo sitemap hierarchy và function tree; thêm legend, owner, version, question marks cho TBD.
- **Miro/FigJam:** workshop gom nhu cầu, nhóm chức năng và review sitemap; plugin Miro hiện chưa được phát hiện trong workspace, dùng FigJam nếu truy cập được hoặc draw.io.
- **Visual Paradigm:** tạo Use Case Diagram/UML nếu có license; draw.io là lựa chọn thay thế để học ký pháp cơ bản.
- **Figma:** chọn 1–2 node trong sitemap và tạo wireframe/flow, gồm loading, validation, slot unavailable và `PENDING`.
- **Jira/Confluence:** khi kết nối được, tạo epic/story và canonical page; hiện dùng Markdown/backlog mẫu.

### Đáp án mẫu: exception flow FN-03 “không đủ capacity”

**Điều kiện vào nhánh:** input hợp lệ; slot đang mở; kết quả capacity evaluation cho biết available capacity nhỏ hơn `party_size`. Với fixture seat-based để học: còn 3 ghế, party size 4. Đây chỉ là test data; capacity unit và cách tính occupancy (nhất là `PENDING`) trong production vẫn cần owner duyệt.

**Luồng:**

1. Khách gửi form hợp lệ.
2. Hệ thống kiểm tra giờ mở và nhận kết quả capacity không đủ.
3. Hệ thống dừng trước bước tạo reservation/`PENDING`.
4. API draft trả `409 SLOT_UNAVAILABLE`; UI giải thích khung giờ không còn khả dụng và cho khách chọn slot khác.
5. Khi khách chọn slot mới, hệ thống chạy validation và capacity check lại từ đầu. Không tái sử dụng kết quả cũ.

Nếu capacity đổi sau lần kiểm tra ban đầu nhưng trước commit, hệ thống phải kiểm tra/cập nhật nhất quán và đi vào cùng exception. Cách khóa/cập nhật nguyên tử là design choice để engineering đánh giá; acceptance không quy định một implementation cụ thể.

**AC-Customer — thông điệp khách nhìn thấy**

```gherkin
Given thông tin khách hợp lệ và slot đang mở
And capacity evaluation trả về available capacity nhỏ hơn party size
When khách gửi yêu cầu
Then giao diện báo slot không còn khả dụng
And khách có thể chọn slot khác
And giao diện không hiển thị mã hoặc trạng thái PENDING như thể yêu cầu đã được gửi
```

**AC-Data — không tạo dữ liệu khi bị từ chối**

```gherkin
Given cùng điều kiện capacity không đủ
When API xử lý yêu cầu
Then API draft trả 409 với code SLOT_UNAVAILABLE
And không có reservation mới cho request đó
And không có initial status-history event cho request đó
And occupancy không đổi do request bị từ chối
```

AC này tách kết quả nghiệp vụ khỏi cách UI/API triển khai. Trong test, capacity result được dựng sẵn để so sánh chính xác; nó không chốt cách tính `available capacity`. API contract hiện tại là draft và mock local trả `availableSeats`; Dev/BA/QA cần thống nhất tên field/code cuối cùng.

**Trace:** FN-03 → FR-03/BRULE-07 → UC-01 A3 → US-01 AC-Customer/AC-Data → `POST /api/reservations` → [UAT-05 walkthrough](./05-API-and-UAT.md). Với request cạnh tranh đồng thời, cần scenario riêng; test đơn lẻ này không chứng minh race condition đã được xử lý.

## 6. Bài tự làm

1. Chọn một capability trong tree, xác nhận actor và outcome bằng câu hỏi stakeholder.
2. Chuyển nó thành một hàng Function List: input, success, exception, rule ID, open question.
3. Thêm node vào sitemap; ghi rõ page/navigation hay state/interaction.
4. Viết một Use Case alternate flow và hai AC (một positive, một negative).
5. Nối ID qua story → API/data → UAT; ghi phần nào là giả định.

**Review gate:** sitemap đọc được bởi product/design; function list không trùng chức năng; mỗi rule có owner/status; flow có exception; traceability không ngụ ý policy chưa duyệt.


