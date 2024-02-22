
const $ = element => document.querySelector(element)

function gameStorage(){
	const storages = []
	const permanentStorage = []

	function createStorage(item, value){
		if(saveAllowed() && localStorage.getItem('SaS-Save') !== null ){
			if(!storages.includes(item)){
				storages.push(item)
				if(!localStorage.getItem(item)){
					localStorage.setItem(item, value)
				}
			}
		}else{
			window.localStorage.setItem('SaS-Save', 1)
		}
	}

	function readStorage(item){
		if(localStorage.getItem(item)){
			return localStorage.getItem(item)
		}
	}

	function updateStorage(item, newValue){
		if(localStorage.getItem(item)){
			localStorage.setItem(item, newValue)
		}
	}


	function deleteStorage(item){
		if(localStorage.getItem(item)){
			localStorage.removeItem(item)
		}
	}

	function clearStorages(){
		storages.forEach((item, index) => {
			localStorage.removeItem(item)
		})
		storages.length = 0
	}

	const saveAllowed = () => parseInt(readStorage('SaS-Save'))

	function init(){
		if(readStorage('SaSdialog')) deleteStorage('SaSdialog')
		if(readStorage('SaSControl')) deleteStorage('SaSControl')
		if(readStorage('SaS-Control')) deleteStorage('SaS-Control')
		if(!readStorage("SaS-Save")) createStorage("SaS-Save", 1)

		if(saveAllowed()){
			$("#save-memory").checked = true
			createStorage("SaS-Dialog", 1)
			createStorage("SaS-Arcade", 0)
			createStorage("SaS-News", 0)
		}else{
			$("#save-memory").checked = false
		}
	}

	return {
		createStorage,
		readStorage,
		updateStorage,
		deleteStorage,
		clearStorages,
		saveAllowed,
		init
	}
}

function spriteConverter(imgArray){
	if(Array.isArray(imgArray)){
		imgArray.forEach(spr => {
			const img = new Image()
			img.src = spr.image
			spr.image = img
		})
	}else{
		const img = new Image()
		img.src = imgArray
		return img
	}
}

function generateEnemys(amount, health){
	const newMapSize = mapSize - 100
	for(i = 0; i < amount; i++){
		const posX = Math.floor(Math.random() * (newMapSize - 1825)) + 1825
		const enemy = new Enemy({color: "red", health: health, position: {x: posX, y: 400}})
		enemy.setSprites(skeleton_warrior_sprites)
		enemys.push(enemy)
	}
}

function detectInArea(entity, target, areaTotal, topArea, bottomArea, leftArea, rightArea){
	const {overlap, distance} = hitBox(target, entity)

	const radar = {
		top: false,
		bottom: false,
		left: false,
		right: false,
		distance,
		area_total: areaTotal,
		area: {
			top_area: topArea,
			bottom_area: bottomArea,
			left_area: leftArea,
			right_area: rightArea
		}
	}

	const top    = topArea ? topArea : areaTotal
	const bottom = bottomArea ? bottomArea : areaTotal
	const left   = leftArea ? leftArea : areaTotal
	const right  = rightArea ? rightArea : areaTotal

	const isInTopArea = Math.abs(distance.y) < top
	const isInBottomArea = Math.abs(distance.y) < bottom

	const isInLeftArea = Math.abs(distance.x) < left
	const isInRightArea = Math.abs(distance.x) < right

	if(overlap.x >= overlap.y){
		if(distance.y > 0){
			radar.top = isInTopArea
		}else{
			radar.bottom = isInBottomArea
		}
	}else{
		if(distance.x < 0){
			radar.left = isInLeftArea
		}else{
			radar.right = isInRightArea
		}
	}
	return radar
}

function generateTerrain(mapArray, outputArray){
	const tileSize = 50

	for(let row in mapArray){
		for(let column in mapArray[row]){
			const tile = mapArray[row][column]

			const block = {
				id: 1,
				width: tileSize,
				height: tileSize,
				position: {
					x: column*tileSize,
					y: row*tileSize
				},
				imgX: 0,
				imgY: 0,
				type: "Block",
				visible: false
			}

			if(tile){
				switch(tile){
					case 1:
						block.imgX = 32
						block.imgY = 0
						block.id = 1
						break
					case 2:
						block.imgX = 32*2
						block.imgY = 0
						block.id = 2
						break
					case 3:
						block.imgX = 0
						block.imgY = 32*6
						block.id = 3
						break
					case 3.5:
						block.imgX = 32*2
						block.imgY = 32*6
						block.id = 3.5
						break
					case 4:
						block.imgX = 32*2
						block.imgY = 32
						block.id = 4
						break
					case 4.5:
						block.imgX = 0
						block.imgY = 32
						block.id = 4.5
						break
					case 5:
						block.imgX = 32
						block.imgY = 32
						block.id = 5
						break
				}
				outputArray.push(block)
			}	
		}
	}
}

function restartGame(){
	itensArray.forEach((item, index) => {
		if(item.itemType == 'soul') itensArray.splice(index, 1)

		item.position.x = item.initial_position.x
		item.position.y = item.initial_position.y
		item.visible = true
	})

	skillsButton.forEach(button => {
		const skill_name = button.dataset.skill
		const level_text = button.children[0].children[1]
		const price_text = button.nextElementSibling

		skills_list[skill_name].price = skills_list_default[skill_name].price
		skills_list[skill_name].level = skills_list_default[skill_name].level

		level_text.innerHTML = 'Lv 1'
		level_text.style.color = ""
		price_text.style.opacity = "1"
		price_text.innerHTML = `${skills_list[skill_name].price} Almas`
		button.style.opacity = "1"
	})

	mana_bar.style.width = 50 + "px"
	mana_amount.style.width = 50 + "px"

	health_bar.style.width = 100 + "px"
	health_amount.style.width = 100 + "px"

	souls_amount.innerHTML = 0
}