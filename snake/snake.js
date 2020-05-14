//set constructor snake
function Snake() {
    //array of cells-objects
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};


//draw square for every block of snake
Snake.prototype.draw = function () {

    this.segments[0].drawSquare("LimeGreen");

    let isEvenSegment = false;

    for (let i = 1; i < this.segments.length; i++) {
        if (isEvenSegment) {
            this.segments[i].drawSquare("Purple");
        }else {
            this.segments[i].drawSquare("Black");
        }

        isEvenSegment = !isEvenSegment;
    }
};

//create newHead and add it to the beginning of the snake
//to move the snake in the current direction
Snake.prototype.move = function () {

    let head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;

    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
        animationTime -= 5;
    } else {
        this.segments.pop();
    }
};

//check collision with wall or own body
Snake.prototype.checkCollision = function (head) {
    //collision with 0 col or row
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    //collision with 39 col or row;
    let rightCollision = (head.col === widthInBlocks - 1);
    let bottomCollision = (head.row === heightInBlocks - 1);
    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    let selfCollision = false;

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;
};
//write down the next direction of snake movements based on pressed key
Snake.prototype.setDirection = function (newDirection) {

    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }
    this.nextDirection = newDirection;
};
