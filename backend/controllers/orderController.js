const Order = require("../models/Order")
const sendEmail = require("../utils/sendEmail")

const addOrderItems = async (req, res) => {
	try {
		const { items, totalAmount, address, paymentId } = req.body
		if (items && items.length === 0) {
			return res.status(400).json({ message: "Нет товаров в заказе" })
		} else {
			const order = new Order({
				userId: req.user._id,
				items,
				totalAmount,
				address,
				paymentId,
			})
			const createdOrder = await order.save()

			// Send Order Confirmation Email
			const message = `
        <h2>Информация о заказе</h2>
        <p>Здравствуйте, ${req.user.name},</p>
        <p>Ваш заказ успешно размещен на площадке! Номер заказа: <strong>${createdOrder._id}</strong></p>
        <p>Итоговая стоимость: $${totalAmount.toFixed(2)}</p>
        <p>Адрес Доставки: ${address.street}, ${address.city}</p>
        <p>Спасибо что заказали товары на ТехноМир</p>
      `

			await sendEmail({
				email: req.user.email,
				subject: "ТехноМир - Информация о заказе",
				message,
			})

			res.status(201).json(createdOrder)
		}
	} catch (error) {
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
