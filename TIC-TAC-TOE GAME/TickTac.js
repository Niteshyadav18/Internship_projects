// Step 1: Selecting elements from the DOM
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let count = document.querySelector(".box");
let turnO = true; // Indicates the turn of playerX and playerO

// Step 2: Define winning patterns for the Tic Tac Toe game
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Step 3: Function to reset the game
const resetGame = () => {
    turnO = true; // Reset the turn to playerO
    enableBoxes(); // Enable all boxes for a new game
    msgContainer.classList.add("hide"); // Hide the message container
};

// Step 4: Event listeners for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
       // console.log("Box was clicked");

        // Step 5: Alternate between playerO and playerX turns
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }

        box.disabled = true; // Disable the clicked box

        // Step 6: Check for a winner after each move
        checkWinner();
    });
});

// Step 7: Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Step 8: Function to enable all boxes and reset their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

// Step 9: Function to display the winner and disable boxes
const showWinner = (winner) => {
    msg.innerHTML = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Step 10: Function to check for a winner based on winPatterns
const checkWinner = () => {
    for (let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerHTML;
        let pos2Val = boxes[patterns[1]].innerHTML;
        let pos3Val = boxes[patterns[2]].innerHTML;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                // Step 11: Display winner if a winning pattern is found

                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }

    // Step 12: Check for a draw if all boxes are filled

    if (Array.from(boxes).every((box) => box.innerHTML !== "")) {
        msg.innerHTML = "It's a draw! Play Again";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

// Step 13: Event listeners for the new game and reset buttons

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


