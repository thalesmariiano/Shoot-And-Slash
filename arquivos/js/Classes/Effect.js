
class Effect extends Sprite {
	constructor({color, position}){
		super({color, position})

		this.width = 0
		this.height = 0
		this.velocity = {
			x: 0,
			y: 0
		}
		this.effectName = ''
		this.type = "Effect"
	}

	onAnimationEnd(){
		this.visible = false	
	}

	update(){
		this.width = this.frameSizeX
		this.height = this.frameSizeY

		this.animation()
		this.switchSprite(`${this.effectName}_${this.direction}`)
	}
}