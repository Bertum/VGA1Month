//Declaracion objeto Powerup
function Powerup(src, powX, powY, efecto, tiempo) {
    this.sprite = new Image();
    this.sprite.src = src;
    this.powX = powX;
    this.powY = powY;
    this.efecto = efecto;
    this.altura = this.sprite.height;
    this.anchura = this.sprite.width;
    this.tiempo = tiempo;
}