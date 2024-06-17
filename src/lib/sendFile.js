import { promises as fs } from "fs";
import path from "path";

export async function sendFile(res, filename) {
  try {
    const filePath = path.join(process.cwd(), "/src/assets/company-logo", filename);
    const fileContents = await fs.readFile(filePath);
    const fileExt = path.extname(filename).substring(1);
    res.setHeader("Content-Type", `image/${fileExt}`);

    return fileContents;
  } catch (error) {
    console.log(error);
  }
}
