import React from "react"
import { Link } from "react-router-dom"

const OrderSuccess = () => {
	const containerStyle = {
		maxWidth: "600px",
		margin: "50px auto",
		padding: "50px 30px",
		background: "#18181b",
		borderRadius: "16px",
		border: "1px solid rgba(255, 255, 255, 0.05)",
		boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
		textAlign: "center",
	}

	return (
		<div style={containerStyle}>
			<h2
				style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#10b981" }}>
				Оплата Успешна!
			</h2>
			<p style={{ color: "#a1a1aa", fontSize: "1.2rem", marginBottom: "40px" }}>
				Благодарим вас за ваш заказ. Мы получили ваш платеж и в ближайшее время
				обработаем ваш заказ.
			</p>
			<Link
				to='/shop'
				className='btn'>
				Продолжить покупки
			</Link>
		</div>
	)
}

export default OrderSuccess
