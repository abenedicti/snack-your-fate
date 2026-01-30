/// GLOBAL DOM ELEMENTS
//* screens
const startScreen = document.querySelector('#start-screen');
const zodiacScreen = document.querySelector('#zodiac-option');
const rulesScreen = document.querySelector('#game-rules');
const gameScreen = document.querySelector('#game-screen');
const gameOverScreen = document.querySelector('#game-over');
const gameOverMessage = document.createElement('p');
const duration = document.querySelector('#time');
//* score display
const scoreDisplay = document.querySelector('#score');
const chancesDisplay = document.querySelector('#chances');
const rottenScore = document.querySelector('#rotten-score');
const ordinaryScore = document.querySelector('#ordinary-score');
const astralScore = document.querySelector('#astral-score');
//* to hide and show screens
const screens = document.querySelectorAll('.game-box');
//* to select the zodiac sign
const zodiacList = document.querySelectorAll('#zodiac-sign li');
const horoscopeResult = document.querySelector('#horoscope-result');
let zodiacSelection = null;

//* buttons
const zodiacBtn = document.querySelector('#next-btn');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
//* animation title
const titleAnimation = document.querySelector('.wave');
//* sound
const soundBtn = document.querySelector('#sound-toggle');
let soundEnabled = true;

const bgSound = new Audio('./sounds/bg-sound.mp3');
bgSound.volume = 0.1;
const gameOverSound = new Audio('./sounds/game-over-sound.mp3');
gameOverSound.volume = 0.1;
const collectRightItem = new Audio('./sounds/good-item-collect.mp3');
collectRightItem.volume = 0.1;
const collectWrongItem = new Audio('./sounds/wrong-item-collect.mp3');
collectWrongItem.volume = 0.3;
const collectOrdinaryItem = new Audio('./sounds/ordinary-item-collect.mp3');
collectOrdinaryItem.volume = 0.1;
//* GLOBAL NAME VARIABLES
const itemsObj = new Items();
let gameDuration = 60;
let itemsArr = [];
let cauldronObj = null;
let intervalItems;
let rottenCosmic = 0;
let ordinaryOrb = 0;
let astralTreasure = 0;
let chances = 3;
let intervalTimer;

//* GLOBAL GAME FUNCTIONS
function setTimer() {
  intervalTimer = setInterval(() => {
    gameDuration--;
    duration.innerText = gameDuration;

    if (gameDuration <= 0) {
      clearInterval(intervalTimer);
      gameOver();
    }
  }, 1000);
  //! SCREENS INTERVAL SHOW AND INTERACTION
}
function showScreen(selectedScreen) {
  screens.forEach((screen) => {
    screen.style.display = 'none';
  });

  selectedScreen.style.display = 'flex';
}
//! show the first screen with the title and then the zodiac-option screen
showScreen(startScreen);
setTimeout(() => {
  showScreen(zodiacScreen);
}, 5000);

function startGame() {
  cauldronObj = new Cauldron();

  for (let i = 0; i < 9; i++) {
    itemsArr.push(new Items());
  }
  bgSound.currentTime = 0;
  bgSound.play();

  gameDuration = 60;
  setTimer();
  intervalItems = setInterval(newItems, 20);
}
function replay() {
  itemsArr.forEach((item) => item.node.remove());
  itemsArr = [];
  astralTreasure = 0;
  ordinaryOrb = 0;
  rottenCosmic = 0;
  chances = 3;

  astralScore.textContent = astralTreasure;
  ordinaryScore.textContent = ordinaryOrb;
  rottenScore.textContent = rottenCosmic;
  chancesDisplay.textContent = chances;

  gameOverScreen.style.display = 'none';
  gameScreen.style.display = 'flex';

  startGame();
}

function newItems() {
  itemsArr.forEach((item) => {
    item.itemMovement();
    item.speed += 0.002;
    // change position to go on top again = recycle instead off adding in the DOM
    if (item.y > gameScreen.offsetHeight) {
      item.y = -40 - Math.random() * 300;
      item.x = Math.random() * (gameScreen.offsetWidth - item.width);
      item.node.style.left = `${item.x}px`;
      // the item can provoke the collision again bc new loop
      item.caught = false;
      item.randomizeItems();
    }
  });
  collisionItems();
}

function collisionItems() {
  itemsArr.forEach((item) => {
    if (!item.caught && checkItemCollision(item, cauldronObj)) {
      item.caught = true;

      switch (item.category) {
        case 'astral':
          astralTreasure += 1;
          collectRightItem.currentTime = 0;
          playSound(collectRightItem);
          break;
        case 'ordinary':
          ordinaryOrb += 1;
          astralTreasure -= 1;
          collectOrdinaryItem.currentTime = 0;
          playSound(collectOrdinaryItem);
          break;
        case 'rotten':
          rottenCosmic += 1;
          chances -= 1;
          collectWrongItem.currentTime = 0;
          playSound(collectWrongItem);
          break;
      }
      // hide the item when collide and randomize again
      item.node.style.display = 'none';
      item.y = -30 - Math.random() * 200;
      item.x = Math.random() * (gameScreen.offsetWidth - item.width);

      // setTimeOut for the next round
      setTimeout(() => {
        item.node.style.left = `${item.x}px`;
        item.node.style.top = `${item.y}px`;
        item.node.style.display = 'block';
        item.caught = false; //
        item.randomizeItems(); //
      }, 50);

      rottenScore.innerText = rottenCosmic;
      ordinaryScore.textContent = ordinaryOrb;
      astralScore.textContent = astralTreasure;
      chancesDisplay.textContent = chances;

      if (chances <= 0) {
        console.log('Game over, zodiac:', zodiacSelection);
        gameOver(false);
      }

      if (astralTreasure >= 15) {
        console.log('Game over, zodiac:', zodiacSelection);
        gameOver(true);
      }
    }
  });
}

function checkItemCollision(randomItem, cauldron) {
  return (
    randomItem.x < cauldron.x + cauldron.width &&
    randomItem.x + randomItem.width > cauldron.x &&
    randomItem.y < cauldron.y + cauldron.height &&
    randomItem.y + randomItem.height > cauldron.y
  );
}

function gameOver(hasWon) {
  // remove the cauldron from th DOM if one already exist
  if (cauldronObj && cauldronObj.node) {
    cauldronObj.node.remove();
  }

  gameOverScreen.style.display = 'flex';
  gameScreen.style.display = 'none';

  gameOverSound.play();
  gameOverSound.currentTime = 0;

  bgSound.pause();
  bgSound.currentTime = 0;

  const result = showHoroscope(zodiacSelection, hasWon);
  horoscopeResult.textContent = result;

  clearInterval(intervalItems);
  clearInterval(intervalTimer);
}

function showHoroscope(sign, hasWon) {
  const messages = horoscopes[sign];
  return hasWon ? messages.win : messages.lose;
}
function waveTitle(title) {
  const text = title.textContent;
  title.textContent = '';

  [...text].forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    title.append(span);
  });
}
waveTitle(titleAnimation);
// to mute as well the items when clicking button. function call in function collisionItems()
function playSound(sound) {
  if (soundEnabled) {
    sound.currentTime = 0;
    sound.play();
  }
}
function showZodiac() {
  if (zodiacSelection) {
    showScreen(rulesScreen);
  } else {
    alert('Please select your zodiac sign');
  }
}
zodiacList.forEach((sign) => {
  sign.addEventListener('click', () => {
    zodiacList.forEach((li) => {
      li.classList.remove('selected');
    });
    sign.classList.add('selected');
    //     // trim() necessary to remove spaces (better to compare and stock values)
    zodiacSelection = sign.dataset.sign;
    console.log('selection', zodiacSelection);
  });
});

//* EVENT LISTENER
// show the rules screen after clicking next-btn
zodiacBtn.addEventListener('click', showZodiac);
// show the game after the rules and clicking btn
startBtn.addEventListener('click', () => {
  showScreen(gameScreen);
  startGame();
});
restartBtn.addEventListener('click', () => {
  showScreen(gameScreen);
  replay();
});
/// select li when clicking + connexion with horoscope result

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    bgSound.play();
    soundBtn.textContent = '🔊';
  } else {
    bgSound.pause();
    soundBtn.textContent = '🔇';
  }
});

/// keypress
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    cauldronObj.leftMove();
  }
  if (event.key === 'ArrowRight') {
    cauldronObj.rightMove();
  }
  // if (cauldronObj.x > gameScreen.offsetWidth) {
  //   zoneMove();
  // }
});
