import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { CUSTOMER_ID, category_id } = req.body;
		if (CUSTOMER_ID) {
			const sqlInject = category_id ? " AND category_id = " + category_id : "";
			const querySql =
				"SELECT * FROM customer_cart WHERE customer_id = " +
				CUSTOMER_ID +
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
