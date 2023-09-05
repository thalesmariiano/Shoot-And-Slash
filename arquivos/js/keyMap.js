
const controlKey = {
	left: "KeyA",
	right: "KeyD",
	jump: "Space",
	jump_2: "KeyW"
}

if(getStorage("SaS-Control") && getStorage("SaS-Control") == 2){
	$("[data-control='2']").classList.remove("opacity-40", "hover:opacity-75")
	$("[data-control='1']").classList.add("opacity-40", "hover:opacity-75")
	controlKey.left   = "ArrowLeft"
	controlKey.right  = "ArrowRight"
	controlKey.jump   = "ArrowUp"
	controlKey.jump_2 = "Space"
}else{
	$("[data-control='1']").classList.remove("opacity-40", "hover:opacity-75")
	$("[data-control='2']").classList.add("opacity-40", "hover:opacity-75")
	controlKey.left   = "KeyA"
	controlKey.right  = "KeyD"
	controlKey.jump   = "Space"
	controlKey.jump_2 = "KeyW"
}


const switchControls = (control, type) => {
	if(type == 1){
		control.classList.remove("opacity-40", "hover:opacity-75")
		$("[data-control='2']").classList.add("opacity-40", "hover:opacity-75")
		controlKey.left   = "KeyA"
		controlKey.right  = "KeyD"
		controlKey.jump   = "Space"
		controlKey.jump_2 = "KeyW"
		if(getStorage("SaS-Control") == 2) setStorage("SaS-Control", 1)
	}

	if(type == 2){
		control.classList.remove("opacity-40", "hover:opacity-75")
		$("[data-control='1']").classList.add("opacity-40", "hover:opacity-75")
		controlKey.left   = "ArrowLeft"
		controlKey.right  = "ArrowRight"
		controlKey.jump   = "ArrowUp"
		controlKey.jump_2 = "Space"
		if(getStorage("SaS-Control") == 1) setStorage("SaS-Control", 2)
	}
}

window.addEventListener("keydown", keyDownHandler)
window.addEventListener("keyup", keyUpHandler)

function keyDownHandler(e){
	let key = e.code
	switch(key){
		case controlKey.jump:
			keyUp = true
			break
		case controlKey.jump_2:
			keyUp = true
			break
		case controlKey.left:
			keyLeft = true
			break
		case controlKey.right:
			keyRight = true
			break
		case "Enter":
			keyEnter = true
			break
		case "KeyR":
			keyR = true
			break
		case "Escape":
			pause()
			break
		case "Digit1":
			selectPlayerSlot(1)
			break
		case "Digit2":
			selectPlayerSlot(2)
			break
		case "Digit3":
			selectPlayerSlot(3)
			break
	}
}

function keyUpHandler(e){
	let key = e.code
	switch(key){
		case controlKey.jump:
			keyUp = false
			break
		case controlKey.jump_2:
			keyUp = false
			break
		case controlKey.left:
			keyLeft = false
			lockRight = false
			break
		case controlKey.right:
			keyRight = false
			lockLeft = false
			break
		case "Enter":
			keyEnter = false
			break
		case "KeyR":
			keyR = false
			break
	}
}


