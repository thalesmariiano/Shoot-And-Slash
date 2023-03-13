
play_button.addEventListener("click", () => {
	gameScreen(hud_screen, start_screen)
	generateEnemys(3, 100)
	init()
})

restart_button.addEventListener("click", () => {
	restart()
	gameScreen(hud_screen, die_screen)
})

restart_button_2.addEventListener("click", () => {
	restart()
	gameScreen(hud_screen, pause_screen)
})


continue_button.addEventListener("click", () => {
	gameScreen(hud_screen, pause_screen)
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