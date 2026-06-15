import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()
	const [stats, setStats] = useState(null)

	useEffect(() => {
		if (!user || user.role !== "admin") {
			navigate("/")
			return
		}

		const fetchStats = async () => {
			try {
				const res = await fetch("/api/analytics", {
					headers: { Authorization: `Bearer ${user.token}` },
				})
				const data = await res.json()
				if (res.ok) {
					setStats(data)
				} else {
					if (res.status === 401) {
						navigate("/login")
					}
					setStats({
						totalOrders: 0,
						totalProducts: 0,
						totalUsers: 0,
						totalRevenue: 0,
					})
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchStats()
	}, [user, navigate])

	const cardStyle = {
		padding: "25px",
		background: "#18181b",
		border: "1px solid rgba(255, 255, 255, 0.05)",
		borderRadius: "12px",
		boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
		textAlign: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		gap: "10px",
	}

	const numberStyle = {
		fontSize: "2.5rem",
		fontWeight: "700",
		color: "#f97316",
	}

	return (
		<div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "15px",
					marginBottom: "5px",
				}}>
				<img
					src='/logo.png'
					alt='Logo'
					style={{
						height: "80px",
						width: "100px",
					}}
				/>
				<h2 style={{ margin: 0 }}>Панель администратора</h2>
			</div>
			<p style={{ color: "#a1a1aa", marginBottom: "30px", fontSize: "1.1rem" }}>
				Добро пожаловать, <span style={{ color: "#fff" }}>{user?.name}</span>
			</p>

			{stats ? (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "20px",
					}}>
					<div style={cardStyle}>
						<h4 style={{ color: "#a1a1aa", fontSize: "1rem" }}>
							Всего заказов
						</h4>
						<div style={numberStyle}>{stats.totalOrders}</div>
					</div>
					<div style={cardStyle}>
						<h4 style={{ color: "#a1a1aa", fontSize: "1rem" }}>
							Всего товаров
						</h4>
						<div style={numberStyle}>{stats.totalProducts}</div>
					</div>
					<div style={cardStyle}>
						<h4 style={{ color: "#a1a1aa", fontSize: "1rem" }}>
							Всего пользователей
						</h4>
						<div style={numberStyle}>{stats.totalUsers}</div>
					</div>
					<div style={cardStyle}>
						<h4 style={{ color: "#a1a1aa", fontSize: "1rem" }}>
							Выручка за все время
						</h4>
						<div style={numberStyle}>{stats.totalRevenue.toFixed(3)} ₽</div>
					</div>
				</div>
			) : (
				<div
					style={{ textAlign: "center", margin: "50px 0", color: "#f97316" }}>
					Загрузка данных...
				</div>
			)}

			<div
				style={{
					marginTop: "40px",
					padding: "30px",
					background: "#18181b",
					borderRadius: "12px",
					border: "1px solid rgba(255,255,255,0.05)",
				}}>
				<h3 style={{ marginBottom: "25px", color: "#f97316" }}>
					Административный контроль
				</h3>
				<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
					<button
						className='btn'
						onClick={() => navigate("/admin/add-product")}>
						+ Добавить товар
					</button>
					<button
						className='btn'
						onClick={() => navigate("/admin/products")}
						style={{ background: "#3f3f46" }}>
						📦 Товары
					</button>
					<button
						className='btn'
						onClick={() => navigate("/admin/orders")}
						style={{ background: "#3f3f46" }}>
						🚚 Заказы
					</button>
					<button
						className='btn'
						onClick={() => navigate("/admin/users")}
						style={{ background: "#3f3f46" }}>
						👥 Пользователи
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
