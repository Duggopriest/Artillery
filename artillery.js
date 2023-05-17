var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var STATE_GAME = 1;

var SHELL = {
	image: document.createElement("img"),
	x: 500,
	y: 500,
	width: 50,
	height: 50,
	fired: false
};
SHELL.image.src = "Shell.png";

var Cannon = document.createElement("img");
Cannon.src = "Cannon.png";

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    if (deltaTime > 1)
    {
        deltaTime = 1;
    }
    return deltaTime;
}  

function drawScene()
{
	// draw bullet
	//if (SHELL.fired)
		context.drawImage(SHELL.image, 50, 50, 50, 50);
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
        context.font="14px Arial";


        context.fillText("By Jaymie Gobbett", 300, 400);
}

function runGame(deltaTime)
{
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

	deltaTime++;
	drawScene();
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
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var deltaTime = getDeltaTime();

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