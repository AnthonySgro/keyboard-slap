// q=[0][1], s=[1][2], b=[4][3], "/"=[9][3]
const keyboard = [
    ["1", "q", "a", "z"],
    ["2", "w", "s", "x"],
    ["3", "e", "d", "c"],
    ["4", "r", "f", "v"],
    ["5", "t", "g", "b"],
    ["6", "y", "h", "n"],
    ["7", "u", "j", "m"],
    ["8", "i", "k", ","],
    ["9", "o", "l", "."],
    ["0", "p", ";", "/"]
];

//returns the two indexes for 2d array per character
function coordinateGrabber(key) {
    let coordinates;
    keyboard.forEach((innerArray, index1) => {
        if (innerArray.includes(key)) {
            innerArray.forEach((value, index2) => {
                if (value === key) {
                    coordinates = [index1, index2];
                }
            });
        }
    });

    return coordinates;
}

//calculating distance...
function findDistance(char1, char2) {
    let c1 = coordinateGrabber(char1);
    let c2 = coordinateGrabber(char2);
    
    let term1 = (c1[0] - c2[0]) ** 2;
    let term2 = (c1[1] - c2[1]) ** 2;
    let distance = Math.sqrt(term1 + term2);
    return distance;
}

//picks a random key from the keyboard
function randomKeyGenerator() {
    let x = Math.floor(Math.random() * Math.floor(9));
    let y = Math.floor(Math.random() * Math.floor(3));
    return keyboard[x][y];
}

function randomKeyOf(arr) {
    return arr[Math.floor(Math.random() * Math.floor(arr.length))];
}

//returns two random adjacent keys
function findTwoCloseKeys(givenKey) {
    const minDistance = Math.sqrt(2) + .1;
    let allAdjacentKeys = [];

    keyboard.forEach((innerArray, i) => {
        innerArray.forEach((key2, j) => {
            if (findDistance(givenKey, key2) < minDistance && key2 != givenKey) {
                allAdjacentKeys.push(key2);
            }
        });
    });

    let firstPick = randomKeyOf(allAdjacentKeys);
    allAdjacentKeys.splice(allAdjacentKeys.indexOf(firstPick), 1);
    let secondPick = randomKeyOf(allAdjacentKeys);

    return [firstPick, secondPick, givenKey];
}

//let's play!
class Game {
    constructor() {
        this.key = randomKeyGenerator();
        this.keySet = findTwoCloseKeys(this.key);
        this.currentScore = 0;
        this.scoreAdd = 0;
        this.currentInput = [];
    }

    calculateRound() {
        let score = 0;
        let numCorrect = 0;
        let numIncorrect = 0;
        this.currentInput.forEach((value) => {
            if (this.keySet.includes(value)) {
                numCorrect += 1;
            } else {
                numIncorrect += 1;
            }
        });

        score += numCorrect;
        score -= numIncorrect;

        this.scoreAdd = score;
        this.currentScore += this.scoreAdd;
    }

    processInput(str) {
        this.currentInput = str.split("");
    }

    generateNewKeySet() {
        this.key = randomKeyGenerator();
        this.keySet = findTwoCloseKeys(this.key);
    }

}

function newGame() {
    return new Game();
}

let game = newGame();

// -------------------------HTML AFTER THIS------------------------

//Base cases on the document
document.getElementById('slap-this-key-display').innerHTML = "";

//when you submit mash...
let enterSubmitButton = document.getElementById('submit-mash');
enterSubmitButton.addEventListener('click', function() {
    let mashElement = document.getElementById('enter-mash');
    let mashValue = mashElement.value;
    mashElement.value = '';

    game.processInput(mashValue);
    game.calculateRound();
    game.generateNewKeySet();

    document.getElementById('slap-this-key-display').innerHTML = game.keySet
    document.getElementById('score').innerHTML = game.currentScore;
})

//when you start timer
let enterStartStopButton = document.getElementById('start-stop');
enterStartStopButton.addEventListener('click', function() {

    //submits slap every 3 seconds
    let submitAnswers = setInterval(function() {
        enterSubmitButton.click();
    }, 3000);

    let counter = 0;

    //updates countdown every second
    let countdown = setInterval(function() {
        counter++;
        document.getElementById('time-left').innerHTML = 60 - counter;
    }, 1000);

    //runs game for one minute
    setTimeout(function() {
        clearInterval(submitAnswers);
        clearInterval(countdown);
    }, 60000);
})

//logic of a game
/* console.log(game.keySet);
game.processInput("qwertyuiop");
console.log(game.currentInput);
game.calculateRound();
console.log(game.scoreAdd);
console.log(game.currentScore);

game.generateNewKeySet();
console.log(game.keySet);
game.processInput("qwertyuiop");
console.log(game.currentInput);
game.calculateRound();
console.log(game.scoreAdd);
console.log(game.currentScore);

game.generateNewKeySet();
console.log(game.keySet);
game.processInput("qwertyuiop");
console.log(game.currentInput);
game.calculateRound();
console.log(game.scoreAdd);
console.log(game.currentScore); */
