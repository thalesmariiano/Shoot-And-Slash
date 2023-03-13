
play_button.addEventListener("click", () => {
	gameScreen(hud_screen, start_screen)
	gameIsPaused = false
	generateEnemys(3, 100)
	init()
})

restart_button.addEventListener("click", () => {
	gameIsPaused = false
	enemys.length = 0
	generateEnemys(3, 100)
	init()
	player.receiveLife(100)
	player.isDead = false
	player.framesHold = 5
	player.framesElapsed = 0
	player.switchSprite("idle")
	player.animateFinished = false
	player.position.x = gamesave.player.position.x
	player.position.y = gamesave.player.position.y
	player.inventory.forEach(slot => {
		slot.item = null
		slot.isHolding = false
	})
	gameScreen(hud_screen, die_screen)
})

continue_button.addEventListener("click", () => {
	gameScreen(hud_screen, pause_screen)
	gameIsPaused = false
	init()
})

// Popup

// const popup = document.querySelector("#popup-container")

// document.querySelector("#about-button").addEventListener("click", () => {
// 	popup.style.display = "flex"
// })

// document.querySelector("#closePopupBtn").addEventListener("click", () => {
// 	popup.style.display = "none"
// })