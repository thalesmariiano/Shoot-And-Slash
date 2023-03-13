
class Projectile {
	constructor(position, velocity, weapon, direction){
		this.color = "black"
		this.position = position
		this.width = 4
		this.height = 3
		this.velocity = velocity
		this.dmg = 0
		this.weapon = weapon
		this.direction = direction
		//
		this.visible = true
		this.type = "Projectile"
	}

	draw(){
		ctx.fillStyle = this.color
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update(){
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if(this.weapon.gunType == "Fuzil"){
			this.dmg = 8
		}

		if(this.weapon.gunType == "Espingarda"){
			this.dmg = 10
		}
	}
}