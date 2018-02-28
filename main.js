var CELL_SIZE = 10;

window.onload = function () {
    var select = document.getElementById('rules');
    var slider = document.getElementById('slider');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');
    var drawCtx = document.getElementById("cellCanvas").getContext("2d");
    var gameEngine = new GameEngine(RULE[select.selectedIndex], slider.value);
    gameEngine.init(drawCtx, new Background(gameEngine));
    
    document.getElementById('slider').onchange = function() { 
        gameEngine.delay = this.value;
    }
    select.onchange = function() {
        gameEngine.rule = RULE[select.selectedIndex];
        if (start.disabled === true) {
            gameEngine.reset();
        }
    }
    start.onclick = function () {
        gameEngine.start();
        this.disabled = true;
        reset.disabled = false;
    }
    reset.onclick = function () {
        gameEngine.reset();
    }
}