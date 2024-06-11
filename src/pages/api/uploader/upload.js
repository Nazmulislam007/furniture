import upload from "@/lib/uploader";

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
    const uploadMiddleware = upload.single("file");
    await runMiddleware(req, res, uploadMiddleware);

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