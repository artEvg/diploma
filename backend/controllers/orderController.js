const Order = require("../models/Order")
const Product = require("../models/Product")

const addOrderItems = async (req, res) => {
	try {
		console.log("=== ДЕБАГ ADDORDERSITEMS ===")
		console.log("req.user:", req.user)
		console.log("req.body:", req.body)

		const { items, totalAmount, address, paymentId } = req.body

		if (items && items.length === 0) {
			return res.status(400).json({ message: "Нет товаров в заказе" })
		}

		// 1. Создаём заказ
		const order = new Order({
			userId: req.user.id || req.user._id,
			items,
			totalAmount,
			address,
			paymentId,
		})

		console.log("Создаю заказ с userId:", order.userId)

		const createdOrder = await order.save()
		console.log("Заказ сохранён:", createdOrder._id)

		// 2. Уменьшаем остатки товаров
		for (const item of items) {
			await Product.updateOne(
				{ _id: item.productId },
				{ $inc: { stock: -item.qty } },
			)
		}

		res.status(201).json(createdOrder)
	} catch (error) {
		console.error("ОШИБКА В ADDORDERSITEMS:", error)
		console.error("Stack trace:", error.stack)
		res.status(500).json({ message: error.message })
	}
}

const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.user._id })
		res.json(orders)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({}).populate("userId", "id name")
		res.json(orders)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
		if (order) {
			order.status = req.body.status || order.status
			const updatedOrder = await order.save()
			res.json(updatedOrder)
		} else {
			res.status(404).json({ message: "Заказ не найден" })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus }
