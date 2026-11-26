# 02 — Stakeholders & Elicitation

## Stakeholder map

| Stakeholder | Mối quan tâm | Ảnh hưởng | Cách làm việc |
|---|---|---:|---|
| Chủ nhà hàng | Doanh thu, trải nghiệm khách, chi phí | Cao | Phỏng vấn, chốt mục tiêu và chính sách |
| Quản lý ca | Sức chứa, vận hành giờ cao điểm | Cao | Workshop quy trình và ngoại lệ |
| Lễ tân | Tốc độ thao tác, danh sách khách | Cao | Quan sát công việc, prototype review |
| Khách hàng | Đặt nhanh, biết trạng thái | Trung bình | Phỏng vấn ngắn/khảo sát |
| Dev/QA | Logic rõ, trạng thái và ngoại lệ | Trung bình | Refinement, review acceptance criteria |

## Kế hoạch elicitation
1. Xem sổ đặt bàn và các kênh hiện tại (document analysis).
2. Quan sát một ca thường và một giờ cao điểm.
3. Phỏng vấn chủ/quản lý, lễ tân và 3–5 khách.
4. Workshop xác định trạng thái, chính sách và ngoại lệ.
5. Vẽ quy trình As-Is/To-Be, xác nhận bằng ví dụ cụ thể.

### Evidence log — sự cố “hai nhóm cùng lúc 19:30”

Ví dụ dưới đây chỉ dựa trên role-play trong chat; đây là lời kể giả lập, không phải sự cố hay dữ liệu nhà hàng thật.

| ID | Claim / câu hỏi | Nguồn và loại | Trạng thái evidence | Bước xác minh tiếp |
|---|---|---|---|---|
| E-01 | Hai nhóm cùng nói họ đã đặt lúc 19:30 | Chị Lan trong role-play; lời nhớ lại | Reported, chưa đối chiếu | Xin ngày/ca cụ thể; so sánh hai booking đã khử định danh và nội dung đã gửi cho từng nhóm |
| H-01 | Hai booking được gán cùng một bàn | Giả thuyết BA | Chưa có evidence | Hỏi nhà hàng có gán bàn cố định không; kiểm tra lịch bàn và thời điểm gán |
| H-02 | Tổng khách vượt sức chứa của slot | Giả thuyết BA khác với H-01 | Chưa có evidence; không suy ra từ “cùng giờ” | Đối chiếu số khách, capacity policy đã duyệt và các booking cùng slot |
| H-03 | Một khách gửi lại tạo request thứ hai | Giả thuyết BA khác với H-01/H-02 | Chưa có evidence | Đối chiếu request/reference ID, thời gian gửi và retry log đã khử định danh |
| Q-01 | Mỗi nhóm được báo điều gì: đã nhận request hay đã xác nhận bàn? | Open question | Chưa trả lời | So nội dung xác nhận và lịch sử trạng thái; hỏi nhân viên ca đó |

Khi lập evidence log, ghi riêng **reported claim**, **hypothesis** và **open question**; thêm ngày, người cung cấp, artifact nguồn, người chịu trách nhiệm follow-up và kết quả xác minh khi có. Không lưu tên/số điện thoại khách vào bài tập hoặc portfolio; dùng mã giả danh và bản trích xuất đã khử định danh theo quy định của tổ chức. Không đánh dấu hypothesis là fact chỉ vì nhiều người nhắc lại cùng một câu chuyện.

**Bài tập:** chọn một hàng H-01/H-02/H-03, viết một câu hỏi trung lập để kiểm tra và chỉ ra artifact nào có thể trả lời. Nếu không có artifact hoặc quyền truy cập, ghi rõ blocker thay vì tự điền kết quả.

## Câu hỏi cho chủ/quản lý
- Hiện đặt bàn đi qua những kênh nào? Ai chịu trách nhiệm xác nhận?
- Trường hợp nào được xem là trùng bàn? Xin ví dụ gần nhất.
- Khung giờ, thời lượng giữ bàn, sức chứa và buffer giữa lượt là bao nhiêu?
- Khi hết chỗ, nhân viên đề xuất giờ khác hay từ chối?
- Thành công sau 1 tháng sẽ được đo bằng chỉ số nào?

## Câu hỏi cho lễ tân
- Bạn cần nhìn thấy thông tin gì để xử lý một yêu cầu?
- Có thể sửa số người/giờ sau khi xác nhận không? Ai được phép?
- Cách xử lý khách đến trễ, đổi bàn, khách không đến?
- Điều gì khiến thao tác hiện tại chậm hoặc dễ nhầm?

## Câu hỏi cho khách
- Bạn thường đặt bàn trước bao lâu và qua kênh nào?
- Thông tin nào cần biết trước khi gửi yêu cầu?
- Bạn muốn xác nhận ngay hay chấp nhận chờ nhân viên duyệt?
- Bạn mong nhận thông báo qua email, SMS hay kênh khác?

## Kỹ thuật BA cần thực hành
Phân biệt stated solution với underlying need; hỏi “vì sao” và dùng ví dụ gần nhất; ghi lại fact/assumption/open question riêng; paraphrase và xin stakeholder xác nhận.
