const W_WIDTH = 150
const W_HEIGHT = 150
const training_points = 1000

const RANGE = 45;
const TOL = 0.85;

const type1 = { x: W_WIDTH / 2, y: W_HEIGHT / 2 };
const type2 = { x: -W_WIDTH / 2, y: -W_HEIGHT / 2 };

let canvas 
let ann 
let pointsAux = []

let count = 0
let n_c1 = 0
let n_c2 = 0

function setup() {
	canvas = createCanvas(W_WIDTH *2, W_HEIGHT *2);
	frameRate(2)

	ann = new ANN(2, 4, 2, 0.5)
}

function draw() {
	background("#FFF");

	//lines
	push()
  	stroke(200);
  	line(W_WIDTH, 0, W_WIDTH, W_HEIGHT * 2);
  	line(0, W_HEIGHT, W_WIDTH * 2, W_HEIGHT);
  	pop()


	//circle ranges
	push()
  	translate(W_WIDTH, W_HEIGHT)
  	scale(1, -1)
  	fill(0, 0, 0, 0)
  	stroke(255, 0, 0)
  	ellipse(type1.x, type1.y, RANGE * 2)
  	stroke(0, 0, 255);
  	ellipse(type2.x, type2.y, RANGE * 2)
  	pop()



	translate(W_WIDTH, W_HEIGHT)
	scale(1,-1)


	//training
	for(let i = 0; i < training_points; i+=2){

		pointsAux[i] = new PointObject(
			randomNumber(type1.x + RANGE, type1.x - RANGE),
			randomNumber(type1.y + RANGE, type1.y - RANGE)
		)
		pointsAux[i+1] = new PointObject(
			randomNumber(type2.x + RANGE, type2.x - RANGE),
			randomNumber(type2.y + RANGE, type2.y - RANGE)
		)
	}

	pointsAux.forEach((p) =>{
		let pointType = Array(2).fill(0)
		if(dist(p.x, p.y, type1.x, type1.y) < RANGE){
			pointType[0] = 1
		}
		if(dist(p.x, p.y, type2.x, type2.y) < RANGE){
			pointType[1] = 1
		}
		ann.train(p.getPosition(), pointType)
		p.type = setType(ann.classify(p.getPosition()))
		p.draw()
	})
	count++
}