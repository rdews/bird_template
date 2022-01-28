const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

function draw() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    requestAnimationFrame(draw);
}

draw();
