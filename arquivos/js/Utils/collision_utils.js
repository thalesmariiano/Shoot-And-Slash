
const projectileCollision = collison => {
	const {side, collider, target} = collison

	if(side.top || side.bottom || side.left || side.right){
		if(target.type == "Block"){
			collider.velocity.x = 0
			collider.velocity.y = 0
		}

		if(target.type == "Entity" && !target.isDead){
			target.takeHit(collider.dmg)
			collider.visible = false
		}
	}
}

const itemCollision = ({side, collider, target}) => {
	const item = target
	const isColliding = side.top || side.bottom || side.left || side.right

	if(isColliding && collider.entityType == "Player"){
		switch(item.itemType){
			case "Coin":
				collider.coinNumbers += item.itemValue
				item.visible = false
				break
			case "life":
				if(collider.health < collider.maxHealth){
					collider.receiveLife(item.itemValue)
					item.visible = false
				}
				break
			case "Bomb":
				collider.takeHit(item.itemValue)
				item.visible = false
				break
			case "soul":
				player.souls += 1
				souls_amount.innerHTML = player.souls
				item.visible = false
				break
			default:
				// if(item.type != "Weapon") return

				// for(i = 0; i < collider.inventory.length; i++){
				// 	const slot = collider.inventory[i]
				// 	if(!slot.item){
				// 		slot.item = item
				// 		item.visible = false
				// 		item.isInInventory = true
				// 		updateUI("icon", item)
				// 		return
				// 	}		
				// }
				break
		}
	}
}

const collision = ({side, collider, target, overlap}) => {
	if(side.top){
		collider.velocity.y = 0
		collider.position.y -= parseInt(overlap.y)
		collider.isFalling = false
		if(collider.receiveDamage && collider.entityType == 'Enemy'){
			collider.receiveDamage = false
			collider.velocity.x = 0
		}
	}

	if(side.bottom){
		collider.position.y += parseInt(overlap.y)
		collider.velocity.y += GRAVITY
	}

	if(side.left){
		collider.position.x -= overlap.x
	}

	if(side.right){
		collider.position.x += overlap.x
	}
}



