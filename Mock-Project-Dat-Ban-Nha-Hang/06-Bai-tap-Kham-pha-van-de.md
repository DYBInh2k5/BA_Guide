# Bài tập 1 — Khám phá vấn đề trước khi thiết kế giải pháp

## Bài khởi động — “Làm app để tránh đặt trùng bàn”

**Brief giả lập:** Quản lý nhà hàng nói: “Hãy làm ứng dụng để tránh đặt trùng bàn.” Câu nói này cho biết giải pháp quản lý mong muốn; nó chưa xác nhận rằng đặt trùng đã xảy ra, nguyên nhân là gì, hoặc ứng dụng là cách phù hợp nhất.

Trước khi đọc các ví dụ bên dưới, tự điền bản nháp:

| Phân loại | Ghi chú của người học |
|---|---|
| Thông tin được nêu trong brief (chưa phải bằng chứng vận hành) | |
| Điều chưa biết / giả thuyết cần kiểm tra | |
| Need — kết quả cần cải thiện, chưa chọn công nghệ | |
| Ba câu hỏi trung lập: quy trình, tần suất/tác động, cách xác nhận thành công | |

**Tiêu chí tự kiểm tra:** chưa khẳng định sự cố hoặc nguyên nhân nếu chưa có ví dụ/số liệu; need nói về kết quả cho người dùng/nhà hàng; câu hỏi không gài sẵn câu trả lời “cần app”. Ghi trạng thái `Draft — scenario giả lập`. Chỉ đánh dấu được review sau khi người hướng dẫn xem câu trả lời của bạn.

### Làm rõ “đặt trùng” trước khi viết requirement

“Hai nhóm cùng đến lúc 19:30” chưa đủ để kết luận loại lỗi. BA cần hỏi và kiểm chứng vì các trường hợp dưới đây có nguyên nhân, rule và test khác nhau:

| Khả năng cần phân biệt | Điều cần làm rõ | Bằng chứng phù hợp |
|---|---|---|
| Hai booking được gán cùng một bàn và thời gian chồng lấn | Nhà hàng gán bàn cố định hay chỉ giữ chỗ theo số khách? “Trùng” được định nghĩa theo thời gian nào? | Hai booking đã khử định danh, sơ đồ/lịch bàn và thời điểm gán bàn |
| Tổng số khách vượt sức chứa của khung giờ | Capacity tính theo ghế, bàn hay tổ hợp? Trạng thái nào giữ chỗ? | Booking theo slot, cấu hình sức chứa có version và policy được người có thẩm quyền duyệt |
| Một khách gửi lại tạo nhiều request | Có gửi lại sau timeout hoặc bấm nhiều lần không? | Request/reference ID, timestamp và log retry đã khử định danh |
| Khách tưởng đã có bàn trong khi nhà hàng mới nhận yêu cầu | Nội dung xác nhận dùng từ nào? Ai/điều gì chuyển request sang trạng thái đã xác nhận? | Nội dung thông báo, lịch sử trạng thái và thời điểm quyết định |

Không gộp các trường hợp này thành một story hoặc một test oracle nếu chưa chứng minh chúng cùng rule. Discovery task `Xác nhận quy tắc sức chứa` trong backlog staging chỉ xử lý policy capacity; nó **không tự trả lời** câu hỏi hai booking có được gán cùng bàn hay một request bị tạo trùng. Trước tiên hãy xin ví dụ sự cố cụ thể, đối chiếu hồ sơ, rồi phân loại đúng failure mode.

## Warm-up — phân biệt lời kể và bằng chứng

**Tình huống luyện tập giả lập:** yêu cầu đặt bàn đến qua điện thoại và mạng xã hội; nhân viên kể rằng đôi khi yêu cầu bị bỏ lỡ. Đây chỉ là brief hư cấu, không phải kết quả khảo sát nhà hàng thật.

| Nhãn | Cách ghi trong warm-up |
|---|---|
| Được nêu trong brief | Yêu cầu đến qua hai kênh; nhân viên báo cáo có lúc bị bỏ lỡ. Chỉ xác nhận rằng brief có nêu lời kể này. |
| Chưa được kiểm chứng | Có bao nhiêu yêu cầu bị bỏ lỡ, “bỏ lỡ” được định nghĩa thế nào, nguyên nhân và tác động là gì. |
| Giả thuyết để điều tra | Nhiều kênh, handoff, tải giờ cao điểm hoặc quy tắc xử lý chưa rõ có thể góp phần. Không ghi thành nguyên nhân đã biết. |
| Chưa phải quyết định | App, inbox chung, sổ chuẩn hóa hay thay đổi phân ca đều là các hướng cần so sánh, không phải kết luận từ brief. |

**Problem statement khởi đầu (còn thiếu baseline):** “Trong tình huống giả lập, yêu cầu đặt bàn đến qua điện thoại và mạng xã hội, và nhân viên báo có lúc yêu cầu bị bỏ lỡ. Chưa rõ tần suất, kênh liên quan, nguyên nhân và tác động; cần tìm hiểu quy trình hiện tại và đối chiếu các trường hợp cụ thể trước khi chọn hướng cải thiện.”

**Bài làm của bạn:** viết lại statement trong 1–2 câu theo lời của bạn; kèm ba câu hỏi giúp kiểm tra tần suất, quy trình và ảnh hưởng. Đừng chép câu mẫu nguyên văn. Lưu bản làm dưới tên/ngày của bạn; chỉ bản bạn tự viết mới là evidence thực hành.

## Mini-lab — từ need tới requirement

Dùng warm-up giả lập phía trên. Mẫu sau là **candidate để học cách diễn đạt**, không phải kết luận đã được stakeholder duyệt:

- **Need candidate:** Nhân viên cần biết yêu cầu nào còn phải xử lý và trạng thái hiện tại của từng yêu cầu để theo dõi việc phản hồi.
- **Requirement candidate, chưa khóa công nghệ:** Với mỗi yêu cầu được tiếp nhận, người được phân công có thể tìm đúng yêu cầu và xác định trạng thái xử lý hiện tại trong nguồn được thống nhất.
- **Open questions:** “Được tiếp nhận” bắt đầu ở sự kiện nào? Vai trò nào chịu trách nhiệm? Mã nhận diện và trạng thái chuẩn được lưu ở đâu? Ai duyệt các trạng thái hợp lệ?
- **Acceptance criteria draft:** Given một yêu cầu đã được tiếp nhận theo quy trình được thống nhất và người dùng có quyền phù hợp, when người dùng tra cứu theo mã yêu cầu, then người được phân công xác định đúng yêu cầu và trạng thái hiện tại trong nguồn được thống nhất. Cách tra cứu, quyền và nguồn dữ liệu còn phải được quyết định.

**Bài tự làm:** viết lại một need và một requirement theo cách của bạn. Kiểm tra: need nói về người và kết quả; requirement nói hành vi quan sát được; cả hai chưa mặc định phải là website/app. Thêm một câu hỏi còn mở và một AC cho tình huống tìm thấy yêu cầu. Gắn nhãn `Draft` cho tới khi có authority xác nhận.

**Tự review:** nếu requirement có thể được đáp ứng bằng quy trình chuẩn hóa hoặc bằng nhiều loại công cụ, nó chưa khóa công nghệ; nếu AC không nêu điều kiện/actor/kết quả kiểm tra được thì cần làm rõ thêm. Đây vẫn chỉ là bài tập trên brief giả lập, không phải evidence vận hành.

## Tình huống
Chủ nhà hàng nói: “Tôi muốn thêm chức năng đặt bàn trên website.”

Câu này mô tả một giải pháp mong muốn. BA chưa nên chuyển nó thẳng thành yêu cầu “website phải có chức năng đặt bàn”. Trước tiên cần hiểu bối cảnh, vấn đề và giá trị cần đạt.

## Mục tiêu bài học
Sau bài này, bạn có thể:
- Phân biệt symptom, problem, need, solution và requirement.
- Đặt câu hỏi trung lập, không dẫn stakeholder đến giải pháp bạn đã nghĩ sẵn.
- Ghi riêng fact, assumption và open question.
- Chuyển thông tin khảo sát thành problem statement có thể kiểm chứng.

## Khung ghi chép phỏng vấn

| Loại thông tin | Ghi chú |
|---|---|
| Fact — điều stakeholder xác nhận hoặc có bằng chứng | |
| Symptom — dấu hiệu đang xảy ra | |
| Root problem — nguyên nhân/vấn đề gốc cần kiểm chứng | |
| Need — năng lực hoặc kết quả stakeholder cần | |
| Proposed solution — giải pháp stakeholder đề xuất | |
| Assumption — điều BA đang tạm tin là đúng | |
| Open question — điều còn phải tìm hiểu | |
| Evidence — số liệu, ví dụ, tài liệu hoặc quan sát cần có | |

## Bộ câu hỏi gợi ý
Dùng câu hỏi mở trước; chỉ hỏi chi tiết sau khi đã nghe câu trả lời.

1. Anh/chị có thể kể lần gần nhất khách đặt bàn từ lúc bắt đầu đến lúc hoàn tất không?
2. Hiện khách đặt bàn qua những kênh nào, và ai xử lý từng kênh?
3. Gần đây có trường hợp đặt trùng, bỏ lỡ yêu cầu hoặc khách không đến không? Xin một ví dụ cụ thể.
4. Những vấn đề đó xảy ra thường xuyên đến mức nào, vào thời điểm nào, và ảnh hưởng ra sao?
5. Anh/chị muốn cải thiện kết quả nào trước tiên? Hiện có số liệu nền để so sánh không?
6. Nếu chưa làm website, có cách nào khác giúp xử lý vấn đề? Vì sao anh/chị nghiêng về website?
7. Có quy tắc nào về sức chứa, thời gian giữ bàn, đặt cọc, hủy hoặc đến trễ không?
8. Ai là người quyết định quy tắc và xác nhận giải pháp đạt yêu cầu?

Không cần hỏi tất cả theo đúng thứ tự. Hãy chọn câu tiếp theo dựa trên điều stakeholder vừa nói.

## Mẫu problem statement
> [Nhóm người dùng] đang gặp [vấn đề] trong [bối cảnh/quy trình], dẫn đến [tác động có bằng chứng]. Chúng ta muốn cải thiện [kết quả đo được] trong [phạm vi/thời hạn], hiện chưa quyết định giải pháp cuối cùng.

## Bài làm của bạn
Viết 5 câu hỏi đầu tiên bạn sẽ hỏi chủ nhà hàng. Sau đó ghi thêm:
- Một điều bạn cần tránh giả định.
- Một loại bằng chứng bạn muốn xin xem.
- Một chỉ số có thể dùng để biết vấn đề đã cải thiện.

## Chế độ tự học và đáp án tham khảo

Nếu chưa có facilitator đóng vai chủ nhà hàng, hãy:
1. Viết 5 câu hỏi trước khi đọc ví dụ phỏng vấn.
2. Đọc [ví dụ phỏng vấn và phân tích](./07-Minh-hoa-Phong-van-va-Phan-tich.md), rồi gắn nhãn từng câu: fact do stakeholder giả lập báo cáo / symptom / giả thuyết BA / open question.
3. Ghi bằng chứng cần xin và người có thể cung cấp; một lời kể là nguồn cần kiểm chứng, chưa phải dữ liệu vận hành đã xác thực.
4. So sánh câu hỏi của bạn với ví dụ; sửa câu hỏi dẫn dắt hoặc mặc định website là giải pháp.
5. Viết problem statement trong 2–3 câu, dùng cụm “theo lời stakeholder trong tình huống giả lập” nếu nguồn là lời kể; ghi rõ điều chưa biết.

**Ví dụ phân loại nhanh:** câu “chủ nhà hàng muốn chức năng trên website” là thông tin trong scenario về proposed solution; không chứng minh khách cần website. “Có hai lần sổ và file không khớp” là lời stakeholder giả lập báo cáo; muốn xác nhận thì cần ngày/sự cố và đối chiếu nguồn. “Dùng nhiều nơi ghi chép gây trùng” là giả thuyết nguyên nhân cho đến khi xem quy trình và bằng chứng.
## Checklist tự đánh giá
- Câu hỏi không mặc định website là giải pháp đúng.
- Có câu hỏi xin ví dụ thật và tần suất/tác động.
- Có câu hỏi về mục tiêu và cách đo thành công.
- Có câu hỏi xác định ai sử dụng quy trình và ai ra quyết định.
- Không đưa ra kết luận trước khi kiểm tra bằng chứng.

## Sau khi bạn trả lời
Người hướng dẫn sẽ đóng vai chủ nhà hàng và trả lời từng câu. Bạn sẽ tiếp tục phỏng vấn, rồi cùng lập problem statement, stakeholder map và As-Is flow.

