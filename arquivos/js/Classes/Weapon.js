
class Weapon extends Item {
	constructor({imgSrc, gunType, name, munition, gunLimit, itemType, position}){
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
		this.name = name
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
				}, 1500)
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
						y: this.position.y - 9
					}
					const velocity = {
						x: 0,
						y: Math.random() * (.5 - -.5) + -.5 
					}
					var direction = null

					if(lastKeyPressed == "keyLeft"){
						velocity.x = -20
						direction = 'LEFT'
					}else if(lastKeyPressed == "keyRight"){
						position.x += 50
						velocity.x = 20
						direction = 'RIGHT'
					}

					this.bulletsFired.push(new Projectile(position, velocity, this, direction))
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