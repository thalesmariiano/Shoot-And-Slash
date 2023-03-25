
play_button.addEventListener("click", () => {
	gameScreen(hud_screen, start_screen)
	generateEnemys(3, 100)
	init()
})

options_button.addEventListener("click", () => {
	gameScreen(options_screen, start_screen)
})

backtomenuoptions_button.addEventListener("click", () => {
	gameScreen(start_screen, options_screen)
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

backtomenu_button.addEventListener("click", () => {
	destroy()
	gameScreen(start_screen, die_screen)
})

dialog_close_button.addEventListener("click", () => {
	dialog_container.classList.remove("left-0")
	dialog_container.classList.add("-left-60")
})

// Popup

// const popup = document.querySelector("#popup-container")

// document.querySelector("#about-button").addEventListener("click", () => {
// 	popup.style.display = "flex"
// })

// document.querySelector("#closePopupBtn").addEventListener("click", () => {
// 	popup.style.display = "none"
// })