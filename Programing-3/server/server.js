
var express = require("express");
var fs = require('fs');
const LivingCreature = require("./game/classLivingCreature");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../client"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(3000, function () {
    console.log("App is running on port 3000");
});

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
kapuytArr = [];
karmirArr = [];
manArr = [];

Grass = require("./game/classGrass");
GrassEater = require("./game/classGrassEater");
Predator = require("./game/classPredator");
Man = require("./game/classMan");
Kapuyt = require("./game/classKapuyt");
Karmir = require("./game/classKarmir");
random = require("./game/random");

multForGrass = 8
diiKapuyt = 0
io.on("connection", function (socket) {

    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass
        diiKapuyt = data.diiKapuyt
    });


    setInterval(drawForBackend, 5000);


});

matrix = [
    [0, 2, 3, 0, 0, 1, 0, 2, 3, 1, 0, 1, 0, 4, 0, 1, 0, 2, 3, 0, 2, 2, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 2, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 6, 1, 0, 0, 0, 1, 0, 5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1],
    [0, 0, 2, 2, 0, 5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 3, 0, 1],
    [0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 5, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 5, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 5, 1, 0, 2, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3, 1, 0, 1],
    [0, 0, 4, 0, 0, 1, 0, 1, 2, 3, 0, 1, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2, 3, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 6, 4, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 6, 6, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 5, 0, 1, 0, 1, 2, 3, 0, 1, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 3, 0, 1],
    [0, 0, 5, 0, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 5, 1, 5, 1, 0, 1, 2, 4, 5, 1, 0, 0, 0, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 6, 1, 6, 1, 6, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 5, 0, 1, 5, 1, 0, 1, 6, 1, 0, 4, 0, 0, 0, 1, 0, 1, 0, 5, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 5, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 5, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 4, 0, 5, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 3, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5, 5, 0, 0, 0, 1, 2, 3, 0, 2, 3, 1, 5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2, 3, 1],
    [0, 0, 1, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 1, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 0, 0, 2, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1]
]
var isFemale = true;

for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            isFemale = !isFemale;
            var gr = new GrassEater(x, y, 2, isFemale);
            grassEaterArr.push(gr);
        }
        else if (matrix[y][x] == 3) {
            isFemale = !isFemale
            var gr = new Predator(x, y, 3, isFemale);
            PredatorArr.push(gr);
        }
        else if (matrix[y][x] == 4) {
            var gr = new Kapuyt(x, y, 4);
            kapuytArr.push(gr);
        }
        else if (matrix[y][x] == 5) {
            var gr = new Karmir(x, y, 5);
            karmirArr.push(gr);
        }
        else if (matrix[y][x] == 6) {
            var gr = new Man(x, y, 6);
            manArr.push(gr);
        }

    }
}
function drawForBackend() {
    for (var i in grassArr) {
        grassArr[i].mult(multForGrass)

    }
    for (var i in grassEaterArr) {

        grassEaterArr[i].eat()
        grassEaterArr[i].move()
        grassEaterArr[i].mult()
        grassEaterArr[i].die()
    }
    for (var i in PredatorArr) {
        PredatorArr[i].eat()
        PredatorArr[i].move()
        PredatorArr[i].mult()
        PredatorArr[i].die()
    }
    for (var i in manArr) {
        manArr[i].eat()
        manArr[i].move()
        manArr[i].mult()
        manArr[i].die()
    }
    for (var i in kapuytArr) {
        kapuytArr[i].eat()
        kapuytArr[i].move()
        kapuytArr[i].mult()
        kapuytArr[i].die(diiKapuyt)
    }
    for (var i in karmirArr) {
        karmirArr[i].eat()
        karmirArr[i].move()
        karmirArr[i].mult()
    }
    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 20; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 2
            var grE = new GrassEater(x, y, 2)
            grassEaterArr.push(grE)

        }
    }
    if (PredatorArr.length == 0) {
        for (var i = 0; i < 20; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 2
            var grE = new Predator(x, y, 2)
            PredatorArr.push(grE)
        }
    }

    let sendData = {
        matrix: matrix
    }
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        Predators: PredatorArr.length,
        kapuyts: kapuytArr.length,
        karmirs: karmirArr.length,

    }
    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2))
    mystatistics = fs.readFileSync('statistics.json').toString()
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics))
    io.sockets.emit("matrix", sendData)
}
setInterval(drawForBackend, 500)

