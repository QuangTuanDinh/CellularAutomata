window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function GameEngine() {
    this.entities = [[0, 0, 1, 0, 0]];
    this.currentLevel = 0;
    this.clockTick = 0;
    this.delay = DEFAULT_DELAY;
    this.background = null;
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (theCtx, theRule) {
    this.ctx = theCtx;
    this.rule = theRule;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.center = Math.floor((this.surfaceWidth / 2) / CELL_SIZE);
    this.timer = new Timer();
}

GameEngine.prototype.start = function () {
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.addBackground = function (background) {
    background.draw();
}

GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
    entity.draw(this.ctx);
}

GameEngine.prototype.draw = function () {
    var currentArray = this.entities[this.currentLevel];
    var x = this.center - ((currentArray.length - 1) / 2);
    for (let i = 0; i < currentArray.length; i++) {
        if (currentArray[i] === 1) {
            this.ctx.fillRect((x + i) * CELL_SIZE, this.currentLevel * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

GameEngine.prototype.update = function () {
    this.currentLevel++;
    var newLevel = [0, 0];
    var lastLevelArray = this.entities[this.currentLevel - 1];
    for (let i = 0; i < lastLevelArray.length - 2; i++) {
        newLevel.push(this.getCellColor(lastLevelArray[i], lastLevelArray[i + 1], lastLevelArray[i + 2]));
    }
    newLevel.push(0);
    newLevel.push(0);
    this.entities.push(newLevel);
}

GameEngine.prototype.loop = function () {
    this.clockTick += this.timer.tick();
    if (this.clockTick >= this.delay) {
        this.draw();
        this.update();
        this.clockTick = 0;
    }
}

//theRuleArray is a 2D array of integers 0 or 1 with 0 is white and 1 is black
//Ex: {{0, 1, 2, 3}, {0, 1, 2, 3}}
//0 1 2
//  3
//0, 1, 2 are the pre-generated cells and 3 is the result.
GameEngine.prototype.getCellColor = function (theCellLeft, theCellCenter, theCellRight) {
    for (let i = 0; i < this.rule.length; i++) {
        if (theCellLeft === this.rule[i][0]
            && theCellCenter === this.rule[i][1]
            && theCellRight === this.rule[i][2]) {
            return this.rule[i][3];
        }
    }
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}