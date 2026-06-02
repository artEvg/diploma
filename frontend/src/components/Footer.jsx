import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer
			style={{
				background: "#09090b",
				borderTop: "1px solid rgba(255, 255, 255, 0.05)",
				padding: "40px 20px",
				marginTop: "auto",
			}}>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					alignItems: "center",
					gap: "20px",
				}}>
				<div>
					<h3 style={{ color: "#f97316", marginBottom: "10px" }}>ТехноМир</h3>
					<p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
						Магазин Электроники.
					</p>
				</div>

				<div style={{ display: "flex", gap: "20px" }}>
					<Link
						to='/about'
						style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
						О нас
					</Link>
					<Link
						to='/return'
						style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
						Условия возврата
					</Link>
					<Link
						to='/disclaimer'
						style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
						Правовая защита
					</Link>
				</div>

				<div style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
					&copy; {new Date().getFullYear()} ТехноМир. Все права защищены.
				</div>
			</div>
		</footer>
	)
}

export default Footer
