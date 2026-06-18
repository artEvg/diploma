import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

const Profile = () => {
	const { user, logout } = useContext(AuthContext)
	const navigate = useNavigate()
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const API_URL = process.env.REACT_APP_BACKEND_BASEURL

	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}
		const fetchMyOrders = async () => {
			try {
				const res = await fetch(`${API_URL}/api/orders/myorders`, {
					headers: { Authorization: `Bearer ${user.token}` },
				})
				const data = await res.json()
				if (res.ok) {
					setOrders(Array.isArray(data) ? data : [])
				} else {
					// Token obsolete or 401: clear and bounce
					if (res.status === 401) {
						logout()
						navigate("/login")
					}
					setOrders([])
				}
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchMyOrders()
	}, [user, navigate])

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	const containerStyle = {
		maxWidth: "1000px",
		margin: "40px auto",
		padding: "30px",
		background: "#18181b",
		borderRadius: "12px",
		border: "1px solid rgba(255,255,255,0.05)",
		color: "#fafafa",
	}
	const badgeStyle = {
		background: "rgba(249,115,22,0.1)",
		color: "#f97316",
		padding: "6px 12px",
		borderRadius: "8px",
		fontSize: "0.9rem",
		fontWeight: "bold",
		display: "inline-block",
	}

	if (!user) return null

	return (
		<div style={containerStyle}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					borderBottom: "1px solid rgba(255,255,255,0.1)",
					paddingBottom: "30px",
					marginBottom: "30px",
				}}>
				<div>
					<h2
						style={{ color: "#fff", fontSize: "2.2rem", marginBottom: "10px" }}>
						Профиль
					</h2>
					<p
						style={{
							color: "#a1a1aa",
							fontSize: "1.2rem",
							marginBottom: "5px",
						}}>
						<strong>Имя:</strong> {user.name}
					</p>
					<p
						style={{
							color: "#a1a1aa",
							fontSize: "1.2rem",
							marginBottom: "15px",
						}}>
						<strong>Почта:</strong> {user.email}
					</p>
					<span style={badgeStyle}>
						Тип Аккаунта:{" "}
						{user.role.toUpperCase() === "ADMIN"
							? "АДМИНИСТРАТОР"
							: "ПОЛЬЗОВАТЕЛЬ"}
					</span>
				</div>
				<button
					onClick={handleLogout}
					className='btn'
					style={{ background: "#ef4444", boxShadow: "none" }}>
					Выйти
				</button>
			</div>

			<h3
				style={{ color: "#f97316", marginBottom: "20px", fontSize: "1.5rem" }}>
				История заказов
			</h3>
			{loading ? (
				<p style={{ color: "#a1a1aa" }}>Загрузка истории...</p>
			) : orders.length === 0 ? (
				<div
					style={{
						background: "#09090b",
						padding: "30px",
						borderRadius: "8px",
						textAlign: "center",
						border: "1px solid #27272a",
					}}>
					<p style={{ color: "#a1a1aa", marginBottom: "15px" }}>
						Вы еще не совершали никаких заказов.
					</p>
					<Link
						to='/shop'
						className='btn'>
						Начать покупки
					</Link>
				</div>
			) : (
				<div style={{ display: "grid", gap: "20px" }}>
					{orders.map(order => (
						<div
							key={order._id}
							style={{
								background: "#09090b",
								padding: "20px",
								borderRadius: "12px",
								border: "1px solid #27272a",
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "space-between",
								alignItems: "center",
								gap: "20px",
							}}>
							<div>
								<p
									style={{
										color: "#a1a1aa",
										fontSize: "0.9rem",
										marginBottom: "5px",
									}}>
									Номер заказа:{" "}
									<span style={{ color: "#fff" }}>{order._id}</span>
								</p>
								<p
									style={{
										color: "#a1a1aa",
										fontSize: "0.9rem",
										marginBottom: "5px",
									}}>
									Дата создания заказа:{" "}
									<span style={{ color: "#fff" }}>
										{new Date(order.createdAt).toLocaleDateString()}
									</span>
								</p>
								<p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
									Итого:{" "}
									<strong style={{ color: "#10b981" }}>
										{order.totalAmount.toFixed(3)} ₽
									</strong>
								</p>
							</div>
							<div>
								<span
									style={{
										background:
											order.status === "Доставлено"
												? "rgba(16,185,129,0.1)"
												: order.status === "Отправлено"
													? "rgba(59,130,246,0.1)"
													: "rgba(245,158,11,0.1)",
										color:
											order.status === "Доставлено"
												? "#10b981"
												: order.status === "Отправлено"
													? "#3b82f6"
													: "#f59e0b",
										padding: "8px 16px",
										borderRadius: "20px",
										fontWeight: "bold",
									}}>
									{order.status}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Profile
