const STATES = {
    MENU: 'menu',
    PLAY: 'play',
    OVER: 'over',
};


const choices = ['rock', 'paper', 'scissors'];
let PlayerScore = 0;
let ComputerScore = 0;

resetGame();

document.querySelectorAll('.player-wrapper button').forEach(
    (b) => b.addEventListener('click', clickListener)
);

document.querySelector('#reset').addEventListener('click', resetListener);

function clickListener(e) {
    playerSelection = this.dataset.move;
    play(playerSelection);

    if (PlayerScore >= 5) {
        score = document.querySelector('#over');
        document.querySelector('#over h1').textContent = 'You Won!';
        score.classList.add('modal');
    }

    if (ComputerScore >= 5) {
        score = document.querySelector('#over');
        document.querySelector('#over h1').textContent = 'You Lose!';
        score.classList.add('modal');
    }
}

function resetListener(e) {
    resetGame();
    score = document.querySelector('#over');
    score.classList.remove('modal');
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