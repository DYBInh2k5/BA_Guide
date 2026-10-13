# 05 - Kỹ Thuật Phân Tích Quan Trọng

## Nhóm 1: Phân Tích Chiến Lược

### SWOT Analysis
> Đánh giá tổng thể doanh nghiệp hoặc dự án

| | Tích cực | Tiêu cực |
|-|----------|----------|
| **Nội bộ** | **S**trengths (Điểm mạnh) | **W**eaknesses (Điểm yếu) |
| **Bên ngoài** | **O**pportunities (Cơ hội) | **T**hreats (Thách thức) |

**Dùng khi:** Phân tích tại sao cần dự án này, đánh giá rủi ro

---

### PESTLE Analysis
> Phân tích các yếu tố vĩ mô ảnh hưởng đến tổ chức

- **P**olitical — Yếu tố chính trị, luật pháp
- **E**conomic — Kinh tế vĩ mô
- **S**ocial — Văn hóa, xã hội, hành vi người dùng
- **T**echnological — Công nghệ mới
- **L**egal — Quy định pháp lý
- **E**nvironmental — Môi trường, bền vững

**Dùng khi:** Phân tích context kinh doanh trước khi bắt đầu dự án

---

### Gap Analysis
> So sánh trạng thái hiện tại (As-Is) với trạng thái mong muốn (To-Be)

```
[Trạng thái hiện tại]  →  [Khoảng cách]  →  [Trạng thái mong muốn]
     (As-Is)                  (Gap)                (To-Be)

Ví dụ:
- As-Is: Xử lý đơn hàng thủ công, mất 2 ngày
- To-Be: Hệ thống tự động, xử lý trong 2 giờ
- Gap: Cần phần mềm quản lý đơn hàng tự động
```

---

### Business Model Canvas
> Mô tả toàn bộ mô hình kinh doanh trên 1 trang

9 thành phần:
1. Customer Segments
2. Value Propositions
3. Channels
4. Customer Relationships
5. Revenue Streams
6. Key Resources
7. Key Activities
8. Key Partnerships
9. Cost Structure

---

## Nhóm 2: Thu Thập Yêu Cầu

### Phỏng Vấn (Interviews)
**Loại:**
- Structured — Câu hỏi cố định
- Semi-structured — Có câu hỏi gốc + follow-up linh hoạt *(phổ biến nhất)*
- Unstructured — Trò chuyện tự do

**Tips thực tế:**
- Chuẩn bị câu hỏi trước, gửi agenda cho stakeholder
- Hỏi "Tại sao?" và "Điều gì xảy ra nếu...?" nhiều hơn "Cái gì?"
- Ghi âm (nếu được phép) hoặc ghi chú cẩn thận
- Tránh hỏi leading questions (câu hỏi dẫn dắt)

**Ví dụ câu hỏi hay:**
- "Hãy mô tả cho tôi quy trình bạn đang làm hàng ngày"
- "Điều gì khiến bạn mất nhiều thời gian nhất?"
- "Nếu có thể thay đổi 1 thứ, bạn sẽ thay đổi gì?"

---

### Workshop / JAD Session
**JAD = Joint Application Development**

- Tập hợp nhiều stakeholders vào cùng một phòng
- BA làm facilitator, dẫn dắt thảo luận
- Đưa ra kết quả nhanh hơn phỏng vấn 1-1

**Cấu trúc workshop điển hình:**
```
1. Icebreaker (5 phút)
2. Trình bày mục tiêu (10 phút)
3. Thảo luận nhóm (60 phút)
4. Tổng hợp và đồng thuận (20 phút)
5. Next steps (5 phút)
```

---

### Khảo Sát (Survey)
- Phù hợp khi cần thu thập ý kiến từ nhiều người (>20)
- Dùng Google Forms, SurveyMonkey, Typeform
- Kết hợp câu hỏi đóng (rating) và câu hỏi mở

---

### Quan Sát (Observation)
- BA trực tiếp quan sát người dùng làm việc
- Phát hiện những thứ người dùng không nhận ra hoặc không nói
- **Shadowing:** Theo sát người dùng cả ngày

---

## Nhóm 3: Phân Tích & Mô Hình Hóa

### User Stories
**Format chuẩn:**
```
As a [loại người dùng],
I want [mục tiêu/hành động],
So that [lợi ích/giá trị].
```

**Ví dụ:**
```
As a customer,
I want to view my order history,
So that I can track past purchases and reorder easily.
```

**Acceptance Criteria (Given-When-Then):**
```
Given [điều kiện ban đầu],
When [hành động xảy ra],
Then [kết quả mong muốn].

Ví dụ:
Given I am logged in as a customer,
When I click "Order History",
Then I see a list of all my orders sorted by date descending.
```

---

### Use Case
**Khi nào dùng:** Cần mô tả interaction chi tiết giữa actor và hệ thống

**Cấu trúc Use Case:**
| Trường | Nội dung |
|--------|----------|
| Use Case ID | UC-001 |
| Use Case Name | Đặt hàng online |
| Actor | Khách hàng |
| Precondition | Đã đăng nhập |
| Main Flow | 1. Chọn sản phẩm → 2. Thêm vào giỏ → 3. Thanh toán |
| Alternative Flow | 3a. Thanh toán thất bại → hiện thông báo lỗi |
| Postcondition | Đơn hàng được tạo thành công |

---

### BPMN (Business Process Model and Notation)
**Các ký hiệu cơ bản:**
- ⭕ **Start Event** — Bắt đầu quy trình
- ⬜ **Task/Activity** — Hoạt động cần thực hiện
- ◇ **Gateway** — Điểm phân nhánh (XOR, AND, OR)
- ⭕ **End Event** — Kết thúc quy trình
- → **Sequence Flow** — Luồng thực hiện
- ☐ **Pool/Lane** — Phân chia trách nhiệm

---

### MoSCoW Prioritization
> Phân loại yêu cầu theo mức độ ưu tiên

| Loại | Nghĩa | Ví dụ |
|------|-------|-------|
| **M**ust Have | Bắt buộc phải có, không có thì dự án thất bại | Chức năng đăng nhập |
| **S**hould Have | Quan trọng nhưng không chết nếu thiếu | Forgot password |
| **C**ould Have | Tốt nếu có, ít tác động nếu bỏ | Dark mode |
| **W**on't Have | Không làm trong lần này, xem xét sau | AI chatbot support |

---

### Root Cause Analysis

**5 Whys Technique:**
```
Vấn đề: Khách hàng khiếu nại đơn hàng giao chậm

Tại sao? → Kho xử lý chậm
Tại sao? → Thiếu nhân viên kho
Tại sao? → Nghỉ bệnh đột xuất + không có người thay
Tại sao? → Không có quy trình backup nhân sự
Tại sao? → Management chưa có chính sách này

Root cause: Thiếu chính sách backup nhân sự tại kho
```

**Fishbone Diagram (Ishikawa):**
```
                    [Vấn đề]
                       |
    ┌──────────────────┼──────────────────┐
  People            Process           Technology
    |                  |                  |
  [nguyên nhân]   [nguyên nhân]     [nguyên nhân]
```

---

### Stakeholder Analysis

**Power-Interest Matrix:**
```
High Power │ Manage Closely  │  Keep Satisfied
           │  (Engage often) │  (Regular updates)
───────────┼─────────────────┼────────────────────
Low Power  │   Monitor       │  Keep Informed
           │  (Minimal work) │  (Light updates)
           └─────────────────┴────────────────────
              Low Interest        High Interest
```

**RACI Matrix:**
| Task | BA | Dev | QA | Manager |
|------|----|-----|----|---------|
| Thu thập yêu cầu | **R** | C | C | A |
| Viết User Stories | **R** | C | I | A |
| UAT | **A** | I | **R** | C |

- **R** = Responsible (người làm)
- **A** = Accountable (người chịu trách nhiệm)
- **C** = Consulted (người được hỏi ý kiến)
- **I** = Informed (người được thông báo)

---

### Requirements Traceability Matrix (RTM)

| Req ID | Yêu cầu | Nguồn | Use Case | Test Case | Status |
|--------|---------|-------|----------|-----------|--------|
| BR-001 | Đăng nhập SSO | Stakeholder A | UC-001 | TC-001 | Done |
| BR-002 | Xem lịch sử đơn | User research | UC-005 | TC-012 | In Dev |

---

> 💡 **Tip**: Không phải kỹ thuật nào cũng dùng mọi lúc. Chọn đúng kỹ thuật cho đúng tình huống là kỹ năng quan trọng của BA giỏi.
