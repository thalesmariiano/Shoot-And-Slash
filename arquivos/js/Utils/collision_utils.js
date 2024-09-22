
const projectileCollision = ({isColliding, collider, target}) => {
	if(isColliding){
		if(target.type == "Block"){
			collider.visible = false
		}

		if(target.type == "Entity" && !target.isDead){
			target.takeHit(collider.dmg)
			collider.visible = false
		}

		if(collider.projectile == 'fireball' /*&& target.type == 'Block'*/){
			const position = {x: 0, y: 0}

			if(collider.direction == 'left'){
				position.x = collider.position.x
				position.y = collider.position.y - collider.height - 5
			}else if(collider.direction == 'right'){
				position.x = collider.position.x + collider.width/2
				position.y = collider.position.y - collider.height - 5
			}
			showEffect('fire_hit-wall', position, collider.direction)
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
				player.souls += item.itemValue
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



