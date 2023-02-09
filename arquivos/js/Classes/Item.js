
class Item  {
	constructor({imgSrc, item_sprites, itemType, position}){
		this.imgSrc = imgSrc
		this.item_sprites = item_sprites
		this.sprite = new Image()
		this.itemType = itemType
		this.position = position
		this.velocity = {
			x: 0,
			y: 0
		}
		this.offest ={
			x: 16,
			y: 20
		}
		this.width = 32
		this.height = 32
		//
		this.visible = true
		this.itemValue = 0
		this.isInInventory = false
		this.type = "Item"
	}

	draw(){
		ctx.drawImage(this.sprite, this.position.x - this.offest.x, this.position.y - this.offest.y)
		this.sprite.src = this.imgSrc
	}

	update(){
		this.draw()

		switch(this.itemType){
			case "Life":
				this.itemValue = 30
				break
			case "Bomb":
				this.itemValue = 45
				break
			case "Coin":
				this.itemValue = 1
				break
		}
	}
}