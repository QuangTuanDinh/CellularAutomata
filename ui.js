class UI {
    constructor() {
        var canvas = document.getElementById('mainCanvas');
        var ctx = canvas.getContext("2d");
        ctx.font = "15px Arial";
        ctx.fillText("Delay", 0, 30);
    }
}
