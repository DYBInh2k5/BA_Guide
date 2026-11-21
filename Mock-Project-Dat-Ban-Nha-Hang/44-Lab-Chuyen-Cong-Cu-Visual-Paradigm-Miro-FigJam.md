# 44 — Lab chuyển công cụ: Visual Paradigm, draw.io và Miro/FigJam

## Mục tiêu

Bài này luyện khả năng giữ nguyên ý nghĩa nghiệp vụ khi chuyển artifact giữa công cụ. Bạn sẽ dựng một UML Use Case Diagram bằng draw.io và Visual Paradigm (nếu đã cài/được cấp quyền), rồi điều phối cùng một workshop trên Miro hoặc FigJam. Năng lực được đánh giá qua notation, cấu trúc, quyết định và khả năng giải thích; không phải số lượng nút bấm đã nhớ.

## Lab 1 — Cùng một Use Case trên draw.io và Visual Paradigm

### Brief cố định

Dùng chức năng tiếp nhận yêu cầu đặt bàn giả lập. Khách gửi yêu cầu; hệ thống kiểm tra dữ liệu và khả năng tiếp nhận theo policy chưa được xác minh; yêu cầu có trạng thái chờ xử lý; nhân viên được phân quyền xem queue và quyết định xác nhận/từ chối. Email thông báo là tích hợp ngoài, nhưng kết quả gửi có thể lỗi. Chưa biết ai là authority duyệt policy capacity, vai trò nhân viên cụ thể, hay email provider.

### Việc cần làm

1. Mở bản mẫu [Use Case Diagram](./39-Reservation-Use-Case.drawio) và ghi lại phiên bản/tên file; tạo bản copy trong `outputs/tool-transfer/<ngay>/`.
2. Trong draw.io, tạo/điều chỉnh diagram với system boundary, actor ngoài boundary, use case theo động từ + mục tiêu, và association có lý do. Ghi `TBD` cho role/policy chưa xác minh; đừng biến email lỗi thành use case actor mới nếu chưa có mục tiêu actor rõ.
3. Nếu có Visual Paradigm, tạo diagram tương đương bằng UML Use Case Diagram. Không cần khớp pixel; cần khớp actor, boundary, mục tiêu, quan hệ và unknowns.
4. Nếu chưa có Visual Paradigm, ghi blocker (license/install/access) và nộp bản draw.io cùng checklist tự review. Không tuyên bố đã thành thạo Visual Paradigm.
5. Xuất PNG/PDF từ cả hai bản có thể tạo; đối chiếu bằng bảng dưới đây.

| Điều cần đối chiếu | draw.io | Visual Paradigm | Ý nghĩa nghiệp vụ có đổi không? |
|---|---|---|---|
| Actors và quyền/role còn mở |  |  |  |
| System boundary |  |  |  |
| Use case names (verb + goal) |  |  |  |
| Association/include/extend nếu dùng |  |  |  |
| Unknowns và nguồn/owner |  |  |  |
| Export/version có mở và đọc được |  |  |  |

**Câu hỏi review:** Có association nào được thêm chỉ vì công cụ gợi ý? Actor có nằm ngoài boundary? Use case có phải mục tiêu người dùng hay chỉ là bước xử lý nội bộ? Export có giữ được nội dung và phiên bản không?

## Lab 2 — Workshop Miro/FigJam: từ sticky note tới quyết định

Dùng cùng một brief trong Lab 1. Nếu Miro chưa kết nối, thực hiện trên FigJam; cấu trúc workshop và kỹ năng facilitation chuyển giao được. Đừng giả định Miro và FigJam có cùng mọi tính năng.

### Khung board

Tạo các khu vực theo thứ tự:

1. **Mục tiêu / câu hỏi quyết định:** “Cần xác minh gì trước khi chọn thông báo khách?”
2. **Evidence:** chỉ ghi bằng chứng có nguồn; nếu hiện chưa có thì ghi “chưa thu thập”.
3. **Reported / assumption / unknown:** mỗi sticky có một nhãn, nguồn hoặc owner.
4. **Options:** cập nhật trạng thái trong giao diện; thông báo email sau khi trạng thái tin cậy; pilot thủ công đo nhu cầu.
5. **Rủi ro / phụ thuộc:** capacity policy, contact preference/consent, provider, lỗi/timeout, vận hành hỗ trợ.
6. **Decision log:** quyết định, người có quyền quyết, ngày, lý do/evidence, điều kiện xem xét lại.
7. **Action items:** người phụ trách, đầu ra, hạn và trạng thái.

### Kịch bản facilitation 20 phút

- 2 phút: nêu mục tiêu, phạm vi và quyền quyết định.
- 5 phút: silent brainstorm; mỗi sticky một ý, không thảo luận giải pháp ngay.
- 4 phút: nhóm ý; giữ lại nguồn, gộp ý trùng có ghi chú.
- 4 phút: đánh dấu evidence vs assumption vs unknown; không vote để biến giả định thành sự thật.
- 3 phút: so sánh options theo must-have và rủi ro; vote chỉ dùng để thấy quan điểm, không thay người có thẩm quyền.
- 2 phút: đọc lại quyết định, action, owner và open question.

### Evidence để review

- Link/file board hoặc ảnh export đã loại dữ liệu cá nhân.
- Ảnh/ghi chú trước và sau khi nhóm ý.
- Một decision log entry có approver hoặc ghi rõ “chưa quyết định”.
- Ba action items có owner và đầu ra quan sát được.
- Reflection 5 câu: điều gì là evidence; chỗ nào còn bất đồng; ai có quyền quyết; vote đã giúp gì/chưa giúp gì; lần sau bạn sẽ đổi cách facilitation nào?

## Bài nộp portfolio

```text
Ngày / version:
Công cụ thực sự đã dùng:
Link/file draw.io:
Link/file Visual Paradigm hoặc blocker cụ thể:
Link board Miro/FigJam:
Một điểm notation hoặc ý nghĩa đã thay đổi khi chuyển tool:
Một quyết định và authority:
Evidence / unknown còn lại:
Điều tôi tự làm, điều AI/trợ lý hỗ trợ:
```

Chỉ ghi tên tool vào CV khi bạn đã tự thao tác artifact, mở lại được, giải thích lựa chọn và nêu giới hạn. Có file mẫu trong workspace không phải bằng chứng bạn đã sử dụng tool.
