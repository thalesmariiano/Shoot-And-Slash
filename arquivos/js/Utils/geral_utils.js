
function generateEnemys(amount, health){
	for(i = 0; i < amount; i++){
		const posX = Math.floor(Math.random() * ((mapSize - 50) - 1450 + 1) + 1450)
		enemys.push(new Enemy({color: "red", health: health, position: {x: posX, y: 400}}))
	}
}
