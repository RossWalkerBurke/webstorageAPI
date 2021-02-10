function buttonOnClick(){
    // alert("Sketch !!!");
}

// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function GameObject(name, image, health) {
    this.name = name;
    this.img = image; // this can be used to hold image filename
    this.health = health;
    this.x = 0; // initialised at 0 ***
    this.y = 0; // initialised at 0 ***
}

    // Sprite
    var image = new Image();
    image.src = "./img/stick.png"; // Frames 1 to 6

    var image2 = new Image();
    image2.src = "./img/stick2.png"; // Frames 1 to 6

    var image3 = new Image();
    image3.src = "./img/stick3.png"; // Frames 1 to 6

// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// get audio context for game
var pop = document.getElementById("audioPop");

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", "stick.png", 100);

// Gameobjects is a collection of the Actors within the game
// this is an Array
var gameobjects = [player, new GameObject("NPC", "stick2.png", 100)];

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    console.log("Keycode: " + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }

        // my keypress code for game
        //this will do right and stop for button mash to play the game

        //if (event.type === "keyPress") {
        //    switch (event.keyCode) {
           // case 39: // Right Arrow
          //      gamerInput = new GamerInput("Right");
           //     break; //Right key
         //   }
       // }
       
    }
     else {
        gamerInput = new GamerInput("None"); //No Input
    }
    // console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
            gameobjects[i].health = 100;
            console.log("Up");
        }
        if (gamerInput.action === "Down") {
            gameobjects[i].health = 100;
            console.log("Down");
        }
        if (gamerInput.action === "Right") {
            gameobjects[i].health = 100;
            console.log("Right");
        }
        if (gamerInput.action === "Left") {
            gameobjects[i].health = 100;
            console.log("Left");
        }

        if (gameobjects[i].health >= 1) {
            //gameobjects[0].health = gameobjects[1].health - 100;
            // console.log("Health :" + gameobjects[i].health);

        //this is my boarder contact code so that the sprite doesnt exit the screen
        if(gameobjects[0].x < -1){
            gameobjects[0].x += 1;
        }
        if(gameobjects[0].x > 900){
            gameobjects[0].x -= 1;
        }
        if(gameobjects[0].y > -1){
            gameobjects[0].y -= 1;
        }
        if(gameobjects[0].y > 300){
            gameobjects[0].y += 1;
        }
        gameobjects[0].x -= 0.5;
        gameobjects[0].y += 0.5;

            // *** This is where X and Y are being updated
            if (gamerInput.action === "Down") {
                gameobjects[0].y += 0;
                gameobjects[0].health = 100;
                // console.log("Down");
            }
            if (gamerInput.action === "Up") {
                gameobjects[0].y -= 0;
                gameobjects[0].health = 100;
                // console.log("Up");
            }
            if (gamerInput.action === "Right") {
                gameobjects[0].x += 2;
                gameobjects[0].health = 100;
                // console.log("Right");
            }
            if (gamerInput.action === "Left") {
                gameobjects[0].x -= 1;
                gameobjects[0].health = 100;
                // console.log("Left");
            }
        }
         else {
          console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  Y: " + gameobjects[i].y + " looks like its not alive :'(");
        }
    }
}

// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 75) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
       
    } 

}
// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw"); 


    // //triangle to avoid
    // context.beginPath();
    // context.moveTo(500,250);
    // context.lineTo(475,300);
    // context.lineTo(525,300);
    // context.fill();
 
    for (i = 0; i < gameobjects.length; i++) {
     //   if (gameobjects[i].health > 0) {

            
            // Draw sprite frame
            context.drawImage(image,(image.width / 6) * currentFrame ,0 ,100 ,150 ,gameobjects[0].x, 150-gameobjects[0].y ,100 ,150);
            context.drawImage(image2,(image2.width / 6) * currentFrame, 0, 100 ,150 , 900, 150 , 100, 150);
            animate(); 
    //    }  
  
    }
}


function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed "keyup" or "keydown"
// this is is being handled by the method input()
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);

//button press RUN
function buttonOnClickRun()
{ 
    pop.currentTime = 0;
    pop.play();
    console.log("Right");
    gameobjects[0].x += 40;
    gameobjects[0].health = 100;
    updateScore();

    image = image
}
//Button Press JUMP
function buttonOnClickJump()
{ 
    pop.currentTime = 0;
    pop.play();
    console.log("Up");
    gameobjects[0].y += 60;
    gameobjects[0].health = 100;
    updateScore();
    
    // to change image to image3  (run to jump)    
    image = image3
}
 

 readJSONFromURL('./data/level.json', function (err, data) {
     if (err != null) {
       console.error(err);
     } else {
       var text = data["Pawns"];
       console.log(text);
       var text = data["Grunts"];
       console.log(text);
       var text = data["Boss"];
       console.log(text);
     }
    });

   // Reading File from a Server

   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function () {
     if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(this.responseText);
       document.getElementById("NPC").innerHTML = data[0];
     }
   };
   xmlhttp.open("GET", "./data/level.json", true);
   xmlhttp.send();



// Update the player score
function updateScore() {
  
// this code is local storage on the clicks people do as score

  var score= 1;
  var current_score = localStorage.getItem('score');

    score = parseInt(current_score) + 1;
    console.log("Hello " + score);
    document.getElementById("SCORE").innerHTML = score;

    localStorage.setItem("score", score);

/*   if (isNaN(current_score)) {
    localStorage.setItem('score', 0);
    document.getElementById("SCORE").innerHTML = " [ " + current_score + " ] ";
  } else {
    localStorage.setItem('score', parseInt(current_score) + 1);
    document.getElementById("SCORE").innerHTML = " [ " + current_score + " ] ";
  } */
}
    updateScore();