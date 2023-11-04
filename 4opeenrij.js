var board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var sum = 0;
var turn = 1;
var player1 = '#c3423f';
var player2 = '#9bc53d';
var x=0;
var y=0;


function refreshBoard() {
  for(column of board){
      columnPrnt = board.indexOf(column);
      for (var position = column.length-1; position >= 0; position--) {
        availablePos="position" + columnPrnt+"_"+position;
        if (column[position]>0){
          var toChange = document.getElementById(availablePos);
          if (column[position]==1){
            toChange.style.backgroundColor = player1;
          }
          else {
            toChange.style.backgroundColor = player2;
          }
        }
      }
    }
}

function insertChip(column) {
  sum = 0;
  for (var i = 0; i < board[column].length; i++) {
    if(board[column][i]===0){
      sum = i;
      break
    }
  }
  positionToFill = 'position' + column + "_" + sum;
  board[column][sum] = turn;
  nextPlayer();
  refreshBoard();
  checkIfWinner();
}
function resetCoordinates(){
  x=0;
  y=0;
}

function nextPlayer(){
  if(turn==1){ turn=2; }
  else{ turn=1; }
}

function checkIfWinner(){
  resetCoordinates();
  while(y<2){
    while(x<7){
      // VERTICAL WINNER uitvoeren voor y = 0 en y is 1
      if (board[x][y]===board[x][y+1] && board[x][y]===board[x][y+2] && board[x][y]===board[x][y+3] && board[x][y]>0){
        announceWinner();
      }
      x++;
    }
    x=0;
    y++;
  }
  resetCoordinates();

  // HORIZONTAL WINNER uitvoeren voor x = 0 t/m 3
  while(y<5)
  {
    while(x<4){
      if (board[x][y]===board[x+1][y] && board[x][y]===board[x+2][y] && board[x][y]===board[x+3][y] && board[x][y]>0){
        announceWinner();
      }
      x++;
    }
    x=0;
    y++;
  }
  resetCoordinates();
  // DIAGONAL WINNER BOTTOM TO TOP
  while(y<2){
    while(x<4){
      if (board[x][y]===board[x+1][y+1] && board[x][y]===board[x+2][y+2] && board[x][y]===board[x+3][y+3] && board[x][y]>0){
        announceWinner();
      }
      x++;
    }
    x=0;
    y++;
  }
  resetCoordinates();
  y=4;
// DIAGONAL WINNER TOP TO BOTTOM
  while(y>2){
    while(x<4){
      if (board[x][y]>0){
      if (board[x][y]===board[x+1][y-1]){
        if (board[x][y]===board[x+2][y-2]){
            if (board[x][y]===board[x+3][y-3]){
              announceWinner();
          }
        }
      }
    }
        // announceWinner();

      x++;
    }
    x=0;
    y--;
  }
}
function announceWinner()
  {
    nextPlayer();
    var notification = document.getElementById("notification")
    notification.textContent = "🎉 Congratulations Player "+turn+", you've won! Click here to play again! 🎉"
    cells = document.querySelectorAll('td')
    for (var i = 0; i < cells.length; i++) {
      cells[i].removeAttribute("onclick");
    }
    // document.getElementsByTagName("table")[0].style.display = "none";
    // document.getElementById("refresh").style.display = "inline-block";
  }
