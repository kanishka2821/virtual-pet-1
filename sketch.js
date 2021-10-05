var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;


function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png"); 
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.100;

  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.045;
  milk1.visible = false;

}


function draw() {  
  background(46, 139, 87)

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}



  drawSprites();
  textSize(17);
  fill("black");
  text("HELLO",100,300);
  fill("black");
  text("press up arrow to feed",200,50);
  fill("black");
  text("Milk Bottles Left "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}