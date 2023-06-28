socket = io();
var side = 20, m = 46, n = 40;
multForGrass = 8
diiKapuyt = 0
var grassColor = "#09DE17"
function setup() {
    frameRate(40);
    createCanvas(n * side, m * side);
    background('#e8e8e8');
    button1 = document.getElementById('summer');
    button2 = document.getElementById('spring');
    button3 = document.getElementById('autumn');
    button4 = document.getElementById('winter');





    button2.addEventListener("click", onColorChange);
    button3.addEventListener("click", onColorChange);
    button4.addEventListener("click", onColorChange);
    button1.addEventListener("click", onColorChange);



}


function onColorChange() {
    if (event.target.id == "summer") {
        grassColor = "#a5e895"
        multForGrass = 6;
    } else if (event.target.id == "spring") {
        grassColor = "Green"
        multForGrass = 5;
    } else if (event.target.id == "autumn") {
        grassColor = "Yellow"
        multForGrass = 4;
    } else if (event.target.id == "winter") {
        grassColor = "white"
        multForGrass = 2;
    }
    let data = {
        multForGrass: multForGrass
    }
    socket.on("matrix", drawMatrix);
    socket.emit("afterClick", data);
}

function drawMatrix(data) {

    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {

        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grassColor);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 0);
            }
            else if (matrix[y][x] == 3) {
                fill(0, 0, 0);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("red");
            }
            else if (matrix[y][x] == 6) {
                fill("#FAE293");
            }

            rect(x * side, y * side, side, side);



        }
    }
}

socket.on("matrix", drawMatrix);

// const btn = document.querySelector("button");

const btn = document.getElementById("change");

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

btn.addEventListener("click", () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
});


// var matrix = [
//     [0, 2, 3, 0, 0, 1, 0, 2, 3, 1, 0, 1, 0, 4, 0, 1, 0, 2, 3, 0, 2, 2, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 2, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 1, 0, 5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1],
//     [0, 0, 2, 2, 0, 5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 3, 0, 1],
//     [0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 5, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 5, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 6, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 5, 1, 0, 2, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3, 1, 0, 1],
//     [0, 0, 4, 0, 0, 1, 0, 1, 2, 3, 0, 1, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 6, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2, 3, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 6, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 5, 0, 1, 0, 1, 2, 3, 0, 1, 0, 4, 6, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 3, 0, 1],
//     [0, 0, 5, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 5, 1, 5, 1, 0, 1, 2, 4, 5, 1, 0, 0, 0, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 6, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 6, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 6, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 6, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 5, 0, 1, 5, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 1, 0, 1, 0, 5, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 0, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 4, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 5, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 4, 0, 5, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 3, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5, 5, 0, 0, 0, 1, 2, 3, 0, 2, 3, 1, 5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 3, 1],
//     [0, 0, 1, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0, 4, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 5, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
//     [0, 1, 1, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1]
// ];
// var side = 15;
// var grassArr = [];
// var kapuytArr = [];
// var karmirArr = [];
// var grassEaterArr = [];
// var PredatorArr = [];




// function setup() {
//     frameRate(5);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {
//             if (matrix[y][x] == 1) {
//                 var gr = new Grass(x, y, 1);
//                 grassArr.push(gr);
//             }
//             else if (matrix[y][x] == 1) {

//             }
//             else if (matrix[y][x] == 8) {

//             }
//             else if (matrix[y][x] == 2) {
//                 var gr = new GrassEater(x, y, 2);
//                 grassEaterArr.push(gr);
//             }
//             else if (matrix[y][x] == 3) {
//                 var gr = new Predator(x, y, 3);
//                 PredatorArr.push(gr);
//             }
//             else if (matrix[y][x] == 4) {
//                 var gr = new Kapuyt(x, y, 4);
//                 kapuytArr.push(gr);
//             }
//             else if (matrix[y][x] == 5) {
//                 var gr = new Karmir(x, y, 5);
//                 karmirArr.push(gr);
//             }

//         }
//     }




// }

// function draw() {

//     for (var y = 0; y < matrix.length; y++) {

//         for (var x = 0; x < matrix[y].length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill("green");
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill(255, 255, 0);
//             }
//             else if (matrix[y][x] == 3) {
//                 fill(0, 0, 0);
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("blue");
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("red");
//             }

//             rect(x * side, y * side, side, side);



//         }
//     }


//     for (var i in grassArr) {
//         grassArr[i].mult()
//     }
//     for (var i in grassEaterArr) {

//         grassEaterArr[i].eat()
//         grassEaterArr[i].move()
//         grassEaterArr[i].mult()
//         grassEaterArr[i].die()
//     }
//     for (var i in PredatorArr) {
//         PredatorArr[i].eat()
//         PredatorArr[i].move()
//         PredatorArr[i].mult()
//         PredatorArr[i].die()
//     }
//     for (var i in kapuytArr) {
//         kapuytArr[i].eat()
//         kapuytArr[i].move()
//         kapuytArr[i].mult()
//         kapuytArr[i].die()
//     }
//     for (var i in karmirArr) {
//         karmirArr[i].eat()
//         karmirArr[i].move()
//         karmirArr[i].mult()
//     }
//     if (grassEaterArr.length == 0) {
//         for (var i = 0; i < 20; i++) {
//             var x = floor(random(matrix[0].length - 1))
//             var y = floor(random(matrix.length - 1))
//             matrix[y][x] = 2
//             var grE = new GrassEater(x, y, 2)
//             grassEaterArr.push(grE)

//         }
//     }
//     if (PredatorArr.length == 0) {
//         for (var i = 0; i < 20; i++) {
//             var x = floor(random(matrix[0].length - 1))
//             var y = floor(random(matrix.length - 1))
//             matrix[y][x] = 2
//             var grE = new Predator(x, y, 2)
//             PredatorArr.push(grE)
//         }
//     }
// }

