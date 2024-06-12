import { uploadMiddleware } from "@/lib/uploader";

export default async function handler(req, res) {
  try {
    await uploadMiddleware(req, res);
    res.status(200).json({ message: "file uploaded" });
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, since we will handle it using multer
  }
};
