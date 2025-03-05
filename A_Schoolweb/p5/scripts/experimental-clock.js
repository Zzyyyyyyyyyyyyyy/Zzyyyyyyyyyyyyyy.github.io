let accumulatedTime=0
let isShaking = false;
let bgColor;

function setup() {
  createCanvas(600, 600);
  noCursor();
  frameRate(60);  
  angleMode(RADIANS);
   bgColor = color('#F5B6F0');
}

function draw() {
  
  let s = second();
  let m = minute();
  let h = hour();
  let daytime=map(s,0,59,0,24)
  
  
  //Calculate how fast the sun zooms in and out over different time periods
  if(daytime>=5 && daytime<8){
   accumulatedTime += (deltaTime / 1000)*0.5; 
  
  }
    else if(daytime>=8 && daytime<12){
    accumulatedTime += (deltaTime / 1000)*1; 
    }       
  else if(daytime>=12 && daytime<15){
    accumulatedTime += (deltaTime / 1000)*2; 
    }     
  else if(daytime>=15 && daytime<18){
    accumulatedTime += (deltaTime / 1000)*3; 
    }     
  else {
    accumulatedTime += (deltaTime / 1000)*0.5; 
    }     
  
  //shaking effect 
    if (isShaking) {
    translate(random(-10, 10), random(-10, 10)); // Random shaking
  }
  
 
  
  // Use the sin() function to smooth the scaling values over the range
  let sunscale = map(sin(accumulatedTime), -1, 1, 1.6, 1.8); // Use cumulative time to control smooth changes in scale
  
  //How can I make the transparency change smoother?
    let alphaValue = 0;
  if (daytime >= 5 && daytime < 15) {
    alphaValue = map(daytime, 5, 12, 0, 255); // Sun transparency  0 to 255
    bgColor = lerpColor(color(0), color('#F5B6F0'), alphaValue / 255); // Gradually change background to original color
  } else if (daytime >= 15 && daytime < 18) {
    alphaValue = map(daytime, 12, 18, 255, 0); 
    bgColor = lerpColor(color('#F5B6F0'), color(0), 1 - alphaValue / 255); 
    
  } else {
    bgColor = color(0); 
  }

  background(bgColor);
  
  drawsun(sunscale,alphaValue);
  drawtime(s);
  
  textSize(15)
  text("Press the mouse to make it shake!!",140,34)
  

  // Custom cursor
  stroke(0);
  strokeWeight(1);
  line(mouseX - 10, mouseY, mouseX + 10, mouseY); // horizontal line
  line(mouseX, mouseY - 10, mouseX, mouseY + 10); // vertical line
  
  
}

function mousePressed() {
  isShaking = !isShaking; // Toggle the shaking state when the mouse is pressed
}

function keyPressed() {
  if (key === 's' || key === 'S') {//It has to be an 's' or a capital 'S'
    saveCanvas('myDrawing', 'jpg'); 
  }
}

//Sun
function drawsun(sunscale,alphaValue){
  
  noStroke()
  push()
  translate(width/2,height/2)
  scale(sunscale)
  translate(-301,-197)
  fill(255,163,48,alphaValue)
  noStroke()
  beginShape()
  vertex(163,188)
  bezierVertex(265,155,154,74,275,100)
  bezierVertex(405,63,321,161,434,133)
  bezierVertex(313,230,526,202,363,271)
  bezierVertex(311,396,284,249,201,306)
  bezierVertex(280,229,145,249,163,188)
  endShape()
  pop()
  
   push()
  translate(width/2,height/2)
  scale(sunscale *0.8)
  translate(-301,-197)
  fill(255,185,48,alphaValue)
  noStroke()
  beginShape()
  vertex(163,188)
  bezierVertex(265,155,154,74,275,100)
  bezierVertex(405,63,321,161,434,133)
  bezierVertex(313,230,526,202,363,271)
  bezierVertex(311,396,284,249,201,306)
  bezierVertex(280,229,145,249,163,188)
  endShape()
  pop()
  
   fill(255,226,49,alphaValue)
  circle(width/2,height/2, 150*sunscale);
  
  push()
  fill(255,255,49,alphaValue)
  translate(272,266)
  rotate(PI/4)
  ellipse(0, 0, 40*sunscale,60*sunscale);
  pop()
  
  
}

//show time
function drawtime(s){
  textSize(25)
  
  let daytime=map(s,0,59,0,24)
  daytime=int(daytime) 
  fill(253,93,195)
  text("Time:"+daytime+"H",450,38)
  
}

