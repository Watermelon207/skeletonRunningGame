var PLAY = 1;
var END = 0;
var gameState = PLAY;
var skeleton, skeleton_Running;
var ground, invisibleGround, groundImage, backgroundPicture, backgroundImg;

var obstaclesGroup, obstacle, obstacleImage

var score =  0


function preload(){
    skeleton_Running = loadAnimation("tile000.jpg","tile001.jpg","tile002.jpg","tile003.jpg","tile004.jpg","tile005.jpg","tile006.jpg","tile007.jpg")
    obstacleImage = loadImage("obstacle1.jpg");
    backgroundImg = loadImage("Background.png")
}

function setup() {
    createCanvas(1200, 800);

    skeleton= createSprite(100,690,100,20);
    skeleton.addAnimation("skeletonRunning",skeleton_Running);


    
    skeleton.scale = 0.3;

    ground = createSprite(100,795,1200,20);
    ground.x = ground.width /2;
    
 
}

function draw() {

  background(backgroundImg);
  

 
  
  text("Score: "+ score, 1100,50);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    spawnObstacles();

    //scoring
    score = score + Math.round(frameCount/60);


    if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")){
          skeleton.velocityY = -12;
      }
      
      //add gravity
      skeleton.velocityY = skeleton.velocityY + 0.8

    if(obstaclesGroup.isTouching(skeleton)){
        gameState = END;
    }

    
  }
   else if (gameState === END) {
     console.log("hey");
      ground.velocityX = 0;
     skeleton.velocityY = 0
     
     

  
  }
  drawSprites();
}

      
 
  function spawnObstacles(){

    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,165,10,40);
      obstacle.velocityX = -6;
       
      obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
