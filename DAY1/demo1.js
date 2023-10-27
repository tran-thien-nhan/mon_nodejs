// function example() {
//     let x2 = 20; //chạy dc
//     if (true) {
//         var x = 10; //var dùng ở đâu cũng dc
//         // let x = 10; //chỉ dùng trong 1 dấu ngoặc nhọn
//     }
//     console.log(x); //chạy dc
//     console.log(x2); //ko chạy dc
// }
// example();

const http = require('http');
const server = http.createServer();
server.on('request', function (req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world\n');
});
server.on('listening', function (){
    console.log('Server running!');
});
server.listen(3000);
