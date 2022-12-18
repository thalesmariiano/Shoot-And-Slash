
const gameScreen = (screen1, screen2) => {
	screen1.style.display = "flex"
	screen2.style.display = "none"
}

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