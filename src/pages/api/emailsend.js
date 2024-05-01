import { generateEmailContent } from "@/template/ResetPassword";
import { mailOptions, transporter } from "../../config/nodemailer";
const CONTACT_MESSAGE_FIELDS = {
	email: "Email",
	subject: "Subject",
};

const handler = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(400).json({ message: "Bad request" });
	}

	try {
		const data = req.body;
		if (!data || !data.email || !data.subject) {
			return res.status(400).json({ message: "Bad request" });
		}
		await transporter
			.sendMail({
				...mailOptions(data.email),
				...generateEmailContent(data),
				subject: data.subject,
			})
			.then((res) => {})
			.catch((error) => {
				console.log("Error sending email: ", error);
			});
		return res
			.status(200)
			.json({ success: true, message: "Email sent successfully" });
	} catch (err) {
		console.error("Error sending email:", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export default handler;
