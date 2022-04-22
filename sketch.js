var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpmp3;
var diemp3;
var checkPointmp3;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpmp3 = loadSound("jump.mp3")
  diemp3 = loadSound("die.mp3")
  checkPointmp3 = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,windowHeight-90,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(windowWidth/2,windowHeight-100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,windowHeight/2+50);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(windowWidth/2,displayHeight-200,windowWidth,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  trex.setCollider("circle",0,0,40);
  trex.debug = false
  
  score = 0;
  
}

function draw() {
  
  background("white");
 
  text("Puntuación: "+ score, 500,50);
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -4;
    
    score = score + Math.round(getFrameRate()/60);
    if(score%100==0&&score){//aqui nos quedamos
    checkPointmp3.play();
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& trex.y >= windowHeight-150) {
        trex.velocityY = -12;
        jumpmp3.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    spawnClouds();
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        diemp3.play();
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      trex.changeAnimation("collided", trex_collided);
      
     obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
    
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   if (mousePressedOver(restart)){
   reinicio();
  }
   }
 
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(windowWidth-100,windowHeight-115,10,40);
   obstacle.velocityX = -6;  
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }       
    obstacle.scale = 0.5;
    obstacle.lifetime = windowWidth/obstacle.velocityX;
    obstaclesGroup.add(obstacle);
 }
}
function spawnClouds() {
 
  if (frameCount % 120 === 0) {
     cloud = createSprite(windowWidth-100,windowHeight-windowHeight+50,40,10);
    cloud.y = Math.round(random(50,windowHeight/2));
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;
    
    cloud.lifetime =windowWidth/cloud.velocityX ;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}
  function reinicio(){
  gameState=PLAY
  score=0
  console.log("hola")
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);

}