# 50 — Ưu tiên backlog bằng quyết định có căn cứ

## Mục tiêu

Thực hành xếp ưu tiên mà không giả vờ rằng một con số chính xác hơn evidence. Kết quả của lab là danh sách quyết định, dependency và lý do có thể trình bày với Product Owner/stakeholder; không phải “thứ tự khách quan” do công thức tự sinh.

## Brief mô phỏng

Nhóm chuẩn bị MVP đặt bàn nhà hàng. Có các đề xuất:

| ID | Đề xuất | Người nêu | Điều đã biết trong case |
|---|---|---|---|
| C-01 | Cho khách gửi yêu cầu đặt bàn trên web | Sponsor | Giải quyết mục tiêu giảm phụ thuộc cuộc gọi, nhưng chưa có baseline đo thời gian |
| C-02 | Hiển thị khung giờ còn có thể nhận yêu cầu | Vận hành | Phụ thuộc lịch hoạt động và quy tắc sức chứa chưa được chủ nhà hàng xác nhận |
| C-03 | Nhân viên xem, xác nhận hoặc từ chối yêu cầu | Vận hành | Có trạng thái mô phỏng `PENDING`, chưa xác định quyền và SLA xử lý |
| C-04 | Gửi SMS kết quả cho khách | Marketing | Chưa chốt nhà cung cấp, consent, chi phí và nội dung |
| C-05 | Thu tiền đặt cọc | Sponsor | Chưa có chính sách hủy/hoàn tiền, payment provider hoặc bằng chứng rằng đặt cọc xử lý vấn đề |

Tất cả nội dung ở bảng này là **giả định học tập**. Không coi đây là dữ liệu khách hàng hay quyết định đã được phê duyệt.

## 1. Tách “quan trọng” thành câu hỏi kiểm chứng được

Với mỗi đề xuất, hỏi:

1. Ai gặp vấn đề, trong tình huống nào?
2. Tác động hiện tại là gì? Có log, quan sát, số liệu hay chỉ là ý kiến?
3. Giá trị mong đợi là gì và đo bằng chỉ số nào? Có baseline không?
4. Điều gì bắt buộc do chính sách, pháp lý, an toàn hoặc cam kết đã ký?
5. Có dependency, rủi ro vận hành, privacy, tích hợp hoặc quyết định chưa có owner không?
6. Nếu trì hoãn, điều gì cụ thể xảy ra? Ai chấp nhận hậu quả?

Không dùng “sếp yêu cầu” như một lý do đủ để biết priority; đó là tín hiệu về người đề xuất và quyền quyết định, cần làm rõ mục tiêu và approval.

## 2. Dùng MoSCoW như cách đàm phán phạm vi

- **Must have:** thiếu thì release không đạt mục tiêu hoặc vi phạm điều kiện đã thống nhất.
- **Should have:** giá trị cao, có thể có workaround chấp nhận được trong ngắn hạn.
- **Could have:** hữu ích khi còn năng lực, nhưng trì hoãn ít gây hại.
- **Won’t have this time:** chủ động loại khỏi release hiện tại; ghi lý do và thời điểm xem xét lại nếu cần.

MoSCoW phân loại scope cho một mốc/release cụ thể. Nó không thay thế discovery, không tự xếp hạng các item cùng nhóm và không biến một ý kiến thành quyết định đã được duyệt.

### Thảo luận sơ bộ trên case

- C-01 có thể là ứng viên **Must** nếu mục tiêu MVP được xác nhận là nhận yêu cầu trực tuyến.
- C-02 và C-03 có thể là phần cần thiết để luồng hoạt động an toàn, nhưng trước hết phải chốt quy tắc và quy trình.
- C-04 có thể là **Should/Could** nếu trang trạng thái hoặc quy trình gọi lại là workaround đủ tốt; cần kiểm chứng với khách và vận hành.
- C-05 chưa đủ thông tin để cam kết vào release: chính sách hoàn/hủy và bằng chứng tác động còn thiếu. Có thể giữ trong discovery thay vì tuyên bố giá trị chắc chắn.

Đây là giả thuyết phân loại, không phải kế hoạch release cuối cùng.

## 3. Xếp thứ tự trong nhóm ưu tiên

Sau khi chốt scope và điều kiện bắt buộc, xếp thứ tự dựa trên:

- **Value:** outcome và stakeholder nào hưởng lợi.
- **Risk reduction / learning:** item nào giảm rủi ro hoặc giúp kiểm chứng giả thuyết sớm.
- **Dependency:** item nào cần đi trước để item khác có thể làm/test.
- **Cost of delay:** hậu quả cụ thể của chờ thêm; tránh gắn nhãn “khẩn” nếu chưa có deadline hoặc tác động.
- **Effort / uncertainty:** độ lớn chỉ có ý nghĩa tương đối trong cùng nhóm làm việc; yêu cầu chưa rõ nên chuyển thành discovery/spike thay vì giả định effort nhỏ.

Ưu tiên là quyết định có ngữ cảnh và được cập nhật khi có evidence mới. BA chuẩn bị phân tích, nêu trade-off và ghi lại quyết định; Product Owner/người có thẩm quyền quyết định priority trong governance của dự án.

## 4. Bản ghi quyết định để đưa vào Jira/ClickUp/Trello

| Trường | Cần ghi |
|---|---|
| Item / link | ID và đường dẫn tới epic/story/requirement |
| Release / target | Mốc mà priority có ý nghĩa |
| Priority và rationale | Mức ưu tiên + outcome/risk/deadline cụ thể |
| Evidence | Nguồn, thời điểm, owner, chất lượng evidence |
| Dependency | Item hoặc quyết định phải có trước; người phụ trách |
| Assumption / open question | Điều chưa được xác nhận, ngày cần phản hồi |
| Decision owner | Người có quyền chấp nhận trade-off |
| Review trigger | Evidence hoặc mốc nào khiến ta phải xếp lại |

Jira connector site đã kết nối nhưng chưa có project học tập được cấp quyền; ClickUp chưa có workspace được cấp. Có thể làm lab bằng bảng Markdown/Excel. Khi có destination được phép, tạo Epic/Story, link dependency và ghi rationale/decision link theo cấu hình team. Không tạo issue vào project/list chưa được chọn cho bài tập.

## 5. Thực hành

Tự làm trước khi đọc bảng gợi ý:

1. Chọn release giả định “MVP nhận và xử lý yêu cầu đặt bàn trực tuyến”.
2. Phân loại C-01 đến C-05 theo MoSCoW; ghi rationale một câu cho từng item.
3. Vẽ dependency bằng mũi tên. Phân biệt dependency thực với thứ tự do thói quen.
4. Chỉ ra 3 quyết định còn thiếu, mỗi quyết định có owner và ngày cần chốt.
5. Nêu evidence nào có thể làm C-04 hoặc C-05 tăng/giảm ưu tiên.
6. Viết lại thứ tự backlog sau khi giả định C-02 được xác nhận, nhưng SMS provider chưa sẵn sàng.

## Gợi ý tự kiểm tra

- Có nói rõ release/context của MoSCoW không?
- Có một lý do cụ thể cho mỗi Must không? Nếu mọi thứ đều Must, scope chưa được đàm phán.
- Dependency có owner và tác động tới đường đi tới MVP không?
- Câu “không có evidence” có được ghi rõ, thay vì trình bày giả định như fact không?
- Có thể giải thích vì sao item đứng trước và evidence nào sẽ làm đổi quyết định không?
- Có phân biệt priority với severity/urgency của defect, và priority với effort không?

## Bằng chứng portfolio

Lưu bảng ưu tiên theo release, dependency map, decision log và phiên bản trước/sau khi cập nhật evidence. Ghi nguồn và giả định. Bài mô phỏng không chứng minh kết quả kinh doanh; tracker năng lực chỉ nên cập nhật sau khi người học tự làm, giải thích và nhận review.
