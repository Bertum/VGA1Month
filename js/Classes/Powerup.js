Powerup.prototype = new MainClass();
//Declaracion objeto Powerup
function Powerup(src, powX, powY, efecto, tiempo) {
    MainClass.call(this, src, powX, powY);
    this.efecto = efecto;
    this.altura = this.sprite.height;
    this.anchura = this.sprite.width;
    this.tiempo = tiempo;
}