import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { id, fileName } = req.body;

  try {
    const querySql = `
        UPDATE construction_company
        SET
            logo = ?
        WHERE
            id = ?
        `;
    const data = await query({ query: querySql, values: [fileName, id] });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
