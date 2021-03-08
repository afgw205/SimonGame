var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("h1").text("Level " + level);
    level++;
}


$(".btn").click(function (e) { 
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[currentLevel]) {
    }else{
        $("body").addClass("game-over");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        return;
    }
    
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
}

function startOver() {
    level= 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Press A Key to Start");

}

$(document).keydown(function (e) { 
    if (gamePattern.length === 0) {
    nextSequence();
    }
});

function playSound(name) { 
    var mySound = new Audio("sounds/" + name + ".mp3");
    mySound.play();
 }

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
        
    }, 100);
}