import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const querySql = `
        SELECT logo FROM construction_company
        WHERE
            id = ?
        `;
    const data = await query({ query: querySql, values: [id] });
    res.status(200).json({ logo: data[0].logo });
  } catch (error) {
    console.log(error);
  }
}
