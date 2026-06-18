import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

const Home = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`${API_URL}/api/products`)
				const data = await res.json()
				setProducts(data.slice(0, 4))
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [])

	return (
		<div className='home-container'>
			<div className='hero-banner'>
				<h1>ТехноМир</h1>
				<p>Откройте для себя лучшие товары по непревзойденным ценам.</p>
			</div>
			<h2>Рекомендуемые товары</h2>
			{loading ? (
				<div>Загрузка...</div>
			) : (
				<div className='product-grid'>
					{products.map(product => (
						<ProductCard
							key={product._id}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Home
