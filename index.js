const $displaygame0 = document.querySelector(".displaygame0");
const $displaygame1 = document.querySelector(".displaygame1");
const $displaygame2 = document.querySelector(".displaygame2");
const $displaygame3 = document.querySelector(".displaygame3");
const $displaygame4 = document.querySelector(".displaygame4");
const $displaygame5 = document.querySelector(".displaygame5");
const $displaygame6 = document.querySelector(".displaygame6");
const $displaygame7 = document.querySelector(".displaygame7");
const $displaygame8 = document.querySelector(".displaygame8");

const $boardList = document.querySelectorAll(".display-game-item");

const $scoreplayerone = document.querySelector(".score-player-one");
const $scoreplayertwo = document.querySelector(".score-player-two");

const $winnerName = document.querySelector(".winner-player-text");

const $playerName1 = document.querySelector(".player-name1");
const $playerName2 = document.querySelector(".player-name2");

const $historyMoveMatch = document.querySelector(".history-move-match");

let currentMove = "X";
let scorePlayer1 = 0;
let scorePlayer2 = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function printMoveHistory(move, playerName, boardIndex) {
  const dictionaryIndexBoard = [
    "Primeiro",
    "Segundo",
    "Terceiro",
    "Quarto",
    "Quinto",
    "Sexto",
    "Sétimo",
    "Oitavo",
    "Nono",
  ];

  /*  switch (boardIndex) {
    case 0:
      boardIndexText = "Primeiro";
      break;
    case 1:
      boardIndexText = "Segundo";
      break;
    case 2:
      boardIndexText = "Terceiro";
      break;
    case 3:
      boardIndexText = "Quarto";
      break;
    case 4:
      boardIndexText = "Quinto";
      break;
    case 5:
      boardIndexText = "Sexto";
      break;
    case 6:
      boardIndexText = "Sétimo";
      break;
    case 7:
      boardIndexText = "Oitavo";
      break;
    case 8:
      boardIndexText = "Nono";
      break;
    default:
      boardIndexText = "Nenhum";
  } */

  $historyMoveMatch.innerHTML += `
  <li class="history-move-player" index="2">
    <div class="history-move-text-wrapper">
      <span class="history-move-letter">${move}</span>
      <div class="history-move-player-flex">
        <h3 class="history-move-player-name">${playerName}</h3>
        <span class="history-move-position-text">${dictionaryIndexBoard[boardIndex]} Campo</span>
      </div>  
    </div>  
  </li>`;
}

function toggleMove() {
  /*if (currentMove == "X") {
    currentMove = "O";
  } else {
    currentMove = "X";
  }*/
  //exmplo IF tenar: CurrentMove "é igual" CurrentMove "é" 'X' "?"" 'O' "senão" "X"
  currentMove = currentMove == "X" ? "O" : "X";
}

function printWinnerName(winnerName) {
  $winnerName.textContent = winnerName;
}

function verifyGame() {
  let filledField = 0;

  for (const condition of winConditions) {
    const fieldIndex0 = condition[0];
    const fieldIndex1 = condition[1];
    const fieldIndex2 = condition[2];

    const $field1 = $boardList[fieldIndex0];
    const $field2 = $boardList[fieldIndex1];
    const $field3 = $boardList[fieldIndex2];

    if (
      $field1.innerHTML != "" &&
      $field1.innerHTML == $field2.innerHTML &&
      $field2.innerHTML == $field3.innerHTML
    ) {
      return currentMove;
    }
  }

  for (const $field of $boardList) {
    if ($field.innerHTML != "") filledField++;
  }

  if (filledField == 9) return "draw";
}

function resetHistoryList() {
  $historyMoveMatch.innerHTML = "";
}

function resetBattleField() {
  for (const $displayGame of $boardList) {
    $displayGame.innerHTML = "";
  }
}

function move(boardIndex) {
  const $displayGame = $boardList[boardIndex];

  if ($displayGame.innerHTML != "") return;
  $displayGame.innerHTML = currentMove;
  const gameResult = verifyGame();

  const playerName =
    currentMove === "X" ? $playerName1.value : $playerName2.value;

  if (gameResult === "X" || gameResult === "O") {
    addPoint(gameResult);
    printScore();
    printWinnerName(playerName);
    setTimeout(resetBattleField, 1000);
    setTimeout(resetHistoryList, 1000);
  }

  if (gameResult == "draw") {
    setTimeout(resetBattleField, 1000);
    setTimeout(resetHistoryList, 1000);
  }

  printMoveHistory(currentMove, playerName, boardIndex);
  toggleMove();
}

function addPoint(winner) {
  if (winner == "X") scorePlayer1++;

  if (winner == "O") scorePlayer2++;
}

function printScore() {
  $scoreplayerone.innerHTML =
    scorePlayer1 < 10 ? "0" + scorePlayer1 : scorePlayer1;
  $scoreplayertwo.innerHTML =
    scorePlayer2 < 10 ? "0" + scorePlayer2 : scorePlayer2;
}

function addBoardListeners() {
  for (let index = 0; index < $boardList.length; index++) {
    const $displayGame = $boardList[index];

    $displayGame.addEventListener("click", function () {
      move(index);
    });
  }
}
addBoardListeners();
