const multer = require("multer");

//Creating storage in uploads folder where photos will be uploaded and assigning file name

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage:storage, limits: { fileSize: 1000000 * 20 } });

module.exports = upload;
