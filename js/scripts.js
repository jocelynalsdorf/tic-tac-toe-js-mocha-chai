//will need a player, a board and a game


function Player(marker, isActive) {
  this.marker = marker; //will be set to x or o
  this.isActive = isActive; //will be toggled t or f to know whose turn
};

//can change turns by toggling isActive for a player 
Player.prototype.changeTurns = function(){
  if(this.isActive === true) {
    this.isActive = false;
  }
  else {
    this.isActive = true;
  }
};


//make empty 2d array (will be all null) so can compare null vs != null to see if square is empty & can be played
function Board() { 
  var boardSize = 3;
  var board = [];
  for(var row = 0; row < boardSize; row++) {
    board.push([]);
    for(var col = 0; col < boardSize; col++){
      board[row].push(null);
    }
  }
  this.board = board;
};



Board.prototype.mark = function(xcord, ycord, marker){ //this marks a square with the current players marker
  if(!this.isMarkedYet(xcord, ycord)) {
    this.board[xcord][ycord] = marker;
  }
};

Board.prototype.isMarkedYet = function(xcord,ycord){ //checks if the array spot is null or not.if its not null it has been marked already
  if(this.board[xcord][ycord] !== null){
    return this.board[xcord][ycord];
  } 
  else {
    return false;
  }
};


function Game(){
  var playerOne = new Player("X", true);
  var playerTwo = new Player("O", false);
  var board = new Board();
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.board = board;
};

Game.prototype.getTurns = function(){ //returns whose turn it is
  if(this.playerOne.isActive === true) {
    return this.playerOne;
  }
  else {
    return this.playerTwo;
  }
}
//change whose turn it is
Game.prototype.toggleTurns = function(){
  this.playerOne.changeTurns();
  this.playerTwo.changeTurns();
};

//figure out who wins
Game.prototype.whoWins = function() {
  var myBoard = this.board.board;
  var winner = false;

//will need to check x axis horizontal wins
for(var x = 0; x < 3; x++) {
  if( ((myBoard[x][0]) === (myBoard[x][1])) && ((myBoard[x][2]) === (myBoard[x][0])) ) {
    if(this.playerOne.marker === myBoard[x][0]) {
      winner = this.playerOne;
    }
    else if (this.playerTwo.marker === myBoard[x][0]) {
      winner = this.playerTwo;
    }
  }
}

//will need to check y axis
for(var y = 0; y < 3; y++) {
  if( ((myBoard[0][y]) === (myBoard[1][y])) && ((myBoard[2][y]) === (myBoard[0][y])) ) {
    if(this.playerOne.marker === myBoard[0][y]) {
      winner = this.playerOne;
    }
    else if (this.playerTwo.marker === myBoard[0][y]) {
      winner = this.playerTwo;

    }
  }
}

//will need to check diagonal axis
if(myBoard[0][0] === myBoard[1][1] && myBoard[2][2] === myBoard[0][0]) {
    if(this.playerOne === myBoard[0][0]) {
      winner = this.playerOne;
    }
    else {
      winner = this.playerTwo;
    }
  } else if(myBoard[2][0] === myBoard[1][1] && myBoard[0][2] === myBoard[2][0]) {
    if(this.playerOne === myBoard[2][0]) {
      winner = this.playerOne;
    }
    else {
      winner = this.playerTwo;
    }
  }

//check for draw 
  if (winner === false) {
   for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++){
        if(myBoard[row][col] === null) {
          return false;
          break;
        }
        else {
          winner = "draw";
        }
      }
    }
  }//end of 'draw' section
return winner;
};//end of whoWins method

var makeBoardBackground = function(){
 $("#inner-div").append("<div class='game-area'><div class='row'><div class='col-md-4 odd' id='tr'></div><div class='col-md-4 even' id='tc'></div><div class='col-md-4 odd' id='tl'></div></div><div class='row'><div class='col-md-4 even' id='mr'></div><div class='col-md-4 odd' id='mc'></div><div class='col-md-4 even' id='ml'></div></div><div class='row'><div class='col-md-4 odd' id='br'></div><div class='col-md-4 even' id='bc'></div><div class='col-md-4 odd' id='bl'></div></div></div>");
  };

$(document).ready(function(){

 $("#play").click(function(event){
   event.preventDefault();
   makeBoardBackground();
   
  
   var game = new Game();
   var myBoard = game.board;
  $(".turnx").toggleClass(game.getTurns().marker);

   });//end of submit event

 $("#reset").click(function(event){
   event.preventDefault();
   $(".game-area").remove();

 });


 });//end of file