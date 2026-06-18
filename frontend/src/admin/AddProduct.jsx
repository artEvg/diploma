import React, { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		stock: "",
	})
	const [mainImage, setMainImage] = useState(null)
	const [additionalImages, setAdditionalImages] = useState([])
	const [loading, setLoading] = useState(false)
	const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL

	if (!user || user.role !== "admin") {
		navigate("/")
		return null
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!mainImage)
			return alert("Пожалуйста добавьте основное изображение товара")

		setLoading(true)
		const data = new FormData()
		data.append("name", formData.name)
		data.append("description", formData.description)
		data.append("price", formData.price)
		data.append("category", formData.category)
		data.append("stock", formData.stock)
		data.append("mainImage", mainImage)

		additionalImages.forEach(file => {
			data.append("additionalImages", file)
		})

		try {
			const res = await fetch(`${API_URL}/api/products`, {
				method: "POST",
				headers: { Authorization: `Bearer ${user.token}` },
				body: data,
			})

			const responseData = await res.json()

			if (res.ok) {
				alert("Товар успешно добавлен")
				navigate("/shop")
			} else {
				alert(responseData.message || "Ошибка при создании товара")
			}
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={wrapStyle}>
			<h2 style={{ color: "#f97316", marginBottom: "20px" }}>
				Добавить Новый Товар
			</h2>

			<form
				onSubmit={handleSubmit}
				style={formStyle}>
				<input
					type='text'
					placeholder='Название товара'
					required
					onChange={e => setFormData({ ...formData, name: e.target.value })}
					style={inputStyle}
				/>
				<textarea
					placeholder='Описание'
					required
					rows='4'
					onChange={e =>
						setFormData({ ...formData, description: e.target.value })
					}
					style={inputStyle}
				/>
				<input
					type='number'
					placeholder='Цена'
					required
					onChange={e => setFormData({ ...formData, price: e.target.value })}
					style={inputStyle}
				/>
				<input
					type='text'
					placeholder='Категория'
					required
					onChange={e => setFormData({ ...formData, category: e.target.value })}
					style={inputStyle}
				/>
				<input
					type='number'
					placeholder='Количество'
					required
					onChange={e => setFormData({ ...formData, stock: e.target.value })}
					style={inputStyle}
				/>

				<div style={fileBoxStyle}>
					<label style={labelStyle}>Основное изображение</label>
					<input
						type='file'
						accept='image/*'
						required
						onChange={e => setMainImage(e.target.files[0])}
						style={{ color: "#fff" }}
					/>
				</div>

				<div style={fileBoxStyle}>
					<label style={labelStyle}>Дополнительные изображения</label>
					<input
						type='file'
						accept='image/*'
						multiple
						onChange={e => setAdditionalImages(Array.from(e.target.files))}
						style={{ color: "#fff" }}
					/>
				</div>

				<button
					type='submit'
					disabled={loading}
					className='btn'
					style={{ marginTop: "10px" }}>
					{loading ? "Загрузка и создание..." : "Опубликовать товар"}
				</button>
			</form>
		</div>
	)
}

const wrapStyle = {
	maxWidth: "600px",
	margin: "40px auto",
	background: "#18181b",
	padding: "40px",
	borderRadius: "12px",
	border: "1px solid rgba(255,255,255,0.05)",
}

const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: "15px",
}

const inputStyle = {
	padding: "12px",
	background: "#09090b",
	border: "1px solid #27272a",
	borderRadius: "6px",
	color: "#fff",
	fontSize: "15px",
	outline: "none",
}

const fileBoxStyle = {
	padding: "15px",
	border: "1px dashed #f97316",
	borderRadius: "8px",
}

const labelStyle = {
	display: "block",
	marginBottom: "10px",
	color: "#a1a1aa",
}

export default AddProduct
