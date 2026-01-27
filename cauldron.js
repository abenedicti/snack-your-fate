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
    this.x += 10;
    this.node.style.left = `${this.x}px`;
    const limitScreen = gameScreen.offsetWidth - this.width;
    if (this.x > limitScreen) this.x = limitScreen;
  }
  leftMove() {
    this.x -= 10;
    this.node.style.left = `${this.x}px`;
    if (this.x < 0) this.x = 0;
  }
  zoneMove() {
    if (this.x > 0) {
      this.x -= this.move;
      this.node.style.left = `${this.x}px`;
    }
  }
}
