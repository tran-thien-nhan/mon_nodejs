const fs = require('fs');
const Laptop = require('../models/Laptop');

const getAllLaptop = async (req, res) => {
    const laptops = await Laptop.find({});
    res.render('list', { laptops });
}

const getFormCreate = (req, res) => {
    res.render('create', { data: null, errors: null });
}

const createLaptop = async (req, res) => {
    let { name, price, } = req.body;
    let imageUrl = req.file ? `/upload/${req.file.filename}` : '';
    const dataSubmit = {
        name: name,
        price: price,
        image: imageUrl
    }
    await Laptop.create(dataSubmit)
        .then(result => {
            req.session.message = "Laptop created successfully";
            res.redirect('/laptop');
        })
        .catch(err => {
            let errors = {};
            if (err.title === 'ValidationError') {
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('/create', { errors, data: dataSubmit });
            }
        })
}

const viewUpdateLaptop = async (req, res) => {
    const { id } = req.params;
    await Laptop.findById(id)
        .then(result => {
            res.render('update', { errors: null, data: result });
        })
        .catch(err => {
            res.redirect("/laptop");
        })
}

const updateLaptop = async (req, res) => {
    const { id, name, price, current_image } = req.body;
    let imageUrl = current_image; // Mặc định là current_image

    if (req.file) {
        imageUrl = `/upload/${req.file.filename}`;
    }

    try {
        const laptop = await Laptop.findOneAndUpdate(
            { _id: id }, // Tìm sản phẩm dựa trên _id
            {
                name,
                price,
                image: imageUrl
            },
            { new: true, runValidators: true }
        );

        if (!laptop) {
            return res.status(404).json({ error: 'laptop not found' });
        }

        req.session.message = "laptop updated successfully";
        console.log(laptop);
        res.redirect("/laptop");
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.render('/update', { errors, data: req.body });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteLaptop = async (req, res) => {
    const { id } = req.params;
    await Laptop.findByIdAndDelete(id)
        .then(result => {
            //kt có hình ảnh mới xóa
            if (result.image != '') {
                try {
                    fs.unlinkSync('./src/public/' + result.image);
                } catch (error) {
                    console.log(err);
                }
            }
            req.session.message = "laptop deleteed successfully";
            res.redirect('/laptop');
        })
        .catch(err => {
            console.log("error delete: ", err);
        })
}

const sortBookName = async (req, res) => {
    try {
        const laptops = await Laptop.find({}).sort({ name: 1 }); // 1 cho tăng, -1 cho giảm
        res.render('sort', { laptops });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const searchLaptopByPrice = async (req, res) => {
    try {
        const giabatdau = req.query.giabatdau; // Lấy giá bắt đầu từ query parameters
        const giaketthuc = req.query.giaketthuc; // Lấy giá kết thúc từ query parameters

        // Sử dụng giabatdau và giaketthuc để tìm kiếm laptop
        const laptops = await Laptop.find({
            price: { $gte: giabatdau, $lte: giaketthuc }
        });

        if (laptops.length > 0) {
            res.render('search', { laptops, giabatdau, giaketthuc });
        } else {
            req.session.message = "laptops not found";
            res.render('search', { laptops, giabatdau, giaketthuc });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllLaptop, getFormCreate, createLaptop, viewUpdateLaptop, updateLaptop, deleteLaptop, sortBookName, searchLaptopByPrice
}