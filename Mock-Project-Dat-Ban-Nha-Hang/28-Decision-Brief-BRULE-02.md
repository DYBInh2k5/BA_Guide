# 28 — Decision brief: BRULE-02 sức chứa slot

> **Status:** Bản nháp để thảo luận. Đây là case study và dữ liệu giả lập; không phải policy đã duyệt hay kết quả vận hành.

## Quyết định cần có

Business owner cần xác nhận capacity được tính theo đơn vị nào và request `PENDING` có giữ chỗ không. Nếu giữ, cần quyết định thời hạn, giải phóng chỗ và cách xử lý request đến đồng thời. BA điều phối quyết định; không phê duyệt thay business.

## Tóm tắt tình huống mô phỏng

Fixture trong [lab SQL](./Reservation-Capacity-Analysis-Lab.sql) dùng một slot 19:00 với capacity giả lập 16 ghế, buffer walk-in 1 ghế, 9 ghế `CONFIRMED`, 2 ghế trong request `PENDING` cũ, và hai request mới party size 4 và 3 cùng cohort.

| Scenario giả định | Chỗ trước hai request mới | Demand mới | Kết quả tính theo fixture |
|---|---:|---:|---|
| Không tính `PENDING` cũ vào occupancy | 16 − 1 − 9 = 6 | 4 + 3 = 7 | Shortfall mô phỏng 1 ghế |
| Tính `PENDING` cũ vào occupancy | 16 − 1 − 9 − 2 = 4 | 4 + 3 = 7 | Shortfall mô phỏng 3 ghế |

Mỗi request mới riêng lẻ vừa khớp/nhỏ hơn 6 ghế, nhưng cohort tổng là 7. Đây là ví dụ vì sao kiểm tra từng request riêng lẻ không xử lý được cạnh tranh đồng thời. `CAPACITY_CONFLICT_RISK` là kết quả scenario, không phải bằng chứng overbooking thật. Không dùng các số này làm baseline hay SLA.

## Bằng chứng còn thiếu

| Cần xác nhận | Nguồn/owner có thể hỏi | Vì sao cần |
|---|---|---|
| Capacity theo slot và đơn vị ghế/bàn/tổ hợp | Quản lý nhà hàng, operations, người quản lý sơ đồ bàn | Biết giới hạn thực tế và ngoại lệ theo ca/ngày |
| Snapshot hoặc event history của occupancy tại thời điểm nhận | Reservation system owner và operations cho online, điện thoại, tại quầy | Tái dựng chỗ còn lại đúng thời điểm; tránh bỏ sót kênh |
| Policy trạng thái `PENDING`, `CONFIRMED`, `CANCELLED`, `EXPIRED` | Business owner và operations | Xác định lúc nào chỗ được chiếm/giải phóng; timeout có chủ sở hữu |
| Thời gian staff xử lý và request tồn đọng | Operations manager / quản lý ca | Đánh giá tác dụng phụ của việc giữ chỗ và chọn timeout có căn cứ |
| Kết quả không đáp ứng, conflict, complaint | Operations/customer service | Đo hậu quả với mẫu số và nguyên nhân rõ, không coi mọi request chưa confirmed là lost customer |

Xin dữ liệu đã ẩn danh, timezone và định nghĩa trường; xác định khoảng lấy mẫu cùng data owner để bao gồm giờ cao điểm, ngày thường/cuối tuần và kênh liên quan. Nếu không có snapshot lịch sử, ghi hạn chế và không trình bày reconstruction thiếu event như sự thật đầy đủ.

## Các phương án để stakeholder đánh giá

| Phương án | Câu hỏi phải chốt | Rủi ro/đánh đổi |
|---|---|---|
| Không giữ chỗ khi `PENDING` | Khi staff quyết định mà chỗ đã được cấp qua kênh khác, xử lý thế nào? | Ít khóa chỗ tạm nhưng có thể nhận nhiều request không đáp ứng được |
| Giữ chỗ tạm và tự giải phóng sau timeout | Bao lâu; ai nhận queue; khách được báo gì; retry/duplicate có giữ thêm chỗ không? | Giảm tranh chỗ nhưng chậm xử lý có thể khóa capacity; cần lịch sử/audit |
| Chỉ cấp chỗ khi `CONFIRMED` | Staff có công cụ kiểm tra lại capacity nguyên tử trước khi xác nhận không? | Khách có thể chờ lâu; staff cần thấy conflict và phương án thay thế |
| Chỉ nhận request, không khẳng định availability real-time | Thông điệp nào tránh làm khách hiểu `PENDING` là confirmed? | Giảm cam kết capacity tức thời nhưng có thể tăng workload và giảm trải nghiệm |

## Bằng chứng có thể ủng hộ hoặc bác bỏ phương án không giữ chỗ

### Có thể ủng hộ phương án này

- Log đã kiểm tra chất lượng cho thấy request đồng thời cùng slot hiếm và không vượt giới hạn đã duyệt, với mẫu số, thời gian quan sát và tất cả kênh liên quan.
- Operations xác nhận `PENDING` hiện là yêu cầu chờ xét, khách được báo rõ chưa có chỗ được xác nhận, và staff kiểm tra lại capacity trước khi confirm.
- Thời gian xử lý request, tỷ lệ tồn đọng và khoảng thời gian tới giờ đặt đáp ứng service expectation do business owner đặt ra.
- Engineering chứng minh việc confirm kiểm tra/cập nhật capacity nhất quán khi nhiều request cùng tới; QA xác nhận scenario đồng thời không thể xác nhận vượt capacity theo policy.

### Làm phương án này yếu đi

- Có các sự cố được xác minh khi nhiều request cùng slot, khách đã được hứa chỗ rồi bị từ chối, hoặc staff không thể kiểm tra lại capacity trước khi confirm.
- Tỷ lệ request đồng thời cao, thời gian xử lý kéo dài tới sát giờ đặt, hoặc queue tồn khiến khách phải chờ lâu.
- Dữ liệu thiếu kênh điện thoại/tại quầy, thiếu timestamp hoặc không có lịch sử state nên không thể chứng minh tỷ lệ conflict thấp.
- Nội dung UI/email/nhân viên khiến khách hiểu `PENDING` là đã giữ chỗ.

| Evidence | Nguồn có thể xin | Cách đọc đúng |
|---|---|---|
| Request đồng thời và kết quả phục vụ theo slot | Booking/event logs đa kênh, operations incident log | Định nghĩa cohort/window, population và denominator; không suy từ riêng log online |
| Độ trễ từ nhận tới confirm/reject, tuổi queue | Reservation timestamps, staff queue/shift logs | Xem median và percentile cao; phân biệt request chưa được quyết định khỏi request đã kết thúc |
| Kỳ vọng khách và hậu quả conflict | Complaint/support records, customer research, review process | Phân loại nguyên nhân; không coi mọi request `PENDING` là khách bị mất |
| Chốt capacity tại lúc confirm | System events, design review, concurrency scenarios | Engineering/QA xác minh behavior; policy rủi ro do business owner chốt |

Không có sự cố trong log không chứng minh conflict không xảy ra nếu staff không ghi nhận hoặc kênh còn thiếu. Business owner cần đặt ngưỡng tần suất và mức hậu quả chấp nhận được; không tự đặt con số trong brief. Kết quả fixture mô phỏng chỉ giúp hiểu cách scenario thay đổi khi đổi occupancy rule.
## Khuyến nghị của BA cho bước tiếp theo

**Chưa baseline policy capacity.** Trước mắt, phê duyệt action thu thập dữ liệu đa kênh đã ẩn danh và workshop có business owner/operations. Giữ BRULE-02 ở `Draft/TBD`; engineering không nên diễn giải policy `PENDING` từ mock SQL thành rule production. Nếu business muốn tiến hành song song, đánh giá một flow chỉ nhận request và nói rõ đang chờ xác nhận, với acceptance criteria được owner phê duyệt.

Đây là khuyến nghị về thứ tự công việc dựa trên evidence còn thiếu, không phải lựa chọn policy thay stakeholder.

## Quyết định đề nghị ghi vào log

| ID | Nội dung | Owner | Trạng thái hiện tại | Điều kiện để đóng |
|---|---|---|---|---|
| DEC-007 | Capacity tính theo đơn vị nào và `PENDING` có giữ chỗ không? | Business owner — xác minh người cụ thể | Open / TBD | Policy, ngoại lệ, effective date, timeout/release được duyệt và QA xác nhận testable |
| ACT-012 | Xin capacity/occupancy event data đa kênh đã ẩn danh, gồm timestamp và trạng thái | Operations + system owner — xác minh | Open | Data owner xác nhận source, timezone, completeness và khoảng lấy mẫu |
| ACT-013 | Review concurrency, retry, duplicate request và atomic capacity check | Engineering + QA | Open | Thiết kế và test scenario map tới decision đã approved |

## Tác động nếu BRULE-02 được quyết định

Cập nhật đồng bộ các artifact sau khi phê duyệt:

- Rule catalog và decision table trong `26-Business-Rules-va-Decision-Tables.md`.
- BPMN/sequence, API conflict response và data model/SQL occupancy view.
- Acceptance criteria cho request đơn, request đồng thời, timeout, cancellation, retry và audit history.
- UAT, NFR về consistency/availability, vận hành staff queue, support script và metric baseline.
- RTM/impact analysis và decision log/version/effective date.

## Checklist review 5 phút

- [ ] Stakeholder có thẩm quyền xác nhận capacity unit và trạng thái chiếm chỗ.
- [ ] Evidence bao phủ các kênh và có timestamp/timezone phù hợp.
- [ ] “Request đồng thời”, walk-in buffer, cancellation và timeout được định nghĩa.
- [ ] Kết quả scenario không bị kể thành số liệu vận hành thật.
- [ ] Mỗi policy map tới API/process/data/AC/UAT và owner.

