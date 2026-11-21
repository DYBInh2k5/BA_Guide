# 43 — Capstone BA: từ discovery tới quyết định

## Mục tiêu

Bài này giúp bạn tự thực hiện một lát cắt BA hoàn chỉnh trong dự án đặt bàn giả lập: làm rõ vấn đề, xử lý thông tin mâu thuẫn, đề xuất phạm vi, viết yêu cầu kiểm chứng được, nối yêu cầu với test và trình bày khuyến nghị. Đây là bài thực hành cá nhân, không phải dự án khách hàng thật.

**Thời lượng gợi ý:** 2–3 buổi, mỗi buổi 45–60 phút. Tạo thư mục riêng `outputs/capstone/<ngay>/` và lưu bản bạn tự làm; không ghi đè artifact mẫu.

## Tình huống

Bạn là BA trong nhóm chuẩn bị pilot đặt bàn trực tuyến cho một nhà hàng giả định. Sponsor nói: “Khách gọi nhiều lần để hỏi đã đặt được chưa. Làm SMS xác nhận ngay, và phải xong trong hai tuần.” Lễ tân phản ánh có lúc khách đến dù nhà hàng đã kín bàn. Product owner muốn giữ MVP nhỏ. Kỹ thuật nói chưa biết nguồn dữ liệu sức chứa và chưa có nhà cung cấp SMS được chọn.

Đây là các phát biểu ban đầu, chưa phải facts đã kiểm chứng. Chưa có số liệu về số cuộc gọi, số khách bị từ chối, nguyên nhân kín bàn, ngân sách, consent gửi tin, hay năng lực tích hợp. Không tự điền các khoảng trống bằng giả định chắc chắn.

## Phần A — Discovery và framing

1. Viết problem statement 2–3 câu, không nhúng sẵn giải pháp SMS.
2. Phân loại từng câu trong tình huống thành `reported`, `observed/evidence`, `assumption`, `unknown` hoặc `decision`; hiện chưa có observed evidence được cung cấp.
3. Lập tối thiểu 8 câu hỏi phỏng vấn, chia cho sponsor, lễ tân, Product và kỹ thuật. Mỗi câu ghi mục đích và câu trả lời nào sẽ làm thay đổi quyết định.
4. Vẽ system context hoặc As-Is ở mức đã biết. Đánh dấu nguồn dữ liệu sức chứa, handoff và tích hợp chưa xác minh; không vẽ chúng như thành phần đã tồn tại.
5. Chọn 3 loại evidence cần thu trước khi khuyến nghị đầu tư; ghi owner, cách thu và rủi ro nếu thiếu.

## Phần B — Options và quyết định

So sánh ít nhất ba phương án:

- A: cải thiện trạng thái/tra cứu trên kênh hiện tại trước, chưa gửi SMS;
- B: thêm thông báo SMS sau khi có trạng thái đủ tin cậy;
- C: pilot thủ công có kiểm soát để đo nguyên nhân và nhu cầu trước khi chọn giải pháp.

Tạo decision matrix với tiêu chí, trọng số, thang điểm, evidence hoặc nhãn `assumption` cho từng điểm. Thêm một điều kiện must-have có thể loại phương án. Làm sensitivity check bằng cách thay đổi một trọng số hoặc một giả định và ghi xem thứ hạng có đổi không. Không đưa ra ROI giả lập nếu chưa có chi phí/lợi ích có nguồn.

Kết thúc bằng một decision brief ngắn: quyết định cần có, khuyến nghị tạm thời, evidence còn thiếu, trade-off, người có thẩm quyền và điều kiện quay lại quyết định.

## Phần C — Yêu cầu và mô hình

Từ phát hiện ở phần A, tạo:

- 1 business need có nguồn hoặc ghi rõ `Draft / giả lập`;
- 3 functional requirements hoặc stories có ID ổn định;
- 1 business rule về trạng thái đặt bàn, để `Open` nếu chưa có authority xác nhận;
- acceptance criteria có điều kiện, hành động, kết quả quan sát được và trường hợp biên;
- 1 flow To-Be ngắn gồm happy path, lỗi/ngoại lệ và điểm cần người quyết định;
- 1 NFR scenario phù hợp (ví dụ độ trễ tra cứu hoặc khả năng phục hồi), với ngưỡng để `TBD` nếu chưa được stakeholder duyệt.

Không viết yêu cầu kiểu “hệ thống thân thiện/nhanh/an toàn” mà không có ngữ cảnh kiểm chứng. Không biến ý kiến sponsor thành policy đã duyệt.

## Phần D — Thực hành công cụ và traceability

Chọn và dùng ít nhất ba công cụ khác nhau; lưu artifact do chính bạn tạo:

1. **draw.io:** context, BPMN hoặc To-Be flow; dùng nhãn cho unknown/handoff.
2. **Markdown/Jira tương đương:** requirement/backlog với ID, source, owner, status, AC và dependency. Nếu Jira chưa kết nối, dùng Markdown.
3. **Figma/FigJam:** prototype trạng thái chính và một trạng thái lỗi/empty; nếu chưa thao tác được, ghi blocker cùng ảnh/chú thích và không tính là đã hoàn tất.
4. **Postman hoặc SQL:** chọn một câu hỏi có thể kiểm tra từ mock/fixture. Ghi môi trường, dữ liệu tổng hợp, expected/actual và giới hạn. Không gọi mock response là bằng chứng của hệ thống thật.
5. **Excel:** tạo traceability tối thiểu `Need → Requirement → Design/Process → AC → Test → Evidence/Status`; thêm filter để tìm requirement thiếu test.

Ít nhất một đường trace phải đi hết từ need đến evidence. Nếu chưa thực thi test, trạng thái là `Not run` và evidence cell để trống; test case đã viết không đồng nghĩa test đã pass.

## Phần E — Kiểm soát thay đổi và trình bày

Giả sử sau khi baseline được duyệt, sponsor đề nghị thêm SMS cho mọi trạng thái và giao diện hủy đặt bàn. Viết change impact ngắn: mục tiêu, requirements, process, data/API, UX, NFR/privacy, UAT, lịch/chi phí, dependencies và approver. Phân loại phần nào là defect, phần nào là change request, phần nào cần quyết định; không tự phê duyệt phạm vi.

Chuẩn bị walkthrough 5 phút theo storyboard:

1. vấn đề và evidence;
2. stakeholder/unknowns;
3. options và trade-off;
4. một requirement cùng trace tới test;
5. risk, recommendation và quyết định cần sponsor đưa ra.

Nêu rõ đây là case study giả lập, phần nào do bạn tự tạo, phần nào được trợ lý/công cụ hỗ trợ, và điều gì chưa được kiểm chứng. Không đưa số liệu giả lập vào CV như kết quả đạt được.

## Worksheet nộp review

```text
Ngày / version:
Problem statement:
Ba evidence đã có (nếu không có, ghi rõ):
Ba unknown quan trọng + owner:
Options + must-have + sensitivity result:
Recommendation + decision maker:
Requirement ID → AC → test ID:
Công cụ đã tự thao tác + link/file:
Actual evidence (hoặc Not run):
Change impact lớn nhất:
Giới hạn / điều cần xác minh:
Walkthrough 5 phút (link hoặc outline):
```

## Rubric review (0–2 mỗi mục)

| Năng lực | 0 | 1 | 2 |
|---|---|---|---|
| Framing và evidence | Nhầm assumption thành fact | Có phân loại nhưng thiếu owner/nguồn | Lập luận theo nguồn, unknown và bước xác minh |
| Options | Chỉ chốt giải pháp đầu tiên | Có phương án nhưng điểm/weights yếu | Có must-have, trade-off và sensitivity |
| Requirement quality | Mơ hồ hoặc solution áp đặt | Có AC nhưng thiếu ngoại lệ/trace | Rõ nguồn, trạng thái, AC quan sát được và trace |
| Tool execution | Chỉ có artifact mẫu | Tự sửa một phần, evidence thiếu | Artifact cá nhân mở được, version và evidence phù hợp |
| Change/governance | Tự phê duyệt hoặc bỏ impact | Nhận ra change nhưng thiếu dependency | Bao quát impact, authority và quyết định mở |
| Communication | Chỉ kể artifact | Có câu chuyện nhưng thiếu caveat | Giải thích quyết định, giới hạn và ask rõ ràng |

Điểm tối đa 12 chỉ là rubric học tập. Chỉ reviewer chấm sau khi xem artifact/evidence; không tự nâng level chỉ dựa trên worksheet đã điền. Ghi điểm và phản hồi trong [BA Tool Mastery Tracker](./24-BA-Tool-Mastery-Tracker.md) sau khi review.

## Tiêu chí sẵn sàng đưa vào portfolio

- Artifact do bạn tự tạo hoặc chỉnh sửa được đánh dấu rõ; bản mẫu trợ lý không được tính là bằng chứng cá nhân.
- ID và thuật ngữ nhất quán giữa problem, requirement, sơ đồ, test và decision.
- Không có kết luận vượt quá evidence; dữ liệu minh họa được gắn nhãn.
- Có ít nhất một trace hoàn chỉnh và một giới hạn/risk được giải thích.
- Có thể mở file/link khi trình bày và kể được lý do cho lựa chọn chính.

Khi bạn gửi worksheet và một artifact đầu tiên (draw.io, backlog, prototype hoặc workbook), mình sẽ review từng mục theo rubric, chỉ rõ lỗi phân tích và đề xuất bước luyện tiếp theo. Cho tới lúc đó, scorecard vẫn `Chưa đánh giá`.
