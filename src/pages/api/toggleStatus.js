import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const { id, status, goto, landingpage_id } = req.body;
    if (id) {
      if (goto != undefined) {
        const querySql = `
        UPDATE construction_company_customer
        SET 
            landingpage_status = ?,
            landingpage_id = ?
        WHERE
            customer_id = ?
        `;

        const values = [goto, landingpage_id, id];

        await query({ query: querySql, values });
      }

      if (status != undefined) {
        const querySql = `
        UPDATE construction_company_customer
        SET 
            status = ?
        WHERE
            customer_id = ?
        `;

        const values = [status, id];

        await query({ query: querySql, values });
      }

      res.status(200).json({ message: "Customer Update Successfully" });
    }
  } catch (error) {
    console.log("error", error);
  }
}
