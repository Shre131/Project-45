var track,track2;
var player;
var bg, bgImage;
var gameOverImage;
var gameState="START";
var obstacle1Group,obstacle2Group;
var playerImage;
var playerleftImage;
var score=0;
var obstacleRightImage,obstacleImage;
var invisImage,invis;
var skipImage, skip;
var insImage;
var pb,pbImage;



function preload() {
  bgImage=loadImage("Background.jpg");
  gameOverImage=loadImage("Game Over.jpg");
playerImage=loadAnimation("Bird_Image_1.png", "Bird_Image_2.png", "Bird_Image_3.png", "Bird_Image_4.png");
playerleftImage=loadAnimation("leftbird_1.png","leftbird_2.png","leftbird_3.png","leftbird_4.png");
obstacleRightImage=loadImage("Obstacle 1.PNG");
obstacleImage=loadImage("Obstacle_2.png");
invisImage=loadImage("Invis.png");
insImage=loadImage("start.PNG");
pbImage=loadImage("Pb.png");


}


function setup() {
  createCanvas(500,displayHeight-105);
  bg=createSprite(250,(displayHeight-105)/2,20,20);
  
  bg.scale=2.25;

   track=createSprite(150,displayHeight/2,10,displayHeight);
   track2=createSprite(350,displayHeight/2,10,displayHeight);
player=createSprite(200,500,20,20);
player.shapeColor="cyan";
player.addAnimation("bird",playerImage);
player.addAnimation("left",playerleftImage);
player.scale=0.2;
player.setCollider("circle",0,0,50);



obstacle1Group=new Group();
obstacle2Group=new Group();
invis=createSprite(390,displayHeight/2+200,50,50);
invis.addImage(invisImage);
invis.scale=0.1;
skip=createSprite(420,displayHeight/2+200,50,50);



}

function draw() {
  background("red");  


if(gameState==="START"){
  if(keyDown("space")) {
   
startImage=createSprite(250,(displayHeight-105)/2,500,displayHeight-105);
startImage.addImage(insImage);
startImage.display();
    player.x=155;
    gameState="PLAY";
    
   
  }
}

if(gameState==="PLAY"){
  startImage.destroy();
  bg.addImage( "clouds",bgImage);

spawnLeftObstacles();
spawnRightObstacles();

score=Math.round(frameCount/20);


if(player.isTouching(track) && keyDown("RIGHT_ARROW")){
player.x=345;
}



if(player.isTouching(track)){
  player.changeAnimation("bird",playerImage);
 // console.log("leftTrack");
}

if(player.isTouching(track2)){
  player.changeAnimation("left",playerleftImage);
  //console.log("rightTrack");
}

if(player.isTouching(track2) && keyDown("LEFT_ARROW")){
  player.x=155;
  }


  if(player.isTouching(obstacle1Group)|| player.isTouching(obstacle2Group)){
    gameState="END";
 
  }

  if(mousePressedOver(invis)){
    obstacle1Group.destroyEach();
    obstacle2Group.destroyEach();
    invis.destroy();
  }

  if(mousePressedOver(skip)){
    for(var i=0;i<obstacle1Group.length;i++){
      obstacle1Group.get(i).y=600;
    }
    for(var k=0;k<obstacle2Group.length;k++){
      obstacle2Group.get(k).y=600;
    }
    skip.destroy();
  }
  
  drawSprites();
fill("#ff0011");
textSize(20);
textFont("Courier New");
textStyle(BOLD);
  text("Score: "+score,30,30);


  if(score===100){
    gameState="LEVEL 2";
  }
    
}


if(gameState==="END"){
  drawSprites();
  bg.addImage("clouds",gameOverImage);
  bg.scale=1.25;
  //text("Game Over",250,displayHeight/2);
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  track.destroy();
  track2.destroy();
  player.destroy();

}

if(gameState==="LEVEL 2"){
  
}
  
}



function spawnLeftObstacles(){
  if(frameCount%229===0){
    var obstacle=createSprite(170,0,20,20);
    obstacle.addImage("obLeft",obstacleRightImage);
    obstacle.scale=0.05;
    obstacle.velocityY=2;
    obstacle.shapeColor="white";
    obstacle1Group.add(obstacle);
    

    obstacle.setCollider("circle",-90,0,30);

  }
}


function spawnRightObstacles(){
  if(frameCount%279===0){
    var obstacleRight=createSprite(330,0,20,20);
    obstacleRight.addAnimation("obRight",obstacleImage);
    obstacleRight.scale=0.1;
    obstacleRight.velocityY=2;
    obstacleRight.shapeColor="black";

    obstacleRight.setCollider("circle", 50,0,30);

  obstacle2Group.add(obstacleRight);
  }
}

// Level 1: 229, 279
// Level 2: 
