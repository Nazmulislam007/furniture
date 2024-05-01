import { query } from "@/lib/db";

export default async function handler(req, res) {
	try {
		const { id } = req.body;
		if (id) {
			const querySql = "DELETE FROM `user_customers` WHERE `id` = " + id;
			const valueParams = [];
			const data = await query({ query: querySql, values: [valueParams] });
			res.status(200).json({ message: "Customer Deleted" });
		} else {
			res.status(400).json({ message: "Bad Request: Customer ID is missing" });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
