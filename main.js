var CELL_SIZE = 10;
var DEFAULT_DELAY = 1;
//RULE is a 2D array of integers 0 or 1 with 0 is white and 1 is black
//Ex: {{1, 1, 1, 0}}
//1 1 1
//  0
//indices 0, 1, 2 are the pre-generated cells and index 3 is the result.
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
    document.getElementById('slider').onchange = function() { 
        gameEngine.delay = this.value;
    }
}