function Trophy(image, posX, posY) {
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.height = this.image.height;
    this.width = this.image.width;

    this.move = function (speed) {
        if ((this.posX - speed) > window.innerWidth / 2) {
            this.posX -= speed;
        }
    }
}