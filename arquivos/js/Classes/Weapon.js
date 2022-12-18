
class Weapon extends Item {
	constructor({imgSrc, gunType, munition, gunLimit, itemType, position}){
		super({imgSrc, itemType, position})

		this.shotCount = 0
		this.shotTime = 0
		this.bulletsAmount = 0
		this.munition = munition
		this.gunLimit = gunLimit

		this.bulletsFired = []

		this.reloadTimer = 2500
		this.lockShot = false
		this.gunType = gunType
		this.type = "Weapon"
	}

	animate(){
		if(lastKeyPressed == "keyLeft"){
			this.position.x = player.position.x - Math.floor(Math.random() * (20 - 25) + 20)
		}else if(lastKeyPressed == "keyRight"){
			this.position.x = player.position.x + Math.floor(Math.random() * (50 - 55) + 50)			
		}
		this.position.y = player.position.y + Math.floor(Math.random() * (50 - 51) + 50)
	}

	reload(){
		setTimeout(() => {
			this.bulletsFired.length = 0

			if(this.bulletsAmount <= this.gunLimit){
				if(this.munition){
					while(this.bulletsAmount < this.gunLimit){
						this.munition--
						this.bulletsAmount++
					}
				}
			}
		}, 1500)
	}

	shot(){
		if(this.bulletsAmount){
			this.animate()
			if(!this.lockShot){
				this.lockShot = true	
				const shotTimeout = setTimeout(() => {
					const position = {
						x: this.position.x,
						y: this.position.y - 9
					}
					const velocity = {
						x: 0,
						y: Math.random() * (.5 - -.5) + -.5 
					}

					if(lastKeyPressed == "keyLeft"){
						velocity.x = -20
					}else if(lastKeyPressed == "keyRight"){
						position.x += 50
						velocity.x = 20
					}

					this.bulletsFired.push(new Projectile(position, velocity, this))
					this.bulletsAmount--
					this.lockShot = false
				}, this.shotTime)
			}	
		}
	}

	update(){
		this.draw()

		if(this.gunType == "Fuzil"){
			this.shotTime = 80
		}

		if(this.gunType == "Espingarda"){
			this.shotTime = 350
		}
	}
}