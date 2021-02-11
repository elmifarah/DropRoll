const board = document.querySelector('main');
const scorecard = document.querySelector('#score');
const ballColors = ['blue', 'red', 'green', 'goldenrod'];
const holeColors = ['darkblue', 'darkred', 'darkgreen', 'darkgoldenrod'];
let score = 0;
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
        if (i % 7 - 3 === 0 || i === 29 || i === 30 || i === 33 || i === 40 || i === 46 || i === 47) square.classList.add('track');
    }
}

function randomColor() {
    const number = Math.floor(Math.random() * 4);
    console.log(number);
    return ballColors[number];
}

class Ball {
    position = 3;
    offset = 2;
    color = '';
    constructor() {
        this.color = randomColor();
        squares[this.position].classList.add('ball');
        squares[this.position].classList.add(this.color);
    }
    move(interval) {
        let myInterval = setInterval(() => {
            squares[this.position].classList.remove('ball');
            squares[this.position].classList.remove(this.color);
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
            squares[this.position].classList.add(this.color);
            this.checkForHole(myInterval);
        }, interval);
    }
    checkForHole(myInterval) {
        if (squares[this.position].classList.contains('hole')) {
            squares[this.position].classList.remove(this.color);
            clearInterval(myInterval);
            if (squares[this.position].dataset.color === this.color) {
                score++;
            } else {
                score--;
            }
            scorecard.textContent = score;
        }
    }
}

class Hole {
    constructor(p, hc, bc) {
        this.position = p;
        squares[this.position].classList.add('hole');
        squares[this.position].classList.add(hc);
        squares[this.position].dataset.color = bc;
    }
}

class Switch {
    position = 0;
    direction = 0;
    options = [];
    constructor(p, d, t) {
        this.position = p;
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
    }
}

makeBoard();
new Hole(66, holeColors[0], ballColors[0]);
new Hole(28, holeColors[1], ballColors[1]);
new Hole(48, holeColors[2], ballColors[2]);
new Hole(26, holeColors[3], ballColors[3]);
new Switch(31, 0, [2, 3]);
new Switch(45, 1, [1, 2]);
new Switch(47, 1, [0, 1]);
new Ball().move(ballSpeed);

let ballInterval = function() {
    new Ball().move(ballSpeed);
    if (score > 25) {
        releaseSpeed = 1000;
    } else if (score > 20) {
        releaseSpeed = 1600;
    } else if (score > 15) {
        releaseSpeed = 2100;
    } else if (score > 10) {
        releaseSpeed = 2500;
    } else if (score > 5) {
        releaseSpeed = 2800;
    }
    if (!kill) {
        if (score > -5) setTimeout(ballInterval, releaseSpeed);
    }
}
setTimeout(ballInterval, releaseSpeed);

document.addEventListener('keyup', function(event) {
    if (event.key === 'k') kill = !kill;
    if (!kill) setTimeout(ballInterval, releaseSpeed);
});
