let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let xCoordinate = document.getElementById('xCoordinate');
let yCoordinate = document.getElementById('yCoordinate');
let delAll = document.getElementById('clear-all');

let system = {
    currentTool: '',
    brushSize: 5
};

const getCoordinates = (evt) => {
    let x = evt.offsetX;
    let y = evt.offsetY;
    let coordinatesObject = {
        x: x,
        y: y
    };
    xCoordinate.innerText = coordinatesObject.x;
    yCoordinate.innerText = coordinatesObject.y;
    return coordinatesObject;
};

const renderSystem = (object, element, action) => {
    object[element] = action;
};

const switchTool = (button) => {
    switch (button.id) {
        case'brush':
            return 'brush';
        case 'pen':
            return 'pen';
        case 'eraser':
            return 'eraser';
        case 'heart-stamp':
            return 'heart-stamp';
        case 'smile-stamp':
            return 'smile-stamp';
        case 'rect-line':
            return 'rect-line';
        case 'circle-line':
            return 'circle-line';
        case 'clear-all':
            return 'delete';
    }
};

const switchSize = (list) => {
    return list.value;
};

const mouseActions = (evt) => {
    if (evt.target.classList.contains('tool-button')) {
        renderSystem(system, 'currentTool', switchTool(evt.target));
        console.log(system);
    } else if (evt.target.id === 'size-select') {
        renderSystem(system, 'brushSize', switchSize(evt.target));
        console.log(system);
    }
};

const brush = () => {
    canvas.onmousemove = function () {
        ctx.beginPath();
        ctx.globalAlpha = .2;
        ctx.fillStyle = document.getElementById('color').value;
        ctx.arc(xCoordinate.innerText, yCoordinate.innerText, system.brushSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    };
};

const pen = () => {
    canvas.onmousemove = function () {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.fillStyle = document.getElementById('color').value;
        ctx.arc(xCoordinate.innerText, yCoordinate.innerText, system.brushSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    };
};

const eraser = () => {
    canvas.onmousemove = function () {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillRect(xCoordinate.innerText, yCoordinate.innerText, system.brushSize, system.brushSize);
        ctx.fillStyle = '#ffffff';
    }
};

const deleteAll = () => {
    if (confirm('Вы действительно хотите все удалить?')) {
        ctx.clearRect(0, 0, 1200, 900);
    } else return false;

};

const heartStamp = () => {
    let numX = Number(xCoordinate.innerText);
    let numY = Number(yCoordinate.innerText);
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = document.getElementById('color').value;
    ctx.bezierCurveTo(numX + 5, numY - 33, numX, numY - 45, numX - 20, numY - 45);
    ctx.bezierCurveTo(numX - 50, numY - 45, numX - 50, numY - 7.5, numX - 50, numY - 7.5);
    ctx.bezierCurveTo(numX - 50, numY + 10, numX - 30, numY + 32, numX + 5, numY + 50);
    ctx.bezierCurveTo(numX + 40, numY + 32, numX + 60, numY + 10, numX + 60, numY - 7.5);
    ctx.bezierCurveTo(numX + 60, numY - 7.5, numX + 60, numY - 45, numX + 30, numY - 45);
    ctx.bezierCurveTo(numX + 15, numY - 45, numX + 5, numY - 33, numX + 5, numY - 30);
    ctx.fill();
};

const smileStamp = () => {
    let numX = Number(xCoordinate.innerText);
    let numY = Number(yCoordinate.innerText);
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = document.getElementById('color').value;
    ctx.arc(numX, numY, 50, 0, Math.PI * 2, true);
    ctx.moveTo(numX + 35, numY);
    ctx.arc(numX, numY, 35, 0, Math.PI, false);
    ctx.moveTo(numX - 10, numY - 10);
    ctx.arc(numX - 15, numY - 10, 5, 0, Math.PI * 2, true);
    ctx.moveTo(numX + 20, numY - 10);
    ctx.arc(numX + 15, numY - 10, 5, 0, Math.PI * 2, true);
    ctx.stroke();
};

const rectangle = () => {
    ctx.beginPath();
    ctx.lineWidth = system.brushSize;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = document.getElementById('color').value;
    let width = +prompt('Введите ширину прямоугольника: ', '');
    let height = +prompt('Введите высоту прямоугольника: ', '');
    ctx.strokeRect(xCoordinate.innerText, yCoordinate.innerText, width, height);
    if (width > 1200 && height > 1200 || width <= 0 && height || !Number.isInteger(width) && !Number.isInteger(height)) {
        alert('Неверные данные. Попробуйте снова!');
        rectangle();
    }
};

const circle = () => {
    ctx.beginPath();
    ctx.lineWidth = system.brushSize;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = document.getElementById('color').value;
    let radius = +prompt('Введите радиус окружности', '');
    ctx.arc(xCoordinate.innerText, yCoordinate.innerText, radius, 0, 2 * Math.PI);
    ctx.stroke();

    if (radius > 900 || radius <= 0 || !Number.isInteger(radius)) {
        alert('Неверные данные. Попробуйте снова!');
        circle();
    }
};

const startDraw = () => {
    switch (system.currentTool) {
        case'brush':
            brush();
            break;
        case 'pen':
            pen();
            break;
        case 'eraser':
            eraser();
            break;
        case 'heart-stamp':
            heartStamp();
            break;
        case 'smile-stamp':
            smileStamp();
            break;
        case 'rect-line':
            rectangle();
            break;
        case 'circle-line':
            circle();
            break;
    }
};

const endDraw = () => {
    canvas.onmousemove = null;
};

canvas.addEventListener('mousemove', getCoordinates);
document.addEventListener('click', mouseActions);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
delAll.addEventListener('click', deleteAll);

