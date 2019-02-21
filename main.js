//Variables
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();

//Selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#resetBtn");
var h1 = document.querySelector("h1");
var modeBtn = document.querySelectorAll(".modeBtn");

init(); //calling init

function init(){
    
    //main flow starts here.
    modeBtn[1].classList.add("selected");
    reset();
    checkColor();
    modeListener();

    //click listener of Reset Button
    resetBtn.addEventListener("click", function(){
        reset();
    });

}

//function reset
function reset(){
    //set background to original color
    h1.style.background = "#1b646d";

    //hide the Try Again or Correct message
    messageDisplay.textContent = "";
    resetBtn.textContent = "More Colors";

    //change colors array
    colors = generateRandomColors(numSquares);

    //display colors in squares
    for(i=0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }

    //pick random colorDisplay 
    pickedColor = pickColor();

    //select colorDisplay accordingly
    colorDisplay.textContent = pickedColor;
}

function checkColor(){
    for(var i=0; i<squares.length; i++){
        //adding click listener
        squares[i].addEventListener("click", function(){
    
            //grab color of clicked event
            var clickedColor = this.style.background;
    
            //compare color to pickedColor
            if(pickedColor === clickedColor){
                messageDisplay.textContent = "Correct!";
                changeColor(pickedColor);
                resetBtn.textContent = "Play Again?";
            }
            else{
                this.style.background= "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

//Mode listener
function modeListener(){
    
    for( var i=0; i<modeBtn.length; i++){
        
        modeBtn[i].addEventListener("click", function(){
            h1.style.background = "#1b646d";
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy"? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

//Changes the color of heading and blocks
function changeColor(color){

    //changing color of heading
    h1.style.background = color;

    //changing color of blocks
    for(i=0; i<squares.length; i++){
        squares[i].style.background = color;
    }
}

//Chooses a random color from array
function pickColor(){
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
}

//Generates array of colors
function generateRandomColors(arrayLength){

    //make a array
    var arr = [];

    //fill it with colors of given arrayLength
    for (i=0; i<arrayLength; i++){

        arr.push(randomColor());
    }

    //return the array
    return arr;
}

//Generates a random color with rgb(r, g, b) format
function randomColor(){
    //random proportion of red
    var r = Math.floor(Math.random()*256);

    //random proportion of green
    var g = Math.floor(Math.random()*256);

    //random proportion of blue
    var b = Math.floor(Math.random()*256);

    //return a string with rgb(r, g, b) format
    return "rgb(" + r + ", " + g + ", " + b + ")";
}