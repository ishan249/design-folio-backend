const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },

  filename: function (req, file, cb) {
    const date = new Date();
    cb(null, file.originalname+"" + date.getSeconds());
  },
});

const upload = multer({ storage:storage, limits: { fileSize: 1000000 * 100 } });

module.exports = upload;
