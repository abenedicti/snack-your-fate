/// GLOBAL DOM ELEMENTS

//* screens
const startScreen = document.querySelector('#start-screen');
const zodiacScreen = document.querySelector('#zodiac-option');
const rulesScreen = document.querySelector('#game-rules');
const gameScreen = document.querySelector('#game-screen');
const gameOverScreen = document.querySelector('#game-over');
const scoreDisplay = document.querySelector('#score');
const chancesDisplay = document.querySelector('#chances');
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
let itemsArr = [];
let cauldronObj = null;
let itemsInterval = null;
let itemsSpanInterval = null;
let score = 0;
let scoreMax = 15;
let chances = 3;

//* GLOBAL GAME FUNCTIONS

//! SCREENS INTERVAL SHOW AND INTERACTION
// function showScreen(selectedScreen) {
//   screens.forEach((screen) => {
//     screen.style.display = 'none';
//   });

//   selectedScreen.style.display = 'flex';
// }
// //! show the first screen with the title and then the zodiac-option screen
// showScreen(startScreen);
// setTimeout(() => {
//   showScreen(zodiacScreen);
// }, 3000);

function startGame() {
  cauldronObj = new Cauldron();
  for (let i = 0; i < 5; i++) {
    itemsArr.push(new Items());
  }
}
function newItems() {
  itemsArr.forEach((item) => {
    item.itemMovement();
    item.speed += 0.001;
    // change position to go on top again = recycle instead off adding in the DOM
    if (item.y > gameScreen.offsetHeight) {
      item.y = -30 - Math.random() * 500;
      item.x = Math.random() * (gameScreen.offsetWidth - item.width);
      item.node.style.left = `${item.x}px`;
      // the item can provoke the collision again bc new loop
      item.caught = false;
    }
  });
  collisionItems();
}
setInterval(newItems, 20);
// function scoreGame() {
// counterItem.forEach((astralItem)=> {
//   if (astralItem.caught ===  )
// })
// eachItems.caught = true;
// }
function collisionItems() {
  itemsArr.forEach((item) => {
    if (!item.caught && checkItemCollision(item, cauldronObj)) {
      item.caught = true;

      if (item.category === 'astral') {
        score += 1;
      } else if (item.category === 'ordinary') {
        score -= 1;
      } else if (item.category === 'rotten') {
        chances -= 1;
      }

      scoreDisplay.textContent = score;
      chancesDisplay.textContent = chances;

      if (chances <= 0) {
        gameOver();
      }
      if (score > scoreMax) {
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
  clearInterval(itemsInterval);

  gameScreen.style.display = 'none';
  horoscopeScreen;
}
function gameOver() {}
function replay() {
  //
}
function titlesMovement() {}
//! EVENT LISTENER
// show the rules screen after clicking next-btn
// zodiacBtn.addEventListener('click', () => {
//   if (zodiacSelection) {
//     showScreen(rulesScreen);
//   } else {
//     alert('Please select your zodiac sign');
//   }
// });
// // show the game after the rules and clicking btn
// startBtn.addEventListener('click', () => {
//   showScreen(gameScreen);
startGame();
// });
// // select li when clicking + conenxion with horoscope result
// zodiacList.forEach((sign) => {
//   sign.addEventListener('click', () => {
//     zodiacList.forEach((li) => {
//       li.classList.remove('selected');
//     });
//     sign.classList.add('selected');
//     // trim() necessary to remove spaces (better to compare and stock values)
//     zodiacSelection = sign.textContent.trim();
//     console.log('selection', zodiacSelection);
//   });
// });
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
