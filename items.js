class Items {
  constructor() {
    // catégories d’ingrédients
    const astral = ['./img/leaf.png', './img/crystal.png', './img/star.png'];
    const ordinary = ['./img/cheese.png', './img/sock.png', './img/tooth.png'];
    const rotten = [
      './img/bomb.png',
      './img/skull.png',
      './img/red-pepper.png',
    ];

    const categories = [
      { list: astral, category: 'astral' },
      { list: ordinary, category: 'ordinary' },
      { list: rotten, category: 'rotten' },
    ];

    const choice = categories[Math.floor(Math.random() * categories.length)];

    const img = choice.list[Math.floor(Math.random() * choice.list.length)];

    // créer l’image
    this.node = document.createElement('img');
    this.node.src = img;
    this.category = choice.category;

    gameScreen.append(this.node);

    // position et taille
    this.width = 30;
    this.height = 30;
    this.x = Math.random() * (gameScreen.offsetWidth - this.width);
    this.y = -30 - Math.random() * 200;
    this.speed = Math.random() * 2 + 1;

    // collision
    this.caught = false;

    // style
    this.node.style.position = 'absolute';
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  itemMovement() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
