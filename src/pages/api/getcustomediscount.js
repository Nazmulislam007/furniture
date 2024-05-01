import { PLEASE_LOGIN } from "@/Context/constant";
import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { customerId } = req.body;
		if (customerId) {
			const querySql =
				"SELECT * FROM `custom_discount` WHERE customer_id = " + customerId;
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
