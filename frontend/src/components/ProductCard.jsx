import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import "../styles/product.css"

const Shop = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	const API_URL = process.env.REACT_APP_BACKEND_BASEURL
	const productsPerPage = 6

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`${API_URL}/api/products`)
				const data = await res.json()
				setProducts(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [API_URL])

	const filteredProducts = products.filter(p =>
		p.name.toLowerCase().includes(search.toLowerCase()),
	)

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	)

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	useEffect(() => {
		setCurrentPage(1)
	}, [search])

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
						{currentProducts.map(product => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))}
					</div>

					{totalPages > 1 && (
						<div className='pagination'>
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}>
								Назад
							</button>

							{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={currentPage === page ? "active" : ""}>
									{page}
								</button>
							))}

							<button
								onClick={() => handlePageChange(currentPage + 1)}
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
