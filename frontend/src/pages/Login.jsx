import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../styles/auth.css"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { login } = useContext(AuthContext)
	const navigate = useNavigate()
	const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const res = await fetch(`${API_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			})
			const data = await res.json()
			if (res.ok) {
				login(data)
				navigate("/")
			} else {
				alert(data.message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='auth-container'>
			<form
				onSubmit={handleSubmit}
				className='auth-form'>
				<h2>Авторизация</h2>
				<input
					type='email'
					placeholder='Почта'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button
					type='submit'
					className='btn'>
					Войти
				</button>
				<p>
					Ещё нет аккаунта? <Link to='/register'>Регистрация</Link>
				</p>
			</form>
		</div>
	)
}

export default Login
