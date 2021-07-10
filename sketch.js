const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blower;
var muteButton;
var blink,eat,sad;
var bg_sound,cutSound,sadSound,eatSound,AirBlowing;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bg_sound=loadSound("sound1.mp3");
  sadSound=loadSound("sad.wav");
  cutSound=loadSound("rope_cut.mp3");
  eatSound=loadSound("eating_sound.mp3");
  AirBlowing=loadSound("air.wav");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile=/iPhone|iPad|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW=displayWidth;
    canH=displayHeigth;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2=createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3=createImg('cut_btn.png');
  button3.position(340,180);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  bg_sound.play();
  bg_sound.setVolume(0.50);

  blower= createImg("balloon.png");
  blower.position(20,250);
  blower.size(150,100);
  blower.mouseClicked(air_blow);

  muteButton=createImg("mute.png");
  muteButton.position(420,40);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);
  
  rope = new Rope(7,{x:40,y:30});
  rope2=new Rope(8,{x:370,y:40});
  rope3=new Rope(5,{x:380,y:205});
  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(170,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2=new Link(rope2,fruit);
  //fruit_con_3=new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,canW/2,canH/2,canW+80,canH);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatSound.play();
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     bg_sound.stop();
     sadSound.play();
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutSound.play();
}

function drop2(){
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
  cutSound.play();

}

function drop3(){
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null; 
  cutSound.play();

}

function collide(body,sprite)
{
  if(body!=null)
    {
      var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
        if(d<=80)
          {
            World.remove(engine.world,fruit);
            fruit = null;
            return true; 
          }
        else{
            return false;
         }
    }
}

function air_blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  AirBlowing.play()
}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop();
  }
  else{

    bg_sound.play();
  }
}
