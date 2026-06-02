const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const Product = require("./models/Product")
const connectDB = require("./config/db")

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await User.deleteMany()
		await Product.deleteMany()

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash("password123", salt)

		const adminUser = await User.create({
			name: "Admin User",
			email: "admin@shopnest.com",
			password: hashedPassword,
			role: "admin",
		})

		const products = [
			{
				name: "Apple AirPods Pro 3",
				description:
					"AirPods Pro 3 с улучшенной акустической изоляцией автоматически адаптируются к вашим предпочтениям и окружающей обстановке. А обновленные микрофоны ещё больше устраняют нежелательные звуки. Вы слышите только то, что хотите в беспрецедентном аудио-ощущении. AirPods Pro 3 снижают фоновый шум и изолируют голоса во время звонков, поэтому, будь то в автобусе или в кафе - каждый разговор будет громким и чётким.",
				price: 19.999,
				category: "Наушники",
				stock: 25,
				imageUrl:
					"https://static.vecteezy.com/system/resources/previews/046/787/059/non_2x/white-earbuds-in-transparent-background-free-png.png",
				ratings: 4.9,
				numReviews: 78,
			},
			{
				name: "Apple iPhone 17 Pro 256 ГБ серебристый",
				description:
					"Представляем iPhone 17 Pro, разработанные чтобы стать самыми мощными моделями iPhone. В основе конструкции лежит цельнолитой алюминиевый корпус, обеспечивающий максимальную производительность, ёмкость аккумулятора и долговечность.",
				price: 119.999,
				category: "Смартфоны",
				stock: 50,
				imageUrl:
					"https://cdn.mtscdn.ru/upload/iblock/a14/iphone_17_pro_finish_select_202509_6_3inch_silver_AV1.png",
				ratings: 4.8,
				numReviews: 152,
			},
			{
				name: "Canon EOS 2000D Kit",
				description:
					"Зеркальный фотоаппарат Canon EOS 2000D Kit 18-55mm DC сочетает в себе передовые технологии и функционал для получения четкого кинематографического видео в Full-HD и снимков с красивым размытием заднего плана. Модель выполнена в черном корпусе из поликарбонатной смолы. Благодаря интерфейсам NFC и Wi-Fi можно управлять камерой дистанционно и легко делиться снимками. На смартфоне или планшете должно быть установлено приложение Canon Camera Connect.",
				price: 34.499,
				category: "Фотоаппараты",
				stock: 14,
				imageUrl:
					"https://1.downloader.disk.yandex.ru/preview/5de06991766829b4801dd6c437e0ef0591e95ad2fee9bdf0e94633c2e1fe8f05/inf/6VyBdaQMDEUu1c2zRWDQS2OiBeCOOOILYm9VG9XLJKGIYtici-e4EZUwfCnGigOGW-OjlcAsIbL9bQcJAmSbQA%3D%3D?uid=1891462917&filename=x6rb8fw8cinz01r65jt5ilpuue12sml6_thumb_13f13ad680c-no-bg-preview%20%28carve.photos%29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1891462917&tknv=v3&is_direct_zip_experiment=1&size=1905x952",
				ratings: 4.9,
				numReviews: 51,
			},
			{
				name: "PlayStation 5 Pro",
				description:
					"Играйте в игры PS5 с самой впечатляющей графикой, когда-либо возможной на консоли PlayStation. С консолью PlayStation5 Pro величайшие создатели игр в мире могут улучшить свои игры с помощью невероятных функций, таких как усовершенствованная трассировка лучей, сверхчеткое изображение для вашего телевизора 4K и игровой процесс с высокой частотой кадров.",
				price: 84.999,
				category: "Консоли и видеоигры",
				stock: 25,
				imageUrl:
					"https://3.downloader.disk.yandex.ru/preview/96109828baa63202855d816f1b73248d5c4959be1e69815be8bcada3c49bd946/inf/skZPm7eB2oHoykBPY8bPzWOiBeCOOOILYm9VG9XLJKHT-SljodDclRJxO19t_UL5iTLoDlCLcpwKTRnsUB1btQ%3D%3D?uid=1891462917&filename=igrovaya_pristavka_sony_playstation_5_pro-no-bg-preview%20%28carve.photos%29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1891462917&tknv=v3&is_direct_zip_experiment=1&size=1905x952",
				ratings: 5.0,
				numReviews: 89,
			},
		]

		await Product.insertMany(products)

		console.log("✅ Данные Успешно Добавлены!")
		process.exit()
	} catch (error) {
		console.error(`❌ Ошибка при добавлении данных: ${error.message}`)
		process.exit(1)
	}
}

importData()
