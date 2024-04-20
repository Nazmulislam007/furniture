import { query } from "@/lib/db";
export default async function handler(req, res) {
    try {
        const { sign, price, category_id, customerId } = req.body;
        if (customerId) {
            const querySql = "SELECT * FROM my_price WHERE customer_id = " + customerId + " AND category_id = " + category_id;
            const response = await query({ query: querySql, values: [] });
            if (response.length) {
                let updateSql = "UPDATE my_price SET sign = ?, price = ? WHERE category_id = ? AND customer_id = ?";
                const valueParams = [sign, price, category_id, customerId];
                const data = await query({ query: updateSql, values: valueParams });
                res.status(200).json({ data });
            } else {
                let insertSql = "INSERT INTO my_price (`id`, `sign`, `price`, `category_id`, `customer_id`) VALUES (?,?,?,?,?)";
                const valueParams = [null, sign, price, category_id, customerId];
                const data = await query({ query: insertSql, values: valueParams });
                console.log("data", data);
                res.status(200).json({ data });
            }
        } else {
            let insertSql = "INSERT INTO my_price (`id`, `sign`, `price`, `category_id`, `customer_id`) VALUES (?,?,?,?,?)";
            const valueParams = [null, sign, price, category_id, customerId];
            const data = await query({ query: insertSql, values: valueParams });
            console.log("data", data);
            res.status(200).json({ data });
        }
    } catch (error) {
        console.log("error", error);
    }
}
