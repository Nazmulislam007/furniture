import { query } from "@/lib/db";

export default async function handler(req, res) {
  const { customer_id } = req.query;
  try {
    const querySql = `
    SELECT cc.url, ccc.customer_id, ccc.landingpage_id
    FROM construction_company cc
    INNER JOIN construction_company_customer ccc 
    ON cc.id = ccc.company_id
    where ccc.customer_id = ${customer_id}`;
    const data = await query({ query: querySql, values: [] });
    res.status(200).json(data);
  } catch (error) {
    console.log(`Get unique url error :${error}`);
  }
}
