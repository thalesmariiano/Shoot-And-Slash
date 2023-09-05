
class EnemyWave {
	constructor(count, health){
		this.enemys = []
		this.waveStarted = false
		this.waveIsPlaying = false
		this.waveNumber = 1
		this.waveTimer = 15
		this.enemysCount = count
		this.enemyHealth = health
	}

	restart(){
		this.waveStarted = false
		this.waveIsPlaying = false
		this.waveNumber = 1
		this.waveTimer = 15
		this.enemysCount = 3
		this.enemyHealth = 100
		enemys.length = 0
	}

	init(){
		$("#waves-text").innerHTML = `Onda ${this.waveNumber}`
		showUI("waves-container", "animate__fadeIn")
		setTimeout(() => removeUI("waves-container", "animate__fadeOut"), 3000)
		generateEnemys(this.enemysCount, this.enemyHealth)
	}
}