
const canvas = document.querySelector("canvas")
canvas.width = innerWidth - 50
canvas.height = 570

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

const playerSprites = {
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
	death: {
		name: "death",
		img: "arquivos/assets/player/death.png",
		frames: 6
	}
}

const player = new Player({imgSrc: playerSprites.idle.img, position: {x: 127, y: 400}})
const camera = new Camera(canvas.width, canvas.height)
const mapBlocks = [[],[]]
const enemys    = []

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
	gunType: "Fuzil",
	munition: 60,
	gunLimit: 30,
	position: {
		x: 350,
		y: 600
	}
})
ak47.bulletsAmount = 30

const escopeta = new Weapon({
	imgSrc: "arquivos/assets/itens/escopeta.png",
	gunType: "Espingarda",
	munition: 20,
	gunLimit: 10,
	position: {
		x: 500,
		y: 600
	}
})
escopeta.bulletsAmount = 10

const itensArray = []
itensArray.push(life, ak47, escopeta)

const playableMapTiles = [
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
	[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

const scenarioMapTiles = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

const mapSize = playableMapTiles[0].length*50

function generateTerrain(){
	const tileSize = 50

	for(let row in playableMapTiles){
		for(let column in playableMapTiles[row]){
			const tile = playableMapTiles[row][column]

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
				visible: true
			}

			if(tile != 0){
				switch(tile){
					case 1:
						block.color = "darkgreen"
						mapBlocks[0].push(block)
						break
					case 2:
						block.color = "#663300"
						mapBlocks[0].push(block)
						break
					case 3:
						block.color = "#919191"
						mapBlocks[0].push(block)
						break
				}
			}	
		}
	}

	for(let row in scenarioMapTiles){
		for(let column in scenarioMapTiles[row]){
			const tile = scenarioMapTiles[row][column]

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
				visible: true
			}

			if(tile != 0){
				switch(tile){
					case 1:
						block.color = "darkgreen"
						mapBlocks[1].push(block)
						break
					case 2:
						block.color = "#572b00"
						mapBlocks[1].push(block)
						break
					case 3:
						block.color = "grey"
						mapBlocks[1].push(block)
						break
				}
			}	
		}
	}
}

function playerActions(){

	// Player parado
	if(!keyUp && !keyLeft && !keyRight && !player.isFalling){
		if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
			player.switchSprite(playerSprites.idle)			
		}else if(lastKeyPressed == "keyLeft"){
			player.switchSprite(playerSprites.idle_left)
		}
		player.isIdle = true
	}else{
		player.isIdle = false
	}

	// Player caindo
	if(player.velocity.y > 0){
		if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
			player.switchSprite(playerSprites.fall)
		}else if(lastKeyPressed == "keyLeft"){
			player.switchSprite(playerSprites.fall_left)
		}	
		player.isFalling = true
	}

	// Player pulando
	if(keyUp){
		if(!player.isFalling){
			if(lastKeyPressed == "keyRight" || !lastKeyPressed[0]){
				player.switchSprite(playerSprites.jump)
			}else if(lastKeyPressed == "keyLeft"){
				player.switchSprite(playerSprites.jump_left)
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
				player.switchSprite(playerSprites.run_left)	
			}
		}
		if(keyRight && !lockRight){
			player.velocity.x = player.speed
			lastKeyPressed = "keyRight"
			lockLeft = true
			if(!player.isFalling){
				player.switchSprite(playerSprites.run)	
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

	// Player morrendo
	if(player.health <= 0){
		player.switchSprite(playerSprites.death)
	}
}

function inventorySlots(){
	if(digit1){
		const inventory = player.getInventory(0)
		if(inventory.item){
			inventory.item.visible = true
			inventory.isHolding = true

			if(lastKeyPressed == "keyLeft"){
				inventory.item.imgSrc = "arquivos/assets/itens/ak47_left.png"
				inventory.item.position.x = player.position.x - 30
				inventory.item.position.y = player.position.y + 50
			}else if(lastKeyPressed == "keyRight"){
				inventory.item.imgSrc = "arquivos/assets/itens/ak47.png"
				inventory.item.position.x = player.position.x + 55
				inventory.item.position.y = player.position.y + 50
			}
				
			weapon_icon.src = inventory.item.imgSrc
		}else{
			digit1 = false
		}
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

			inventory.item.position.x = player.position.x + 55
			inventory.item.position.y = player.position.y + 50

			weapon_icon.src = inventory.item.imgSrc
		}else{
			digit2 = false
		}
	}else{
		const inventory = player.getInventory(1)
		if(inventory.item){
			inventory.item.visible = false
			inventory.isHolding = false

			inventory.item.position.x = player.position.x + 55
			inventory.item.position.y = player.position.y + 50
		}
	}

	if(digit3){
		const inventory = player.getInventory(2)
		if(inventory.item){
			inventory.item.visible = true
			inventory.isHolding = true

			weapon_icon.src = inventory.item.imgSrc
		}else{
			digit3 = false
		}
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
	}
}

function generateEnemys(amount, health){
	for(i = 0; i < amount; i++){
		const posX = Math.floor(Math.random() * (3200 - 5000) + 3200)
		enemys.push(new Enemy({color: "red", health: health, position: {x: posX, y: 400}}))
	}
}

function update(){
	inventorySlots()
	playerActions()

	camera.update()
}

function render(){
	const skyGradient = ctx.createLinearGradient(0, 0, 0, 150)
	skyGradient.addColorStop(0, "#4287f5")
	skyGradient.addColorStop(1, "#7bc6d1")

	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.translate(-camera.x, -camera.y)

	ctx.fillStyle = skyGradient
	ctx.fillRect(0, -2500/2, mapSize, 2500)

	mapBlocks[1].forEach(block => {
		if(block.visible){
			ctx.fillStyle = block.color
			ctx.fillRect(block.position.x, block.position.y, block.width, block.height)
		}
	})

	player.update()

	enemys.forEach((enemy, index) => {
		if(enemy.visible){
			enemy.update()

			mapBlocks[0].forEach(block => {
				if(block.visible){
					basicCollision(enemy, block)
				}
			})
		}else{
			enemys.splice(index, 1)
		}
	})

	mapBlocks[0].forEach(block => {
		if(block.visible){
			ctx.fillStyle = block.color
			ctx.fillRect(block.position.x, block.position.y, block.width, block.height)

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

					mapBlocks[0].forEach(block => {
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
	generateTerrain()
	loop()
}

