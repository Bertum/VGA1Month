//Declaracion objeto Municion
function Municion(src, munX, munY, damage, munV) {
    this.sprite = new Image();
    this.sprite.src = src;
    this.munX = munX;
    this.munY = munY;
    this.munV = munV;
    this.damage = damage;
}