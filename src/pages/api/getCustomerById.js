import { query } from "@/lib/db";
export default async function handler(req, res) {
  try {
    const { customerId } = req.query;

    if (customerId) {
      const querySql = "SELECT * FROM user_customers WHERE id = ?";
      const customer = await query({
        query: querySql,
        values: [customerId],
      });
      res.status(200).json({ customer });
    } else {
      res.status(400).json({ message: "Contractor id is required." });
    }
  } catch (error) {
    console.log("error", error);
  }
}
