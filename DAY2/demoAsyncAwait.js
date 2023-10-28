async function taskOne() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("task one is running");
            resolve();
        }, 2000)
    })
}

async function taskTwo() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("task two is running");
            resolve();
        }, 2000)
    })
}

async function taskThree() {
    console.log("task three is running");
}

async function runTask() {
    try {
        await taskOne();
        taskTwo();
        taskThree();
    } catch (error) {
        console.log("error: ", error);
    }
}

runTask();

// Đoạn code trên sử dụng JavaScript và async/await để thực hiện một loạt các tác vụ bất đồng bộ (asynchronous tasks) theo thứ tự sau:

// taskOne(): Một hàm async đại diện cho tác vụ số 1. Tác vụ này sẽ in ra dòng "task one is running" sau 2 giây (2000 miligiây) sử dụng setTimeout. Sau khi hoàn thành tác vụ, hàm này sẽ trả về một Promise đã giải quyết (resolved Promise) bằng cách gọi resolve().

// taskTwo(): Tương tự như taskOne(), đây là tác vụ số 2. Nó sẽ in ra dòng "task two is running" sau 2 giây. Tác vụ này cũng trả về một Promise đã giải quyết sau khi hoàn thành.

// taskThree(): Đây là tác vụ số 3. Nó đơn giản chỉ in ra dòng "task three is running". Không có sử dụng await hoặc Promise trong tác vụ này, nên nó không đợi bất kỳ thời gian nào và hoàn thành ngay lập tức.

// runTask(): Đây là hàm chạy tất cả các tác vụ. Nó sử dụng await để chờ tác vụ taskOne() hoàn thành trước khi tiếp tục. Sau đó, nó gọi taskTwo() và taskThree() mà không sử dụng await. Điều này có nghĩa là tác vụ taskTwo() và taskThree() sẽ được bắt đầu chạy ngay lập tức mà không chờ taskOne() hoàn thành.

// Cuối cùng, nếu bất kỳ tác vụ nào gây ra lỗi (thông qua Promise bị từ chối), lỗi sẽ được xử lý trong khối try...catch, và thông báo lỗi sẽ được in ra màn hình. Trong trường hợp này, tất cả các tác vụ đều thành công và không gây ra lỗi, vì vậy không có thông báo lỗi nào được in ra.