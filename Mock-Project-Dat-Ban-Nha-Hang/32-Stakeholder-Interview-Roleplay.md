# 32 — Mô phỏng phỏng vấn stakeholder: khám phá vấn đề

## Mục tiêu buổi luyện

Thực hành elicitation như một BA mới vào dự án: đặt câu hỏi mở, làm rõ quy trình thật, tìm bằng chứng, phân biệt lời kể với dữ kiện, rồi chốt lại điều đã hiểu và câu hỏi còn bỏ ngỏ.

Đây là role-play giả lập của case study nhà hàng. Người học đóng vai BA; trợ lý đóng vai quản lý nhà hàng. Câu trả lời của nhân vật không phải sự thật ngoài đời và không được đưa vào portfolio như nghiên cứu khách hàng thật.

## Tình huống mở đầu

Bạn có 20 phút với **chị Lan, quản lý nhà hàng**. Sponsor nói: “Dạo này khách hay phàn nàn vì đặt bàn online không rõ đã thành công chưa. Làm app đặt bàn để giảm lỗi.” Chưa có số liệu baseline, chưa có xác nhận rằng app là giải pháp đúng.

Nhiệm vụ đầu buổi không phải viết requirement hay quảng bá app. Hãy hiểu mục tiêu, sự cố, đối tượng bị ảnh hưởng, quy trình hiện tại, cách đo và quyết định cần có.

## Cách tiến hành role-play

1. Gửi từng câu hỏi như đang phỏng vấn; không gửi cả danh sách cùng lúc.
2. Mình trả lời trong vai chị Lan dựa trên dữ kiện role-play. Nếu câu hỏi dẫn dắt, quá rộng hoặc nhảy thẳng sang giải pháp, mình sẽ trả lời tự nhiên như stakeholder thật; sau phần luyện sẽ góp ý.
3. Hỏi tiếp để làm rõ ví dụ cụ thể, tần suất, thời điểm, tác động, ngoại lệ, workaround, nguồn dữ liệu và ai có quyền quyết định.
4. Sau khoảng 6–10 câu, tóm tắt điều bạn hiểu và xin stakeholder xác nhận/chỉnh sửa.
5. Kết thúc bằng một problem statement tạm thời, danh sách fact/assumption/open question và follow-up/evidence plan.

Mình sẽ không tiết lộ toàn bộ bối cảnh ngay từ đầu. Trong discovery thực tế, BA phải tìm thông tin qua câu hỏi, quan sát và kiểm chứng nguồn.

## Khung ghi chép

| Chủ đề | Ghi chú | Loại thông tin | Nguồn/owner | Cần kiểm chứng bằng |
|---|---|---|---|---|
| Mục tiêu/kết quả cần cải thiện |  | Fact / assumption / question |  |  |
| Người dùng/actor |  | Fact / assumption / question |  |  |
| As-Is trigger và các bước |  | Fact / assumption / question |  |  |
| Pain point và ví dụ gần nhất |  | Fact / assumption / question |  |  |
| Ngoại lệ/workaround |  | Fact / assumption / question |  |  |
| Dữ liệu/baseline |  | Fact / assumption / question |  |  |
| Quy tắc/quyết định |  | Fact / assumption / question |  |  |
| Giới hạn/rủi ro |  | Fact / assumption / question |  |  |
| Hành động tiếp theo |  | Owner / due date / evidence |  |  |

## Kỹ thuật đặt câu hỏi

Ưu tiên hỏi một ý một lần:

- **Mở:** “Anh/chị có thể kể lần gần nhất việc đó xảy ra không?”
- **Làm rõ:** “Lúc đó ai nhận thông tin và làm gì tiếp theo?”
- **Định lượng:** “Trong một tuần bình thường, tình huống này xảy ra khoảng bao nhiêu lần? Có thể kiểm tra ở đâu?”
- **Ngoại lệ:** “Khi khách gọi đổi giờ sau khi gửi yêu cầu thì quy trình thế nào?”
- **Workaround:** “Nhân viên đang làm gì để xử lý khi hệ thống/ghi chép không đủ?”
- **Ưu tiên:** “Nếu chỉ cải thiện một điều trong tháng này, điều gì tạo khác biệt lớn nhất và vì sao?”
- **Kiểm tra giả định:** “Mình đang hiểu rằng X. Điều đó đúng trong mọi ca hay chỉ một số trường hợp?”
- **Kết thúc:** “Mình còn thiếu ai, tài liệu nào hoặc số liệu nào để xác nhận phần này?”

Tránh câu hỏi dẫn dắt như “App có giải quyết được lỗi này không?”, câu hỏi kép như “Ai nhập và ai duyệt, nếu sai thì sao?”, hoặc câu hỏi gợi ý con số chưa có nguồn.

## Đầu ra sau phỏng vấn

### 1. Problem statement tạm thời

> [Nhóm người dùng] gặp [vấn đề quan sát được] trong [bối cảnh/quy trình], dẫn tới [tác động cần xác nhận]. Hiện chưa rõ [khoảng trống bằng chứng]. Cần kiểm tra [nguồn/hoạt động tiếp theo] trước khi kết luận giải pháp.

### 2. Ba danh sách riêng

- **Facts được stakeholder kể:** ghi rõ ai nói và khi nào; chưa mặc nhiên coi là số liệu đã kiểm chứng.
- **Assumptions:** suy luận cần xác nhận, không được ngụy trang thành yêu cầu.
- **Open questions:** thiếu quyết định, định nghĩa, owner hoặc nguồn evidence.

### 3. Evidence plan

| Claim cần xác nhận | Nguồn phù hợp | Cách lấy | Owner | Giới hạn/PII |
|---|---|---|---|---|
| Sự cố có thường xuyên không? | Complaint log / booking records | Lấy mẫu theo thời gian và kênh | Operations | Khử định danh; chuẩn hóa định nghĩa |
| Yêu cầu bị bỏ lỡ ở bước nào? | Quan sát ca làm / staff interview | Theo dõi vài ca đại diện | BA + manager | Xin đồng thuận, không cản trở phục vụ |
| Khách có hiểu trạng thái không? | Hỏi khách / usability session | Mẫu nhỏ định tính trước | Product/BA | Không suy rộng tỷ lệ từ mẫu nhỏ |

Chỉ giữ các claim thực sự phát sinh từ cuộc phỏng vấn; bảng trên là gợi ý phương pháp, chưa khẳng định có log/booking records thật.

## Rubric tự đánh giá sau role-play

Chấm mỗi mục 0–2: **0** chưa thể hiện; **1** có nhưng cần nhắc; **2** làm rõ, có follow-up hoặc xác nhận.

| Kỹ năng | 0–2 |
|---|---:|
| Mở đầu rõ mục tiêu, vai trò, thời lượng và xin phép ghi chú |  |
| Hỏi ví dụ cụ thể trước khi suy luận nguyên nhân |  |
| Khám phá actor, trigger, luồng và ngoại lệ |  |
| Hỏi tác động, mức độ, tần suất và nguồn kiểm chứng |  |
| Phân biệt fact do người nói kể với fact đã có bằng chứng |  |
| Không chốt app/feature trước khi hiểu need |  |
| Tóm tắt lại để stakeholder hiệu chỉnh |  |
| Chốt owner, evidence, follow-up và ngày quay lại |  |

Điểm số giúp chọn kỹ năng cần luyện, không phải chứng chỉ nghề nghiệp.

## Từ cuộc phỏng vấn sang artifact và công cụ

- **Markdown/Confluence:** interview notes, glossary, decision log; nêu owner, ngày và trạng thái xác minh.
- **FigJam:** gom theme, pain point, câu hỏi mở và action; không gộp ý kiến khác nhau thành một quyết định. Nếu board không khả dụng, dùng bảng này hoặc sticky trong FigJam thủ công.
- **draw.io:** [Discovery Interview Workshop board](./32-Discovery-Interview-Workshop.drawio) là canvas chỉnh sửa được để thay thế worksheet dạng bảng khi thực hành offline.
- **BPMN/draw.io:** chỉ vẽ As-Is sau khi đủ trigger, actor, handoff, exception; gắn nhãn giả định nếu còn thiếu.
- **Jira/backlog:** chỉ tạo story sau khi xác định need/outcome; lưu discovery item riêng cho câu hỏi chưa trả lời.
- **Excel/SQL:** dùng khi đã biết nguồn, định nghĩa trường, khoảng thời gian và quyền truy cập; không dựng KPI từ lời nhớ chưa kiểm chứng.
- **Figma:** tạo prototype sau khi cần kiểm tra một hành trình/giả thuyết; prototype không thay thế xác nhận nghiệp vụ.

## Cầu nối sang các module khác

- Câu hỏi và evidence plan: `02`, `06`, `07`, `25`.
- Stakeholder/decision rights: `08`, `23`.
- Từ vấn đề sang As-Is và To-Be: `09`, `10`.
- Từ discovery sang story/AC và traceability: `03`, `11`, `22`, `29`.
- Bộ công cụ và scorecard: `24`; portfolio chỉ dùng kết quả tự thực hành và gắn nhãn mô phỏng ở `18`.

## Bắt đầu buổi role-play

Trong chat, gửi lời mở đầu phỏng vấn và câu hỏi đầu tiên cho chị Lan. Mình sẽ trả lời trong vai stakeholder; sau đó ta đi lần lượt qua follow-up, summary và review.

## Ví dụ có hướng dẫn — tác động và xác nhận

Phần dưới là **một nhánh role-play giả lập** để người học thấy cách đi từ câu chuyện đến giả thuyết có thể kiểm chứng. Không xem các câu trả lời như dữ liệu nhà hàng thật.

**BA:** “Khi khách nghĩ bàn đã được xác nhận nhưng nhà hàng chưa xác nhận, điều gì đã xảy ra với khách và với ca làm?”

**Chị Lan:** “Trong câu chuyện tuần trước, khách đến rồi mới biết chưa có xác nhận. Nhân viên phải hỏi các bàn đang có để xem có thể sắp xếp không. Chị không chắc khách cuối cùng có ngồi được hay không.”

**BA follow-up:** “Cảm ơn chị. Chị có thể kiểm tra lại kết quả lần đó từ lịch bàn, trao đổi nội bộ hoặc liên hệ khách không? Có những loại tác động nào chị muốn mình theo dõi, kể cả khi chưa đo được bằng tiền?”

Follow-up này không tự gán kết quả “khách mất doanh thu” hay “khách bỏ đi”. Nó xin xác nhận outcome và mở rộng tác động có thể có: trải nghiệm khách, thời gian nhân viên, xáo trộn bàn, khiếu nại hoặc doanh thu — từng mục cần bằng chứng riêng.

**BA — tóm tắt để xác nhận:** “Em nghe rằng có ít nhất một trường hợp khách đến trước khi nhà hàng xác nhận; ca làm phải kiểm tra khả năng sắp xếp bàn. Chị chưa chắc kết quả phục vụ cuối cùng. Em chưa biết tần suất và chưa xác nhận app là giải pháp phù hợp. Em sẽ kiểm tra lại trường hợp cụ thể và cùng chị xem tin nhắn/sổ ghi trong khoảng thời gian chị cho phép. Em hiểu đúng chưa, và em có thể liên hệ ai để xác minh?”

### Ghi chú sau buổi phỏng vấn mẫu

| Nội dung | Trạng thái đúng lúc này | Bước tiếp theo |
|---|---|---|
| Tin nhắn Facebook được ghi vào sổ trong ví dụ | Stakeholder kể; chưa quan sát độc lập | Xin phép xem luồng mẫu đã khử thông tin nhận dạng |
| Không có trường “người đang xử lý” trong sổ | Stakeholder kể; cần xem biểu mẫu/sổ hiện hành | Kiểm tra các trang đại diện và hỏi thêm ca khác |
| Chị Lan ước lượng “vài lần trong tháng” | Ước lượng, chưa có denominator/định nghĩa | Chốt “bỏ sót” là gì; lấy mẫu theo khoảng thời gian thống nhất |
| Khách và ca làm bị ảnh hưởng | Tác động có thể có, outcome cuối chưa rõ | Đối chiếu case gần nhất, complaint/contact nếu có |
| Nên làm app | Giải pháp do sponsor/stakeholder gợi ý, chưa phải nhu cầu đã chứng minh | So sánh nhiều phương án sau khi xác nhận nguyên nhân/need |

**Problem statement tạm:** “Một số yêu cầu đặt bàn qua Facebook có thể không được nhân viên ca sau nhận diện là cần xác nhận; quản lý kể lại một trường hợp khách đến trước khi trạng thái được làm rõ. Tần suất, kết quả phục vụ và tác động chưa được kiểm chứng. Cần xác nhận quy trình handoff và xem mẫu tin nhắn/sổ đặt bàn trước khi chọn giải pháp.”

**Điều chưa được phép kết luận:** app sẽ giảm lỗi; vấn đề xảy ra thường xuyên; khách đã mất; nhân viên là nguyên nhân duy nhất; một kênh mới sẽ giải quyết handoff. Các claim này cần evidence và phân tích nguyên nhân.

## Worked discovery register — từ role-play tới kế hoạch xác minh

> Register dưới đây được trích từ transcript **mô phỏng** ở bài này. `Reported` nghĩa là stakeholder/nhân viên kể; chưa phải quan sát độc lập. `Open` nghĩa là chưa có quyết định hoặc bằng chứng đủ để đóng câu hỏi.

| Ref/source trong bài role-play | Ghi nhận tạm | Phân loại/trạng thái | Người có thể cung cấp/kiểm tra | Bước xác minh và bằng chứng cần xin |
|---|---|---|---|---|
| Quản lý kể trường hợp tuần trước: khách đến trước khi xác nhận; ca làm hỏi các bàn để sắp xếp; quản lý không chắc khách cuối cùng có ngồi được không | Một case được kể, outcome chưa rõ | Stakeholder-reported; chưa đối chiếu | Quản lý có thể giúp định vị case; lễ tân ca đó có thể bổ sung; BA tổng hợp | Xin khoảng ngày/ca hoặc mã đã khử định danh; đối chiếu lịch bàn/trao đổi trong phạm vi được phép; ghi rõ nếu không truy được |
| Quản lý ước lượng “vài lần trong tháng” | Tần suất là estimate, chưa có định nghĩa/denominator | Estimate; chưa đo | Quản lý + người giữ sổ/log | Chốt “sự cố” nghĩa là gì và kỳ đo; xem nguồn có sẵn; không biến “vài lần” thành tỷ lệ |
| Nhân viên kể ca sau đọc tin nhắn và sổ; tin chưa trả lời có thể đã được người ca trước gọi | Cách xác định yêu cầu còn chờ có thể mơ hồ | Stakeholder-reported process; cần xem mẫu | Nhân viên nhiều ca; quản lý xác nhận cách làm | Quan sát bàn giao hoặc xem mẫu tin/sổ đã khử PII; hỏi cách phân biệt chưa gọi/đã gọi/chờ quyết định |
| Nhân viên nói sổ không ghi giờ gọi hay người phụ trách | Thiếu field được báo cáo; chưa xem sổ thực tế | Reported; chưa xác minh artifact | Nhân viên quản lý sổ; owner vận hành | Xin xem biểu mẫu/trang mẫu được phép; ghi version và ngày; hỏi có kênh ghi khác không |
| Sponsor/nhân vật đề xuất “làm app” | App là option, không phải requirement/approval | Proposal; decision còn mở | Sponsor/Product; người phê duyệt scope cần xác định | Xác minh need trước; so sánh no-change, quy trình bàn giao chuẩn hóa, queue/inbox và app; ghi owner cho quyết định |

### Chuyển sang công cụ

- **Excel:** một dòng cho mỗi claim; bật filter theo `classification`, `owner`, `status`; giữ quote/source riêng để truy ngược.
- **FigJam/Miro:** nhóm theme (handoff, trạng thái, capacity, frequency) sau khi ghi nguồn; sticky note không tự biến thành fact.
- **Jira:** nếu có workspace, tạo discovery item cho việc kiểm tra case/log; không tạo issue/key giả trong tài liệu local.
- **Confluence:** chỉ chuyển nội dung thành policy chuẩn khi authority xác nhận; lưu version, decision, evidence và impacted artifacts.

### Cách đóng một dòng register

Không đóng vì đã hỏi xong. Chỉ cập nhật status khi có nguồn/evidence, reviewer, giới hạn dữ liệu và quyết định phù hợp. Nếu không thể lấy log, giữ `Open` và ghi lý do; có thể dùng phỏng vấn/quan sát để hiểu quy trình nhưng không suy ra tần suất định lượng.
## Bài luyện sau ví dụ

Viết lại câu hỏi follow-up về impact bằng lời của bạn. Sau đó phân loại 3 câu sau: (1) “Ca trưởng không thấy tin nhắn”; (2) “Tháng trước có vài lần”; (3) “App sẽ giải quyết được việc này” thành **stakeholder-reported fact / estimate / solution hypothesis**, rồi đề xuất một nguồn xác minh cho mỗi câu. Khi role-play thực tế, thay kết quả ví dụ bằng câu trả lời mà stakeholder đưa ra.

## Từ câu kể sang nhu cầu, requirement và AC

### Câu trả lời của nhân viên — nhánh luyện tập giả lập

**BA:** “Khi bàn giao ca, anh/chị biết yêu cầu nào đang chờ ai xử lý bằng cách nào?”

**Nhân viên:** “Bọn em xem tin nhắn và sổ. Nếu tin nhắn chưa trả lời thì em nghĩ còn chờ, nhưng có khi người ca trước đã gọi khách rồi. Sổ không ghi giờ gọi hay ai phụ trách.”

Đây là lời kể về cách làm; BA cần xem một vài trường hợp và mẫu sổ (nếu được phép), hỏi nhân viên ca khác, làm rõ ý nghĩa của “đã trả lời” và xác nhận hậu quả trước khi coi đây là quy trình phổ biến.

### Phân tầng phân tích

| Tầng | Bản nháp | Trạng thái |
|---|---|---|
| Problem | Khó biết yêu cầu nào đang chờ và ai đang xử lý khi bàn giao ca | Giả thuyết từ lời kể; kiểm tra qua quan sát và mẫu case |
| Need/outcome | Nhân viên ca tiếp theo cần nhận biết yêu cầu chưa xử lý, người phụ trách và bước tiếp theo | Cần xác nhận với nhân viên/manager |
| Solution option | Sổ chuẩn hóa, inbox dùng chung, bảng queue hoặc hệ thống booking | Các phương án để đánh giá; chưa chọn |
| Functional requirement draft | Hệ thống phải cho nhân viên có quyền xem danh sách yêu cầu và trạng thái xử lý; chi tiết lọc, owner, sort cần refinement | Draft, phụ thuộc role/policy |
| Acceptance criteria draft | Với một yêu cầu mới đã được ghi nhận, nhân viên có quyền xem được request, thời điểm nhận, trạng thái và người phụ trách (nếu đã assign) | Cần chốt nguồn thời gian, trạng thái và ý nghĩa chưa assign |

### Vì sao AC trên chưa đủ để Ready?

- “Đã được ghi nhận” do kênh nào tạo, có cho nhập thủ công không?
- Trạng thái hợp lệ gồm gì; ai được đổi; khi đổi có history không?
- Request chưa có người phụ trách hiển thị ra sao và ai phải phân công?
- Nhân viên nào được xem thông tin liên hệ; dữ liệu nào cần che?
- Danh sách có cần cập nhật gần thời gian thực không; nếu có thì target do ai chốt?
- Tìm kiếm/lọc theo ngày, khách, kênh hay trạng thái là nhu cầu đã xác nhận hay suy đoán?

Không nhồi tất cả open question vào một story. Lập discovery task hoặc decision item; story có thể ở trạng thái Draft/Blocked cho tới khi câu hỏi ảnh hưởng acceptance được trả lời.

### Ví dụ traceability

```text
Stakeholder statement (02/11, chị Lan — mô phỏng)
  → Open question OQ-HANDOFF-01: “chưa trả lời” có đồng nghĩa “chưa xử lý” không?
  → Need N-QUEUE-01: nhân viên nhận biết việc còn cần follow-up
  → Functional requirement FR-QUEUE-01 (draft)
  → Story US-QUEUE-01 (sau khi policy/role được xác nhận)
  → AC-QUEUE-01
  → UAT: request mới, đã gọi nhưng chưa cập nhật, đã assign, không có quyền
  → Evidence: kết quả test + người duyệt
```

Ngày/ID/owner ở đây là ví dụ đặt mã. Khi dùng trong bài tập, thay bằng ngày và artifact thực tế của bạn. Requirement cần source, trạng thái, owner và trace tới test; một câu chuyện hay không tự tạo thành evidence.
