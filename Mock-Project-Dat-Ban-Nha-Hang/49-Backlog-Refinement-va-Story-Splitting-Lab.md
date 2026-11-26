# 49 — Backlog refinement và chẻ User Story

## Mục tiêu

Sau bài này, bạn có thể biến một yêu cầu lớn thành các story nhỏ có giá trị, kiểm tra điều kiện sẵn sàng trước khi đưa vào Sprint, và nhận ra dependency/rủi ro cần làm rõ. Đây là bài mô phỏng trên dự án đặt bàn nhà hàng.

## Tình huống

Sponsor nói: “Làm chức năng đặt bàn online để khách đặt nhanh hơn.” Đây chưa phải backlog item đủ rõ. Cần xác định khách nào, kết quả mong muốn, phạm vi đặt bàn, dữ liệu đầu vào, quy tắc sức chứa, xác nhận và ngoại lệ.

Giả định dùng trong ví dụ: khách chọn ngày, giờ, số người; hệ thống kiểm tra sức chứa; khách cung cấp tên và số điện thoại; yêu cầu được tạo ở trạng thái `PENDING` cho tới khi quy tắc xác nhận tự động hoặc nhân viên xử lý. Đây là giả định học tập, cần xác thực với stakeholder trong dự án thật.

## 1. Tách outcome khỏi giải pháp

**Outcome cần kiểm chứng:** khách hoàn tất yêu cầu đặt bàn với ít thao tác hơn, và nhân viên nhìn thấy yêu cầu mới đủ thông tin để xử lý.

**Câu hỏi trước khi chốt backlog:**

- “Nhanh hơn” so với quy trình nào, đo từ lúc nào đến lúc nào?
- Đặt bàn có được xác nhận ngay hay chỉ là gửi yêu cầu?
- Nhà hàng nhận và xử lý yêu cầu qua hệ thống nào? Ai chịu trách nhiệm?
- Khung giờ, ngày đóng cửa, sức chứa và thời lượng bàn được cấu hình ở đâu?
- Nếu không còn chỗ thì khách có được chọn giờ khác, vào danh sách chờ hay dừng?
- Số điện thoại cần xác minh không? Dữ liệu được lưu và ai được xem?
- Có kênh nào vẫn phải hỗ trợ ngoài web, như điện thoại hoặc walk-in?

## 2. Story map sơ bộ

| Hoạt động | Bước của khách/nhân viên | Story candidate |
|---|---|---|
| Tìm chỗ | Chọn ngày, giờ, số người | Xem các khung giờ có thể gửi yêu cầu |
| Gửi yêu cầu | Nhập tên và số liên hệ | Gửi yêu cầu đặt bàn với thông tin bắt buộc |
| Nhận kết quả | Thấy mã yêu cầu và trạng thái | Nhận thông báo đã tiếp nhận, không nhầm với xác nhận bàn |
| Xử lý | Nhân viên xem yêu cầu mới | Nhân viên xác nhận hoặc từ chối và lưu lý do |
| Theo dõi — candidate, DEC-03 Open | Khách có thể kiểm tra kết quả sau lần gửi | Khách xem trạng thái theo mã/đường dẫn an toàn; chưa được duyệt scope, access method hay dữ liệu hiển thị |

MVP có thể giới hạn ở gửi yêu cầu và xử lý thủ công. Tự động phân bổ bàn, thanh toán đặt cọc, tích hợp CRM hoặc tối ưu bàn là các lựa chọn cần business case riêng, không tự thêm chỉ vì dễ hình dung.

## 3. Ví dụ chẻ story

### Epic

Là khách nhà hàng, tôi muốn gửi yêu cầu đặt bàn trực tuyến để không phải gọi điện trong giờ bận.

### Story A — Kiểm tra khung giờ

Là khách, tôi muốn chọn ngày, giờ và số người để biết khung giờ đó có nhận yêu cầu hay không.

**Acceptance Criteria (Gherkin):**

```gherkin
Given ngày được chọn nằm trong lịch nhận đặt bàn
And số người nằm trong giới hạn được cấu hình
When khách chọn ngày, giờ và số người
Then hệ thống hiển thị kết quả còn khả năng nhận yêu cầu hoặc lý do không nhận
And không hiển thị khung giờ đã đóng
```

### Story B — Gửi yêu cầu

Là khách, tôi muốn gửi tên và số điện thoại cùng lựa chọn đặt bàn để nhà hàng liên hệ/xử lý.

**Acceptance Criteria:**

- Thiếu trường bắt buộc thì không tạo yêu cầu và báo rõ trường cần sửa.
- Khi tạo thành công, hệ thống sinh mã yêu cầu duy nhất và trạng thái ban đầu `PENDING`.
- Màn hình xác nhận nói rõ “đã tiếp nhận yêu cầu”, không nói “đã đặt bàn thành công” nếu nhân viên chưa xác nhận.
- Gửi lại do người dùng bấm nhiều lần không tạo nhiều yêu cầu ngoài dự kiến; cách xử lý kỹ thuật cần phối hợp với đội phát triển và kiểm thử.

### Story C — Xử lý yêu cầu tại nhà hàng

Là nhân viên, tôi muốn xem các yêu cầu mới và xác nhận hoặc từ chối để quản lý công suất.

**Acceptance Criteria:**

- Nhân viên có quyền phù hợp mới được đổi trạng thái.
- Trạng thái và người/thời điểm thay đổi được lưu để truy vết.
- Khi từ chối, phải chọn hoặc nhập lý do theo quy tắc đã thống nhất.
- Khi hai nhân viên xử lý cùng một yêu cầu, hành vi xung đột phải được xác định và kiểm thử.

### Story D — Thông báo kết quả

Là khách, tôi muốn nhận kết quả xử lý để biết yêu cầu đã được xác nhận hay chưa.

Story này phụ thuộc việc chốt kênh thông báo, nội dung, consent và xử lý gửi lỗi. Có thể triển khai sau MVP nếu chưa có kênh được duyệt.

### Áp dụng vào Story “đánh giá khung giờ và sức chứa” trong CSV staging

Work item ID `3` trong [Jira backlog staging](./Jira-Backlog-Import-Staging.csv) đang gộp ba mối quan tâm: giờ hoạt động, capacity theo policy, và invariant khi nhiều request tới cùng lúc. Đây là điểm để refinement xem story có thể tách theo outcome/điều kiện kiểm thử không; chưa sửa file import gốc.

| Candidate slice | Giá trị / hành vi | Điều kiện readiness | Liên kết |
|---|---|---|---|
| CAL-01 — kiểm tra lịch nhận đặt | Khách biết ngày/giờ đã chọn có thuộc lịch nhận đặt không; trường hợp ngoài lịch nhận đặt không đi tiếp như một slot hợp lệ. | Chủ nhà hàng/Operations duyệt giờ mở, ngày nghỉ, timezone và ngoại lệ. | BRULE-01, FR-02; UAT giờ mở/đóng |
| CAP-01 — đánh giá sức chứa theo policy | Request chỉ được tiếp tục nếu capacity khả dụng theo rule đã duyệt đủ cho party size; nếu không đủ thì không tạo reservation. | Owner duyệt đơn vị capacity, nguồn chuẩn, trạng thái nào giữ chỗ, thời điểm giải phóng và kết quả khi thiếu chỗ. | BRULE-02, DEC-01, FR-03; UAT-05 |
| CONC-01 — giữ invariant khi xử lý đồng thời | Tổng request được chấp nhận không vượt capacity đã duyệt khi nhiều thao tác diễn ra cùng lúc. Đây là cross-cutting constraint/acceptance, không tự động thành story hướng người dùng riêng. | Engineering xác định test environment và giải pháp; Product/Operations chốt resource, policy, ưu tiên/conflict outcome; QA xây test concurrency. | BRULE-08, AC-CONC-01; test design chưa chạy |

Story CAL-01 và CAP-01 không nên tách theo UI/API/database layer. Mỗi lát cắt giữ hành vi đầu-cuối đủ để người dùng hoặc vận hành nhận giá trị và nhóm có thể kiểm chứng. CONC-01 có thể được quản lý bằng AC/NFR và technical task theo cách làm của team; giữ trace về CAP-01 và business invariant.

Trong CSV, Task ID `7` “Xác nhận quy tắc sức chứa để refinement C-02” là discovery dependency cho CAP-01. `Parent=1` chỉ đặt Task dưới Epic; sau khi tạo issue key thật, team mới xác nhận có cần link `blocks` từ Task tới CAP-01 hay không. Khi DEC-01 còn Open, CAP-01 chưa Ready và test party size 5 chỉ phân biệt policy giả định; chưa có business expected result để ký UAT.

## 4. Kiểm tra INVEST và độ sẵn sàng

Trước khi đưa story vào Sprint, hỏi:

- **Independent:** Có thể phát triển/test tương đối độc lập không? Nếu có dependency, ghi rõ.
- **Negotiable:** Còn lựa chọn giải pháp hợp lý nào để thảo luận không?
- **Valuable:** Ai nhận được giá trị nào? Có outcome liên kết không?
- **Estimable:** Đội hiểu đủ quy tắc, dữ liệu và tích hợp để ước lượng chưa?
- **Small:** Có thể hoàn tất trong một Sprint theo định nghĩa Done của đội không?
- **Testable:** Có thể chỉ ra bằng chứng pass/fail, bao gồm ngoại lệ không?

Definition of Ready không phải công thức bắt buộc của Scrum. Hãy dùng như checklist làm rõ, không biến thành cửa kiểm duyệt máy móc. Product Owner chịu trách nhiệm quản lý Product Backlog; cả nhóm cộng tác để làm rõ và ước lượng.

## 5. Dependency và câu hỏi mở

| Mục | Loại | Tác động | Người cần xác nhận |
|---|---|---|---|
| Lịch hoạt động/ngày đóng cửa | Quy tắc nghiệp vụ | Có thể nhận sai ngày | Chủ nhà hàng |
| Công suất theo khung giờ | Dữ liệu/quy tắc | Có thể overbook | Quản lý vận hành |
| Trạng thái `PENDING` hay xác nhận tức thì | Quyết định phạm vi | Ảnh hưởng thông điệp và quy trình | Sponsor + vận hành |
| SMS/email hay chỉ trang kết quả | Tích hợp/chi phí | Ảnh hưởng story thông báo | Product Owner + kỹ thuật |
| Thời hạn lưu số điện thoại | Privacy/chính sách | Ảnh hưởng thiết kế và vận hành | Chủ dữ liệu/pháp chế phù hợp |

Không tự trả lời các câu hỏi này bằng giả định kỹ thuật. Ghi owner và ngày cần quyết định; nếu câu trả lời có thể đổi scope/estimate, đánh dấu dependency hoặc risk.

## 6. Bài thực hành của bạn

Không xem lại ví dụ trước khi thử. Từ yêu cầu “thêm đặt cọc để giảm khách không đến”:

1. Viết outcome và ít nhất 5 câu hỏi khám phá.
2. Tạo 3–5 story candidate theo giá trị người dùng; nêu story nào thuộc MVP và vì sao.
3. Viết AC cho một happy path, một validation error và một lỗi tích hợp/thanh toán.
4. Liệt kê dependency, rủi ro, owner quyết định và bằng chứng cần theo dõi sau go-live.
5. Chỉ ra một story quá lớn và chẻ thành hai lát cắt có thể kiểm thử.

## Checklist tự review

- Story mô tả actor, need và outcome, không chỉ tên màn hình/API.
- AC quan sát được và tránh từ mơ hồ như “nhanh”, “thân thiện”, “đúng”.
- Trạng thái `PENDING`, `CONFIRMED`, `REJECTED` được dùng nhất quán với quy trình.
- Không đánh đồng việc gửi yêu cầu với đặt bàn đã xác nhận.
- Assumption, dependency và quyết định có owner được ghi riêng.
- Ưu tiên dựa trên giá trị, rủi ro và khả năng học; không chỉ theo độ dễ làm.

## Bằng chứng portfolio

Lưu story map, backlog có liên kết outcome, AC, dependency và decision log. Gắn nhãn “mô phỏng” cho dữ liệu giả định. Chỉ đưa artifact này vào tracker kỹ năng sau khi bạn tự làm bài thực hành và có review; ví dụ mẫu trong tài liệu không phải bằng chứng năng lực của bạn.
