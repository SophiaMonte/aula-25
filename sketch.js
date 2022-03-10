const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonball, barco;

var boladecanhao = [];
var barcos = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angleMode(DEGREES)
  cannon = new Cannon (180, 110, 130, 100, angle);
  angle = 15;

}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  cannon.display();
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  for (var i = 0; i<boladecanhao.length; i = i+1){
    showCannonBall(boladecanhao[i]);
  }
  showBarcos()

}

function keyPressed(){
  if (keyCode === 32 ){
    cannonball = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setAngle(cannonball.body, cannon.angle);
    boladecanhao.push(cannonball);
  }
}

function showCannonBall(ball){
  if (ball){
    ball.display();
  }
}

function keyReleased(){
  if(keyCode === 32){
    boladecanhao[boladecanhao.length - 1].shoot();
  }
}

function showBarcos(){
  if (barcos.length > 0 ){
    if(barcos[barcos.length -1] === undefined || barcos[barcos.length -1].body.position.x < width - 300){
      var positions = [-45, -62, -20, -70];
      var position = random(positions);
      barco = new Barco (width, height - 60, 170, 170, position);
      barcos.push (barco);
    }
    for (var i = 0; i < barcos.length; i++){
      if(barcos[i]){
        Matter.Body.setVelocity(barcos[i].body, {x: - 0.8, y: 0});
        barcos[i].display();
      }
    }
  } else {
    barco = new Barco (width, height - 60, 170, 170, -80);
    barcos.push (barco);   
  }
}