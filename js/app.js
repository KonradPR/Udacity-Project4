// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 100;
    this.y = 100;
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x>=505) {
      this.x = -this.width;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.width = 80;
Enemy.prototype.height = 64;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 205;
  this.y = 410;
  this.speed = 120;
  this.direction = 'none'
  this.width = 65;
  this.height = 80;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
  if (this.direction==='left'&&this.x>=-15) {
      this.x-=this.speed*dt;
  } else if (this.direction==='right'&&this.x<=505-88) {
      this.x+=this.speed*dt;
  } else if (this.direction==='up'&&this.y>=0) {
      this.y-=this.speed*dt;
  } else if (this.direction==='down'&&this.y<=606-201) {
      this.y+=this.speed*dt;
  }

  allEnemies.forEach(item => {
    if(((this.x>=item.x&&this.x<=item.x+item.width)||
    (this.x+this.width>=item.x&&this.x+this.width<=item.x+item.width))&&
    ((this.y<=item.y&&this.y>=item.y-item.height)||
    (this.y-this.height<=item.y&&this.y-this.height>=item.y-item.height)||
    (this.y-(this.height/2)<=item.y&&this.y-(this.height/2)>=item.y-item.height))) {
      this.x = 205;
      this.y = 410;
    }
  });

  if (this.y<=0) {
    this.x = 205;
    this.y = 410;
  };
};

Player.prototype.handleInput = function(key) {

  if (key==='left') {
      this.direction = 'left'
  } else if (key==='right') {
      this.direction = 'right'
  } else if (key==='up') {
      this.direction = 'up'
  } else if (key==='down') {
      this.direction = 'down'
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = []
allEnemies[0] = new Enemy();
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
