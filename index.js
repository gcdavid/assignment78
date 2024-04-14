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
