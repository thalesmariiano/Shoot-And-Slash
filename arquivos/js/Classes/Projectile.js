
class Projectile extends Entity {
	constructor({color, position, projectile}){
		super({color, position})

		this.width = this.entitySizeX = 136
		this.height = this.entitySizeY = 18
		this.velocity = {
			x: 0,
			y: 0
		}
		this.dmg = 20
		//
		this.projectile = projectile
		this.type = "Projectile"
	}

	update(){
		this.animation()

		if(this.projectile == 'fireball'){
			this.velocity.x = 12
			this.switchSprite('fireball_' + this.direction)	
		}

		if(this.direction == 'left') this.position.x -= this.velocity.x
		else this.position.x += this.velocity.x

		this.position.y += this.velocity.y
	}
}