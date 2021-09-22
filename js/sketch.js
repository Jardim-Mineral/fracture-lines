const EL = {};
const MAX_WIDTH = 600;

let lineSpacing, lineAmplitude, lineSamples;
let xScale, yScale, tScale, tCount;

let animate = true;

function preload() {
  EL.container = document.getElementById('my-canvas-container');
  EL.menu = document.getElementById('my-menu-container');
  EL.buttonPlay = document.getElementById('my-button-play');
  EL.param = {};
  EL.param.space = document.getElementById('param-line-space');
  EL.param.amp = document.getElementById('param-line-amp');
  EL.param.xScale = document.getElementById('param-x-scale');
  EL.param.yScale = document.getElementById('param-y-scale');
  EL.param.tScale = document.getElementById('param-t-scale');

  EL.buttonPlay.addEventListener('click', () => {
    const cVal = EL.buttonPlay.getAttribute('value');
    const nVal = cVal == 'PLAY' ? 'PAUSE' : 'PLAY';
    animate = !animate;
    EL.buttonPlay.setAttribute('value', nVal);
  });

  Object.keys(EL.param).forEach(k => {
    EL.param[k].addEventListener('change', updateParams);
  });
}

function sizeCanvas() {
  const maxHeight = windowHeight - EL.menu.offsetHeight;
  resizeCanvas(MAX_WIDTH, maxHeight);
  EL.container.style.height = `${height}px`;
}

function updateSliders() {
  EL.param.space.value = lineSpacing;
  EL.param.amp.value = lineAmplitude;
  EL.param.xScale.value = 1 / xScale;
  EL.param.yScale.value = 1 / yScale;
  EL.param.tScale.value = 1 / tScale;
}

function updateParams() {
  lineSpacing = EL.param.space.value;
  lineAmplitude = EL.param.amp.value;
  xScale = 1 / EL.param.xScale.value;
  yScale = 1 / EL.param.yScale.value;
  tScale = 1 / EL.param.tScale.value;
}

function loadPreset0() {
  numLines = 100;
  lineSpacing = 8;
  lineAmplitude = 100;
  lineSamples = 4;
  xScale = 0.01;
  yScale = 0.001;
  tScale = 0.005;
  tCount = 5000;
  loop();
  updateSliders();
}

function loadPreset1() {
  numLines = 100;
  lineSpacing = 8;
  lineAmplitude = 100;
  lineSamples = 4;
  xScale = 0.005;
  yScale = 0.0001;
  tScale = 0.0005;
  tCount = 5000;
  loop();
  updateSliders();
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
  loadPreset1();
}

function windowResized() {
  sizeCanvas();
}

function drawLines() {
  background(255);
  for (l = 0; l < numLines; l++) {
    const lineHeight = height / numLines;
    const y0 = l * lineHeight * lineSpacing;

    if (y0 - lineAmplitude * lineHeight > height) break;

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
