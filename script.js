const canvas = document.getElementById("cartesianCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const width = canvas.width;
const height = canvas.height;
const originX = width / 2;
const originY = height / 2;
const unit = 30; // Grid spacing

let points = []; // Stores clicked points

// Draw coordinate grid
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
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Draw x and y axes
function drawAxes() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();
}

// Convert screen coordinates to Cartesian coordinates
function getCartesianCoords(x, y) {
    let cartX = (x - originX) / unit;
    let cartY = -(y - originY) / unit;
    return { x: cartX, y: cartY };
}

// Convert Cartesian coordinates to screen coordinates
function toScreenCoords(cartX, cartY) {
    return {
        screenX: originX + cartX * unit,
        screenY: originY - cartY * unit
    };
}

// Display coordinates on hover
canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let coords = getCartesianCoords(x, y);
    document.getElementById("coordinates").innerText = `(${coords.x.toFixed(2)}, ${coords.y.toFixed(2)})`;
});

// Plot a point on click
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let coords = getCartesianCoords(x, y);
    plotPoint(x, y, coords.x, coords.y);

    points.push({ x: coords.x, y: coords.y, screenX: x, screenY: y });

    if (points.length === 2) {
        drawLineAndCalculateSlope(points[0], points[1]);
        points = []; // Reset after drawing the line
    }
});

// Draw a point
function plotPoint(x, y, cartX, cartY) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(`(${cartX.toFixed(1)}, ${cartY.toFixed(1)})`, x + 10, y - 10);
}

// Draw a line and calculate slope
function drawLineAndCalculateSlope(p1, p2) {
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(p1.screenX, p1.screenY);
    ctx.lineTo(p2.screenX, p2.screenY);
    ctx.stroke();

    // Calculate slope and intercept
    let slope = (p2.y - p1.y) / (p2.x - p1.x);
    let intercept = p1.y - slope * p1.x;

    let equation = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
    document.getElementById("coordinates").innerText = `Slope: ${slope.toFixed(2)}, Equation: ${equation}`;
}

// Plot points from user input
function plotManualPoints() {
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Please enter valid numbers!");
        return;
    }

    let p1 = toScreenCoords(x1, y1);
    let p2 = toScreenCoords(x2, y2);

    plotPoint(p1.screenX, p1.screenY, x1, y1);
    plotPoint(p2.screenX, p2.screenY, x2, y2);
    drawLineAndCalculateSlope({ x: x1, y: y1, ...p1 }, { x: x2, y: y2, ...p2 });
}

// Initialize grid and axes
drawGrid();
drawAxes();
