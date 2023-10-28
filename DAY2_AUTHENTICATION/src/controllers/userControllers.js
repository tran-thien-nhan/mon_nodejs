// Import mô hình User từ mô-đun models/User.
const User = require("../models/User");

// Định nghĩa hàm xử lý route để lấy danh sách tất cả người dùng từ cơ sở dữ liệu.
const getAllUsers = async (req, res) => {
    // Sử dụng mô hình User để tìm tất cả người dùng trong cơ sở dữ liệu và lưu vào biến "user".
    const user = await User.find({}).exec();

    // Kiểm tra nếu đã thiết lập phiên đăng nhập (req.session.user tồn tại).
    if (req.session.user) {
        // Kiểm tra vai trò của người dùng trong phiên đăng nhập nếu họ là "admin".
        if (req.session.user.role == "admin") {
            // Trả về trang "list" và chuyển danh sách người dùng để hiển thị.
            return res.render('list', { users });
        } else {
            // Nếu người dùng không phải là admin, chuyển hướng đến trang chi tiết người dùng.
            return res.redirect('/user/detail');
        }
    } else {
        // Nếu không có phiên đăng nhập, chuyển hướng đến trang đăng nhập người dùng.
        return res.redirect('/user/login');
    }
}

// Route xử lý khi người dùng yêu cầu trang đăng nhập (GET request).
const getFormLogin = (req, res) => {
    // Hiển thị trang đăng nhập "login" và truyền vào dữ liệu mặc định và lỗi mặc định (null).
    return res.render('login', { data: null, error: null });
}

// Route xử lý khi người dùng gửi biểu mẫu đăng nhập (POST request).
const checkLogin = async (req, res, next) => {
    // Lấy dữ liệu email và password từ biểu mẫu gửi bởi người dùng.
    const { email, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu dựa trên email và password được gửi.
    const user = await User.findOne({ email, password });

    // Kiểm tra nếu tìm thấy người dùng (đúng thông tin đăng nhập).
    if (user) {
        // Lưu thông tin người dùng vào phiên đăng nhập.
        req.session.user = user;

        // Chuyển hướng người dùng đến trang "user".
        return res.redirect('/user');
    } else {
        // Nếu không tìm thấy người dùng (sai thông tin đăng nhập).
        // Hiển thị trang đăng nhập "login" lại với thông báo lỗi và dữ liệu biểu mẫu.
        return res.render('login', { error: 'Error', data: { email, password } });
    }
}

// Xuất một đối tượng chứa các phương thức và route handlers
module.exports = {
    // Route handler để lấy danh sách tất cả người dùng
    getAllUsers,

    // Route handler để hiển thị trang đăng nhập và truyền dữ liệu mặc định và lỗi mặc định
    getFormLogin,

    // Route handler xử lý đăng nhập người dùng
    checkLogin
}

