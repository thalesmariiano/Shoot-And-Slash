
function generateEnemys(amount, health){
	for(i = 0; i < amount; i++){
		const posX = Math.floor(Math.random() * ((mapSize - 50) - 1450 + 1) + 1450)
		const enemy = new Enemy({color: "red", health: health, position: {x: posX, y: 400}})
		enemy.setSprites(enemy_sprites)
		enemys.push(enemy)
	}
}
