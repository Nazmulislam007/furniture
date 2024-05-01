import { query } from "@/lib/db";

export default async function handler(req, res) {
	try {
		const { password, email } = req.body;

		if (!password || !email) {
			return res.status(400).json({ error: "Invalid input" });
		}

		const sqlQry = `
            UPDATE user_contractors
            SET password = ?
            WHERE email = ?;
        `;

		const result = await query({ query: sqlQry, values: [password, email] });

		if (result.affectedRows === 1) {
			return res
				.status(200)
				.json({ success: true, message: "Password updated successfully" });
		} else {
			return res.status(404).json({ error: "User not found" });
		}
	} catch (err) {
		console.error("Error updating password:", err);
		return res.status(500).json({ error: "Internal server error" });
	}
}
