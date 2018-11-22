const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const FPS = 50;
const WINNING_SCORE = 5;
let showWinScreen = false;
let ballGoingTo = {
    x: 0,
    y: 0
};
let ball = {
    radius: 5,
    position: {
        x: canvas.width/2,
        y: 195
        //y: canvas.height/2
    },
    speed: {
        x: -20,
        y: 0
    },
    color: 'white'
};
let player1 = {
    width: 10,
    height: 100,
    position: {
        x: 0,
        y: (canvas.height / 2) - 50
    },
    color: 'white',
    score: 0
};
let player2 = {
    width: 10,
    height: 100,
    position: {
        x: canvas.width - 10,
        y: (canvas.height / 2) - 50
    },
    color: 'white',
    score: 0,
    speed: 12
};

// let willCome = {
//   x: 0,
//   y: canvas.height/2,
// };
