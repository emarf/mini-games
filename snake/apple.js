//set constructor apple
function Apple() {
    this.position = new Block(10, 10);
}
//draw circle in position of apple
Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};
//remove apple in random position
Apple.prototype.move = function () {
    //in the range from 1 to 37 + 1
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);

};