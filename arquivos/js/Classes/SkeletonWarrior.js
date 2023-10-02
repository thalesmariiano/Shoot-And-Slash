class SkeletonWarrior extends Enemy {
	constructor({color, health, position}){
		super({color, health, position})
	}

	onAnimationEnd(animation){
		if(animation.name == `dead_${this.direction}`){
			this.stopAnimation = true
			this.dropItem()
			setTimeout(() => this.visible = false, 3000)
		}
	}
}