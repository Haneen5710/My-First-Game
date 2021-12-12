var towerImg, tower;
var venomImg, venom, venomsGroup;
var superman, supermanImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
  towerImg = loadImage("tower copy.png"); 
  venomImg = loadImage("venom.png");
  supermanImg = loadImage("superman.png");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  venomsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  superman = createSprite(200,200,50,50);
  superman.scale = 0.1;
  superman.addImage("superman", supermanImg);
}


function draw() {
  background(255);
 
  
  if (gameState === "play") {
    
    if(keyDown("left")){

        superman.x = superman.x - 3;

      
    }
    if(keyDown("right")){
  
          superman.x = superman.x + 3;

      
    }
    if(keyDown("space")){
  
         superman.velocityY = -10;

      
    }
  
  superman.velocityY = superman.velocityY + 0.8;
  
   
      
      if(tower.y > 400){
        tower.y = 300
      } 
      spawnVenoms();

  

     if(venomsGroup.isTouching(superman)){
      superman.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(superman) || superman.y > 600){
        superman.destroy();
      gameState = "end";
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
  }
}

function spawnVenoms()
 {
  
  if (frameCount % 240 === 0) {
    var venom = createSprite(200,10);
    venom.scale = 0.5;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = venom.width;
    invisibleBlock.height = 2;
    
    venom.x = Math.round(random(120,400)); 
    invisibleBlock.x = venom.x;
    
    venom.addImage(venomImg);
    
    venom.velocityY = 1;
    invisibleBlock.velocityY = 1;

       
    superman.depth = venom.depth;
    superman.depth +=1;
    
   

    venom.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    
     venomsGroup.add(venom);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}