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
            select.style.backgroundImage = 'url("../images/x.png")';
        }//active player may only be X or O, so if not X then it must be O
        else {
            select.style.backgroundImage = 'url("../images/o.png")';
        }
        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions()
        if (activePlayer ==='X') {
            activePlayer = 'O';
        }else {
            activePlayer = 'X';
        }               
 //this function keeps track of placement sound
    audio('../media/place-soundeffect.mp3');
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