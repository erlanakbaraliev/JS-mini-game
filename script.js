const gridLocs = new Set();
// 3rd requirement
// Game board: The player's figure is placed in the centre of the board (1 point)
var player = document.createElement("img");
player.src = 'Assets/Player.png';
player.alt = 'Player';

var stargate = document.createElement("img")
stargate.src = 'Assets/Stargate.png';
stargate.alt = 'Stargate';

var playerLoc = 13;
document.getElementById(`item${playerLoc}`).appendChild(stargate);
document.getElementById(`item${playerLoc}`).appendChild(player);

// 4th requirement
// Movement: The figure can move to one of the adjacent squares. (2 points)
document.addEventListener("keydown", (event) => {
    if(!gameEnd()) {
        if (event.code == "ArrowLeft" && playerLoc > 1) {
            document.getElementById(`item${playerLoc-1}`).appendChild(player);
            playerLoc -= 1;        
            actionP.textContent = parseInt(actionP.textContent) - 1;
        } else if (event.code == "ArrowRight" && playerLoc < 25) {
            document.getElementById(`item${playerLoc+1}`).appendChild(player);
            playerLoc += 1;
            actionP.textContent = parseInt(actionP.textContent) - 1;
        } else if (event.code == "ArrowUp" && playerLoc > 5) {
            document.getElementById(`item${playerLoc-5}`).appendChild(player);
            playerLoc -= 5;
            actionP.textContent = parseInt(actionP.textContent) - 1;
        } else if (event.code == "ArrowDown" && playerLoc < 21) {
            document.getElementById(`item${playerLoc+5}`).appendChild(player);
            playerLoc += 5;
            actionP.textContent = parseInt(actionP.textContent) - 1;
        }
        if (parseInt(actionP.textContent) == 0 ) {
            waterSupply.textContent = parseInt(waterSupply.textContent) - 1;
            actionP.textContent = 3;
        }
    }
})

// 5th requirement
// Digging: We can reveal the field element on which the player stands and what is indicated under it. (2 points)

// Inserting COMPONENTS
var components = []
var componentsLocs = []

for(let i = 0; i < 3; i++) {
    components[i] = document.createElement('img');
    components[i].src = `Assets/Item ${i+1}.png`
    components[i].alt = `Item ${i+1}`;

    componentsLocs[i] = Math.round(Math.random() * 24) + 1;
    while(gridLocs.has(componentsLocs[i])) {
        componentsLocs[i] = Math.round(Math.random() * 24) + 1;
    }
    gridLocs.add(componentsLocs[i]);
    document.getElementById(`item${componentsLocs[i]}`).appendChild(components[i]);
    components[i].style.visibility = 'hidden';
}

// Inserting CLUES
var cluesLocs = [];
var clues = []

for(let i = 0; i < 3; i++) {
    var rightLeft = 0;
    if (componentsLocs[i] <= 5) {
        rightLeft = randIntBetween(1, 5)
        while(gridLocs.has(rightLeft)) {
            rightLeft = randIntBetween(1, 5)
        }
    } else if (componentsLocs[i] <= 10) {
        rightLeft = randIntBetween(6, 10)
        while(gridLocs.has(rightLeft)) {
            rightLeft = randIntBetween(6, 10)
        }
    } else if (componentsLocs[i] <= 15) {
        rightLeft = randIntBetween(11, 15)   
        while(gridLocs.has(rightLeft)) {
            rightLeft = randIntBetween(11, 15)
        }
    } else if (componentsLocs[i] <= 20) {
        rightLeft = randIntBetween(16, 20);
        while(gridLocs.has(rightLeft)) {
            rightLeft = randIntBetween(16, 20)
        }
    } else if (componentsLocs[i] <= 25) {
        rightLeft = randIntBetween(21, 25);
        while(gridLocs.has(rightLeft)) {
            rightLeft = randIntBetween(21, 25)
        }
    }
    gridLocs.add(rightLeft);
    cluesLocs.push(rightLeft);
    if (rightLeft < componentsLocs[i]) {
        var clue = document.createElement("img");
        clue.src = `Assets/Item ${i+1} - clue_RIGHT.png`;
        clue.alt = `Clue ${i+1} right`;

        document.getElementById(`item${rightLeft}`).appendChild(clue);
        clue.style.visibility = 'hidden';
        clues.push(clue);
    } else {
        var clue = document.createElement("img");
        clue.src = `Assets/Item ${i+1} - clue_LEFT.png`;
        clue.alt = `Clue ${i+1} left`;

        document.getElementById(`item${rightLeft}`).appendChild(clue);
        clue.style.visibility = 'hidden';
        clues.push(clue);
    }
}
const column1 = [1,6,11,16,21]
const column2 = [2,7,12,17,22]
const column3 = [3,8,13,18,23]
const column4 = [4,9,14,19,24]
const column5 = [5,10,15,20,25]
for(let i = 0; i < 3; i++) {
    var RandTopBottom = 0;
    if(column1.includes(componentsLocs[i])) {
        RandTopBottom = getUniqueNumFromArray(column1);
    } else if (column2.includes(componentsLocs[i])) {
        RandTopBottom = getUniqueNumFromArray(column2);
    } else if (column3.includes(componentsLocs[i])) {
        RandTopBottom = getUniqueNumFromArray(column3);
    } else if (column4.includes(componentsLocs[i])) {
        RandTopBottom = getUniqueNumFromArray(column4);
    } else if (column5.includes(componentsLocs[i])) {
        RandTopBottom = getUniqueNumFromArray(column5);
    }

    gridLocs.add(RandTopBottom);
    cluesLocs.push(RandTopBottom);

    if(RandTopBottom < componentsLocs[i]) {
        var clueLookDown = document.createElement("img");
        clueLookDown.src = `Assets/Item ${i+1} - clue_DOWN.png`;
        clueLookDown.alt = `Clue ${i+1} down`;

        document.getElementById(`item${RandTopBottom}`).appendChild(clueLookDown);
        clueLookDown.style.visibility = 'hidden'
        clues.push(clueLookDown);
    } else {
        var clueLookUp = document.createElement("img");
        clueLookUp.src = `Assets/Item ${i+1} - clue_UP.png`
        clueLookUp.alt = `Clue ${i+1} up`;

        document.getElementById(`item${RandTopBottom}`).appendChild(clueLookUp);
        clueLookUp.style.visibility = 'hidden';
        clues.push(clueLookUp);
    }
}

function getUniqueNumFromArray(column) {
    let uniqN = column[Math.floor(Math.random() * column.length)];
    while(gridLocs.has(uniqN)) {
        uniqN = column[Math.floor(Math.random() * column.length)];
    }
    return uniqN;
}

function randIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 2nd requirement
// Game board: Oases appear in a random place on the same board (2 points)
var threegridLocs = [];

var oasisM1 = document.createElement("img");
oasisM1.src = 'Assets/Oasis marker.png';
oasisM1.alt = 'Oasis marker';


var oasisMLoc1 = Math.round(Math.random() * 24) + 1;
while (gridLocs.has(oasisMLoc1)) {
    oasisMLoc1 = Math.round(Math.random() * 24) + 1;
}
document.getElementById(`item${oasisMLoc1}`).appendChild(oasisM1);
gridLocs.add(oasisMLoc1);
threegridLocs.push(oasisMLoc1);
// --------------------------------------------------------
var oasisM2 = document.createElement("img");
oasisM2.src = 'Assets/Oasis marker.png';
oasisM2.alt = 'Oasis2';

var oasisMLoc2 = Math.round(Math.random() * 24) + 1;
while (gridLocs.has(oasisMLoc2)) {
    oasisMLoc2 = Math.round(Math.random() * 24) + 1;
}
gridLocs.add(oasisMLoc2);
threegridLocs.push(oasisMLoc2);
document.getElementById(`item${oasisMLoc2}`).appendChild(oasisM2);
// --------------------------------------------------------
var oasisM3 = document.createElement("img");
oasisM3.src = 'Assets/Oasis marker.png';
oasisM3.alt = 'Oasis3';

var oasisMLoc3 = Math.round(Math.random() * 24) + 1;
while (gridLocs.has(oasisMLoc3)) {
    oasisMLoc3 = Math.round(Math.random() * 24) + 1;
}
gridLocs.add(oasisMLoc3);
threegridLocs.push(oasisMLoc3);
document.getElementById(`item${oasisMLoc3}`).appendChild(oasisM3);
// --------------------------------------------------------
var oasisM4 = document.createElement("img");
oasisM4.src = 'Assets/Oasis marker.png';
oasisM4.alt = 'Oasis3';

var oasisMLoc4 = Math.round(Math.random() * 24) + 1;
while (gridLocs.has(oasisMLoc4)) {
    oasisMLoc4 = Math.round(Math.random() * 24) + 1;
}
gridLocs.add(oasisMLoc4);
threegridLocs.push(oasisMLoc4);
document.getElementById(`item${oasisMLoc4}`).appendChild(oasisM4);

// Inserting OASISES
var oasises = [];


var oasis1 = document.createElement("img");
oasis1.src = "Assets/Oasis.png";
oasis1.alt = "Oasis1";

document.getElementById(`item${oasisMLoc1}`).appendChild(oasis1);
oasis1.style.visibility = 'hidden';
// --------------------------------------------------------
var oasis2 = document.createElement("img");
oasis2.src = "Assets/Oasis.png";
oasis2.alt = "Oasis2";

document.getElementById(`item${oasisMLoc2}`).appendChild(oasis2);
oasis2.style.visibility = 'hidden';
// --------------------------------------------------------
var oasis3 = document.createElement("img");
oasis3.src = "Assets/Oasis.png";
oasis3.alt = "Oasis3";

document.getElementById(`item${oasisMLoc3}`).appendChild(oasis3);
oasis3.style.visibility = 'hidden';
// --------------------------------------------------------
var oasis4 = document.createElement("img");
oasis4.src = "Assets/Drought.png";
oasis4.alt = "Mirage";

document.getElementById(`item${oasisMLoc4}`).appendChild(oasis4);
oasis4.style.visibility = 'hidden';

// --------------------------------------------------------
// Inserting EMPTY TILES
const emptyTiles = [];
const emptyTilesLocs = [];

for (let i = 0; i < 12; i++) {
    emptyTiles[i] = document.createElement("img");
    emptyTiles[i].src = "Assets/Hole.png";
    emptyTiles[i].alt = `Empty tile ${i}`;
    
    emptyTilesLocs[i] = Math.round(Math.random() * 24) + 1;
    while (gridLocs.has(emptyTilesLocs[i])) {
        emptyTilesLocs[i] = Math.round(Math.random() * 24) + 1;
    }
    gridLocs.add(emptyTilesLocs[i]);
    document.getElementById(`item${emptyTilesLocs[i]}`).appendChild(emptyTiles[i]);
    emptyTiles[i].style.visibility = 'hidden';
}
var cntFoundComponents = 0;
var visitedOasis = [false, false, false]
document.addEventListener("keydown", (event) => {
    if(event.code == "Space" && !gameEnd()) {
        if (playerLoc == oasisMLoc1) {
            oasis1.style.visibility = 'visible';
            if (!visitedOasis[0]) {
                waterSupply.textContent = 6;
                visitedOasis[0] = true;
            }
        } else if (playerLoc == oasisMLoc2) {
            oasis2.style.visibility = 'visible';
            if (!visitedOasis[1]) {
                waterSupply.textContent = 6;
                visitedOasis[1] = true;
            }
        } else if (playerLoc == oasisMLoc3) {
            oasis3.style.visibility = 'visible';
            if (!visitedOasis[2]) {
                waterSupply.textContent = 6;
                visitedOasis[2] = true;
            }
        } else if (playerLoc == oasisMLoc4) {
            oasis4.style.visibility = 'visible';
        } else {
            for (let i = 0; i < 12; i++) {
                if (playerLoc == emptyTilesLocs[i]) {
                    emptyTiles[i].style.visibility = 'visible';
                }
            }
            for (let i = 0; i < 3; i++) {
                if(playerLoc == componentsLocs[i]) {
                    components[i].style.visibility = 'visible';
                    cntFoundComponents += 1;
                }
            }
            for (let i = 0; i < 6; i++) {
                if (playerLoc == cluesLocs[i]) {
                    clues[i].style.visibility = 'visible';
                }
            }
        }
        actionP.textContent = parseInt(actionP.textContent) - 1;
        
        if(parseInt(actionP.textContent) == 0) {
            waterSupply.textContent = parseInt(waterSupply.textContent) - 1;
            actionP.textContent = 3;
        }
    }
})

// Home screen: players have the option to set a name (0.5 points)
const inputName = prompt("Enter your nickname: ", "Deer");

playerNameHeader = document.createElement('h3');
var playerDiv = document.createElement("div");

playerNameHeader.textContent = `${inputName}`;

const body = document.getElementsByTagName('body')[0];

playerDiv.appendChild(playerNameHeader);
body.appendChild(playerDiv);

// Home screen: setting players' primary water supply (0.5 points)

var waterDiv = document.createElement("div");

const water = document.createElement("img");
water.src = 'Assets/Water.png';
water.alt = 'Water';
water.style.position = 'static';

var waterSupply = document.createElement('h3');
waterSupply.textContent = 6;

waterDiv.appendChild(water);
waterDiv.appendChild(waterSupply);

waterDiv.style.display = 'flex';
waterDiv.style.alignItems = 'center';

playerDiv.appendChild(waterDiv);
//-----------------------------------------------------
const actionImg = document.createElement("img");
actionImg.src = 'Assets/Action Points.png';
actionImg.alt = 'Action points';
actionImg.style.position = 'static';

var actionP = document.createElement('h3');
actionP.textContent = 3;

var actionsDiv = document.createElement('div');
actionsDiv.style.display = 'flex';
actionsDiv.style.alignItems = 'center';

actionsDiv.appendChild(actionImg);
actionsDiv.appendChild(actionP);

playerDiv.appendChild(actionsDiv);

// Actions: The player's water supply is reduced by one at the end of their turn. (0.5 points)

// Digging: If the player performs digging in an oasis space, his water supply is replenished. (1 point)
// Game over: If a player runs out of water, it's game over. (0.5 points)
function gameEnd() {
    if(parseInt(waterSupply.textContent) <= 0) {
        alert("GAME OVER!");
    } else if (cntFoundComponents == 3) {
        alert("YOU WON!");
    }
    return false;
}