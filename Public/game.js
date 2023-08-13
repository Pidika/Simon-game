var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var score = 0;
var highestScore = 0;
// var start = document.getElementById('btn-attack');

$(document).ready(function () {
  updateHighestScoreDisplay(); // Display highest score when the page loads
});


document.getElementById('btn-attack').addEventListener('touchstart', () => attack());

function attack() {
  if (!started) {
    $("#mobile").text("Level " + level);
    nextSequence();
    started = true;
  }
}

document.getElementById('btn-attack').addEventListener('click', function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// $(document).keypress(function () {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

$(".btn").click(function () {
  var userChooseColor = $(this).attr("id");
  userClickedPattern.push(userChooseColor);
  playSound(userChooseColor);
  animatePress(userChooseColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press start button to Restart");
    if (score > highestScore) {
      highestScore = score;
      updateHighestScoreDisplay(); // Update and display highest score
    }
    score = 0;
    startOver();
  }
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else {
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  score++;
  $("#level-title").text("Level " + level);
  $("#mobile").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function updateHighestScoreDisplay() {
  $("#highest-score").text("Highest Score: " + highestScore);
}
