if(getStorage("SaSdialog")) localStorage.removeItem("SaSdialog")
if(getStorage("SaSControl")) localStorage.removeItem("SaSControl")

if(!getStorage("SaS-Save")) setStorage("SaS-Save", 1)

if(parseInt(getStorage("SaS-Save"))){
	$("#save-memory").checked = true
	createStorages()
}else{
	$("#save-memory").checked = false
}

$("#arcade-record").innerHTML = `Recorde: ${getStorage("SaS-Arcade")}`

var developerMode = false

const canvas  = document.querySelector("canvas")
const display = canvas.getContext("2d", {alpha: false})

const cv     = document.createElement("canvas")
const buffer = cv.getContext('2d', {alpha: false})

const screens_container = document.querySelector("#screens-container")
const hud_screen      = document.getElementById("hud-screen")

const souls_amount    = document.getElementById("souls-amount")

const close_guide    = document.getElementById("close-guide")
const guide_checkbox = document.querySelector("input[type=checkbox][name=dontshowguide]")

const health_bar = document.getElementById("health-bar")
const health_amount    = document.getElementById("health-amount")

const waves_count        = document.getElementById("waves-count")
const kills_count        = document.getElementById("kills-count")
const waves_skills_timer = document.getElementById("waves-skills-timer")
const waves_hud_timer    = document.getElementById("waves-hud-timer")

const close_skills = document.getElementById("close-skills")
const skillsButton = document.querySelectorAll("[data-skill]")

const GRAVITY = 0.6

var keyRight,
    keyLeft,
    keyUp,
    keyDown,
    keyEnter,
    keyR = false

var gameIsPaused = true

var enemysKilled = 0

var lockLeft,
    lockRight = false

const tilemap = new Image()
tilemap.src   = "arquivos/assets/map/tilemap.png"

const parallax_back = new Parallax("arquivos/assets/map/parallax-forest-back.png", {velocity: 7})
const parallax_middle = new Parallax("arquivos/assets/map/parallax-forest-middle-trees.png", {velocity: 4})
const parallax_front = new Parallax("arquivos/assets/map/parallax-forest-front-trees.png", {velocity: 2})

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
		frames: 6
	},
	{
		name: "attack_1_left",
		image: "arquivos/assets/player/attack1_left.png",
		frames: 6
	},
	{
		name: "attack_2_right",
		image: "arquivos/assets/player/attack2.png",
		frames: 6
	},
	{
		name: "attack_2_left",
		image: "arquivos/assets/player/attack2_left.png",
		frames: 6
	},
	{
		name: "take_hit_right",
		image: "arquivos/assets/player/take_hit.png",
		frames: 4,
		hold: 8
	},
	{
		name: "take_hit_left",
		image: "arquivos/assets/player/take_hit_left.png",
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
	enemy_soul: [
		{
			name: "soul",
			image: "arquivos/assets/itens/enemy_soul.png",
			frames: 4,
			hold: 6
		}
	],
	life: [
		{
			name: "life",
			image: "arquivos/assets/itens/life.png",
			frames: 1
		}
	]
}

const skeleton_warrior_sprites = [
	{
		name: "idle_right",
		image: "arquivos/assets/skeleton_warrior/idle_right.png",
		frames: 7
	},
	{
		name: "idle_left",
		image: "arquivos/assets/skeleton_warrior/idle_left.png",
		frames: 7
	},
	{
		name: "run_right",
		image: "arquivos/assets/skeleton_warrior/run_right.png",
		frames: 8
	},
	{
		name: "run_left",
		image: "arquivos/assets/skeleton_warrior/run_left.png",
		frames: 8
	},
	{
		name: "walk_right",
		image: "arquivos/assets/skeleton_warrior/walk_right.png",
		frames: 7
	},
	{
		name: "walk_left",
		image: "arquivos/assets/skeleton_warrior/walk_left.png",
		frames: 7
	},
	{
		name: "run_attack_right",
		image: "arquivos/assets/skeleton_warrior/run_attack_right.png",
		frames: 7
	},
	{
		name: "run_attack_left",
		image: "arquivos/assets/skeleton_warrior/run_attack_left.png",
		frames: 7
	},
	{
		name: "attack_1_right",
		image: "arquivos/assets/skeleton_warrior/attack_1_right.png",
		frames: 5,
		hold: 6
	},
	{
		name: "attack_1_left",
		image: "arquivos/assets/skeleton_warrior/attack_1_left.png",
		frames: 5,
		hold: 6
	},
	{
		name: "attack_2_right",
		image: "arquivos/assets/skeleton_warrior/attack_2_right.png",
		frames: 6
	},
	{
		name: "attack_2_left",
		image: "arquivos/assets/skeleton_warrior/attack_2_left.png",
		frames: 6
	},
	{
		name: "attack_3_right",
		image: "arquivos/assets/skeleton_warrior/attack_3_right.png",
		frames: 4
	},
	{
		name: "attack_3_left",
		image: "arquivos/assets/skeleton_warrior/attack_3_left.png",
		frames: 4
	},
	{
		name: "take_hit_right",
		image: "arquivos/assets/skeleton_warrior/hit_right.png",
		frames: 2
	},
	{
		name: "take_hit_left",
		image: "arquivos/assets/skeleton_warrior/hit_left.png",
		frames: 2
	},
	{
		name: "dead_right",
		image: "arquivos/assets/skeleton_warrior/dead_right.png",
		frames: 4,
		hold: 6
	},
	{
		name: "dead_left",
		image: "arquivos/assets/skeleton_warrior/dead_left.png",
		frames: 4,
		hold: 6
	}
]

const skeleton_spearman_sprites = [
	{
		name: "idle_right",
		image: "arquivos/assets/skeleton_spearman/idle_right.png",
		frames: 7
	},
	{
		name: "idle_left",
		image: "arquivos/assets/skeleton_spearman/idle_left.png",
		frames: 7
	},
	{
		name: "run_right",
		image: "arquivos/assets/skeleton_spearman/run_right.png",
		frames: 6
	},
	{
		name: "run_left",
		image: "arquivos/assets/skeleton_spearman/run_left.png",
		frames: 6
	},
	{
		name: "walk_right",
		image: "arquivos/assets/skeleton_spearman/walk_right.png",
		frames: 7
	},
	{
		name: "walk_left",
		image: "arquivos/assets/skeleton_spearman/walk_left.png",
		frames: 7
	},
	{
		name: "run_attack_right",
		image: "arquivos/assets/skeleton_spearman/run_attack_right.png",
		frames: 5
	},
	{
		name: "run_attack_left",
		image: "arquivos/assets/skeleton_spearman/run_attack_left.png",
		frames: 5
	},
	{
		name: "attack_1_right",
		image: "arquivos/assets/skeleton_spearman/attack_1_right.png",
		frames: 4,
		hold: 6
	},
	{
		name: "attack_1_left",
		image: "arquivos/assets/skeleton_spearman/attack_1_left.png",
		frames: 4,
		hold: 6
	},
	{
		name: "attack_2_right",
		image: "arquivos/assets/skeleton_spearman/attack_2_right.png",
		frames: 4
	},
	{
		name: "attack_2_left",
		image: "arquivos/assets/skeleton_spearman/attack_2_left.png",
		frames: 4
	},
	{
		name: "take_hit_right",
		image: "arquivos/assets/skeleton_spearman/hit_right.png",
		frames: 3
	},
	{
		name: "take_hit_left",
		image: "arquivos/assets/skeleton_spearman/hit_left.png",
		frames: 3
	},
	{
		name: "fall_right",
		image: "arquivos/assets/skeleton_spearman/fall_right.png",
		frames: 6,
		hold: 9
	},
	{
		name: "fall_left",
		image: "arquivos/assets/skeleton_spearman/fall_left.png",
		frames: 6,
		hold: 9
	},
	{
		name: "dead_right",
		image: "arquivos/assets/skeleton_spearman/dead_right.png",
		frames: 5,
		hold: 9
	},
	{
		name: "dead_left",
		image: "arquivos/assets/skeleton_spearman/dead_left.png",
		frames: 5,
		hold: 9
	}
]

spriteConverter(skeleton_warrior_sprites)
spriteConverter(skeleton_spearman_sprites)
spriteConverter(player_sprites)
spriteConverter(itens_sprites.enemy_soul)
spriteConverter(itens_sprites.life)

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
life.setSprites(itens_sprites.life)

const itensArray = [life]

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
	button.addEventListener("click", event => buySkill(event, button))
})

const skills_list = [
	{name: 'health', price: 5, level: 1, max_level: 20},
	{name: 'speed', price: 5, level: 1, max_level: 5},
	{name: 'strength', price: 5, level: 1 ,max_level: 6},
	{name: 'attackspeed', price: 10, level: 1, max_level: 2},
	{name: 'loot', price: 10, level: 1, max_level: 7}
]

// Skill List clone with default values
const skills_list_default = JSON.parse(JSON.stringify(skills_list))

function buySkill(event, button){
	const skill_name = button.dataset.skill
	const skill = skills_list.find(s => s.name == skill_name)

	const level_text = button.children[0].children[1]
	const price_text = button.nextElementSibling

	const isMaxLevel = () => skill.level >= skill.max_level 
	const cantBuySKill = player.souls < skill.price

	if(isMaxLevel()) return

	if(cantBuySKill){
		animateUI(price_text, 'animate__shakeX', () => {
			price_text.style.background = ""
			button.style.border = ""
		})
		price_text.style.background = "#f74a4a"
		button.style.border = "2px solid #f74a4a"
		return
	}

	price_text.style.background = "green"
	button.style.border = "2px solid green"
	animateUI(price_text, 'animate__jello', () => {
		price_text.style.background = ""
		button.style.border = ""

		if(isMaxLevel()){
			level_text.innerHTML = "Max"
			level_text.style.color = "#f74a4a"
			price_text.style.opacity = ".5"
			button.style.opacity = ".5"
		}		
	})

	skill.level++
	player.souls -= skill.price
	skill.price = skill.price + 5

	price_text.innerHTML = `${skill.price} Almas`
	souls_amount.innerHTML = player.souls
	level_text.innerHTML = `Lv ${skill.level}`

	updateSkill(skill.name)
}

function updateSkill(skill){
	switch(skill){
		case "speed":
			player.speed += .3
			break
		case "health":
			player.maxHealth += 10
			player.receiveLife(1000)
			health_bar.style.width = player.maxHealth + "px"
			health_amount.style.width = player.maxHealth + "px"
			break
		case "strength":
			player.attDamage += 5
			break
		case "attackspeed":
			player.attackSpeedMax = true
			break
		case "loot":
			player.dropLuck += 5
			break
	}
}

function playerAnimations(){
	if(player.isIdle && !player.isDead){
		player.switchSprite(`idle_${player.direction}`)		
	}

	if(keyUp && !player.isDead && !player.isFalling){
		player.switchSprite(`jump_${player.direction}`)
	}

	if(player.velocity.y > 0 && !player.isDead){
		player.switchSprite(`fall_${player.direction}`)		
	}

	if(!keyUp && !player.isDead && player.isRunning && !player.isFalling){
		player.switchSprite(`run_${player.direction}`)
	}

	if(player.receiveDamage && !player.isDead && !player.isAttacking){
		player.switchSprite(`take_hit_${player.direction}`)
	}

	if(player.isAttacking && !player.isRunning && !player.isDead){
		player.switchSprite(`attack_${player.attackSprite}_${player.direction}`)
	}

	if(player.isDead){
		player.switchSprite(`death_${player.direction}`)
	}
}

/* TESTING PLAYER SOUNDS */

const audio = new Audio('arquivos/assets/audio/sword_whoosh_3.mp3')
const audio2 = new Audio('arquivos/assets/audio/sword_whoosh_2.mp3')
const skeleton_hit_sound = new Audio('arquivos/assets/audio/skeleton_hit_2.mp3')

player.on("animation", ({frame, animation}) => {
	if(animation.name == `attack_1_${player.direction}`){
		if(frame == 3){
			audio.play()
		}
	}
	if(animation.name == `attack_2_${player.direction}`){
		if(frame == 3){
			audio2.play()
		}
	}
})

/* =============== */

function playerMovement(){

	// Player parado
	if(!keyUp && !player.isRunning && !player.isAttacking && !player.receiveDamage && !player.isFalling){
		player.isIdle = true
	}else{
		player.isIdle = false
	}

	// Player caindo
	if(player.velocity.y > 0){
		player.receiveDamage = false
		player.isFalling = true
	}

	// Player pulando
	if(keyUp && !player.isDead && !player.isFalling){
		player.velocity.y = player.jump
		player.isFalling = true
	}

	// Player andando para esquerda ou direita
	if(keyLeft || keyRight){
		player.receiveDamage = false
		if(keyLeft && !lockLeft && !player.isDead){
			player.velocity.x = -player.speed
			player.direction = "left"
			lockRight = true
		}
		if(keyRight && !lockRight && !player.isDead){
			player.velocity.x = player.speed
			player.direction = "right"
			lockLeft = true
		}
		player.isRunning = true
	}else{
		player.isRunning = false
		player.velocity.x = 0
	}

	// Player atacando
	if(keyEnter && !player.isDead){
		if(!player.isFalling && !player.isRunning){
			player.isAttacking = true
		}
	}else{
		player.attackSprite = 1
	}
}

const arcadeWave = new EnemyWave(3, 100)

function arcadeMode(){
	if(!arcadeWave.waveStarted && !arcadeWave.waveIsPlaying){
		arcadeWave.waveStarted = true

		if(arcadeWave.waveTimer >= 5) showUI("skills-screen", "animate__fadeIn")

		const timer = setInterval(() => {
			if(gameIsPaused){
				clearInterval(timer)
				return
			}
			arcadeWave.waveTimer--

			$("#waves-skills-timer").innerHTML = `${arcadeWave.waveTimer}s`
			if(arcadeWave.waveTimer <= 5) $("#waves-hud-timer").innerHTML = `${arcadeWave.waveTimer}s`

			if(arcadeWave.waveTimer == 5){
				showUI("waves-timer-container", "animate__fadeIn")
				removeUI("skills-screen", "animate__fadeOut")
			}

			if(!arcadeWave.waveTimer){
				arcadeWave.init()
				arcadeWave.waveIsPlaying = true
				removeUI("waves-timer-container", "animate__fadeOut")
				clearInterval(timer)
			}
		}, 1000)
	}

	if(!enemys.length && arcadeWave.waveIsPlaying){
		arcadeWave.waveTimer = 15
		$("#waves-skills-timer").innerHTML = `${arcadeWave.waveTimer}s`
		arcadeWave.waveIsPlaying = false
		arcadeWave.waveStarted = false
		arcadeWave.waveNumber++
		arcadeWave.enemysCount += 3
	}
}

function update(){
	playerAnimations()
	playerMovement()

	if(player.health < 20){
		if(!hud_screen.className.includes('low_life_blood_splash')){
			hud_screen.classList.add('low_life_blood_splash')
		}
	}else{
		if(hud_screen.className.includes('low_life_blood_splash')){
			hud_screen.classList.remove('low_life_blood_splash')
		}
	}

	if(player.health <= 0 && !player.isDead){
		player.isDead = true
		player.velocity.x = 0

		waves_count.innerHTML = `Onda: ${arcadeWave.waveNumber}`
		kills_count.innerHTML = `Abates: ${enemysKilled}`

		setTimeout(() => {
			gameIsPaused = true
			saveArcadeData()
			showUI("die-screen", "animate__fadeIn")
			removeUI("hud-screen", "hidden")
		}, 1500)
	}

	camera.update()
}

const enemys_near_player = []

function render(){
	display.save()
	display.clearRect(0, 0, canvas.width, canvas.height)
	buffer.save()
	buffer.clearRect(0, 0, canvas.width, canvas.height)

	/* PARALLAX */
	parallax_back.update()
	parallax_middle.update()
	parallax_front.update()			

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

		const is_near = detectInArea(player, enemy, 250)
		if(is_near.left || is_near.right){
			if(!enemys_near_player.includes(enemy)){
				enemys_near_player.push(enemy)
			}
		}else{
			if(enemys_near_player.includes(enemy)){
				enemys_near_player.splice(index, 1)	
			}
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

	if(!developerMode){
		arcadeMode()		
	}

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

	if(developerMode){
		const enemy1 = new SkeletonSpearman({color: "red", health: 100, position: {x: 700, y: 400}})
		enemy1.setSprites(skeleton_spearman_sprites)
		const enemy2 = new SkeletonWarrior({color: "red", health: 100, position: {x: 600, y: 400}})
		enemy2.setSprites(skeleton_warrior_sprites)
		enemys.push(enemy1, enemy2)
	}		
}

function continues(){
	if(gameIsPaused){
		arcadeWave.waveStarted = false
		gameIsPaused = false
		loop()
	}
}

function pause(){
	if(!gameIsPaused){
		showUI("pause-screen", "animate__fadeIn")
		removeUI("hud-screen", "hidden")
		removeUI("guide-dialog", "hidden")
		gameIsPaused = true
	}
}

function restart(){
	arcadeWave.restart()

	itensArray.forEach((item, index) => {
		if(item.itemType == 'soul') itensArray.splice(index, 1)

		item.position.x = item.initial_position.x
		item.position.y = item.initial_position.y
		item.visible = true
	})

	for(i = 0; i < skills_list.length; i++){
		skills_list[i].price = skills_list_default[i].price
		skills_list[i].level = skills_list_default[i].level
	}

	skillsButton.forEach((button, index) => {
		const level_text = button.children[0].children[1]
		const price_text = button.nextElementSibling

		level_text.innerHTML = 'Lv 1'
		level_text.style.color = ""
		price_text.style.opacity = "1"
		price_text.innerHTML = `${skills_list[index].price} Almas`
		button.style.opacity = "1"
	})

	health_bar.style.width = 100 + "px"
	health_amount.style.width = 100 + "px"

	removeUI("waves-timer-container", "hidden")

	enemysKilled = 0
	souls_amount.innerHTML = 0

	saveArcadeData()

	player.restart()
	init()
}

function destroy(){
	arcadeWave.restart()
	gameIsPaused = true

	itensArray.forEach((item, index) => {
		if(item.itemType == 'soul') itensArray.splice(index, 1)

		item.position.x = item.initial_position.x
		item.position.y = item.initial_position.y
		item.visible = true
	})

	for(i = 0; i < skills_list.length; i++){
		skills_list[i].price = skills_list_default[i].price
		skills_list[i].level = skills_list_default[i].level
	}

	skillsButton.forEach((button, index) => {
		const level_text = button.children[0].children[1]
		const price_text = button.nextElementSibling

		level_text.innerHTML = 'Lv 1'
		level_text.style.color = ""
		price_text.style.opacity = "1"
		price_text.innerHTML = `${skills_list[index].price} Almas`
		button.style.opacity = "1"
	})

	health_bar.style.width = 100 + "px"
	health_amount.style.width = 100 + "px"

	removeUI("waves-timer-container", "hidden")

	enemysKilled = 0
	souls_amount.innerHTML = 0

	saveArcadeData()

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
