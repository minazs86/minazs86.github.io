let cam;

function setup() {
  createCanvas(400*2, 300*2);
  pixelDensity(1);
  cam = createCapture(VIDEO);
  cam.size(400*2,300*2);
  cam.hide();
    fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  //image(cam,0,0);
  let spectrum = mic.getLevel();
  cam.loadPixels();
      console.log(spectrum);
    let pixelSize = int(map(spectrum,0,1,5,50));
   for(let x=0; x < cam.width; x+=pixelSize){
  for(let y=0; y<cam.height; y+=pixelSize){  
  let index = (x+y*cam.width)*4; // convert x&y to index //index = position in the array
    
    // get the color of the pixel position
    // draw a rect at the corresponding x and y pixel
    let r = cam.pixels[index];
    let g = cam.pixels[index+1];
    let b = cam.pixels[index+2];
    let col = color(r,g,b);
    let bright = brightness(col); 
    // bright is a value between 0 and 255
    // if(bright > 60){
    //    fill(255);
    //    }
    // else{
    //  //colorMode(HSB);
    //    // fill(random(100,200),255,255);
    //   fill(col);
    // }
    noStroke();
    fill(col);
    ellipse(x,y,pixelSize,pixelSize);
  }
  }
}