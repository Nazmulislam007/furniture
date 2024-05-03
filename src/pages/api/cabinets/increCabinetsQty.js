import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const { quantity, price, subtotal, customer_id, action, product_id, category_id } = req.body;

    const total = price * quantity;
    const subTotal = 0;
    // action === "increment"
    //   ? (total / (quantity + TAX_PERCENT / 100)).toFixed(2) + subtotal
    //   : subtotal - (total / (quantity + TAX_PERCENT / 100)).toFixed(2);

    if (customer_id) {
      const querySql = `
          UPDATE customer_cart
          SET 
              quantity = ?,
              total = ?,
              subtotal = ?
          WHERE
              customer_id = ?
          AND 
              product_id = ?
          AND 
              category_id = ?;
          `;

      const values = [quantity, total, subTotal, customer_id, product_id, category_id];

      await query({ query: querySql, values });

      res.status(200).json({ message: "Customer Cart Update Successfully" });
    }
  } catch (error) {
    console.log("error", error);
  }
}
