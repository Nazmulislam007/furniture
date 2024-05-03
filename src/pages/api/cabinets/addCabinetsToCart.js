import { TAX_PERCENT } from "@/Context/constant";
import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { products, category_id } = req.body;

  try {
    products?.forEach(async (prod) => {
      const { product_name, product_id, img, price, customerId, quantity, color } = prod;
      const total = price * quantity;
      const subTotal = (total / (quantity + TAX_PERCENT / 100)).toFixed(2);

      if (customerId) {
        const querySql = `
                INSERT INTO customer_cart
                (
                    product_name,
                    category_id,
                    product_id,
                    img,
                    price,
                    sku,
                    color,
                    quantity,
                    subtotal,
                    tax,
                    total,
                    customer_id,
                    contractor_id
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const valueParams = [
          product_name,
          category_id,
          product_id,
          img,
          price,
          "",
          color,
          quantity,
          subTotal,
          TAX_PERCENT,
          total,
          customerId,
          ""
        ];

        await query({ query: querySql, values: valueParams });
      }
    });
    res.status(200).json({ message: "Inserted successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
