const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/public/upload');
    },
    fileName: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage
});

module.exports = upload;