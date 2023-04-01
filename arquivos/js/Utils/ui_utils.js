
const gameScreen = (screen1, screen2) => {
	screen1.classList.remove("hidden")
	screen2.classList.add("hidden")
}

function updateUI(ui, value) {
	switch(ui){
		case "healthbar":
			const health_bar = document.getElementById("health")
			health_bar.style.width = `${value}%`
			break
		case "waves":
			const wavesContainer = document.getElementById("waves-container")
			wavesContainer.classList.remove("hidden")

			const wavesText = document.getElementById("waves-text")
			wavesText.innerHTML = `Onda ${value}`

			setTimeout(() => {
				wavesContainer.classList.remove("opacity-0")
				wavesContainer.classList.add("opacity-100")				
			}, 500)

			setTimeout(() => {
				wavesContainer.classList.remove("opacity-100")
				wavesContainer.classList.add("opacity-0")
			}, 5000)

			setTimeout(() => {
				wavesContainer.classList.add("hidden")
			}, 6000)
			break
		// case "icon":
		// 	const img = value ? value.item_sprites.img : "arquivos/assets/null.png"
		// 	weapon_icon_img.src = img
		// 	break
	}
}