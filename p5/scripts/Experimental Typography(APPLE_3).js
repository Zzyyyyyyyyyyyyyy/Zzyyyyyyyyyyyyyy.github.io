let font;
let particles = [];
let points = [];
let word = "APPLE";
let fontSize = 150;

function preload() {
  // 使用托管在 GitHub 上的字体文件（确保网络通畅）
  font = loadFont('otf/SourceSansPro-Black.otf');
}

function setup() {
  createCanvas(600, 600);
  background(0);
  textFont(font);
  
  // 计算文字边界，使“APPLE”居中显示
  let bbox = font.textBounds(word, 0, 0, fontSize);
  let x = width / 2 - bbox.w / 2;
  let y = height / 2 + bbox.h / 2;
  
  // 将文字转换为点阵数据
  points = font.textToPoints(word, x, y, fontSize, {
    sampleFactor: 0.2,       // 采样密度，可调节形成粒子的数量
    simplifyThreshold: 0
  });
  
  // 为每个点创建一个粒子对象
  for (let pt of points) {
    particles.push(new Particle(pt.x, pt.y));
  }
}

function draw() {
  background(0);
  
  // 更新并显示所有粒子
  for (let p of particles) {
    p.update();
    p.display();
  }
}

function mousePressed() {
  // 点击时，为所有粒子添加随机冲击力
  for (let p of particles) {
    p.vx += random(-10, 10);
    p.vy += random(-10, 10);
  }
}

class Particle {
  constructor(tx, ty) {
    // 目标位置：构成文字的点
    this.tx = tx;
    this.ty = ty;
    // 初始位置随机分布
    this.x = random(width);
    this.y = random(height);
    this.vx = 0;
    this.vy = 0;
  }
  
  update() {
    // 计算弹性力，让粒子趋向目标位置
    let ax = (this.tx - this.x) * 0.05;
    let ay = (this.ty - this.y) * 0.05;
    
    // 如果鼠标靠近，则增加排斥效果
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let repulsion = (50 - d) * 0.2;
      ax += cos(angle) * repulsion;
      ay += sin(angle) * repulsion;
    }
    
    // 更新速度和位置，并添加摩擦力
    this.vx = (this.vx + ax) * 0.9;
    this.vy = (this.vy + ay) * 0.9;
    this.x += this.vx;
    this.y += this.vy;
  }
  
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 4, 4);
  }
}
