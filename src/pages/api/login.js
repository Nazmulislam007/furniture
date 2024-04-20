import { query } from "@/lib/db";
export default async function handler(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            var querySql = "SELECT * FROM `user_contractors` WHERE email=? AND password=?";
            const valueParams = [email, password];
            const data = await query({ query: querySql, values: valueParams });
            if (data.length > 0) {
                res.status(200).json({ data: data[0] });
            } else {
                res.status(404).json({ message: "Wrong Email or Password" });
            }
        } else {
            res.status(400).json({ message: "Please Enter Email and Password" });
        }
    } catch (error) {
        console.log("error", error);
    }
}
