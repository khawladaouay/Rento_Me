import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination function called");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
