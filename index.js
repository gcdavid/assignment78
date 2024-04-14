// Canvas setup
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");

// Default brush color and size
let brushColor = "#000000"; // black
let brushSize = 5;
let paintState = false;
let lastX = 0;
let lastY = 0;

// Function to update brush size display
function updateBrushSizeDisplay() {
  document.getElementById("brushSize").textContent = brushSize;
}

// Function to handle brush color change
function changeBrushColor(color) {
  brushColor = color;
  context.strokeStyle = brushColor;
  // Reset composite operation to draw mode
  context.globalCompositeOperation = "source-over";
}

// Function to handle brush size change
function changeBrushSize(size) {
  brushSize = size;
  updateBrushSizeDisplay();
}

// Event listeners for brush color buttons
document.getElementById("black").addEventListener("click", function () {
  changeBrushColor("#000000");
});

document.getElementById("pink").addEventListener("click", function () {
  changeBrushColor("#f50057");
});

document.getElementById("blue").addEventListener("click", function () {
  changeBrushColor("#2979ff");
});

document.getElementById("yellow").addEventListener("click", function () {
  changeBrushColor("#ffd600");
});

// Event listener for eraser button
document.getElementById("erase").addEventListener("click", function () {
  // Set composite operation to erase mode
  context.globalCompositeOperation = "destination-out";
  // Set stroke color to match canvas background color (to simulate erasing)
  context.strokeStyle = "#ffffff"; // White color to match background
  updateBrushSizeDisplay(10);
});

// Event listener for new button (clear canvas)
document.getElementById("new").addEventListener("click", function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// Event listener for brush size slider
document.getElementById("slider").addEventListener("input", function () {
  changeBrushSize(parseInt(this.value));
});

// Function to draw on canvas
function draw(e) {
  if (!paintState) {
    return;
  }

  let mouseX, mouseY;

  if (e.type === "mousemove") {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  } else if (e.type === "touchmove") {
    mouseX = e.touches[0].clientX - canvas.offsetLeft;
    mouseY = e.touches[0].clientY - canvas.offsetTop;
  }

  context.lineWidth = brushSize;
  context.lineCap = "round";
  context.lineTo(mouseX, mouseY);
  context.stroke();
  context.beginPath();
  context.moveTo(mouseX, mouseY);

  // Update lastX and lastY for touch events
  lastX = mouseX;
  lastY = mouseY;
}

function paint(e) {
  paintState = true;
  draw(e);
}

function stopPaint(e) {
  paintState = false;
  // Reset lastX and lastY to the current position
  lastX = e.clientX - canvas.offsetLeft;
  lastY = e.clientY - canvas.offsetTop;
}

// Event listener for canvas mousemove event
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", paint);
canvas.addEventListener("mouseup", stopPaint);

// Event listener for touchmove event (for mobile support)
canvas.addEventListener("touchmove", function (e) {
  e.preventDefault(); // Prevent scrolling
  draw(e.touches[0]); // Draw at the touch position
});

// Initialize brush size display
updateBrushSizeDisplay();
