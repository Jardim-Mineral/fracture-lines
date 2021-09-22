const EL = {};
const MAX_WIDTH = 600;

let lineSpacing, lineAmplitude, lineSamples;
let xScale, yScale, tScale, tCount;

let animate = true;

function preload() {
  EL.container = document.getElementById('my-canvas-container');
  EL.menu = document.getElementById('my-menu-container');
  EL.buttonPlay = document.getElementById('my-button-play');

  EL.buttonPlay.addEventListener('click', () => {
    const cVal = EL.buttonPlay.getAttribute('value');
    const nVal = cVal == 'PLAY' ? 'PAUSE' : 'PLAY';
    animate = !animate;
    EL.buttonPlay.setAttribute('value', nVal);
  });
}

function sizeCanvas() {
  const maxHeight = windowHeight - EL.menu.offsetHeight;
  resizeCanvas(MAX_WIDTH, maxHeight);
  EL.container.style.height = `${height}px`;
}

function loadPreset0() {
  numLines = 100;
  lineSpacing = 8;
  lineAmplitude = 100;
  lineSamples = 4;
  xScale = 0.01;
  yScale = 0.001;
  tScale = 0.01;
  tCount = 0;
  loop();
}

function setup() {
  const mCanvas = createCanvas(0, 0);
  sizeCanvas();

  mCanvas.parent('my-canvas-container');
  mCanvas.id('my-canvas');
  mCanvas.elt.classList.add('main-canvas');

  smooth();
  noLoop();
  noiseSeed(122);
  loadPreset0();
}

function windowResized() {
  sizeCanvas();
}

function drawLines() {
  background(255);
  for (l = 0; l < numLines; l++) {
    const lineHeight = height / numLines;
    const y0 = l * lineHeight * lineSpacing;
    let py = y0 - lineAmplitude * lineHeight * noise(xScale * -1,
                                                     yScale * y0,
                                                     tScale * tCount);

    for (x = 0; x < width; x += lineSamples) {
      const y = y0 - lineAmplitude * lineHeight * noise(xScale * x,
                                                        yScale * y0,
                                                        tScale * tCount);
      line(x, y, x - lineSamples, py);
      py = y;
    }
  }
}

function draw() {
  noFill();
  stroke(0);
  tCount += animate ? 1 : 0;
  drawLines();
}
