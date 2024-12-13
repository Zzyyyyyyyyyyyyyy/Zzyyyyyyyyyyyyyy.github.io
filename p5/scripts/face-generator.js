
let presscount=0 
let bgcolor=0
let started = false; //Flag whether to start program



function setup() {
  createCanvas(400, 400);
  noCursor(); 
  smooth();
}

function draw() {
  background(bgcolor+100,bgcolor+20,bgcolor-80);
  
  if (!started) {
    // Program does not start, display prompt text, "!" It means not
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Press Enter to Start', width / 2, height / 2);
    textSize(18);
    text('Once you start, click the mouse wildly! ',width / 2, height / 1.7)
  } else {
  
  let x=constrain(mouseX,0,70)  //Limit the value of X
  let y=constrain(mouseY,0,150)
  let radomx=x+random(0,10)
  let radomy=y+random(0,10)

  
  fill(bgcolor+20,bgcolor-80,bgcolor+100,70)
  strokeWeight(3)
  stroke(bgcolor+10,bgcolor+10,bgcolor+35)
  rect(20,20,360)

  drawface(x, y, radomx, radomy);
  
  //draw face 3
  
   push();
  translate(width / 2, height / 2);
  scale(0.95);
  translate(-width / 2, -height / 2);
  drawface(x, y, radomx, radomy);
  pop();
  
  for (let i = 0; i < presscount;i=i+1) { //for is similar with “loop”. i < presscount, the loop continues when i is less than presscount, and i=i+1 ensures that the value of i is updated after each iteration
    let scaleFactor = 1 - ((i + 2) * 0.05); // Each time it shrinks by 5%, "+2" because it's already shrunk once

    push();

    scale(scaleFactor);//I want to put the reduced center point in the center of the canvas.

    drawface(x, y, radomx, radomy);
    pop();
  }
  // Show mouse 
  strokeWeight(1);
  noStroke()
  fill('#FFFFFF');
  textSize(16);
  text(`Z！`, mouseX , mouseY);
 
}
}

//Record the number of mouse clicks
function mousePressed() {
  bgcolor=random(0,255)
  presscount = presscount + 1;

  if (presscount >= 20) {
    presscount = 0; // Reset counter
    
  }
  }
function keyPressed(){
   if (keyCode === ENTER) {
    started = true; // When the Enter key is pressed, the program begins
  }
}


function drawface(x,y,radomx,radomy){
  //face1
  noFill();
  strokeWeight(3)
  stroke('#D656C2')
  beginShape()
  //right side,buttom
  vertex(269+x+radomx,215+y/3)
  vertex(270+x+radomx,219+y/3)
    vertex(306+x+radomx,196+y/3)
  vertex(306+x+radomx,187+y/3)
    vertex(255+x+radomx,191+y/3)
  vertex(260+x+radomx,165+y/3)
  //upper
    vertex(308+x+radomx,155-y/3)
  vertex(288+x+radomx,93-y/3)
    vertex(330+x+radomx,91-y/3)
  vertex(325+x+radomx,115-y/3)
    vertex(313+x+radomx,109-y/3)
  vertex(313+x+radomx,94-y/3)
    vertex(306+x+radomx,41-y/3)
  //left side
  vertex(225-x-radomx,38-y/3)
    vertex(202-x-radomx,121-y/3)
  vertex(246-x-radomx,104-y/3)
    vertex(248-x-radomx,122-y/3)
  vertex(111-x-radomx,155-y/3)
    vertex(106-x-radomx,117-y/3)
  vertex(132-x-radomx,104-y/3)
    vertex(166-x-radomx,173-y/3)
  //buttom
  vertex(288-x-radomx,242+y/3)
  //right side
    vertex(311+x+radomx,239+y/3)
  vertex(301+x+radomx,199+y/3)
  endShape()
  
  //leftside
  beginShape()
  vertex(266-x-radomx,228+y/3)
  vertex(218-x-radomx,315+y/3)
    vertex(191-x-radomx,254+y/3)
  vertex(71-x-radomx,356+y/3)
  endShape()
  
  //face2
  push()
  translate(width / 2, height / 2);//move to center

// Application scaling
scale(0.95);

// Move the coordinate system back to its original position
translate(-width / 2, -height / 2);
  noFill()
  stroke('#D656C2')
  beginShape()
  //right side,buttom
  vertex(269+x+radomx,215+y/3)
  vertex(270+x+radomx,219+y/3)
    vertex(306+x+radomx,196+y/3)
  vertex(306+x+radomx,187+y/3)
    vertex(255+x+radomx,191+y/3)
  vertex(260+x+radomx,165+y/3)
  //upper
    vertex(308+x+radomx,155-y/3)
  vertex(288+x+radomx,93-y/3)
    vertex(330+x+radomx,91-y/3)
  vertex(325+x+radomx,115-y/3)
    vertex(313+x+radomx,109-y/3)
  vertex(313+x+radomx,94-y/3)
    vertex(306+x+radomx,41-y/3)
  //left side
  vertex(225-x-radomx,38-y/3)
    vertex(202-x-radomx,121-y/3)
  vertex(246-x-radomx,104-y/3)
    vertex(248-x-radomx,122-y/3)
  vertex(111-x-radomx,155-y/3)
    vertex(106-x-radomx,117-y/3)
  vertex(132-x-radomx,104-y/3)
    vertex(166-x-radomx,173-y/3)
  //buttom
  vertex(288-x-radomx,242+y/3)
  //right side
    vertex(311+x+radomx,239+y/3)
  vertex(301+x+radomx,199+y/3)
  endShape()
  
  //leftside
  beginShape()
  vertex(266-x-radomx,228+y/3)
  vertex(218-x-radomx,315+y/3)
    vertex(191-x-radomx,254+y/3)
  vertex(71-x-radomx,356+y/3)
  endShape()
  pop()
   
}
