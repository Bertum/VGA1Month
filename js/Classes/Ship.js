Ship.prototype = new MainClass();
//Declaracion objeto Ship para el jugador y los enemigos
function Ship(src, posX, posY, vida) {
    MainClass.call(this, src, posX, posY);
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