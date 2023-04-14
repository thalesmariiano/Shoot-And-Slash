if(!window.localStorage.getItem("SaSdialog")) window.localStorage.setItem("SaSdialog", 1)

var developerMode = false

const canvas            = document.querySelector("canvas")
const screens_container = document.querySelector("#screens-container")

const ctx = canvas.getContext("2d", {alpha: false})

const GRAVITY = 0.6

var keyRight,
    keyLeft,
    keyUp,
    keyDown,
    keyEnter,
    keyR = false

// var digit1,
//     digit2,
//     digit3 = false

var gameIsPaused = true
var isIniting = false
var onWaves = false

var enemysCount = 0
var gameWave = 0
var timeBetweenWaves = 15
var enemysKilled = 0

var lockLeft,
    lockRight = false

const weapon_icon     = document.getElementById("weapon-icon")
const weapon_icon_img = document.getElementById("weapon-icon-img")

// Dialog
const dialog_container    = document.getElementById("dialog-container")
const dialog_close_button = document.getElementById("close-dialog-button")
const dialog_checkbox     = document.querySelector("[name=dontshow]")

const close_skills = document.getElementById("close-skills")

const weapon_status = document.getElementById("weapon-status")
const munition_amount = document.getElementById("munition-amount")
const bullets_amount  = document.getElementById("bullets-amount")

const souls_amount    = document.getElementById("souls-amount")

const health_container = document.getElementById("health-container")
const health_bar = document.getElementById("health-bar")
const health_amount = document.getElementById("health-amount")
const points = document.getElementsByClassName("health-points")

const waves_count = document.getElementById("waves-count")
const kills_count = document.getElementById("kills-count")
const waves_skills_timer = document.getElementById("waves-skills-timer")
const waves_hud_timer = document.getElementById("waves-hud-timer")

const skillsButton = document.querySelectorAll("[data-skill]")
const itensButton = document.querySelectorAll("[data-item]")

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

const enemys = []

enemy_sprites.forEach(spr => {
	const img = new Image()
	img.src = spr.image
	spr.image = img
})

player_sprites.forEach(spr => {
	const img = new Image()
	img.src = spr.image
	spr.image = img
})

itens_sprites.enemy_soul.sprites.forEach(spr => {
	const img = new Image()
	img.src = spr.image
	spr.image = img
})

itens_sprites.life.sprites.forEach(spr => {
	const img = new Image()
	img.src = spr.image
	spr.image = img
})

itens_sprites.ak47.sprites.forEach(spr => {
	const img = new Image()
	img.src = spr.image
	spr.image = img
})

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
			level_text.classList.add("text-red-500")

			setTimeout(() => {
				level_text.classList.remove("text-red-500")
				level_text.innerHTML = `Lv ${button.dataset.level}`		
			}, 1000)
			return
		}

		if(player.souls < skillPrice){
			price_text.classList.add("animate__animated", "animate__shakeX")
			price_text.classList.add("bg-red-500/75")
			button.classList.add("border-red-500")

			price_text.addEventListener("animationend", () => {
				price_text.classList.remove("animate__animated", "animate__shakeX")
				price_text.classList.remove("bg-red-500/75")
				button.classList.remove("border-red-500")
			})
			return
		}

		price_text.classList.add("bg-green-700/75")
		button.classList.add("border-green-700")

		setTimeout(() => {
			price_text.classList.remove("bg-green-700/75")
			button.classList.remove("border-green-700")
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
			price_text.classList.add("bg-red-500/75")

			price_text.addEventListener("animationend", () => {
				price_text.classList.remove("animate__animated", "animate__shakeX")
				price_text.classList.remove("bg-red-500/75")
			})
			return
		}

		price_text.classList.add("bg-green-700/75")
		button.classList.add("border-green-700")

		setTimeout(() => {
			price_text.classList.remove("bg-green-700/75")
			button.classList.remove("border-green-700")
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
		ak47.isInInventory = true
		updateUI("icon", ak47.name)
		weapon_status.classList.remove("hidden")
		bullets_amount.innerHTML = ak47.bulletsAmount
		munition_amount.innerHTML = ak47.munition
		break
	}
}


const playableMapTiles = [
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

// const scenarioMapTiles = [
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// ]

const mapSize = playableMapTiles[0].length*50
const mapHeight = playableMapTiles.length*50
const playebleMapBlocks = []
// const scenarioMapBlocks = []

const tilemap = new Image()
	  tilemap.src = "arquivos/assets/map/tilemap.png"

function generateTerrain(mapArray, outputArray){
	const tileSize = 50

	for(let row in mapArray){
		for(let column in mapArray[row]){
			const tile = mapArray[row][column]

			const block = {
				id: 1,
				width: tileSize,
				height: tileSize,
				position: {
					x: column*tileSize,
					y: row*tileSize
				},
				imgX: 0,
				imgY: 0,
				type: "Block",
				visible: false
			}

			if(tile){
				switch(tile){
					case 1:
						block.imgX = 32
						block.imgY = 0
						block.id = 1
						break
					case 2:
						block.imgX = 32*2
						block.imgY = 0
						block.id = 2
						break
					case 3:
						block.imgX = 0
						block.imgY = 32*6
						block.id = 3
						break
					case 3.5:
						block.imgX = 32*2
						block.imgY = 32*6
						block.id = 3.5
						break
					case 4:
						block.imgX = 32*2
						block.imgY = 32
						block.id = 4
						break
					case 4.5:
						block.imgX = 0
						block.imgY = 32
						block.id = 4.5
						break
					case 5:
						block.imgX = 32
						block.imgY = 32
						block.id = 5
						break
				}
				outputArray.push(block)
			}	
		}
	}
}
generateTerrain(playableMapTiles, playebleMapBlocks)

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
			weapon_status.classList.remove("text-slate-500")
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
		weapon_status.classList.add("text-slate-500")
	}
}

function update(){
	holdingItem()

	if(!player.isDead){
		playerActions()	
	}

	if(gameIsPaused){
		dialog_container.classList.remove("left-0")
		dialog_container.classList.add("-left-60")

		updateUI("skills", false)
	}

	camera.update()
}

function enemysWaves(){
	if(!enemys.length && !isIniting){
		onWaves = false
		isIniting = true

		if(timeBetweenWaves > 5){
			updateUI("skills", true)
		}

		const wavesTimer = setInterval(() => {
			if(gameIsPaused){
				clearInterval(wavesTimer)
				return
			}

			waves_skills_timer.innerHTML = `${timeBetweenWaves}s`
			if(timeBetweenWaves <= 5) waves_hud_timer.innerHTML = `${timeBetweenWaves}s`

			if(!timeBetweenWaves){
				gameWave++
				enemysCount += 3
				updateUI("waves", true)
				setTimeout(() => updateUI("waves", false), 3000)
				
				updateUI("timer", false)
				generateEnemys(enemysCount, 100)
				updateUI("skills", false)
				isIniting = false
				timeBetweenWaves = 15
				onWaves = true
				clearInterval(wavesTimer)
			}else timeBetweenWaves--
		}, 1000)
	}
}

const skyGradient = ctx.createLinearGradient(0, 0, 0, 150)
      skyGradient.addColorStop(0, "#4287f5")
	  skyGradient.addColorStop(1, "#7bc6d1")

const parallax_back = new Image()
parallax_back.src = "arquivos/assets/map/parallax-forest-back.png"

const parallax_light = new Image()
parallax_light.src = "arquivos/assets/map/parallax-forest-lights.png"

const parallax_middle = new Image()
parallax_middle.src = "arquivos/assets/map/parallax-forest-middle-trees.png"

const parallax_front = new Image()
parallax_front.src = "arquivos/assets/map/parallax-forest-front-trees.png"

function render(){
	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = skyGradient
	ctx.fillRect(0, -2500/2, mapSize, 2500)

	/* PARALLAX */
	ctx.drawImage(parallax_back, Math.floor(-camera.x)/7, 0, 2000, 700)
	// ctx.drawImage(parallax_light, Math.floor(-camera.x)/6, 0, canvas.width, canvas.height)							
	ctx.drawImage(parallax_middle, Math.floor(-camera.x)/4, 0, 2000, 700)				
	ctx.drawImage(parallax_front, Math.floor(-camera.x)/2, 0, 3100, 770)				

	ctx.translate(
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

	// scenarioMapBlocks.forEach(block => {
		// const { top, bottom, left, right } = detectInArea(player, block, 300)
		// const blockInArea = top || bottom || right || left

		// if(blockInArea){
	//		block.draw()
		// }
	// })

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

		if(enemy.position.y > mapHeight){
			enemys.splice(index, 1)
		}
	})

	enemysWaves()

	playebleMapBlocks.forEach(block => {
		const {top, bottom, left, right} = detectInArea(camera_position, block, 300, (canvas.height/2), 300, (canvas.width/2) + 50, (canvas.width/2))
		const blockInArea = top || bottom || right || left

		if(blockInArea){
			ctx.drawImage(tilemap, block.imgX, block.imgY, 32, 32, block.position.x, block.position.y, block.width, block.height)				
			basicCollision(player, block)
		}
	})

	itensArray.forEach((item, index) => {
		if(item.visible){
			item.update()

			if(!item.isInInventory){
				itemCollision(collide(player, item))
			}

			if(item.itemType == "soul"){
				playebleMapBlocks.forEach(block => {
					basicCollision(item, block)
				})

				if(!item.visible){
					itensArray.splice(index, 1)
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
							projectileCollision(collide(bullet, block))
						})
					}
				})
			}
		}
	})

	ctx.restore()

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
		isIniting = false
		gameIsPaused = false
		loop()
		switchScreen("hud-screen", "pause-screen")

		if(!onWaves && timeBetweenWaves > 5){
			updateUI("skills", true)
		}
	}
}

function pause(){
	if(!gameIsPaused){
		switchScreen("pause-screen", "hud-screen")
		gameIsPaused = true
	}
}

function restart(){
	timeBetweenWaves = 15
	isIniting = false
	enemys.length = 0
	enemysCount = 0
	gameWave = 0
	enemysKilled = 0
	init()
	souls_amount.innerHTML = 0
	player.restart()
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
	

	bullets_amount.innerHTML = 0
	munition_amount.innerHTML = 0
	updateUI("icon", "")
}

function destroy(){
	isIniting = false
	gameIsPaused = true
	enemys.length = 0
	enemysCount = 0
	gameWave = 0
	enemysKilled = 0
	timeBetweenWaves = 15
	souls_amount.innerHTML = 0
	player.restart()
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

	bullets_amount.innerHTML = 0
	munition_amount.innerHTML = 0
	updateUI("icon", "")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const resizeAspectRatio = () => {
	ctx.canvas.width = window.innerWidth
	ctx.canvas.height = window.innerHeight
	ctx.imageSmoothingEnabled = false
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
