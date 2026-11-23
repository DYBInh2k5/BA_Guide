# 09 — Mô hình hóa quy trình bằng BPMN 2.0

## Đáp án mẫu: chính sách giữ bàn 15 phút

**Hỏi ai để hiểu vận hành?**
- Lễ tân: hiện xử lý thế nào khi khách đến trễ, báo trễ, đổi giờ hoặc không liên lạc được?
- Quản lý ca: ảnh hưởng của việc giữ bàn đến sức chứa, khách chờ và ca tiếp theo là gì? Có ngoại lệ nào?
- Có thể hỏi khách: họ hiểu “giữ bàn 15 phút” ra sao và mong nhận thông báo nào?

**Ai phê duyệt chính sách?**
- Có thể là chủ nhà hàng hoặc người được ủy quyền. BA cần xác minh quyền quyết định, không suy đoán theo chức danh.
- Lễ tân/manager cung cấp thông tin vận hành; người có thẩm quyền chốt quy tắc. Nếu thẩm quyền được giao cho quản lý ca, ghi nhận việc ủy quyền.

**Bằng chứng cần xin:** chính sách hiện tại nếu có, ví dụ đặt bàn gần đây, số khách đến trễ/no-show và cách nhà hàng xử lý. “15 phút” hiện chỉ là tình huống luyện tập, chưa phải yêu cầu đã xác nhận.

## BPMN là gì?
BPMN là ký pháp chuẩn để mô tả quy trình nghiệp vụ. Trong draw.io, BPMN 2.0 dùng pools/lanes để thể hiện tổ chức và vai trò, activities cho công việc, events cho sự kiện, gateways cho nhánh quyết định, cùng connectors cho thứ tự hoặc trao đổi thông điệp. Dùng đúng hình giúp người nghiệp vụ và đội delivery đọc cùng một mô hình.

## Các ký hiệu cần nắm trước

| Ký hiệu | Ý nghĩa | Cách đặt tên/ví dụ |
|---|---|---|
| Pool | Một participant/tổ chức trong collaboration | Khách hàng; Nhà hàng |
| Lane | Vai trò/đơn vị thực hiện trong pool | Lễ tân; Quản lý ca |
| Start event | Sự kiện bắt đầu quy trình | Yêu cầu đặt bàn đến |
| Task/activity | Công việc do một vai trò thực hiện | Ghi yêu cầu vào sổ |
| Exclusive gateway (XOR) | Chỉ chọn một nhánh theo điều kiện | Cần quản lý quyết định? — Có/Không |
| End event | Kết thúc một nhánh/quy trình | Khách được phản hồi |
| Sequence flow | Thứ tự thực hiện bên trong một pool | Nét liền, có mũi tên |
| Message flow | Thông điệp đi giữa hai pool | Nét đứt; ví dụ khách gửi yêu cầu |

BPMN có nhiều loại event và gateway hơn bảng này. Bài đầu chỉ dùng start/end, task, XOR và hai loại flow; thêm ký hiệu khi quy trình thực sự cần chúng.

## Bài thực hành: vẽ As-Is trong draw.io

Dùng nội dung giả lập trong [ví dụ phỏng vấn 07](./07-Minh-hoa-Phong-van-va-Phan-tich.md). Sơ đồ hiện tại lấy từ kịch bản này, không phải quy trình thực tế đã xác minh. [Role-play 32](./32-Stakeholder-Interview-Roleplay.md) là một kịch bản khác: trong đó ownership/handoff còn mở. Không gộp lời kể của hai scenario thành một As-Is duy nhất.

### Cấu trúc đề xuất

- **Pool 1: Khách hàng** — gửi yêu cầu; chờ phản hồi; đến nhà hàng.
- **Pool 2: Nhà hàng**, có lanes **Lễ tân** và **Quản lý ca**.
- Trong lane Lễ tân: nhận yêu cầu; ghi vào sổ; kiểm tra sổ; phản hồi khách.
- Trong scenario bài 07, có thể giữ XOR gateway “Cần quản lý ca hỗ trợ?” như nhánh do chủ nhà hàng báo cáo, nhưng gắn chú thích `Reported in mock interview 07; condition not verified`. Tiêu chí rẽ nhánh vẫn là open question. Nếu dùng dữ liệu bài 32, dừng luồng ở điểm ownership chưa rõ và không thêm gateway này.
- Nhánh Có đi qua task “Hỏi quản lý ca”, rồi quay lại bước phản hồi.
- Nhánh tin nhắn ngoài giờ: khi sang ca sau thì đọc tin; ghi chú “thời gian xử lý cần xác minh”.
- Vẽ message flow giữa pool Khách hàng và Nhà hàng; sequence flow chỉ đi bên trong từng pool.
- Thêm data object cho sổ giấy và file Excel nếu cần cho người đọc thấy thông tin được lưu ở đâu.

### Đưa lời kể trong role-play vào mô hình mà không bịa quy trình

Từ [role-play phỏng vấn](./32-Stakeholder-Interview-Roleplay.md), có lời kể giả lập rằng nhân viên ghi tin nhắn vào sổ, nghĩ ca trưởng sẽ xác nhận, và có một trường hợp khách đến trước khi trạng thái rõ. Chỉ dùng nó để luyện cách chuyển lời kể thành mô hình; không coi là As-Is đã khảo sát.

**Có thể mô hình hóa tạm:**

```text
Message start event: yêu cầu đến
  → Task (Lễ tân): đọc tin nhắn
  → Task (Lễ tân): ghi yêu cầu vào sổ
  → Open point: ai nhận ownership và ai xác nhận?
  → [cần quan sát/phỏng vấn thêm trước khi vẽ sequence tiếp theo]
```

- Gắn annotation cạnh task “Ghi yêu cầu vào sổ”: “Stakeholder kể trong role-play; chưa quan sát sổ thật”.
- Gắn annotation cạnh open point: “Chưa xác định đây là handoff chính thức hay kỳ vọng cá nhân”.
- Không vẽ sequence flow “Lễ tân bàn giao cho ca trưởng” khi chưa có bằng chứng rằng bàn giao thực sự diễn ra.
- Không dùng gateway “Khách đã được xác nhận?” nếu chưa làm rõ ai kiểm tra trạng thái, điều kiện rẽ nhánh và thông điệp gửi khách.
- Nếu khảo sát thật xác nhận handoff, cập nhật model version, source/interview ID, owner và ngày xác nhận; sau đó mới thêm lane/task/flow.

Mô hình BPMN diễn đạt quy trình đã hiểu; text annotation ghi nguồn và khoảng trống. Nếu chưa có luồng đủ chắc, partial process + open question đáng tin hơn một sơ đồ đầy đủ nhưng tự suy diễn.

### Thao tác trên draw.io
1. Mở [app.diagrams.net](https://app.diagrams.net/) và tạo sơ đồ mới.
2. Bật thư viện BPMN 2.0 trong danh sách shape libraries; nếu cần, bắt đầu bằng mẫu swimlane để dựng lanes.
3. Đặt hai pools, thêm các lanes cần thiết, rồi kéo event/task/gateway vào đúng vai trò.
4. Nối sequence flow trong mỗi pool; dùng message flow để thể hiện trao đổi giữa Khách hàng và Nhà hàng.
5. Đặt nhãn Có/Không trên nhánh gateway, dùng tên task bắt đầu bằng động từ, rồi sắp xếp flow từ trái sang phải.
6. Lưu file dưới tên `09-Reservation-As-Is.drawio` trong thư mục dự án.

Trong draw.io, swimlane thể hiện trách nhiệm; BPMN thêm ký hiệu chuẩn cho task/event/gateway. Sequence flow không băng qua ranh giới pool; giao tiếp giữa hai pool dùng message flow. Mermaid/FigJam flowchart hiện có giúp hiểu luồng, nhưng chưa phải BPMN notation đầy đủ.

## Review checklist
- Mỗi activity nằm trong lane của vai trò thực hiện.
- Gateway là câu hỏi/quyết định có các nhánh loại trừ rõ ràng.
- Nhánh gateway được gắn nhãn, thường là Có/Không hoặc điều kiện cụ thể.
- Không nối sequence flow từ pool này sang pool kia.
- Có start event và kết thúc phù hợp với phạm vi quy trình.
- Mọi bước chưa xác minh được đánh dấu open question/assumption.
- Sơ đồ chỉ giữ các bước cần để trả lời mục tiêu phân tích; không vẽ mọi thao tác nhỏ.

## Guided review: mở sơ đồ mẫu và đọc như một BA

Mở `09-Reservation-As-Is.drawio` trong diagrams.net. Đây là draft do trợ lý tạo từ tình huống phỏng vấn giả lập; chưa phải quy trình được khảo sát ngoài đời.

### Những điểm sơ đồ đang thể hiện
- Hai pool là **Khách hàng** và **Nhà hàng**; trong pool Nhà hàng có lane **Lễ tân** và **Quản lý ca**.
- Sequence flow nối hoạt động trong từng pool; message flow nét đứt biểu diễn yêu cầu và kết quả trao đổi qua ranh giới hai pool.
- Với nguồn bài 07, sơ đồ giữ lời kể rằng lễ tân đôi khi hỏi quản lý ca. Gateway XOR “Cần quản lý hỗ trợ?” là nhánh reported để luyện đọc ký pháp; tiêu chí Có/Không chưa xác minh. Kịch bản bài 32 không xác nhận handoff này.

### Những điều chưa nên kết luận từ sơ đồ
- Không có luồng chi tiết cho tin nhắn Facebook được ghi vào Excel cuối ca. Lời kể chỉ nói việc này *có thể* xảy ra; cần hỏi ai làm, khi nào, mọi yêu cầu hay chỉ một số trường hợp.
- Chưa mô hình hóa đầy đủ các ngoại lệ như hết chỗ, khách đổi giờ, hủy hoặc đến trễ.
- Điều kiện gateway “Cần quản lý hỗ trợ?” chưa được xác minh. Hãy hỏi nhân viên điều kiện nào kích hoạt, ai quyết định và có ngoại lệ gì; không mô tả gateway như business rule đã được duyệt.

### Bài lab sửa draft
1. Mở sơ đồ và giữ nguyên bản gốc; lưu bản sao có hậu tố `-practice`.
2. Thêm annotation cạnh quy trình Facebook/Excel ghi rõ `Reported in mock interview — verify owner/timing` trước khi thêm hoạt động vào flow.
3. Thêm ba câu hỏi mở bên ngoài luồng: ai cập nhật Excel, bước đó xảy ra lúc nào, và hệ thống/sổ nào được nhân viên tin là nguồn chuẩn khi có lệch.
4. Chỉ thêm activity/gateway vào BPMN sau khi câu trả lời đủ rõ; nối sequence flow bên trong pool, message flow giữa hai pool.
5. Lưu ảnh hoặc file bản luyện. Khi review, giải thích một quyết định mô hình hóa, một điểm chưa biết và nguồn cần xác minh.

Không cần hoàn thiện quy trình bằng cách đoán. Một draft có open point rõ ràng giúp stakeholder xác nhận tốt hơn một sơ đồ trông đầy đủ nhưng tự thêm bước.

## Bài tập của bạn
Tạo sơ đồ `09-Reservation-As-Is.drawio` rồi gửi ảnh chụp hoặc mô tả các pools, lanes, gateway và message flows. Mình sẽ review tính đúng notation, tính đầy đủ và những chỗ đang biến giả định thành fact.

### Tài liệu tham khảo chính thức
- [BPMN 2.0 diagrams in draw.io](https://www.drawio.com/docs/diagram-types/bpmn-2-0/)
- [Swimlane diagrams in draw.io](https://www.drawio.com/docs/diagram-types/swimlane-diagrams/)
