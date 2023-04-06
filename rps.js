const choices = ['rock', 'paper', 'scissors'];
let PlayerScore = 0;
let ComputerScore = 0;

resetGame();

document.querySelectorAll('button').forEach(
    (b) => b.addEventListener('click', clickListener)
);

function clickListener(e) {
    playerSelection = this.dataset.move;
    play(playerSelection);

    let message;
    if (PlayerScore == ComputerScore) {
        message = `You're as strong as the computer!`;
    } else if (PlayerScore > ComputerScore) {
        message = `You have beaten the computer. Congrats!`;
    } else {
        message = `You lose. Try again`;
    }

    updateScore(PlayerScore, ComputerScore, message);

    if (PlayerScore == 5) {
        score = document.querySelector('div.score');
        score.textContent = 'You Won!'
        resetGame();
    }

    if (ComputerScore == 5) {
        score = document.querySelector('div.score');
        score.textContent = 'You Lose!'
        resetGame();
    }
}

function play(playerSelection, computerSelection = getComputerChoice()) {
    if (!isValidChoice(playerSelection)) {
        ComputerScore += 1;
        return;
    }

    if (playerSelection == computerSelection) {
        return;
    }

    if (beats(playerSelection, computerSelection)) {
        PlayerScore += 1;
    } else {
        ComputerScore += 1;
    }
}

function resetGame() {
    PlayerScore = 0;
    ComputerScore = 0;
}

function updateScore(playerScore, computerScore, message = '') {
    score = document.querySelector('div.score');
    score.textContent = `[${PlayerScore} - ${ComputerScore}] ${message}`;
}

function beats(selection1, selection2) {
    const result = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper',
    };

    return (result[selection1] == selection2);
}

function getComputerChoice() {
    return choices[Math.floor(Math.random()*choices.length)];
}

function getPlayerChoice() {
    let choice = (prompt('Enter your choice (rock/paper/scissors):') ?? '').toLowerCase();

    return choice;
}

function isValidChoice(choice) {
    return (choices.includes(choice));
}