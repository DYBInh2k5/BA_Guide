# 36 — Lab: tự dựng system context bằng diagrams.net

## Mục tiêu

Sau lab, bạn có thể tự vẽ ranh giới hệ thống, đặt actor/dịch vụ ngoài, đặt tên luồng bằng dữ liệu hoặc hành động cụ thể, và thể hiện câu hỏi chưa biết mà không biến nó thành quyết định. Bản sơ đồ do bạn tự chỉnh mới là evidence học tập; sơ đồ mẫu do trợ lý tạo chỉ dùng để tham khảo.

## Brief giả lập

Một nhà hàng đang cân nhắc nhận booking request trực tuyến. Nhân viên cần xem request và quyết định xác nhận/từ chối. Khách cần biết request đã được tiếp nhận hay chưa. Email có thể được dùng để thông báo. Chưa biết nguồn dữ liệu capacity, policy giữ chỗ, ai được thao tác, hay nhà hàng có nhà cung cấp email cụ thể hay không.

## Mở file và tạo bản làm việc

1. Mở [sơ đồ mẫu system context](./35-Reservation-System-Context.drawio) trong diagrams.net (draw.io). Nếu đang ở trang chủ, chọn **Open Existing Diagram** hoặc **Device** rồi chọn file.
2. Dùng **File → Save As** để tạo bản riêng tên `36-Reservation-System-Context-<ten-ban>.drawio`. Giữ file mẫu làm reference.
3. Bật lưới nếu cần căn chỉnh; zoom vừa trang để thấy toàn bộ actor, boundary, luồng và ghi chú.
4. Trước khi sửa, đọc brief và tô nhãn nội dung thành `Fact from brief`, `Assumption`, `Open question` hoặc `Proposed`. Vì bối cảnh hoàn toàn giả lập, không ghi nội dung nào như đã được stakeholder thật xác nhận.

## Nhiệm vụ

### A. Vẽ ranh giới

- Đặt đúng một boundary cho **proposed booking request management system**.
- Viết 3–5 trách nhiệm bên trong boundary bằng ngôn ngữ nghiệp vụ, không đặt tên database, cloud, framework hoặc kiến trúc chưa được yêu cầu.
- Đặt khách hàng, nhân viên và email provider bên ngoài. Gắn nhãn email provider là proposed/subject to confirmation.

### B. Kiểm tra các luồng

Với mỗi đường nối, ghi rõ dữ liệu/hành động và chiều gửi. Dùng danh từ/cụm từ kiểm chứng được, tránh nhãn mơ hồ như “data” hoặc “process”. Ít nhất hãy rà:

- Khách gửi booking request; hệ thống trả reference và trạng thái tiếp nhận hoặc kết quả validation.
- Nhân viên đọc queue/chi tiết; nhân viên gửi quyết định cùng reason nếu policy yêu cầu.
- Hệ thống phát yêu cầu thông báo sau state change đã được policy cho phép.
- Kết quả delivery/callback chỉ biểu diễn như giả thuyết hoặc câu hỏi nếu chưa biết provider có hỗ trợ.

Mũi tên phải khớp với bên gửi. Nếu một quan hệ có cả request và response, thể hiện hai luồng riêng hoặc ghi hai chiều thật rõ.

### C. Đánh dấu điều chưa biết

Thêm ít nhất hai open-question cards. Mỗi card ghi câu hỏi, người cần xác nhận (vai trò, chưa cần tên người), và evidence mong muốn. Ví dụ:

| Chủ đề | Câu hỏi cần xác nhận | Vai trò cần hỏi | Evidence mong muốn |
|---|---|---|---|
| Capacity | Nguồn nào là chuẩn và trạng thái nào làm giảm capacity khả dụng? | Operations/Product owner | Policy được duyệt và ví dụ ca biên |
| Email | Nếu gửi lỗi, booking state có đổi không; ai xử lý retry? | Operations/Engineering | Quy tắc vận hành và hợp đồng tích hợp nếu có |

Không tự thêm POS, payment, SMS, hủy tự phục vụ, database hoặc tích hợp production vào scope nếu brief chưa nêu.

### D. Rà soát như một BA

Đọc sơ đồ như người chưa tham gia dự án và trả lời:

1. Boundary thể hiện trách nhiệm hay lỡ mô tả hạ tầng?
2. Mỗi actor biết họ gửi gì/nhận gì không?
3. Có đường nào nhầm request với response, hoặc nhầm email accepted với delivered không?
4. Open question nào có thể làm thay đổi scope, policy, estimate hoặc test?
5. Người nào cần quyết định, và tài liệu/evidence nào sẽ đóng câu hỏi đó?

## Tiêu chí tự kiểm (10 điểm)

| Tiêu chí | Điểm |
|---|---:|
| Boundary gọn, đúng trách nhiệm; actor/dịch vụ ngoài được phân biệt | 0–2 |
| Luồng có hướng và nhãn dữ liệu/hành động cụ thể | 0–2 |
| Request, response và kết quả thông báo không bị nhập nhằng | 0–2 |
| Ít nhất hai câu hỏi mở có vai trò xác nhận và evidence | 0–2 |
| Có legend/version và không biến giả định thành fact | 0–2 |

**Đạt checkpoint lab:** ít nhất 8/10, không có lỗi nghiêm trọng về chiều luồng hoặc giả định được trình bày như sự thật. Chưa đạt thì sửa sơ đồ rồi tự chấm lại.

## Evidence để lưu vào portfolio

Lưu file `.drawio` và xuất PNG/SVG để người xem mở nhanh. Cùng file ghi một đoạn ngắn:

- Mục đích sơ đồ và ranh giới đã chọn.
- Một quyết định mô hình hóa và lý do.
- Hai câu hỏi còn mở, vai trò cần hỏi, evidence cần thu.
- Một rủi ro nếu câu hỏi được trả lời khác giả định hiện tại.
- Nhãn **personal learning case study — fictional scenario**, ngày và version.

Không ghi rằng stakeholder đã đồng ý, dự án đã triển khai hoặc metric đã cải thiện nếu chưa có bằng chứng thật.

## Tự đánh giá kỹ năng tool

- **Level 1 — làm theo hướng dẫn:** tạo được bản riêng và hoàn thành các bước với hướng dẫn.
- **Level 2 — tự làm:** có thể dựng lại từ brief mới, giữ hướng luồng chính xác, ghi unknowns và giải thích lựa chọn khi không nhìn mẫu.
- **Level 3 — dẫn dắt:** review được sơ đồ của người khác, phát hiện mâu thuẫn boundary/flow/ownership, điều phối xác nhận và version quyết định.

Chỉ cập nhật tracker lên level sau khi có file do chính bạn chỉnh, phần giải thích và feedback/review; đọc bài hoặc xem file mẫu chưa phải evidence năng lực.

## Bài nộp để được review

Gửi file draw.io hoặc ảnh export, kèm câu trả lời ngắn cho câu 4 và 5 ở phần rà soát. Reviewer sẽ phản hồi theo rubric: điểm đúng, issue cần sửa, câu hỏi BA tiếp theo và level có evidence.
