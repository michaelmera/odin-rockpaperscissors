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
        addStar('computer', ComputerScore);
        return;
    }

    if (playerSelection == computerSelection) {
        return;
    }

    if (beats(playerSelection, computerSelection)) {
        PlayerScore += 1;
        addStar('player', PlayerScore);
    } else {
        ComputerScore += 1;
        addStar('computer', ComputerScore);
    }
}

function resetGame() {
    PlayerScore = 0;
    ComputerScore = 0;

    stars = document.querySelectorAll('.player-wrapper .star, .computer-wrapper .star');
    stars.forEach((s) => s.textContent = '★');
}

function updateScore(playerScore, computerScore, message = '') {
    score = document.querySelector('div.score');
    score.textContent = `[${PlayerScore} - ${ComputerScore}] ${message}`;
}

function addStar(toWhom, number) {
    star = document.querySelector(`.${toWhom}-wrapper .star:nth-child(${number})`);
    star.textContent = '⭐';
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