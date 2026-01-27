class Items {
  constructor() {
    const img = [
      './img/bomb.png',
      './img/skull.png',
      './img/red-pepper.png',
      './img/cheese.png',
      './img/sock.png',
      './img/tooth.png',
      './img/leaf.png',
      './img/crystal.png',
      './img/star.png',
    ];

    this.node = document.createElement('img');
    this.node.src = img[Math.floor(Math.random() * img.length)];

    gameScreen.append(this.node);

    this.x = Math.random() * (gameScreen.offsetWidth - 30);
    this.y = -30;
    this.width = 30;
    this.height = 30;
    this.speed = Math.random() * 2 + 1;

    this.node.style.position = 'absolute';
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
  }

  itemMovement() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
