import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useParams, useNavigate } from "react-router-dom"

const EditProduct = () => {
	const { id } = useParams()
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()
	const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL

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
	const [product, setProduct] = useState(null)

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await fetch(`${API_URL}/api/products/${id}`)
			const data = await res.json()

			setProduct(data)
			setFormData({
				name: data.name || "",
				description: data.description || "",
				price: data.price || "",
				category: data.category || "",
				stock: data.stock || "",
			})
		}

		fetchProduct()
	}, [id])

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		const data = new FormData()
		data.append("name", formData.name)
		data.append("description", formData.description)
		data.append("price", formData.price)
		data.append("category", formData.category)
		data.append("stock", formData.stock)

		if (mainImage) data.append("mainImage", mainImage)
		additionalImages.forEach(file => {
			data.append("additionalImages", file)
		})

		const res = await fetch(`${API_URL}/api/products/${id}`, {
			method: "PUT",
			headers: { Authorization: `Bearer ${user.token}` },
			body: data,
		})

		setLoading(false)

		if (res.ok) {
			alert("Товар успешно обновлен!")
			navigate("/admin/products")
		} else {
			const errorData = await res.json()
			alert(errorData.message || "Ошибка при обновлении товара")
		}
	}

	return (
		<div
			style={{
				maxWidth: "600px",
				margin: "40px auto",
				background: "#18181b",
				padding: "40px",
				borderRadius: "12px",
				border: "1px solid rgba(255,255,255,0.05)",
			}}>
			<h2 style={{ color: "#f97316", marginBottom: "20px" }}>Изменить Товар</h2>

			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
				<input
					type='text'
					placeholder='Название'
					required
					value={formData.name}
					onChange={e => setFormData({ ...formData, name: e.target.value })}
					style={inputStyle}
				/>

				<textarea
					placeholder='Описание'
					required
					rows='4'
					value={formData.description}
					onChange={e =>
						setFormData({ ...formData, description: e.target.value })
					}
					style={inputStyle}
				/>

				<input
					type='number'
					placeholder='Цена'
					required
					value={formData.price}
					onChange={e => setFormData({ ...formData, price: e.target.value })}
					style={inputStyle}
				/>

				<input
					type='text'
					placeholder='Категория'
					required
					value={formData.category}
					onChange={e => setFormData({ ...formData, category: e.target.value })}
					style={inputStyle}
				/>

				<input
					type='number'
					placeholder='Остаток'
					required
					value={formData.stock}
					onChange={e => setFormData({ ...formData, stock: e.target.value })}
					style={inputStyle}
				/>

				<div style={fileBoxStyle}>
					<label style={labelStyle}>Обновить основное изображение</label>
					<input
						type='file'
						accept='image/*'
						onChange={e => setMainImage(e.target.files[0])}
						style={{ color: "#fff" }}
					/>
				</div>

				<div style={fileBoxStyle}>
					<label style={labelStyle}>Добавить дополнительные изображения</label>
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
					{loading ? "Обновление..." : "Изменить товар"}
				</button>
			</form>
		</div>
	)
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

export default EditProduct
