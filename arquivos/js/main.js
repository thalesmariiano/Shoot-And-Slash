
var developerMode = false

const canvas = document.querySelector("canvas")
canvas.width = innerWidth - 50
canvas.height = innerHeight - 70

const screens_container = document.querySelector("#screens-container")
screens_container.style.width = `${canvas.width}px`
screens_container.style.height = `${canvas.height}px`

const ctx = canvas.getContext("2d", {alpha: false})
ctx.imageSmoothingEnabled = false

const GRAVITY = 0.6

var keyRight,
	keyLeft,
	keyUp,
	keyDown,
	keyEnter,
	keyR = false
var digit1,
	digit2,
	digit3 = false

var gameIsPaused = true
var lockPlayerControls = false

var lockLeft,
	lockRight = false

var lastKeyPressed = "keyRight";

// Telas
const start_screen = document.getElementById("start-screen")
const hud_screen   = document.getElementById("hud-screen")
const die_screen   = document.getElementById("die-screen")
const pause_screen = document.getElementById("pause-screen")

const weapon_icon = document.getElementById("weapon-icon-img")

// Botões
const playButton     = document.getElementById("playButton")
const pauseButton    = document.getElementById("pauseButton")
const continueButton = document.getElementById("continueButton")

const munition_amount = document.getElementById("munition-amount")
const bullets_amount  = document.getElementById("bullets-amount")

const player_sprites = {
	idle: {
		name: "idle",
		img: "arquivos/assets/player/idle.png",
		frames: 8
	},
	idle_left: {
		name: "idle_left",
		img: "arquivos/assets/player/idle_left.png",
		frames: 8
	},
	run: {
		name: "run",
		img: "arquivos/assets/player/run.png",
		frames: 8
		
	},
	run_left: {
		name: "run_left",
		img: "arquivos/assets/player/run_left.png",
		frames: 8
	},
	jump: {
		name: "jump",
		img: "arquivos/assets/player/jump.png",
		frames: 2
	},
	jump_left: {
		name: "jump_left",
		img: "arquivos/assets/player/jump_left.png",
		frames: 2
	},
	fall: {
		name: "fall",
		img: "arquivos/assets/player/fall.png",
		frames: 2
	},
	fall_left: {
		name: "fall_left",
		img: "arquivos/assets/player/fall_left.png",
		frames: 2
	},
	take_hit: {
		name: "take-hit",
		img: "arquivos/assets/player/take-hit1.png",
		frames: 4
	},
	death: {
		name: "death",
		img: "arquivos/assets/player/death.png",
		frames: 6
	}
}

const itens_sprites = {
	ak47: {
		img: "arquivos/assets/itens/ak47.png",
		img_invert: "arquivos/assets/itens/ak47_left.png",
		holding_position: {
			x: 55,
			y: 50
		},
		holding_position_left: {
			x: 30,
			y: 50
		}
	},
	escopeta: {
		img: "arquivos/assets/itens/escopeta.png",
		img_invert: "arquivos/assets/itens/escopeta_left.png",
		holding_position: {
			x: 55,
			y: 50
		},
		holding_position_left: {
			x: 30,
			y: 50
		}
	}
}

const player = new Player({imgSrc: player_sprites.idle.img, position: {x: 127, y: 400}})
const camera = new Camera(canvas.width, canvas.height)
const enemys    = [
	// new Enemy({color: "red", health: 100, position: {x: 1900, y: 400}}), 
	// new Enemy({color: "red", health: 100, position: {x: 2000, y: 400}})
]

const life = new Item({
	imgSrc: "arquivos/assets/itens/life.png",
	itemType: "Life",
	position: {
		x: 1600,
		y: 600
	}
})

const ak47 = new Weapon({
	imgSrc: "arquivos/assets/itens/ak47.png",
	name: "Ak-47",
	gunType: "Fuzil",
	munition: 60,
	gunLimit: 30,
	position: {
		x: 350,
		y: 600
	}
})
ak47.item_sprites = itens_sprites.ak47
ak47.bulletsAmount = 30

const escopeta = new Weapon({
	imgSrc: "arquivos/assets/itens/escopeta.png",
	name: "Dôze",
	gunType: "Espingarda",
	munition: 20,
	gunLimit: 10,
	position: {
		x: 500,
		y: 600
	}
})
escopeta.item_sprites = itens_sprites.escopeta
escopeta.bulletsAmount = 10

const itensArray = []
itensArray.push(life, ak47, escopeta)

const playableMapTiles = [
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

const scenarioMapTiles = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

const mapSize = playableMapTiles[0].length*50
const playebleMapBlocks = []
const scenarioMapBlocks = []

function generateTerrain(mapArray, outputArray, colorPallet){
	const tileSize = 50

	for(let row in mapArray){
		for(let column in mapArray[row]){
			const tile = mapArray[row][column]

			const block = {
				color: "darkgreen",
				width: tileSize,
				height: tileSize,
				position: {
					x: column*tileSize,
					y: row*tileSize
				},
				atributtes: {
					isMovable: false
				},
				type: "Block",
				visible: false,
				draw: () => {
					ctx.fillStyle = block.color
					ctx.fillRect(block.position.x, block.position.y, block.width, block.height)
				}
			}

			if(tile != 0){
				switch(tile){
					case 1:
						block.color = "darkgreen"
						break
					case 2:
						block.color = colorPallet ? "#572b00" : "#663300"
						break
					case 3:
						block.color = colorPallet ? "grey" : "#919191"
						break
				}
				outputArray.push(block)
			}	
		}
	}
}

function detectInArea(entity, target, areaTotal, topArea, bottomArea, leftArea, rightArea){
	const {overlap, distance} = collide(target, entity)

	const radar = {
		top: false,
		bottom: false,
		left: false,
		right: false
	}

	const top    = topArea ? topArea : areaTotal
	const bottom = bottomArea ? bottomArea : areaTotal
	const left   = leftArea ? leftArea : areaTotal
	const right  = rightArea ? rightArea : areaTotal

	const isInTopArea = Math.abs(distance.y) < top
	const isInBottomArea = Math.abs(distance.y) < bottom

	const isInLeftArea = Math.abs(distance.x) < left
	const isInRightArea = Math.abs(distance.x) < right

	if(overlap.x >= overlap.y){
		if(distance.y > 0){
			radar.top = isInTopArea
		}else{
			radar.bottom = isInBottomArea
		}
	}else{
		if(distance.x < 0){
			radar.left = isInLeftArea
		}else{
			radar.right = isInRightArea
		}
	}
	return radar
}

function playerActions(){

	// Player parado
	if(!keyUp && !keyLeft && !keyRight && !player.isFalling){
		if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
			player.switchSprite(player_sprites.idle)			
		}else if(lastKeyPressed == "keyLeft"){
			player.switchSprite(player_sprites.idle_left)
		}
		player.isIdle = true
	}else{
		player.isIdle = false
	}

	// Player caindo
	if(player.velocity.y > 0){
		if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
			player.switchSprite(player_sprites.fall)
		}else if(lastKeyPressed == "keyLeft"){
			player.switchSprite(player_sprites.fall_left)
		}	
		player.isFalling = true
	}

	// Player pulando
	if(keyUp){
		if(!player.isFalling){
			if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
				player.switchSprite(player_sprites.jump)
			}else if(lastKeyPressed == "keyLeft"){
				player.switchSprite(player_sprites.jump_left)
			}
			player.velocity.y = player.jump
			player.isFalling = true
		}
	}

	// Player andando para esquerda ou direita
	if(keyLeft || keyRight){
		if(keyLeft && !lockLeft){
			player.velocity.x = -player.speed
			lastKeyPressed = "keyLeft"
			lockRight = true
			if(!player.isFalling){
				player.switchSprite(player_sprites.run_left)	
			}
		}
		if(keyRight && !lockRight){
			player.velocity.x = player.speed
			lastKeyPressed = "keyRight"
			lockLeft = true
			if(!player.isFalling){
				player.switchSprite(player_sprites.run)	
			}
		}
		player.isRunning = true
	}else{
		player.isRunning = false
		player.velocity.x = 0
	}

	// Player atacando
	if(keyEnter){
		const item = player.getHoldingItem()
		if(item && item.type === "Weapon"){
			item.shot()
		}
	}

	// Recarregar Arma
	if(keyR && !keyEnter){
		const item = player.getHoldingItem()
		if(item && item.type === "Weapon"){
			item.reload()
		}
	}

	if(player.health <= 0){
		player.switchSprite(player_sprites.death)
	}
}

function inventorySlots(){

	if(digit1){
		const inventory = player.getInventory(0)
		if(inventory.item){
			inventory.item.visible = true
			inventory.isHolding = true			
		}else{
			digit1 = false
		}

		updateUI("icon", inventory.item)
	}else{
		const inventory = player.getInventory(0)
		if(inventory.item){
			inventory.item.visible = false
			inventory.isHolding = false
		}
	}

	if(digit2){
		const inventory = player.getInventory(1)
		if(inventory.item){
			inventory.item.visible = true
			inventory.isHolding = true
		}else{
			digit2 = false
		}

		updateUI("icon", inventory.item)
	}else{
		const inventory = player.getInventory(1)
		if(inventory.item){
			inventory.item.visible = false
			inventory.isHolding = false
		}
	}

	if(digit3){
		const inventory = player.getInventory(2)
		if(inventory.item){
			inventory.item.visible = true
			inventory.isHolding = true
		}else{
			digit3 = false
		}

		updateUI("icon", inventory.item)
	}else{
		const inventory = player.getInventory(2)
		if(inventory.item){
			inventory.item.visible = false
			inventory.isHolding = false
		}
	}

	const item = player.getHoldingItem()

	if(item && item.type == "Weapon"){
		bullets_amount.innerHTML = `${item.bulletsAmount}`
		munition_amount.innerHTML = `${item.munition}`
	}else{
		bullets_amount.innerHTML = '0'
		munition_amount.innerHTML = '0'
	}

	if(item){
		if(lastKeyPressed == "keyLeft"){
			item.imgSrc     = item.item_sprites.img_invert
			item.position.x = player.position.x - item.item_sprites.holding_position_left.x
			item.position.y = player.position.y + item.item_sprites.holding_position_left.y
		}else if(lastKeyPressed == "keyRight"){
			item.imgSrc     = item.item_sprites.img
			item.position.x = player.position.x + item.item_sprites.holding_position.x
			item.position.y = player.position.y + item.item_sprites.holding_position.y
		}
	}
}

function update(){
	inventorySlots()

	if(player.isDead){
		player.velocity.x = 0
		gameIsPaused = true

		setTimeout(() => {
			gameScreen(die_screen, hud_screen)
		}, 500)
	}else if(lockPlayerControls){
		player.switchSprite(player_sprites.take_hit)	
	}else{
		playerActions()
	}

	camera.update()
}

function render(){
	const skyGradient = ctx.createLinearGradient(0, 0, 0, 150)
	skyGradient.addColorStop(0, "#4287f5")
	skyGradient.addColorStop(1, "#7bc6d1")

	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.translate(
		Math.floor(-camera.x),
		Math.floor(-camera.y)
	)

	ctx.fillStyle = skyGradient
	ctx.fillRect(0, -2500/2, mapSize, 2500)

	scenarioMapBlocks.forEach(block => {
		const detectBlockIn = detectInArea(player, block, 500)
		const blockIsInArea = detectBlockIn.top || detectBlockIn.bottom ||
						      detectBlockIn.right || detectBlockIn.left

		if(blockIsInArea){
			block.visible = true
		}else{
			block.visible = false
		}

		if(block.visible){
			block.draw()
		}
	})

	player.update()

	enemys.forEach((enemy, index) => {
		if(enemy.visible){
			enemy.update()

			playebleMapBlocks.forEach(block => {
				basicCollision(enemy, block)
			})

		}else{
			enemys.splice(index, 1)
			console.log("Inimigo eliminado: " + enemy)
		}
	})

	playebleMapBlocks.forEach(block => {
		const detectBlockIn = detectInArea(player, block, 500)
		const blockIsInArea = detectBlockIn.top || detectBlockIn.bottom ||
						      detectBlockIn.right || detectBlockIn.left

		if(blockIsInArea){
			block.visible = true
		}else{
			block.visible = false
		}

		if(block.visible){
			block.draw()
			basicCollision(player, block)
		}
	})

	itensArray.forEach(item => {
		if(item.visible){
			item.update()

			if(!item.isInInventory){
				itemCollision(collide(player, item))
			}
		}

		if(item.type == "Weapon"){
			item.bulletsFired.forEach(bullet => {
				if(bullet.visible){
					bullet.update()

					enemys.forEach(enemy => {
						if(enemy.visible){
							projectileCollision(collide(bullet, enemy))
						}
					})

					playebleMapBlocks.forEach(block => {
						if(block.visible){
							projectileCollision(collide(bullet, block))
						}
					})
				}
			})
		}
	})

	ctx.restore()

}

function pause(){
	if(!gameIsPaused){
		gameScreen(pause_screen, hud_screen)
		gameIsPaused = true	
	}
}

function loop(){
	if(!gameIsPaused){
		window.requestAnimationFrame(loop)
	}

	render()
	update()
}

function init(){
	generateTerrain(scenarioMapTiles, scenarioMapBlocks, 1)
	generateTerrain(playableMapTiles, playebleMapBlocks, 0)
	loop()
}

