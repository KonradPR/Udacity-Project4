// Enemies our player must avoid:
//Paramters: xCord, setes x coordinate of the Enemy
//yCord stes y coordinate of the Enemy
var Enemy = function(xCord, yCord) {
  this.x = xCord;
  this.y = yCord;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x >= 505) {
    this.x = -this.width;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Those variables are used for colision detection and enemy movement
Enemy.prototype.width = 80;
Enemy.prototype.height = 64;
Enemy.prototype.speed = 80;
Enemy.prototype.sprite = 'images/enemy-bug.png';

//Player object is used to represent player on screen
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 205;
  this.y = 410;
  this.speed = 120;
  this.direction = 'none'
  this.width = 65;
  this.height = 80;
};

//Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Resets player position to the starting one
Player.prototype.reset = function() {
  this.x = 205;
  this.y = 410;
};

//Checks collision between player and enemies
//and if it ocours resets player's position
Player.prototype.checkCollision = function() {
  allEnemies.forEach(item => {
    if (((this.x >= item.x && this.x <= item.x + item.width) ||
        (this.x + this.width >= item.x && this.x + this.width <= item.x + item.width)) &&
      ((this.y <= item.y && this.y >= item.y - item.height) ||
        (this.y - this.height <= item.y && this.y - this.height >= item.y - item.height) ||
        (this.y - (this.height / 2) <= item.y && this.y - (this.height / 2) >= item.y - item.height))) {
      this.reset();
    }
  });
};

//Checks if player has reached the top end of the map
//and if it ocours resets player position
Player.prototype.checkWin = function() {
  if (this.y <= 0) {
    this.reset();
  };
};

//Update plyer's position, required mtehod for game
//Parameter:dt,time dleta between game ticks
//this method also calls checkCollision
//and checkWin methods
Player.prototype.update = function(dt) {
  if (this.direction === 'left' && this.x >= -15) {
    this.x -= this.speed * dt;
  } else if (this.direction === 'right' && this.x <= 505 - 88) {
    this.x += this.speed * dt;
  } else if (this.direction === 'up' && this.y >= 0) {
    this.y -= this.speed * dt;
  } else if (this.direction === 'down' && this.y <= 606 - 201) {
    this.y += this.speed * dt;
  }

  this.checkCollision();

  this.checkWin();
};

//This method sets the direction in which player is moving
//based on key input
Player.prototype.handleInput = function(key) {

  if (key === 'left') {
    this.direction = 'left'
  } else if (key === 'right') {
    this.direction = 'right'
  } else if (key === 'up') {
    this.direction = 'up'
  } else if (key === 'down') {
    this.direction = 'down'
  }
};

//Creation of game objects Enemies are stored in allEnemies Array
//contents of the array are created using an IIFE
const allEnemies = (function() {
  const arr = [];
  let x, y;
  for (let i = 0; i < 6; i++) {
    x = 100 * i;
    y = 50 * i;
    arr[i] = new Enemy(x, y);
  }
  return arr;
}());
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
