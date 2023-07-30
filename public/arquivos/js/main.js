if(!window.localStorage.getItem("SaSdialog")) window.localStorage.setItem("SaSdialog", 1)
if(!window.localStorage.getItem("SaS-Arcade")) window.localStorage.setItem("SaS-Arcade", 0)
if(!window.localStorage.getItem("SaS-News")) window.localStorage.setItem("SaS-Arcade", 0)


document.querySelector("#arcade-record").innerHTML = `Recorde: ${window.localStorage.getItem("SaS-Arcade")}`

var developerMode = false

const canvas            = document.querySelector("canvas")
const display = canvas.getContext("2d", {alpha: false})

const cv = document.createElement("canvas")
const buffer = cv.getContext('2d', {alpha: false})

const screens_container = document.querySelector("#screens-container")

const GRAVITY = 0.6

var keyRight,
    keyLeft,
    keyUp,
    keyDown,
    keyEnter,
    keyR = false

var gameIsPaused = true
var waveStarted = false
var onWaves = false

var enemysCount = 0
var gameWave = 0
var waveTimer = 15
var enemysKilled = 0

var lockLeft,
    lockRight = false

const tilemap = new Image()
tilemap.src   = "arquivos/assets/map/tilemap.png"

const parallax_back = new Image()
parallax_back.src   = "arquivos/assets/map/parallax-forest-back.png"

const parallax_light = new Image()
parallax_light.src   = "arquivos/assets/map/parallax-forest-lights.png"

const parallax_middle = new Image()
parallax_middle.src   = "arquivos/assets/map/parallax-forest-middle-trees.png"

const parallax_front = new Image()
parallax_front.src   = "arquivos/assets/map/parallax-forest-front-trees.png"


const hud_screen      = document.getElementById("hud-screen")
const weapon_icon     = document.getElementById("weapon-icon")
const weapon_icon_img = document.getElementById("weapon-icon-img")
const weapon_status   = document.getElementById("weapon-status")
const munition_amount = document.getElementById("munition-amount")
const bullets_amount  = document.getElementById("bullets-amount")

const souls_amount    = document.getElementById("souls-amount")

// Dialog
const dialog_container    = document.getElementById("dialog-container")
const dialog_close_button = document.getElementById("close-dialog-button")
const dialog_checkbox     = document.querySelector("[name=dontshow]")

const health_container = document.getElementById("health-container")
const health_bar       = document.getElementById("health-bar")
const health_amount    = document.getElementById("health-amount")
const points           = document.getElementsByClassName("health-points")

const waves_count        = document.getElementById("waves-count")
const kills_count        = document.getElementById("kills-count")
const waves_skills_timer = document.getElementById("waves-skills-timer")
const waves_hud_timer    = document.getElementById("waves-hud-timer")

const close_skills = document.getElementById("close-skills")
const skillsButton = document.querySelectorAll("[data-skill]")
const itensButton  = document.querySelectorAll("[data-item]")

const player_sprites = [
	{
		name: "idle_right",
		image: "arquivos/assets/player/idle.png",
		frames: 8
	},
	{
		name: "idle_left",
		image: "arquivos/assets/player/idle_left.png",
		frames: 8
	},
	{
		name: "run_right",
		image: "arquivos/assets/player/run.png",
		frames: 8
		
	},
	{
		name: "run_left",
		image: "arquivos/assets/player/run_left.png",
		frames: 8
	},
	{
		name: "jump_right",
		image: "arquivos/assets/player/jump.png",
		frames: 2
	},
	{
		name: "jump_left",
		image: "arquivos/assets/player/jump_left.png",
		frames: 2
	},
	{
		name: "fall_right",
		image: "arquivos/assets/player/fall.png",
		frames: 2
	},
	{
		name: "fall_left",
		image: "arquivos/assets/player/fall_left.png",
		frames: 2
	},
	{
		name: "attack_1_right",
		image: "arquivos/assets/player/attack1.png",
		frames: 6,
		hold: 6
	},
	{
		name: "attack_1_left",
		image: "arquivos/assets/player/attack1_left.png",
		frames: 6,
		hold: 6
	},
	{
		name: "attack_2_right",
		image: "arquivos/assets/player/attack2.png",
		frames: 6,
		hold: 6
	},
	{
		name: "attack_2_left",
		image: "arquivos/assets/player/attack2_left.png",
		frames: 6,
		hold: 6
	},
	{
		name: "take-hit_right",
		image: "arquivos/assets/player/take-hit.png",
		frames: 4,
		hold: 8
	},
	{
		name: "take-hit_left",
		image: "arquivos/assets/player/take-hit_left.png",
		frames: 4,
		hold: 8
	},
	{
		name: "death_right",
		image: "arquivos/assets/player/death.png",
		frames: 6,
		hold: 8
	},
	{
		name: "death_left",
		image: "arquivos/assets/player/death_left.png",
		frames: 6,
		hold: 8
	}
]

const itens_sprites = {
	ak47: {
		sprites: [
			{
				name: "ak47_right",
				image: "arquivos/assets/itens/ak47.png",
				frames: 1
			},
			{
				name: "ak47_left",
				image: "arquivos/assets/itens/ak47_left.png",
				frames: 1
			}
		],
		holding_position: {
			x: 55,
			y: 30
		},
		holding_position_left: {
			x: 30,
			y: 30
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
	},
	enemy_soul: {
		sprites: [
			{
				name: "soul",
				image: "arquivos/assets/itens/enemy_soul.png",
				frames: 4,
				hold: 6
			}
		],
	},
	life: {
		sprites: [
			{
				name: "life",
				image: "arquivos/assets/itens/life.png",
				frames: 1,
			}
		],
	}
}

const enemy_sprites = [
	{
		name: "idle_right",
		image: "arquivos/assets/enemys/skeleton_idle.png",
		frames: 7
	},
	{
		name: "idle_left",
		image: "arquivos/assets/enemys/skeleton_idle_left.png",
		frames: 7
	},
	{
		name: "run_right",
		image: "arquivos/assets/enemys/skeleton_run.png",
		frames: 8
	},
	{
		name: "run_left",
		image: "arquivos/assets/enemys/skeleton_run_left.png",
		frames: 8
	},
	{
		name: "walk_right",
		image: "arquivos/assets/enemys/skeleton_walk.png",
		frames: 7
	},
	{
		name: "walk_left",
		image: "arquivos/assets/enemys/skeleton_walk_left.png",
		frames: 7
	},
	{
		name: "attack_run_right",
		image: "arquivos/assets/enemys/skeleton_attack_run.png",
		frames: 7
	},
	{
		name: "attack_run_left",
		image: "arquivos/assets/enemys/skeleton_attack_run_left.png",
		frames: 7
	},
	{
		name: "attack_1_right",
		image: "arquivos/assets/enemys/skeleton_attack_1.png",
		frames: 5,
		hold: 6
	},
	{
		name: "attack_1_left",
		image: "arquivos/assets/enemys/skeleton_attack_1_left.png",
		frames: 5,
		hold: 6
	},
	{
		name: "attack_2_right",
		image: "arquivos/assets/enemys/skeleton_attack_2.png",
		frames: 6
	},
	{
		name: "attack_2_left",
		image: "arquivos/assets/enemys/skeleton_attack_2_left.png",
		frames: 6
	},
	{
		name: "attack_3_right",
		image: "arquivos/assets/enemys/skeleton_attack_3.png",
		frames: 4
	},
	{
		name: "attack_3_left",
		image: "arquivos/assets/enemys/skeleton_attack_3_left.png",
		frames: 4
	},
	{
		name: "take_hit_right",
		image: "arquivos/assets/enemys/skeleton_hit.png",
		frames: 2
	},
	{
		name: "take_hit_left",
		image: "arquivos/assets/enemys/skeleton_hit_left.png",
		frames: 2
	},
	{
		name: "dead_right",
		image: "arquivos/assets/enemys/skeleton_dead.png",
		frames: 4,
		hold: 6
	},
	{
		name: "dead_left",
		image: "arquivos/assets/enemys/skeleton_dead_left.png",
		frames: 4,
		hold: 6
	}
]

spriteConverter(enemy_sprites)
spriteConverter(player_sprites)
spriteConverter(itens_sprites.enemy_soul.sprites)
spriteConverter(itens_sprites.life.sprites)
spriteConverter(itens_sprites.ak47.sprites)

const enemys = []

const player = new Player({position: {x: 127, y: 380}})
player.setSprites(player_sprites)
const camera = new Camera()

const life = new Item({
	itemType: "life",
	position: {
		x: 1600,
		y: 615
	}
})
life.setSprites(itens_sprites.life.sprites)

const ak47 = new Weapon({
	name: "Ak-47",
	gunType: "Fuzil",
	munition: 60,
	gunLimit: 30,
	bullets: 30,
	position: {
		x: -200,
		y: 525
	}
})
ak47.setSprites(itens_sprites.ak47.sprites)

// const escopeta = new Weapon({
// 	imgSrc: "arquivos/assets/itens/escopeta.png",
// 	name: "Dôze",
// 	gunType: "Espingarda",
// 	munition: 20,
// 	gunLimit: 10,
// 	position: {
// 		x: 500,
// 		y: 530
// 	}
// })
// escopeta.item_sprites = itens_sprites.escopeta
// escopeta.bulletsAmount = 10


const itensArray = []
itensArray.push(ak47, life)

const first_MapTiles = [
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[3,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4.5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3.5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
]

const mapSize = first_MapTiles[0].length*50
const mapHeight = first_MapTiles.length*50
const playebleMapBlocks = []

generateTerrain(first_MapTiles, playebleMapBlocks)

skillsButton.forEach(button => {
	button.addEventListener("click", () => {
		const skillType     = button.dataset.skill
		const skillPrice    = parseInt(button.dataset.price)
		const skillLevel    = parseInt(button.dataset.level)
		const skillLevelMax = parseInt(button.dataset.max)

		const level_text = button.children[0].children[1]
		const price_text = button.nextElementSibling

		const isMaxLevel = skillLevel >= skillLevelMax 

		if(isMaxLevel){
			level_text.innerHTML = "Max"
			level_text.style.color = "#f74a4a"

			setTimeout(() => {
				level_text.style.color = ""
				level_text.innerHTML = `Lv ${button.dataset.level}`		
			}, 1000)
			return
		}

		if(player.souls < skillPrice){
			price_text.classList.add("animate__animated", "animate__shakeX")
			price_text.style.background = "#f74a4a"
			button.style.border = "2px solid #f74a4a"

			price_text.addEventListener("animationend", () => {
				price_text.classList.remove("animate__animated", "animate__shakeX")
				price_text.style.background = ""
				button.style.border = ""
			})
			return
		}

		price_text.style.background = "green"
		button.style.border = "2px solid green"

		setTimeout(() => {
			price_text.style.background = ""
			button.style.border = ""
		}, 700)

		player.souls -= skillPrice
		souls_amount.innerHTML = player.souls

		button.dataset.price = skillPrice + 5
		price_text.innerHTML = `${button.dataset.price} Almas`

		button.dataset.level++
		level_text.innerHTML = `Lv ${button.dataset.level}`

		updateSkill(skillType)
	})
})

function updateSkill(skill){
	switch(skill){
		case "speed":
			player.speed += .3
			break
		case "health":
			player.maxHealth += 10
			player.receiveLife(1000)
			health_bar.innerHTML += "<div class='health-points'></div>"
			health_container.style.width = player.maxHealth + "px"
			health_amount.style.width = player.maxHealth + "px"
			break
		case "strength":
			player.attDamage += 1
			break
		case "attackspeed":
			player.attackSpeedMax = true
			break
		case "loot":
			player.dropLuck += 5
			break
	}
}

itensButton.forEach(button => {
	button.addEventListener("click", () => {
		const itemType   = button.dataset.item
		const skillPrice = parseInt(button.dataset.price)
		const price_text = button.nextElementSibling

		if(player.souls < skillPrice){
			price_text.classList.add("animate__animated", "animate__shakeX")
			price_text.style.background = "#f74a4a"
			button.style.border = "2px solid #f74a4a"

			price_text.addEventListener("animationend", () => {
				price_text.classList.remove("animate__animated", "animate__shakeX")
				price_text.style.background = ""
				button.style.border = ""
			})
			return
		}

		price_text.style.background = "green"
		button.style.border = "2px solid green"

		setTimeout(() => {
			price_text.style.background = ""
			button.style.border = ""
		}, 700)

		player.souls -= skillPrice
		souls_amount.innerHTML = player.souls

		buyItens(itemType)
	})
})

function buyItens(item){
	switch(item){
		case "ak47":
		player.inventory[0].item = ak47
		ak47.bulletsAmount = 30
		ak47.munition = 60
		updateUI("icon", ak47.name)
		weapon_status.classList.remove("hidden")
		bullets_amount.innerHTML = ak47.bulletsAmount
		munition_amount.innerHTML = ak47.munition
		break
	}
}

function playerActions(){

	// Player parado
	if(!keyUp && !player.isRunning && !player.isAttacking && !player.receiveDamage && !player.isFalling){
		player.switchSprite(`idle_${player.direction.toLowerCase()}`)
		player.isIdle = true
	}else{
		player.isIdle = false
	}

	// Player caindo
	if(player.velocity.y > 0){
		player.receiveDamage = false
		player.switchSprite(`fall_${player.direction.toLowerCase()}`)
		player.isFalling = true
	}

	// Player pulando
	if(keyUp){
		if(!player.isFalling){
			player.switchSprite(`jump_${player.direction.toLowerCase()}`)
			player.velocity.y = player.jump
			player.isFalling = true
		}
	}

	// Player andando para esquerda ou direita
	if(keyLeft || keyRight){
		player.receiveDamage = false
		if(keyLeft && !lockLeft){
			player.velocity.x = -player.speed
			player.direction = "LEFT"
			lockRight = true
			if(!player.isFalling){
				player.switchSprite(`run_${player.direction.toLowerCase()}`)
			}
		}
		if(keyRight && !lockRight){
			player.velocity.x = player.speed
			player.direction = "RIGHT"
			lockLeft = true
			if(!player.isFalling){
				player.switchSprite(`run_${player.direction.toLowerCase()}`)
			}
		}
		player.isRunning = true
	}else{
		player.isRunning = false
		player.velocity.x = 0
	}

	if(player.receiveDamage && !player.isAttacking){
		player.switchSprite(`take-hit_${player.direction.toLowerCase()}`)
	}

	// Player atacando
	if(keyEnter){
		const slot = player.getHoldingItem()
		if(slot){
			const { item } = slot
			if(item && item.type === "Weapon"){
				item.shot()
				bullets_amount.innerHTML = item.bulletsAmount
			}
		}else if(!player.isFalling && !player.isRunning){
			player.switchSprite(`attack_${player.attack}_${player.direction.toLowerCase()}`)
			player.isAttacking = true
		}
	}

	if(player.isAttacking && player.sprInfo.name != `attack_${player.attack}_${player.direction.toLowerCase()}`){
		player.isAttacking = false
	}

	// Recarregar Arma
	if(keyR && !keyEnter){
		const slot = player.getHoldingItem()
		if(slot){
			const { item } = slot
			if(item && item.type === "Weapon"){
				item.reload()
			}
		}
	}

	if(player.health <= 0){
		player.isDead = true
	}

	if(player.isDead){
		player.switchSprite(`death_${player.direction.toLowerCase()}`)

		player.velocity.x = 0

		waves_count.innerHTML = `Onda: ${gameWave}`
		kills_count.innerHTML = `Abates: ${enemysKilled}`

		setTimeout(() => {
			gameIsPaused = true
			saveData()
			switchScreen("die-screen", "hud-screen")
		}, 1500)
	}
}

function selectSlot(id){
	const inventory = player.getInventory(id)
	
	if(inventory.item){
		inventory.item.visible = true
		inventory.isHolding = true

		weapon_icon.classList.add("border-neutral-300")
		weapon_icon.classList.remove("border-black")
		updateUI("icon", inventory.item.name)
	}else{
		const slot = player.getHoldingItem()
		if(slot){
			slot.item.visible = false
			slot.isHolding = false
		}
		
		weapon_icon.classList.remove("border-neutral-300")
		weapon_icon.classList.add("border-black")
		// updateUI("icon", "")
	}
}

function holdingItem(){
	const slot = player.getHoldingItem()
	if(slot){
		const { item } = slot

		if(item.type == "Weapon"){
			weapon_status.style.color = ""
		}

		item.switchSprite(`ak47_${player.direction.toLowerCase()}`)
		if(player.direction == "LEFT"){
			item.position.x = player.position.x - itens_sprites.ak47.holding_position_left.x
			item.position.y = player.position.y + itens_sprites.ak47.holding_position_left.y
		}else if(player.direction == "RIGHT"){
			item.position.x = player.position.x + itens_sprites.ak47.holding_position.x
			item.position.y = player.position.y + itens_sprites.ak47.holding_position.y
		}
	}else{
		weapon_status.style.color = "#64748b"
	}
}

function update(){
	holdingItem()

	if(!player.isDead){
		playerActions()	
	}


	if(player.health < 20){
		hud_screen.style.boxShadow = "inset 0 0 30px rgba(190, 0, 0, .7)"
	}else{
		hud_screen.style.boxShadow = "none"
	}

	if(gameIsPaused){
		dialog_container.classList.remove("left-0")
		dialog_container.classList.add("-left-60")
	}

	camera.update()
}

class EnemyWave {
	constructor(count, health){
		this.enemys = []
		this.waveStarted = false
		this.waveIsPlaying = false
		this.waveNumber = 1
		this.enemysCount = count
		this.enemyHealth = health
	}

	restart(){
		this.waveStarted = false
		this.waveIsPlaying = false
		this.waveNumber = 1
		this.enemysCount = 3
		this.enemyHealth = 100
		enemys.length = 0
	}

	init(){
		$("#waves-text").innerHTML = `Onda ${this.waveNumber}`
		showUI("waves-container", "animate__fadeIn")
		setTimeout(() => removeUI("waves-container", "animate__fadeOut"), 3000)
		generateEnemys(this.enemysCount, this.enemyHealth)
	}
}

const arcadeWave = new EnemyWave(3, 100)

function arcadeMode(){
	if(!arcadeWave.waveStarted && !arcadeWave.waveIsPlaying){
		arcadeWave.waveStarted = true

		if(waveTimer >= 5) showUI("skills-screen", "animate__fadeIn")

		const timer = setInterval(() => {
			if(gameIsPaused){
				clearInterval(timer)
				return
			}

			$("#waves-skills-timer").innerHTML = `${waveTimer}s`
			if(waveTimer <= 5) $("#waves-hud-timer").innerHTML = `${waveTimer}s`

			if(waveTimer == 5){
				showUI("waves-timer-container", "animate__fadeIn")
				removeUI("skills-screen", "animate__fadeOut")
			}

			if(!waveTimer){
				arcadeWave.init()
				arcadeWave.waveIsPlaying = true
				removeUI("waves-timer-container", "animate__fadeOut")
				clearInterval(timer)
			}

			waveTimer--
		}, 1000)
	}

	if(!enemys.length && arcadeWave.waveIsPlaying){
		waveTimer = 15
		$("#waves-skills-timer").innerHTML = `${waveTimer}s`
		arcadeWave.waveIsPlaying = false
		arcadeWave.waveStarted = false
		arcadeWave.waveNumber++
		arcadeWave.enemysCount += 3
	}
}

// function enemysWaves(){
// 	if(!enemys.length && !waveStarted){
// 		onWaves = false
// 		waveStarted = true

// 		if(!onWaves && waveTimer >= 5){
// 			showUI("skills-screen", "animate__fadeIn")	
// 		}

// 		const wavesTimer = setInterval(() => {
// 			if(gameIsPaused){
// 				clearInterval(wavesTimer)
// 				return
// 			}

// 			waves_skills_timer.innerHTML = `${waveTimer}s`
// 			if(waveTimer <= 5) waves_hud_timer.innerHTML = `${waveTimer}s`

// 			if(!waveTimer){
// 				gameWave++
// 				enemysCount += 3
// 				generateEnemys(enemysCount, 100)
// 				$("#waves-text").innerHTML = `Onda ${gameWave}`
// 				showUI("waves-container", "animate__fadeIn")
// 				removeUI("waves-timer-container", "animate__fadeOut")
// 				removeUI("skills-screen", "animate__fadeOut")
// 				waveStarted = false
// 				onWaves = true
// 				waveTimer = 15
// 				setTimeout(() => removeUI("waves-container", "animate__fadeOut"), 3000)
// 				clearInterval(wavesTimer)
// 			}else waveTimer--
// 		}, 1000)
// 	}
// }

function saveData(){
	if(enemysKilled > parseInt(window.localStorage.getItem("SaS-Arcade"))){
		window.localStorage.setItem("SaS-Arcade", enemysKilled)
		document.querySelector("#arcade-record").innerHTML = `Recorde: ${window.localStorage.getItem("SaS-Arcade")}`
	}
}

const back = new Parallax(parallax_back, 7)
const middle = new Parallax(parallax_middle, 4)
const front = new Parallax(parallax_front, 2)

function render(){
	display.save()
	display.clearRect(0, 0, canvas.width, canvas.height)
	buffer.save()
	buffer.clearRect(0, 0, canvas.width, canvas.height)

	/* PARALLAX */
	back.update()
	middle.update()
	front.update()			

	buffer.translate(
		Math.floor(-camera.x),
		Math.floor(-camera.y)
	)

	const camera_position = {
		position: {
			x: camera.x + canvas.width/2,
			y: camera.y + canvas.height/2
		},
		width: 50,
		height: 50
	}

	player.update()

	enemys.forEach((enemy, index) => {
		if(!enemy.visible){
			enemys.splice(index, 1)
			return
		}

		const {top, bottom, left, right} = detectInArea(camera_position, enemy, 300, (canvas.height/2), 300, (canvas.width/2) + 50, (canvas.width/2))
		const isInScreen = top || bottom || right || left

		if(isInScreen) enemy.draw()
		enemy.update()

		playebleMapBlocks.forEach(block => {
			basicCollision(enemy, block)
		})

		if(enemy.position.y > mapHeight || enemy.position.x > mapSize){
			enemys.splice(index, 1)
		}
	})

	// enemysWaves()
	arcadeMode()

	playebleMapBlocks.forEach(block => {
		const {top, bottom, left, right} = detectInArea(camera_position, block, 300, (canvas.height/2), 300, (canvas.width/2) + 50, (canvas.width/2))
		const blockInArea = top || bottom || right || left

		if(blockInArea){
			buffer.drawImage(tilemap, block.imgX, block.imgY, 32, 32, block.position.x, block.position.y, block.width, block.height)				
			basicCollision(player, block)
		}
	})

	itensArray.forEach((item, index) => {
		if(item.visible){
			item.update()

			itemCollision(collide(player, item))

			if(item.itemType == "soul"){
				playebleMapBlocks.forEach(block => {
					basicCollision(item, block)
				})

				if(!item.visible){
					itensArray.splice(index, 1)
				}
			}
			

			if(item.type == "Weapon"){
				playebleMapBlocks.forEach(block => {
					basicCollision(item, block)
				})

				if(!item.bulletsAmount){
					if(!item.munition){
						player.inventory[0].item = 0
						player.inventory[0].isHolding = false
						weapon_status.classList.add("hidden")
						weapon_icon.classList.remove("border-neutral-300")
						weapon_icon.classList.add("border-black")
						updateUI("icon", "")
					}
				}

				item.bulletsFired.forEach(bullet => {
					if(bullet.visible){
						bullet.update()

						enemys.forEach(enemy => {
							if(enemy.visible){
								projectileCollision(collide(bullet, enemy))
							}
						})

						playebleMapBlocks.forEach(block => {
							projectileCollision(collide(bullet, block))
						})
					}
				})
			}
		}
	})

	display.drawImage(cv, 0, 0)
	display.restore()
	buffer.restore()

}

function loop(){
	if(!gameIsPaused){
		window.requestAnimationFrame(loop)
	}

	render()
	update()
}

function init(){
	gameIsPaused = false
	loop()

	const showDialog = window.localStorage.getItem("SaSdialog")
	if(parseInt(showDialog)){
		dialog_container.classList.add("left-0")
		dialog_container.classList.remove("-left-60")
	}
}

function continues(){
	if(gameIsPaused){
		arcadeWave.waveStarted = false
		gameIsPaused = false
		loop()
		switchScreen("hud-screen", "pause-screen")
	}
}

function pause(){
	if(!gameIsPaused){
		switchScreen("pause-screen", "hud-screen")
		gameIsPaused = true
	}
}

function restart(){
	arcadeWave.restart()
	// waveStarted = false
	// onWaves = false
	waveTimer = 15
	enemys.length = 0
	// gameWave = 0

	player.inventory.forEach(slot => {
		slot.item = null
		slot.isHolding = false
	})

	itensArray.forEach(item => {
		item.isInInventory = false
		item.position.x = item.initial_position.x
		item.position.y = item.initial_position.y
		item.visible = true
		if(item.type == "Weapon" && item.gunType == "Fuzil"){
			item.munition = 60
			item.bulletsAmount = 30
		}
	})

	skillsButton.forEach(button => {
		button.dataset.price = 5
		button.children[0].children[1].innerHTML = "Lv 1"
		button.dataset.level = 1
		button.nextElementSibling.innerHTML = "5 Almas"
	})

	health_container.style.width = 100 + "px"
	health_amount.style.width = 100 + "px"

	if(points.length > 10){
		while(i < 10){
			i++

			if(points.length > 10){
				points[i].remove()				
			}
		}
	}

	removeUI("waves-timer-container", "hidden")
	updateUI("icon", "")

	enemysCount = 0
	enemysKilled = 0
	bullets_amount.innerHTML = 0
	munition_amount.innerHTML = 0
	souls_amount.innerHTML = 0
	weapon_status.classList.add("hidden")

	saveData()

	player.restart()
	init()
}

function destroy(){
	arcadeWave.restart()
	gameIsPaused = true
	// waveStarted = false
	// onWaves = false
	// enemys.length = 0
	enemysCount = 0
	waveTimer = 15

	player.inventory.forEach(slot => {
		slot.item = null
		slot.isHolding = false
	})

	itensArray.forEach(item => {
		item.isInInventory = false
		item.position.x = item.initial_position.x
		item.position.y = item.initial_position.y
		item.visible = true
		if(item.type == "Weapon" && item.gunType == "Fuzil"){
			item.munition = 60
			item.bulletsAmount = 30
		}
	})

	skillsButton.forEach(button => {
		button.dataset.price = 5
		button.dataset.level = 1
		button.children[0].children[1].innerHTML = "Lv 1"
		button.nextElementSibling.innerHTML = "5 Almas"
	})

	health_container.style.width = 100 + "px"
	health_amount.style.width = 100 + "px"

	if(points.length > 10){
		while(i < 10){
			i++

			if(points.length > 10){
				points[i].remove()				
			}
		}
	}

	removeUI("waves-timer-container", "hidden")
	updateUI("icon", "")

	// gameWave = 0
	enemysKilled = 0
	bullets_amount.innerHTML = 0
	munition_amount.innerHTML = 0
	souls_amount.innerHTML = 0
	weapon_status.classList.add("hidden")

	saveData()

	player.restart()
	buffer.clearRect(0, 0, canvas.width, canvas.height)
}

const resizeAspectRatio = () => {
	display.canvas.width = cv.width = window.innerWidth
	display.canvas.height = cv.height = window.innerHeight
	display.imageSmoothingEnabled = false
	buffer.imageSmoothingEnabled = false
}
resizeAspectRatio()

window.onresize = () => resizeAspectRatio()
window.onblur = () => {
	pause()
	keyLeft =
	keyRight =
	keyUp =
	keyR =
	keyEnter =
	lockLeft =
	lockRight = false
}
