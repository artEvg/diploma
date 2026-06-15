import React from "react"

const About = () => {
	const containerStyle = {
		maxWidth: "900px",
		margin: "0 auto",
		padding: "40px",
		background: "#18181b",
		borderRadius: "16px",
		border: "1px solid rgba(255, 255, 255, 0.05)",
		boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
		textAlign: "center",
	}

	const socialBtnStyle = {
		display: "inline-block",
		margin: "10px",
		padding: "10px 20px",
		items: "center",
		gap: "10px",
		background: "#27272a",
		color: "#fff",
		borderRadius: "8px",
		textDecoration: "none",
		transition: "all 0.3s ease",
		border: "1px solid rgba(255, 255, 255, 0.1)",
	}

	return (
		<div style={containerStyle}>
			<img
				src='/me.png'
				alt='@Artem_Evg'
				style={{
					width: "180px",
					height: "180px",
					borderRadius: "50%",
					objectFit: "cover",
					border: "4px solid #f97316",
					marginBottom: "20px",
					boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
				}}
			/>

			<h2 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#fff" }}>
				О нас
			</h2>

			<h3
				style={{ fontSize: "1.5rem", color: "#f97316", marginBottom: "15px" }}>
				Артём Евгеньевич (@artem_evg)
			</h3>

			<p
				style={{
					color: "#a1a1aa",
					fontSize: "1.2rem",
					lineHeight: "1.8",
					maxWidth: "600px",
					margin: "0 auto 30px auto",
				}}>
				<strong>Разработчик Интернет-Магазина</strong>
			</p>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "10px",
					marginTop: "20px",
				}}>
				<a
					href='https://max.ru/u/f9LHodD0cOISHteefE3plQce4qxZ8vc24C9kn2FEhVmI4oG9jX_4uEch2E0'
					target='_blank'
					rel='noreferrer'
					style={{
						...socialBtnStyle,
						background: "rgba(16, 185, 129, 0.2)",
						borderColor: "#104bb9",
						color: "#c5c9ff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
					}}>
					<img
						src='https://maxicons.ru/icons/MAX.svg'
						alt='MAX'
						width={25}
						height={25}
					/>
					Max
				</a>

				<a
					href='https://github.com/artEvg'
					target='_blank'
					rel='noreferrer'
					style={{
						...socialBtnStyle,
						background: "rgba(16, 185, 129, 0.2)",
						borderColor: "#000000",
						color: "#a5a5a5",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
					}}>
					<img
						src='https://www.svgrepo.com/show/512317/github-142.svg'
						alt='GitHub'
						width={25}
						height={25}
					/>
					GitHub
				</a>
			</div>

			<div style={{ marginTop: "30px" }}>
				<p style={{ color: "#a1a1aa", marginBottom: "12px", fontSize: "1rem" }}>
					Отсканируй QR-код для перехода в GitHub
				</p>

				<a
					href='https://github.com/artEvg/diploma'
					target='_blank'
					rel='noreferrer'
					style={{ display: "inline-block" }}>
					<img
						src='/qrcode_github.com.png'
						alt='QR code to GitHub'
						style={{
							width: "180px",
							height: "180px",
							borderRadius: "12px",
							border: "4px solid rgba(255,255,255,0.08)",
							background: "#fff",
							padding: "8px",
						}}
					/>
				</a>
			</div>
		</div>
	)
}

export default About
