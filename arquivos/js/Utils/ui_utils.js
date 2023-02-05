
const gameScreen = (screen1, screen2) => {
	screen1.style.display = "flex"
	screen2.style.display = "none"
}

function switchIcon(item){
	if(!item){
		weapon_icon.src = "arquivos/assets/null.png"
		return
	}
	
	const name = item.name
	switch(name){
		case "Ak-47":
			weapon_icon.src = "arquivos/assets/itens/ak47.png"
			break
		case "Dôze":
			weapon_icon.src = "arquivos/assets/itens/escopeta.png"
			break
	}
}