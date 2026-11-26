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

Sơ đồ editable đi kèm: [Double-Booking Incident Stakeholder/Evidence Map](./Double-Booking-Incident-Stakeholder-Evidence-Map.drawio). Đây là bản mẫu do trợ lý soạn để luyện stakeholder discovery, không phải bằng chứng cá nhân của người học.

| ID | Claim / câu hỏi | Nguồn và loại | Trạng thái evidence | Bước xác minh tiếp |
|---|---|---|---|---|
| E-01 | Hai nhóm cùng nói họ đã đặt lúc 19:30 | Chị Lan trong role-play; lời nhớ lại | Reported, chưa đối chiếu | Xin ngày/ca cụ thể; so sánh hai booking đã khử định danh và nội dung đã gửi cho từng nhóm |
| H-01 | Hai booking được gán cùng một bàn | Giả thuyết BA | Chưa có evidence | Hỏi nhà hàng có gán bàn cố định không; kiểm tra lịch bàn và thời điểm gán |
| H-02 | Tổng khách vượt sức chứa của slot | Giả thuyết BA khác với H-01 | Chưa có evidence; không suy ra từ “cùng giờ” | Đối chiếu số khách, capacity policy đã duyệt và các booking cùng slot |
| H-03 | Một khách gửi lại tạo request thứ hai | Giả thuyết BA khác với H-01/H-02 | Chưa có evidence | Đối chiếu request/reference ID, thời gian gửi và retry log đã khử định danh |
| Q-01 | Mỗi nhóm được báo điều gì: đã nhận request hay đã xác nhận bàn? | Open question | Chưa trả lời | So nội dung xác nhận và lịch sử trạng thái; hỏi nhân viên ca đó |

Khi lập evidence log, ghi riêng **reported claim**, **hypothesis** và **open question**; thêm ngày, người cung cấp, artifact nguồn, người chịu trách nhiệm follow-up và kết quả xác minh khi có. Không lưu tên/số điện thoại khách vào bài tập hoặc portfolio; dùng mã giả danh và bản trích xuất đã khử định danh theo quy định của tổ chức. Không đánh dấu hypothesis là fact chỉ vì nhiều người nhắc lại cùng một câu chuyện.

**Bài tập:** chọn một hàng H-01/H-02/H-03, viết một câu hỏi trung lập để kiểm tra và chỉ ra artifact nào có thể trả lời. Nếu không có artifact hoặc quyền truy cập, ghi rõ blocker thay vì tự điền kết quả.

### Interview guide ngắn — truy lại một sự cố được kể

**Mở đầu:** “Em muốn hiểu đúng trường hợp chị vừa nhắc để phân biệt điều đã xảy ra với nguyên nhân mình còn cần kiểm tra. Đây là bài tập mô phỏng; nếu làm với dữ liệu thật, mình chỉ xem nội dung đã được phép truy cập và đã xóa thông tin nhận dạng khách. Em xin ghi chú nguồn và điều chưa rõ, chưa chọn giải pháp ở buổi này.”

Hỏi từng câu một; chọn follow-up theo câu trả lời, không đọc cả danh sách như bảng kiểm:

1. “Chị có thể nhớ sự việc đó xảy ra ngày/ca nào và mỗi nhóm đã nói gì khi đến không?”
2. “Theo chị nhớ, mỗi nhóm đã được nhà hàng nói điều gì trước khi đến?”
3. “Ai đã nhận và xử lý từng yêu cầu? Chị có thể chỉ giúp bước đầu tiên mình nên kiểm tra với nhân viên nào không?”
4. “Khi chị nói ‘trùng bàn’, chị mô tả chính xác chuyện gì đã xảy ra?”
   - **Follow-up nếu câu trả lời chưa làm rõ:** “Trong hồ sơ, mỗi yêu cầu có gán bàn cụ thể hay chỉ ghi khung giờ và số khách?”
5. “Có hồ sơ nào được phép đối chiếu để xác nhận thời điểm gửi, nội dung phản hồi và trạng thái của từng yêu cầu không?”
6. Sau khi nghe xong, paraphrase: “Em đang hiểu rằng …; phần … vẫn là điều mình chưa xác minh. Em hiểu đúng chưa, và ai có thể bổ sung?”

Câu 4 trước tiên để stakeholder tự định nghĩa “trùng bàn”; chỉ dùng follow-up sau nếu vẫn cần phân biệt booking cùng một bàn với ghi nhận theo khung giờ/số khách. Câu 5 tìm nguồn kiểm chứng; câu 6 cho stakeholder cơ hội sửa phần BA hiểu sai. Không suy ra nguyên nhân chỉ từ một lời kể, không xin thông tin nhận dạng thật để đưa vào workbook/portfolio, và không tự gán quyền duyệt policy cho người được phỏng vấn.

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
