// Enemies our player must avoid
const Enemy = function(x,y,speed) {
    
    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Multiplies the speed by the dt parameter on the x axis
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

// Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    };
 // Checks for collisions between the player and the enemies 
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
let Player = function (x, y, speed) { 
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {

    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
    
    if (this.y <= 0) {
        alert("You won!");
        this.resetPlayer();
    }

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// All enemies are placed in an array
let allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
let enemyLocation = [60, 140, 220];

// The starting location of the player is located at x=200, y=405
let player = new Player(202, 405,0);

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 512);
    allEnemies.push(enemy);
});


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
