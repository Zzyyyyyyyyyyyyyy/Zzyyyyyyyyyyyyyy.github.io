const rows = 10;
const columns = 10;

let PosX

function setup() {
  createCanvas(600, 600);
  noStroke()
}

function draw() {
  background(0);
  
  for(let i=0;i<=rows;i++){
    for(let j=0;j<=columns;j++){
      posX=width/rows*i
      posY=height/columns *j
            
      let distToMouse = dist(posX, posY, mouseX, mouseY);

      let c1Size = map(distToMouse, 0, 200, 80, 40, true);
      let c2Size = map(distToMouse, 0, 200, 40, 80, true);
      let c1Size1 = map(distToMouse, 0, 200, 50, 20, true);
      let c2Size1 = map(distToMouse, 0, 200, 20, 50, true);
      let c1Size2 = map(distToMouse, 0, 200, 20, 5, true);
      let c2Size2 = map(distToMouse, 0, 200, 5, 20, true);
      
      if ((i + j) % 2 === 0) {
     push();
        translate(posX, posY); // 将绘制原点移动到当前位置
        rotate(radians(340)); // 旋转 5 度，使图形以自我为中心向右旋转一点

        fill('#F9B8FD');
        ellipse(0, 0, 50, c2Size);

        fill('#F9E6FA');
        ellipse(0, 0, 40, c2Size1);

        fill(0);
        ellipse(0, 0, c2Size2, c2Size2);
        pop(); 
        
      } else {
       push();
        translate(posX, posY); 
        rotate(radians(20)); 

        fill('#F9B8FD');
        ellipse(0, 0, 50, c1Size);

        fill('#F9E6FA');
        ellipse(0, 0, 40, c1Size1);

        fill(0);
        ellipse(0, 0, c1Size2, c1Size2);
        pop(); 
      }
      
      
    }
  }
}