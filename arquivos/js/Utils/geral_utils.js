
function generateEnemys(amount, health){
	for(i = 0; i < amount; i++){
		const posX = Math.floor(Math.random() * ((mapSize - 50) - 1450 + 1) + 1450)
		const enemy = new Enemy({color: "red", health: health, position: {x: posX, y: 400}})
		enemy.setSprites(enemy_sprites)
		enemys.push(enemy)
	}
}

function detectInArea(entity, target, areaTotal, topArea, bottomArea, leftArea, rightArea){
	const {overlap, distance} = collide(target, entity)

	const radar = {
		top: false,
		bottom: false,
		left: false,
		right: false,
		distance
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