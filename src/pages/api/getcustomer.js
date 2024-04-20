import { query } from "@/lib/db";

export default async function handler(req, res) {
    try {
        const contractorId = req.body.contractorId;
        if (contractorId) {
            const querySql = "SELECT * FROM `user_customers` WHERE contractor_id = ?";
            const valueParams = [contractorId];
            const customer = await query({ query: querySql, values: [...valueParams] });
            res.status(200).json({ customer });
        } else {
            const querySql = "SELECT * FROM `user_customers`";
            const customer = await query({ query: querySql, values: [] });
            res.status(200).json({ customer });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
