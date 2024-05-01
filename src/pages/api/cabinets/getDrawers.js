import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { drawer_id } = req.query;
  try {
    const querySql = `SELECT * FROM drawer WHERE drawer.drawer_id = ${drawer_id}`;
    const data = await query({ query: querySql, values: [] });
    res.status(200).json({ drawer: data?.[0] });
  } catch (error) {
    console.log(`Database get drawer error: ${error}`);
  }
}
