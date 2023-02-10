
/*
const blockCollision = collision => {
	const {side, overlap, collider, target} = collision

	if(side.top){
	}

	if(side.bottom){
	}

	if(side.left){
		collider.position.x -= overlap.x
		if(collider.atributtes.isHeavy){
			target.speed = 2
		}
	}

	if(side.right){
		collider.position.x += overlap.x
		if(collider.atributtes.isHeavy){
			target.speed = 2					
		}			
	}

	if(!side.left && !side.right && collider.atributtes.isHeavy){
		target.speed = target.defaultSpeed
	}
}
*/

const projectileCollision = collison => {
	const {side, overlap, collider, target} = collison

	if(side.top || side.bottom || side.left || side.right){
		if(target.type == "Block"){
			collider.velocity.x = 0
			collider.velocity.y = 0
		}

		if(target.type == "Entity"){
			target.takeHit(Math.floor(Math.random() * (6 - collider.dmg) + 6))
			collider.visible = false
		}
	}
}

const itemCollision = collision => {
	const {side, overlap, collider, target} = collision
	const item = target
	const isColliding = side.top || side.bottom || side.left || side.right

	if(isColliding && collider.entityType == "Player"){
		switch(item.itemType){
			case "Coin":
				collider.coinNumbers += item.itemValue
				item.visible = false
				break
			case "Life":
				if(collider.health < collider.maxHealth){
					const currentLife = Math.abs(collider.health - collider.maxHealth)
					if(currentLife < item.itemValue){
						collider.receiveLife(currentLife)
						item.visible = false
					}else{
						collider.receiveLife(item.itemValue)
						item.visible = false
					}
				}
				break
			case "Bomb":
				collider.takeHit(item.itemValue)
				item.visible = false
				break
			default:
				if(item.type == "Weapon"){
					for(i = 0; i < collider.inventory.length; i++){
						const slot = collider.inventory[i]
						if(!slot.item){
							slot.item = item
							item.visible = false
							item.isInInventory = true
							updateUI("icon", item)

							// Update gun HUD Stats
							bullets_amount.innerHTML = `${item.bulletsAmount}`
							munition_amount.innerHTML = `${item.munition}`
							return
						}		
					}
				}
				break
		}
	}
}

const basicCollision = (entity, block) => {
	const {side, overlap, collider, target, distance} = collide(entity, block)

	if(side.top){
		collider.velocity.y = 0
		collider.position.y -= parseInt(overlap.y)
		collider.isFalling = false

		if(collider.entityType === "Player"){
			lockPlayerControls = false
		}
	}

	if(side.bottom){
		collider.position.y += parseInt(overlap.y)
		collider.velocity.y += GRAVITY
	}

	if(side.left){
		collider.position.x -= overlap.x

		if(collider.entityType == "Enemy"){
			collider.will_jump = true			
		}
	}

	if(side.right){
		collider.position.x += overlap.x
		
		if(collider.entityType == "Enemy"){
			collider.will_jump = true			
		}
	}

}



