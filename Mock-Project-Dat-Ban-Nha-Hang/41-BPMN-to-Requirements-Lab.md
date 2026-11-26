# 41 — Từ quy trình đến yêu cầu có thể kiểm chứng

## Mục tiêu

Thực hành nối một điểm trong As-Is BPMN với nhu cầu, yêu cầu dự thảo, acceptance criteria và test case; giữ rõ nguồn, mức tin cậy và phần còn cần stakeholder quyết định.

> Tất cả lời kể và hồ sơ trong case study là giả lập để học. Chúng không phải bằng chứng vận hành của một nhà hàng thật.

## 1. Điểm xuất phát: ghi đúng nguồn

Trong role-play, chủ nhà hàng giả lập nói tin nhắn Facebook buổi tối **có thể** được đọc vào sáng hôm sau. Ghi nhận như sau:

| ID | Nội dung | Loại/nguồn | Trạng thái | Việc cần làm |
|---|---|---|---|---|
| E-01 | Một số tin nhắn buổi tối có thể được đọc vào sáng hôm sau | Lời kể trong phỏng vấn giả lập | Reported; chưa đo | Xin mẫu timestamp tin đến/lần đọc, quan sát ca phù hợp |
| H-01 | Chậm phản hồi có thể làm khách bỏ đi hoặc yêu cầu bị bỏ sót | Giả thuyết tác động | Chưa xác minh | Hỏi khách/nhân viên; đối chiếu trạng thái và kết quả xử lý |
| O-01 | “Buổi tối”, “đọc”, “bỏ sót” được định nghĩa thế nào? | Câu hỏi mở | Open | Thống nhất phạm vi, timestamp và cách phân loại |

Không đổi E-01 thành “hệ thống phản hồi chậm” hoặc “khách bị mất” khi chưa có bằng chứng. Đây là bước phân biệt lời kể, quan sát và suy luận.

## 2. Chuỗi phân tích

```text
Nguồn/Evidence → Problem hoặc opportunity → Need/outcome
              → Capability/requirement option → Acceptance criteria → Test/evidence
```

| Tầng | Ví dụ cho case giả lập | Câu hỏi review |
|---|---|---|
| Evidence | E-01: stakeholder kể có tin nhắn tối được đọc sáng hôm sau | Ai nói? Có log/quan sát đối chiếu không? |
| Problem hypothesis | Một số yêu cầu ngoài giờ có thể chưa được xem kịp thời | Phạm vi và tần suất là gì? Có tác động nào đo được? |
| Need/outcome | Nhân viên cần nhận biết và xử lý các yêu cầu mới theo cách thống nhất | Stakeholder nào xác nhận need? “Xử lý” kết thúc ở bước nào? |
| Capability option | Có thể có một hàng đợi tập trung, quy trình phân công, hoặc cảnh báo ca trực | So sánh chi phí, vận hành, quyền riêng tư và tính khả thi trước khi chọn |
| Candidate requirement | Với phương án số, mỗi yêu cầu trong phạm vi cần có kênh nguồn, thời điểm nhận, trạng thái và người phụ trách | Đây là draft phụ thuộc option/policy; chưa được coi là requirement đã duyệt |
| Candidate AC | Khi một yêu cầu hợp lệ được ghi nhận, bản ghi hiển thị ID, kênh nguồn, thời điểm nhận và trạng thái ban đầu | “Hợp lệ”, status ban đầu, múi giờ, xử lý trùng đã được định nghĩa chưa? |
| Test case | Tạo một yêu cầu giả lập qua kênh được hỗ trợ, kiểm tra ID/metadata/status; gửi lặp để xem policy trùng | Test đúng môi trường? Expected có source/decision không? Lưu actual/evidence sau khi chạy |

## 3. Ví dụ viết story và AC — có điều kiện

**Story dự thảo:** Là nhân viên tiếp nhận đặt bàn, tôi muốn nhìn thấy các yêu cầu đang chờ xử lý cùng nguồn và thời điểm nhận, để tôi có thể xác định yêu cầu mới và tiếp tục xử lý.

Chỉ dùng story này **nếu** discovery và options analysis xác nhận một hàng đợi số là phương án phù hợp. Nó không chứng minh giải pháp phải là website, app hay một công cụ cụ thể.

**AC dự thảo:**

- Given một yêu cầu thuộc kênh và phạm vi đã được cấu hình, when hệ thống ghi nhận yêu cầu, then hệ thống tạo một ID và hiển thị kênh nguồn, thời điểm nhận cùng trạng thái khởi tạo đã được stakeholder duyệt.
- Given người dùng không có quyền nhân viên, when họ mở hàng đợi nội bộ, then hệ thống không tiết lộ danh sách hoặc thông tin liên hệ của khách.
- Given cùng một yêu cầu được gửi lại do retry, when hệ thống nhận lần gửi tiếp theo, then kết quả tuân theo chính sách chống trùng đã được quyết định; hiện policy này là `Open` và chưa thể chốt expected result.

AC cuối cho thấy BA phải tìm policy trước khi báo QA “đúng phải là gì”. Không tự đặt SLA, trạng thái, retention hay quy tắc duplicate.

### Đáp án mẫu: hàng đợi không có yêu cầu chờ

**AC draft:** Given nhân viên có quyền mở hàng đợi và không có yêu cầu nào khớp phạm vi/lọc hiện tại, when hàng đợi được tải, then không hiển thị dòng yêu cầu và hiển thị empty state theo nội dung UX đã duyệt. Exact copy và hành động tiếp theo vẫn `TBD`.

**Test case:** tạo môi trường test với zero record khớp query; đăng nhập bằng user có quyền; mở queue; xác nhận không có request row, empty state xuất hiện và không có dữ liệu ngoài phạm vi. Lưu setup, build, query/filter, expected/actual, ảnh hoặc response đã khử dữ liệu nhạy cảm. Test “queue rỗng” và “có request nhưng bộ lọc không match” có thể là hai scenario riêng nếu UX phải hướng dẫn khác nhau.

**Vì sao AC này tốt:** nó xác định trạng thái cần thấy được và bảo vệ dữ liệu, nhưng để nội dung/call-to-action cho product/UX/stakeholder quyết định. Chưa được ghi AC là Approved hoặc báo test Passed trước khi có policy, UX review và kết quả chạy thật.

## 4. Traceability và quản lý trạng thái

| Trace ID | Từ → đến | Trạng thái gợi ý | Ai xác nhận tiếp |
|---|---|---|---|
| E-01 → H-01 | Lời kể → giả thuyết tác động | Needs validation | Nhân viên, khách, quản lý vận hành |
| H-01 → NEED-01 | Giả thuyết → need “nhận biết/xử lý yêu cầu mới” | Draft | Stakeholder business có thẩm quyền |
| NEED-01 → OPT-01 | Need → hàng đợi số/quy trình phân công/cảnh báo | Options to assess | Business owner + Operations + IT |
| OPT-01 → REQ-01 | Option được chọn → metadata/queue behavior | Draft; conditional | Product/business owner + kỹ thuật + privacy/security |
| REQ-01 → AC-01 → TC-01 | Requirement → tiêu chí → test | Pending policy/source | BA, QA, stakeholder approver |

Trong Jira hoặc backlog tương đương, link story với nguồn, open question, decision, AC và test. Trong Excel/Markdown, giữ các ID giống nhau để truy hai chiều. Không đánh dấu Approved/Done khi chỉ có ví dụ do trợ lý soạn.

## 5. Tool lab 20 phút

1. **FigJam:** đặt E-01, H-01, NEED-01, OPT-01, REQ-01, AC-01, TC-01 trên sticky riêng; nối mũi tên và ghi `Reported`, `Hypothesis`, `Draft`, `Open`.
2. **draw.io:** mở `09-Reservation-As-Is.drawio`; đặt annotation E-01 cạnh nhánh Facebook ngoài giờ. Không thêm task “hệ thống gửi cảnh báo” vào As-Is vì đó là phương án To-Be.
3. **Jira hoặc spreadsheet:** tạo một requirement draft và liên kết ít nhất một open question. Nếu Jira chưa được kết nối, dùng bảng backlog hiện có; mục tiêu là traceability, không phải tên tool.
4. **Review:** kiểm tra từng mũi tên có căn cứ không; đánh dấu cạnh chưa được stakeholder xác nhận là giả thuyết hoặc option.

## 6. Bài tự làm

Chọn một điểm khác trong flow, ví dụ bước “ghi vào sổ” hoặc “hỏi quản lý ca”, rồi điền:

```text
Nguồn/ID:
Điều đã biết và trạng thái bằng chứng:
Câu hỏi còn mở:
Need/outcome giả thuyết:
Hai option có thể xem xét:
Requirement draft (nếu option được chọn):
Một AC có thể kiểm chứng:
Test evidence cần lưu:
```

**Đáp án mẫu rút gọn cho bước “ghi vào sổ”:** lời kể giả lập nói lễ tân ghi yêu cầu vào sổ; cần quan sát sổ/cách ghi và hỏi các kênh nào được ghi. Need có thể là truy lại được yêu cầu; không kết luận phải mua app. Option có thể gồm chuẩn hóa sổ hiện tại hoặc dùng hàng đợi số. Requirement/AC chỉ chốt sau khi chọn phương án và thống nhất dữ liệu, quyền truy cập, cách xử lý trùng.

## Lát cắt riêng — role-play capacity CHAT-RP-01

Đây là transcript role-play mới do trợ lý tạo trong chat, được minh họa bằng [sơ đồ Partial As-Is](./48-Roleplay-Capacity-Partial-As-Is.drawio). Nó **không phải** transcript của bài 07, bài 32 hay cuộc phỏng vấn ngoài đời. Mọi nội dung dưới đây là lời kể mô phỏng, chưa có quan sát hoặc hồ sơ thật đối chiếu.

| ID | Nội dung | Trạng thái bằng chứng | Cần làm rõ/kiểm tra |
|---|---|---|---|
| RP-CAP-01 | Một yêu cầu Facebook tối thứ bảy được phản hồi sau khoảng 30 phút; lễ tân nói phải hỏi quản lý về chỗ trống | Một anecdote do stakeholder role-play kể; không có execution evidence | Xin case đã khử nhận dạng; đối chiếu timestamp nhận/phản hồi và người xử lý |
| RP-CAP-02 | Walk-in có thể thay đổi chỗ trống; thông tin nằm ở sổ khác và timestamp có thể không chính xác | Reported trong cùng role-play; độ đầy đủ/độ chính xác chưa biết | Hỏi owner của hai sổ; quan sát quy trình cập nhật và thời điểm ghi |
| H-CAP-01 | Nguồn capacity tách rời và phụ thuộc hỏi quản lý có thể góp phần làm chậm quyết định | Giả thuyết, chưa chứng minh quan hệ nhân quả | So sánh nhiều ca/kênh; xác định các nguyên nhân khác và ngoại lệ |
| NEED-CAP-01 | Nhân viên cần biết ai theo dõi request và căn cứ capacity hiện tại để phản hồi chính xác | Need candidate; cần lễ tân/quản lý xác nhận | Xác minh “phản hồi chính xác” kết thúc ở nhận request, pending hay confirmed |
| DEC-CAP-01 | `PENDING` có giữ chỗ hay không; nguồn capacity nào là nguồn chuẩn; ai có quyền quyết định | Open; không tự đặt rule | Xác định business decision authority, options, impact và ngày hiệu lực |

### Option, requirement và test chưa thể duyệt

Có thể so sánh ba hướng: **(A)** chuẩn hóa quy trình/handoff và sổ hiện tại; **(B)** tạo queue chung có source, thời điểm, trạng thái và người phụ trách; **(C)** cân nhắc tự động xác nhận sau khi đã chốt rule và xác thực dữ liệu capacity. Đây là options để phân tích, chưa phải lựa chọn hay scope được phê duyệt.

Nếu stakeholder chọn hướng số hóa queue, **REQ-CAP-01 (draft có điều kiện)** có thể là: “Với request thuộc kênh trong phạm vi, hệ thống hiển thị source, thời điểm nhận, trạng thái và người phụ trách cho nhân viên được ủy quyền.” **AC-CAP-01 (candidate)**: “Given request được ghi nhận qua kênh đã duyệt, when nhân viên có quyền mở queue, then bản ghi hiển thị ID, source, timestamp theo timezone đã thống nhất, status khởi tạo và owner hoặc trạng thái chưa assign.”

`AC-CAP-01` chưa Ready vì chưa chốt kênh trong scope, timezone, role, status/owner semantics và policy capacity. `TC-CAP-01` chưa executable cho UAT: cần dữ liệu test đã khử nhận dạng, môi trường/build, expected result có authority và hậu điều kiện. Không dùng hành vi mock `PENDING` hiện tại làm oracle nghiệp vụ; không báo `Pass` khi `DEC-CAP-01` còn Open. Nếu option không được chọn, không tạo requirement này chỉ vì nó dễ triển khai.

### Trace minh họa

```text
RP-CAP-01/02 (reported, simulated)
  → H-CAP-01 (hypothesis; needs validation)
  → NEED-CAP-01 (candidate; stakeholder validation needed)
  → options A/B/C (assess with owner/evidence)
  → DEC-CAP-01 (open policy/authority)
  → REQ-CAP-01 / AC-CAP-01 (conditional draft only if option B selected)
  → TC-CAP-01 (blocked until test basis and environment are approved)
```

Lát cắt này chỉ chứng minh cách **trợ lý cấu trúc một ví dụ học tập**. Nó không nâng scorecard và không thể ghi vào portfolio như phỏng vấn/nghiên cứu do người học thực hiện.

### Tiêu chí tự review

- [ ] Phân biệt lời kể với evidence đã kiểm tra.
- [ ] Need diễn đạt kết quả cần đạt, không cài sẵn công nghệ.
- [ ] Requirement có source/owner/status và không chứa policy tự suy diễn.
- [ ] AC quan sát/kiểm tra được; test có setup, expected, actual và evidence.
- [ ] Trace được từ nguồn tới test; open point chưa bị xóa bằng giả định.

## Sau bài lab

Artifact do trợ lý tạo là ví dụ học tập. Chỉ lưu vào portfolio phần bạn tự sửa/tạo, ghi rõ giả lập, nêu lựa chọn và giới hạn, rồi xin review. Tracker năng lực vẫn `Chưa đánh giá` cho đến khi có artifact thực hành của bạn.
