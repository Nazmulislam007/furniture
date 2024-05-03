import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `SELECT * FROM customer_cart
                      WHERE category_id = 8`;
    const data = await query({ query: querySql, values: [] });
    res.status(200).json({ handles: data });
  } catch (error) {
    console.log(`Get hanles errors: ${error}`);
  }
}
