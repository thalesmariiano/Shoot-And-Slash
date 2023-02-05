
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

// Popup

const popup = document.querySelector("#popup-container")

document.querySelector("#aboutButton").addEventListener("click", () => {
	popup.style.display = "flex"
})

document.querySelector("#closePopupBtn").addEventListener("click", () => {
	popup.style.display = "none"
})