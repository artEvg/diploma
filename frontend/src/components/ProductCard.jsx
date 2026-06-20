import React, { useEffect, useMemo, useState } from "react"
import ProductCard from "../components/ProductCard"
import "../styles/product.css"

const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")

	const API_URL = process.env.REACT_APP_BACKEND_BASEURL

	useEffect(() => {
		const controller = new AbortController()

		const fetchProducts = async () => {
			try {
				const res = await fetch(`${API_URL}/api/products`, {
					signal: controller.signal,
				})

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}

				const data = await res.json()
				setProducts(Array.isArray(data) ? data : [])
			} catch (error) {
				if (error.name !== "AbortError") {
					console.error("Ошибка при загрузке товаров:", error)
				}
			} finally {
				setLoading(false)
			}
		}

		if (API_URL) {
			fetchProducts()
		} else {
			console.error("REACT_APP_BACKEND_BASEURL не задан")
			setLoading(false)
		}

		return () => controller.abort()
	}, [API_URL])

	const filteredProducts = useMemo(() => {
		const query = search.trim().toLowerCase()

		return products.filter(product =>
			(product?.name || "").toLowerCase().includes(query),
		)
	}, [products, search])

	return (
		<div className='shop-container'>
			<h2>Все товары</h2>

			<input
				type='text'
				placeholder='Найти товар...'
				value={search}
				onChange={e => setSearch(e.target.value)}
				className='search-bar'
			/>

			{loading ? (
				<div>Загрузка...</div>
			) : (
				<div className='product-grid'>
					{filteredProducts.length > 0 ? (
						filteredProducts.map(product => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))
					) : (
						<div>Товары не найдены</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Shop
