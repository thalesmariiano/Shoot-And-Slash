
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
	GAMEMODE = arcade()
	GAMEMODE.init()

	removeUI("uis-container", "animate__fadeOut")
	showUI("hud-screen", "animate__fadeIn")

	if(!parseInt(getStorage("SaS-Guide"))){
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

	if(!parseInt(getStorage("SaS-Guide"))){
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
	const value = guide_checkbox.checked ? 1 : 0
	if(parseInt(getStorage('SaS-Save'))){
		setStorage("SaS-Guide", value)
	}
})


close_skills.addEventListener("click", () => {
	if(GAMEMODE){
		GAMEMODE.skipTimer()		
	}
})

$("#delete-data").addEventListener("click", () => {
	showUI("delete-history-dialog", "animate__fadeIn")
})

$("#confirm-delete-data").addEventListener("click", () => {
	setStorage("SaS-Guide", 0) // restarting values
	setStorage("SaS-Arcade", 0) // restarting values
	setStorage("SaS-News", 0) // restarting values
	removeUI("delete-history-dialog", "animate__fadeOut")
})

$("#not-delete-data").addEventListener("click", () => {
	removeUI("delete-history-dialog", "hidden")
})

$("#save-data-input").addEventListener("click", e => {
	if(parseInt(getStorage('SaS-Save'))){
		showUI("save-data-dialog", "animate__fadeIn")
		$("#save-data-input").checked = true
		return
	}

	setStorage("SaS-Save", 1)
	setStorage("SaS-Arcade", 0)
	$("#save-data-input").checked = true
})

$("#not-save-data").addEventListener("click", () => {
	setStorage("SaS-Save", 0)
	deleteStorage("SaS-Guide") 
	deleteStorage("SaS-Arcade") 
	deleteStorage("SaS-News") 
	$("#save-data-input").checked = false
	removeUI("save-data-dialog", "animate__fadeOut")
})

$("#confirm-save-data").addEventListener("click", () => {
	removeUI("save-data-dialog", "hidden")
})

if(getStorage("SaS-News") != '1.3.1'){
	showUI("news-dialog", "animate__bounceIn")	

	close_news.addEventListener("click", () => {
		if(parseInt(getStorage('SaS-Save'))){
			setStorage("SaS-News", '1.3.1')
		}
		removeUI("news-dialog", "animate__bounceOut")
	})
}





