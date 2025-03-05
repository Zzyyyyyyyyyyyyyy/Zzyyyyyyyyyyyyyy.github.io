let letters = [];

function setup() {
  createCanvas(600, 600);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  let word = "APPLE";
  // 根据字母数量设置字母间距
  let letterSpacing = 100;
  // 使整个单词水平居中
  let startX = width / 2 - ((word.length - 1) * letterSpacing) / 2;
  for (let i = 0; i < word.length; i++) {
    let letter = new InteractiveLetter(word[i], startX + i * letterSpacing, height / 2);
    letters.push(letter);
  }
}

function draw() {
  background(240);
  // 遍历每个字母，更新状态并绘制
  for (let letter of letters) {
    letter.update();
    letter.display();
  }
}

function mousePressed() {
  // 当点击时，检查鼠标是否靠近某个字母，如果是则给予该字母一个弹开的力
  for (let letter of letters) {
    let d = dist(mouseX, mouseY, letter.x, letter.y);
    if (d < 50) {
      let angle = atan2(letter.y - mouseY, letter.x - mouseX);
      letter.vx += cos(angle) * 5;
      letter.vy += sin(angle) * 5;
    }
  }
}

class InteractiveLetter {
  constructor(letter, x, y) {
    this.letter = letter;
    this.homeX = x; // 字母的初始（目标）位置
    this.homeY = y;
    this.x = x;
    this.y = y;
    this.size = 64;
    this.scale = 1;
    this.rotation = 0;
    this.targetScale = 1;
    this.targetRotation = 0;
    this.vx = 0;
    this.vy = 0;
  }
  
  update() {
    // 检测鼠标与字母中心的距离
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      this.targetScale = 1.5;
      // 鼠标靠近时，随机产生一个小角度旋转效果
      this.targetRotation = random(-PI/8, PI/8);
    } else {
      this.targetScale = 1;
      this.targetRotation = 0;
    }
    // 平滑过渡到目标状态
    this.scale = lerp(this.scale, this.targetScale, 0.1);
    this.rotation = lerp(this.rotation, this.targetRotation, 0.1);
    
    // 根据速度更新字母位置
    this.x += this.vx;
    this.y += this.vy;
    // 摩擦效果
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    // 字母缓慢回到原始位置（弹性回归）
    let homeDx = this.homeX - this.x;
    let homeDy = this.homeY - this.y;
    this.x += homeDx * 0.02;
    this.y += homeDy * 0.02;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scale);
    fill(50, 100, 200);
    noStroke();
    textSize(this.size);
    text(this.letter, 0, 0);
    pop();
  }
}
