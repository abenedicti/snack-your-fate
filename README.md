# SNACK YOUR FATE

## [Play the Game!](https://abenedicti.github.io/snack-your-fate/)

![Game Logo](www.your-image-logo-here.com)

# Description

Catch items with the cauldron to get your horoscope.
Regarding to the items that you pick you will have a good or bad horoscope.

# Main Functionalities

- Pick first your zodiac-sign
- Rules screen appearing
- Start button to play the game
- 60 seconds timer
- Use a cauldron that moves from side to side using arrows keys (left/right) on x basis to pick items
- The items are "falling" from top to bottom of the screen
- 9 items ;
  3 "bad"; take one life when touch,
  3 "good"; give 1 point,
  3 "neutral"; take 1 point
- At 15 points you get a favorable horoscope
- Time speed after 10sec
- Replay button after game over

# Backlog Functionalities

- differents level in which level different topics
- quizz before horsocope
- complete horoscope

# Technologies used

-HTML, CSS, Javascript and DOM Manipulation

# States

- Titlte screen
- Start screen with zodiac sign to select
- Rules screen with start button
- Game screen
- Game over screen with replay button

# Proyect Structure

- index.js
  Variables storage
  DOM
  Functions and game loop
- cauldron.js
  For the cauldron functionality
- items.js
  For all items functionalities
- horoscope-data.js
  To store the horoscope regarding to each sign

- Inside each file you can list the functions, clases, properties and methods of your code.

Example:

## main.js

- function setTimer()
- function showScreen(selectedScreen)
- function startGame()
- function replay()
- function newItems()
- function collisionItems()
- function checkItemCollision(randomItem, cauldron)
- function gameOver(hasWon)
- function showHoroscope(sign, hasWon)
- function waveTitle(title)

- function playSound(sound)
- function showZodiac()

## cauldron.js

class Cauldron {

- this.width;
- this.height;
- this.x;
- this.y;

- this.node.style.position;
- this.node.style.top;
- this.node.style.left;
- this.node.style.width;
- this.node.style.height;
- this.move;
- this.caught;

- rightMove()
- leftMove()
- zoneMove()
  }

## items.js

class Items {

- this.width;
- this.height;
- this.x;
- this.y;

- this.node.style.position;
- this.node.style.top;
- this.node.style.left;
- this.node.style.width;
- this.node.style.height;
- this.move;
- this.randomizeItems();
- this.caught;

- randomizeItems()
- itemMovement()
  }

# Extra Links

### Sketch

[Link](https://excalidraw.com/#json=YJ44HDZyWdAfBc5-LNWoV,H7mrJka8XUC9KnpBY8NwKQ)

### Slides

[Link](https://www.canva.com/design/DAG_5CPi8MY/PxYEQQTm_lXLhgpqWllsLA/edit?utm_content=DAG_5CPi8MY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Deploy

[Link](https://abenedicti.github.io/snack-your-fate/)
