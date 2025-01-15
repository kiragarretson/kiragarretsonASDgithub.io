/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var WALKER_WIDTH = $("#walker").width();
  var WALKER_HEIGHT = $("#walker").height();
  var WALKER2_WIDTH = $("#walker2").width();
  var WALKER2_HEIGHT = $("#walker2").height();
  var KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,

    SPACE: 32,

    W: 87,
    A: 65,
    S: 83,
    D: 68
  };
  
  // Game Item Objects
 var walker = {
  xPos: 0,
  yPos: 0,
  speedX: 0,
  speedY: 0,
  width: WALKER_WIDTH,
  height: WALKER_HEIGHT,
 }

 var walker2 = {
  xPos: 390,
  yPos: 380,
  speedX: 0,
  speedY: 0,
  width: WALKER2_WIDTH,
  height: WALKER2_HEIGHT,
 }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  $(board).click(colorChange)
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
    collideOccur();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = +5;
    }
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }

// start of player 2
      if (event.which === KEY.W) {
        walker2.speedY = -5;
      }
      if (event.which === KEY.S) {
        walker2.speedY = +5;
      }
      if (event.which === KEY.A) {
        walker2.speedX = -5;
      }
      if (event.which === KEY.D) {
        walker2.speedX = 5;
      }
      if (event.which === KEY.SPACE) {
        colorChange();
      }
  }
  function handleKeyUp(event){
    if(event.which === KEY.DOWN || event.which === KEY.UP){
      walker.speedY = 0;
    }
    if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }

    if(event.which === KEY.S || event.which === KEY.W){
      walker2.speedY = 0;
    }
    if(event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    obj1.leftX = obj1.xPos;
    obj1.topY =  obj1.yPos;
    obj1.rightX =  obj1.xPos + obj1.width;
    obj1.bottomY =  obj1.yPos + obj1.height;

    // TODO: Do the same for square2
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos + obj2.width;
    obj2.bottomY = obj2.yPos + obj2.height;

    // TODO: Return true if they are overlapping, false otherwise
	if(obj2.rightX > obj1.leftX &&
       obj2.leftX < obj1.rightX &&
       obj2.bottomY > obj1.topY){
      return true;
    }
	else {
      return false;
    }
}

  function collideOccur(){
    if(doCollide(walker, walker2)){
      console.log("Tag, you're it!");
      
    }
  }
  function repositionGameItem(){
    walker.xPos += walker.speedX;
    walker.yPos += walker.speedY;
    walker2.xPos += walker2.speedX;
    walker2.yPos += walker2.speedY;
  }
  
  function redrawGameItem(){
    $("#walker").css("top", walker.yPos);
    $("#walker").css("left", walker.xPos);
    $("#walker2").css("top", walker2.yPos);
    $("#walker2").css("left", walker2.xPos);
  }
  function wallCollision(){
    if(walker.xPos > BOARD_WIDTH - WALKER_WIDTH || walker.xPos < 0){
      walker.xPos -= walker.speedX;
    }
    if(walker.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker.yPos < 0){
      walker.yPos -= walker.speedY;
    }
    if(walker2.xPos > BOARD_WIDTH - WALKER_WIDTH || walker2.xPos < 0){
      walker2.xPos -= walker2.speedX;
    }
    if(walker2.yPos > BOARD_HEIGHT - WALKER_HEIGHT || walker2.yPos < 0){
      walker2.yPos -= walker2.speedY;
    }
  }

  function colorChange(event){
    var walkerColor = $("#walker").css("background-color");
    var walker2Color = $("#walker2").css("background-color");
      $("#walker").css("background-color", walker2Color);
      $("#walker2").css("background-color", walkerColor)
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
