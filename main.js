var CELL_SIZE = 20;
var DEFAULT_DELAY = 1;
var RULE = [[1, 1, 1, 0],
            [1, 1, 0, 0],
            [1, 0, 1, 0],
            [1, 0, 0, 1],
            [0, 1, 1, 1],
            [0, 1, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 0, 0]];

window.onload = function () {
    var canvas = document.getElementById("drawCanvas");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx, RULE);
    gameEngine.addBackground(new Background(gameEngine));
    gameEngine.start();
    //new UI();
    document.getElementById('slider').onchange = function() { 
        gameEngine.delay = this.value;
    }
}