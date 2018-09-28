//Variables entorno
var temporizador = "";
var controlTiempo = 0;
var puntuacion = 0;
var lienzo = document.getElementById("lienzo");
var contexto = lienzo.getContext("2d"); //indico que el juego será 2D
//Anchura y altura de ventana
var widthVentana = window.innerWidth;
var heightVentana = window.innerHeight;

//Variables fondo de estrellas
var nEstrellas = 3;
var arrEstrellas = new Array();
for(var i = 0;i<nEstrellas;i++){
	arrEstrellas[i] = new Image();
	arrEstrellas[i].src = "img/Stars-Nebulae/Stars.png";
}

var navePJ = new Image();
var pj = 0;
navePJ.addEventListener('load', function() {
  pj = new Ship(navePJ,100,100,20);
}, false);
navePJ.src="img/Example_ships/13.png";

var nEnemigos = 3;
var enemigos = new Array();
naveEnemiga = new Image();
naveEnemiga.addEventListener('load', function() {
  //Variables enemigos
	for(var i = 0;i<nEnemigos;i++){
		enemigos.push(new Ship(naveEnemiga,Math.random()*widthVentana,Math.random()*heightVentana,5));
	}
}, false);
naveEnemiga.src="img/Example_ships/8B.png";

//Declaracion objeto Ship para el jugador y los enemigos
function Ship(src,posX,posY,vida){
	this.sprite = src;
	this.posX = posX;
    this.posY = posY;
	this.vida = vida;
	this.altura = this.sprite.height;
	this.anchura = this.sprite.width;
    this.damageTaken = 0;
    this.balas = new Array();
	this.movX = 0;
	this.movY = 0;
	this.velocX = 0;
	this.velocY = 0;
}

//Declaracion objeto Municion
function Municion(src,munX,munY,damage,munV){
	this.sprite = new Image();
	this.sprite.src = src;
	this.munX = munX;
	this.munY = munY;
	this.munV = munV;
	this.damage = damage;
}
