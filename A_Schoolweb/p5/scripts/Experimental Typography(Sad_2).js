let myFont;
let points = [];
let jitterAmplitude = 5; // 初始抖动幅度

function preload() {
  // 加载 Coolvetica.otf 字体
  myFont = loadFont("Coolvetica.otf");
}

function setup() {
  createCanvas(600, 600);
  // 使用 textToPoints 将 "SAD" 转换为点阵，设置合适的起始坐标和大小
  points = myFont.textToPoints("SAD", 120, 350, 200, {
    sampleFactor: 0.1
  });
  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  background(255);
  
  // 对每个点利用 noise 生成一个简单的抖动效果
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let offsetX = map(noise(p.x * 0.01, p.y * 0.01, frameCount * 0.02), 0, 1, -jitterAmplitude, jitterAmplitude);
    let offsetY = map(noise(p.x * 0.01 + 100, p.y * 0.01 + 100, frameCount * 0.02), 0, 1, -jitterAmplitude, jitterAmplitude);
    ellipse(p.x + offsetX, p.y + offsetY, 4, 4);
  }
}

function mousePressed() {
  // 每次点击鼠标时切换抖动幅度，简单改变扰动感
  jitterAmplitude = (jitterAmplitude === 5) ? 20 : 5;
}
