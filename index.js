/// GLOBAL DOM ELEMENTS

//* screens
const startScreen = document.querySelector('#start-screen');
const zodiacScreen = document.querySelector('#zodiac-option');
const rulesScreen = document.querySelector('#game-rules');
const gameScreen = document.querySelector('#game-screen');
const gameOverScreen = document.querySelector('#game-over');
// const scoreDisplay = document.querySelector('#score');
const duration = document.querySelector('#time');

const chancesDisplay = document.querySelector('#chances');
const rottenScore = document.querySelector('#rotten-score');
const ordinaryScore = document.querySelector('#ordinary-score');
const astralScore = document.querySelector('#astral-score');
// to hide and show screens
const screens = document.querySelectorAll('.game-box');
// to select the zodiac sign
const zodiacList = document.querySelectorAll('#zodiac-sign li');
let zodiacSelection = null;

//* buttons
const zodiacBtn = document.querySelector('#next-btn');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');

//* GLOBAL NAME VARIABLES
const itemsObj = new Items();
const gameDuration = 120;
let itemsArr = [];
let cauldronObj = null;
// interval loop
let intervalItems;
// let score = 0;
let rottenCosmic = 0;
let ordinaryOrb = 0;
let astralTreasure = 0;
let chances = 3;
let intervalTimer;
// let remainingTime = 60;

//* GLOBAL GAME FUNCTIONS
function setTimer() {
  intervalTimer = setInterval(() => {
    remainingTime--;
    duration.innerText = remainingTime;

    if (remainingTime === 0) {
      clearInterval(intervalTimer);
      gameOver();
    }
  }, 1000);
}
//! SCREENS INTERVAL SHOW AND INTERACTION
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
  cauldronObj = new Cauldron();

  for (let i = 0; i < 5; i++) {
    itemsArr.push(new Items());
  }
  clearInterval(intervalItems);
  intervalItems = setInterval(newItems, 20);
}
function replay() {
  // delete index & dom
  // startGame();
}

function newItems() {
  itemsArr.forEach((item) => {
    item.itemMovement();
    item.speed += 0.005;
    // change position to go on top again = recycle instead off adding in the DOM
    if (item.y > gameScreen.offsetHeight) {
      item.y = -30 - Math.random() * 500;
      item.x = Math.random() * (gameScreen.offsetWidth - item.width);
      item.node.style.left = `${item.x}px`;
      // the item can provoke the collision again bc new loop
      item.caught = false;
    }
    collisionItems();
  });
}

function collisionItems() {
  itemsArr.forEach((item) => {
    if (!item.caught && checkItemCollision(item, cauldronObj)) {
      item.caught = true;

      switch (item.category) {
        case 'astral':
          astralTreasure += 1;
          break;
        case 'ordinary':
          ordinaryOrb += 1;
          break;
        case 'rotten':
          rottenCosmic += 1;
          chances -= 1; // on peut aussi utiliser rottenCosmic directement
          break;
      }
      console.log(rottenScore);

      rottenScore.innerText = rottenCosmic;
      ordinaryScore.textContent = ordinaryOrb;
      astralScore.textContent = astralTreasure;
      chancesDisplay.textContent = chances;

      if (chances <= 0) {
        gameOver();
      }

      if (astralTreasure >= 15) {
        gameWin();
      }
    }
  });
}

// pour chaque collision avec le cauldron, ajouter une condition en fonction de l'ingrédient percuté et le nombre de point (incrémenter/décrémenter le compteur)

function checkItemCollision(randomItem, cauldron) {
  return (
    randomItem.x < cauldron.x + cauldron.width &&
    randomItem.x + randomItem.width > cauldron.x &&
    randomItem.y < cauldron.y + cauldron.height &&
    randomItem.y + randomItem.height > cauldron.y
  );
}
function gameWin() {
  console.log('You win');
  clearInterval(intervalItems);

  gameScreen.style.display = 'none';
}
function gameOver() {
  clearInterval(intervalItems);
  gameOverScreen.style.display = 'flex';
  gameScreen.style.display = 'none';
}

//! EVENT LISTENER
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
// // select li when clicking + conenxion with horoscope result
zodiacList.forEach((sign) => {
  sign.addEventListener('click', () => {
    zodiacList.forEach((li) => {
      li.classList.remove('selected');
    });
    sign.classList.add('selected');
    //     // trim() necessary to remove spaces (better to compare and stock values)
    zodiacSelection = sign.textContent.trim();
    console.log('selection', zodiacSelection);
  });
});
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

/// PLANNING SESSION

/*
/// ZODIAC 
- li have to be connected with the horoscope ✅
/// Cauldron object
- properties (x, y, w, h, speed) ✅
- keypress ✅

/// ItemSpawn (set timer)
- items always move down (from top to bottom) =  decrease y 
- speed increase every 10sec
- collision when item touch the cauldron (top and sides)
- collision good item +1
- collision neutral item -1
- collision bad item -1 chance
- collision number item detection for score
- collision last bad item => game over


/// Items objects
- properties(x, y, x, h, speed) ✅
- come by 4 (differents items)
- randomize the number of items per fall ✅
- randomize the type of items ✅


/// EXTRA FUNCTIONALITIES
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
