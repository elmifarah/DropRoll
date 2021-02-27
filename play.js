const board = document.querySelector('main');
let squares;
let track;
let ballSpeed = 500;
let releaseSpeed = 3000;
let kill = false;
class Ball {
    position = 3;
    offset = 2;
    constructor() {
        let ball = document.createElement('div');
        ball.classList.add('ball');
        squares[this.position].appendChild(ball);
        this.move(ballSpeed, ball);
    }
    move(interval, ball) {
        let myInterval = setInterval(() => {
            squares[this.position].removeChild(ball);
            if (squares[this.position].classList.contains('switch-container')) this.offset = +squares[this.position].dataset.value;
            if (this.offset === 0) {
                this.position -= 7;
            } else if (this.offset === 1) {
                this.position += 1;
            } else if (this.offset === 2) {
                this.position += 7;
            } else {
                this.position -= 1;
            }
            squares[this.position].appendChild(ball);
            this.checkForHole(myInterval, ball);
        }, interval);
    }
    checkForHole(myInterval, ball) {
        if (squares[this.position].classList.contains('hole')) {
            squares[this.position].removeChild(ball);
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
    classes = '';
    constructor(p, d, o, a) {
        this.position = p;
        this.direction = d;
        this.options = o;
        this.classes = a;
        squares[p].dataset.value = o[d];
        squares[p].classList.add("switch-container")
        let mySwitch = document.createElement('button');
        mySwitch.classList.add('switch');
        squares[this.position].appendChild(mySwitch);
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
function makeTracks() {
    for (let i = 0; i < 70; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
        squares = document.querySelectorAll('.square');
        // square.textContent = i;
        if (i % 7 - 3 === 0 || i === 29 || i === 30 || i === 33 || i === 40 || i === 46 || i === 47) square.classList.add('track');
        if (i % 7 - 3 === 0 || i === 33 || i === 40) square.classList.add('vertical');
        if (i === 29 || i === 30 || i === 46 || i === 47) square.classList.add('horizontal');
    }
}
function randNum() {
    return Math.floor(Math.random() * 4);
}
function ballInterval() {
    if (!kill) {
        new Ball();
        setTimeout(ballInterval, releaseSpeed);
    }
}
makeTracks();
new Hole(66);
new Hole(28);
new Hole(48);
new Hole(26);
new Switch(31, 0, [2, 3], 'top-and-left');
new Switch(45, 1, [1, 2], 'top-and-right');
new Switch(47, 1, [0, 1], 'top-and-left');
new Ball();
setTimeout(ballInterval, releaseSpeed);
document.addEventListener('keyup', function(event) {
    if (event.key === 'k') {
        kill = !kill;
        if (!kill) setTimeout(ballInterval, releaseSpeed);
    }
});