# DEC-01 — `PENDING` có giữ capacity không?

**Status:** Open — chưa có quyết định được duyệt  
**Page owner:** Chưa xác định  
**Decision authority:** Vai trò chủ nhà hàng/Product Owner cần xác nhận  
**Version:** 0.1 — bản nháp học tập, 2026-11-23  
**Effective from:** Chưa áp dụng  
**Scope:** Case study mô phỏng đặt bàn trực tuyến

> Đây là bản Confluence-ready để luyện cấu trúc trang. Nội dung không phải policy thật, quyết định thật hay bằng chứng người học đã thực hành trên Confluence.

## Mục đích

Chốt cách xử lý capacity khi một reservation được tạo ở trạng thái `PENDING`, để story C-02, API và test dùng cùng một quy tắc đã được authority phê duyệt.

## Quy tắc hiện hành

Chưa có quy tắc nghiệp vụ nào được phê duyệt trong case study. Mock SQL/API hiện giả lập cách tính `PENDING` cùng `CONFIRMED` vào occupancy; đây chỉ là hành vi fixture, không phải quyết định nghiệp vụ.

## Decision log

| ID | Câu hỏi | Options đang xem xét | Trạng thái | Evidence/rationale cần có | Decision owner | Ngày | Artifact chịu ảnh hưởng |
|---|---|---|---|---|---|---|---|
| DEC-01 | `PENDING` có giữ capacity không? | A: không giữ tới khi xác nhận; B: giữ tạm thời theo thời hạn được duyệt; C: giữ cho tới khi staff xử lý | Open | Xác minh policy vận hành, tình huống đồng thời, năng lực xử lý của staff và trade-off của từng option | Vai trò authority cần xác nhận | Chưa lên lịch | `BRULE-02`, `RES-02`, `FR-03`, UAT-05, AC-CONC-01 |

Các trade-off là giả thuyết cần kiểm chứng: không giữ có thể tăng rủi ro overbooking; giữ tạm cần rule hết hạn/giải phóng; giữ đến khi staff xử lý có thể làm slot bị chiếm lâu khi xử lý chậm. Chưa option nào được chọn.

### Walkthrough tác động trên fixture (không phải policy)

[SQLite sensitivity fixture](./outputs/sql-capacity-demo/Capacity-Policy-Sensitivity.md) có slot 19:00 với capacity 10, gồm 2 `CONFIRMED` và 4 `PENDING`. Giả sử request mới cần 5 ghế và các điều kiện khác hợp lệ:

| Kịch bản giả định | Occupancy dùng trong phép tính | Remaining | Kết quả capacity cho request 5 ghế |
|---|---:|---:|---|
| `PENDING` không giữ chỗ; chỉ tính `CONFIRMED` | 2 | 8 | Đủ chỗ theo kịch bản này |
| `PENDING` giữ chỗ trong lúc chờ xử lý | 6 | 4 | Không đủ chỗ theo kịch bản này |

Chênh lệch 4 ghế là **tác động của hai giả định lên fixture**; nó không chứng minh còn chỗ thật hay chọn option nào. Sau khi policy được duyệt, BA/QA cần dùng rule/version đó làm test oracle. Trước thời điểm đó, expected result gắn với policy vẫn là `Open/Blocked`.

## Open questions and actions

| ID | Câu hỏi/action | Owner role | Due/review | Blocks | Status |
|---|---|---|---|---|---|
| DQ-02 | Capacity tính theo ghế, bàn hay đơn vị khác? | Operations + decision authority cần xác nhận | Chưa xác định | Chốt AC capacity của C-02 | Open |
| DQ-03 | Nguồn dữ liệu nào authoritative khi lịch hoặc số chỗ thay đổi? | Operations / system owner cần xác nhận | Chưa xác định | API/data mapping và đối soát | Open |
| DQ-04 | Nếu giữ tạm, khi nào hết hạn/giải phóng và ai được đổi trạng thái? | Operations + Product cần xác nhận | Chưa xác định | State transition, concurrency và UAT | Open |
| ACT-01 | Xem mẫu lịch/sổ và walkthrough quy trình đã khử thông tin nhạy cảm | BA/owner cần phân công | Chưa xác định | Evidence cho DEC-01 và rule liên quan | Open |

## Traceability

- Discovery source: [Role-play DISC-03/04](./32-Stakeholder-Interview-Roleplay.md)
- Business rule: [BRULE-02 và decision table](./26-Business-Rules-va-Decision-Tables.md)
- Impact analysis: [CR-02 impact analysis](./22-Traceability-va-Impact-Analysis.md) and [BRULE-02 decision brief](./28-Decision-Brief-BRULE-02.md); reuse those impact artifacts rather than copying a second matrix here.
- Backlog story: [CSV staging — C-02](./Jira-Backlog-Import-Staging.csv), chưa import; `RES-02` là ID nội bộ.
- Discovery work item: [Task xác nhận capacity trong CSV staging](./Jira-Backlog-Import-Staging.csv), chưa import; chưa có Jira key thật.
- API/UAT: [UAT-05](./05-API-and-UAT.md); mock expected result chỉ theo fixture hiện tại, cần đối chiếu lại sau khi rule được duyệt.
- Concurrency: `AC-CONC-01` / `T-CONC-03/04` trong [lab test design](./31-Concurrency-Idempotency-va-Test-Design.md); chưa chạy.

## Change impact gate

Khi DEC-01 còn Open, giữ BRULE-02/FR-03 và expected result capacity ở trạng thái Draft/TBD. Sau khi authority duyệt, review story C-02, capacity/API behavior, UAT-05, concurrency expectations và occupancy metric cùng các owner liên quan; ghi version liên kết trước khi baseline. Phân tích chi tiết và role/evidence matrix nằm trong các impact references ở trên.

## Quy trình thay đổi trang

1. BA cập nhật options/evidence/action từ discovery, giữ status Open khi chưa có phê duyệt.
2. Decision authority được xác nhận chọn option và xác nhận ngày hiệu lực; ghi rationale, điều kiện review và approver.
3. Người quản lý nguồn chuẩn đổi status/version, rồi cập nhật requirement, API contract và test basis liên quan.
4. Jira work item links được tạo bằng key thật sau khi import; không coi ID trong repo là Jira key.

## Change history

| Version/date | Thay đổi | Tác giả | Review/approval |
|---|---|---|---|
| 0.1 / 2026-11-23 | Tạo bản nháp từ case study mô phỏng; chưa ghi nhận quyết định | Trợ lý | Chưa review/duyệt |
