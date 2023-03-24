if(!window.localStorage.getItem("SaSControl")) window.localStorage.setItem("SaSControl", 1)

const getElement = type => document.querySelector(`[data-control="${type}"]`)
const getControl = window.localStorage.getItem("SaSControl")

window.onload = () => {
	// generateTerrain(scenarioMapTiles, scenarioMapBlocks)
	generateTerrain(playableMapTiles, playebleMapBlocks)

	if(getControl == 1){
		getElement(1).classList.remove("opacity-50", "hover:opacity-100")
		getElement(2).classList.add("opacity-50", "hover:opacity-100")
	}else{
		getElement(2).classList.remove("opacity-50", "hover:opacity-100")
		getElement(1).classList.add("opacity-50", "hover:opacity-100")
	}
}

