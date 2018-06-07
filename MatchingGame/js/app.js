var initialTime = 10;
var initalLevel = 1;
var numberOfFaces = 5;
var count = 0;
var points = 0;
//console.log(initialTime);

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var flexContainer = document.getElementById('flex-container');

//console.log(windowHeight);
//console.log(windowWidth);
//console.log(flexContainer);

var timeBox = document.getElementById('time');
//console.log(timeBox);

timeBox.innerHTML = initialTime;

var levelBox = document.getElementById('level');
var pointsBox = document.getElementById('points');
levelBox.innerHTML = initalLevel;
pointsBox.innerHTML = points;

var startBtn = document.getElementById('start-game');
var leftSide = document.getElementById('left-side');
var rightSide = document.getElementById('right-side');
var body = document.getElementsByTagName('body')[0];

//console.log(body);

window.addEventListener("load", setWindow);
startBtn.onclick = function () {
    startGame();
    //console.log(initialTime);
}

function setWindow() {
    flexContainer.style.height = windowHeight - 100 + 'px';
}

function startGame() {
    resetInitial();
    clearWindows();
    //resetValue(10,1,0); ovako smo pocetno htjeli zapisati, ali smo drukcije nastavili u restInitial()
    generateFaces();
    cloneFaces();
    counter(initialTime);
}

function counter(time) {
    startBtn.style.opacity = 0.5;
    startBtn.style.cursor = "default";
    startBtn.onclick = null;
    var loop = setInterval(counting, 1000);
    function counting() {
        time--;
        timeBox.innerHTML = time;
        if (time < 0) {
            clearInterval(loop);
            var restart = confirm("Game Over!\n\n" + "Your score is: " + points + "\nOn level: " + initalLevel + "\n\nDo you want to play again?");
            if (restart) {
                startGame();
            } else {
                body.onclick = null;
                resetInitial();
                clearWindows();
                startBtn.style.opacity = 1;
                startBtn.style.cursor = "pointer";
                startBtn.onclick = function () {
                    startGame();
                }
            }
        } else {
            leftSide.lastChild.onclick = function (event) {
                event.stopPropagation();
                clearInterval(loop);
                numberOfFaces += 5;
                initalLevel++;
                points = points + (2 * initalLevel);
                time = initialTime * (initalLevel / 2); // time + (initialTime * (initalLevel / 2));
                resetValue(time, initalLevel, points);
                count = 0;
                clearWindows();
                generateFaces();
                cloneFaces();
                counter(time);
            }
            body.onclick = function () {
                clearInterval(loop);
                var restart = confirm("Game Over!\n\n" + "Your score is: " + points + "\nOn level: " + initalLevel + "\n\nDo you want to play again?");
                if (restart) {
                    startGame();
                } else {
                    body.onclick = null;
                    leftSide.lastChild.onclick = null;
                    resetInitial();
                    clearWindows();
                    startBtn.style.opacity = 1;
                    startBtn.style.cursor = "pointer";
                    startBtn.onclick = function () {
                        startGame();
                    }
                }
            }
        }
    }
}

function resetInitial() {
    initialTime = 10;
    initalLevel = 1;
    numberOfFaces = 5;
    count = 0;
    points = 0;
    //timeBox.innerHTML = initialTime; mogli smo ovdje zapisati ali cemo u zasebnu fju - resetValues
    //levelBox.innerHTML = initialBox; mogli smo ovdje zapisati ali cemo u zasebnu fju - resetValues
    resetValue(initialTime, initalLevel, points); // mogli smo i ovako napraviti
}

function resetValue(time, level, points) {
    timeBox.innerHTML = time;
    levelBox.innerHTML = level;
    pointsBox.innerHTML = points;
}

function generateFaces() {
    while (count < numberOfFaces) {
        var randomTop = Math.random() * (windowHeight - 200);
        randomTop = Math.floor(randomTop);
        var randomLeft = Math.random() * ((windowWidth / 2) - 100); // 100 je slicica, za svaki slucaj 
        randomLeft = Math.floor(randomLeft);
        var face = document.createElement('img');
        face.src = 'img/smile.png';
        face.style.top = randomTop + 'px';
        face.style.left = randomLeft + 'px';
        leftSide.appendChild(face);
        count++;
        //console.log(randomTop);
        console.log(face);
    }
}
//console.log(Math.random()); // izbacuje random brojeve od 0 do 1

function cloneFaces(){
    var leftSideImages = leftSide.cloneNode(true);
    //console.log(leftSideImages);
    leftSideImages.removeChild(leftSideImages.lastChild);
    leftSideImages.removeAttribute('id');
    rightSide.appendChild(leftSideImages);
}

function clearWindows() {
    while (leftSide.firstChild) {
        leftSide.removeChild(leftSide.firstChild);
    }
    while (rightSide.firstChild) {
        rightSide.removeChild(rightSide.firstChild);
    }
}