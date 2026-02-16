class Items {
  constructor() {
    const astral = ['./img/leaf.png', './img/crystal.png', './img/star.png'];
    const ordinary = ['./img/cheese.png', './img/sock.png', './img/tooth.png'];
    const rotten = [
      './img/bomb.png',
      './img/skull.png',
      './img/red-pepper.png',
    ];

    this.categories = [
      { list: astral, category: 'astral' },
      { list: ordinary, category: 'ordinary' },
      { list: rotten, category: 'rotten' },
    ];

    this.node = document.createElement('img');
    this.node.classList.add('responsive-items');
    gameScreen.append(this.node);

    this.width = 40;
    this.height = 40;
    this.x = Math.random() * (gameScreen.offsetWidth - this.width);
    this.y = -40 - Math.random() * 200;
    this.speed = Math.random() * 2 + 1;

    // collision
    this.caught = false;
    this.randomizeItems();

    this.node.style.position = 'absolute';
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  randomizeItems() {
    const choice =
      this.categories[Math.floor(Math.random() * this.categories.length)];
    const img = choice.list[Math.floor(Math.random() * choice.list.length)];
    this.node.src = img;
    this.category = choice.category;
  }
  itemMovement() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
