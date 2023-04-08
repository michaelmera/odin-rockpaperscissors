const SCREENS = {
    MENU: 'menu',
    PLAY: 'play',
    OVER: 'over',
};

document.querySelectorAll('#menu, #play, #over').forEach(screen => {
    screen.style.display = 'none'
});

screen = SCREENS.MENU

switch (screen) {
    case SCREENS.MENU:
        document.querySelector('#menu').style.display = 'flex';
        break;
    case SCREENS.PLAY:
        document.querySelector('#play').style.display = 'flex';
        break;
    case SCREENS.OVER:
        document.querySelector('#over').style.display = 'flex';
}

document.querySelector('#menu button').addEventListener('click', (b) => {
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#play').style.display = 'flex';
});


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
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#over').style.display = 'flex';
    }

    if (ComputerScore >= 5) {
        score = document.querySelector('#over');
        document.querySelector('#over h1').textContent = 'You Lose!';
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#over').style.display = 'flex';
    }
}

function resetListener(e) {
    resetGame();
    document.querySelector('#over').style.display = 'none';
    document.querySelector('#play').style.display = 'flex';
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