import { query } from "@/lib/db";
export default async function handler(req, res) {
	try {
		const { id, name, value, type, customerId, contractorId } = req.body;
		var productSql = "SELECT * FROM `categories` WHERE `url` = '" + type + "'";
		let product = await query({ query: productSql, values: [] });
		product = product.find((x) => x.url === type);
		if (product?.id) {
			if (id) {
				var querySql =
					"UPDATE `custom_line_items` SET `name` = '" +
					name +
					"' , `price` = '" +
					Number.parseFloat(value) +
					"' WHERE `id` = '" +
					id +
					"'";
				const valueParams = [];
				const data = await query({ query: querySql, values: valueParams });
				res.status(200).json({ id: data.insertId });
			} else {
				var querySql =
					"INSERT INTO custom_line_items (`name`, `category_id`, `customer_id`, `contractor_id`, `price`) VALUES (?,?,?,?,?)";
				const valueParams = [
					name,
					product?.id,
					customerId,
					contractorId,
					value,
				];
				const data = await query({ query: querySql, values: valueParams });
				res.status(200).json({ id: data.insertId });
			}
		} else {
			res.status(400).json({ message: "Something getting wrong." });
		}
	} catch (error) {
		console.log("error", error);
	}
}
