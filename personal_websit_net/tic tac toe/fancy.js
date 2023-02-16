let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;

/*
const xSymbol = document.getElementById("x-symbol");
const oSymbol = document.getElementById("o-symbol");
const board = document.getElementById("board");
const message = document.getElementById("message");
const reset = document.getElementById("reset");
 currentPlayer = "X";

const squares = document.querySelectorAll("td");


for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function() {
    if (this.textContent === "") {
      this.textContent = currentPlayer;
      if (checkForWin()) {
        message.textContent = `Player ${currentPlayer} Wins!`;
        board.removeEventListener("click", arguments.callee);
      } else if (checkForDraw()) {
        message.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
      switchPlayer();
    }
  });
}




function switchPlayer() {
  player = (player === "X") ? "O" : "X";
}





//const cells = document.querySelectorAll("td");
/*reset.addEventListener("click", function() {
  const cells = document.querySelectorAll("td");
  for (const cell of cells) {
    cell.textContent = "";
  }
})
  currentPlayer = "X";
  message.textContent = "";
  board.addEventListener("click", function(event) {
    if (event.target.tagName === "TD") {
      if (event.target.textContent === "") {
        event.target.textContent = currentPlayer === "X" ? xSymbol.value : oSymbol.value;
        if (checkForWin()) {
          message.textContent = `Player ${currentPlayer} Wins!`;
          board.removeEventListener("click", arguments.callee);
        } else if (checkForDraw()) {
          message.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  });
});*/

function checkForWin() {
  const cells = document.querySelectorAll("td");
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (const combination of combinations) {
    if (
      cells[combination[0]].textContent === cells[combination[1]].textContent &&
      cells[combination[1]].textContent === cells[combination[2]].textContent &&
      cells[combination[0]].textContent !== ""
    ) {
      return true;
    }
  }
  
  return false;
  }
  
  function checkForDraw() {
    const cells = document.querySelectorAll("td");
  for (const cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  
  return true;
  }

 // const resetBtn = document.querySelector("#reset");
reset.addEventListener("click", resetGame);

function resetGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  currentPlayer = "X";
}

  