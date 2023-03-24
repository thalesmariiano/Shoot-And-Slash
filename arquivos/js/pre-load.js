if(!window.localStorage.getItem("SaSControl")) window.localStorage.setItem("SaSControl", 1)

const getElement = type => document.querySelector(`[data-control="${type}"]`)
const getControl = window.localStorage.getItem("SaSControl")

window.onload = () => {
	// generateTerrain(scenarioMapTiles, scenarioMapBlocks)
	generateTerrain(playableMapTiles, playebleMapBlocks)

	if(getControl == 1){
		getElement(1).classList.remove("opacity-50", "hover:opacity-75")
		getElement(2).classList.add("opacity-50", "hover:opacity-75")
		controlKey.left   = "KeyA"
		controlKey.right  = "KeyD"
		controlKey.jump   = "Space"
		controlKey.jump_2 = "KeyW"
	}else{
		getElement(2).classList.remove("opacity-50", "hover:opacity-75")
		getElement(1).classList.add("opacity-50", "hover:opacity-75")
		controlKey.left   = "ArrowLeft"
		controlKey.right  = "ArrowRight"
		controlKey.jump   = "ArrowUp"
		controlKey.jump_2 = ""
	}
}

