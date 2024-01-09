
function arcade(){
	let enemysCount = 3
	let enemyHealth = 100
	let waveNumber = 1
	let enemysKilled = 0
	let intervalID
	let time = 10
	let lastFiveSeconds = false
	let started = false

	const hud_timer = document.getElementById('waves-hud-timer')
	const skills_timer = document.getElementById('waves-skills-timer')
	const waves_text = document.getElementById('waves-text')

	const newWave = () => {
		generateEnemys(enemysCount, enemyHealth)
	}

	const verifyKills = () => {
		if(!enemys.length){
			waveNumber += 1
			enemysCount += 3
			enemyHealth = 100
			started = false
			arcadeTimer()
		}
	}

	const switchArcadeUI = () => {
		if(time !== 5 && !lastFiveSeconds){
			showUI("skills-screen", "animate__fadeIn")		
		}else if(time == 5){
			removeUI("skills-screen", "animate__fadeOut")
			showUI("waves-timer-container", "animate__fadeIn")
		}else if(time == 0){
			removeUI("waves-timer-container", "animate__fadeOut")

			waves_text.innerHTML = `Onda ${waveNumber}`
			setTimeout(() => showUI("waves-container", "animate__fadeIn"), 500)
			setTimeout(() => removeUI("waves-container", "animate__fadeOut"), 3000)
		}
	}

	const arcadeTimer = () => {
		intervalID = setInterval(() => {
			if(time % 5 === 0) switchArcadeUI()
			if(time == 5) lastFiveSeconds = true

			if(time >= 5) skills_timer.innerHTML = `${time}s`
			else hud_timer.innerHTML = `${time}s`

			if(time == 0){
				newWave()
				started = true
				lastFiveSeconds = false
				time = 10

				// timer para não mostrar o reset pro usuario
				setTimeout(() => {
					skills_timer.innerHTML = '10s'
					hud_timer.innerHTML = '5s'
				}, 1500)

				clearInterval(intervalID)
				return
			}

			time--
		}, 1000)
	}

	const skipTimer = () => {
		removeUI("skills-screen", "animate__fadeOut")
		hud_timer.innerHTML = "5s"
		time = 5
	}

	const saveData = () => {
		if(game_storage.saveAllowed()){
			if(enemysKilled > parseInt(game_storage.readStorage("SaS-Arcade"))){
				game_storage.updateStorage("SaS-Arcade", enemysKilled)

				$("#arcade-record").innerHTML = `Recorde: ${enemysKilled}`
			}
		}
	}

	const restart = () => {
		clearInterval(intervalID)
		removeUI("skills-screen", "hidden")
		removeUI("waves-timer-container", "hidden")
		removeUI("waves-container", "hidden")

		skills_timer.innerHTML = '10s'
		hud_timer.innerHTML = "5s"
		lastFiveSeconds = false
		started = false
		enemyHealth = 100
		enemysKilled = 0
		enemysCount = 3
		waveNumber = 1
		time = 10

		enemys.length = 0
		enemys_near_player.length = 0
	}

	const pause = () => {
		clearInterval(intervalID)
	}

	const getWave = () => waveNumber

	const init = () => {
		if(!started){
			arcadeTimer()			
		}
	}

	return {
		enemysKilled,
		verifyKills,
		waveNumber,
		skipTimer,
		saveData,
		getWave,
		restart,
		pause,
		init
	}
}
