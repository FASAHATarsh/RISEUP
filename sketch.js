const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Render = Matter.Render;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var gameState="play";
var engine, world;
var ballon;
var shapes=[];
var mConstraint;
var count=0;

function preload()
{
    life=loadImage("life.png");
}
function setup() 
{
    var canvas = createCanvas(400, 600);
    engine = Engine.create();
    world = engine.world;

    ballon = new Ballon(200, 480, 100, 170);

    ball = new Ball(200, 350, 21, 21);


  lifeA = createSprite(260,35,50,50);
  lifeA.addImage("life", life);
  lifeA.scale = 0.04;
  lifeB = createSprite(290,35,50,100);
  lifeB.addImage("life", life);
  lifeB.scale = 0.04;
  lifeC = createSprite(320,35,20,20);
  lifeC.addImage("life", life);
  lifeC.scale = 0.04;
  lifeD = createSprite(350,35,20,20);
  lifeD.addImage("life", life);
  lifeD.scale = 0.04;
  lifeE = createSprite(380,35,20,20);
  lifeE.addImage("life", life);
  lifeE.scale = 0.04;
  
  lives=[lifeE,lifeD,lifeC,lifeB,lifeA];


}

function draw() 
{
    background("#b2c7da");
    Engine.update(engine);
//    text(mouseX + "," + mouseY, mouseX, mouseY);
    if(frameCount % 13 === 0 && gameState==="play"){
      count=count+1
    }

  
    if (frameCount % 20 === 0) {
      shapes.push(new Shape(random(150, 250), 10, 9, 9));
    }
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].display();
    }
    ballon.display();
    ball.display();
    textSize(18);
    textFont("Georgia");
    textStyle(BOLD);
    text("Score: "+ count,10,40)
    for(var x=0;x<shapes.length;x++)
    {
        var collision = Matter.SAT.collides(ballon.body, shapes[x].body);
        if (collision.collided)
         {
         
             //World.remove(world,shapes[x].body);
             shapes[x].body.position.x=0;
             //shapes.slice(x,1);
            // x--;
           
            lives[lives.length-1].destroy();
            console.log(lives.length);
            lives.pop();
            console.log("collided")
        }
        if(lives.length===0)
        {
          gameState="Lost";
          break;
          //text("Lost");
        }
    }
    if(gameState==="Lost")
    {
        end();
    }
    drawSprites();      
}

function keyPressed()
 {
    if (keyCode === 38)
     {
        Matter.Body.setVelocity(ball.body, { x: 0, y: -5 });
     }
      else if (keyCode === 37)
      {
          Matter.Body.setVelocity(ball.body, { x: -5, y: 0 });
      }
         else if (keyCode === 39) 
      {
          Matter.Body.setVelocity(ball.body, { x: 5, y: 0 });
      }
  }
function end()
{
    swal(
        {
          title: `Game Over!!!`,
          text: "Thanks for playing!!",
          text: "Your Score: "+count,
          
          
          imageUrl:
            "end.png",
          imageSize: "150x150",
          confirmButtonText: "Play Again",
          
        },
        function(isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );
}