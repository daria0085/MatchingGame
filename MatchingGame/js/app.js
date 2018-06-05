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
    //resetValue(10,1,0); ovako smo pocetno htjeli zapisati, ali smo drukcije nastavili u restInitial()
    generateFaces();
    cloneFaces();
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