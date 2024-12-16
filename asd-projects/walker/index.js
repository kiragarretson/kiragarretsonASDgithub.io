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
  speedY: 0
 }

 var walker2 = {
  xPos: 0,
  yPos: 0,
  speedX: 0,
  speedY: 0
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
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      console.log("up pressed");
      walker.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      console.log("down pressed");
      walker.speedY = +5;
    }
    if (event.which === KEY.LEFT) {
      console.log("left pressed");
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      walker.speedX = 5;
    }

// start of player 2
      if (event.which === KEY.W) {
        console.log("W pressed");
        walker2.speedY = -5;
      }
      if (event.which === KEY.S) {
        console.log("S pressed");
        walker2.speedY = +5;
      }
      if (event.which === KEY.A) {
        console.log("A pressed");
        walker2.speedX = -5;
      }
      if (event.which === KEY.D) {
        console.log("D pressed");
        walker2.speedX = 5;
      }
      if (event.which === KEY.SPACE) {
        console.log("space pressed");
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
