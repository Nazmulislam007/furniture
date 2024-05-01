import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `SELECT * FROM cabinets;`;
    const data = await query({ query: querySql, values: [] });
    res.status(200).json({ products: data });
  } catch (error) {
    console.log(`Cabinets fetching error: ${error}`);
  }
}
