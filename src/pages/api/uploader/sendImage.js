import { sendFile } from "@/lib/sendFile";

export default async function handler(req, res) {
  const { filename } = req.query;

  try {
    const fileContents = await sendFile(res, filename);
    res.send(fileContents);
  } catch (error) {
    res.status(404).json({ message: "File not found" });
  }
}
