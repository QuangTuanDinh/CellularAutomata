var CELL_SIZE = 10;
var socket = io.connect("http://24.16.255.56:8888");

window.onload = function () {
    var select = document.getElementById('rules');
    var slider = document.getElementById('slider');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');
    var save = document.getElementById('save');
    var load = document.getElementById('load');
    var drawCtx = document.getElementById("cellCanvas").getContext("2d");

    var gameEngine = new GameEngine(select.selectedIndex, slider.value);
    gameEngine.init(drawCtx, new Background(gameEngine));

    slider.onchange = function () {
        gameEngine.delay = this.value;
    }

    select.onchange = function () {
        gameEngine.changeRule(this.selectedIndex);
        gameEngine.reset();
    }

    start.onclick = function () {
        gameEngine.start();
        this.disabled = true;
        reset.disabled = false;
        save.disabled = false;
        load.disabled = true;
    }

    reset.onclick = function () {
        gameEngine.reset();
    }

    save.onclick = function () {
        socket.emit("save", { studentname: "Tuan Dinh", statename: "1", data: gameEngine.gameState });
    }

    load.onclick = function () {
        socket.emit("load", { studentname: "Tuan Dinh", statename: "1" });
    }

    socket.on("load", function (data) {
        gameEngine.load(data.data);
        slider.value = data.data.delay;
        select.value = select.options[data.data.ruleIndex].innerHTML;
        load.disabled = true;
    });
}