import { query } from "@/lib/db";

export default async function handler(req, res) {
    try {
        const { service, customerId, contractorId, settings } = req.body;
        const categoryResult = await query({
            query: "SELECT id FROM categories WHERE page_name = ?",
            values: [service]
        });
        const category_id = categoryResult[0]?.id;

        if (category_id) {
            const existingServiceCost = await query({
                query: "SELECT * FROM service_cost WHERE category_id = ? AND customer_id = ? AND contractor_id = ?",
                values: [category_id, customerId, contractorId]
            });

            if (existingServiceCost.length > 0) {
                const updateQuery = "UPDATE service_cost SET settings = ? WHERE customer_id = ? AND category_id = ?";
                const updateValues = [JSON.stringify(settings), customerId, category_id];
                await query({ query: updateQuery, values: updateValues });
                res.status(200).json({ message: "updated successfully" });
            } else {
                res.status(200).json({ message: "Please add service costs" });
            }
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
