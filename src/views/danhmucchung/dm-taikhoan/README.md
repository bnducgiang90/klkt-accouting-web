# Quản lý Tài khoản

## Tổng quan
Module quản lý tài khoản cho phép thực hiện các thao tác CRUD (Create, Read, Update, Delete) với dữ liệu tài khoản kế toán.

## Các tính năng chính

### 1. Danh sách tài khoản
- Hiển thị danh sách tài khoản dạng bảng
- Tìm kiếm theo số hiệu tài khoản hoặc tên tài khoản
- Phân trang
- Hiển thị trạng thái hoạt động/vô hiệu

### 2. Thêm mới tài khoản
- Form popup với các trường thông tin:
  - MST (bắt buộc)
  - Số hiệu TK (bắt buộc)
  - Tên tài khoản (bắt buộc)
  - Dư nợ đầu kỳ
  - Dư có đầu kỳ
  - Ghi chú

### 3. Chỉnh sửa tài khoản
- Form popup tương tự thêm mới
- Tự động điền dữ liệu hiện tại
- Validation các trường bắt buộc

### 4. Xem chi tiết tài khoản
- Dialog hiển thị đầy đủ thông tin tài khoản
- Layout dạng descriptions với 2 cột
- Hiển thị trạng thái bằng tag màu
- Hiển thị ngày tạo và cập nhật

### 5. Vô hiệu hóa/Kích hoạt tài khoản
- Confirm dialog trước khi thực hiện
- Thay đổi trạng thái từ hoạt động sang vô hiệu và ngược lại
- Button tự động thay đổi text và màu sắc theo trạng thái

## Cấu trúc file

```
dm-taikhoan/
├── index.vue                 # Component chính
└── components/
    ├── AccountForm.vue       # Form thêm/sửa tài khoản
    └── AccountDetail.vue     # Dialog chi tiết tài khoản
```

## API Endpoints

- `POST /dm/search` - Tìm kiếm tài khoản
- `POST /dm/create` - Tạo mới tài khoản
- `PUT /dm/update` - Cập nhật tài khoản

## Sử dụng

### Import components
```javascript
import AccountForm from './components/AccountForm.vue';
import AccountDetail from './components/AccountDetail.vue';
```

### Props cho AccountForm
- `visible`: Boolean - Hiển thị/ẩn dialog
- `isEdit`: Boolean - Chế độ chỉnh sửa
- `accountData`: Object - Dữ liệu tài khoản (cho edit)

### Events cho AccountForm
- `success`: Khi lưu thành công
- `close`: Khi đóng dialog

### Props cho AccountDetail
- `visible`: Boolean - Hiển thị/ẩn dialog
- `accountData`: Object - Dữ liệu tài khoản

### Events cho AccountDetail
- `close`: Khi đóng dialog

## Validation

### Trường bắt buộc
- MST
- Số hiệu TK
- Tên tài khoản

### Format dữ liệu
- Dư nợ đầu kỳ, Dư có đầu kỳ: Số nguyên >= 0
- Ghi chú: Text (tùy chọn)

## Responsive
- Dialog width: 600px
- Table responsive với scroll ngang
- Font size tự động điều chỉnh theo màn hình

## Đặc điểm

### Hiển thị số tiền
- Dư nợ: Màu đỏ (#f56c6c)
- Dư có: Màu xanh (#67c23a)
- Format theo định dạng tiền tệ Việt Nam

### Trạng thái
- Hoạt động: Tag màu xanh
- Vô hiệu: Tag màu đỏ

### Button actions
- Disable: Button màu đỏ với icon delete
- Enable: Button màu xanh với icon check
- Edit: Luôn được enable 