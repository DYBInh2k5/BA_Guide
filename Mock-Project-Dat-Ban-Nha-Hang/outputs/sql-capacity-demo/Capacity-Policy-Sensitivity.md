# Capacity policy sensitivity — SQLite fixture

> **Trạng thái:** Worked example do trợ lý chạy trên dữ liệu giả lập. Không phải dữ liệu nhà hàng, chính sách được phê duyệt, hay bằng chứng kỹ năng của người học.

## Câu hỏi cần hỗ trợ quyết định

Một booking `PENDING` có giữ chỗ trong khi chờ nhân viên xử lý không? Câu trả lời làm thay đổi phép tính `seats_remaining`; cần business/product authority xác nhận rule trước khi dùng số “còn chỗ” cho quyết định thật.

## Nguồn và cách chạy

- Nguồn: [`Reservation-Practice.sql`](../../Reservation-Practice.sql), seed data và view `slot_utilization`.
- Môi trường lần xác minh hiện tại: Node.js 22.20.0 `node:sqlite` (experimental), database `:memory:`; source script chạy trong bộ nhớ, không ghi vào database của tổ chức.
- View hiện tại tính `PENDING` và `CONFIRMED` là chỗ đang dùng; `REJECTED`/`CANCELLED` không tính.
- Truy vấn đối chứng chỉ tính `CONFIRMED` là một kịch bản giả định khác, không phải rule đã chọn.

## Kết quả quan sát từ fixture

| Slot | Capacity | View: PENDING + CONFIRMED occupied | Remaining theo view | CONFIRMED-only occupied | Remaining theo kịch bản CONFIRMED-only |
|---|---:|---:|---:|---:|---:|
| 2026-12-05 19:00 | 10 | 6 | 4 | 2 | 8 |
| 2026-12-05 19:30 | 8 | 0 | 8 | 0 | 8 |
| 2026-12-05 20:00 (closed) | 0 | 0 | 0 | 0 | 0 |

Hai cách tính cho slot 19:00 lệch **4 ghế** vì fixture có booking `PENDING` cho 4 khách. Đây là tác động của định nghĩa trạng thái trong query trên dữ liệu seed; không chứng minh có overbooking hay nhu cầu tự động xác nhận trong một doanh nghiệp.

## Phân tích BA

- **Finding:** kết quả sức chứa nhạy với cách phân loại `PENDING`.
- **Không phải finding:** “nhà hàng còn 4 ghế” hoặc “chắc chắn còn 8 ghế”. Không có vận hành thật và rule chưa duyệt.
- **Decision cần ghi:** trạng thái nào giữ capacity; thời điểm bắt đầu/kết thúc hold; xử lý hủy, timeout và thay đổi capacity do walk-in; nguồn capacity nào là chuẩn.
- **Owner để xác định:** business/operations authority cho policy; Engineering cho transaction/concurrency và source-of-truth; QA cho kịch bản kiểm chứng; BA giữ trace và ghi open question.
- **Evidence tiếp theo:** policy/version được duyệt, sample quy trình hiện hành đã khử định danh, data dictionary/state mapping, và concurrency test có fixture/oracle rõ.

## Trace links

- Need/decision: làm rõ quy tắc capacity và trạng thái `PENDING`.
- Business rule: `BRULE-02` còn draft/open trong case.
- Impact: [I-02 concurrency](../../outputs/cr02-impact-practice-20261123/CR02-Impact-Analysis-Practice.xlsx), sheet `Impact Register`.
- Phân tích: [bài 22 — Traceability và Impact Analysis](../../22-Traceability-va-Impact-Analysis.md).
- Test design: [bài 31 — Concurrency, idempotency và test design](../../31-Concurrency-Idempotency-va-Test-Design.md).

## Bài tự làm

1. Chạy query view và query counterfactual trong một SQLite database học tập riêng.
2. So sánh kết quả cho slot 19:00 và ghi ra trạng thái booking góp phần tạo chênh lệch.
3. Viết một câu hỏi trung lập để xác định authority/policy owner.
4. Chưa đổi source view thành rule mới khi chưa có phê duyệt; ghi owner, source, status và phiên bản nếu policy được cung cấp.

Khi đưa vào portfolio, ghi rõ đây là fixture mô phỏng. Chỉ ghi phần bạn tự chạy sau khi có execution log của chính bạn.
