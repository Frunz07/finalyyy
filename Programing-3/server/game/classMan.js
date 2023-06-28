let random = require("./random");
const LivingCreature = require("./classLivingCreature");
module.exports = class Man extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 10;
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
    chooseCell(char1,char2) {
        this.getNewCoordinates();
        return super.chooseCell(char1,char2);
    }
    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 6
            var newMan = new Man(newX, newY, 6)
            manArr.push(newMan)
            this.energy = 5
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 6
            this.x = food[0]
            this.y = food[1]

        }
        this.energy--;
    }
    eat() {
        var food = random(this.chooseCell(2, 3))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            } else {
                for (var i in PredatorArr) {
                    if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[newY][newX] = 6
            this.x = food[0]
            this.y = food[1]
            this.energy += 5
        }
    }

    die() {
        if(this.isFemale){
            this.energy--
        }else this.energy+=2

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in manArr) {
                if (manArr[i].x == this.x && manArr[i].y == this.y) {
                    manArr.splice(i, 1)
                    break
                }
            }
        }
    }
}
