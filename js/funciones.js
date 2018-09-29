//Establecemos la barra de vida del personaje
function drawHPBar() {
	gameContext.fillStyle = "#00A420";
	gameContext.rect(5, heightVentana / 4, 10, pj.vida * 10);
	gameContext.fillRect(5, widthVentana / 4, 10, pj.vida * 10);
	gameContext.stroke();
}

//Llamamos a esto dentro del bucle para actualizar de forma constante la vida del personaje.
function updateHPBar() {
	//Limpiamos el rectangulo
	gameContext.clearRect(5, heightVentana / 4, 10, pj.vida * 10);
	//Lo llenamos de arriba a abajo
	gameContext.fillStyle = "#00A420";
	if ((pj.damageTaken / pj.vida) > 0.5) gameContext.fillStyle = "#FF0000";
	gameContext.fillRect(5,
		(heightVentana / 4) + pj.damageTaken * 10,
		10,
		(pj.vida - pj.damageTaken) * 10
	);
}


function gestionTeclas() {
	$(document).keydown(function (event) {
		//Al pulsar barra espaciadora el jugador disparara una bala
		if (event.which == 32) {
			disparar();
		}
		//Al pulsar izquierda el jugador ira a la izquierda
		if (event.which == 37 || event.which == 65) {
			pj.movX = "izquierda";
		}
		//Al pulsar arriba asignamos a la bala la posicion del jugador e incrementamos el numero de balas.			
		if (event.which == 38 || event.which == 87) {
			pj.movY = "arriba";
		}
		//Al pulsar derecha el jugador ira a la derecha
		if (event.which == 39 || event.which == 68) {
			pj.movX = "derecha";
		}
		//Al pulsar abajo el jugador ira a la izquierda
		if (event.which == 40 || event.which == 83) {
			pj.movY = "abajo";
		}
	});
	//Si ni izquierda ni derecha se presionan, no muevas el personaje.
	$(document).keyup(function (event) {
		if (event.which == 37 || event.which == 39 || event.which == 65 || event.which == 68) {
			pj.movX = 0;
		}
		if (event.which == 38 || event.which == 40 || event.which == 87 || event.which == 83) {
			pj.movY = 0;
		}
	});
}

//Dibuja las estrellas del fondo
function drawStars() {
	//Actualizamos el tamano de la ventana en caso de que el usuario la expanda
	widthVentana = window.innerWidth;
	heightVentana = window.innerHeight;
	for (var i in arrEstrellas) {
		backgroundContext.drawImage(arrEstrellas[i], Math.random() * widthVentana, Math.random() * heightVentana);
	}
}

//Genera una bala en el pj
function disparar() {
	var posMunY;
	if (pj.balas.length % 2) {
		posMunY = pj.posY;
	}
	else {
		posMunY = pj.posY + pj.altura;
	}
	pj.balas.push(new Municion("img/Muzzle_flashes/disparo1.png", pj.posX + pj.anchura, posMunY, 5, 3));
}

//Funcion para gestionar la colision de las balas
function colisionBalas() {
	//Repasamos las balas del personaje
	for (var i in pj.balas) {
		//Incrementamos su X acorde a su velocidad
		pj.balas[i].munX += pj.balas[i].munV;
		//Dibujamos
		ammoContext.drawImage(pj.balas[i].sprite, pj.balas[i].munX, pj.balas[i].munY);
		//Por cada enemigo vigilamos que colisionen
		for (var e in enemigos) {
			//Si colisiona con el enemigo e
			if (pj.balas[i].munX > enemigos[e].posX && pj.balas[i].munX < enemigos[e].posX + enemigos[e].anchura && pj.balas[i].munY > enemigos[e].posY && pj.balas[i].munY < enemigos[e].posY + enemigos[e].altura) {
				//Borramos al enemigo
				enemigos.splice(e, 1);
				//Borramos la bala
				pj.balas.splice(i, 1);
				//Incrementamos la puntuacion
				puntuacion++;
				$("#puntuacion").html(puntuacion);
				//Añadimos el audio de muerte de enemigo
				$("#contieneAudio").append('<audio id="explo" src="audio/boom1.wav" autoplay></audio>');
				break;
			}
		}
	}
	//Repasamos las balas de cada enemigo enemigo
	for (var e in enemigos) {
		for (var i in enemigos[e].balas) {
			//Decrementamos su X acorde a su velocidad ya que van en sentido contrario a las del pj.
			enemigos[e].balas[i].munX -= enemigos[e].balas[i].munV;
			//Dibujamos
			ammoContext.drawImage(enemigos[e].balas[i].sprite, enemigos[e].balas[i].munX, enemigos[e].balas[i].munY);
			//Si colisiona con el enemigo e
			if (enemigos[e].balas[i].munX > pj.posX && enemigos[e].balas[i].munX < pj.posX + pj.anchura &&
				enemigos[e].balas[i].munY > pj.posY && enemigos[e].balas[i].munY < pj.posY + pj.altura) {
				//Dañamos al personaje
				pj.damageTaken += enemigos[e].balas[i].damage;
				//Borramos la bala
				enemigos[e].balas.splice(i, 1);
				break;
			}
		}
	}
}

//Funcion de limpieza de balas una vez se marchan de la pantalla
function limpiaBalas() {
	for (var numnave in pj.balas) {
		//Si la X es mayor que el tamaño de la pantalla, borramos
		if (pj.balas[numnave].munX > widthVentana) {
			pj.balas.splice(numnave, 1);
			pj.balas.splice(numnave, 1);
		}
	}
}

//Funcion de control del movimiento del pj
function movimientoPJ() {
	//Movimiento PJ en X
	switch (pj.movX) {
		case "izquierda":
			//Si intentamos sobrepasarnos de la barra de vida, bloqueamos el movimiento
			if (pj.posX < 20) pj.posX = 20;
			else {
				pj.velocX--;
				pj.posX += pj.velocX;
			}
			break;
		case "derecha":
			//Si intentamos salirnos del tamaño de la ventana, bloqueamos el movimiento
			if (pj.posX > widthVentana - pj.anchura) pj.posX = widthVentana - pj.anchura;
			else {
				pj.velocX++;
				pj.posX += pj.velocX;
			}
			break;
		default:
			//Si no pulsamos ninguna tecla, cancelamos la aceleracion
			pj.velocX = 0;
			break
	}
	//Movimiento PJ en Y
	switch (pj.movY) {
		case "arriba":
			//Si intentamos salirnos del tamaño de la ventana, bloqueamos el movimiento
			if (pj.posY < 0) pj.posY = 0;
			else {
				pj.velocY--;
				pj.posY += pj.velocY;
			}
			break;
		case "abajo":
			//Si intentamos salirnos del tamaño de la ventana, bloqueamos el movimiento de la nave
			if (pj.posY > heightVentana - pj.altura) pj.posY = heightVentana - pj.altura;
			else {
				pj.velocY++;
				pj.posY += pj.velocY;
			}
			break;
		default:
			//Si no pulsamos ninguna tecla, cancelamos la aceleracion
			pj.velocY = 0;
			break
	}

	gameContext.drawImage(pj.sprite, pj.posX, pj.posY);
}

//Funcion de control del aceleramiento y frenado de la nave
function acelerado() {
	if (pj.posX == 0) {
		if (pj.velocX > 0) { pj.velocX--; }
		if (pj.velocX < 0) { pj.velocX++ }
		pj.posX += pj.velocX;
	}
	if (pj.posY == 0) {
		if (pj.velocY > 0) { pj.velocY--; }
		if (pj.velocY < 0) { pj.velocY++ }
		pj.posY += pj.velocY;
	}
}

//Funcion de control de movimiento de los diversos enemigos
function movimientoEnemigo() {
	for (var e in enemigos) {
		if (pj.posX > enemigos[e].posX && pj.posX < enemigos[e].posX + enemigos[e].anchura && pj.posY > enemigos[e].posY && pj.posY < enemigos[e].posY + enemigos[e].altura) {
			//Borramos al enemigo
			enemigos.splice(e, 1);
			//Dañamos al personaje
			pj.damageTaken += 10;
			//Añadimos el audio de muerte de enemigo
			$("#contieneAudio").append('<audio id="explo" src="audio/boom1.wav" autoplay></audio>');
			break;
		}
		//Si el enemigo se sale de la pantalla, lo borramos directamente
		if (enemigos[e].posX < 20 || enemigos[e].posX > widthVentana - enemigos[e].anchura || enemigos[e].posY < 0 || enemigos[e].posY + enemigos[e].altura > heightVentana) {
			enemigos.splice(e, 1);
			break;
		}
		enemigos[e].posX--;
		enemigos[e].posY += Math.random() * 4 - 2;
		gameContext.drawImage(enemigos[e].sprite, enemigos[e].posX, enemigos[e].posY);
	}
}

//Funcion para la creacion de nuevos enemigos tras un tiempo de juego
function spawnEnemy() {
	enemigos.push(new Ship(naveEnemiga, Math.random() * widthVentana, Math.random() * heightVentana, 5));
}

//Funcion para hacer que un enemigo aleatorio dispare
function enemigoDispara(numEnemigo) {
	console.log(numEnemigo);
	enemigos[numEnemigo].balas.push(new Municion("img/Muzzle_flashes/disparo2.png",
		enemigos[numEnemigo].posX,
		enemigos[numEnemigo].posY + (enemigos[numEnemigo].posY / 2), 5, 3));
}

//Funcion de la gestion de las zonas tactiles
function gestionZonas() {
	//Movimientos
	$("#arriba").mousedown(function () { pj.movY = "arriba"; });
	$("#abajo").mousedown(function () { pj.movY = "abajo"; });
	$("#derecha").mousedown(function () { pj.movX = "derecha"; });
	$("#izquierda").mousedown(function () { pj.movX = "izquierda"; });
	//Disparos
	$("#disparo").click(function () { disparar(); });
	//Detiene el movimiento una vez soltemos el raton
	$(document).mouseup(function () {
		pj.movX = 0;
		pj.movY = 0;
	});
}

//Funcion con la que borraremos los sonidos 
function borraSonidos() {
	$("#contieneAudio").html("");
}

function randomRangeNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function clearCanvas() {
	backgroundContext.clearRect(0, 0, widthVentana, heightVentana);
	gameContext.clearRect(0, 0, widthVentana, heightVentana);
	ammoContext.clearRect(0, 0, widthVentana, heightVentana);
}