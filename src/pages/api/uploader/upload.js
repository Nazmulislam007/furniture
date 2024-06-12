import { uploadMiddleware } from "@/lib/uploader";

export default async function handler(req, res) {
  try {
    await uploadMiddleware(req,res)
    res.status(200).json({ data: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: `Upload failed: ${error.message}` });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};