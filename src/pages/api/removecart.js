import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { Id, field } = req.body;
		if (Id) {
			const querySql = "DELETE FROM customer_cart WHERE " + field + " = " + Id;
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
