const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productdb'
});
db.connect(err => {
    if (err) {
        console.log('connect fail: ', err);
        return;
    }
    console.log('connect success');
})

module.exports = db;