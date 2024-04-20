import { TAX_PERCENT } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
    try {
        const { id, quantity, total } = req.body;

        const subTotal = (total / (quantity + TAX_PERCENT / 100)).toFixed(2)
        if (id) {
            const updateCustomerCartQuery = `
            UPDATE customer_cart
            SET quantity = ?, total = ?, subtotal = ?
            WHERE id = ?
          `;
            const valueParams = [quantity, total, subTotal, id];
            const data = await query({ query: updateCustomerCartQuery, values: valueParams });
            res.status(200).json({ id: data.insertId });
        } else {
            res.status(401).json({ message: "Id not found!" });
        }
    } catch (error) {
        console.log("error", error);
    }
}
