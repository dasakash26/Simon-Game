// Array of available button colors
var buttonColors = ["red", "blue", "green", "yellow"];
// Array to store the computer-generated pattern
var gamePattern = [];
// Array to store the user's clicked pattern
var userClickedPattern = [];
// Variable to track if the game has started
var gameStarted = false;
// Variable to track the current level
var level = 0;

// Start the game when any key is pressed for the first time
$(document).keydown(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

// Function to generate the next sequence in the game
function nextSequence() {
  level++;
  if (level % 5 === 0) {
    celebrate();
  }
  // Change the heading to indicate the current level
  $("#level-title").text("Level " + level);
  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Select a random color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];
  // Add the chosen color to the game pattern
  gamePattern.push(randomChosenColor);
  // Animate and play sound for the chosen color
  SoundAndAnimation(randomChosenColor);
}

// jQuery to detect button clicks
$(".btn").click(function () {
  // Only execute the following code if the game has started
  if (gameStarted) {
    // Store the id of the clicked button in userChosenColor variable
    var userChosenColor = $(this).attr("id");
    // Store userChosenColor in the userClickedPattern array
    userClickedPattern.push(userChosenColor);
    // Call play sound function
    SoundAndAnimation(userChosenColor);
    // Check answer
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Function to animate buttons and play associated sounds
function SoundAndAnimation(color) {
  // Animate the button with the specified color
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // Play audio associated with the button color
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gameStarted) {
    // Check if the user's current answer matches the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");
      // If the user has completed the current level's pattern
      if (userClickedPattern.length === gamePattern.length) {
        // Wait for 1 second and then generate the next sequence
        setTimeout(function () {
          nextSequence();
        }, 1000);
        // Reset the userClickedPattern array for the next level
        userClickedPattern = [];
      }
    } else {
      // If the user's answer is incorrect, end the game
      gameOver();
      // Reset the game for a new play through
      startOver();
    }
  }
}

// Function to handle game over
function gameOver() {
  // Play game over sound
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  // Apply the game-over style to the body for 200ms
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  // Update the heading to indicate game over
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

// Function to reset the game
function startOver() {
  // Reset the level to 0
  level = 0;
  // Clear the game pattern
  gamePattern = [];
  userClickedPattern = [];

  // Set gameStarted to false to allow the game to be restarted
  gameStarted = false;
}

//celebration
function celebrate() {
  //i am batman
  var batMan = new Audio("sounds/batMan.mp3");
  batMan.play();
  //batman css
  $("body").addClass("ten");
  setTimeout(function () {
    $("body").removeClass("ten");
  }, 4000);
}
