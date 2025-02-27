let myFont;
let points = [];  // 存放每个点的信息

function preload() {
  // 加载 Coolvetica.otf 字体
  myFont = loadFont("Coolvetica.otf");
}

function setup() {
  createCanvas(600, 400);
  // 利用 textToPoints 将 "SAD" 转换为点阵
  // 此处字体大小设为200，起始位置 (50, 250)
  let pointsData = myFont.textToPoints("SAD", 120, 250, 200, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
  
  // 为每个点赋予轨道运动的参数
  for (let p of pointsData) {
    let baseOrbit = random(2, 8);       // 基础运动半径
    let orbitSpeed = random(0.01, 0.03);  // 运动速度
    let phaseOffset = random(TWO_PI);     // 初始相位
    points.push({
      target: createVector(p.x, p.y),     // 目标点（文字中的坐标）
      baseOrbit: baseOrbit,
      orbitSpeed: orbitSpeed,
      phaseOffset: phaseOffset
    });
  }
}

function draw() {
  background(20);
  noStroke();
  colorMode(HSB, 360, 100, 100);
  
  // 对每个点执行轨道运动效果
  for (let pt of points) {
    // 计算鼠标与目标点之间的距离，用于调节运动幅度
    let d = dist(mouseX, mouseY, pt.target.x, pt.target.y);
    // 如果鼠标靠近，放大运动半径；鼠标远离时运动半径较小
    let factor = map(d, 0, 300, 2, 0.5, true);
    let radius = pt.baseOrbit * factor;
    
    // 计算当前角度（随时间变化）
    let angle = frameCount * pt.orbitSpeed + pt.phaseOffset;
    let offsetX = radius * cos(angle);
    let offsetY = radius * sin(angle);
    
    // 当前点的位置为目标位置加上轨道偏移量
    let currentPos = createVector(pt.target.x + offsetX, pt.target.y + offsetY);
    
    // 绘制点——使用动态变化的颜色
    fill((angle * 50) % 360, 80, 100);
    ellipse(currentPos.x, currentPos.y, 6, 6);
    
    // 绘制一条从目标位置到当前点的连线
    stroke((angle * 50) % 360, 80, 100);
    line(pt.target.x, pt.target.y, currentPos.x, currentPos.y);
    noStroke();
  }
}

// 每次鼠标点击时，随机重新分配各点的初始相位，产生新效果
function mousePressed() {
  for (let pt of points) {
    pt.phaseOffset = random(TWO_PI);
  }
}
