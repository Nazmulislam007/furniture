import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { customerId, category_id } = req.body;
		if (customerId) {
			const sqlInject = category_id
				? " AND custom_line_items.category_id = " + category_id
				: "";
			const querySql =
				"SELECT custom_line_items.*, categories.page_name as service FROM `custom_line_items` LEFT JOIN `categories` ON custom_line_items.category_id = categories.id WHERE custom_line_items.customer_id = " +
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
