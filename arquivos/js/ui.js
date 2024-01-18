
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
	newArcade.init()

	removeUI("uis-container", "animate__fadeOut")
	showUI("hud-screen", "animate__fadeIn")

	if(parseInt(game_storage.readStorage("SaS-Dialog"))){
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
	if(parseInt(game_storage.readStorage("SaS-Dialog"))){
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
	if(game_storage.saveAllowed()) game_storage.updateStorage("SaS-Dialog", value)
})


close_skills.addEventListener("click", () => {
	newArcade.skipTimer()
})

$("#delete-memory").addEventListener("click", () => {
	showUI("delete-history-dialog", "animate__fadeIn")
})

$("#confirm-delete").addEventListener("click", () => {
	game_storage.updateStorage("SaS-Dialog", 1) // restarting values
	game_storage.updateStorage("SaS-Arcade", 0) // restarting values
	game_storage.updateStorage("SaS-News", 0) // restarting values
	removeUI("delete-history-dialog", "animate__fadeOut")
})

$("#cancel-delete").addEventListener("click", () => {
	removeUI("delete-history-dialog", "hidden")
})

$("#save-memory").addEventListener("click", e => {
	if(game_storage.saveAllowed()){
		showUI("save-data-dialog", "animate__fadeIn")
		$("#save-memory").checked = true
	}else{
		game_storage.updateStorage("SaS-Save", 1)
		game_storage.createStorage("SaS-Dialog", 1) 
		game_storage.createStorage("SaS-Arcade", 0) 
		game_storage.createStorage("SaS-News", 0) 
		$("#save-memory").checked = true
	}
})

$("#confirm-not-save").addEventListener("click", () => {
	game_storage.updateStorage("SaS-Save", 0)
	game_storage.clearStorages()
	$("#save-memory").checked = false
	removeUI("save-data-dialog", "animate__fadeOut")
})

$("#cancel-not-save").addEventListener("click", () => {
	removeUI("save-data-dialog", "hidden")
})

if(parseFloat(game_storage.readStorage("SaS-News")) != 1.3){
	showUI("news-dialog", "animate__bounceIn")	
	$("body").style.overflow = "hidden"

	close_news.addEventListener("click", () => {
		if(game_storage.saveAllowed()) game_storage.updateStorage("SaS-News", 1.3)
		removeUI("news-dialog", "animate__bounceOut")
		$("body").style.overflow = ""
	})
}





