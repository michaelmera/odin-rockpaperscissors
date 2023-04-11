const choices = ['rock', 'paper', 'scissors'];

let state = {
    playerScore: 0,
    computerScore: 0,
}

const SCREENS = {
    'menu': {
        'init': init_menu,
        'hide': ((s) => undefined),
        'show': ((s) => undefined),
    },
    'play': {
        'init': init_play,
        'hide': ((s) => undefined),
        'show': show_play,
        'playerMove': ((s, move) => resolveMove(s, move)),
    },
    'over': {
        'init': init_over,
        'hide': ((s) => undefined),
        'show': show_over,
    },
};


let game = {
    'screens': {},
    'current': undefined,
    'register': function (name, screen) {
        this.screens[name] = screen;
        screen.init(state);
        this.hide(name);
    },
    'dispatch': function (event, ...args) {
        if (event === 'init') {
            return;
        }

        if (Object.hasOwn(this.screens[this.current], event)) {
            this.screens[this.current][event](state, ...args);
        }
    },
    'hide': function (screenName) {
        if (!Object.hasOwn(this.screens, screenName)) {
            return;
        }

        this.screens[screenName].hide(state);
        document.querySelector(`#${screenName}`).style.display = 'none';
    },
    'show': function (screenName) {
        if (!Object.hasOwn(this.screens, screenName)) {
            return;
        }

        if (this.current !== undefined) {
            this.hide(this.current);
        }

        this.current = screenName;
        this.screens[this.current].show(state);

        document.querySelector(`#${screenName}`).style.display = 'flex';
    }
}

for (const [name, screen] of Object.entries(SCREENS)) {
    game.register(name, screen);
}

// initial state: display only MENU screen
game.show('menu');


function play(state, playerMove, computerMove = getComputerChoice()) {
    function addStar(toWhom, number) {
        star = document.querySelector(`.${toWhom}-wrapper .star:nth-child(${number})`);
        star.textContent = '⭐';
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

function init_menu(state) {
    document.querySelector('#menu button').addEventListener('click', (b) => {
        game.show('play');
    });
}

function init_play(state) {
    document.querySelectorAll('.player-wrapper button').forEach(
        (b) => b.addEventListener('click', clickListener)
    );

    function clickListener(e) {
        playerMove = this.dataset.move;
        if (!isValidChoice(playerMove)) {
            return;
        }

        game.dispatch('playerMove', playerMove);
    }
}

function show_play(state) {
    state.playerScore = 0;
    state.computerScore = 0;
    
    document.querySelectorAll('.player-wrapper .star, .computer-wrapper .star').forEach(
        (s) => s.textContent = '★'
    );
}

function resolveMove(state, move) {
    play(state, move);

    if (state.playerScore >= 5 || state.computerScore >= 5) {
        game.show('over');
    }
}

function init_over(state) {
    function resetListener(e) {
        game.show('play');
    }

    document.querySelector('#over .reset').addEventListener('click', resetListener);
}

function show_over(state) {
    let message = (state.playerScore > state.computerScore) ? 'You Won!' : 'You Lose!';
    document.querySelector('#over h1').textContent = message;
}