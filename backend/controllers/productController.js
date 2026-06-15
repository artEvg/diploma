const Product = require("../models/Product")
const cloudinary = require("../config/cloudinary")

const uploadImages = async files => {
	const uploadOne = async file => {
		const result = await cloudinary.uploader.upload(file.path)
		return result.secure_url
	}

	return Promise.all(files.map(uploadOne))
}

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.json(products)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (product) res.json(product)
		else res.status(404).json({ message: "Товар не найден" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const createProduct = async (req, res) => {
	try {
		const { name, description, price, category, stock } = req.body

		const mainFile = req.files?.mainImage?.[0]
		const additionalFiles = req.files?.additionalImages || []

		if (!mainFile) {
			return res
				.status(400)
				.json({ message: "Главное изображение обязательно" })
		}

		const mainImageResult = await cloudinary.uploader.upload(mainFile.path)
		const additionalImageUrls = additionalFiles.length
			? await uploadImages(additionalFiles)
			: []

		const product = new Product({
			name,
			description,
			price,
			category,
			stock,
			mainImageUrl: mainImageResult.secure_url,
			additionalImageUrls,
		})

		const createdProduct = await product.save()
		res.status(201).json(createdProduct)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateProduct = async (req, res) => {
	try {
		const { name, description, price, category, stock } = req.body
		const product = await Product.findById(req.params.id)

		if (!product) {
			return res.status(404).json({ message: "Товар не найден" })
		}

		product.name = name || product.name
		product.description = description || product.description
		product.price = price || product.price
		product.category = category || product.category
		product.stock = stock || product.stock

		const mainFile = req.files?.mainImage?.[0]
		const additionalFiles = req.files?.additionalImages || []

		if (mainFile) {
			const mainImageResult = await cloudinary.uploader.upload(mainFile.path)
			product.mainImageUrl = mainImageResult.secure_url
		}

		if (additionalFiles.length) {
			const additionalImageUrls = await uploadImages(additionalFiles)
			product.additionalImageUrls = [
				...(product.additionalImageUrls || []),
				...additionalImageUrls,
			]
		}

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (product) {
			await product.deleteOne()
			res.json({ message: "Товар удален" })
		} else {
			res.status(404).json({ message: "Товар не найден" })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
}
