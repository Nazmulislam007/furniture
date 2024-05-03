import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { customer_id, ids } = req.body;
  try {
    if (customer_id) {
      const querySql = `
                DELETE FROM customer_cart
                WHERE
                    customer_id = ${customer_id} AND product_id IN (${ids})`;

      await query({ query: querySql, values: [] });
      res.status(200).json({ message: "DELETED" });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
