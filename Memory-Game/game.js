var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;
$(document).keypress(startGame);

$(".btn").click(function(event){
    var userChosenColor = event.originalEvent.srcElement.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
})

function startGame(){
    if (gameStarted === false){
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence()
    }
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
        }, 100);
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(soundName){
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function checkAnswer(currentLevel) {
        if (gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1]){
            wrongAnswer()
        } else if (userClickedPattern.length === currentLevel){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
}

function wrongAnswer(){
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
        }, 200);
        startOver();
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
}