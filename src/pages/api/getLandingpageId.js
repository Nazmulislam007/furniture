import { query } from "@/lib/db";

export default async function handler(req, res) {
	const { customer_id } = req.query;
	try {
		const querySql = `
    SELECT status, landingpage_id, landingpage_status AS goto 
    FROM construction_company_customer ccc
    where ccc.customer_id = ${customer_id}`;
		const data = await query({ query: querySql, values: [] });
		res.status(200).json(data);
	} catch (error) {
		console.log("Get landing page error :" + error);
	}
}
