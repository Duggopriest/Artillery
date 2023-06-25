var MAP = {
	image: document.createElement("img"),
	targetPos: new Vec(0.0,0.0,0.0),
	crewPos: new Vec(0.001,0.0,0.0),
	distance: 0.0,
};
MAP.image.src = "map.png";



var bubble = document.createElement("img");
bubble.src = "shellScreen.png";

var wood = document.createElement("img");
wood.src = "wood.jpg";


while ( MAP.distance < 1000 || MAP.distance > 1020 || !MAP.distance)
{
	MAP.targetPos.x = getRandomInt(2000) - 1000;
	MAP.targetPos.z = getRandomInt(2000) - 1000;
	MAP.distance = Math.sqrt( ( MAP.targetPos.x * MAP.targetPos.x ) + (MAP.targetPos.z * MAP.targetPos.z ) );
}

// MAP.targetPos.x;
// MAP.targetPos.z;
console.log("crew pos: ");
console.log(MAP.crewPos);
console.log("target pos: ");
console.log(MAP.targetPos);
console.log("distance :" + MAP.distance);

// var xb = MAP.targetPos.x;
// var xa = MAP.crewPos.x;
// var zb = MAP.targetPos.z;
// var za = MAP.crewPos.z;
// // arccos[(xa xb + za zb) / (√(xa² + za²) × √(xb² + zb²))]
// //        |-----a-------|   |-----b-----|   |----c-----|
// var a = xa * xb + za * zb;
// var b = Math.sqrt(xa * xa + za * za);
// var c = Math.sqrt(xb * xb + zb * zb);

var pridictedAngle;

if (MAP.targetPos.x > 0)
	pridictedAngle = Math.atan(MAP.targetPos.z / MAP.targetPos.x) * 180 / Math.PI;
else if (MAP.targetPos.z < 0)
	pridictedAngle = (Math.atan(-MAP.targetPos.z / -MAP.targetPos.x) * 180 / Math.PI) + 180;
else
	pridictedAngle = (Math.atan(-MAP.targetPos.x / MAP.targetPos.z) * 180 / Math.PI) + 90;

console.log("predicted angle: " +  pridictedAngle );
document.getElementById("Hangle").defaultValue = pridictedAngle;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

function drawMap()
{
	context.drawImage(MAP.image, 0, 1000, 1900, 1900);
	context.drawImage(wood, 0, 1000, 1900, 100);

	var x = 950 + MAP.targetPos.x * 0.6;
	var y = 1950 + MAP.targetPos.z * 0.6;

	context.drawImage(bubble, x, y, 100, 100);
	context.drawImage(TargetPng, x - 20, y + 70, 50, 50);
	context.fillText( "x:" + Math.floor( MAP.targetPos.x ), x + 20, y + 47);
	context.fillText("y:" + Math.floor( MAP.targetPos.z ), x + 20, y + 67);

	x = 950 + SHELL.mapPos.x * 0.6;
	y = 1950 + SHELL.mapPos.z * 0.6;

	context.drawImage(bubble, x, y, 100, 100);
	
	context.font = "20px Arial";
	context.fillText("x:" + Math.floor(SHELL.mapPos.x), x + 20, y + 47);
	context.fillText("y:" + Math.floor(SHELL.mapPos.z), x + 20, y + 67);
}

