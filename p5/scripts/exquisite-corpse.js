let showText = true;
function setup() {
  createCanvas(400, 600);

}

function draw() {
  background("#93FAF6");
  if (!keyIsPressed) { //  show the text
  textSize(15)
  text('Press up and down to show the head',width/5,height/4)
  }
  
  fill('#F824F8')
  ellipse(155,503,250,140)
  fill('#3810EB1')
  let step = 2; // Movement step size
  drawhead('#FFC8FF',step)
  drawbody("#EB8DD8")
  drawleg()
  
}

function keyPressed() {
  if (key === 's' || key === 'S') {//It has to be an 's' or a capital 'S'
    saveCanvas('myDrawing', 'jpg'); 
  }
}


function drawhead(pcolor,step){
  //press up and down to show the head
    if (keyIsDown(UP_ARROW)) { 
    fill(pcolor)
  ellipse(193,114-step,250,200)
  fill('#CB66D5')
  ellipse(193,114-step,160,90)
  fill('#F7F2F2')
  ellipse(193,114-step,80,50)
  fill('#111')
  ellipse(193,114-step,50,40)
  fill('#F7F2F2')
  ellipse(190,110-step,10,5)
      
  }
  if (keyIsDown(DOWN_ARROW)) { 
        fill(pcolor)
  ellipse(193,114+step,250,200)
  fill('#CB66D5')
  ellipse(193,114+step,160,90)
  fill('#F7F2F2')
  ellipse(193,114+step,80,50)
  fill('#111')
  ellipse(193,114+step,50,40)
  fill('#F7F2F2')
  ellipse(190,110+step,10,5)
  }
  

  
  
}

function drawbody(color){
  fill(color)
  push()
  beginShape()
  vertex(149,208)
  bezierVertex(108,269,145,324,152,353)
  bezierVertex(117,355,78,378,81,409)
  bezierVertex(30,324,22,395,58,461)
  bezierVertex(111,493,93,389,203,485)
  bezierVertex(329,441,362,265,256,203)
  bezierVertex(196,224,157,213,142,207) 
  endShape()
  pop()
}

function drawleg(){
    push()
  translate(150 - 198, 489 - 524);  // Move relative to the original point (198, 524)
  beginShape()
  vertex(198,524)
  vertex(111,412)
  vertex(81,417)
  vertex(86,561)
  vertex(43,576)
  vertex(51,585)
  vertex(119,564)
  vertex(103,461)
  vertex(167,541)
  vertex(198,524)
  endShape()
  pop()
  
  beginShape()//leg
  vertex(198,524)
  vertex(111,412)
  vertex(81,417)
  vertex(86,561)
  vertex(43,576)
  vertex(51,585)
  vertex(119,564)
  vertex(103,461)
  vertex(167,541)
  vertex(198,524)
  endShape()
  
  
  
  
}