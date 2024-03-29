
class Weapon extends Item {
	constructor({gunType, name, bullets, munition, gunLimit, itemType, position}){
		super({itemType, position})

		this.height = 24
		this.shotTime = 0
		this.bulletsAmount = bullets
		this.munition = munition
		this.gunLimit = gunLimit

		this.bulletsFired = []

		this.reloadTime = 1500
		this.lockShot = false
		this.gunType = gunType
		this.name = name

		this.offest = {
			x: 15,
			y: 0
		}

		this.entitySizeX = 64
		this.entitySizeY = 32
		this.type = "Weapon"
	}

	animate(){
		if(player.direction == "LEFT"){
			this.position.x = player.position.x - Math.floor(Math.random() * (20 - 25) + 20)
		}else if(player.direction == "RIGHT"){
			this.position.x = player.position.x + Math.floor(Math.random() * (50 - 55) + 50)			
		}
		this.position.y = player.position.y + Math.floor(Math.random() * (30 - 31) + 30)
	}

	reload(){
		if(this.bulletsAmount <= this.gunLimit){
			if(this.munition){
				setTimeout(() => {
					this.bulletsFired.length = 0
					const currentBullets = Math.abs(this.bulletsAmount - this.gunLimit)
					if(currentBullets < this.munition){
						this.bulletsAmount += currentBullets
						this.munition -= currentBullets
					}else{
						this.bulletsAmount += this.munition
						this.munition = 0
					}
					bullets_amount.innerHTML = this.bulletsAmount
					munition_amount.innerHTML = this.munition
				}, this.reloadTime)
			}
		}
	}

	shot(){
		if(this.bulletsAmount){
			this.animate()
			if(!this.lockShot){
				this.lockShot = true	
				const shotTimeout = setTimeout(() => {
					const position = {
						x: this.position.x,
						y: this.position.y + 11
					}
					const velocity = {
						x: 0,
						y: Math.random() * (.5 - -.5) + -.5 
					}

					if(player.direction == "LEFT"){
						velocity.x = -20
					}else if(player.direction == "RIGHT"){
						position.x += 50
						velocity.x = 20
					}

					this.bulletsFired.push(new Projectile(position, velocity, this, player.direction))
					this.bulletsAmount--
					this.lockShot = false
				}, this.shotTime)
			}	
		}
	}

	update(){
		this.draw()

		if(!this.isInInventory){
			this.switchSprite(`ak47_right`)			
		}

		if(this.gunType == "Fuzil"){
			this.shotTime = 80
		}

		// if(this.gunType == "Espingarda"){
		// 	this.shotTime = 350
		// }

		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

	}
}