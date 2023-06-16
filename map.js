var MAP = {
	image: document.createElement("img"),
	targetPos: new Vec(500.0,0.0,500.0),
	crewPos: new Vec(500.0,0.0,500.0),
	distance: 0.0,
};
MAP.image.src = "map.png";

var wood = document.createElement("img");
wood.src = "wood.jpg";


while ( MAP.distance > 100 && MAP.distance < 1000 )
{
	MAP.targetPos.x = getRandomInt(2000) - 1000;
	MAP.targetPos.z = getRandomInt(2000) - 1000;
	MAP.distance = Math.sqrt( (MAP.crewPos.x - MAP.targetPos.x * MAP.crewPos.x - MAP.targetPos.x ) + (MAP.crewPos.z - MAP.targetPos.z * MAP.crewPos.z - MAP.targetPos.z ) );
	console.log(MAP.distance);
}


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }



function drawMap()
{
	context.drawImage(MAP.image, 0, 1000, 1900, 1900);
	context.drawImage(wood, 0, 1000, 1900, 100);

	var x = 950 + SHELL.pos.x * 0.9;
	var y = 1950 + SHELL.pos.z * 0.9;

	context.translate( x, y );
	context.rotate(-SHELL.mapAngle);
	context.drawImage(SHELL.image, 0, 0, 25, 25);
	context.rotate(SHELL.mapAngle);
	context.translate( -x, -y );
}

