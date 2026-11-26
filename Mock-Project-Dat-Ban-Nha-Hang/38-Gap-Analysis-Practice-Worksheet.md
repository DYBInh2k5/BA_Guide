# 38 — Worksheet thực hành Gap Analysis → To-Be → kiểm chứng

## Kết quả cần đạt

Tự phân tích một gap từ thông tin nguồn đến một đề xuất có thể review: ghi rõ điều gì đã biết/chưa biết, so sánh giải pháp, và trace thay đổi được chọn tới requirement cùng cách kiểm chứng. Đây là bài tập trên scenario hư cấu, không phải kết quả khảo sát nhà hàng thật.

## Hồ sơ đầu vào

Đọc các nguồn sau trước khi điền:

- [As-Is BPMN lesson](./09-BPMN-Modeling-Lesson.md)
- [Role-play stakeholder](./32-Stakeholder-Interview-Roleplay.md)
- [Gap Analysis và To-Be](./10-Gap-Analysis-va-To-Be.md)
- [Backlog và AC](./03-Requirements-Backlog.md)
- [Bài bridge system context → BPMN](./37-Context-to-BPMN-Bridge-Lab.md)

Trong worksheet này, `RP-01` là **mã tham chiếu cục bộ do bài tập gán** cho nhánh role-play “Ví dụ có hướng dẫn — tác động và xác nhận” và “Từ câu kể sang nhu cầu, requirement và AC” trong file `32-Stakeholder-Interview-Roleplay.md`. Đây không phải mã phỏng vấn thật hay nguồn khảo sát độc lập.

Trong role-play giả lập, có lời kể về việc đọc tin nhắn, ghi request vào sổ và một khách tới khi trạng thái chưa rõ. Chưa có dữ liệu để định lượng tần suất, chưa xác nhận handoff sang ca trưởng, và chưa biết policy chính thức. Dùng mã nguồn giả lập `RP-01`; nếu hồ sơ nguồn không có câu trả lời, ghi `Open`, không tự điền thành fact.

### Áp dụng riêng cho scenario chat “hai nhóm lúc 19:30”

Đây là scenario giả lập riêng trong cuộc hội thoại, **không thuộc `RP-01`** ở bài 32. Nếu dùng scenario này, đặt mã nguồn cục bộ `CHAT-DB-01` để tránh nối nhầm lời kể hoặc evidence giữa hai case.

Thông tin khởi đầu duy nhất: trong role-play, chị Lan nhớ có hai nhóm cùng đến lúc 19:30 và cả hai nói họ đã đặt; chị không chắc về kênh/chi tiết và chưa đối chiếu hồ sơ. Đây là `Reported` trong mô phỏng, không phải incident đã xác minh ngoài đời.

| Trường | Điểm xuất phát cho CHAT-DB-01 |
|---|---|
| Phát biểu vấn đề, chưa nêu giải pháp | Cần làm rõ lời quản lý nhớ về việc hai nhóm nói họ đã đặt so với cách nhà hàng ghi nhận/xác nhận request; chưa đủ dữ liệu để kết luận nguyên nhân |
| Source ID | `CHAT-DB-01` — role-play chat, lời nhớ lại của quản lý giả lập |
| Nhãn | `Reported — simulated, unverified` |
| Điều chưa biết quan trọng | “Trùng bàn” nghĩa là gì trong sự việc; mỗi nhóm nhận thông báo nào; có record/reference nào để đối chiếu không |
| Bằng chứng cần thu | Hồ sơ hai request đã khử định danh, lịch sử trạng thái và nội dung phản hồi nếu tồn tại/được phép xem; lời kể nhân viên ca đó |
| Người/vai trò cần hỏi | Quản lý về case/date và quyền truy cập; nhân viên về cách nhận/xử lý; người duyệt quy tắc chỉ sau khi xác định được vai trò |

Xem [Data request map trong bài 12](./12-Data-Modeling-SQL-API.md) để nối từng hypothesis với trường có thể cần và giới hạn schema hiện tại. Đây là kế hoạch thu thập, không khẳng định những trường/log đó đang tồn tại.

Giữ các khả năng H-01 same-table overlap, H-02 aggregate capacity và H-03 duplicate submission thành các hypothesis riêng. Q-01 về nội dung xác nhận là open question, chưa phải hypothesis nguyên nhân. Chưa điền solution/To-Be như đã chọn; trước tiên xác định claim nào có thể đối chiếu và source nào phù hợp.

| Hypothesis | Evidence có thể ủng hộ | Evidence có thể làm hypothesis yếu đi / bác bỏ trong case này |
|---|---|---|
| H-01: Hai booking được gán cùng một bàn trong khoảng thời gian chồng lấn | Hai lịch sử booking đã khử định danh cùng trỏ tới một table ID, với thời gian dùng bị overlap | Hồ sơ cho thấy bàn khác nhau, không có bàn cụ thể nào được gán, hoặc thời lượng không chồng lấn; chỉ áp dụng nếu hệ thống/nhà hàng lưu các trường đó |
| H-02: Tổng khách vượt capacity của slot | Tổng demand cùng slot cao hơn capacity theo rule có thẩm quyền và cùng version/effective date | Theo policy đã duyệt, tổng demand không vượt capacity; nếu chưa có policy hoặc dữ liệu occupancy đáng tin cậy thì kết quả vẫn `Unknown`, không được gọi là đã bác bỏ |
| H-03: Một thao tác gửi lại tạo hai request | Hai record gắn cùng correlation/reference context hoặc payload/time pattern phù hợp với retry; cần dữ liệu đã khử định danh và log có quyền truy cập | Hai record có nguồn/khách độc lập và không có liên hệ retry; hai nhóm cùng nói đã đặt, tự nó không ủng hộ giả thuyết một người gửi lặp |
| Q-01: Khách hiểu “đã nhận request” là “đã xác nhận bàn” | Thông điệp chỉ nói đã nhận nhưng người nhận nói họ hiểu là đã có bàn | Nội dung xác nhận phân biệt rõ pending với confirmed và người nhận xác nhận đã hiểu; lời kể hoặc nội dung gửi đi một mình chưa chứng minh người nhận đã đọc/hiểu |

Evidence chưa có, thiếu quyền truy cập hoặc không ghi đúng thời điểm phải giữ `Unknown`. Không dùng một kết quả thiếu dữ liệu để xác nhận/bác bỏ hypothesis; ghi chính xác phạm vi và giới hạn của từng nguồn.

### Decision brief checkpoint — CHAT-DB-01

Trước khi điền options ở Phần B, viết brief ngắn để phân biệt **quyết định cần xin** với **giải pháp đã chọn**:

| Trường | Bản nháp hiện tại |
|---|---|
| Quyết định cần có | Có đủ evidence để phân loại sự cố 19:30 không? Nếu chưa, cần xác minh gì trước khi cân nhắc thay đổi? |
| Evidence hiện có | Lời nhớ lại giả lập của quản lý rằng hai nhóm cùng đến và nói họ đã đặt; hồ sơ chưa được đối chiếu |
| Unknown quan trọng | Định nghĩa “trùng bàn”; nội dung mỗi nhóm nhận; trạng thái/booking records; quy trình nhân viên đã thực hiện |
| Hành động đề xuất có điều kiện | Xin quyền xem record đã khử định danh và hỏi nhân viên ca đó; sau đó cập nhật hypothesis, chưa cam kết đầu tư công cụ |
| Decision authority | Chưa xác định; cần hỏi ai phê duyệt quy tắc nghiệp vụ và scope thay đổi |
| Điều làm khuyến nghị đổi hướng | Evidence phân loại incident vào failure mode khác, hoặc authority cung cấp policy/ràng buộc mới |

Đây là decision brief discovery cho scenario giả lập, không phải quyết định vận hành. Không chấm điểm hoặc xếp hạng option trước khi stakeholder thống nhất tiêu chí và các input cần thiết. Sau khi điền Phần A, cập nhật lại brief bằng source/evidence mới; nếu chưa có dữ liệu, giữ nguyên `Unknown`.

Luyện chuyển câu hỏi này thành công việc trong backlog tại [CSV staging — Task ID 8](./Jira-Backlog-Import-Staging.csv). Đây là discovery task để thu thập/đánh giá evidence, chưa phải Jira issue, story triển khai hay quyết định được duyệt.

## Phần A — Evidence trước, solution sau

Điền cho **một** pain point. Không bắt đầu bằng “cần làm app”.

| Trường | Bản tự điền |
|---|---|
| Phát biểu vấn đề, không nêu giải pháp |  |
| Source ID / câu nào trong nguồn hỗ trợ |  |
| Nhãn: reported / observed / measured / inferred / open |  |
| Ai bị ảnh hưởng và trong tình huống nào |  |
| Tác động có thể có (chưa kết luận nếu thiếu data) |  |
| Điều chưa biết quan trọng nhất |  |
| Bằng chứng cần thu tiếp |  |
| Người/vai trò cần cung cấp hoặc xác nhận |  |

### Phân biệt nguyên nhân và triệu chứng

Viết ba hypothesis khác nhau cho cùng vấn đề. Chẳng hạn, trạng thái không rõ *có thể* liên quan tới không có record tập trung, handoff không rõ, hoặc thông điệp xác nhận gây hiểu lầm. Đây là hypothesis, không phải kết luận. Với từng hypothesis, nêu bằng chứng có thể bác bỏ nó.

| Hypothesis (có thể sai) | Evidence phân biệt | Quan sát/phỏng vấn ai hoặc nguồn nào |
|---|---|---|
| H1 |  |  |
| H2 |  |  |
| H3 |  |  |

## Phần B — So sánh options

Tạo tối thiểu ba option, gồm “giữ quy trình và cải thiện hướng dẫn/ownership” hoặc “không thay đổi ngay” làm baseline. Chỉ sau đó mới thêm công cụ/phần mềm như một option.

| Option | Giá trị kỳ vọng | Chi phí/thay đổi vận hành | Rủi ro/tác dụng phụ | Điều cần kiểm chứng trước quyết định |
|---|---|---|---|---|
| A — Giữ hiện trạng có đo/clarify ownership |  |  |  |  |
| B — Chuẩn hóa biểu mẫu/handoff |  |  |  |  |
| C — Queue tập trung / option số hóa |  |  |  |  |

Chọn recommendation **có điều kiện**: ghi tiêu chí để chọn, người có quyền quyết định (vai trò cần xác minh), và điều kiện khiến bạn đổi recommendation. Không chấm điểm option bằng con số tùy ý nếu chưa thống nhất trọng số/ước lượng.

## Phần C — Mô tả To-Be dưới dạng giả thuyết

Chọn một lát cắt nhỏ, ví dụ “nhân viên tìm được request đang chờ và thấy trạng thái rõ”. Viết flow tương lai ở mức nghiệp vụ, chưa tự chọn kiến trúc:

```text
Trigger → Actor thực hiện → Decision/rule cần áp dụng → Outcome
       → Exception → Ai xử lý exception → Evidence ghi nhận
```

Đánh dấu từng câu là `Proposed`, `Assumption` hoặc `Decision needed`. Nếu chưa biết owner hay điều kiện gateway, để open question thay vì vẽ như đã được duyệt.

## Phần D — Trace một thay đổi tới kiểm thử

Hoàn thành một hàng cho thay đổi được đề xuất:

| Need / pain point | To-Be change | Requirement/Story ID | Business rule/open dependency | Acceptance criterion | Test case/evidence |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

AC cần quan sát được, ví dụ: “Given request hợp lệ ở trạng thái `PENDING` và nhân viên có quyền, when tìm bằng reference, then đúng request và trạng thái hiện tại được hiển thị; không trả record ngoài quyền.” Đây chỉ là ví dụ cấu trúc, cần kiểm tra lại với backlog/policy trước khi dùng.

Test case phải chỉ rõ setup, dữ liệu giả lập, thao tác, expected result và nơi lấy evidence. Không đánh dấu Pass nếu chưa chạy; policy chưa duyệt thì đánh dấu Blocked/Open, không tự giả lập kết quả như sự thật.

### Ví dụ có hướng dẫn — vertical slice có điều kiện

Ví dụ này nối `DISC-03` và `DISC-04` từ role-play sang một lát cắt nhỏ. Đây là **draft giả lập do tài liệu chuẩn bị**, không phải quan sát nhà hàng, quyết định chọn option B, policy đã duyệt, hay bằng chứng năng lực của người học. Chỉ dùng nếu người có thẩm quyền chọn phương án chuẩn hóa handoff; nếu không, giữ các dòng dưới ở trạng thái đề xuất.

**Need giả thuyết:** nhân viên ca sau cần nhận ra yêu cầu nào chưa được xử lý và biết bước tiếp theo. Cần xác minh qua mẫu sổ/tin nhắn và hỏi nhân viên ở nhiều ca; lời kể hiện tại chưa chứng minh mọi ca đều gặp vấn đề.

**To-Be giả thuyết:** khi bàn giao, người phụ trách ghi một mã tham chiếu không chứa PII, trạng thái hiện tại, lần cập nhật gần nhất và hành động tiếp theo; ca sau tra cứu và xác nhận nhận bàn giao. Chưa xác định danh sách trạng thái, thời hạn, quyền sửa, kênh lưu hay người phê duyệt.

| Need / pain point | To-Be change | Requirement/Story ID | Business rule/open dependency | Acceptance criterion (draft) | Test case/evidence (chưa chạy) |
|---|---|---|---|---|---|
| DISC-03: trạng thái xử lý giữa hai ca có thể khó nhận diện; DISC-04: sổ thiếu giờ/người phụ trách theo lời kể | Đề xuất ghi nhận và bàn giao thông tin xử lý tối thiểu | `US-HO-01` (ID cục bộ cho ví dụ) | Chủ quy trình phải xác nhận trạng thái, trường bắt buộc, quyền xem/sửa và cách xử lý khi chưa có người nhận | Given một mục bàn giao hợp lệ có mã tham chiếu, trạng thái và người phụ trách, when nhân viên ca sau mở mục đó, then họ thấy trạng thái và hành động tiếp theo đã ghi; nếu thiếu trường bắt buộc thì mục được báo là chưa đủ thông tin. Quy tắc “hợp lệ” và quyền truy cập cần được xác nhận trước khi chốt AC. | Setup: tạo 2 bản ghi dữ liệu tổng hợp, một đủ trường và một thiếu trạng thái; không dùng PII thật. Thao tác: nhân viên ca sau mở từng mục. Expected: bản đủ hiển thị thông tin bàn giao; bản thiếu được nhận diện là chưa đủ. Evidence: ảnh chụp màn hình đã khử định danh và log kết quả. **Blocked/Open** cho đến khi chọn công cụ, duyệt policy và xác nhận role/field; chưa chạy nên không có Pass. |

**Câu hỏi refinement:** “Ai được phép đổi trạng thái?”, “Khi nào một yêu cầu được xem là đã xử lý?”, “Nếu ca sau chưa nhận bàn giao thì ai theo dõi?”, “Thông tin nào được phép lưu và trong bao lâu?”. Trả lời bằng nguồn và authority; không tự điền quy tắc vào story.

## Review rubric (12 điểm)

| Tiêu chí | Điểm |
|---|---:|
| Problem statement có nguồn/nhãn evidence, chưa nhảy tới solution | 0–2 |
| Tách symptom khỏi ít nhất ba nguyên nhân giả thuyết | 0–2 |
| Có evidence có thể bác bỏ hypothesis và owner cần hỏi | 0–2 |
| So sánh baseline và ít nhất hai option theo trade-off | 0–2 |
| To-Be ghi trạng thái đề xuất/giả định/open, không giả làm quyết định | 0–2 |
| Trace tới AC/test có expected result và evidence source | 0–2 |

Checkpoint: **9/12 trở lên**, không có lỗi nghiêm trọng như đổi assumption thành fact hoặc ghi test Pass khi chưa chạy. Reviewer có thể yêu cầu sửa dù đạt tổng điểm nếu traceability đứt.

## Evidence portfolio

Lưu worksheet đã điền cùng version của sơ đồ liên quan. Ghi scenario giả lập, ngày/version, nguồn đã dùng, giới hạn dữ liệu và feedback nhận được. Phần portfolio nên giải thích một trade-off và một điều bạn đổi sau review; không viết như kết quả dự án khách hàng.

## Nộp để được đánh giá

Gửi worksheet đã điền hoặc paste các phần A–D. Reviewer sẽ chỉ ra: unsupported claims, câu hỏi elicitation tiếp theo, điểm traceability bị đứt và một đề xuất sửa cụ thể. Cho tới khi có bài tự làm, năng lực của người học vẫn ở trạng thái `Chưa đánh giá`.
