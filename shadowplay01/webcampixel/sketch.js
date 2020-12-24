var vid;
let r, g, b, a;
let interval = 32;

let mic;
let vol = 0;
let gameStarted = 0;


function setup() {
  pixelDensity(1);

  createCanvas(768, 504);
  vid = createCapture(VIDEO);
  //vid.loop();
  vid.hide();
  // vid.volume(0);
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);
}



function draw() {
  background(0);
  image(vid, 0, 0, width, width * vid.height / vid.width);
  loadPixels();

  for (let x = 0; x < width; x += interval) {
    for (let y = 0; y < height; y += interval) {
      let index = (x + y * width) * 4;
      r = pixels[index + 0];
      g = pixels[index + 1];
      b = pixels[index + 2];
      a = pixels[index + 3];
      for (let newX = x; newX < x + interval; newX++) {
        for (let newY = y; newY < y + interval; newY++) {
          //b&w
          let newIndex = (newX + newY * width) * 4;

          pixels[newIndex + 0] = (r + g + b) / 3;
          pixels[newIndex + 1] = (r + g + b) / 3;
          pixels[newIndex + 2] = (r + g + b) / 3;
          pixels[newIndex + 3] = a;
        }
      }

    }
  }

  updatePixels();
  if (gameStarted == 1) {
    let constVol = mic.getLevel();
    let circleSize = map(constVol, 0, 1, interval / 2, interval * 5);
    // interval = map(constVol, 0, 1, 20, 60);
    fill(0);
    noStroke();
    for (var y = 0; y < height; y += interval) {
      for (var x = 0; x < width; x += interval) {
        //var offset = ((y * width) + x) * 4;
        ellipse(x, y, circleSize, circleSize);
      }
    }
  }
}

function keyPressed() {
  turnOnMic();

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

}

function turnOnMic() {
  mic = new p5.AudioIn();
  mic.start();
  gameStarted = 1;

}