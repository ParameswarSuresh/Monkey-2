
var monkey , monkey_running
var ground;
var backgr, backgrImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var score=0;
var death = 0;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
 backgrImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(400, 400)



  backgr=createSprite(200, 200);
  backgr.addImage(backgrImage);
  backgr.velocityX=-3;
  backgr.x=backgr.width / 2;

  monkey=createSprite(50, 330, 30, 30);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  
 

  ground =createSprite(200, 364, 900, 10);
  ground.velocityX=-7;
  ground.x=ground.width/2;
  ground.visible=false
 
  
 
  foodGroup=new Group();
  obstacleGroup=new Group();
  
}


function draw() {
background("lightgreen");
  
  monkey.collide(ground);
  if(gameState===PLAY){
  if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY=-12
  }
  
  if(ground.x < 0){
    ground.x=ground.width /2;
  }
  if(backgr.x < 0){
    backgr.x=backgr.width /2;
  }
 
   
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
  obstaclefunc();

  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2;
    monkey.scale = 0.14 ;
  }
  
   if(obstacleGroup.isTouching(monkey) && death === 0){
    death = death + 1;
    obstacleGroup.destroyEach();
    monkey.scale = 0.1
   }
   if(obstacleGroup.isTouching(monkey) && death === 1){
      death = death + 1;
      gameState = END
    }

  }
   if(gameState===END){
   monkey.destroy();
   obstacleGroup.destroyEach();
   score = 0;
   death = 0;
   foodGroup.destroyEach();
   foodGroup.setVelocityEach(0);
 obstacleGroup.setVelocityEach(0);   
   backgr.destroy();
   stroke("red")
   fill("red");
  textSize(50);
  text("Game Over", 100, 200)
 }
  drawSprites();
  stroke("white");
  textSize(15);
  fill("white");
  text("Score :"+ score, 300, 50);

  stroke("White");
  fill("white");
  textSize(15);
  text("death :"+ death, 150, 50);
}
function food(){
  if(World.frameCount%80===0){
    banana=createSprite(700, 600, 30, 30);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120, 285));
    banana.velocityX=-7;
    banana.lifetime=200;
    foodGroup.add(banana);
  }
}
function obstaclefunc(){
  if(World.frameCount%300===0){
    obstacle=createSprite(700, 390, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.4;
    obstacle.debug=false;
    obstacle.velocityX=-5; 
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0,220, 350);

  }
}
function reset(){
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.xPosition=50;
  monkey.yPosition=330;
  survivaltime=0;
  score=0;
}



