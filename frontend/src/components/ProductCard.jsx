import React from "react"
import { Link } from "react-router-dom"
import "../styles/product.css"

const ProductCard = ({ product }) => {
	return (
		<div className='product-card'>
			<div className='product-image-wrapper'>
				<img
					src={product.imageUrl}
					alt={product.name}
					className='product-image'
				/>
			</div>

			<div className='product-info'>
				<h3>{product.name}</h3>
				<p className='price'>{product.price.toFixed(3)} ₽</p>
				<Link
					to={`/product/${product._id}`}
					className='btn'>
					Подробнее
				</Link>
			</div>
		</div>
	)
}

export default ProductCard
