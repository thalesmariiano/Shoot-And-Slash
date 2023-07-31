
const play_button               = document.getElementById("play-button")
const options_button            = document.getElementById("options-button")
const arcade_mode_button        = document.getElementById("arcade-mode-button")
const continue_button           = document.getElementById("continue-button")
const restart_buttons           = document.querySelectorAll(".restart-btns")
const back_to_menu_buttons      = document.querySelectorAll(".back-to-menu-btns")
const back_from_options_button  = document.getElementById("backToMenuOptions-button")
const back_from_gm_button       = document.getElementById("backToGm-button")
const close_news = document.querySelector("#close-news")

arcade_mode_button.addEventListener("click", () => {
	init()

	removeUI("uis-container", "animate__fadeOut")
	showUI("hud-screen", "animate__fadeIn")
})

play_button.addEventListener("click", () => {
	showUI("gamemodes-screen", "animate__fadeIn")
	removeUI("start-screen", "hidden")
})

back_from_gm_button.addEventListener("click", () => {
	showUI("start-screen", "animate__fadeIn")
	removeUI("gamemodes-screen", "hidden")
})

options_button.addEventListener("click", () => {
	showUI("options-screen", "animate__fadeIn")
	removeUI("start-screen", "hidden")
	removeUI("gamemodes-screen", "hidden")
})

back_from_options_button.addEventListener("click", () => {
	showUI("start-screen", "animate__fadeIn")
	removeUI("options-screen", "hidden")
})

continue_button.addEventListener("click", () => {
	continues()
})

restart_buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		restart()

		showUI("hud-screen", "animate__fadeIn")
		removeUI(btn.dataset.screen, "hidden")
	})
})

back_to_menu_buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		destroy()

		showUI("start-screen", "show")
		showUI("uis-container", "animate__fadeIn")
	})
})

dialog_close_button.addEventListener("click", () => {
	dialog_container.classList.remove("left-0")
	dialog_container.classList.add("-left-60")
})

dialog_checkbox.addEventListener("input", () => {
	const value = dialog_checkbox.checked ? 0 : 1
	window.localStorage.setItem("SaSdialog", value)
})


close_skills.addEventListener("click", () => {
	removeUI("skills-screen", "animate__fadeOut")
	showUI("waves-timer-container", "animate__fadeIn")
	$("#waves-hud-timer").innerHTML = "5s"
	waveTimer = 5
})

const newsStoraged = window.localStorage.getItem("SaS-News")

if(parseFloat(newsStoraged) != 1.2){
	showUI("news-screen", "animate__bounceIn")	
	$("body").style.overflow = "hidden"

	close_news.addEventListener("click", () => {
		window.localStorage.setItem("SaS-News", 1.2)
		removeUI("news-screen", "animate__bounceOut")
		$("body").style.overflow = ""
	})
}





