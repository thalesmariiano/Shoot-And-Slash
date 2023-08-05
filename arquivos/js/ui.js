
const play_button               = document.getElementById("play-button")
const options_button            = document.getElementById("options-button")
const arcade_mode_button        = document.getElementById("arcade-mode-button")
const continue_button           = document.getElementById("continue-button")
const restart_buttons           = document.querySelectorAll(".restart-btns")
const back_to_menu_buttons      = document.querySelectorAll(".back-to-menu-btns")
const back_from_options_button  = document.getElementById("backToMenuOptions-button")
const back_from_gm_button       = document.getElementById("backToGm-button")
const close_news                = document.querySelector("#close-news")

arcade_mode_button.addEventListener("click", () => {
	init()

	removeUI("uis-container", "animate__fadeOut")
	showUI("hud-screen", "animate__fadeIn")

	if(parseInt(getStorage("SaS-Dialog"))){
		showUI("guide-dialog", "animate__slideInLeft")
	}
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
	showUI("hud-screen", "animate__fadeIn")
	removeUI("pause-screen", "hidden")
	if(parseInt(getStorage("SaS-Dialog"))){
		showUI("guide-dialog", "show")
	}
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

close_guide.addEventListener("click", () => {
	removeUI("guide-dialog", "animate__slideOutLeft")
})

guide_checkbox.addEventListener("input", () => {
	const value = guide_checkbox.checked ? 0 : 1
	if(parseInt(getStorage("SaS-Save"))) setStorage("SaS-Dialog", value)
})


close_skills.addEventListener("click", () => {
	removeUI("skills-screen", "animate__fadeOut")
	showUI("waves-timer-container", "animate__fadeIn")
	$("#waves-hud-timer").innerHTML = "5s"
	arcadeWave.waveTimer = 5
})

$("#delete-memory").addEventListener("click", () => {
	showUI("delete-history-dialog", "animate__fadeIn")
})

$("#confirm-delete").addEventListener("click", () => {
	setStorage("SaS-Dialog", 1)
	setStorage("SaS-Arcade", 0)
	setStorage("SaS-News", 0)
	setStorage("SaS-Control", 1)
	removeUI("delete-history-dialog", "animate__fadeOut")
})

$("#cancel-delete").addEventListener("click", () => {
	removeUI("delete-history-dialog", "hidden")
})

$("#save-memory").addEventListener("click", e => {
	if(parseInt(getStorage("SaS-Save"))){
		showUI("save-data-dialog", "animate__fadeIn")
		$("#save-memory").checked = true
	}else{
		setStorage("SaS-Save", 1)
		createStorages()
		$("#save-memory").checked = true
	}
})

$("#confirm-not-save").addEventListener("click", () => {
	setStorage("SaS-Save", 0)
	deleteStorages()
	$("#save-memory").checked = false
	removeUI("save-data-dialog", "animate__fadeOut")
})

$("#cancel-not-save").addEventListener("click", () => {
	removeUI("save-data-dialog", "hidden")
})

if(parseFloat(getStorage("SaS-News")) != 1.3){
	showUI("news-dialog", "animate__bounceIn")	
	$("body").style.overflow = "hidden"

	close_news.addEventListener("click", () => {
		if(parseInt(getStorage("SaS-Save"))) setStorage("SaS-News", 1.3)
		removeUI("news-dialog", "animate__bounceOut")
		$("body").style.overflow = ""
	})
}





