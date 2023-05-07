const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    console.log("file mimetype is :", file.mimetype);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true)
    } else {
      console.log("Only jpg and png files are supported");
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }

})

module.exports = upload