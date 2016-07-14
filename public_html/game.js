// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
document.body.appendChild(canvas);

document.body.style.overflow = "hidden";
window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
    reset();
}



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/sky.svg";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "img/monster.png";

// Pineapple image
var pineappleReady = false;
var pineappleImage = new Image();
pineappleImage.onload = function () {
	pineappleReady = true;
};
pineappleImage.src = "img/pineapple.png";

// Game objects
var monster = {
	speed: 256 
};
var pineapple = {};
var pineapplesEaten = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var reset = function () {
	monster.x = canvas.width / 2;
	monster.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	pineapple.x = 32 + (Math.random() * (canvas.width - 64));
	pineapple.y = 32 + (Math.random() * (canvas.height - 64));
};


var update = function (modifier) {
	if (38 in keysDown) { //up
		monster.y -= monster.speed * modifier;
	}
	if (40 in keysDown) { //down
		monster.y += monster.speed * modifier;
	}
	if (37 in keysDown) { //left
		monster.x -= monster.speed * modifier;
	}
	if (39 in keysDown) { //right
		monster.x += monster.speed * modifier;
	}

	if (
		monster.x <= (pineapple.x + 32)
		&& pineapple.x <= (monster.x + 32)
		&& monster.y <= (pineapple.y + 32)
		&& pineapple.y <= (monster.y + 32)
	) {
		++pineapplesEaten;
		reset();
	}
        
        if(monster.x < 0){
            monster.x = canvas.width;
        }else if(monster.x > canvas.width){
            monster.x = 0;
        }else if(monster.y < 0){
            monster.y = canvas.height;
        }else if (monster.y > canvas.height){
            monster.y = 0;
        }
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y, 50, 50);
	}

	if (pineappleReady) {
		ctx.drawImage(pineappleImage, pineapple.x, pineapple.y, 50, 50);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Pineapples Eaten: " + pineapplesEaten, 32, 32);
};


var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
        if(((pineapplesEaten % 5) == 0 ) && pineaplesEaten != 0){
                    ctx.fillStyle = "gray";
                    ctx.font = "100px Helvetica";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("Level Up!", canvas.width/2, canvas.height/2);
                }
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();