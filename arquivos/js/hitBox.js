

const hitBox = (rect1, rect2) => {
	const distX = (rect1.position.x + rect1.width/2) - (rect2.position.x + rect2.width/2)
	const distY = (rect1.position.y + rect1.height/2) - (rect2.position.y + rect2.height/2)

	const sumHalfWidth = (rect1.width/2) + (rect2.width/2)
	const sumHalfHeight = (rect1.height/2) + (rect2.height/2)

	const overlapX = sumHalfWidth - Math.abs(distX)
	const overlapY = sumHalfHeight - Math.abs(distY)

	const isColliding = Math.abs(distX) < sumHalfWidth && Math.abs(distY) < sumHalfHeight

	const collision = {
		side: {
			top: false,
			bottom: false,
			left: false,
			right: false
		},
		overlap: {
			x: overlapX,
			y: overlapY
		},
		collider: rect1,
		target: rect2,
		distance: {
			x: distX,
			y: distY
		}
	}

	if(isColliding){
		if(overlapX >= overlapY){
			if(distY < 0){
				collision.side.top = true
				collision.side.bottom = false
			}else{
				collision.side.top = false
				collision.side.bottom = true
			}
		}else{
			if(distX < 0){
				collision.side.left = true
				collision.side.right = false
			}else{
				collision.side.left = false
				collision.side.right = true
			}
		}
	}
	return collision
}


