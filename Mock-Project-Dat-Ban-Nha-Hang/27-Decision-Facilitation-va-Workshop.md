# 27 — Điều phối workshop và ra quyết định nghiệp vụ

## Mục tiêu học

BA không tự quyết policy thay business owner. BA chuẩn bị lựa chọn, làm rõ tác động, điều phối đúng người có quyền quyết định, ghi lại căn cứ và cập nhật các artifact bị ảnh hưởng. Bài này dùng câu hỏi còn mở BRULE-02: sức chứa được tính thế nào và request `PENDING` có giữ chỗ không?

**Board dự án hiện có:** [BA Practice Project — Restaurant Reservation](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23) là board mẫu FigJam đã được tạo và chụp ảnh kiểm tra trước đó. Hãy dùng board này làm điểm bắt đầu cho workshop. Một board trống trùng lặp [BA Practice — BRULE-02 Decision Workshop](https://www.figma.com/board/HJaxjtgrTZm8gz3afLZAgZ) đã được tạo nhầm trong lần tiếp tục này; Figma Starter đã chặn các lượt gọi sau đó nên board này chưa có nội dung và chưa được kiểm tra. Không dùng board trống đó làm đầu ra portfolio.

Tất cả số liệu và vai trò trong bài là giả lập để thực hành. Chúng không phải quyết định đã được nhà hàng xác nhận.

## 1. Phân biệt loại phát biểu

| Phát biểu trong workshop | Phân loại | Cách BA xử lý |
|---|---|---|
| “Quản lý ca nói nhân viên thường gọi lại khách sau 10 phút.” | Evidence cần kiểm tra | Hỏi phạm vi, thời điểm, mẫu quan sát và đối chiếu log/phỏng vấn khác |
| “Có lẽ nên giữ chỗ trong 10 phút.” | Đề xuất | Ghi người đề xuất, lợi ích, rủi ro; chưa đưa vào baseline |
| “PENDING giữ capacity 10 phút.” | Decision nếu approver đã chốt | Ghi approver, ngày hiệu lực, phạm vi, phiên bản và cách triển khai |
| “API sẽ dùng lock để tránh hai yêu cầu cùng lấy một chỗ.” | Solution/design | Chuyển engineering đánh giá; không ghi thành business rule |
| “Chưa biết có tính booking điện thoại vào sức chứa không.” | Open question | Nêu owner và hạn xử lý; giữ requirement ở Draft/TBD |

## 2. Chuẩn bị workshop 45 phút

**Mục tiêu:** tạo quyết định có thể triển khai hoặc ghi rõ gap có owner/deadline; không ép nhóm chọn nếu thiếu quyền hoặc bằng chứng.

| Phút | Hoạt động | Đầu ra |
|---:|---|---|
| 0–5 | Nêu mục tiêu, phạm vi, quyền quyết định, quy ước fact/assumption/proposal/decision | Shared context và decision owner |
| 5–12 | Xem flow booking và ví dụ một slot | Cùng hiểu “capacity”, “occupancy”, “PENDING” |
| 12–22 | Xem dữ liệu/evidence và tình huống biên | Evidence log, câu hỏi còn thiếu |
| 22–35 | So sánh phương án giữ chỗ, timeout, xử lý đồng thời | Trade-off matrix |
| 35–42 | Approver quyết định hoặc ghi TBD có trách nhiệm xử lý | Decision log hoặc action item |
| 42–45 | Đọc lại quyết định, owner, ngày hiệu lực, artifact cần cập nhật | Xác nhận hiểu thống nhất |

**Vai trò cần mời:** business owner/người có quyền phê duyệt policy; quản lý ca/operations; người quản lý sơ đồ bàn/capacity; engineering; QA; BA facilitator/note taker. Chỉ mời vai trò có liên quan; xác nhận ai là approver trước buổi họp.

## 3. Kịch bản tình huống để thảo luận

Một slot 19:00 có capacity giả lập 20 khách. Hai request cho party 4 và party 3 tới gần như đồng thời. Nhân viên chưa xử lý request đầu tiên. Một khách khác mở màn hình availability cùng thời điểm đó.

Câu hỏi không phải “chọn cách nào cho nhanh”, mà là cần làm rõ:

1. Capacity 20 là 20 ghế dùng được, hay suy ra từ số bàn/tổ hợp bàn? Có buffer cho khách walk-in không?
2. Availability hiển thị theo thời điểm nào; các booking qua điện thoại, tại quầy có cùng nguồn dữ liệu không?
3. Khi request được tạo thành `PENDING`, hệ thống có tạm giữ 4 chỗ không? Nếu có, giữ trong bao lâu và ai/logic nào giải phóng?
4. Nếu hai request đồng thời vượt capacity, business kỳ vọng khách nào được ưu tiên? Thời điểm gửi, thứ tự đến hay staff quyết định?
5. Booking `CONFIRMED`, `CANCELLED`, `REJECTED`, `EXPIRED` ảnh hưởng occupancy ra sao? Khi nào capacity được trả lại?
6. Khách thấy thông tin gì khi chỗ vừa hết? Có đề xuất khung giờ khác hoặc waitlist không?
7. Ai có quyền phê duyệt mỗi policy? Có cần ngày hiệu lực, ngoại lệ ngày lễ hoặc theo từng cơ sở không?

BA hỏi trung lập; không gài người tham dự vào một phương án. Nếu chưa đủ dữ liệu, ghi chính xác evidence cần thu thập và người chịu trách nhiệm.

## 4. So sánh phương án — chưa phải khuyến nghị đã duyệt

| Phương án | Lợi ích có thể có | Rủi ro/câu hỏi | Bằng chứng cần có |
|---|---|---|---|
| A. Không giữ capacity khi PENDING | Không khóa chỗ bởi request chưa được staff duyệt | Có thể nhiều khách cùng nhận PENDING trong khi chỗ thực tế đã hết | Số yêu cầu đồng thời, cách staff xử lý oversell, kỳ vọng khách |
| B. Giữ capacity tạm thời, có timeout | Giảm nguy cơ cấp cùng chỗ; timeout giải phóng request bị bỏ quên | Timeout quá ngắn làm staff không kịp; quá dài làm kẹt chỗ; cần xử lý race/retry | Thời gian staff xử lý, tỷ lệ không phản hồi, mức oversell chấp nhận được |
| C. Chỉ giữ capacity khi CONFIRMED | Khớp với khái niệm “đã xác nhận” | Hai khách có thể chờ cùng slot; staff cần thấy conflict trước khi confirm | Quy trình hiện tại, thời gian gọi lại, cách giải quyết khi hết chỗ |
| D. Không hiển thị capacity chính xác; nhận yêu cầu để staff xử lý | Giảm cam kết availability chính xác theo thời gian thực | Trải nghiệm kém hơn; khách có thể gửi yêu cầu không đáp ứng được | Nhu cầu khách, khả năng vận hành và chi phí hỗ trợ |

Chưa đủ dữ liệu để BA chọn phương án thay business. So sánh thêm theo mục tiêu kinh doanh, trải nghiệm, vận hành, chi phí, khả thi kỹ thuật, rủi ro và khả năng kiểm chứng.

### Khi Product và Operations bất đồng

**Tình huống mô phỏng:** Product muốn phản hồi tức thì để khách không phải chờ; Operations lo khách hiểu `PENDING` là bàn đã được giữ và staff không xử lý kịp. Đây là hai mối quan tâm cần hiểu, không phải bằng chứng rằng một bên “đúng” hay đang cản trở.

1. **Nêu câu hỏi quyết định trung lập:** “Khách nên nhận được lời hứa nào ở từng trạng thái, và nhà hàng chịu mức rủi ro capacity/workload nào?”
2. **Tách vị trí khỏi nhu cầu:** hỏi Product outcome nào cần đạt; hỏi Operations failure/workload nào cần tránh; hỏi từng bên evidence, điều kiện ngoại lệ và mức không thể thỏa hiệp.
3. **Phản chiếu trước khi tranh luận:** tóm tắt lập luận của mỗi bên bằng từ trung tính, cho họ sửa lại; không đóng khung một bên là “business” còn bên kia là “ngăn cản”.
4. **Đánh giá các option theo cùng tiêu chí:** độ rõ status với khách, capacity risk, staff effort, chi phí/khả thi, khả năng rollback và mức evidence. Để trống score nếu trọng số/nguồn chưa được thống nhất.
5. **Xác định quyền quyết định:** BA điều phối và ghi trade-off; business owner/approver theo governance chốt policy. Không dùng biểu quyết workshop nếu người dự không được ủy quyền quyết.
6. **Nếu chưa thể chốt:** ghi `TBD`, quyết định cụ thể còn thiếu, evidence cần lấy, owner, hạn, điều gì bị chặn và phần việc nào có thể làm song song. Không ghi biên bản là “đã thống nhất” chỉ vì hết giờ.

**Decision log khi còn bất đồng:** lưu câu hỏi, từng option, căn cứ/giới hạn, điểm chưa được hai phía xác nhận, approver, điều kiện xem lại và artifact cần cập nhật. Nếu pilot/experiment được đề xuất, đặt success/stop criteria, phạm vi an toàn, rollback và người trực vận hành trước khi chạy.

### Ví dụ làm mẫu: câu hỏi → evidence → quyết định có thể hỗ trợ

| Câu hỏi trung lập | Evidence cần xin | Cách phân tích | Giới hạn cần ghi |
|---|---|---|---|
| Bao nhiêu request cùng nhắm một slot trong khoảng thời gian ngắn, và có bao nhiêu lần nhà hàng không đáp ứng được sau khi đã nhận request? | Log đã ẩn danh: slot, thời điểm tạo request, party size, kênh, thời điểm/kết quả xử lý; ghi nhận riêng booking điện thoại/tại quầy nếu chúng không nằm trong log hệ thống | Đếm request theo slot và thời gian; đối chiếu với capacity đã được operations xác nhận; xem tình huống vượt capacity và khiếu nại/không phục vụ | Nếu chỉ có dữ liệu online thì không phản ánh tổng nhu cầu; cần thống nhất “đồng thời” là khoảng bao lâu trước khi phân tích |
| Nhân viên thường mất bao lâu để quyết định request, và bao nhiêu request còn PENDING quá lâu hoặc không được xử lý? | Timestamp nhận và quyết định, trạng thái cuối, ca làm/kênh nếu hợp lệ; bỏ thông tin nhận dạng khách | Xem median và percentile cao của thời gian xử lý, số lượng/tỷ lệ PENDING theo tuổi request; phân đoạn giờ cao điểm và thấp điểm | Log thiếu timestamp, thao tác cập nhật trễ, hoặc request bị xử lý ngoài hệ thống sẽ làm sai lệch thời gian |

Hai câu này giúp phân biệt: không giữ chỗ có thể tăng xung đột khi nhiều request cùng slot; giữ tạm có thể khóa chỗ nếu staff xử lý chậm. Chúng chưa tự xác định phương án tối ưu hay thời hạn timeout. Business owner vẫn phải đặt mức rủi ro chấp nhận được và chốt policy; operations xác nhận quy trình/thời gian thực tế; engineering đánh giá cách thực thi; QA chuyển quyết định thành scenario kiểm thử.

**Excel lab:** mở [Pending-Decision-Evidence-Lab.xlsx](./outputs/evidence-analysis-lab/Pending-Decision-Evidence-Lab.xlsx). Đây là fixture 20 dòng giả lập, không phải evidence vận hành. Lọc theo Channel/Final status; kiểm tra công thức median decision time bằng các hàng đã quyết định; ghi lại trường capacity và occupancy còn thiếu. Ghi rõ dataset chưa có capacity snapshot nên không thể xác nhận oversell hay chốt hold policy. Khi có dữ liệu thật, ẩn danh và xác nhận nguồn/định nghĩa trước khi phân tích. Trên FigJam hoặc draw.io, đặt câu hỏi, evidence, insight, proposal và decision ở các vùng riêng.

### Đáp án mẫu: dữ liệu để xác định request có cạnh tranh capacity

Hai request cùng `slot` chỉ cho biết chúng nhắm cùng giờ. Muốn biết có tranh chỗ, cần biết capacity nào khả dụng tại thời điểm request đến và các booking khác đang chiếm chỗ theo policy được duyệt.

| Nhóm dữ liệu | Trường cần có | Vì sao cần |
|---|---|---|
| Request và lịch sử trạng thái | `request_id`, `slot_id`, `created_at` có timezone, `party_size`, `channel`, các trạng thái cùng timestamp | Xác định request nào nhắm cùng slot, đến gần nhau ra sao và trạng thái nào tồn tại ở thời điểm đó |
| Capacity theo thời gian | `slot_id`, đơn vị capacity (ghế/bàn/tổ hợp), `capacity`, thời gian hiệu lực, giờ đóng/ngoại lệ, buffer walk-in nếu có | Capacity có thể đổi theo ngày, ca, bàn đóng hoặc cấu hình; số “20 ghế” đơn lẻ chưa đủ |
| Occupancy tại thời điểm nhận | Các reservation khác của cùng slot, party size, trạng thái và thời điểm đổi trạng thái; hoặc snapshot availability tại `created_at` | Cho biết chỗ còn lại trước request mới và phải bao gồm các kênh online, điện thoại, tại quầy |
| Policy tính occupancy | Quy định trạng thái nào chiếm chỗ, đặc biệt `PENDING`, cùng timeout/cancel/release | Nếu chưa có policy, cùng dữ liệu có thể cho hai kết quả khác nhau; tính hai scenario và ghi TBD thay vì chọn một |

**Cách phân tích:** ghép request bằng cùng `slot_id`; định nghĩa khoảng “đến gần đồng thời” với business/operations; tái dựng capacity và occupancy tại từng `created_at`; so tổng party size cạnh tranh với chỗ còn lại theo từng scenario policy. Chỉ gọi là rủi ro conflict nếu available capacity không đủ. Chỉ gọi là overbooking thực tế khi có bằng chứng reservation được chấp nhận/confirmed vượt giới hạn theo định nghĩa đã duyệt.

Trong fixture Excel hiện tại có slot, party size, kênh và thời điểm nhưng **không có capacity snapshot hoặc toàn bộ occupancy theo kênh**. Vì vậy, lọc hai request `PENDING` cùng slot là đầu mối cần điều tra, không phải bằng chứng đủ để kết luận. Schema luyện tập ở [bài Data Modeling/SQL](./12-Data-Modeling-SQL-API.md) và query capacity trong `Reservation-Practice.sql` minh họa những bảng cần đối chiếu; policy PENDING trong đó vẫn là giả định. Lab SQL độc lập để so sánh hai scenario có tại [Reservation-Capacity-Analysis-Lab.sql](./Reservation-Capacity-Analysis-Lab.sql).
### Ai có thể cung cấp evidence?

Đây là owner/source gợi ý cho case study; BA phải xác minh hệ thống thực tế, quyền truy cập và người chịu trách nhiệm trước khi ghi vào action log.

| Evidence cần | Owner/source có thể hỏi | Trường/dữ liệu cần | Rà soát trước phân tích |
|---|---|---|---|
| Thời gian từ nhận đến quyết định | Operations manager hoặc quản lý ca; reservation system owner có thể xuất log | request ID đã thay thế định danh, created time, decision time, trạng thái cuối, kênh, party size | Timestamp cùng timezone; request chưa quyết định được tính riêng; thao tác cập nhật muộn được nhận diện |
| Request cạnh tranh cùng slot | System/product owner cho kênh online; quản lý ca cho điện thoại và tại quầy | slot, thời gian nhận, party size, outcome, kênh; không lấy tên/điện thoại/email | Dữ liệu phải bao phủ các kênh liên quan; định nghĩa khoảng “đồng thời” do nhóm thống nhất |
| Capacity thực sự có thể bán | Restaurant/operations manager và người quản lý sơ đồ bàn | slot capacity, bàn ghép, buffer walk-in, bàn đóng/bảo trì, ngoại lệ giờ/lễ | Đơn vị capacity rõ (ghế/bàn/tổ hợp); effective date và ngoại lệ được ghi |
| Request không đáp ứng/khách phàn nàn | Operations hoặc customer service | số case, lý do, slot, ngày, kênh; mã giả danh nếu cần nối với booking | Không suy ra mọi request không xác nhận là “mất khách”; kiểm tra lý do và mẫu số |

**Câu mẫu để xin dữ liệu:** “Anh/chị có thể giúp xác nhận nguồn nào ghi thời điểm nhận và quyết định booking cho từng kênh? Em cần một bản trích xuất đã loại thông tin nhận dạng, kèm định nghĩa trạng thái, timezone và các trường hợp log cập nhật trễ. Operations giúp xác nhận capacity theo slot và ngoại lệ. Khoảng thời gian lấy mẫu mình sẽ chọn cùng nhau để có cả thời điểm cao điểm và bình thường.”

Không tự đặt một thời lượng lấy mẫu hay mức timeout như chính sách. Hãy thống nhất cùng owner dữ liệu dựa trên mùa vụ, cuối tuần, ngày lễ và khả năng sẵn có; xin quyền truy cập tối thiểu cần thiết, tuân thủ chính sách dữ liệu và xóa bản lab khi hết mục đích.

## 5. Mẫu decision log và action log

| ID | Nội dung | Loại | Người quyết định/owner | Trạng thái | Ngày hiệu lực/hạn | Căn cứ/evidence | Artifact bị ảnh hưởng |
|---|---|---|---|---|---|---|---|
| DEC-007 | PENDING có giữ capacity không? | Decision | Business owner — cần xác nhận tên | Open/TBD | Chưa chốt | Cần số liệu thời gian staff xử lý và booking đồng thời | BRULE-02, decision table, BPMN, API, SQL, UAT |
| ACT-012 | Trích xuất thời gian từ lúc nhận request đến staff confirm/reject | Action | Operations owner — cần xác nhận | Open | Trước workshop tiếp theo | Lấy mẫu dữ liệu đã ẩn danh, thống nhất khoảng thời gian và mẫu số | Business case, BRULE-02, timeout policy |

Không ghi tên người hay trạng thái “Approved” nếu họ chưa thật sự đồng ý. Không dùng dữ liệu khách thật trong bài thực hành.

## 6. Cập nhật sau khi quyết định

Khi approver chốt policy, BA cần:

1. Cập nhật BRULE-02/03 và source, owner, trạng thái, version, ngày hiệu lực, exception.
2. Hoàn thiện decision table; bổ sung boundary, timeout, retry, concurrent request và duplicate request.
3. Cập nhật BPMN/sequence, API contract, data model/SQL assumptions và acceptance criteria.
4. Tạo hoặc sửa test case/UAT, gồm negative, boundary và concurrent behavior; thống nhất evidence với QA/engineering.
5. Cập nhật RTM và impact analysis; đánh giá backlog, UI message, reporting, operations/support.
6. Thông báo quyết định qua nguồn tài liệu chính thức; ghi version để team không làm theo bản cũ.

Nếu chưa chốt: giữ `TBD`, nêu rủi ro không thể baseline/triển khai phần liên quan, giao owner và deadline. Không tự chuyển giả định trong mock SQL thành policy.

## 7. Tool lab — cùng một quyết định qua nhiều công cụ

| Công cụ | Thao tác thực hành | Evidence bạn lưu |
|---|---|---|
| FigJam hoặc draw.io | Tạo board 4 vùng: Evidence / Assumptions / Options / Decisions; thêm agenda, timebox, owner và parking lot | Ảnh/export hoặc link board; ghi rõ nội dung mô phỏng |
| Excel | Tạo bảng options với criteria, weight do stakeholder xác nhận, score, source và sensitivity; để trống score khi thiếu evidence | Workbook có nguồn dữ liệu, công thức và caveat; không bịa trọng số |
| Jira | Tạo issue cho open question/action, gắn owner, deadline, dependency và link requirement; cập nhật status theo flow | Issue link hoặc screenshot; Jira hiện có thể chưa kết nối |
| Confluence/Markdown | Ghi decision log và canonical rule, version, approver, effective date | Page/file có history/version và liên kết RTM |
| draw.io | Cập nhật gateway/exception sau khi policy được quyết định | Sơ đồ trước/sau, revision note và link rule |
| Postman/SQL | Sau khi có policy, kiểm tra response và data effect cho scenario được duyệt | Request/response và query output trên dữ liệu giả lập; mock chưa chứng minh production behavior |

## 8. Bài tập của bạn

Hãy trả lời theo hiểu biết hiện tại; nếu thiếu thông tin, hãy ghi `TBD` thay vì đoán:

1. Trong workshop, bạn sẽ mời những vai trò nào và ai có thể là decision owner cho BRULE-02?
2. Chọn hai câu hỏi quan trọng nhất để phân biệt phương án A/B/C. Evidence cụ thể nào giúp trả lời?
3. Viết một dòng DEC cho tình trạng hiện tại, không tự phê duyệt policy.
4. Nêu ba artifact cần cập nhật nếu business chọn giữ chỗ `PENDING` trong 10 phút.

**Tiêu chí tự rà:** câu hỏi trung lập; fact khác proposal/decision; approver rõ; TBD có owner/hạn; thay đổi được truy tới process, requirement, API/data và test.

## Đầu ra portfolio

Một workshop pack có mục tiêu/agenda, stakeholder và decision rights, evidence/options, decision/action log, artifact cập nhật và revision note. Mẫu tổng hợp quyết định xem [decision brief BRULE-02](./28-Decision-Brief-BRULE-02.md). Với case study giả lập, ghi rõ đây là bài thực hành; không trình bày như dự án khách hàng thật.










