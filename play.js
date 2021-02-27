const board = document.querySelector('main');
const dimensions = [7, 10];
const verticalSquares = [33, 40];
const horizontalSquares = [29, 30, 46, 47];
const holes = [66, 28, 48, 26];
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
        ball.classList.add('color' + randNum());
        squares[this.position].appendChild(ball);
        this.move(ballSpeed, ball);

    }
    move(interval, ball) {
        let myInterval = setInterval(() => {
            squares[this.position].removeChild(ball);
            if (squares[this.position].classList.contains('switch-container')) this.offset = +squares[this.position].dataset.value;
            this.direction();
            squares[this.position].appendChild(ball);
            this.checkForHole(myInterval, ball);
        }, interval);
    }
    direction() {
        switch (this.offset) {
            case 0: this.position -= dimensions[0];
                break;
            case 1: this.position += 1;
                break;
            case 2: this.position += dimensions[0];
                break;
            case 3: this.position -= 1;
                break;
        }
    }
    checkForHole(myInterval, ball) {
        if (squares[this.position].classList.contains('hole')) {
            squares[this.position].removeChild(ball);
            clearInterval(myInterval);
        }
    }
}

class Hole {
    constructor(h,i) {
        this.position = h;
        squares[this.position].classList.add('hole');
        squares[this.position].classList.add('color' + i);
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
    const totalSquares = dimensions[0] * dimensions[1];
    for (let i = 0; i < totalSquares; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
        squares = document.querySelectorAll('.square');
        square.textContent = i.toString();
        if (isMainTrack(i) || verticalSquares.includes(i)) square.classList.add('track', 'vertical');
        if (horizontalSquares.includes(i)) square.classList.add('track', 'horizontal');
    }
}

function isMainTrack(i) {
    return i % dimensions[0] - Math.floor(dimensions[0] / 2) === 0;
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
holes.forEach((h,i) => new Hole(h,i));
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

