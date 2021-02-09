let board = document.querySelector('main');
let squares;
let track;
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

class Ball {
    constructor() {
        this.position = 3;
        this.offset = 7;
        squares[this.position].classList.add('ball');
    }
    move(interval) {
        let myInterval = setInterval(() => {
            squares[this.position].classList.remove('ball');
            this.position += this.offset;
            squares[this.position].classList.add('ball');
            if (squares[this.position].classList.contains('hole')) clearInterval(myInterval);
        }, interval);
    }
}

class Hole {
    constructor(p) {
        this.position = p;
        squares[this.position].classList.add('hole');
    }
}

makeBoard();
new Ball().move(intervalTime);
new Hole(24);