let font;
let particles = [];
let points = [];
let word = "APPLE";
let fontSize = 150;

function preload() {
  // 确保字体文件与 HTML 在同一文件夹下
  font = loadFont('SourceSansPro-Black.otf');
}

function setup() {
  createCanvas(600, 600);
  background(245);
  textFont(font);
  
  // 计算文字边界，使 "APPLE" 居中显示
  let bbox = font.textBounds(word, 0, 0, fontSize);
  let x = width / 2 - bbox.w / 2;
  let y = height / 2 + bbox.h / 2;
  
  // 将文字转换为点阵数据
  points = font.textToPoints(word, x, y, fontSize, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });
  
  // 为每个点创建一个粒子对象
  for (let pt of points) {
    particles.push(new Particle(pt.x, pt.y));
  }
}

function draw() {
  background(245);
  
  // 更新并显示所有粒子
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor(tx, ty) {
    // 目标位置（构成文字的点）
    this.tx = tx;
    this.ty = ty;
    // 初始位置随机分布
    this.x = random(width);
    this.y = random(height);
    this.vx = 0;
    this.vy = 0;
  }
  
  update() {
    // 计算弹性力，使粒子趋向目标位置
    let ax = (this.tx - this.x) * 0.05;
    let ay = (this.ty - this.y) * 0.05;
    
    // 当鼠标按下时，靠近鼠标的粒子会受到额外的吸引及旋转力
    if (mouseIsPressed) {
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let d = sqrt(dx * dx + dy * dy);
      if (d < 100) {  // 只有在一定范围内的粒子受影响
        // 先加入吸引力：拉向鼠标
        let attractionFactor = 0.03;
        ax += dx * attractionFactor;
        ay += dy * attractionFactor;
        
        // 再加入垂直于鼠标方向的漩涡力
        // 计算当前向量的角度
        let angle = atan2(dy, dx);
        // 垂直向量（顺时针旋转 90°）
        let perpX = -sin(angle);
        let perpY = cos(angle);
        // 漩涡力随距离衰减
        let swirlFactor = 0.08;
        let decay = (100 - d) / 100;
        ax += perpX * swirlFactor * decay;
        ay += perpY * swirlFactor * decay;
      }
    }
    
    // 更新速度和位置，并添加阻尼（使运动更平滑）
    this.vx = (this.vx + ax) * 0.92;
    this.vy = (this.vy + ay) * 0.92;
    this.x += this.vx;
    this.y += this.vy;
  }
  

  display() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, 6, 6);
  }
}
