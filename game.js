var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedArray = [];
var gameArray = [];
//Initiate game state
var started = false;
var level = 0;

$(document).on("keydown", function(){
    // Means not false = true
    if (!started) {
        // Change level and start flash
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Detect user click
$(".btn").on("click", function(){
    // Get each clicked button's colour 
    var userClickedColour = $(this).attr("id");
    // Store each clicked button's colour string in userClickedArray
    userClickedArray.push(userClickedColour);
    

    playSound(userClickedColour);
    animatePress(userClickedColour);
    // Last item's index of user click array (type:num)
    checkAnswer(userClickedArray.length - 1);
})


function checkAnswer(currentLevel){
    // Compare the last item content in tow arry
    if (userClickedArray[currentLevel] === gameArray[currentLevel]){
        console.log("success");
        if (userClickedArray.length === gameArray.length) {
            setTimeout(function(){
                nextSequence()
            } , 1000)
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    // Reset 
    userClickedArray = [];

    // Level up
    ++ level;
    $("#level-title").text("Level " + level)

    // Generate random num from 1-4 as button colours' position.
    var randomNumber = Math.floor(Math.random()*4);
    // Get this position's string of button colour
    var randomChosenColour = buttonColours[randomNumber];
    // Store each button colour to the game array 
    gameArray.push(randomChosenColour);
    // Select the button with the same id as the randomChosenColour to apply flash animate
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    // When the random selected button flash, played its audio; when the button got clicked, played its audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentColor){
    // Add classname to apply animation
    $("#" + currentColor).addClass("pressed");
    // Remove new added classname after 0.1s to recover
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100)
}

function startOver(){
    level = 0;
    gameArray = [];
    started = false;
}

