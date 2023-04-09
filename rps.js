const choices = ['rock', 'paper', 'scissors'];

const SCREENS = {
    MENU: 'menu',
    PLAY: 'play',
    OVER: 'over',
};

hide('play');
hide('over');

document.querySelector('#menu button').addEventListener('click', (b) => {
    hide('menu');
    show('play');
});

let state = {
    playerScore: 0,
    computerScore: 0,
}

resetGame();

document.querySelectorAll('.player-wrapper button').forEach(
    (b) => b.addEventListener('click', clickListener)
);

document.querySelector('#reset').addEventListener('click', resetListener);

function clickListener(e) {
    play(this.dataset.move);

    if (state.playerScore >= 5) {
        document.querySelector('#over h1').textContent = 'You Won!';
        hide('play');
        show('over');
    }

    if (state.computerScore >= 5) {
        document.querySelector('#over h1').textContent = 'You Lose!';
        hide('play');
        show('over');
    }
}

function resetListener(e) {
    resetGame();
    hide('over');
    show('play');
}

function play(playerMove, computerMove = getComputerChoice()) {
    if (!isValidChoice(playerMove)) {
        state.computerScore += 1;
        addStar('computer', state.computerScore);
        return;
    }

    if (playerMove == computerMove) {
        return;
    }

    if (beats(playerMove, computerMove)) {
        state.playerScore += 1;
        addStar('player', state.playerScore);
    } else {
        state.computerScore += 1;
        addStar('computer', state.computerScore);
    }
}

function resetGame() {
    state.playerScore = 0;
    state.computerScore = 0;

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

function isValidChoice(choice) {
    return (choices.includes(choice));
}

function show(screen) {
    document.querySelector(`#${screen}`).style.display = 'flex';
}

function hide(screen) {
    document.querySelector(`#${screen}`).style.display = 'none';
}
