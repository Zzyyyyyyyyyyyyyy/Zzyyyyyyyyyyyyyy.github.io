let letters = [];
let word = "GLITCH";
let myFont;
let hintStartTime;
let hintDuration = 3000; // 提示持续3秒

function preload() {
  // 从项目根目录加载字体文件
  myFont = loadFont('Coolvetica Rg Cond.otf');
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  hintStartTime = millis(); // 记录提示开始的时间

  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 200;
  let startAngle = -PI / 2;
  for (let i = 0; i < word.length; i++) {
    let angle = startAngle + i * (TWO_PI / word.length);
    let homeX = centerX + cos(angle) * radius;
    let homeY = centerY + sin(angle) * radius;
    letters.push(new Letter(word.charAt(i), homeX, homeY));
  }
}

function draw() {
  background('rgb(20, 20, 29)');
  
  // 绘制每个字母的粒子效果
  for (let letter of letters) {
    letter.update();
    letter.display();
  }
  
  // 显示提示文本，3秒后逐渐淡出
  let elapsed = millis() - hintStartTime;
  if (elapsed < hintDuration) {
    let alphaVal = map(elapsed, 0, hintDuration, 255, 0);
    textSize(24);
    fill(255, alphaVal);
    text("Try dragging them", width / 2, height / 2);
  }
}

function mousePressed() {
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
    
    let fontSize = 48;
    // 调整 sampleFactor 值，使粒子更密集
    this.points = myFont.textToPoints(this.ch, 0, 0, fontSize, {
      sampleFactor: 0.3
    });
    // 计算字母边界，将点阵居中
    let bounds = myFont.textBounds(this.ch, 0, 0, fontSize);
    for (let pt of this.points) {
      pt.x -= (bounds.x + bounds.w / 2);
      pt.y -= (bounds.y + bounds.h / 2);
    }
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
    
    // 鼠标靠近时字母整体放大
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
    fill('rgb(247,239,239)');
    noStroke();
    for (let pt of this.points) {
      // 基础噪声动态效果
      let noiseScale = 0.01;
      let baseOffsetX = map(noise(pt.x * noiseScale, pt.y * noiseScale, frameCount * 0.02), 0, 1, -3, 3);
      let baseOffsetY = map(noise(pt.y * noiseScale, pt.x * noiseScale, frameCount * 0.02 + 100), 0, 1, -3, 3);
      
      // 如果鼠标靠近字母中心，则让粒子“散开”
      let scatterOffsetX = 0;
      let scatterOffsetY = 0;
      let dLetter = dist(mouseX, mouseY, this.x, this.y);
      if (dLetter < 80) {
        // 鼠标越近，散开幅度越大（最大偏移可达到15像素）
        let scatterAmount = map(dLetter, 0, 80, 15, 0);
        scatterOffsetX = random(-scatterAmount, scatterAmount);
        scatterOffsetY = random(-scatterAmount, scatterAmount);
      }
      
      ellipse(pt.x + baseOffsetX + scatterOffsetX, pt.y + baseOffsetY + scatterOffsetY, 3, 3);
    }
    pop();
  }
  
  checkPressed() {
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
