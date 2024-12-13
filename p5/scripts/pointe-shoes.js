function setup() {
    createCanvas(1100, 1000); 
    noCursor(); // Hide the default mouse cursor
    smooth(); 
  
  
  }
  
  function draw() {
    
    push()
    translate(100, 100)//move central point
    rotate(PI/12)//15
    background("#E7D3C7");
  
    //left side
    //ground
    blendMode(BLEND);
    noStroke()
    fill("#E67070")
    beginShape()
    vertex(160,503)
    bezierVertex(327,482,483,479,532,481)
    bezierVertex(423,495,556,500,424,499)
    bezierVertex(322,497,383,521,496,513)
    bezierVertex(547,545,391,528,152,509)
    bezierVertex(150,507,143,503,160,503)
    endShape()
    
    noStroke()
    fill("#7E3F3F")
    beginShape()
    vertex(229,497)
    bezierVertex(290,512,294,525,174,510)
    bezierVertex(136,510,174,480,175,480)
    endShape()
    
    
    // MAIN
    stroke(0);
    strokeWeight(5);
    fill("#F0A0A0");
    beginShape();
    vertex(371, 86);
    bezierVertex(274, 102, 140, 332, 136, 479);
    bezierVertex(136, 485, 200, 520, 230, 491);
    bezierVertex(335, 434, 300, 348, 394, 270);
    bezierVertex(440, 249, 481, 205, 444, 119);
    bezierVertex(444, 119, 430, 89, 371, 86);
    endShape();
    
    
  //Undershoe dark
    noStroke()
    fill("#E67070")
    beginShape()
    vertex(205,340)
    bezierVertex(286,204,378,117,410,134)
    bezierVertex(435,64,282,93,194,325)
    bezierVertex()
    endShape()
    
    
    
    //Sole of shoe
      stroke('#000000')
    fill('#FDEEEE')
    beginShape()
    vertex(205,335)
    bezierVertex(252,284,345,110,411,138)
    bezierVertex(398,185,250,417,205,335)
    endShape()
     //Sole dust
    noStroke()
    fill('#D5BCBC')
    beginShape()
    vertex(246,345)
    bezierVertex(233,310,321,185,407,143)
    bezierVertex(366,104,253,264,209,332)
    bezierVertex(214,370,233,349,246,345)
    endShape()
    
    
  
     blendMode(BLEND);
  
    
    
    // Side pink
    noStroke();
    fill("#E07878");
    beginShape();
    vertex(215, 498);
    bezierVertex(295,487,322,346,375,282);
    bezierVertex(427,261,485,203,445,129);
    bezierVertex(445,185,434,211,367,279);
    bezierVertex(317,338,234,442,208,497);
    bezierVertex();
  
    endShape();
    
    // left bottom side white
    noStroke();
    fill('#FDEEEE');
    beginShape();
    vertex(149.485);
    bezierVertex(183, 310, 140, 390, 140, 476);
    endShape();
    
    
    //The color around the shoes
    
    fill('#FDEEEE')
    noStroke()
    beginShape()
    vertex(184,302)
    bezierVertex(223,197,308,104,371,87)
    bezierVertex(380,99,314,123,272,180)
    bezierVertex(239,232,195,317,184,302)
    endShape()
    
    beginShape()
    vertex(185,302)
    bezierVertex(186,377,230,388,294,332)
    bezierVertex(348,272,392,215,431,132)
    bezierVertex(450,100,410,90,369,86)
    bezierVertex(333,113,438,75,416,142)
    bezierVertex(374,210,322,295,251,347)
    bezierVertex(211,367,199,330,202,294)
    bezierVertex()
    endShape()
    
  
    
    //The color of the outer rim
    strokeWeight(4);
    noFill();
    stroke('#000000');
    beginShape();
    vertex(438, 113);
    bezierVertex(433, 140, 391, 230, 309, 316);
    bezierVertex(253, 370, 186, 400, 186, 302);
    endShape();
    
    //the inner rim
    noFill();
    strokeWeight(4);
    stroke('#000000');
    beginShape();
    vertex(405,105)
    bezierVertex(433,123,405,160,372,215)
    bezierVertex(301,305,268,352,221,352)
    bezierVertex(173,321,218,265,272,183)
    bezierVertex(305,133,356,98,388,100)
    endShape(CLOSE)
    
    //Bow
    noFill()
    stroke('#000000')
    beginShape()
    vertex(220,349)
    bezierVertex(172,309,163,343,170,357)
    bezierVertex(170,358,163,360,175,366)
    bezierVertex(252,324,209,391,252,387)
    bezierVertex(245,360,206,368,225,351)
    bezierVertex(251,313,321,352,233,363)
    bezierVertex(177,393,187,367,226,352)
    endShape()
    
    //Under ribbon color
    noStroke()
    fill("#E07878")
    beginShape()
    vertex(268,160)
    bezierVertex(282,216,330,244,332,264)
    bezierVertex(322,289,282,222,256,175)
    endShape()
    
    //Bottom of ribbon
    noFill()
    stroke('#000000')
    beginShape()
    vertex(270,159)
    bezierVertex(264,188,310,220,333,260)
    endShape()
    
    beginShape()
    vertex(325,272)
    bezierVertex(301,241,261,203,256,176)
    endShape()
    
    
    //On the ribbon
    
  noFill()
    stroke('#FDEEEE')
    beginShape()
    vertex(378,199)
    bezierVertex(329,202,285,213,245,232)
    endShape()
    
      fill("#E07878")
    noStroke()
    beginShape()
    vertex(234,244)
    bezierVertex(228,230,342,198,375,202)
    bezierVertex(384,214,295,215,238,242)
    bezierVertex()
    endShape()
    
    noFill()
    stroke('#000000')
    beginShape()
    vertex(243,228)
    bezierVertex(305,203,329,196,379,196)
    
    endShape()
    
    noFill()
    stroke('#000000')
    beginShape()
    vertex(232,245)
    bezierVertex(292,225,335,210,375,210)
    
    endShape()
    
      //Decoration
    noStroke()
    fill('#FBE5E5')
    ellipse(444,143,6,6)
    ellipse(443,156,6,6)
    ellipse(442,172,6,6)
    ellipse(435,190,6,6)
    ellipse(428,203,6,6)
    ellipse(352,274,6,6)
    ellipse(360,280,6,6)
    ellipse(367,286,6,6)
    ellipse(340,292,6,6)
    ellipse(348,296,6,6)
    ellipse(357,303,6,6)
    ellipse(367,96,5,5)
    ellipse(365,99,6,6)
    ellipse(371,99,3,3)
    //banderole
    fill("#E07878")
    stroke('#000000')
    strokeWeight(2)
    beginShape()
    vertex(461,159)
    bezierVertex(509,148,519,156,512,182)
    bezierVertex(491,174,449,202,461,159)
    bezierVertex()
    endShape()
    
    beginShape()
    vertex(512,181)
    bezierVertex(533,231,387,281,369,297)
    bezierVertex(328,341,424,300,499,257)
    bezierVertex(534,237,580,179,511,158)
    endShape()
    
    noFill()
    beginShape()
    vertex(504,155)
    bezierVertex(530,161,520,184,510,205)
    endShape()
    
  fill("#E07878")
    stroke('#000000')
    beginShape()
    vertex(357,314)
    bezierVertex(443,356,518,290,519,367)
    bezierVertex(503,326,403,368,343,335)
    endShape()
  
    beginShape()
    vertex(319,439)
    bezierVertex(387,339,455,407,501,352)
    bezierVertex(580,399,389,387,338,448)
    bezierVertex()
    endShape()
    
    //Ribbon patch
    noStroke()
    fill('#000000')
    ellipse(459,160,3,3)
    ellipse(462,183,4,4)
    
    blendMode(ADD); 
    noFill()
    strokeWeight(5)
    stroke('#FDEEEE')
    beginShape()
    vertex(522,166)
    bezierVertex(532,208,478,249,436,266)
    endShape()
    
    beginShape()
    vertex(448,333)
    bezierVertex(485,331,509,327,511,349)
    
  
    endShape()
    blendMode(BLEND);
    
    pop()
    
    
    //right side
    push();  
  
  blendMode(BLEND);
    translate(1000,100);  // move 
  
    scale(-1, 1);  // Horizontal flip
    rotate(PI/12)
    
    //ground
    noStroke()
    fill("#E67070")
    beginShape()
    vertex(160,503)
    bezierVertex(327,482,483,479,532,481)
    bezierVertex(423,495,556,500,424,499)
    bezierVertex(322,497,383,521,496,513)
    bezierVertex(547,545,391,528,152,509)
    bezierVertex(150,507,143,503,160,503)
    endShape()
    
    noStroke()
    fill("#7E3F3F")
    beginShape()
    vertex(229,497)
    bezierVertex(290,512,294,525,174,510)
    bezierVertex(136,510,174,480,175,480)
    endShape()
    
    
    // MAIN
    stroke(0);
    strokeWeight(5);
    fill("#F0A0A0");
    beginShape();
    vertex(371, 86);
    bezierVertex(274, 102, 140, 332, 136, 479);
    bezierVertex(136, 485, 200, 520, 230, 491);
    bezierVertex(335, 434, 300, 348, 394, 270);
    bezierVertex(440, 249, 481, 205, 444, 119);
    bezierVertex(444, 119, 430, 89, 371, 86);
    endShape();
    
    
  //Undershoe dark
    noStroke()
    fill("#E67070")
    beginShape()
    vertex(205,340)
    bezierVertex(286,204,378,117,410,134)
    bezierVertex(435,64,282,93,194,325)
    bezierVertex()
    endShape()
    
    
    
    //Sole of shoe
      stroke('#000000')
    fill('#FDEEEE')
    beginShape()
    vertex(205,335)
    bezierVertex(252,284,345,110,411,138)
    bezierVertex(398,185,250,417,205,335)
    endShape()
     //Sole dust
    noStroke()
    fill('#D5BCBC')
    beginShape()
    vertex(246,345)
    bezierVertex(233,310,321,185,407,143)
    bezierVertex(366,104,253,264,209,332)
    bezierVertex(214,370,233,349,246,345)
    endShape()
    
    
  
     blendMode(BLEND);
  
    
    
    // Side pink
    noStroke();
    fill("#E07878");
    beginShape();
    vertex(215, 498);
    bezierVertex(295,487,322,346,375,282);
    bezierVertex(427,261,485,203,445,129);
    bezierVertex(445,185,434,211,367,279);
    bezierVertex(317,338,234,442,208,497);
    bezierVertex();
  
    endShape();
    
    // left bottom side white
    noStroke();
    fill('#FDEEEE');
    beginShape();
    vertex(149.485);
    bezierVertex(183, 310, 140, 390, 140, 476);
    endShape();
    
    
    //The color around the shoes
    
    fill('#FDEEEE')
    noStroke()
    beginShape()
    vertex(184,302)
    bezierVertex(223,197,308,104,371,87)
    bezierVertex(380,99,314,123,272,180)
    bezierVertex(239,232,195,317,184,302)
    endShape()
    
    beginShape()
    vertex(185,302)
    bezierVertex(186,377,230,388,294,332)
    bezierVertex(348,272,392,215,431,132)
    bezierVertex(450,100,410,90,369,86)
    bezierVertex(333,113,438,75,416,142)
    bezierVertex(374,210,322,295,251,347)
    bezierVertex(211,367,199,330,202,294)
    bezierVertex()
    endShape()
    
  
    
    //The color of the outer rim
    strokeWeight(4);
    noFill();
    stroke('#000000');
    beginShape();
    vertex(438, 113);
    bezierVertex(433, 140, 391, 230, 309, 316);
    bezierVertex(253, 370, 186, 400, 186, 302);
    endShape();
    
    //the inner rim
    noFill();
    strokeWeight(4);
    stroke('#000000');
    beginShape();
    vertex(405,105)
    bezierVertex(433,123,405,160,372,215)
    bezierVertex(301,305,268,352,221,352)
    bezierVertex(173,321,218,265,272,183)
    bezierVertex(305,133,356,98,388,100)
    endShape(CLOSE)
    
    //Bow
    noFill()
    stroke('#000000')
    beginShape()
    vertex(220,349)
    bezierVertex(172,309,163,343,170,357)
    bezierVertex(170,358,163,360,175,366)
    bezierVertex(252,324,209,391,252,387)
    bezierVertex(245,360,206,368,225,351)
    bezierVertex(251,313,321,352,233,363)
    bezierVertex(177,393,187,367,226,352)
    endShape()
    
    //Under ribbon color
    noStroke()
    fill("#E07878")
    beginShape()
    vertex(268,160)
    bezierVertex(282,216,330,244,332,264)
    bezierVertex(322,289,282,222,256,175)
    endShape()
    
    //Bottom of ribbon
    noFill()
    stroke('#000000')
    beginShape()
    vertex(270,159)
    bezierVertex(264,188,310,220,333,260)
    endShape()
    
    beginShape()
    vertex(325,272)
    bezierVertex(301,241,261,203,256,176)
    endShape()
    
    
    //On the ribbon
    
  noFill()
    stroke('#FDEEEE')
    beginShape()
    vertex(378,199)
    bezierVertex(329,202,285,213,245,232)
    endShape()
    
      fill("#E07878")
    noStroke()
    beginShape()
    vertex(234,244)
    bezierVertex(228,230,342,198,375,202)
    bezierVertex(384,214,295,215,238,242)
    bezierVertex()
    endShape()
    
    noFill()
    stroke('#000000')
    beginShape()
    vertex(243,228)
    bezierVertex(305,203,329,196,379,196)
    
    endShape()
    
    noFill()
    stroke('#000000')
    beginShape()
    vertex(232,245)
    bezierVertex(292,225,335,210,375,210)
    
    endShape()
    
      //Decoration
    noStroke()
    fill('#FBE5E5')
    ellipse(444,143,6,6)
    ellipse(443,156,6,6)
    ellipse(442,172,6,6)
    ellipse(435,190,6,6)
    ellipse(428,203,6,6)
    ellipse(352,274,6,6)
    ellipse(360,280,6,6)
    ellipse(367,286,6,6)
    ellipse(340,292,6,6)
    ellipse(348,296,6,6)
    ellipse(357,303,6,6)
    ellipse(367,96,5,5)
    ellipse(365,99,6,6)
    ellipse(371,99,3,3)
    //banderole
    fill("#E07878")
    stroke('#000000')
    strokeWeight(2)
    beginShape()
    vertex(461,159)
    bezierVertex(509,148,519,156,512,182)
    bezierVertex(491,174,449,202,461,159)
    bezierVertex()
    endShape()
    
    beginShape()
    vertex(512,181)
    bezierVertex(533,231,387,281,369,297)
    bezierVertex(328,341,424,300,499,257)
    bezierVertex(534,237,580,179,511,158)
    endShape()
    
    noFill()
    beginShape()
    vertex(504,155)
    bezierVertex(530,161,520,184,510,205)
    endShape()
    
  fill("#E07878")
    stroke('#000000')
    beginShape()
    vertex(357,314)
    bezierVertex(443,356,518,290,519,367)
    bezierVertex(503,326,403,368,343,335)
    endShape()
  
    beginShape()
    vertex(319,439)
    bezierVertex(387,339,455,407,501,352)
    bezierVertex(580,399,389,387,338,448)
    bezierVertex()
    endShape()
    
    //Ribbon patch
    noStroke()
    fill('#000000')
    ellipse(459,160,3,3)
    ellipse(462,183,4,4)
    
    blendMode(ADD); 
    noFill()
    strokeWeight(5)
    stroke('#FDEEEE')
    beginShape()
    vertex(522,166)
    bezierVertex(532,208,478,249,436,266)
    endShape()
    
    beginShape()
    vertex(448,333)
    bezierVertex(485,331,509,327,511,349)
    
  
    endShape()
    blendMode(BLEND);
    
    pop()
    
    
    fill("#BD6A6A")
    
    // Show mouse coordinates
    // strokeWeight(1);
    // fill(0);
    // textSize(16);
    // text(`X: ${mouseX}, Y: ${mouseY}`, mouseX + 10, mouseY - 10); // Display place on mouse（content,where）
  
    // custom cursor
    // stroke(0);
    // strokeWeight(1);
    // line(mouseX - 10, mouseY, mouseX + 10, mouseY); // line
    // line(mouseX, mouseY - 10, mouseX, mouseY + 10); // line
    
    
  }
  
  // press 's' to save as jpg
  function keyPressed() {
    if (key === 's' || key === 'S') {//It has to be an 's' or a capital 'S'
      saveCanvas('myDrawing', 'jpg'); 
    }
  }
  
  