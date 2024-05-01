import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { customerId, selected } = req.body;
		if (customerId) {
			const sqlInject = selected ? " " : "";
			const querySql =
				"SELECT customer_cart.*, categories.url as type FROM customer_cart LEFT JOIN `categories` ON categories.id = customer_cart.category_id WHERE customer_id  = " +
				customerId +
				sqlInject;
			const valueParams = [];
			const data = await query({ query: querySql, values: [valueParams] });
			res.status(200).json({ data });
		} else {
			res.status(401).json({ message: PLEASE_LOGIN });
		}
	} catch (error) {
		console.log("error", error);
		// unhide to check error
		// res.status(500).json({ error: error.message });
	}
}
