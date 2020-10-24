var Play = 1
var End = 0
var score=0
var Level=1
var player
var Gamestate = Play
var alienrunning,groundImage,obstacle1,obstacle2,restart1
var RocksGroup,CoinsGroup,BadgesGroup
var invisibleground
 var diesound   
var pointsound
 function preload(){
  alienrunning = loadAnimation("download (3).png","download (4).png");
  alienout=loadAnimation("download (3).png")
  
  groundImage = loadImage("background.png");
  coinimage= loadImage("ore.png")
  
  coin2image = loadImage("download (5).png")
  
  obstacle1 = loadImage("ice.png");
  obstacle2 = loadImage("rock.png");
  diesound=loadSound("die.mp3")
  pointsound=loadSound("point.wav")
  restart = loadImage("restart123.png")
}

function setup() {
  createCanvas(400, 400);
  
     snow = createSprite(200,150,400,400)
  snow.addImage(groundImage)
  snow.x=snow.width/2
  //snow.y=snow.height/2
   restart1=createSprite(211,200,20,20)
  restart1.addImage(restart)
   player = createSprite(57,321,15,15)
  player.addAnimation("alienrunning",alienrunning)
  player.addAnimation("alienout",alienout)
   invisibleground=createSprite(200,380,400,30)
  invisibleground.visible=false

   RocksGroup = createGroup();
   CoinsGroup = createGroup();
   BadgesGroup = createGroup();
  player.setCollider("rectangle",0,0,40,100)
//player.debug=true

  
  
  
  
  
  
  
  
  
  
  
  
  score = 0;
}

 
  
  function draw() {
background("white")
edges=createEdgeSprites()
 

console.log(player.y)

    





  

if (Gamestate===Play){
  snow.velocityX = -12
  restart1.visible=false
if (snow.x < 0){
        snow.x = snow.width/2;
    }
if((touches.length>0||keyDown("space"))&& player.y >= 280 ){
        player.velocityY = -15 ;
        touches=[]
      }
  
    //add gravity
      player.velocityY = player.velocityY + 0.8;
    spawnRocks();
    spawnCoins();
    spawnBadges();

 if(player.isTouching(RocksGroup)){
  Gamestate=End
  player.changeAnimation("alienout",alienout)

   diesound.play()
 }
console.log(Gamestate)
 
 if(player.isTouching(CoinsGroup)){
  
 CoinsGroup.destroyEach()
 score=score+2
  pointsound.play()
 }
 if(player.isTouching(BadgesGroup)){
  
 BadgesGroup.destroyEach()
 score=score+2
 
 pointsound.play()
 }
  
 
  snow.velocityX=-(18 + 3*score/100);
   Level=score/10
   if(Level==0){
     Level=1
   }
 

  
}
if(Gamestate===End){
  restart1.visible=true
  snow.velocityX = 0
  RocksGroup.setLifetimeEach(-1)
  CoinsGroup.setLifetimeEach(-1)
  BadgesGroup.setLifetimeEach(-1)
  RocksGroup.setVelocityXEach(0)
  CoinsGroup.setVelocityXEach(0)
  BadgesGroup.setVelocityXEach(0)

  player.velocityY = player.velocityY + 0.8;

  if(touches.length>0||mousePressedOver(restart1)){
  Gamestate=Play
  score=0
  CoinsGroup.destroyEach()
  BadgesGroup.destroyEach()
  RocksGroup.destroyEach()
  Level=1
 player.changeAnimation("alienrunning",alienrunning)
    touches=[]
}
  
  
  
}
player.collide(invisibleground)
drawSprites();
if(Gamestate==End){
  textSize(50)
  fill('red')
  text("YOU LOSE",102,171)
}
textSize(50);
fill("white")

if (score%10 === 0&&Gamestate==Play){
     
      text("Level"+Level,208,121)
     
   }




text("score:"+score,0, 100);

 
   
}

function spawnRocks() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(400,355,10,40);
    rock.velocityX =-6
    
    //generate random obstacles
   var rand = Math.round(random(1,2))

if(rand==1){
  rock.addImage(obstacle1)
}
  if(rand==2){
  rock.addImage(obstacle2)
} 
    
   
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.7;
    rock.lifetime = 70;
    rock.setCollider("rectangle",0,0,80,200)
    
    //add each obstacle to the group
    RocksGroup.add(rock);
  }
}
function spawnCoins() {
  if(frameCount % 100 === 0) {
    var coin = createSprite(400,200,10,40);
   coin.y=random(50,150)
    coin.velocityX =-6
    
    //generate random obstacles
    var rand = Math.round(random(1,3))

    
    
    
    
   coin.addImage(coinimage)
    
    //assign scale and lifetime to the obstacle           
    coin.scale = 0.6
    ;
    coin.lifetime = 70;
    //add each obstacle to the group
    CoinsGroup.add(coin);}
}
function spawnBadges() {
  if(frameCount % 40 === 0) {
    var badge = createSprite(420,200,10,40);
   badge.y=random(350,380)
    badge.velocityX =-6
    
    //generate random obstacles
    
     badge.addImage(coin2image)
    
    //assign scale and lifetime to the obstacle          
    badge.scale = 0.4;
    badge.lifetime = 70;
    //add each obstacle to the group
    BadgesGroup.add(badge);}
}










  
  
  
  
  
  
  
  
  
 

