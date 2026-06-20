import React, { useEffect, useMemo, useState } from "react"
import ProductCard from "../components/ProductCard"
import "../styles/product.css"

const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	const API_URL = process.env.REACT_APP_BACKEND_BASEURL
	const itemsPerPage = 8

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

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

	const currentProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
	}, [filteredProducts, currentPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [search])

	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1)
		}
	}, [currentPage, totalPages])

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
				<>
					<div className='product-grid'>
						{currentProducts.length > 0 ? (
							currentProducts.map(product => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))
						) : (
							<div>Товары не найдены</div>
						)}
					</div>

					{totalPages > 1 && (
						<div className='pagination'>
							<button
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}>
								Назад
							</button>

							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index + 1}
									onClick={() => setCurrentPage(index + 1)}
									className={currentPage === index + 1 ? "active" : ""}>
									{index + 1}
								</button>
							))}

							<button
								onClick={() =>
									setCurrentPage(prev => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}>
								Вперёд
							</button>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Shop
