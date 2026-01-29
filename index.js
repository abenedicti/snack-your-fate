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
}, 3000);

function startGame() {
  // remove the cauldron from th DOM if one already exist
  if (cauldronObj && cauldronObj.node) {
    cauldronObj.node.remove();
  }
  cauldronObj = new Cauldron();

  for (let i = 0; i < 9; i++) {
    itemsArr.push(new Items());
  }
  bgSound.currentTime = 0;
  bgSound.play();

  clearInterval(intervalItems);
  clearInterval(intervalTimer);
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

  // delete index & dom
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
          collectRightItem.play();
          break;
        case 'ordinary':
          ordinaryOrb += 1;
          astralTreasure -= 1;
          collectOrdinaryItem.currentTime = 0;
          collectOrdinaryItem.play();
          break;
        case 'rotten':
          rottenCosmic += 1;
          chances -= 1;
          collectWrongItem.currentTime = 0;
          collectWrongItem.play();
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
  clearInterval(intervalItems);
  gameOverScreen.style.display = 'flex';
  gameScreen.style.display = 'none';

  gameOverSound.play();

  bgSound.pause();
  bgSound.currentTime = 0;

  const result = showHoroscope(zodiacSelection, hasWon);
  horoscopeResult.textContent = result;
}

function showHoroscope(sign, hasWon) {
  const horoscopes = {
    Aries: {
      win: 'Your energy paid off! Only Mars is impressed.',
      lose: 'Oops… maybe next time, don’t rush like a ram. Go to bed',
    },
    Taurus: {
      win: 'You got it! Your stubbornness finally worked in your favor. Enjoy.',
      lose: 'Relax… the couch forgives your mistakes. Eat soil and clean your feet',
    },
    Gemini: {
      win: 'Double the fun! Gemini, you nailed it… You are the best, I love you.',
      lose: 'Change of plans? Yep, that’s you. Try again next year',
    },
    Cancer: {
      win: 'Heart and soul—perfect catch! Your moon is proud for once.',
      lose: "It’s okay… cry, snack but don't try again, you are hopeless.",
    },
    Leo: {
      win: 'You shine bright! Even the stars are trying to applauding you.',
      lose: 'Roar! Not your day, breath and spit your gum',
    },
    Virgo: {
      win: 'Precision pays off! Virgo efficiency level: expert. A least one area',
      lose: 'Plan B… or C… maybe D? Stop trying, you are a piece of s***',
    },
    Libra: {
      win: 'Balance achieved! Harmony and victory are yours. Cuba Libra. ',
      lose: 'Can’t please everyone… but you can go f*** yourself',
    },
    Scorpio: {
      win: 'Intuition strikes! Your secret Scorpio power works only on you.',
      lose: 'Hmm… sabotage by destiny? Try again, cuttie',
    },
    Sagittarius: {
      win: 'Adventure success! You caught it on the first try. Enjoy this unique victory',
      lose: 'Wrong turn? Don’t worry, life goes on, swallow it',
    },
    Capricorn: {
      win: 'Goal achieved! Your hard work paid off... or not.',
      lose: "Effort counts… just not this time. Keep climbing and don't hurt yourlsef",
    },
    Aquarius: {
      win: 'Brilliant idea, perfect execution! You’re a star with the martini.',
      lose: 'Oops… genius moment postponed, usual day for you',
    },
    Pisces: {
      win: 'Dreams do come true! Pisces magic works again. EAT SHRIMPES',
      lose: 'Reality bites… but don’t forget to get use to it.',
    },
  };
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
//* EVENT LISTENER
// show the rules screen after clicking next-btn
zodiacBtn.addEventListener('click', () => {
  if (zodiacSelection) {
    showScreen(rulesScreen);
  } else {
    alert('Please select your zodiac sign');
  }
});
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

//! PLANNING SESSION
/*
//! ZODIAC 
- li have to be connected with the horoscope ✅
//! Cauldron object
- properties (x, y, w, h, speed) ✅
- keypress ✅

//! ItemSpawn (set timer)
- items always move down (from top to bottom) =  decrease y 
- speed increase every 10sec
- collision when item touch the cauldron (top and sides)
- collision win item +1
- collision neutral item -1
- collision lose item -1 chance
- collision number item detection for score
- collision last lose item => game over


//! Items objects
- properties(x, y, x, h, speed) ✅
- come by 4 (differents items)
- randomize the number of items per fall ✅
- randomize the type of items ✅


//! EXTRA FUNCTIONALITIES
Mandatory
- background sound 
- restart btn
- show score
- final release : horoscope
- Letters (title and game over) and items moving 

Bonus
- collision sound
- teasing when losing

*/
