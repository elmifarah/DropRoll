let board = document.querySelector('main');
let squares;
let track;
let ball;
let interval = 0;
let intervalTime = 1000;

function makeBoard() {
    for (let i = 0; i < 70; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
        squares = document.querySelectorAll('.square');
        if (i % 7 - 3 === 0) square.classList.add('track');
    }
}

function makeBall() {
    ball = 3;
    squares[ball].classList.add('ball');
}

function makeInterval() {
    interval = setInterval(move, intervalTime);
}

function move() {
    squares[ball].classList.remove('ball');
    ball+=7;
    squares[ball].classList.add('ball');
}

makeBoard();
makeBall();
makeInterval();