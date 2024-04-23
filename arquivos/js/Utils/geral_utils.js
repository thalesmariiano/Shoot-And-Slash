
const $ = element => document.querySelector(element)

const setStorage = (name, value) => localStorage.setItem(name, value)
const getStorage = name => localStorage.getItem(name)
const deleteStorage = name => localStorage.removeItem(name)

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

function detectInArea(entity, target, area){
	const {overlap, distance} = hitBox(target, entity)

	const radar = {
		top: false,
		bottom: false,
		left: false,
		right: false,
		isInArea: false,
		distance,
		area
	}

	const top_area = area.top || area.total 
	const bottom_area = area.bottom || area.total
	const left_area = area.left || area.total
	const right_area = area.right || area.total

	const itsOnTop = Math.abs(distance.y) < top_area
	const itsOnBottom = Math.abs(distance.y) < bottom_area
	const itsOnLeft = Math.abs(distance.x) < left_area
	const itsOnRight = Math.abs(distance.x) < right_area

	if(overlap.x >= overlap.y){
		if(distance.y > 0){
			radar.top = itsOnTop
		}else{
			radar.bottom = itsOnBottom
		}
	}else{
		if(distance.x < 0){
			radar.left = itsOnLeft
		}else{
			radar.right = itsOnRight
		}
	}

	if(radar.top||radar.bottom||radar.left||radar.right){
		radar.isInArea = true
	}else radar.isInArea = false
	
	return radar
}

const entityVision = (rect1, rect2, area) => {
	const distX = (rect1.position.x + rect1.width/2) - (rect2.position.x + rect2.width/2)
	const distY = (rect1.position.y + rect1.height/2) - (rect2.position.y + rect2.height/2)
	const offset_bottom = 10

	const areaLeft = area.left || area.total
	const areaRight = area.right || area.total
	const areaTop = area.top || area.total
	const areaBottom = area.bottom || area.total

	const vTop = Math.abs(distY) < areaTop
	const vBottom = Math.abs(distY) < areaBottom
	const vLeft = Math.abs(distX) < areaLeft
	const vRight = Math.abs(distX) < areaRight

	const vision = {
		top: false,
		bottom: false,
		left: false,
		right: false,
		saw: false,
		distance: {
			x: distX,
			y: distY
		},
		target: rect2,
	}

	if(!area.total && area.left || area.right && !area.top && !area.bottom){
		if(rect1.position.y < rect2.position.y + rect2.height &&
	 	   rect1.position.y + rect1.height - offset_bottom > rect2.position.y)
	 	{
			if(distX > 0){
				vision.left = vLeft
			}else{
				vision.right = vRight
			}
	 	}
	 }else{
	 	if(distX > 0){
			vision.left = vLeft
		}else{
			vision.right = vRight
		}

		if(distY < 0){
			vision.top = vTop
		}else{
			vision.bottom = vBottom
		}
	 }
	

 	if(vision.top||vision.bottom||vision.left||vision.right) vision.saw = true
 	else vision.saw = false

 	return vision
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