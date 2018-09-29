//Variables entorno
var temporizador = "";
var controlTiempo = 0;
var puntuacion = 0;
var backgroundCanvas = document.getElementById("backgroundCanvas");
var gameCanvas = document.getElementById("gameCanvas");
var ammoCanvas = document.getElementById("ammoCanvas");
var backgroundContext = backgroundCanvas.getContext("2d"); //indico que el juego será 2D
var gameContext = gameCanvas.getContext("2d"); //indico que el juego será 2D
var ammoContext = ammoCanvas.getContext("2d"); //indico que el juego será 2D
//Anchura y altura de ventana
var widthVentana = window.innerWidth;
var heightVentana = window.innerHeight;
var level = 1;

//Variables fondo de estrellas
var nEstrellas = 3;
var arrEstrellas = new Array();
for (var i = 0; i < nEstrellas; i++) {
	arrEstrellas[i] = new Image();
	arrEstrellas[i].src = "img/Stars-Nebulae/Stars.png";
}

var meteoriteImage = new Image();
meteoriteImage.src = "img/meteorites/meteorite.png";

var navePJ = new Image();
var pj = 0;
navePJ.addEventListener('load', function () {
	pj = new Ship(navePJ, 100, 100, 20);
}, false);
navePJ.src = "img/futuramaShip_smaller.png";


var nEnemigos = 3;
var enemigos = new Array();
naveEnemiga = new Image();
var naveEnemiga2 = new Image();

naveEnemiga.addEventListener('load', function () {
	//Variables enemigos
	for (var i = 0; i < nEnemigos; i++) {
		var image = GetRandomEnemySprite();
		enemigos.push(new Ship(image, randomRangeNumber(1, 2) * widthVentana, Math.random() * heightVentana, 5));
	}
}, false);
naveEnemiga.src = "img/small_enemyShip.png";
naveEnemiga2.src = "img/Small_enemyShip_2/8.png";

var naveJefe = new Image();
var jefe = 0;
var musicaJefe = 0;

naveJefe.addEventListener('load', function () {
	//Variables jefe
	jefe = new Ship(naveJefe, 100 + widthVentana, 100, 100);
}, false);
naveJefe.src = "img/Boss_Mothership.png";

//Obtiene un sprite aleatorio para los enemigos
function GetRandomEnemySprite() {
	var image = new Image();
	if (level == 2) {
		var rnd = randomRangeNumber(0, 1);
		switch (rnd) {
			case 0: image = naveEnemiga;
				break;
			case 1: image = naveEnemiga2;
				break;
		}
	} else {
		image = meteoriteImage;
	}
	return image;
}
