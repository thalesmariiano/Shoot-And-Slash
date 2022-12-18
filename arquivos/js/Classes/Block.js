
class Block {
	constructor({color, position, width, height}){
		this.color = color
		this.position = position
		this.width = width 
		this.height = height
		
		this.dmgCount = 0
		this.qntDamage = 0
		this.velocity = {
			x: 0, 
			y: 0
		}
		this.atributtes = {
			isSolid: true,
			isMovable: false,
			isHeavy: false,
			hasGravity: false,
			doDamage: false
		}
		//
		this.visible = true
		this.type = "Block"
	}

	gravity(){
		this.position.y += this.velocity.y

		if(this.position.y + this.height + this.velocity.y >= canvas.height - 50){
			this.velocity.y = 0
		}else{
			this.velocity.y += GRAVITY
		}
	}

	damage(){
		if(this.position.x < player.position.x + player.width && this.position.x + this.width > player.position.x &&
		    this.position.y < player.position.y + player.height && this.position.y + this.height > player.position.y){

			if(this.dmgCount >= 0){
				player.takeDamage(this.qntDamage)
				this.dmgCount = 0
			}else if(this.dmgCount == 0){
				player.takeDamage(this.qntDamage)
			}
			this.dmgCount++
			
		}else{
			this.dmgCount = 0
		}
	}

	draw(){

		if(this.color){
			ctx.fillStyle = this.color
			ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
			ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
		}else if(this.imgSrc){}
			
	}

	update(){
		this.draw()

		if(this.atributtes.hasGravity){
			this.gravity()
		}

		if(this.atributtes.doDamage){
			this.damage()
		}
	}
}