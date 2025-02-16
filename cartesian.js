// Cartesian Plane Script
const canvas = document.getElementById("cartesianCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const unit = 30; // Grid spacing

    let points = [];
    let draggingPoint = null;

    function drawGrid() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += unit) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += unit) {
            ctx.beginPath();
            ctx.moveTo(0, y);

