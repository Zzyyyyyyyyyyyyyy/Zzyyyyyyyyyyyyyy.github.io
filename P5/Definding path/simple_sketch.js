// 简单演示版本 - 不需要外部图片
let ball;

function setup() {
  // 创建画布
  createCanvas(windowWidth, windowHeight);
  console.log("画布已创建，宽度:", width, "高度:", height);
  
  // 创建小球对象
  ball = new Ball();
  console.log("小球已创建");
}

function draw() {
  // 设置背景色
  background(50, 0, 80);
  
  // 显示文字提示
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("使用箭头键移动小球", width/2, 50);
  
  // 显示和移动小球
  ball.display();
  ball.move();
}

function windowResized() {
  // 窗口大小改变时调整画布
  resizeCanvas(windowWidth, windowHeight);
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 30;
    this.color = color(255, 255, 0);
    this.speed = 5;
  }
  
  display() {
    // 绘制小球
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  move() {
    // 控制小球移动
    if (keyIsDown(RIGHT_ARROW)) {
      this.x = min(width - this.size/2, this.x + this.speed);
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x = max(this.size/2, this.x - this.speed);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y = min(height - this.size/2, this.y + this.speed);
    }
    if (keyIsDown(UP_ARROW)) {
      this.y = max(this.size/2, this.y - this.speed);
    }
  }
} 