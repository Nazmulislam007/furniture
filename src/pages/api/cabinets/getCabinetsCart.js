import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const { customerId } = req.query;

    const arr = [];

    Object.values(req.query).forEach((q) => {
      if (q) arr.push(`'${q}'`);
    });

    if (customerId) {
      const querySql = `SELECT *, ROUND(price, 2) AS price FROM customer_cart 
                        WHERE customer_id = ${customerId} 
                        AND category_id = 7
                        AND product_id IN (${arr});`;

      const data = await query({ query: querySql, values: [] });
      res.status(200).json({ cabinets: data });
    } else {
      res.status(401).json({ message: PLEASE_LOGIN });
    }
  } catch (error) {
    console.log("error", error);
  }
}
