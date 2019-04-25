let horizonte;
let veloO;
let DinoImgArre2 = []
const DinoImgArre = []
let DinoImg
let score
let scoreFinal
let obstaculos = []
let Aves = []
let cactus
let Dino
let ground
let Ave
let size
const parallaxBg = []
function preload(){
	ground = loadImage('image/Ground.png')
	cactus = loadImage('image/Cactus.png')
	Ave = loadImage('image/Ave2.png')
}

function setup() {
	size = 30
  	createCanvas(windowWidth, windowHeight);

	for(let i = 0; i < 2; i++){
		parallaxBg.push(new parallaxs(ground, i*width, height -100, width, 100))
	}
 	textAlign(CENTER);

  	horizonte = height - 40;
	score = 0
	scoreFinal = 0
	veloO = 6;

	for(let i = 1 ; i < 5; i++){
		DinoImg = loadImage(`image/Dino${i}.png`) 
		DinoImgArre2.push(DinoImg)
	}
	
  textSize(20);

	Dino = new dino(DinoImgArre2, size * 2, height - horizonte, 60, 60);
	DinoImgArre.push(Dino)
}

function draw() {

  	background('#40cac9')
	drawPaisajeScore()
	manejaNivel(frameCount)
	Dino.update(horizonte)
	movimiento()
	pintaObs()

}

function drawPaisajeScore() {

	for(let p of parallaxBg){
		p.draw()
		p.move()
	}

  	text("Score: " + score, width * .5, 30);

	for(let p of DinoImgArre){
		p.draw();
	}
	
}
function pintaObs(){
	for(let ob of obstaculos){
		ob.update(veloO)
		ob.draw()
		if (ob.hit(Dino)){
			finDelJuego()
			scoreFinal == score
		}
	}

	for(let v of Aves){
		v.update(veloO)
		v.draw()
		if (v.hit(Dino)) 
			finDelJuego()
		}
	}

function manejaNivel(n) {

  if (n % 70 == 0) { 
    var n = random(n)
    if (n > 2){
      creaNuevoObstaculo()
  	}
	  if (n % 120 == 0)
	  {
	    veloO *= 1
		}
  }
	score++
}

function creaNuevoObstaculo() {

	let size = random(30) + 20;
	let sizeD = random(150, 200)
  	let obs = new obstaculo(cactus, width + size, horizonte - 80, 90, 80, size)
  	let obsUp = new volador(Ave, width - 200, horizonte - sizeD, 90, 40, size)
  	obstaculos.push(obs);

  	if (score >= 700){
  		Aves.push(obsUp)
  	}

  	console.log("score"+score)
}

function movimiento() {

		if (keyIsDown(32) && Dino.tierra)
			Dino.jump(.35)		
}

function finDelJuego() {

	noLoop();
  	noStroke();
  	textSize(80);
  	text("G A M E  O V E R", width * .5, height * .5);

}