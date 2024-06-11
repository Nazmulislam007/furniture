import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/company-logo",
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

export default upload;
