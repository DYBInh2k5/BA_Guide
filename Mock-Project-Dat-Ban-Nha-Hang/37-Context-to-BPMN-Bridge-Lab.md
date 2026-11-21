# 37 — Từ system context đến BPMN As-Is

## Vì sao cần hai mô hình?

System context trả lời **ai/điều gì tương tác với hệ thống và qua ranh giới nào**. BPMN trả lời **công việc được thực hiện theo thứ tự nào, bởi vai trò nào, và nhánh quyết định nằm ở đâu**. Context diagram không phải process flow; BPMN không nên được dùng để khẳng định một quy trình chưa có bằng chứng.

## Đầu vào của bài lab

- [System context mẫu](./35-Reservation-System-Context.drawio)
- [Bài BPMN](./09-BPMN-Modeling-Lesson.md)
- [Role-play phỏng vấn giả lập](./32-Stakeholder-Interview-Roleplay.md)

Đây đều là tài liệu học tập trong một scenario hư cấu. Role-play chỉ cung cấp lời kể mô phỏng: nhân viên đọc tin nhắn, ghi yêu cầu vào sổ, kỳ vọng ca trưởng xác nhận; có trường hợp khách tới khi trạng thái chưa rõ. Chưa có quy trình thật được khảo sát hoặc xác nhận.

## Bài học trọng tâm: không suy diễn phần nối giữa hai sự kiện

Nếu brief cho biết “lễ tân ghi request vào sổ” và “ca trưởng có thể xác nhận”, không đủ bằng chứng để kết luận request luôn được bàn giao theo quy trình chính thức. Hãy mô hình hóa phần có căn cứ, rồi dừng ở open question. Trong BPMN, đường sequence nối hai hoạt động biểu thị thứ tự công việc; nếu vẽ nó, người đọc sẽ hiểu hoạt động sau thực sự tiếp nối hoạt động trước.

| Phát biểu mô phỏng | Có thể biểu diễn | Chưa thể kết luận |
|---|---|---|
| Nhân viên đọc tin nhắn | Task “Đọc tin nhắn yêu cầu” trong lane Lễ tân | Kênh tiếp nhận duy nhất hay luôn được đọc ngay |
| Nhân viên ghi vào sổ | Task “Ghi request vào sổ”, annotation nguồn `RP-01` | Sổ là system of record hay bản ghi được kiểm soát |
| Ca trưởng được kỳ vọng xác nhận | Open question cạnh mô hình | Handoff chính thức, SLA, thứ tự hoặc quyền duyệt thực tế |
| Khách tới khi trạng thái chưa rõ | Observation trong role-play cần khảo sát | Nguyên nhân, tần suất, hoặc trạng thái đã được gửi cho khách |

## Thực hành trong diagrams.net

1. Tạo bản làm việc từ `09-Reservation-As-Is.drawio`; không ghi đè bản mẫu. Đặt tên có ngày/version.
2. Dựng pool **Nhà hàng** với lane **Lễ tân**. Có thể đặt pool **Khách hàng** để thể hiện message gửi đến, nhưng chỉ thêm hoạt động khách nếu brief hỗ trợ.
3. Trong lane Lễ tân, mô hình hóa tối thiểu phần được lời kể hỗ trợ: message/request đến → đọc tin nhắn → ghi vào sổ.
4. Dùng annotation `Nguồn: RP-01, role-play mô phỏng; chưa xác minh thực địa` cạnh hai task.
5. Dừng sequence flow tại điểm chưa biết. Thêm annotation hoặc note: `Open question: ai nhận ownership sau khi ghi? Ca trưởng có thực sự nhận/duyệt không?`
6. Không thêm gateway “Cần quản lý duyệt?” cho tới khi biết điều kiện rẽ nhánh và người quyết định. Không thêm nhánh timeout/SLA vì chưa có dữ kiện.
7. Vẽ message flow từ pool khách tới pool nhà hàng nếu biểu diễn hai participant; message flow dùng nét đứt và nối giữa pools. Sequence flow dùng nét liền và chỉ nối elements trong cùng pool.
8. Thêm legend phân biệt `reported in simulation`, `open question`, `not yet observed`; ghi version và mục đích sơ đồ.

## Câu hỏi elicitation để đóng khoảng trống

Viết ít nhất ba câu hỏi không dẫn dắt, ví dụ:

- “Sau khi ghi request, bước kế tiếp thường do ai thực hiện? Anh/chị có thể kể lại lần gần nhất?”
- “Làm sao người nhận biết request mới đang chờ mình xử lý?”
- “Khi khách đến trước khi có phản hồi, nhân viên kiểm tra thông tin ở đâu và quyết định theo quy tắc nào?”

Với mỗi câu trả lời cần xin bằng chứng phù hợp: quan sát quy trình, biểu mẫu/sổ đã khử dữ liệu cá nhân, policy hiện hành, hoặc nhiều ví dụ đại diện. Không xin thông tin khách thật cho bài portfolio.

## Rubric review (10 điểm)

| Tiêu chí | Điểm |
|---|---:|
| Pool/lane thể hiện participant và vai trò thực hiện đúng | 0–2 |
| Sequence flow và message flow đúng loại, đúng ranh giới | 0–2 |
| Chỉ vẽ bước có căn cứ; nguồn được chú thích | 0–2 |
| Khoảng trống ownership/handoff được giữ là open question | 0–2 |
| Có ba câu hỏi elicitation và evidence cần thu | 0–2 |

Lỗi cần sửa trước khi chấm đạt: sequence flow băng qua hai pool; gateway không có điều kiện/nhánh rõ; hoặc mô hình giả lập được mô tả như quy trình nhà hàng thật.

## Đầu ra portfolio

Lưu file `.drawio` và ảnh export. Kèm phần mô tả ngắn: mục đích, nguồn thông tin, điểm cố ý chưa nối flow, câu hỏi tiếp theo và giới hạn của model. Gắn nhãn `fictional learning exercise`; không ghi outcome nghiệp vụ hoặc xác nhận stakeholder.

**Bài nộp:** gửi sơ đồ bạn tự làm (không phải file mẫu) và cho biết một flow bạn đã cố ý chưa vẽ vì thiếu bằng chứng. Chỉ khi có artifact đó mới đánh giá được kỹ năng BPMN của bạn.
