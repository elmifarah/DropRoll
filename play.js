let board = document.querySelector('main');
let squares;
let track;
let ballSpeed = 500;
let releaseSpeed = 3000;
let kill = false;

function makeBoard() {
    for (let i = 0; i < 70; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
        squares = document.querySelectorAll('.square');
        square.textContent = i;
        if (i % 7 - 3 === 0 || i === 29 || i === 30 || i === 46 || i === 47) square.classList.add('track');
        if (i % 7 - 3 === 0) square.classList.add('vertical');
        if (i === 29 || i === 30 || i === 46 || i === 47) square.classList.add('horizontal');

    }
}

class Ball {
    position = 3;
    offset = 2;
    constructor() {
        squares[this.position].classList.add('ball');
    }
    move(interval) {
        let myInterval = setInterval(() => {
            squares[this.position].classList.remove('ball');
            if (squares[this.position].classList.contains('switch')) this.offset = +squares[this.position].dataset.value;
            if (this.offset === 0) {
                this.position -= 7;
            } else if (this.offset === 1) {
                this.position += 1;
            } else if (this.offset === 2) {
                this.position += 7;
            } else {
                this.position -= 1;
            }
            squares[this.position].classList.add('ball');
            this.checkForHole(myInterval);
        }, interval);
    }
    checkForHole(myInterval) {
        if (squares[this.position].classList.contains('hole')) {
            clearInterval(myInterval);
        }
    }
}

class Hole {
    constructor(p) {
        this.position = p;
        squares[this.position].classList.add('hole');
    }
}

class Switch {
    position = 0;
    direction = 0;
    options = [];
    constructor(p, d, t, a) {
        this.position = p;
        this.classes = a;
        this.direction = d;
        this.options = t;
        squares[p].dataset.value = t[d];
        squares[p].classList.add('switch');
        squares[p].addEventListener('click', () => this.redirect());
    }
    redirect() {
        if (this.options.length-1 === this.direction) {
            this.direction = 0;
        } else {
            this.direction++;
        }
        squares[this.position].dataset.value = this.options[this.direction];
        squares[this.position].classList.toggle(this.classes);

    }
}

makeBoard();
new Hole(66);
new Hole(28);
new Hole(48);
new Switch(31, 0, [2, 3], "top-and-left");
new Switch(45, 1, [1, 2], "top-and-right");
new Ball().move(ballSpeed);

let ballInterval = function() {
    new Ball().move(ballSpeed);
    if (!kill) {
        setTimeout(ballInterval, releaseSpeed);
    }
}
setTimeout(ballInterval, releaseSpeed);

document.addEventListener('keyup', function(event) {
    if (event.key === 'k') kill = !kill;
    if (!kill) setTimeout(ballInterval, releaseSpeed);
});
