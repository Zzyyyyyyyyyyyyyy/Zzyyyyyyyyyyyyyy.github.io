let myFont;
let points = [];
let shapeTypes = ["line", "rect", "square", "circle"]; 
let shapeIndexArray = []; // 每个点对应的形状索引

function preload() {
  // 一定要把 Coolvetica.otf 放在和 sketch.js 同级目录
  myFont = loadFont("Coolvetica.otf");
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100); // 使用 HSB 模式，做颜色变化更方便
  
  // 将 "SAD" 转为点阵
  // 可以通过 sampleFactor 调整点的密度
  points = myFont.textToPoints("SAD", 150, 300, 180, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });

  // 随机给每个点分配一个形状
  for (let i = 0; i < points.length; i++) {
    shapeIndexArray[i] = floor(random(shapeTypes.length));
  }
}

function draw() {
  background(240);

  strokeWeight(1);
  noFill();

  // 绘制所有点，并让它们在垂直方向产生波动
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let shapeIndex = shapeIndexArray[i];
    
    // 让点产生波动的关键：根据时间 + 点索引来计算波动量
    let angle = frameCount * 0.02 + i * 0.2; 
    let waveY = pt.y + sin(angle) * 10; // 在 y 方向上下波动
    
    // 根据 angle 动态改变颜色，产生渐变效果
    stroke((angle * 50) % 360, 80, 100);
    
    // 绘制形状
    drawShape(shapeTypes[shapeIndex], pt.x, waveY);
  }
}

// 根据 shapeType 绘制不同的形状
function drawShape(shapeType, x, y) {
  switch (shapeType) {
    case "line":
      // 画一条水平线
      line(x - 5, y, x + 5, y);
      break;
    case "rect":
      // 画一个小矩形
      rect(x - 5, y - 3, 10, 6);
      break;
    case "square":
      // 画一个小正方形
      square(x - 4, y - 4, 8);
      break;
    case "circle":
      // 画一个空心圆
      ellipse(x, y, 10, 10);
      break;
  }
}

// 每次点击画布，随机改变所有点对应的形状
function mousePressed() {
  for (let i = 0; i < shapeIndexArray.length; i++) {
    shapeIndexArray[i] = floor(random(shapeTypes.length));
  }
}
