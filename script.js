let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let turn0 = true; //playerX, playerO
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turn0) { 
      box.innerText = "O";
      box.style.color=" yellow";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color=" blue";
      turn0 = true;
    }
    
    box.disabled = true;
    checkWinners();
    if (count == 9) {
      msg.innerText = `Match Draw, winner is none `;
      msgContainer.classList.remove("hide");
      count=0;
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congrats, winner is ${winner} 🎊`;
  msgContainer.classList.remove("hide");
};

const checkWinners = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        disableBoxes();
        showWinner(pos1val);
        count=0;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
