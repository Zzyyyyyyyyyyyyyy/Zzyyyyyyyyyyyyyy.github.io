let letters = [];
let word = "APPLE";

function setup() {
  createCanvas(600, 600);
  textFont("Georgia");
  textSize(48);
  textAlign(CENTER, CENTER);
  // 以画布中心为圆心，设置圆形排版半径
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150;
  // 从顶部开始均匀排布
  let startAngle = -PI / 2;
  for (let i = 0; i < word.length; i++) {
    let angle = startAngle + i * (TWO_PI / word.length);
    let homeX = centerX + cos(angle) * radius;
    let homeY = centerY + sin(angle) * radius;
    letters.push(new Letter(word.charAt(i), homeX, homeY));
  }
}

function draw() {
  background(245);
  // 更新并显示每个字母
  for (let letter of letters) {
    letter.update();
    letter.display();
  }
}

function mousePressed() {
  // 检查每个字母是否被点击
  for (let letter of letters) {
    letter.checkPressed();
  }
}

function mouseDragged() {
  for (let letter of letters) {
    letter.drag();
  }
}

function mouseReleased() {
  for (let letter of letters) {
    letter.release();
  }
}

class Letter {
  constructor(ch, homeX, homeY) {
    this.ch = ch;
    this.homeX = homeX;
    this.homeY = homeY;
    this.x = homeX;
    this.y = homeY;
    this.vx = 0;
    this.vy = 0;
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scaleFactor = 1;
  }
  
  update() {
    // 非拖拽状态下，通过弹性力让字母回到预设位置
    if (!this.isDragging) {
      let springStrength = 0.05;
      let dx = this.homeX - this.x;
      let dy = this.homeY - this.y;
      this.vx += dx * springStrength;
      this.vy += dy * springStrength;
      // 摩擦效果
      this.vx *= 0.9;
      this.vy *= 0.9;
      this.x += this.vx;
      this.y += this.vy;
    }
    
    // 当鼠标靠近时放大
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 40 && !this.isDragging) {
      this.scaleFactor = lerp(this.scaleFactor, 1.2, 0.1);
    } else {
      this.scaleFactor = lerp(this.scaleFactor, 1, 0.1);
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);
    fill(50, 100, 200);
    noStroke();
    text(this.ch, 0, 0);
    pop();
  }
  
  checkPressed() {
    // 如果鼠标在字母附近，则进入拖拽状态
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 40) {
      this.isDragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }
  
  drag() {
    if (this.isDragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }
  
  release() {
    this.isDragging = false;
  }
}
