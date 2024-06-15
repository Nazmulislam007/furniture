import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/company-logo",
  filename: (req, file, cb) => cb(null, file.originalname)
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export async function uploadMiddleware(req, res) {
  try {
    const upload = multer({ storage });
    const uploadMiddleware = upload.single("file");
    return await runMiddleware(req, res, uploadMiddleware);
  } catch (error) {
    console.log(error);
  }
}
