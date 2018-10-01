Trophy.prototype = new MainClass();

function Trophy(image, posX, posY) {
    MainClass.call(this, image, posX, posY);
    this.height = this.sprite.height;
    this.width = this.sprite.width;

    this.move = function (speed) {
        if ((this.posX - speed) > window.innerWidth / 2) {
            this.posX -= speed;
        }
    }
}