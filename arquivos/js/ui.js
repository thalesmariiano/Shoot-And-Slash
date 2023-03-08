
play_button.addEventListener("click", () => {
	gameScreen(hud_screen, start_screen)
	gameIsPaused = false
	init()
})

continue_button.addEventListener("click", () => {
	gameScreen(hud_screen, pause_screen)
	gameIsPaused = false
	init()
})

// Popup

const popup = document.querySelector("#popup-container")

document.querySelector("#about-button").addEventListener("click", () => {
	popup.style.display = "flex"
})

document.querySelector("#closePopupBtn").addEventListener("click", () => {
	popup.style.display = "none"
})