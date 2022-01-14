var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,250);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  
}

function draw() {
  background(0);
  if(gameState == "play"){
 
  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;  

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;

}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
  gameState= "end";
}
  spawnDoors();

 drawSprites();
  }
  if(gameState == "end"){
    fill("silver");
    textSize(30)
    text("GAME OVER",220,300);
    
  }

}



function spawnDoors(){
if(frameCount%240==0){


var door = createSprite(400,-50);
door.velocityY = 1;
door.addImage(doorImg);
door.x = Math.round(random(120,400));
door.lifetime = 800;
ghost.depth = door.depth;
ghost.depth += 1

doorsGroup.add(door);

var climber = createSprite(400,10);
climber.velocityY = 1;
climber.addImage(climberImg);
climber.x = door.x;
climber.lifetime = 800;
climbersGroup.add(climber);

var invisibleBlock = createSprite(400,20);
invisibleBlock.velocityY = 1;
invisibleBlock.x = door.x;
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.debug = true;
invisibleBlock.visible = false;
invisibleBlock.lifetime = 800;
invisibleBlockGroup.add(invisibleBlock);



}
}