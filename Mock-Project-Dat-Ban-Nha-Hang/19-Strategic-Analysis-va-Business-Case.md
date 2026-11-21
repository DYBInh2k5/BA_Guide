# 19 — Strategic Analysis và Business Case

## Mục tiêu

Trước khi hỏi “xây tính năng nào?”, BA cần giúp tổ chức làm rõ vấn đề, kết quả mong muốn, các lựa chọn khả thi và cách đánh giá đầu tư. Business case là lập luận có bằng chứng để người có thẩm quyền quyết định; nó không phải tài liệu quảng bá một giải pháp đã chọn sẵn.

Bài này dùng case nhà hàng giả lập. Chưa có chiến lược, khảo sát, báo giá, ngân sách hay phê duyệt thật. Tất cả trọng số/điểm trong ma trận chỉ để minh họa cách phân tích.

## 1. Từ vấn đề đến mục tiêu chiến lược

**Vấn đề giả định:** dữ liệu đặt bàn phân tán qua điện thoại/mạng xã hội và ghi chép thủ công có thể gây chậm phản hồi, khó điều phối và thiếu khả năng đo kết quả.

**Outcome cần kiểm chứng:** giảm công sức tiếp nhận và tăng độ tin cậy của trạng thái đặt bàn, trong khi khách hiểu rõ yêu cầu đã gửi hay đã được xác nhận.

**Câu hỏi chiến lược trước khi đầu tư:**

- Mục tiêu kinh doanh nào đang bị ảnh hưởng: trải nghiệm khách, năng suất lễ tân, doanh thu/ghế, hay giảm lỗi?
- Vấn đề phổ biến tới mức nào và đang tốn thời gian/tiền ở đâu?
- Có nhóm khách nào không thể/không muốn dùng kênh online?
- Nhà hàng có năng lực vận hành dữ liệu và duy trì cấu hình sức chứa không?
- Có thay đổi mùa vụ, nhân sự hay chính sách nào có thể giải thích vấn đề?

Dùng evidence log: `Claim | Source | Date | Confidence | Gap | How to validate`. Ví dụ: “trùng booking xảy ra thường xuyên” hiện là giả định; nguồn cần có thể là sổ sự cố, đối chiếu booking hoặc quan sát ca làm, không lấy minh họa trong workbook làm bằng chứng.

## 2. Options analysis — xem cả lựa chọn không xây phần mềm

Ma trận dưới đây là điểm minh họa (1 = yếu, 5 = tốt). Công thức: `Tổng điểm = Σ(trọng số × điểm)/100`. Rủi ro/chi phí được chấm theo chiều “mức kiểm soát/khả năng chi trả” để điểm cao luôn tốt.

| Tiêu chí | Trọng số | A: Giữ hiện trạng | B: Chuẩn hóa quy trình + sổ dùng chung | C: Xây MVP đặt bàn online |
|---|---:|---:|---:|---:|
| Tác động tới khách | 30% | 2 | 3 | 5 |
| Khả năng vận hành | 25% | 2 | 3 | 4 |
| Kiểm soát rủi ro | 20% | 1 | 3 | 3 |
| Khả năng chi trả | 15% | 5 | 4 | 2 |
| Tốc độ triển khai | 10% | 5 | 4 | 2 |
| **Tổng điểm minh họa** | **100%** | **2,55** | **3,25** | **3,60** |

**Cách đọc:** C đạt điểm tổng cao nhất theo trọng số giả định này, nhưng chịu điểm thấp hơn về chi phí và tốc độ; B có thể là bước tạm thời hoặc thử nghiệm discovery. Điểm không chứng minh C là lựa chọn đúng. Thay trọng số/điểm theo strategy, evidence, chi phí thật và khả năng thay đổi; ghi lý do cho mỗi điểm. Thêm “must-have constraints” để loại lựa chọn không đáp ứng quy định, khả năng tiếp cận hoặc an toàn dữ liệu dù tổng điểm cao.

### Sensitivity check — trọng số chi phí tăng

Giữ nguyên các điểm minh họa nhưng chuyển 10 điểm trọng số từ **Tác động tới khách** sang **Khả năng chi trả**: trọng số lần lượt thành `20%, 25%, 20%, 25%, 10%`. Khi đó B đạt `3,35`, C đạt `3,30`; thứ hạng đổi từ C sang B. Điều này cho thấy lựa chọn phụ thuộc vào giả định về ưu tiên chi phí. Đây chỉ là phép thử số học trên điểm giả lập, không phải khuyến nghị chọn B; stakeholder phải xác nhận tiêu chí/trọng số và nhóm phải thu thập evidence cho điểm số trước khi dùng ma trận để quyết định.

### Các lựa chọn cần mô tả đồng đều

- **A — Giữ hiện trạng:** không đầu tư hệ thống mới; theo dõi lỗi và chi phí cơ hội.
- **B — Cải thiện quy trình:** thống nhất một sổ/queue, quy tắc xác nhận, phân quyền và checklist ca; chi phí thấp hơn nhưng còn thao tác thủ công.
- **C — MVP số hóa:** form khách, kiểm tra slot, queue nhân viên, trạng thái và email; phụ thuộc cấu hình sức chứa, tích hợp, đào tạo, support và xử lý lỗi.

Mỗi option cần cùng cấu trúc: capability, lợi ích, chi phí, thời gian, rủi ro, phụ thuộc, khả năng đảo ngược và điều kiện dừng.

## 3. Feasibility — đánh giá tính khả thi

| Lăng kính | Câu hỏi cần trả lời | Bằng chứng/owner cần xin |
|---|---|---|
| Strategic | Có phục vụ mục tiêu ưu tiên và đúng nhóm khách? | Sponsor/product: strategy, KPI và ưu tiên quý |
| Operational | Nhân viên có thể vận hành, xử lý ngoại lệ và duy trì dữ liệu? | Quản lý/lễ tân: shadowing, staffing, SOP, training/support |
| Technical | Hệ thống hiện có hỗ trợ capacity, concurrency, email, audit và quyền? | Kỹ thuật: architecture, integration, NFR, security review |
| Economic | Tổng chi phí sở hữu và lợi ích đo được là bao nhiêu? | Finance/vendor: estimate, license, support, phí gửi, thời gian nhân viên |
| Schedule | Có thể làm trong cửa sổ mùa vụ và nguồn lực sẵn có? | Delivery lead: estimate, dependencies, release calendar |
| Legal/privacy/accessibility | Dữ liệu khách xử lý có phù hợp chính sách và trải nghiệm bao trùm? | Privacy/legal/security + người phụ trách accessibility |
| Change readiness | Ai bảo trợ, ai bị ảnh hưởng, mức sẵn sàng và phản đối? | Change owner: stakeholder interview, readiness assessment |

Kết quả ban đầu cho mọi dòng hiện là **Unknown / cần discovery**, không phải “đạt”. Ghi rõ assumption, owner, hạn xác minh và điều gì xảy ra nếu giả định sai.

## 4. Benefits map

| Capability / output | Thay đổi hành vi/quy trình | Outcome | Measure | Điều kiện cần |
|---|---|---|---|---|
| Form online + mã yêu cầu | Khách gửi đúng thông tin, nhân viên không chép lại từ nhiều kênh | Giảm yêu cầu bỏ lỡ; xử lý nhanh hơn | Yêu cầu hợp lệ, thời gian nhận→xử lý, abandon rate | Khách biết kênh; form dễ dùng; event được ghi |
| Slot/capacity validation | Nhân viên và hệ thống dùng chung quy tắc | Giảm xung đột booking | Sự cố trùng / booking; capacity incident | Quy tắc phản ánh bàn thực tế; dữ liệu được cập nhật |
| Queue + trạng thái + audit | Lễ tân triage và ghi quyết định nhất quán | Minh bạch và truy trách nhiệm | SLA, overdue queue, tỷ lệ thiếu trạng thái | Phân quyền, owner queue, đào tạo và adoption |
| Email trạng thái | Khách nhận kết quả sau quyết định | Giảm bất định, ít cuộc gọi hỏi lại | Delivery failure, liên hệ lặp lại | Email đúng; fallback và support được định nghĩa |

Output ≠ outcome: xây form là output; khách gửi yêu cầu đúng và nhân viên xử lý nhanh hơn mới là outcome; giảm thời gian vận hành hoặc tăng khả năng phục vụ là benefit chỉ khi đo được.

## 5. Economic case — khung để điền bằng dữ liệu thật

Không tự bịa tiền tiết kiệm hoặc doanh thu tăng. Thu thập ít nhất:

- **Chi phí một lần:** discovery, thiết kế/phát triển hoặc cấu hình, tích hợp, migration, training, security/legal review.
- **Chi phí lặp lại:** license/hosting, email/SMS, support, bảo trì, giám sát, thay đổi quy trình.
- **Lợi ích tiền tệ có thể đo:** phút nhân viên tiết kiệm × số lượt × chi phí lao động phù hợp; giảm chi phí xử lý sự cố; doanh thu tăng chỉ khi có bằng chứng attribution đáng tin.
- **Lợi ích phi tiền tệ:** khả năng truy vết, giảm bất định, trải nghiệm; định nghĩa proxy/leading indicator thay vì gán giá trị tùy ý.
- **Horizon/discount rate:** do finance/sponsor chốt; ghi rõ thuế, inflation, contingency và chi phí cơ hội theo chuẩn tổ chức.

| Kỳ | Chi phí đầu tư | Chi phí vận hành | Lợi ích tiền tệ đã xác nhận | Net cash flow |
|---|---:|---:|---:|---:|
| T0 | [cần estimate] | — | — | — |
| Tháng 1–12 | [cần estimate] | [cần estimate] | [cần baseline + đo] | [lợi ích − chi phí] |
| Năm 2+ | [nâng cấp] | [cần estimate] | [cần đo] | [lợi ích − chi phí] |

Các phép tính thường dùng khi đủ dữ liệu: `ROI = (tổng lợi ích − tổng chi phí) / tổng chi phí`; `Payback = thời điểm cumulative net cash flow ≥ 0`; `NPV = Σ(net cash flow_t / (1+r)^t)`. Không tính NPV/ROI nếu chưa có horizon, cash flow và discount rate được sponsor/finance thống nhất. Chạy sensitivity cho uptake, chi phí, lợi ích, chậm lịch; ghi kịch bản low/base/high và nguồn từng giả định.

## 6. Recommendation có điều kiện

**Đề xuất cho case study:** không phê duyệt build chỉ dựa trên ma trận giả lập. Trước tiên làm discovery ngắn và đo baseline; đồng thời thử option B để kiểm tra quy tắc/quy trình với mức cam kết thấp. Sau khi sponsor xác nhận vấn đề, kỹ thuật/security xác nhận feasibility, finance có estimate và vận hành có owner, mới quyết định pilot option C với tiêu chí thành công/dừng rõ ràng.

Quyết định cần ghi: approver, ngày, option, rationale/evidence, trade-off được chấp nhận, funding, owner, metric, review date, điều kiện dừng và assumptions còn mở. Bất kỳ điểm nào thay đổi cần cập nhật decision log/change control.

## 7. Bài tập thực hành

1. Chọn 3 bằng chứng bạn cần thu để xác định bài toán đáng đầu tư hay không; ghi nguồn và cách thu.
2. Thay điểm ở ma trận cho phù hợp giả định của bạn; nêu lý do và kiểm tra liệu thứ hạng có đổi khi trọng số chi phí tăng.
3. Tìm một “must-have constraint” có thể loại option C dù tổng điểm cao.
4. Chọn một benefit trong benefits map; viết baseline, công thức, owner, cadence và dữ liệu cần có.
5. Viết recommendation 5 câu gồm vấn đề, lựa chọn, evidence, điều kiện và quyết định cần sponsor đưa ra.

## Đầu ra portfolio

Một business case ngắn gồm executive summary, problem/evidence, options, feasibility, benefits map, total cost of ownership, risk/assumption, sensitivity, recommendation, decision log và kế hoạch đo lường. Gắn nhãn dữ liệu giả lập; để Unknown nơi chưa có bằng chứng thay vì tạo số liệu.

