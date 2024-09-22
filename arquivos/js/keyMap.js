
const keyMap = {
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',
	ArrowUp: 'ArrowUp',
	Space: 'Space',
	KeyA: 'KeyA',
	KeyD: 'KeyD',
	KeyW: 'KeyW',
	KeyF: 'KeyF',
	Enter: 'Enter',
	Escape: 'Escape'
}

const keyState = {}

window.addEventListener("keydown", keyDownHandler)
window.addEventListener("keyup", keyUpHandler)

function keyDownHandler(event){
	const keyPressed = event.code

	if(keyMap[keyPressed]){
		keyState[keyPressed] = true
	}

	if(keyState['Escape']) pause()
}

function keyUpHandler(event){
	const keyReleased = event.code

	if(keyMap[keyReleased]){
		keyState[keyReleased] = false
	}
}


