import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { id, my_price } = req.body;
		if (id) {
			var querySql = "UPDATE `customer_cart` SET my_price = ? WHERE id = ?";
			const valueParams = [my_price, id];
			const data = await query({ query: querySql, values: valueParams });
			res.status(200).json({ id: data.insertId });
		} else {
			res.status(401).json({ message: "Id not found!" });
		}
	} catch (error) {
		console.log("error", error);
	}
}
