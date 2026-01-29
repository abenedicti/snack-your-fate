class Cauldron {
  constructor() {
    this.node = document.createElement('img');
    this.node.src = './img/cauldron2.png';

    gameScreen.append(this.node);
    this.width = 120;
    this.height = 120;
    this.x = 0;
    this.y = gameScreen.offsetHeight - this.height;

    this.node.style.position = 'absolute';
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.move = 8;
    //  for the collision
    this.caught = false;
  }
  rightMove() {
    this.x += 10;

    const limitScreen = gameScreen.offsetWidth - this.width;
    if (this.x > limitScreen) {
      this.x = limitScreen;
    }
    this.node.style.left = `${this.x}px`;
  }
  leftMove() {
    this.x -= this.move;
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
