import React, { useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { clearCart } from "../redux/cartSlice"

const Checkout = () => {
	const { user } = useContext(AuthContext)
	const cartItems = useSelector(state => state.cart.cartItems)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL

	const [address, setAddress] = useState({
		fullName: "",
		street: "",
		city: "",
		postalCode: "",
		country: "",
	})

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0,
	)

	const handleSubmit = async e => {
		e.preventDefault()

		if (!user) {
			alert("Пожалуйста, сначала войдите")
			navigate("/login")
			return
		}

		try {
			alert("Начинается процесс оплаты...")

			const response = await fetch(`${API_URL}/api/orders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					items: cartItems,
					totalAmount: totalPrice,
					address,
					paymentId: "txn_" + Date.now(),
				}),
			})

			const data = await response.json()

			if (response.ok) {
				dispatch(clearCart())
				navigate("/order-success")
			} else {
				alert(data.message || "Ошибка оформления заказа")
			}
		} catch (error) {
			console.error(error)
			alert("Ошибка оформления заказа")
		}
	}

	return (
		<div className='checkout-container'>
			<h2>Оформление Заказа</h2>
			<div className='checkout-content'>
				<form
					onSubmit={handleSubmit}
					className='shipping-form'>
					<h3>Данные доставки</h3>
					<input
						type='text'
						placeholder='Полное Имя'
						required
						value={address.fullName}
						onChange={e => setAddress({ ...address, fullName: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Улица'
						required
						value={address.street}
						onChange={e => setAddress({ ...address, street: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Город'
						required
						value={address.city}
						onChange={e => setAddress({ ...address, city: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Почтовый Индекс'
						required
						value={address.postalCode}
						onChange={e =>
							setAddress({ ...address, postalCode: e.target.value })
						}
					/>
					<input
						type='text'
						placeholder='Страна'
						required
						value={address.country}
						onChange={e => setAddress({ ...address, country: e.target.value })}
					/>
					<div className='checkout-summary'>
						<h4>Итого: {totalPrice.toFixed(3)} ₽</h4>
						<button
							type='submit'
							className='btn'>
							Оплатить Сейчас
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Checkout
