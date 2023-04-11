
function switchScreen(screen1, screen2){
	document.getElementById(screen1).classList.remove("hidden")
	document.getElementById(screen2).classList.add("hidden")
}

const skills_screen = document.getElementById("skills-screen")

function updateUI(ui, value) {
	switch(ui){
		case "healthbar":
			health_amount.style.width = `${value}px`
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
		case "skills":
			if(value){
				skills_screen.classList.remove("hidden")

				setTimeout(() => {
					skills_screen.classList.remove("opacity-0")
					skills_screen.classList.add("opacity-100")				
				}, 700)
			}else{
				skills_screen.classList.remove("opacity-100")
				skills_screen.classList.add("opacity-0")

				setTimeout(() => {
					skills_screen.classList.add("hidden")
				}, 1000)
			}
			break
		case "icon":
			const img = value ? "arquivos/assets/itens/ak47.png" : "arquivos/assets/null.png"
			weapon_icon_img.src = img
			break
	}
}