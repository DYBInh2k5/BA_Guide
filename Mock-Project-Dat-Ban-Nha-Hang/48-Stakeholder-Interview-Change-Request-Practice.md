# 48 — Phỏng vấn stakeholder về Change Request

## Mục tiêu

Luyện cách tiếp nhận một giải pháp do sponsor đề xuất mà vẫn khám phá need, impact, evidence, constraint và quyền quyết định. Tình huống/đáp án dưới đây được mô phỏng để học; không phải phỏng vấn thật hay bằng chứng khách hàng.

## Brief

Sponsor nói: “Khách gọi hỏi tình trạng đặt bàn nhiều quá. Thêm SMS xác nhận mọi lần đổi trạng thái, phải xong trong hai tuần.” Product muốn giữ MVP nhỏ. Lễ tân nói có khách đến trước khi nhân viên kịp xác nhận. Kỹ thuật chưa chọn provider và chưa biết nguồn state nào đủ tin cậy.

Chưa có complaint log, call volume, chi phí tin nhắn, consent policy, baseline hoặc phê duyệt scope. Mục tiêu buổi phỏng vấn là quyết định cần phân tích tiếp, không phải bán SMS hoặc bác bỏ sponsor.

## Worked role-play ngắn

### Mở đầu

**BA:** “Em muốn hiểu điều anh/chị cần cải thiện và xem có phương án nào đáp ứng trong thời hạn. Anh/chị kể giúp một lần gần nhất khách gọi hỏi trạng thái được không?”

**Sponsor — câu trả lời mô phỏng:** “Một khách gọi hai lần trong buổi tối. Lễ tân nói đang chờ quản lý xác nhận. Tôi nghĩ SMS sẽ giúp khách yên tâm.”

**BA follow-up:** “Mình đã có ngày/ca hoặc mã request để đối chiếu chưa? Lần đó yêu cầu đã được gửi chưa, trạng thái cuối là gì, và ai đã trả lời khách?”

**Vì sao hỏi:** chuyển từ nhận định tổng quát sang một trường hợp có thể kiểm tra; chưa mặc định SMS giải quyết nguyên nhân.

### Làm rõ impact và baseline

**BA:** “Nếu khách không gọi lại, điều gì sẽ xảy ra? Anh/chị muốn giảm cuộc gọi lặp, giảm khách đến khi chưa xác nhận, hay cải thiện một outcome khác?”

**Sponsor — câu trả lời mô phỏng:** “Tôi lo khách tưởng bàn đã được giữ. Không rõ chuyện này xảy ra bao nhiêu lần; mình chưa ghi riêng cuộc gọi hỏi trạng thái.”

**BA:** “Vậy mình ghi lời kể về một cuộc gọi lặp và lo ngại về hiểu nhầm là stakeholder-reported; tần suất và hậu quả còn chưa biết. Có thể xem call log/lịch ca hoặc quan sát một số ca không? Ai có quyền duyệt cách đo?”

**Vì sao hỏi:** phân biệt impact giả thuyết với số liệu; tìm nguồn, owner và mẫu phù hợp.

### Tách outcome khỏi option

**BA:** “Nếu không dùng SMS ngay, thay đổi nào vẫn tạo giá trị? Ví dụ hiển thị rõ `đã nhận, đang chờ xác nhận` hoặc giúp lễ tân xem queue. Anh/chị muốn so sánh các hướng nào?”

**Sponsor — câu trả lời mô phỏng:** “Tôi vẫn muốn SMS. Nhưng nếu khách xem được trạng thái thì có lẽ giảm gọi.”

**BA:** “Em ghi SMS là option anh/chị ưu tiên; trạng thái rõ là option khác cần so sánh. Chưa chọn giải pháp. Mình có thể đánh giá bằng mức giảm cuộc gọi lặp, mức độ khách hiểu trạng thái, chi phí và rủi ro gửi sai/không gửi được. Những tiêu chí đó có hợp không, ai duyệt?”

**Vì sao hỏi:** không phủ nhận đề xuất; làm lộ tiêu chí và người có quyền quyết định.

### Chốt constraint và follow-up

**BA:** “Hai tuần là deadline cứng hay mốc mong muốn? Có release/event phụ thuộc không? Ai sẽ xác nhận provider, consent/opt-out, các trạng thái phải gửi và cách hỗ trợ khi provider lỗi?”

**Sponsor — câu trả lời mô phỏng:** “Hai tuần là mốc mong muốn. Product owner chốt scope; kỹ thuật và privacy cần kiểm tra provider và consent. Tôi chưa biết trạng thái nào nên gửi.”

**BA tóm tắt:** “Em hiểu mục tiêu đang cần xác minh là giảm sự bất an/cuộc gọi hỏi lại và tránh khách hiểu nhầm trạng thái. SMS là option được đề xuất, chưa được duyệt. Tần suất, nguyên nhân, cost/benefit, consent, trigger state, retry/failure và khả năng hoàn thành trong hai tuần còn mở. Em sẽ xin một số case đã khử định danh hoặc quan sát ca, Product xác nhận tiêu chí/scope, Engineering + Privacy đánh giá provider/consent và Operations xác nhận quy trình xử lý lỗi. Em ghi đúng chưa?”

> Cả câu trả lời stakeholder và cách tóm tắt trên chỉ là minh họa. Trong role-play thực tế, không lấy chúng làm evidence dự án.

## Phân loại đầu ra của ví dụ

| Statement | Phân loại đúng | Việc tiếp theo |
|---|---|---|
| Khách gọi hai lần trong một buổi tối | Stakeholder-reported anecdote | Tìm case/time/reference, không suy rộng tần suất |
| Khách có thể tưởng bàn đã được giữ | Risk/hypothesis | Kiểm tra copy, hành vi khách, staff explanation và policy trạng thái |
| “Thêm SMS” | Solution proposal / candidate change | So sánh với options khác; impact analysis trước khi duyệt |
| “Hai tuần” | Constraint claim, độ cứng chưa rõ | Hỏi deadline, dependency, decision authority |
| Consent/provider/state triggers | Open questions/dependencies | Gán owner và thời điểm cần trả lời |
| Giảm cuộc gọi hỏi lại | Outcome candidate | Định nghĩa event/denominator/baseline với Product/Data/Operations |

## Khung chuẩn bị câu hỏi của bạn

Trước interview, viết 6–8 câu, mỗi câu có mục đích và câu trả lời nào sẽ thay đổi phân tích:

| Nhóm | Câu hỏi của tôi | Mục đích | Quyết định bị ảnh hưởng |
|---|---|---|---|
| Ví dụ cụ thể gần nhất |  |  |  |
| Quy trình/state hiện nay |  |  |  |
| Impact với actor/business |  |  |  |
| Tần suất/baseline/source |  |  |  |
| Workaround/ngoại lệ |  |  |  |
| Success measure |  |  |  |
| Constraint/dependency |  |  |  |
| Authority/approval |  |  |  |

## Bài thực hành role-play

Bạn là BA. Mình sẽ đóng vai sponsor có áp lực deadline, nhưng sẽ không tự tiết lộ toàn bộ thông tin. Gửi **một câu hỏi mở đầu duy nhất**. Sau mỗi lượt, hãy hỏi tiếp dựa trên câu trả lời, rồi cuối buổi tóm tắt `reported / evidence / assumption / option / decision / unknown`.

Nếu muốn làm một mình, ghi 6 câu hỏi, mục đích, câu trả lời giả lập và follow-up. Đánh dấu mọi câu trả lời tự nghĩ là `simulated`, không phải evidence cá nhân/thực địa.

## Rubric review

| Tiêu chí | Dấu hiệu đạt |
|---|---|
| Không dẫn dắt | Câu hỏi cho phép nhiều câu trả lời, không nhét SMS vào tiền đề |
| Khai thác cụ thể | Hỏi ví dụ gần nhất, actor, bước, thời gian, ngoại lệ và workaround |
| Evidence literacy | Tách lời kể/ước lượng khỏi log/quan sát, hỏi owner/source |
| Outcome thinking | Hỏi điều cần cải thiện và cách nhận ra có cải thiện |
| Governance | Làm rõ approver, deadline, scope và dependency |
| Synthesis | Đọc lại điều hiểu, open questions và next actions để stakeholder sửa |

Không nâng scorecard từ role-play mẫu này. Chỉ review năng lực cá nhân khi bạn gửi câu hỏi, ghi chú hoặc tóm tắt do bạn tự làm.
