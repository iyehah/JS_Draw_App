// JavaScript for the drawing app

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let penColor = '#000000'; // Initial pen color
let tool = 'draw'; // Default tool
let selectedImage = null;
let isMovingImage = false;
let imageX = 0;
let imageY = 0;

// Drawing functionality
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    if (tool === 'ruler') {
        drawLine(e.offsetX, e.offsetY);
    } else if (tool === 'moveImage' && selectedImage) {
        isMovingImage = true;
        [imageX, imageY] = [e.offsetX, e.offsetY];
    } else if (tool === 'circle') {
        drawCircle(e.offsetX, e.offsetY);
    } else if (tool === 'square') {
        drawSquare(e.offsetX, e.offsetY);
    } else if (tool === 'triangle') {
        drawTriangle(e.offsetX, e.offsetY);
    } else if (tool === 'star') {
        drawStar(e.offsetX, e.offsetY);
    }
}

function draw(e) {
    if (!isDrawing) return;
    if (tool === 'draw') {
        ctx.strokeStyle = penColor; // Set pen color
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    } else if (tool === 'moveImage' && selectedImage && isMovingImage) {
        const dx = e.offsetX - imageX;
        const dy = e.offsetY - imageY;
        imageX = e.offsetX;
        imageY = e.offsetY;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.drawImage(selectedImage, imageX, imageY, selectedImage.width, selectedImage.height);
    }
}

function stopDrawing() {
    isDrawing = false;
    isMovingImage = false;
}

function drawLine(x, y) {
    if (!isDrawing) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.strokeStyle = penColor; // Set pen color
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawCircle(x, y) {
    ctx.strokeStyle = penColor;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2); // Draw circle with radius 50
    ctx.stroke();
}

function drawSquare(x, y) {
    ctx.strokeStyle = penColor;
    ctx.beginPath();
    ctx.rect(x - 50, y - 50, 100, 100); // Draw square with side 100
    ctx.stroke();
}

function drawTriangle(x, y) {
    ctx.strokeStyle = penColor;
    ctx.beginPath();
    ctx.moveTo(x, y - 50); // Top point
    ctx.lineTo(x - 50, y + 50); // Bottom left point
    ctx.lineTo(x + 50, y + 50); // Bottom right point
    ctx.closePath();
    ctx.stroke();
}

function drawStar(x, y) {
    ctx.strokeStyle = penColor;
    ctx.beginPath();
    let outerRadius = 50;
    let innerRadius = 20;
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(
            x + outerRadius * Math.cos((18 + 72 * i) * Math.PI / 180),
            y - outerRadius * Math.sin((18 + 72 * i) * Math.PI / 180)
        );
        ctx.lineTo(
            x + innerRadius * Math.cos((54 + 72 * i) * Math.PI / 180),
            y - innerRadius * Math.sin((54 + 72 * i) * Math.PI / 180)
        );
    }
    ctx.closePath();
    ctx.stroke();
}

// Color buttons functionality
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        penColor = btn.dataset.color;

        // Remove active class from all color buttons
        colorButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to the clicked color button
        btn.classList.add('active');
    });
});

// Functionality to add text to canvas
const textInput = document.getElementById('text-input');
const addTextBtn = document.getElementById('add-text');
addTextBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
        ctx.fillStyle = penColor; // Set text color
        ctx.font = '24px Arial';
        ctx.fillText(text, 50, 50); // Adjust position as needed
    }
});

// Tool buttons functionality
const drawToolBtn = document.getElementById('draw-tool');
const rulerToolBtn = document.getElementById('ruler-tool');
const moveImageToolBtn = document.getElementById('move-image-tool');
const circleToolBtn = document.getElementById('circle-tool');
const squareToolBtn = document.getElementById('square-tool');
const triangleToolBtn = document.getElementById('triangle-tool');
const starToolBtn = document.getElementById('star-tool');

drawToolBtn.addEventListener('click', () => {
    tool = 'draw';
});

rulerToolBtn.addEventListener('click', () => {
    tool = 'ruler';
});

moveImageToolBtn.addEventListener('click', () => {
    tool = 'moveImage';
});

circleToolBtn.addEventListener('click', () => {
    tool = 'circle';
});

squareToolBtn.addEventListener('click', () => {
    tool = 'square';
});

triangleToolBtn.addEventListener('click', () => {
    tool = 'triangle';
});

starToolBtn.addEventListener('click', () => {
    tool = 'star';
});

// Image upload functionality
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            selectedImage = new Image();
            selectedImage.onload = () => {
                imageX = 0;
                imageY = 0;
                ctx.drawImage(selectedImage, imageX, imageY, selectedImage.width, selectedImage.height);
            }
            selectedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Save functionalities (as previously implemented)
// Ensure save functions are retained for saving the canvas content
