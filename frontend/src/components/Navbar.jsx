import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useSelector } from "react-redux"
import "../styles/navbar.css"

const Navbar = () => {
	const { user, logout } = useContext(AuthContext)
	const cartItems = useSelector(state => state.cart.cartItems)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	return (
		<nav className='navbar'>
			<div className='navbar-brand'>
				<Link to='/'>
					<img
						src='/logo.png'
						alt='ТехноМир'
						style={{
							height: "80px",
							width: "120px",
						}}
					/>
				</Link>
			</div>
			<ul className='navbar-links'>
				<li>
					<Link to='/shop'>Товары</Link>
				</li>
				<li>
					<Link to='/cart'>Корзина ({cartItems.length})</Link>
				</li>
				{user ? (
					<>
						<li>
							<Link to='/profile'> {user.name}</Link>
						</li>
						{user.role === "admin" && (
							<li>
								<Link to='/admin'>Панель</Link>
							</li>
						)}
						<li>
							<button
								onClick={handleLogout}
								className='btn-logout'>
								Выход
							</button>
						</li>
					</>
				) : (
					<li>
						<Link to='/login'>Вход</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
