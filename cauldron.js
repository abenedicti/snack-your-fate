class Cauldron {
  constructor() {
    this.node = document.createElement('img');
    this.node.src = './img/cauldron2.png';

    gameScreen.append(this.node);

    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;

    this.node.style.position = 'absolute';
    this.node.style.bottom = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.move = 1.2;
  }
  rightMove() {
    this.x += 40;
    this.node.style.left = `${this.x}px`;
  }
  leftMove() {
    this.x -= 40;
    this.node.style.left = `${this.x}px`;
  }
  zoneMove() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > gameScreen.offsetWidth - this.width) {
      this.x = gameScreen.offsetWidth - this.width;
    }
    this.node.style.left = `${this.x}px`;
  }
}
