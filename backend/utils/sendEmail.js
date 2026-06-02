const nodemailer = require("nodemailer")

const sendEmail = async ({ email, subject, message }) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.yandex.ru",
			port: 587,
			auth: {
				user: process.env.YANDEX_USER,
				pass: process.env.YANDEX_PASS,
			},
		})

		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: subject,
			text: message,
		}

		await transporter.sendMail(mailOptions)
	} catch (error) {
		throw error
	}
}

module.exports = sendEmail
