# 11 - UML Diagrams Dành Cho BA

## UML là gì?

**UML (Unified Modeling Language)** là ngôn ngữ đồ họa chuẩn để mô hình hóa hệ thống phần mềm. BA dùng UML để **trực quan hóa yêu cầu** — giúp dev và stakeholders hiểu hệ thống dễ hơn.

> BA không cần biết tất cả 14 loại UML diagram — chỉ cần thành thạo **6 loại** dùng thường xuyên nhất.

---

## 6 Loại Diagram BA Dùng Thường Xuyên

---

## 1. Use Case Diagram

**Mục đích:** Mô tả **ai** làm **gì** với hệ thống.

**Ký hiệu:**
```
[Actor]  ──────  ( Use Case )
  │                    │
 Người dùng      Chức năng hệ thống
```

**Ví dụ — Hệ thống E-commerce:**
```
                  ┌─────────────────────────────┐
                  │       E-Commerce System      │
 [Customer] ───── │ (Browse Products)            │
     │            │ (Add to Cart)                │
     │            │ (Checkout)                   │
     └──────────  │ (View Order History)         │
                  │                              │
 [Admin] ──────── │ (Manage Products)            │
     │            │ (Manage Orders)              │
     └──────────  │ (Generate Reports)           │
                  └─────────────────────────────┘
```

**Relationships:**
- `<<include>>` — Bao gồm use case khác (bắt buộc)
- `<<extend>>` — Mở rộng use case (tùy chọn)
- Generalization — Kế thừa giữa actors

**Dùng khi:** Trình bày scope hệ thống cho stakeholders, xác định actors

---

## 2. Activity Diagram

**Mục đích:** Mô tả **luồng hoạt động / quy trình** (tương tự BPMN).

**Ký hiệu:**
```
● ──→ [Action] ──→ ◇ ──→ [Action A]
Start           Decision   (if Yes)
                    │
                    └──→ [Action B]
                           (if No)
                              │
                              ▼
                           ◉ End
```

**Ví dụ — Quy trình đặt hàng:**
```
     ●
     │
[Khách hàng thêm vào giỏ]
     │
[Khách hàng checkout]
     │
◇ Có đủ hàng?
  │ Yes              │ No
  ▼                  ▼
[Xử lý thanh toán]  [Thông báo hết hàng]
  │                  │
◇ Thanh toán OK?     ●
  │ Yes    │ No
  ▼        ▼
[Tạo đơn] [Báo lỗi]
  │
  ◉
```

**Dùng khi:** Mô tả quy trình nghiệp vụ phức tạp có nhiều nhánh điều kiện

---

## 3. Sequence Diagram

**Mục đích:** Mô tả **thứ tự tương tác** giữa các thành phần theo thời gian.

**Ký hiệu:**
```
Actor/Object    System A      System B      Database
    │               │             │             │
    │──request()───>│             │             │
    │               │──call()────>│             │
    │               │             │──query()───>│
    │               │             │<──result()──│
    │               │<──response()│             │
    │<──display()───│             │             │
```

**Ví dụ — Đăng nhập:**
```
User        Browser        Auth API       Database
 │              │               │              │
 │──Enter creds─>│              │              │
 │              │──POST /login─>│              │
 │              │               │──Find user──>│
 │              │               │<──user data──│
 │              │               │──Verify pwd  │
 │              │<──JWT token───│              │
 │<──Redirect───│               │              │
```

**Dùng khi:** Mô tả API integration, luồng xác thực, tương tác phức tạp giữa hệ thống

---

## 4. Class Diagram

**Mục đích:** Mô tả **cấu trúc dữ liệu** và quan hệ giữa các entities.

**Ký hiệu:**
```
┌──────────────┐
│   ClassName  │  ← Tên class
├──────────────┤
│ - attribute1 │  ← Attributes (- private, + public)
│ + attribute2 │
├──────────────┤
│ + method1()  │  ← Methods
│ + method2()  │
└──────────────┘
```

**Ví dụ — E-commerce:**
```
┌──────────┐         ┌──────────────┐        ┌──────────┐
│  Customer │         │    Order     │        │  Product │
├──────────┤  1   *  ├──────────────┤  *  *  ├──────────┤
│ id       │────────>│ id           │<───────│ id       │
│ name     │         │ customerId   │        │ name     │
│ email    │         │ status       │        │ price    │
│ phone    │         │ createdAt    │        │ stock    │
└──────────┘         │ totalAmount  │        └──────────┘
                     └──────────────┘
```

**Relationships:**
- Association: `─────` (có liên quan)
- Aggregation: `◇────` (has-a, lỏng)
- Composition: `◆────` (has-a, chặt, phụ thuộc vòng đời)
- Inheritance: `────▷` (is-a)

**Dùng khi:** BA cần mô tả data model cho dev team, làm rõ quan hệ giữa entities

---

## 5. State Diagram (State Machine)

**Mục đích:** Mô tả **các trạng thái** của một object và điều kiện chuyển trạng thái.

**Ký hiệu:**
```
● ──→ [State A] ──event/action──→ [State B] ──→ ◉
```

**Ví dụ — Trạng thái đơn hàng:**
```
        ●
        │
   [Pending]
        │ Thanh toán thành công
        ▼
  [Confirmed]
        │ Kho xác nhận
        ▼
  [Processing]
        │ Giao cho vận chuyển
        ▼
  [Shipped]
        │ Giao thành công
        ▼
 [Delivered] ──→ ◉

Từ bất kỳ state nào:
   ──→ Khách hủy ──→ [Cancelled] ──→ ◉
   ──→ Hoàn trả  ──→ [Refunded]  ──→ ◉
```

**Dùng khi:** Mô tả lifecycle của entity phức tạp (đơn hàng, ticket, user account...)

---

## 6. Component Diagram

**Mục đích:** Mô tả **kiến trúc hệ thống** ở mức cao — các thành phần và cách chúng kết nối.

**Ví dụ:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────>│  Backend    │────>│  Database   │
│  (React)    │ API │  (Node.js)  │     │  (MySQL)    │
└─────────────┘     └─────────────┘     └─────────────┘
                            │
                    ┌───────┴────────┐
                    │  External APIs │
                    │  - Payment GW  │
                    │  - Email Svc   │
                    │  - SMS Svc     │
                    └────────────────┘
```

**Dùng khi:** Trình bày kiến trúc tổng thể cho stakeholders, planning integration

---

## Entity Relationship Diagram (ERD)

Không thuộc UML nhưng BA dùng rất nhiều — mô tả **cấu trúc database**.

**Ký hiệu Crow's Foot:**
```
||────||   One to One
||────<    One to Many
>────<     Many to Many
○           Zero or one
||          Exactly one
<           One or many
○<          Zero or many
```

**Ví dụ:**
```
[Customer] ||────|< [Order] >|────|| [Product]
                      ||
                      |< [OrderItem]
```

---

## Chọn Diagram Đúng Theo Tình Huống

| Tình huống | Diagram phù hợp |
|------------|----------------|
| Trình bày scope hệ thống | Use Case Diagram |
| Mô tả quy trình nghiệp vụ | Activity Diagram / BPMN |
| Mô tả luồng API, integration | Sequence Diagram |
| Mô tả cấu trúc dữ liệu | Class Diagram / ERD |
| Mô tả vòng đời của entity | State Diagram |
| Trình bày kiến trúc hệ thống | Component Diagram |
| Mô tả người dùng và use cases | Use Case Diagram |

---

## Công Cụ Vẽ UML

| Công cụ | Ưu điểm | Nhược điểm |
|---------|---------|-----------|
| **draw.io** | Miễn phí, đầy đủ shapes | Cần vẽ tay |
| **Lucidchart** | Dễ dùng, cộng tác tốt | Tốn phí |
| **PlantUML** | Code thành diagram, version control được | Phải học syntax |
| **Mermaid** | Tích hợp Markdown/GitHub | Hạn chế styling |
| **Sparx EA** | Professional, đầy đủ nhất | Đắt tiền |

### Mermaid ví dụ (dùng trong Confluence, GitHub):
```
sequenceDiagram
    User->>Browser: Enter credentials
    Browser->>API: POST /login
    API->>Database: Query user
    Database-->>API: User data
    API-->>Browser: JWT token
    Browser-->>User: Redirect to dashboard
```

---

> 💡 **Thực tế**: BA không cần vẽ diagram hoàn hảo về mặt kỹ thuật — quan trọng là diagram **truyền đạt đúng thông tin** cho đúng đối tượng. Một sơ đồ đơn giản dễ hiểu luôn tốt hơn sơ đồ phức tạp đúng chuẩn nhưng không ai đọc được.
