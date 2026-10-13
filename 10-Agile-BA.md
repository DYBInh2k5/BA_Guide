# 10 - BA Trong Môi Trường Agile

## Agile là gì và tại sao BA cần hiểu?

**Agile** là phương pháp phát triển phần mềm linh hoạt, chia công việc thành các chu kỳ ngắn (Sprint), liên tục nhận phản hồi và điều chỉnh. Hiện nay ~70% công ty IT tại Việt Nam dùng Agile, nên BA **bắt buộc** phải hiểu sâu.

---

## Agile Manifesto — 4 Giá Trị Cốt Lõi

```
1. Individuals and interactions   > Processes and tools
2. Working software               > Comprehensive documentation
3. Customer collaboration         > Contract negotiation
4. Responding to change           > Following a plan
```

> BA trong Agile vẫn viết tài liệu — nhưng viết **vừa đủ**, không viết thừa.

---

## Scrum Framework — Cấu Trúc Cơ Bản

### Các Role Trong Scrum

| Role | Trách nhiệm | Liên quan đến BA |
|------|------------|-----------------|
| **Product Owner (PO)** | Quản lý Product Backlog, ưu tiên yêu cầu | BA thường đóng vai PO hoặc hỗ trợ PO |
| **Scrum Master** | Đảm bảo quy trình Scrum, remove blockers | BA phối hợp chặt |
| **Development Team** | Thiết kế, code, test | BA giải thích yêu cầu cho team |

### Các Artifacts Trong Scrum

| Artifact | Mô tả | BA làm gì |
|----------|-------|-----------|
| **Product Backlog** | Danh sách toàn bộ yêu cầu | Tạo và duy trì |
| **Sprint Backlog** | Yêu cầu được chọn cho Sprint | Làm rõ chi tiết |
| **Increment** | Sản phẩm có thể demo sau mỗi Sprint | Validate với stakeholders |

### Các Events Trong Scrum

```
┌─────────────────── Sprint (2–4 tuần) ──────────────────────┐
│                                                              │
│  Sprint Planning → Daily Standup → Sprint Review            │
│       ↑                                ↓                    │
│  (chọn backlog items)          (demo với stakeholders)      │
│                        Sprint Retrospective                  │
│                        (cải thiện quy trình)                │
└──────────────────────────────────────────────────────────────┘
```

---

## BA Làm Gì Trong Từng Scrum Event?

### Sprint Planning
- Làm rõ acceptance criteria của từng User Story
- Giải thích business context cho dev team
- Ước tính story points cùng team
- Đảm bảo team hiểu đúng "Definition of Done"

### Daily Standup (15 phút)
- BA có thể tham dự để nắm tiến độ
- Sẵn sàng giải thích yêu cầu ngay nếu team bị blocked
- Không cần báo cáo trừ khi được hỏi

### Sprint Review / Demo
- Chuẩn bị stakeholders để demo
- Validate sản phẩm với Product Owner và stakeholders
- Thu thập feedback → cập nhật backlog

### Sprint Retrospective
- Phản hồi về quy trình làm việc của cả team
- Đề xuất cải thiện cách viết yêu cầu, communication

### Backlog Refinement (Grooming)
- **Đây là session quan trọng nhất với BA**
- Xảy ra giữa Sprint, thường 1–2 lần/Sprint
- BA làm rõ, bổ sung, chia nhỏ User Stories
- Team ước tính complexity

---

## Product Backlog — BA Cần Biết Gì?

### Cấu trúc phân cấp:

```
Epic (tính năng lớn)
  └── Feature
        └── User Story
              └── Task (do dev chia)
```

### Ví dụ cụ thể:
```
Epic: Quản lý đơn hàng
  └── Feature: Tạo đơn hàng
        └── Story: Khách hàng có thể thêm sản phẩm vào giỏ hàng
        └── Story: Khách hàng có thể xem lại giỏ hàng trước khi thanh toán
        └── Story: Khách hàng có thể áp dụng mã giảm giá
  └── Feature: Theo dõi đơn hàng
        └── Story: Khách hàng nhận email xác nhận sau khi đặt hàng
        └── Story: Khách hàng có thể xem trạng thái đơn hàng real-time
```

### INVEST Criteria — User Story tốt phải:
| Chữ | Nghĩa | Mô tả |
|-----|-------|-------|
| **I** | Independent | Không phụ thuộc story khác |
| **N** | Negotiable | Có thể thảo luận, điều chỉnh |
| **V** | Valuable | Mang lại giá trị cho user/business |
| **E** | Estimable | Team có thể ước tính được |
| **S** | Small | Đủ nhỏ để hoàn thành trong 1 Sprint |
| **T** | Testable | Có thể viết test case |

---

## Definition of Ready vs Definition of Done

### Definition of Ready (DoR)
> User Story đủ điều kiện để đưa vào Sprint

- [ ] User Story đã có Acceptance Criteria rõ ràng
- [ ] Story đã được ước tính story points
- [ ] Dependencies đã được xác định
- [ ] Team hiểu rõ nội dung, không có câu hỏi tồn đọng
- [ ] UI mockup đã có (nếu cần)

### Definition of Done (DoD)
> Khi nào một Story được coi là hoàn thành

- [ ] Code đã được review
- [ ] Unit test đã pass
- [ ] BA đã validate theo Acceptance Criteria
- [ ] Documentation đã cập nhật
- [ ] Deployed lên môi trường test

---

## Agile BA vs Traditional BA

| Yếu tố | Traditional BA (Waterfall) | Agile BA |
|--------|---------------------------|----------|
| **Yêu cầu** | Thu thập trước, đóng băng | Liên tục được làm rõ |
| **Tài liệu** | Dày, chi tiết từ đầu | Just enough, just in time |
| **Stakeholder** | Tham gia đầu và cuối | Tham gia liên tục |
| **Thay đổi** | Hạn chế, có process nặng | Chào đón thay đổi |
| **Phạm vi** | Fixed scope | Flexible scope |
| **Deliverable** | Tài liệu đầy đủ trước khi dev | Working software từng Sprint |

---

## Kanban — Phương Pháp Agile Khác

Ngoài Scrum, nhiều team dùng **Kanban**:

```
To Do → In Progress → In Review → Done
  │           │             │        │
[backlog]  [đang làm]  [đang review] [xong]
```

**Kanban khác Scrum ở chỗ:**
- Không có Sprint cố định
- Work flows continuously
- Giới hạn số lượng task đang làm (WIP limit)
- Phù hợp team operations, support, maintenance

---

## BA trong SAFe (Scaled Agile Framework)

Với doanh nghiệp lớn, Agile được scale lên với **SAFe**:

```
Portfolio Level  →  Program Level  →  Team Level
(Strategy)          (Features)         (Stories)
   │                    │                  │
Business              Solution           BA/PO
Architect             Architect          (team)
```

**BA trong SAFe thường đóng vai:**
- **Product Owner** ở Team Level
- **Business Analyst** tại Program Level
- **Solution Architect** hỗ trợ (nếu Senior)

---

## Agile BA Checklist Theo Sprint

### Trước Sprint
- [ ] Backlog đã được groomed và prioritized
- [ ] Top 20 stories đáp ứng Definition of Ready
- [ ] Stakeholders đã được thông báo về Sprint goals

### Trong Sprint
- [ ] Sẵn sàng giải thích yêu cầu cho dev
- [ ] Review và chấp nhận/từ chối các story đã xong
- [ ] Cập nhật backlog dựa trên feedback mới

### Cuối Sprint
- [ ] Tham gia Sprint Review, validate với stakeholders
- [ ] Document feedback và tạo backlog items mới
- [ ] Chuẩn bị cho Sprint tiếp theo

---

> 💡 **Tip thực chiến**: Trong Agile, BA giỏi không phải người viết tài liệu nhiều nhất — mà là người **có mặt đúng lúc** để giải thích yêu cầu, ngăn team đi sai hướng, và validate kết quả nhanh nhất.
