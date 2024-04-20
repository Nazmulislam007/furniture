import { query } from "@/lib/db";
export default async function handler(req, res) {
    try {
        const { id } = req.body;
        let querySql = "";
        if (id) {
            querySql = "SELECT * FROM categories WHERE id = " + id;
        } else {
            querySql = "SELECT * FROM categories";
        }

        const data = await query({ query: querySql, values: [] });
        res.status(200).json({ category: data });
    } catch (error) {
        console.log("error", error);
        // unhide to check error
        // res.status(500).json({ error: error.message });
    }
}
