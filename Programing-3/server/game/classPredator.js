const LivingCreature = require("./classLivingCreature");
let random = require("./random");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index)
        this.energy = 8;
        this.isFemale = isFemale
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 13) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3;
            var newGrassEater = new GrassEater(newX, newY, 3);
            grassEaterArr.push(newGrassEater)
            this.energy = 8;
        }
    }

    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
            this.energy--
        }
    }

    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }
            if(this.isFemale){
                this.energy --
            }else this.energy+=2
        }

    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in PredatorArr) {
                if (PredatorArr[i].x == this.x && PredatorArr[i].y == this.y) {
                    PredatorArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
