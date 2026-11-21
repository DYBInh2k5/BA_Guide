# 40 — Gap Analysis có hướng dẫn: từ evidence đến kiểm thử

> **Giới hạn case:** Đây là ví dụ học tập hư cấu, dựa trên role-play `RP-01` trong module 32. Không có nhà hàng hay stakeholder thật được khảo sát. Mọi requirement dưới đây là draft để luyện traceability, không phải quyết định đã được duyệt.

## 1. Gap Analysis trả lời câu hỏi gì?

Gap không đồng nghĩa “chưa có phần mềm”. Gap là khác biệt giữa **khả năng hiện tại đã có bằng chứng** và **outcome cần đạt đã được làm rõ**. Nếu hiện trạng, outcome hoặc mức chênh lệch còn mơ hồ, hãy ghi open question thay vì tạo ra một gap giả chắc chắn.

```text
Nguồn → claim và mức tin cậy → outcome/need → gap cần kiểm chứng
      → nhiều options → quyết định có điều kiện → To-Be draft
      → requirement → acceptance criteria → test/evidence
```

Phân biệt các nhãn:

| Nhãn | Ý nghĩa | Ví dụ trong case |
|---|---|---|
| Reported | Ai đó kể lại; chưa kiểm tra độc lập | Chị Lan kể khách tới trước khi trạng thái được làm rõ |
| Observed | BA trực tiếp quan sát sự kiện/quy trình | Chưa có trong hồ sơ này |
| Measured | Có dữ liệu và định nghĩa đo rõ | Chưa có tỷ lệ bỏ sót hoặc thời gian xử lý đã đo |
| Inferred | Nhận định của BA từ thông tin hiện có | Handoff có thể là một điểm cần kiểm tra |
| Open | Chưa biết hoặc bằng chứng còn thiếu | Kết quả phục vụ khách hôm đó; quy trình bàn giao chính thức |

Không nâng lời kể thành quan sát, không biến một ví dụ thành tần suất, và không suy từ pain point sang một phần mềm cụ thể.

## 2. Ví dụ phần A — Evidence trước

| Trường | Bản nháp có chú thích |
|---|---|
| Problem statement | Trong một trường hợp được kể lại, khách đến khi trạng thái yêu cầu đặt bàn chưa rõ; nhân viên phải kiểm tra khả năng sắp xếp. Đây là sự kiện được kể trong role-play, chưa biết tần suất hoặc outcome cuối cùng. |
| Source | `RP-01`, module 32, nhánh “Ví dụ có hướng dẫn — tác động và xác nhận”. |
| Evidence label | `Reported` cho trường hợp khách đến và nhân viên kiểm tra; `Open` cho kết quả phục vụ, tần suất, và nguyên nhân. |
| Ai / tình huống | Khách và nhân viên trong tình huống chuyển từ yêu cầu đặt bàn sang lúc khách tới; danh tính/vai trò cụ thể ngoài mô tả role-play chưa được xác minh. |
| Tác động có thể có | Có thể tốn thời gian kiểm tra hoặc ảnh hưởng trải nghiệm; chưa có bằng chứng để khẳng định khách bị từ chối, mất doanh thu hay nhân viên làm sai. |
| Điều chưa biết | Khách nhận thông điệp gì? Ai xử lý yêu cầu? Có bàn giao ca không? Khách cuối cùng được phục vụ không? Một trường hợp như vậy xảy ra bao nhiêu lần trong khoảng thời gian định nghĩa? |
| Evidence tiếp theo | Nếu được phép, đối chiếu tin nhắn đã khử thông tin nhận dạng, record/sổ tương ứng, timestamp và trao đổi ca; lấy nhiều trường hợp gồm cả trường hợp xử lý bình thường để tránh chỉ chọn sự cố. |
| Vai trò cần xác nhận | Người kể lại case, nhân viên ở ca liên quan, người quản lý quy trình; xác định owner thật trong buổi elicitation thay vì tự gán tên. |

**Vì sao câu trên là problem statement tốt hơn “cần làm app”?** Nó nói điều gì được kể, ai có thể bị ảnh hưởng và đâu là giới hạn bằng chứng; chưa gài solution vào định nghĩa vấn đề.

## 3. Ba giả thuyết nguyên nhân — và cách bác bỏ

| Giả thuyết có thể sai | Bằng chứng phân biệt / có thể bác bỏ | Nguồn và câu hỏi tiếp theo |
|---|---|---|
| H1 — Yêu cầu từ các kênh không được ghi vào một nơi mà ca sau có thể tìm | Bị suy yếu nếu mẫu đại diện cho thấy mọi kênh đều có record dùng chung, đầy đủ và ca sau truy cập được | Lấy mẫu tin nhắn và sổ/record trong một khoảng thời gian thống nhất; hỏi nhân viên các ca khác cách tìm một yêu cầu cụ thể |
| H2 — Bàn giao không làm rõ trạng thái hoặc người cần follow-up | Bị suy yếu nếu quan sát và log cho thấy mỗi case pending có người tiếp nhận, thời điểm, trạng thái, và xác nhận bàn giao rõ | Quan sát một lần đổi ca; đối chiếu lịch sử cập nhật; hỏi “đã trả lời” có nghĩa là đã liên hệ hay đã xác nhận bàn không |
| H3 — Thông điệp gửi khách không phân biệt “đã nhận yêu cầu” với “đã xác nhận bàn” | Bị suy yếu nếu nội dung message rõ ràng và kiểm tra với khách cho thấy họ hiểu đúng sự khác biệt | Xem mẫu message đã khử PII; phỏng vấn/kiểm tra comprehension; không suy từ việc khách đến rằng message chắc chắn gây nhầm lẫn |

Ba giả thuyết này có thể cùng đúng, cùng sai hoặc chưa đủ evidence. Đừng chọn một nguyên nhân duy nhất chỉ vì nó hợp với giải pháp đang được ưa thích.

## 4. Ví dụ phần B — So sánh options

| Option | Giá trị có thể có | Chi phí/thay đổi | Rủi ro / điều kiện cần kiểm tra |
|---|---|---|---|
| A — Chưa đổi quy trình; đo baseline và làm rõ ownership | Ít xáo trộn, giúp biết vấn đề có lặp lại và ở đâu | Cần thống nhất định nghĩa case, timeframe, denominator và người ghi nhận | Không khắc phục nhanh nếu có sự cố đang diễn ra; cần đánh giá mức độ khẩn cấp với owner |
| B — Chuẩn hóa record và handoff giữa ca | Có thể làm rõ trạng thái, bước tiếp theo và trách nhiệm với ít phụ thuộc công nghệ | Thay đổi cách làm, đào tạo và duy trì record; cần chọn nơi lưu phù hợp | Có thể tạo nhập liệu trùng; phải xác nhận quyền truy cập, trường dữ liệu, ai cập nhật và quy trình ngoại lệ |
| C — Queue số hóa tập trung | Có thể hỗ trợ tìm kiếm, trạng thái và lịch sử ở nhiều kênh | Chi phí xây/mua, tích hợp, vận hành, hỗ trợ và thay đổi hành vi | Chưa chứng minh công cụ giải quyết root cause; cần xác nhận kênh, quyền, bảo mật, capacity, reliability và khả năng staff dùng được |

**Recommendation có điều kiện:** trước mắt đề xuất đo baseline và thử chuẩn hóa handoff trong phạm vi nhỏ nếu người chịu trách nhiệm quy trình chấp thuận. Chỉ chọn queue số hóa nếu evidence xác nhận vấn đề lặp lại, nhu cầu tìm/assign/state được ưu tiên, và option này tốt hơn phương án quy trình theo tiêu chí đã thống nhất. Người quyết định và tiêu chí phải được xác nhận; đây chưa phải quyết định dự án.

## 5. Ví dụ phần C — To-Be là giả thuyết

```text
Trigger: nhận một yêu cầu đặt bàn cần phản hồi
Actor: vai trò tiếp nhận được quy trình xác định (owner cần xác nhận)
Action: ghi nhận mã yêu cầu, thời điểm nhận và trạng thái hiện tại
Decision/rule: yêu cầu nào cần follow-up, ai được assign, khi nào được đổi trạng thái? (Decision needed)
Outcome: ca hiện tại/ca tiếp theo có thể nhận ra việc còn mở và bước tiếp theo
Exception: chưa assign, thiếu thông tin, trùng yêu cầu hoặc không liên hệ được khách
Exception owner: cần xác nhận với người quản lý quy trình
Evidence: record đã khử PII, lịch sử thay đổi và xác nhận người dùng thử
```

To-Be này mô tả một năng lực nghiệp vụ mong muốn. Nó **chưa** quyết định app, cơ sở dữ liệu, SLA hay policy. Hãy đánh dấu từng item là `Proposed`, `Assumption` hoặc `Decision needed`.

## 6. Ví dụ phần D — Trace đến test

| Need / pain point | To-Be change | Draft requirement | Rule / dependency | Acceptance criterion | Test/evidence |
|---|---|---|---|---|---|
| Nhân viên cần nhận biết yêu cầu còn cần follow-up khi bàn giao ca (`Need N-QUEUE-01`, draft) | Hiển thị danh sách yêu cầu đang mở với trạng thái và bước tiếp theo (`Proposed`) | `FR-QUEUE-01` (draft): Nhân viên được phân quyền có thể xem mã yêu cầu, trạng thái hiện tại và thông tin follow-up được quy trình phê duyệt | Role/field visibility, định nghĩa trạng thái, owner chưa assign, nguồn timestamp đều là dependency cần chốt | Given nhân viên có quyền và có 2 request giả lập đang mở (một đã assign, một chưa), when nhân viên mở queue, then cả hai hiển thị đúng mã và trạng thái; owner hiển thị theo policy đã chốt; user không có quyền không xem được record | Seed hai record; chạy bằng tài khoản có quyền và không quyền; lưu screenshot/response + kết quả thực tế. Chỉ đánh dấu Pass sau khi chạy; nếu policy chưa có, test là Blocked/Open |

IDs trên chỉ dùng cho ví dụ và có thể cần đổi để khớp RTM/backlog. Acceptance criteria mô tả hành vi có thể quan sát; test phải chứa setup, data, action, expected, actual và evidence location.

## 7. Lab công cụ BA: biến phân tích thành FigJam + trace

1. Mở [board FigJam dự án mẫu](https://www.figma.com/board/J2aymYBMv2bJEzn75EET23) và tạo bản copy để luyện, giữ nguyên board tham khảo.
2. Tạo một section tên `Gap Analysis — practice`.
3. Thêm các sticky riêng: một lời kể `RP-01`, một open question, ba hypothesis, một evidence source cần xin phép/ẩn danh, và một option.
4. Trên mỗi note ghi source/status ngắn, ví dụ `RP-01 · Reported` hoặc `Open · cần xác minh`; đừng dùng màu như bằng chứng thay cho nhãn chữ.
5. Dùng connector hoặc note link để chỉ quan hệ `reported problem → need → proposed change → FR → AC/test`. Dùng `Decision needed` cho quan hệ còn phụ thuộc policy.
6. Chụp ảnh section và lưu kèm worksheet. Có thể mở `38-Gap-Analysis-Practice-Worksheet.md` để điền nội dung trước, sau đó mới diễn đạt bằng sticky.

**Bằng chứng để tự review:** ảnh board không tràn/chồng lấn, source rõ, ít nhất một giả thuyết có cách bác bỏ, và một trace không nhảy cóc. Board mẫu do trợ lý tạo không được tính là evidence kỹ năng của người học.

## 8. Tự kiểm tra trước khi nộp

- Có claim nào đang nói tần suất dù nguồn chỉ có một anecdote không?
- Có gán nguyên nhân cho nhân viên hoặc kết luận khách mất doanh thu khi chưa xác minh outcome không?
- Có so sánh với baseline và phương án không cần mua công cụ không?
- To-Be có đặt ra policy, vai trò hoặc SLA mà stakeholder chưa quyết định không?
- Từ need tới test có truy được source, rule, expected result và evidence không?

### Cách dùng ví dụ này

Hãy tự làm worksheet 38 trước. Sau đó dùng module 40 để so cách lập luận, không sao chép nguyên bảng vào portfolio. Nếu bạn sửa theo review, lưu version đầu, version sau, lý do sửa và feedback; portfolio sẽ thể hiện cách bạn phân tích thay vì chỉ trưng tài liệu đẹp.
