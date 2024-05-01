import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { customerId, category_id } = req.body;
		if (customerId) {
			const sqlInject = category_id
				? " AND service_cost.category_id = " + category_id
				: "";
			const querySql =
				"SELECT service_cost.*, categories.page_name as service FROM `service_cost` LEFT JOIN `categories` ON service_cost.category_id = categories.id WHERE service_cost.customer_id = " +
				customerId +
				sqlInject;
			// + "AND service_cost.contractor_id = " + customerId
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
