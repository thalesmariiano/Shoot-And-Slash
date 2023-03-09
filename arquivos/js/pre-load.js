
window.onload = () => {
	// generateTerrain(scenarioMapTiles, scenarioMapBlocks)
	generateTerrain(playableMapTiles, playebleMapBlocks)

	player_sprites.forEach(spr => {
		const img = new Image()
		img.src = spr.image
		spr.image = img
	})
}
