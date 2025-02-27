// Adding styles dynamically
const style = document.createElement("style");
style.innerHTML = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  transition: all .3s ease-in-out;
  text-align: center;
  color:blue;
}

body {
  //background-image: linear-gradient(to right top, #062452, #0a1f4e, #0d1a49, #101545, #130f40);
  height: 100%;
  background-color: #e0f7ff;
  min-height: 100vh;
}

h1 {
  margin-top: 20px;
}

.container {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game {
  padding: 10px;
  border-radius: 1rem;
  height: 65vmin;
  width: 65vmin;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.7vmin;
  border: none;
  background-color: white;
  box-shadow:inset 0px 0px 10px rgba(0,0,0,.7);
}

.box {
  height: 18vmin;
  width: 18vmin;
  border:none;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgb(43, 0, 255);
  background:rgba(255,255,255,.8); /* Gradient for depth */
  
  border-radius: 10px; 
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15), inset 0px 0px 15px rgba(0,0,0,.3); /* Shadow for depth */
  backdrop-filter: blur(70px);
  //animation: drop .1s infinite;
}
/* Animation for the droplet */
@keyframes drop {
  0%, 100% {
    transform: translateY(0);
    transform: scale(1);
  }
  50% {
    transform: translateY(.1px); /* Slight upward movement */
    transform: scale(1.001);
  }
}
.reset-btn {
  padding: 7px;
  max-width: auto;
  max-height: auto;
  background-color: #525252;
  color: white;
  border-radius: 1rem;
  font-size: 1.2rem;
  text-shadow: 0px 0px 5px rgb(128, 255, 0);
}

#new-btn {
  padding: 7px;
  max-width: auto;
  max-height: auto;
  background-color: rgb(153, 248, 0);
  color: blue;
  border-radius: 1rem;
  font-size: 1.2rem;
  text-shadow: 0px 0px 10px cyan;
  margin: 10px 0px 10px 0px;
}

.msg {
  font-size: 1.5rem;
  text-align: justify;
  color: #ffffc7;
  font-weight: 800;
  font-family: sans-serif;
  text-shadow: 0px 0px 5px rgba(255, 0, 0, 0.462);
}

.msg-container {
  height: 100vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
}

.hide {
  display: none;
}

#footer {
  margin-top: 55px;
}
`;
document.head.appendChild(style);

// JavaScript logic for the game (remains the same as you provided)
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
      box.style.color = "orange";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "blue";
      turn0 = true;
    }

    box.disabled = true;
    checkWinners();
    if (count == 9) {
      msg.innerText = `Match Draw, winner is none`;
      msgContainer.classList.remove("hide");
      count = 0;
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
        count = 0;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
