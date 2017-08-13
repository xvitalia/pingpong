var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y  = 250;
var paddle2Y  = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
//this variable cannot be change through the code, constant. not nesessary, also can be just paddleHeight, caps is from C

//call the function everythime the mouse moves:
function calculateMousePos(evt) { //evt - event data
  var rect = canvas.getBoundingClientRect();//black area
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return { //javascript "Object Literal"
    x:mouseX,
    y:mouseY
  };
}

function handleMouseClick(evt){
  if (showingWinScreen){
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
  //console.log("Hello World!");
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // setInterval(drawEverything, 1000);//how many miliseconds, aka 1 sec, i want to wait between each function is called, no () at the end of the function when using it like this //its gonna call dE function...
  //drawEverything();//code in a function does not get run unless it is called
  //setInterval(drawEverything, 50);

  var framesPerSecond = 30; //..this number... |temporary local variable
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond); //... will be forgotten by the time when the end of the function gets reached
  
  canvas.addEventListener('mousedown', handleMouseClick);
  
  canvas.addEventListener('mousemove',
                          function (evt) {//inline function
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);// mousePos.y only will drag right upper corner of the paddle by mouse.
  });
}

function ballReset(){
  if(player1Score >= WINNING_SCORE ||
     player2Score >= WINNING_SCORE){
    
    
    showingWinScreen = true;
  }
  
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement(){
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);//paddle@Y is top of the paddle
  if(paddle2YCenter < ballY-35){ //if paddle above the ball
    paddle2Y += 6; //same as paddle2Y = paddle2Y +6;
  }else if(paddle2YCenter > ballY+35){
    paddle2Y -= 6;//paddle2Y = paddle2Y-6;
  }
}

function moveEverything() {
  if (showingWinScreen){
    return;
  }
  computerMovement();
  
  ballX += ballSpeedX;//ballX = ballX + ballSpeedX;
  ballY += ballSpeedY; //ballY = ballY + ballSpeedY;
  
  if (ballX < 0) { //distance on the left, bouncing from left side
   // ballSpeedX = -ballSpeedX;
    if(ballY > paddle1Y &&
      ballY < paddle1Y+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
      
      var deltaY = ballY //delta - difference
                  -(paddle1Y+ PADDLE_HEIGHT/2);
                  ballSpeedY = deltaY * 0.35;
    }else{
    player2Score++;//player2Score += 1 // must be before ball reset
    ballReset();
     
      
  }
  }
  if (ballX > canvas.width) {//bouncing from right isde
    //ballSpeedX = -ballSpeedX;
     if(ballY > paddle2Y &&
      ballY < paddle2Y+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
       
         var deltaY = ballY //delta - difference
                  -(paddle2Y+ PADDLE_HEIGHT/2);
                  ballSpeedY = deltaY * 0.35;
    }else{
    player1Score++;//player1Score += 1; equals playerScore= playerScore+1
    ballReset();
      
      
  }
    
  }
  if (ballY < 0) { //distance on the left, bouncing from left side
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {//bouncing from up side
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet (){
  for(var i=0; i<canvas.height; i+=40){// start variable(i) at 0, count up to less than 600 intervals in intervals of 40
      colorRect(canvas.width/2-1,i, 2,20, 'white');
// in each location draw colorRect; 2 pixels thick, 2-1 means pixels on each side from center;
  }
}

function drawEverything() {
  //ballX = ballX + 20 ; //...each time it is called, it adds 20 to the value that stored at 50
  //ballX = ballX + ballSpeedX;
  //ballSpeedX = ballSpeedX + 1;// speed up ball movement each second

  //console.log(ballX); //... then its gonna display that number to console and its gonna redraw everythning till } . rectangles position will increase by 20 each second we will look at it.

 // canvasContext.fillStyle = "black";
  //canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  
  //.next line blanks out the screen with black
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  
  //canvasContext.fillStyle = "white";
  //canvasContext.fillRect(0, 210, 10, 100);
  
  if (showingWinScreen){
    canvasContext.fillStyle = "white";
    
    if(player1Score >= WINNING_SCORE){
       canvasContext.fillText("Leftie won", 350, 200);
    } else if(player2Score >= WINNING_SCORE){
    canvasContext.fillText("Rightie won", 350, 200);
    }
     canvasContext.fillText("Click to continue", 350, 500);
    return;
  }
  
  drawNet();
  
  //.this is left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); 
  //right pc paddle
  colorRect(canvas.width-10, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); //8 0f 9// putting paddle instead of 210, aka fixed position, made paddle move by mouse 
  
  ////canvasContext.fillStyle = "red";
  //canvasContext.fillRect(canvas.width/2,200,50,25);
  //canvasContext.fillRect(ballX,200,50,25);//moves
  //canvasContext.fillRect(75,200,ballX,25);//grows
  //canvasContext.fillRect(ballX,ballX,ballX,ballX);moves while growing
  ////canvasContext.fillRect(ballX, 100, 10, 10);
  
  //.next line draws the ball
  colorCircle(ballX, ballY, 10, 'white'); //150-position, 10-radius
  //colorRect(ballX, 100, 10, 10, 'red');

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor; //fillStyle for color of fill, can be mby gradient
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  //canvasContext.arc(ballX, 50, 10, 0, Math.PI*2, true);//center of the circle; 10px-radius, but really the circle will be 20px wide and 20 px tall; mathPI will be part of the circle, PI/2 will be weird 3 quater shape; true or false - clock or conterclock 
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
  
}
