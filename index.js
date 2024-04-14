// Canvas setup
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");

// Default brush color and size
let brushColor = "#000000"; // black
let brushSize = 5;
let paintState = false;
let lastX = 0;
let lastY = 0;
