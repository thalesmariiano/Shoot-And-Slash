
playButton.addEventListener("click", () => {
	gameScreen(hud_screen, start_screen)
	gameIsPaused = false
	init()
})

contiueButton.addEventListener("click", () => {
	gameScreen(hud_screen, pause_screen)
	gameIsPaused = false
	init()
})