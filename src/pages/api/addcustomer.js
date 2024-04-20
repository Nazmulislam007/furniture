import { query } from "@/lib/db";

export default async function handler(req, res) {
    try {
        const { id, contractorId } = req.body;
        const first_name = req.body.first_name || "";
        const last_name = req.body.last_name || "";
        const email = req.body.email || "";
        const phone = req.body.phone || "";
        const address = req.body.address || "";
        const state = req.body.state || "";
        const city = req.body.city || "";
        const note = req.body.note || "";
        const category = req.body.category || "";
        const other = req.body.other || "";
        const page = req.body.page || "";

        if (!contractorId) {
            res.status(401).json({ message: 'You are unauthorized.' });
            return;
        }

        if (id) {
            const querySql = `
                UPDATE user_customers
                SET
                    first_name = ?, 
                    last_name = ?, 
                    email = ?, 
                    phone = ?, 
                    city = ?, 
                    contractor_id = ?, 
                    state = ?, 
                    address = ?, 
                    note = ?, 
                    category = ?, 
                    other = ?, 
                    page = ?
                WHERE id = ?
            `;

            const values = [first_name, last_name, email, phone, city, contractorId, state, address, note, category, other, page, id];

            console.log("querySql", querySql);
            console.log("values", values);

            const data = await query({ query: querySql, values: values });
            res.status(200).json({ data: data.affectedRows,message:"Customer Update Successfully" });
        } else {
            const querySql = `
                INSERT INTO user_customers 
                (first_name, last_name, email, phone, city, contractor_id, state, address, note, category, other, page) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [first_name, last_name, email, phone, city, contractorId, state, address, note, category, other, page];

            console.log("querySql", querySql);
            console.log("values", values);

            const data = await query({ query: querySql, values: values });
            res.status(200).json({ id: data.insertId,message:"Customer Add Successfully" });
        }
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
