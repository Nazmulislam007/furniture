import uploadPackage from "@/lib/multer";

export const config = {
  api: {
    bodyParser: false
  }
};

const storage = uploadPackage.diskStorage({
  destination: "./public/company-logo",
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = uploadPackage({ storage });

const uploadMiddleware = upload.single("file");

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, uploadMiddleware);

    res.status(200).json({ data: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: `Upload failed: ${error.message}` });
  }
}
