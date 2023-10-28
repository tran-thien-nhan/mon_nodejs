function taskOne(callback) {
    setTimeout(() => {
        // Biến data sẽ có giá trị sau 3 giây
        data = "this is my data";
        callback(data);        
    }, 3000);
}

function taskTwo(value) {
    console.log("data: ", value);
}

// Gọi taskOne và truyền callback taskTwo vào nó
taskOne(taskTwo);
