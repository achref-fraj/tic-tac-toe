// Global variables
const container = document.getElementById("container");
let array = [];
let XO = true;
const Xclass = "X";
const Oclass = "O";
const player1 = document.getElementById("input1");
const player2 = document.getElementById("input2");
const btnNext = document.getElementById("btnNext");
const arrayOfInputs = document.querySelectorAll("input");
let plyer1Choose = "";
let plyer2Choose = "";
const WINNING_COMBINTAIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
  [2, 4, 6],
  [0, 4, 8],
];

/// get started button

btnNext.onclick = () => {
  if (check()) {
    document.querySelector(".starter").remove();
    document.getElementById("title").remove();
    localStorage.setItem(
      "info",
      JSON.stringify([
        { player1: player1.value, plyer1Choose, result: 0 },
        { player2: player2.value, plyer2Choose, result: 0 },
      ])
    );

    document.getElementById(
      "playerNmae1"
    ).innerText = `${player1.value}:  ${plyer1Choose}`;
    document.getElementById(
      "playerNmae2"
    ).innerText = `${player2.value}:  ${plyer2Choose}`;

    document.querySelector(".result").style.display = "flex";
    container.style.display = "flex";
    for (let i = 1; i <= 9; i++) {
      container.innerHTML += `<div class="square" id=${i} onClick="FillXorO(this)"></div>`;
    }
  }
};
// check the filed if it's empty
const checkIfEmpty = (id) => {
  const elm = document.getElementById(id);
  if (elm.innerText === "") {
    return true;
  }
  return false;
};

// fill the fileds either X or O
const FillXorO = (that) => {
  if (checkIfEmpty(that.id)) {
    that.innerText = XO ? plyer1Choose : plyer2Choose;

    that.classList.add(that.innerText === "O" ? Oclass : Xclass);
    array[that.id - 1] = document.getElementById(that.id);
    XO = !XO;
    calcResult(that.classList[1]);
  }
  return;
};

// calcul game result

// check the forum if it's filled correctly
const check = () => {
  let bool = true;
  if (player1.value.length === 0) {
    const newDiv = document.createElement("div");
    newDiv.innerText = "player1 please enter your names";
    newDiv.classList.add("error");
    arrayOfInputs[0].after(newDiv);
    bool = false;
    setTimeout(() => {
      newDiv.remove();
    }, 3000);
  }

  if (player2.value.length === 0) {
    const newDiv1 = document.createElement("div");
    newDiv1.innerText = "player2 please enter your names";
    newDiv1.classList.add("error");
    arrayOfInputs[1].after(newDiv1);
    bool = false;
    setTimeout(() => {
      newDiv1.remove();
    }, 3000);
  }

  if (arrayOfInputs[2].checked) {
    plyer1Choose = arrayOfInputs[2].value;
  } else if (arrayOfInputs[3].checked) {
    plyer1Choose = arrayOfInputs[3].value;
  } else if (
    arrayOfInputs[2].checked == false &&
    arrayOfInputs[3].checked == false
  ) {
    const newDiv1 = document.createElement("div");
    newDiv1.innerText = " please player1 choose X or O";
    newDiv1.classList.add("error");
    document.getElementById("last1").after(newDiv1);
    setTimeout(() => {
      newDiv1.remove();
    }, 3000);
    bool = false;
  }

  if (arrayOfInputs[4].checked) {
    plyer2Choose = arrayOfInputs[2].value;
  } else if (arrayOfInputs[5].checked) {
    plyer2Choose = arrayOfInputs[3].value;
  } else if (
    arrayOfInputs[4].checked == false &&
    arrayOfInputs[5].checked == false
  ) {
    const newDiv1 = document.createElement("div");
    newDiv1.innerText = " please player2 choose X or O";
    newDiv1.classList.add("error");
    document.getElementById("last").after(newDiv1);
    setTimeout(() => {
      newDiv1.remove();
    }, 3000);
    bool = false;
  }
  if (plyer1Choose === plyer2Choose) {
    bool = false;
  }
  return bool;
};

///reset the game
const Reset = () => {
  const elm = document.querySelectorAll(".square");
  for (let i = 0; i < elm.length; i++) {
    if (elm[i].classList[1]) {
      elm[i].innerText = "";
      elm[i].classList.remove(elm[i].classList[1]);
    }
  }
  array = [];
  return (XO = true);
};

// Result calc function

const calcResult = (currentCLass) => {
  document.getElementById("restartButton").addEventListener("click", () => {
    Reset();
    document.getElementById("winningMessage").style.display = "none";
  });
  for (let val of WINNING_COMBINTAIONS) {
    if (array[val[0]] && array[val[1]] && array[val[2]]) {
      if (
        array[val[0]].classList[1] == currentCLass &&
        array[val[1]].classList[1] == currentCLass &&
        array[val[2]].classList[1] == currentCLass
      ) {
        document.getElementById("winner").innerText =
          currentCLass === plyer1Choose
            ? player1.value + " win!"
            : player2.value + " win!";
        document.getElementById("winningMessage").style.display = "flex";
        const data = JSON.parse(localStorage.getItem("info"));
        if (currentCLass === data[0].plyer1Choose) {
          data[0].result = data[0].result + 1;
        } else {
          data[1].result = data[1].result + 1;
        }
        localStorage.setItem("info", JSON.stringify(data));
        document.getElementById("score1").innerText = data[0].result;
        document.getElementById("score2").innerText = data[1].result;
        return;
      }
    }
  }
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      count = count + 1;
    }
  }
  if (count === 9) {
    document.getElementById("winningMessage").style.display = "flex";
    return (document.getElementById("winner").innerText = "Tie!");
  }
};
