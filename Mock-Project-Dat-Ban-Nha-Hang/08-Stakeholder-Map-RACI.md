# 08 — Stakeholder Map, RACI & Engagement Plan

> **Bản mẫu giả lập.** Các mức ảnh hưởng và vai trò quyết định dưới đây là giả định để luyện tập; cần xác nhận trong dự án thật.

## Bản đồ trực quan draw.io

Mở [08-Stakeholder-Map.drawio](./08-Stakeholder-Map.drawio) để xem quan hệ giữa nhóm liên quan và thay đổi đề xuất. Hãy lưu bản copy rồi sửa nhãn vai trò, mối quan tâm và đường liên kết theo thông tin bạn thu thập được. Tất cả vai trò hiện tại là giả lập; đường “phê duyệt?” chủ ý để mở.

## Bài học: stakeholder là ai?
Stakeholder là cá nhân/nhóm có thể ảnh hưởng, bị ảnh hưởng, sử dụng, vận hành, phê duyệt hoặc chịu rủi ro từ thay đổi. Đừng chỉ liệt kê người đặt yêu cầu: người trực tiếp làm quy trình và người dùng cuối thường nắm các ngoại lệ quan trọng.

## Stakeholder register mẫu

| Vai trò | Mối quan tâm cần xác minh | Ảnh hưởng dự kiến | Cách tham gia | Câu hỏi BA |
|---|---|---:|---|---|
| Chủ nhà hàng | Mục tiêu kinh doanh, chính sách, chi phí | Cao | Phỏng vấn; chốt mục tiêu và quyết định nghiệp vụ | Kết quả nào khiến anh/chị xem thay đổi là thành công? |
| Quản lý ca | Sức chứa, quy tắc giờ cao điểm, ngoại lệ | Cao | Workshop; xác nhận To-Be và quy tắc vận hành | Khi gần kín chỗ, anh/chị quyết định nhận/từ chối thế nào? |
| Lễ tân | Tốc độ thao tác, dữ liệu cần thấy, xử lý đổi/hủy | Trung bình-cao | Quan sát; phỏng vấn; prototype review; UAT | Hãy hướng dẫn tôi xử lý một yêu cầu từ đầu đến cuối. |
| Khách hàng | Dễ đặt, hiểu trạng thái, quyền riêng tư | Trung bình | Phỏng vấn/khảo sát; usability review | Điều gì khiến anh/chị tin rằng chỗ đã được xác nhận? |
| Dev/QA (khi xác định team) | Quy tắc đủ rõ để xây và kiểm thử | Cao về giải pháp | Refinement; review AC, data, API, NFR | Trường hợp biên nào còn thiếu để triển khai/test? |
| Người phụ trách dữ liệu/tài khoản (cần xác định) | Truy cập, lưu trữ, phân quyền | Cần xác nhận | Phỏng vấn ngắn; review quyền và chính sách | Ai được xem/sửa thông tin khách và lưu trong bao lâu? |

Không gán tên người hoặc quyền phê duyệt khi chưa hỏi. Ghi tên thật, kênh liên lạc, quyền quyết định và mức sẵn sàng khi đã xác minh.

## Power–Interest grid mẫu

|  | Quan tâm cao | Quan tâm thấp/chưa rõ |
|---|---|---|
| **Ảnh hưởng cao** | Chủ nhà hàng, quản lý ca — làm việc sát, xác nhận quyết định và trade-off | Người phê duyệt kỹ thuật/dữ liệu nếu có — giữ cập nhật, xác minh vai trò |
| **Ảnh hưởng thấp/vừa** | Lễ tân và khách — tham gia khám phá, review và nghiệm thu | Nhóm ít bị ảnh hưởng — theo dõi khi phạm vi thay đổi |

Đây là công cụ chọn cách tương tác, không phải cách xếp hạng giá trị ý kiến. Một stakeholder ít quyền chính thức vẫn có thông tin thiết yếu về công việc hằng ngày.

## RACI mẫu

- **R — Responsible:** trực tiếp thực hiện.
- **A — Accountable:** chịu trách nhiệm cuối cùng/chốt quyết định. Mỗi hoạt động nên có một A rõ ràng.
- **C — Consulted:** tham vấn hai chiều.
- **I — Informed:** được cập nhật.

| Hoạt động | BA | Chủ nhà hàng | Quản lý ca | Lễ tân | Dev/QA |
|---|---:|---:|---:|---:|---:|
| Xác định vấn đề và mục tiêu | R | A | C | C | I |
| Khảo sát quy trình hiện tại | R | I | C | C | I |
| Chốt chính sách đặt bàn | C | A | R | C | I |
| Đề xuất phương án giải pháp | R | A | C | C | C |
| Viết và quản lý yêu cầu | R | A | C | C | C |
| Thiết kế/triển khai giải pháp | C | I | C | C | R/A theo mô hình team cần xác nhận |
| Nghiệm thu nghiệp vụ | R | A | C | R/C | C |

RACI này là bản nháp. BA thường tổ chức phân tích và đề xuất, nhưng chủ nghiệp vụ mới phê duyệt chính sách/giá trị. Quyền duyệt kỹ thuật cần được team xác nhận riêng.

## Engagement plan mẫu

| Nhóm | Phương pháp | Khi nào | Đầu ra |
|---|---|---|---|
| Chủ nhà hàng | Phỏng vấn 30–45 phút | Khởi động, chốt mục tiêu, quyết định trade-off | Mục tiêu, constraints, decision log |
| Quản lý ca + lễ tân | Quan sát ca làm và workshop | Trước khi vẽ As-Is/To-Be | Quy trình, ngoại lệ, pain points |
| Khách hàng | 5 phỏng vấn khám phá ngắn, sau đó usability test | Sau khi có flow/prototype đầu tiên | Nhu cầu, ngôn ngữ, vấn đề usability |
| Dev/QA | Refinement và review ví dụ | Trước khi đưa story vào sprint | Open questions, AC kiểm thử được, dependency |

## Bài tập thực hành
1. Chọn một vai trò trong register và thêm 3 câu hỏi chỉ dành cho vai trò đó.
2. Ai nên được hỏi về chính sách “giữ bàn 15 phút”? Ai có quyền phê duyệt chính sách này? Có thể là hai vai trò khác nhau.
3. Sửa một ô trong RACI nếu bạn thấy có hai người cùng là A hoặc chưa có người A.
4. Nêu một stakeholder có thể đang bị bỏ sót và cách xác minh họ có liên quan.

## Checklist BA
- Đã phân biệt người đề xuất, người sử dụng, người vận hành và người phê duyệt.
- Mức ảnh hưởng/quan tâm có lý do, chưa gán theo chức danh một cách máy móc.
- Có cách tiếp cận phù hợp cho mỗi nhóm.
- Quyết định và quyền sign-off được xác nhận, không suy đoán.
- Stakeholder ít quyền vẫn có cơ hội đóng góp.
