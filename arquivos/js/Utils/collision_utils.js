
const projectileCollision = ({isColliding, collider, target}) => {
	if(isColliding){
		if(target.type == "Block"){
			collider.visible = false
		}

		if(target.type == "Entity" && !target.isDead){
			target.takeHit(collider.dmg)
			collider.visible = false
		}
	}
}

const itemCollision = ({isColliding, collider, target}) => {
	const item = target

	if(isColliding){
		switch(item.itemType){
			case "life":
				if(collider.health < collider.maxHealth){
					collider.receiveLife(item.itemValue)
					item.visible = false
				}
				break
			case "soul":
				player.souls += 1
				souls_amount.innerHTML = player.souls
				item.visible = false
				break
		}
	}
}

const collision = ({side, collider, target, overlap}) => {
	if(side.top){
		collider.velocity.y = 0
		collider.position.y -= parseInt(overlap.y)
		collider.isFalling = false
		collider.isJumping = false
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



