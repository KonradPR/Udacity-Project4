#Arcade Game Clone

##Table of contents

* [Introduction](#introduction)
* [Enemy Object](#enemy-object)
* [Player Obejct](#player-object)


## Introduction

This is a clone of a simple arcade game the goal of which is for player's
character to reach the top end of the map while avoiding hitting Enemies

## Enemy object
Enemy object is a JS object used to represent on screen enemies. One instance
of object represents one enemy. The constructor takes in two paramters, in order:
xCord - sets x coordinate of the Enemy
yCord - sets y coordinate of the Enemy
Object has listed methods:
.update(dt) - takes in dt which is delt of time between game ticks, this method
updates the position of object
.render() - draws the enemy on screen
Each instance of Enemy object has it own version of two properties:
.x - the x coordinate of the object
.y - the y coordinate of the object
There are also properties of the object's prototype that are shared by all
instances of the Enemy object that are listed below:
.sprite - image that is drawn on screen to represent object
.speed - changes how fast the object moves
.width - objects width
.height - objects height

## Player object
Player object is a JS object used to represent player's character.
The object's constructor takes in no paramters.
Object has listed properties:
.sprite - image that is drawn on screen to represent object
.speed - changes how fast the object moves
.width - objects width
.height - objects height
.x - the x coordinate of the object
.y - the y coordinate of the object
.direction - the direction in which the player is moving
Object has listed methods:
.update(dt) - takes in dt which is delt of time between game ticks, this method
updates the position of object it also calls checkWin and checkCollision methods
in order to monitor the state of the game
.render() - draws the player on screen
.reset() - sets plyer's position to the starting one
.checkCollision() - checks if player has colided witch an enemy and if this
ocours calls the reset method
.checkWin() - checks if player has reached the top of tha map and if this ocours
calls the reset method
.handleInput(key) - sets the direction in which the player is moving based
on direction that is given 
