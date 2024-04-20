import { query } from "@/lib/db";
export default async function handler(req, res) {
    try {
        const { id, customerId, categoryId } = req.body
        console.log(" req.body", req.body);
        if (req.body) {
            let querySql = "DELETE FROM `custom_line_items` "
            if (customerId && categoryId) {
                querySql += " WHERE `customer_id` = " + customerId + " AND category_id=" + categoryId;
            } else {
                querySql += " WHERE `id` = " + id;
            }
            console.log("querySql", querySql)
            const valueParams = [];
            const data = await query({ query: querySql, values: [valueParams] });
            res.status(200).json({ products: data });
        } else {
            res.status(401).json({ message: "id not found!" });
        }
    } catch (error) {
        console.log("error", error);
    }
}
