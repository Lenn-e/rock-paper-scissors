const CHOICES = ["rock", "paper", "scissors"];
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const roundResultMessage = document.querySelector("#round-message");
const buttons = document.querySelectorAll("div#choices>button");
const resetButton = document.querySelector("#reset-game");
let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function updateScore() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function updateRoundResultMessage(message) {
    roundResultMessage.textContent = message;
}

function checkForWinner() {
    return playerScore > 4 || computerScore > 4
}

function updateWinnerMessage() {
    if(playerScore > computerScore) {
        roundResultMessage.textContent = "Congratulations, you won the match!";
    }
    roundResultMessage.textContent = "The computer won the match, better luck next time.";
}

function resetGameState() {
    buttons.forEach((button) => {
        button.disabled = false;
    });
    playerScore = 0;
    computerScore = 0;
    updateScore();
    roundResultMessage.textContent = "Pick your weapon!";
    resetButton.style.display = 'none';
}

function playRound(event) {
    playerSelection = event.target.textContent.toLowerCase();
    computerSelection = computerPlay();

    console.log(playerSelection, computerSelection);

    if(playerSelection === "rock") {
        if(computerSelection === "rock") {
            updateRoundResultMessage("It's a draw.");
        } else if(computerSelection === "paper") {
            computerScore++;
            updateRoundResultMessage("Paper beats rock, you lose this round.");
        } else {
            playerScore++;
            updateRoundResultMessage("Rock beats scissors, you win this round!");
        }
    } else if(playerSelection === "paper") {
        if(computerSelection === "rock") {
            playerScore++;
            updateRoundResultMessage("Paper beats rock, you win this round!");
        } else if(computerSelection === "paper") {
            updateRoundResultMessage("It's a draw.");
        } else {
            computerScore++;
            updateRoundResultMessage("Scissors beat paper, you lose this round.");
        }
    } else if(playerSelection === "scissors") {
        if(computerSelection === "rock") {
            computerScore++;
            updateRoundResultMessage("Rock beats scissors, you lose this round.");
        } else if(computerSelection === "paper") {
            playerScore++;
            updateRoundResultMessage("Scissors beat paper, you win this round!");
        } else {
            updateRoundResultMessage("It's a draw.");
        }
    }

    updateScore();

    if(checkForWinner()) {
        updateWinnerMessage();

        buttons.forEach((button) => {
            button.disabled = true;
        });

        resetButton.style.display = 'block';
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", playRound);
});

resetButton.addEventListener("click", resetGameState);