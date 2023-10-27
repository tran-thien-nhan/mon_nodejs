const express = require('express');
const app = express();
const path = require('path');
const {
    getAllProducts,
    createProduct,
    deleteProduct,
    getOneProduct,
    updateProduct
} = require('./controller/productController');
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    getAllProducts((err, products) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.render('index', { products })
    })
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const data = req.body;
    createProduct(data, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.redirect("/");
    });
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id; 
    getOneProduct(id, (err, result) => {
        if (err) {
            res.status(404).json({ error: "Item not found" });
        } else {
            const product = result[0];
            res.render("edit", { product });
        }
    });
});

app.post('/edit', (req, res) => {
    const data = req.body;
    updateProduct(data, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.redirect("/");
    });
});


app.get('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    // Check if the item exists before deleting
    getOneProduct(itemId, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
            return;
        } else if (result.length === 0) {
            res.status(404).json({ error: "Item not found" });
            return;
        } else {
            deleteProduct(itemId, (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Database error" });
                    return;
                } else {
                    // res.status(200).json({ message: "Item deleted successfully" });
                    res.redirect("/");
                }
            });
        }
    });
});


const PORT = 3000;
app.listen(PORT);