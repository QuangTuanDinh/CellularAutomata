function Background(theGameEngine) {
    this.gameEngine = theGameEngine;
    this.ctx = theGameEngine.ctx;
};

Background.prototype.draw = function () {
    for (let i = 0; i < this.gameEngine.surfaceWidth; i += CELL_SIZE) {
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, this.gameEngine.surfaceHeight);
        this.ctx.stroke();
    }
    for (let i = 0; i < this.gameEngine.surfaceHeight; i += CELL_SIZE) {
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(this.gameEngine.surfaceWidth, i);
        this.ctx.stroke();
    }
};

Background.prototype.update = function () {
};