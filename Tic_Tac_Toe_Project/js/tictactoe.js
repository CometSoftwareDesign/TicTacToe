//this variable keeps track of who's turn it is.
let activePlayer = 'X';
//this array stores an array of moves. we use this to determine win conditions.
let selectedSquares = [];


//this function is for placing an X or an O in a square.
function placeXOrO(squareNumber) {
 //this condition ensures that a square hasn't been selected already
 // the .some() method is used to check each element of selectedSquare array to
 //see if it contains the square number clicked on. 
 if (!selectedSquares.some(element => element.includes(squareNumber))) {
    //this variable retrives the HTML elemnt id that was clicked.  
    let select = document.getElementById(squareNumber);
    //this condition checks who's turn it is. 
         if (activePlayer === 'X') {
        //if activePlayer is equal to "X", the x.png is placed in html
            select.style.backgroundImage = 'url("./images/spartan.png")';
        }//active player may only be X or O, so if not X then it must be O
        else {
            select.style.backgroundImage = 'url("./images/egpti.png")';
        }

        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions();

        if (activePlayer ==='X') {
            activePlayer = 'O';
        }else {
            activePlayer = 'X';
        }               
 //this function keeps track of placement sound
     audio('./media/GUN_FIRE-GoodSoundForYou-820112263.mp3');
    if (activePlayer === 'O'){
     disableClick();
     setTimeout(function() { computersTurn();}, 1000);
    }
    return true;
}

//this function results ina rando square being selected

function computersTurn() {
    let success = false;
    let pickASquare;
    while (!success){
        pickASquare = String(Math.floor(Math.random() * 9 ));
        if (placeXOrO(pickASquare)) {
            placeXOrO(pickASquare);
            success = true;
        }
    }
}
}

//This function sections of the selctedSquares array to search for win conditions
//drawwinline function is called to drawlines if condition is met

function checkWinConditions(){
    //X Section
    if (arrayIncludes ('0X','1X','2X')) {drawWinLine(50, 304,558,100);}
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304);}
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508);}
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 508);}
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558);} 
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558);}
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90);}
   //O Section
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520);}
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 508); }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }

    else if (selectedSquares.length>=9){
        audio('./media/RPG_Plus_Shrapnel-Mike_Koenig-802194222.mp3');
        setTimeout(function(){ resetGame();}, 1000 );
    }
}

//this function checks if an array has 3 strings
//it is used to check for each win condition

function arrayIncludes(squareA, squareB, squareC){

    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    if (a === true && b === true && c === true) {return true;}
}

//end section

//this function makes our body element temporarily unclickable

function disableClick() {
    body.style.pointerEvents ='none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//end function

// this function takes a string parameter of the path you set earlier
//for the placement sound

function audio(audioURL) {
let audio = new Audio(audioURL);
audio.play();
}


//this function uses the html canvas to draw a line when you win

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas= document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

function animateLineDrawing(){
    const animationLoop= requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608,608);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = 'green';
    c.stroke();
    //this condition checks to see if we've reached the endpoint
    if (x1 <= x2 && y1 <= y2){
        if (x < x2){x += 10;}
        if (y < y2){y += 10;}
        if (x >= x2 && y >= y2){ cancelAnimationFrame(animationLoop); }
    }
// This function is similar to the one above.
// it's necessary for the 6,4,2 winCondition
    if (x1 <= x2 && y1 >= y2){
        if (x < x2) {x += 10;}
        if (y > y2) {y -= 10;}
        if (x >= x2 && y<= y2) {cancelAnimationFrame(animationLoop);}
    }
}

//this function clears the canvas after the win line is drawn
function clear(){
    const animationLoop =requestAnimationFrame(clear);
    c.clearRect(0, 0, 608, 608);
    cancelAnimationFrame(animationLoop);
}

// this line disallows clicking while the win sound is playing. 

disableClick();
audio('./media/winGame_soundeffect.mp3');
animateLineDrawing();
setTimeout(function () {clear(); resetGame(); }, 1000);
}

//this function resets a game after a tie or a win
function resetGame(){
    // this for loop iterates(does the action) through each squre on the grid
    for (let i = 0; i < 9 ; i++) {
        let square = document.getElementById(String(i));
        // this removes the background image:
        square.style.backgroundImage = '';
    }
    //this resets our array so it is empty and we can start over:
    selectedSquares = [];
}