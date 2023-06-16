var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
document.getElementById("angle").defaultValue = "45";

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var	time = 0;
var deltaTime = 0;
var gravity = -9.80665;
var STATE_GAME = 0;

var splashTimer = .5;


var SHELL = {
	image: document.createElement("img"),
	pos: new Vec(0.0,0.0,0.0),
	acc: new Vec(),
	angle: 90,
	speed: 100.0,
	width: 50,
	height: 50,
	fired: false
};
SHELL.image.src = "Shell.png";

var Cannon = document.createElement("img");
Cannon.src = "Cannon.png";

var Grass = document.createElement("img");
Grass.src = "Grass.png";

var Tree = document.createElement("img");
Tree.src = "trees.png";

var Mountans = document.createElement("img");
Mountans.src = "mountans.png";

var Stars = document.createElement("img");
Stars.src = "stars.jpg";

var TargetPng = document.createElement("img");
TargetPng.src = "WA_80_cm_archery_target.svg.png";

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    if (deltaTime > 1.0)
    {
        deltaTime = 1.0;
    }
    return deltaTime;
}  

function calBullet(deltaTime, time)
{
	// var point = SHELL.pos.add( SHELL.acc.multiply(SHELL.speed * time * 0.03 ) );
	
	// var VecDown = new Vec(0.0, -1.0);
	// var gravityVec = VecDown.multiply(gravity * time * time);

	// SHELL.pos = point.add(gravityVec);

	// SHELL.pos.x = SHELL.acc.x * time;
	// SHELL.pos.y = SHELL.acc.y + (gravity * time);

	SHELL.pos.x = SHELL.acc.x * time;
	SHELL.pos.y = SHELL.acc.y * time + gravity / 2 * time * time;
}

function drawScene()
{
	for (var i = -600; i < canvas.width + 600; i += 600)
	{
		for (var j = -600; j < 1000; j += 600)
		{
			context.drawImage(Stars, -(SHELL.pos.x / 5 % 600) + i, (SHELL.pos.y % 600) + j, 600, 600);
		}
	}
	for (var i = -1921; i < canvas.width + 1921; i += 1921)
	{
		context.drawImage(Mountans, -(SHELL.pos.x * 50 % 1921) + i, SHELL.pos.y * 2 + 400, 1921, 500);
	}
	for (var i = -1500; i < canvas.width + 1500; i += 1500)
	{
		context.drawImage(Tree, -(SHELL.pos.x * 100 % 1500) + i, SHELL.pos.y * 5 + 610, 1500, 300);
	}
	for (var i = -150; i < canvas.width + 150; i += 150)
	{
		context.drawImage(Grass, -(SHELL.pos.x * 150 % 150) + i, SHELL.pos.y * 5 + 890, 150, 150);
	}context.drawImage(TargetPng, (1020 * 50 - SHELL.pos.x * 50) + 610, 890, 100,100);
	
	
	// draw bullet
	if (SHELL.fired)
	{
		context.drawImage(SHELL.image, 600, (SHELL.pos.y > 500 ? 400 : (-SHELL.pos.y + 900)), 50, 50);
	}
	else
	{
		//context.scale(-1,1);
		context.drawImage(Cannon, 500, SHELL.pos.y + 850, -271, 81);
    
    	// always clean up -- reset transformations to default
    	context.setTransform(1,0,0,1,0,0);
	}
}

function runSplash(deltaTime)
    {
        splashTimer -= deltaTime;
        if(splashTimer <= 0)
        {
            STATE_GAME = 1;
            return;
        }
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";

		context.font="30px Arial";
		context.fillText("Artillery Sim", 10, 30);
		
        context.font="14px Arial";
        context.fillText("By Jaymie Gobbett", 10, 60);
}

var startFire = 0;
function getTime()
{
    return (Date.now()  * 0.001) - startFire;
}

var s = true;
function runGame(deltaTime)
{
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

	drawScene();

	
	if (SHELL.fired && (SHELL.pos.y > -1 || startFire < 1))
	
		calBullet(deltaTime, getTime());
	else if (SHELL.fired && SHELL.pos.y <= -1 && s)
	{
		console.log(SHELL.pos);
		console.log("time = " + getTime());
		s = false;
	}
	
}

function runGameOver(deltaTime)
{
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#ffffff";
	context.font="14px Arial";

	context.fillText("By Jaymie Gobbett", 300, 400);
}

function run() {
    deltaTime = getDeltaTime();

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
	

	switch(STATE_GAME)
	{
		case 0:
		runSplash(deltaTime);
		break;
		case 1:
		runGame(deltaTime);
		break;
		case 2:
		runGameOver(deltaTime);
		break;
	}
}

function fireGun()
{
	SHELL.pos = new Vec();
	SHELL.fired = true;
						SHELL.angle = document.getElementById("angle").value;
									console.log("Shell angle:" + SHELL.angle);

												SHELL.acc.x = Math.cos(SHELL.angle * Math.PI / 180) * SHELL.speed;
															SHELL.acc.y = Math.sin(SHELL.angle * Math.PI / 180) * SHELL.speed;

																		var range = 2 * SHELL.acc.x * SHELL.acc.y / -gravity;
																					console.log("predicted distance = " + range);

																								console.log(SHELL.acc);

																											startFire = Date.now()  * 0.001;
																													
}

//===========================================DO NOT EDIT BELOW THIS LINE =================================================
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozrequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.mozRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
