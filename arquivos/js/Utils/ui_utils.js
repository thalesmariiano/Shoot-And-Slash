
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
		case "icon":
			const img = value ? value.item_sprites.img : "arquivos/assets/null.png"
			weapon_icon_img.src = img
			break
	}
}