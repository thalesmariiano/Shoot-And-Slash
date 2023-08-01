
const controlKey = {
	left: null,
	right: null,
	jump: null,
	jump_2: null
}

if(getStorage("SaSControl") == 2){
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
		if(getStorage("SaSControl") == 2){
			setStorage("SaSControl", 1)
			control.classList.remove("opacity-40", "hover:opacity-75")
			$("[data-control='2']").classList.add("opacity-40", "hover:opacity-75")
			controlKey.left   = "KeyA"
			controlKey.right  = "KeyD"
			controlKey.jump   = "Space"
			controlKey.jump_2 = "KeyW"
			dialogOpened = false
		}
	}

	if(type == 2){
		if(getStorage("SaSControl") == 1){
			setStorage("SaSControl", 2)
			control.classList.remove("opacity-40", "hover:opacity-75")
			$("[data-control='1']").classList.add("opacity-40", "hover:opacity-75")
			controlKey.left   = "ArrowLeft"
			controlKey.right  = "ArrowRight"
			controlKey.jump   = "ArrowUp"
			controlKey.jump_2 = "Space"
			dialogOpened = false
		}
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
			selectSlot(1)
			break
		case "Digit2":
			selectSlot(2)
			break
		case "Digit3":
			selectSlot(3)
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


