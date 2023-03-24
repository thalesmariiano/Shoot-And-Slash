
const switchControls = (control, type) => {
	const getControl = window.localStorage.getItem("SaSControl")

	switch(type){
		case 1:
			if(getControl == 2){
				window.localStorage.setItem("SaSControl", 1)
				control.classList.remove("opacity-50", "hover:opacity-75")
				getElement(2).classList.add("opacity-50", "hover:opacity-75")
			}
			break
		case 2:
			if(getControl == 1){
				window.localStorage.setItem("SaSControl", 2)
				control.classList.remove("opacity-50", "hover:opacity-75")
				getElement(1).classList.add("opacity-50", "hover:opacity-75")
			}
			break
	}
}

window.addEventListener("keydown", e => {
	let key = e.code
	switch(key){
		case "ArrowUp":
			keyUp = true
			break
		case "ArrowLeft":
			keyLeft = true
			break
		case "ArrowRight":
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
			// digit1 = true
			// digit2 = false
			// digit3 = false
			break
		case "Digit2":
			selectSlot(2)
			// digit1 = false
			// digit2 = true
			// digit3 = false
			break
		case "Digit3":
			selectSlot(3)
			// digit1 = false
			// digit2 = false
			// digit3 = true
			break
		}
})

window.addEventListener("keyup", e => {
	let key = e.code
	switch(key){
		case "ArrowUp":
			keyUp = false
			break
		case "ArrowRight":
			keyRight = false
			lockLeft = false
			break
		case "ArrowLeft":
			keyLeft = false
			lockRight = false
			break
		case "Enter":
			keyEnter = false
			break
		case "KeyR":
			keyR = false
			break
	}
})
