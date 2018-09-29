$(document).ready(function () {
	inicio();
});
function inicio() {
	level = localStorage.getItem("level");
	gamePaused = true;
	$("canvas").attr("width", widthVentana);
	$("canvas").attr("height", heightVentana);
	temporizador = setTimeout("bucle()", 1000);
	drawHPBar();
	gestionTeclas();
	gestionZonas();
	var musica = document.getElementById("musica");
	musica.volume = 0.05;
}
function bucle() {
	if (!gamePaused) {
		clearCanvas();
		acelerado();
		drawStars();
		if (controlTiempo % 100) {
			colisionBalas();
		}
		if (controlTiempo % 50 == 0) {
			spawnEnemy();
			if (level == 2) {
				enemigoDispara(Math.ceil(Math.random() * (enemigos.length - 1)));
			}
		}
		if (controlTiempo % 5000 == 0) {
			borraSonidos();
		}
		trophy.move(speed);
		limpiaBalas();
		movimientoPJ();
		movimientoEnemigo();
		gestionJefe();
		updateHPBar();
		finDelJuego();
		drawTrophy();
		hitTrophy();
		controlTiempo++;
	}
	clearTimeout(temporizador);
	temporizador = setTimeout("bucle()", 15);
	finDelJuego();
}

function finDelJuego() {
	if (pj.damageTaken >= pj.vida) {
		//alert("GAME OVER \nTOTAL SCORE = " + puntuacion);
		//Reiniciamos la pagina
		//clearTimeout(temporizador);
		//location.reload(true);
	}
}