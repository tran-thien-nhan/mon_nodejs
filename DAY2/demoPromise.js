function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "this is data from server";
            resolve(data);
        }, 2000);
    })
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const processData = data.toUpperCase();
            resolve(processData);
        }, 2000);
    })
}

function displayResult(result) {
    console.log("data: ", result);
}

//sử dụng middleware
fetchData()
    .then(function (data) {
        return processData(data);
    })
    .then(function (processData) {
        return displayResult(processData);
    })
    .catch(function (error) {
        console.log("error: ", error);
    })

// Mã này sử dụng Promises trong JavaScript để thực hiện một chuỗi các tác vụ bất đồng bộ theo thứ tự nhất định. Dưới đây là cách hoạt động của mã:

// fetchData: Hàm này tạo một Promise, sau đó sau 2 giây, nó giải quyết (resolve) Promise với một chuỗi data giả lập.

// processData: Hàm này cũng tạo một Promise, sau đó sau 2 giây, nó giải quyết (resolve) Promise với dữ liệu data được chuyển đổi thành viết hoa (uppercase).

// displayResult: Hàm này đơn giản là in ra giá trị được truyền vào trong console.

// Sử dụng middleware: Khi bạn gọi fetchData(), nó trả về một Promise. Bạn sau đó gắn vào đó một chuỗi .then() để xử lý kết quả khi Promise được giải quyết.

// Trong .then() đầu tiên, bạn lấy data từ kết quả giải quyết của fetchData(), và sau đó bạn gọi processData(data) để xử lý nó. Promise này sau đó trả về processData.

// Trong .then() thứ hai, bạn lấy kết quả từ processData và gọi displayResult(processData) để in ra giá trị chữ hoa.

// Nếu có lỗi xảy ra trong quá trình thực hiện bất kỳ hàm Promise nào, hàm .catch() sẽ được gọi để xử lý lỗi.

// Dưới đây là luồng hoạt động tổng quan của mã:

// Gọi fetchData() để tải dữ liệu từ máy chủ sau 2 giây.
// Khi dữ liệu đã được tải xong, processData() được gọi để xử lý dữ liệu sau 2 giây nữa.
// Sau khi dữ liệu được xử lý, displayResult() được gọi để in kết quả ra console.
// Nếu có lỗi nào xảy ra trong quá trình này, hàm .catch() sẽ được gọi để xử lý lỗi đó.



