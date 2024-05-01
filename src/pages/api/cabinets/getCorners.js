import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { corner_id } = req.query;
  try {
    const querySql = `SELECT * FROM corner WHERE corner.corner_id = ${corner_id}`;
    const data = await query({ query: querySql, values: [] });
    res.status(200).json({ corner: data?.[0] });
  } catch (error) {
    console.log(`Database get drawer error: ${error}`);
  }
}
