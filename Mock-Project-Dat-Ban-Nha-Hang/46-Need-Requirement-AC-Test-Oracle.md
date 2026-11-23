# 46 — Từ need tới requirement, AC và test oracle

## Mục tiêu

Sau bài này, bạn phân biệt được:

- **Need:** nhu cầu/vấn đề của người hoặc tổ chức.
- **Requirement:** điều kiện hoặc năng lực cần có để đáp ứng need.
- **Design decision:** cách cụ thể nhóm chọn để triển khai requirement.
- **Acceptance criterion (AC):** điều kiện quan sát được để xác nhận một requirement/story được chấp nhận.
- **Test case:** setup, dữ liệu, bước và cách ghi kết quả thực thi.
- **Test oracle:** nguồn có thẩm quyền xác định expected result là gì.

Một prototype, API response hay ý kiến của sponsor có thể cung cấp thông tin, nhưng tự nó chưa chắc là requirement đã duyệt hay oracle cho mọi lớp kiểm thử.

## Tình huống CR-SMS

Sponsor đề xuất: “Gửi SMS mỗi lần yêu cầu đặt bàn đổi trạng thái để khách không phải gọi hỏi.” Trong case hiện tại chưa có evidence về số cuộc gọi hỏi trạng thái, chưa có policy về consent/opt-out, chưa chọn nhà cung cấp, và chưa thống nhất trạng thái nào cần thông báo. CR-SMS đang ở trạng thái đề xuất.

### Worked example

| Lớp phân tích | Ví dụ | Trạng thái / nguồn cần có |
|---|---|---|
| Need | Khách cần biết kết quả xử lý yêu cầu và bước tiếp theo | Draft từ lời sponsor; cần phỏng vấn khách/lễ tân hoặc xem dữ liệu liên hệ hỏi trạng thái |
| Requirement | Với yêu cầu đủ điều kiện và contact preference được phép, hệ thống cung cấp thông tin về trạng thái đã được duyệt | Draft; cần Product/Operations xác nhận policy và người nhận |
| Business rule | Chỉ gửi khi trạng thái nằm trong tập trạng thái được duyệt và recipient có permission/consent hợp lệ | Open; policy owner phải xác nhận tập trạng thái, consent và opt-out |
| Design decision | Dùng SMS provider X, lưu delivery status, retry tối đa N lần | Chưa quyết định; Engineering/Architecture/Privacy cần review provider, contract, retry và dữ liệu |
| Acceptance criterion | Given một transition được duyệt và recipient có consent hợp lệ, When transition được commit, Then hệ thống tạo một notification attempt theo contract đã duyệt và ghi kết quả gửi | Draft; expected cần AC/policy và contract được duyệt làm oracle |
| Test case | Tạo test record opt-in, đổi status bằng staff role, gửi request tới provider sandbox, đối chiếu notification record và callback | Test design; cần test data/environment/build và expected oracle |
| Test oracle | Policy trạng thái + consent, approved AC, API contract/version và provider sandbox contract cho các assertion tương ứng | Chưa có đủ nguồn để chạy và kết luận end-to-end |

Ví dụ này chưa phải requirement hay policy của sản phẩm thật. `N` phải được thay bằng ngưỡng do owner có thẩm quyền duyệt; không tự bịa số.

## Cách viết requirement không khóa thiết kế quá sớm

**Quá solution-specific:** “Hệ thống gọi Twilio API trong vòng 2 giây và retry ba lần.” Câu này giả định provider, latency target, retry policy và hạ tầng mà case chưa quyết định.

**Requirement draft tốt hơn:** “Đối với trạng thái được duyệt và recipient có quyền nhận tin, hệ thống phải tạo thông báo theo kênh đã cấu hình và ghi kết quả xử lý để hỗ trợ tra cứu.” Sau đó tách các quyết định provider, delivery semantics, timeout/retry, audit fields, privacy và target latency thành các câu hỏi/requirement liên quan với owner phù hợp.

Requirement cần đủ cụ thể để đánh giá nhưng không nên đóng thay quyết định kiến trúc còn mở. Nếu một constraint đã được tổ chức phê duyệt, ghi nguồn và phiên bản thay vì bỏ qua constraint đó.

## Testability và oracle

Dùng checklist này trước khi tạo test:

1. **Đối tượng:** requirement/AC nào đang được kiểm tra? ID/version/status là gì?
2. **Phạm vi:** API, UI, process, data, permission hay integration?
3. **Điều kiện:** build/environment, role, test data và trạng thái ban đầu nào?
4. **Expected:** từng kết quả mong đợi lấy từ AC, rule, contract hoặc approved design nào?
5. **Actual:** kết quả thật từ lần chạy nào? Ai chạy, lúc nào, artifact/evidence ở đâu?
6. **Verdict:** Pass/Fail/Blocked/Not run theo tiêu chí nào?
7. **Giới hạn:** test chứng minh điều gì, và không chứng minh điều gì?

Thiếu oracle thì ghi `Blocked/Open` hoặc `Not run`; không tự tạo expected sau khi đã thấy actual. Actual API 200 không tự chứng minh business acceptance, UX clarity, consent compliance, delivery đến thiết bị thật hay benefit.

## Bài tập 1 — phân loại câu

Phân loại mỗi câu là `need`, `requirement`, `business rule`, `design decision`, `AC`, `test case`, `oracle` hoặc `unknown/assumption`; có thể gắn hơn một loại nếu giải thích rõ:

1. “Khách gọi lại vì không biết nhà hàng đã quyết định chưa.”
2. “Mọi trạng thái đổi đều phải gửi SMS.”
3. “Chỉ gửi SMS nếu khách đã opt-in.”
4. “Dùng provider Acme và retry 3 lần.”
5. “Với recipient opt-in, khi nhân viên xác nhận yêu cầu, có đúng một notification attempt theo contract đã duyệt.”
6. “Tạo booking opt-in ở sandbox, xác nhận trong staff UI, rồi đối chiếu notification record.”
7. “Approved notification policy v2.1 và API contract v3.”

### Đáp án có hướng dẫn

1. Need/hypothesis được báo cáo, chưa evidence đã kiểm chứng; cần kiểm tra call log, phỏng vấn và tần suất/tác động.
2. Proposal hoặc draft requirement, không phải rule đã duyệt. “Mọi trạng thái” cần định nghĩa state/actor/exception và authority.
3. Có thể là business rule candidate; phải kiểm tra policy owner và scope, rồi version hóa trước khi dùng làm oracle.
4. Design/solution proposal với ba assumption: provider, retry count và ý nghĩa retry; cần Engineering/Privacy/Operations review.
5. AC draft có thể kiểm chứng nếu “đúng một”, transition, recipient, notification attempt và contract được định nghĩa/duyệt. Không chứng minh tin đã tới điện thoại.
6. Test case outline; còn thiếu build, sandbox configuration, test data ID, expected result nguồn và actual/evidence sau khi chạy.
7. Oracle sources nếu đúng là tài liệu được duyệt, đúng version và áp dụng cho scope đó. Cần kiểm tra approval/effective date.

## Bài tập 2 — hoàn thành một vertical slice

Tự điền một hàng trong `Trace and Test` của workbook CR-SMS:

```text
Need/source → CR → requirement ID/status → approved AC/rule → test condition → expected source → actual/evidence → verdict → owner/gap
```

Chọn một trong các condition: opt-out, provider timeout, callback lặp, sai số điện thoại. Nếu rule/expected chưa có nguồn, ghi `Blocked/Open`; không tự điền kết quả thành công hoặc lỗi theo suy đoán.

## Bài tập phỏng vấn BA

Trong review, hãy trả lời:

- Requirement nào ở đây còn draft và ai có thẩm quyền duyệt?
- Nếu API trả 202 nhưng callback chưa tới, phần nào đã chứng minh và phần nào còn mở?
- Nếu design prototype hiển thị “Đã gửi” nhưng contract chỉ đảm bảo “đã nhận request”, cần sửa wording hay contract? Ai quyết định?
- Nếu business muốn “gửi ngay”, cần hỏi thêm gì để biến “ngay” thành requirement đo được?

Một câu trả lời tốt nêu source, scope, owner và giới hạn evidence. Không cần thuộc thuật ngữ để thay cho lập luận.

## Đầu ra portfolio

- Requirement/AC version có nguồn và trạng thái.
- Một test case có oracle rõ hoặc lý do `Blocked/Open`.
- Ảnh/response/record của lần chạy thật trong sandbox/mock, có build/time/data context; gắn nhãn mock khi dùng mock.
- Một đoạn 3–5 câu giải thích test chứng minh gì và không chứng minh gì.

Chỉ đưa artifact bạn tự làm vào mục evidence cá nhân. Ví dụ worked example ở bài này là tài liệu học tập do trợ lý chuẩn bị.
