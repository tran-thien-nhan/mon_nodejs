const db = require("../db");

function getAllProducts(callback) {
    const sql = "SELECT * FROM producttb";
    db.query(sql, callback);
}

function createProduct(product, callback) {
    const sql = "INSERT INTO producttb (name, price, description) VALUES (?, ?, ?)";
    const { name, price, description } = product;
    db.query(sql, [name, price, description], callback);
}

function deleteProduct(id, callback) {
    const sql = "DELETE FROM producttb WHERE id = ?";
    db.query(sql, [id], callback);
}

function getOneProduct(id, callback) {
    const sql = "SELECT * FROM producttb WHERE id = ?"
    db.query(sql, [id], callback);
}

function updateProduct(data, callback) {
    const sql = "UPDATE producttb SET name = ?, price = ?, description = ? WHERE id = ?";
    const { name, price, description, id } = data;
    db.query(sql, [name, price, description, id], callback);
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    getOneProduct,
    updateProduct
};
