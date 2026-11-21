# 25 — Root Cause Analysis và Problem Validation

## Mục tiêu

Từ triệu chứng đi tới nguyên nhân có bằng chứng, sau đó mới chọn giải pháp. Root cause analysis (RCA) không phải tìm một người để quy lỗi hay ép đúng 5 câu “Why”; mục tiêu là xác định các điều kiện trong quy trình, dữ liệu, công cụ, policy và môi trường góp phần tạo ra kết quả không mong muốn.

Tất cả ví dụ bên dưới dựa trên **interview scenario giả lập**. Chưa có sự cố nhà hàng thật được kiểm chứng. Fishbone chỉnh sửa được: [25-Reservation-Fishbone.drawio](./25-Reservation-Fishbone.drawio).

## 1. Định nghĩa vấn đề có thể điều tra

Không bắt đầu bằng “nhân viên nhập sai” hoặc “cần website”. Hãy viết:

> Trong [quy trình/kênh/nhóm/thời gian], [đối tượng] gặp [event mô tả quan sát được] ở mức [tần suất/mức ảnh hưởng đã xác minh], ảnh hưởng [outcome]. Nguồn hiện có là [nguồn + confidence]; còn thiếu [gap].

**Ví dụ tạm:** “Trong tình huống phỏng vấn giả lập, chủ nhà hàng kể rằng có hai lần trong tháng sổ và file Excel không khớp, khiến hai nhóm được hứa cùng một bàn. Chưa có ngày/số booking/tài liệu đối chiếu; xem đây là reported symptom, chưa xác minh tần suất hay cause.”

## 2. Fishbone / Cause-and-Effect — tạo giả thuyết đa chiều

Dùng 5M+E hoặc các nhóm phù hợp dịch vụ số; không cần nhét mọi nhánh nếu không liên quan.

| Nhánh | Hypothesis có thể khảo sát | Evidence phân biệt |
|---|---|---|
| People / workload | Nhân viên bị ngắt quãng, thiếu handover hoặc chưa được hướng dẫn | Quan sát ca, lịch phân ca, hỏi nhân viên nhiều kinh nghiệm/ca khác |
| Process / policy | Không rõ nguồn nào là bản chuẩn; bước đồng bộ/đổi/hủy không có owner | SOP, event timeline, walk-through có case thật |
| Data / information | Thiếu mã booking chung, timestamp/định dạng tên-ngày không nhất quán | Đối chiếu từng record, duplicate key, update history |
| Technology / tooling | Sổ và Excel không chia sẻ cập nhật tức thời; notification bị bỏ sót | Kiểm tra phiên bản/file access, inbox timestamp, audit log |
| Environment / demand | Peak hour, noise, mất mạng hoặc khách đổi giờ làm tăng tải | Phân đoạn sự cố theo thời gian, channel và lượng request |
| Governance / incentives | KPI ưu tiên tốc độ trả lời hơn độ chính xác; không có quy tắc quyết định | Phỏng vấn người đặt mục tiêu, xem scorecard/decision rights |

Các nhánh là câu hỏi điều tra, không phải kết luận. Tìm bằng chứng có thể **bác bỏ** mỗi giả thuyết, không chỉ bằng chứng ủng hộ.

## 3. Ví dụ 5 Whys có kỷ luật

**Sự kiện cần xác minh:** một bàn bị hứa cho hai nhóm trong scenario.

1. **Vì sao hai nhóm nhận cùng cam kết?** Có thể hai người dùng hai trạng thái/copy khác nhau khi trả lời. *Chưa xác minh; cần timeline của lần sự cố.*
2. **Vì sao trạng thái có thể khác?** Có thể một nguồn được cập nhật muộn hoặc thông tin đổi/hủy chưa truyền qua. *Đối chiếu sổ, Excel, message, timestamp và actor.*
3. **Vì sao update chưa truyền?** Có thể file chỉ được tổng hợp cuối ca, thiếu ID chung, hoặc có rule xử lý ngoài giờ khác nhau. *Test từng khả năng với workflow thực tế.*
4. **Vì sao quy trình cho phép lệch?** Có thể thiếu canonical booking record, owner đồng bộ hoặc phân quyền/hand-off rõ. *Xem SOP, công cụ và RACI.*
5. **Vì sao chưa có kiểm soát phù hợp?** Có thể quy trình phát triển theo kênh rời rạc hoặc không có monitoring/feedback loop. *Hỏi người thiết kế quy trình và tìm decision history.*

**Không được kết luận:** “nguyên nhân gốc là nhân viên cẩu thả” hoặc “cần xây app” chỉ từ chuỗi trên. Có thể nhiều cause cùng góp phần; 5 Whys sinh giả thuyết, evidence mới giúp kiểm chứng quan hệ nhân quả.

## 4. Kế hoạch kiểm chứng cause

| Giả thuyết | Evidence cần thu | Cách lấy / sample | Điều sẽ ủng hộ | Điều sẽ bác bỏ / giới hạn |
|---|---|---|---|---|
| Excel cập nhật chậm gây lệch | Timestamp inbox, sổ, file, booking outcome | Chọn một số incident gần nhất và đối chiếu timeline | Có khoảng trễ trước cam kết thứ hai | Không chứng minh sự cố không có nguyên nhân khác |
| Nhiều nguồn record gây duplicate | Booking ID, khách/giờ/bàn, cancel/update history | Reconcile nguồn theo ngày/ca | Hai record cùng intent nhưng khác nguồn/trạng thái | Trùng nội dung chưa chắc là cùng booking; cần rule dedup |
| Peak workload làm tăng lỗi | Volume theo giờ, staffing, interruption, incidents | Quan sát nhiều ca thường/peak, so sánh nhóm tương đương | Incident rate tăng theo tải sau khi chuẩn hóa exposure | Tương quan không chứng minh cause; staffing có thể đổi đồng thời |
| Policy/ownership chưa rõ | SOP, handoff, quyền quyết, interview nhiều role | Walkthrough cùng lễ tân/quản lý/owner | Role khác mô tả khác nhau, không có step/system of record | Chỉ chứng minh ambiguity nếu kịch bản được hỏi trung tính |

### Nguyên tắc lấy mẫu

- Định nghĩa đơn vị: reservation, request, conflict incident, hay customer contact?
- Chọn kỳ đủ bao gồm ngày thường/peak; nêu mẫu nào được chọn và mẫu nào thiếu.
- Che/giảm dữ liệu cá nhân không cần cho RCA; tuân chính sách nội bộ.
- Ghi source, timestamp, version, người giải thích và độ tin cậy.
- Kiểm tra denominator: số incident / số booking hoặc / số slot, không chỉ đếm complaint thô.

## 5. Từ nguyên nhân tới intervention

Chỉ sau khi cause được support, tạo options tương ứng:

| Cause đã được evidence ủng hộ | Option có thể thử | Rủi ro/metric cần xem |
|---|---|---|
| Handover thiếu owner | Checklist và owner mỗi ca; thử 2 tuần | Thời gian thao tác, missed updates |
| Dữ liệu rời rạc | Một bảng/queue chuẩn có ID và audit | Access/privacy, adoption, conflicting edits |
| Peak-load backlog | Quy tắc triage, staffing adjustment hoặc waitlist | Customer experience, cost, capacity accuracy |
| Khách khó hiểu trạng thái | Copy/prototype/test thông điệp `PENDING` vs confirmed | Comprehension, calls asking for status |
| Không có cập nhật tức thời | Thử workflow/công cụ shared; chỉ sau feasibility mới chọn build/buy | Total cost, reliability, support, adoption |

Một giải pháp có thể giải quyết symptom nhưng không giải quyết cause; hoặc làm tăng một metric nhưng làm xấu outcome khác. Đo trước/sau theo cùng định nghĩa và ghi yếu tố gây nhiễu.

## 6. Mini A3 / root-cause worksheet

1. **Context & goal:** outcome nào cần cải thiện, owner nào xác nhận?
2. **Current condition:** process/segment/time window; evidence và confidence.
3. **Problem statement:** event, impact, baseline; không chèn giải pháp.
4. **Cause hypotheses:** fishbone/5 Whys, mỗi giả thuyết có evidence test và disconfirming test.
5. **Validated cause(s):** source, scope, causal confidence, limitation.
6. **Options:** process, policy, training, configure, buy/build; expected side effect.
7. **Experiment/measure:** owner, period, denominator, target, stop rule.
8. **Decision & follow-up:** approver, date, action, traceability và lesson.

## Công cụ thực hành

- **FigJam:** fishbone/workshop; stickies cần gắn nhãn “fact / hypothesis / question” và owner.
- **draw.io:** cause-effect map, sequence hiện trạng và control point.
- **Excel/SQL:** incident log, frequency/segment, denominator, reconcile source/time; tránh suy luận từ sample nhỏ.
- **Jira/Confluence/Markdown:** mỗi hypothesis/action có owner/status/evidence; decision log nối tới requirement/change.
- **Postman/API logs:** chỉ dùng khi technical event logs có correlation ID và quyền truy cập phù hợp; API log không thay tiếng nói người dùng.

## Bài tập

Dựa trên [phỏng vấn giả lập](./07-Minh-hoa-Phong-van-va-Phan-tich.md):
1. Viết lại sự cố hai nhóm cùng được hứa bàn, phân biệt reported symptom với verified fact.
2. Nêu ba cause hypotheses ở ba nhánh khác nhau.
3. Với từng giả thuyết, nêu một evidence có thể ủng hộ và một evidence có thể bác bỏ.
4. Chọn sample/timeline và stakeholder cần hỏi; bảo vệ denominator.
5. Đề xuất một can thiệp chi phí thấp để học nhanh, nhưng chưa cam kết build website.

## Đáp án tham khảo để đối chiếu

Ba giả thuyết bên dưới là **cách thiết kế điều tra**, chưa phải kết quả điều tra.

| Nhánh / giả thuyết | Evidence có thể ủng hộ | Evidence có thể bác bỏ | Nguồn và cách so sánh |
|---|---|---|---|
| **Data:** không có ID booking chung nên cùng yêu cầu bị ghi thành hai trạng thái khó đối chiếu | Hai record có cùng ngày/giờ/khách nhưng không có key chung; timestamp cho thấy update ở một nguồn không đi sang nguồn kia trước lời hứa thứ hai | Cả hai nguồn có ID và lịch sử update nhất quán trước hai cam kết; cause có thể nằm ở capacity hoặc quyền quyết định | Mẫu incident đã xác minh; so booking ID, timestamp, state history và update actor |
| **Process:** cập nhật Excel cuối ca làm trạng thái booking bị stale | Timeline cho thấy một cam kết được đưa ra sau khi có thay đổi nhưng trước khi bản Excel được cập nhật; hướng dẫn ca xác nhận bước sync cuối ca | Cả hai cam kết diễn ra sau lần cập nhật chuẩn, cùng trạng thái hiển thị; độ trễ sync không giải thích được case | Sổ, file/version history, inbox và walk-through với lễ tân/manager theo đúng incident |
| **Environment:** peak workload/interruptions làm tăng khả năng bỏ sót hoặc cam kết trùng | Tỷ lệ incident trên 100 request/slot ở peak cao hơn nhóm so sánh sau khi phân đoạn theo kênh và staffing; quan sát ghi nhận interruption liên quan | Tỷ lệ chuẩn hóa tương đương/thấp hơn peak, hoặc incidents tập trung ở điều kiện không peak; workload chưa giải thích case | Booking/request volume, lịch ca, time window, incident log và quan sát nhiều ca; correlation chưa chứng minh cause |

**Denominator:** không so raw incident count giữa peak và off-peak nếu lượng request khác nhau. Chọn đơn vị phù hợp (ví dụ incidents trên 100 booking requests hoặc trên 100 slot offers), định nghĩa incident duy nhất để tránh đếm hai lần, rồi phân đoạn theo channel/time/staffing. Mẫu nhỏ phải báo rõ uncertainty; không kết luận chỉ từ một incident.

**Stakeholder/evidence plan:** hỏi lễ tân xử lý event, quản lý xác nhận capacity/authority và handover, người quản lý file/inbox giải thích timestamp/version. Quan sát cả ca thường và peak theo permission; chỉ dùng data tối thiểu cần thiết, che thông tin khách trước khi đưa vào workbook/portfolio.

**Can thiệp học nhanh:** nếu source review ủng hộ lỗi handover nhưng chưa đủ để build, thử một booking ID chuẩn cùng checklist “đã ghi vào source of truth” ở một ca trong thời gian được manager đồng ý. Đặt baseline và theo dõi missed/conflict per request, effort/booking và workaround; đặt stop rule nếu thao tác làm chậm phục vụ hoặc tạo lỗi mới. Đây là đề xuất thử nghiệm, chưa phải quyết định triển khai.
## Bằng chứng portfolio

Lưu problem statement có source/confidence, cause map, evidence plan, một kết luận cause có giới hạn (hoặc ghi “chưa đủ evidence”), options và outcome measure. Thể hiện một giả thuyết đã bị bác bỏ nếu có; đó cũng là kết quả phân tích có giá trị.


