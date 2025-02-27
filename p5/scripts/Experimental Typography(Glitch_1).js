let font;
let points = [];
let textStr = "GLITCH";

function preload() {
  // 加载字体文件，确保路径正确
  font = loadFont('SourceSansPro-Black.otf');
}

function setup() {
  createCanvas(600, 600);
  let fontSize = 150;
  // 计算文字边界
  let bounds = font.textBounds(textStr, 0, 0, fontSize);
  // 计算居中位置，利用 bounds.x 和 bounds.y 调整偏移
  let x = 50
  let y = (height - bounds.h) / 2 - bounds.y;
  
  // 将文字转为点集
  points = font.textToPoints(textStr, x, y, fontSize, {
    sampleFactor: 0.1
  });
  noStroke();
}

function draw() {
  background(30);
  fill(255);
  
  // 遍历每个点，检测鼠标距离并根据距离添加抖动效果
  for (let pt of points) {
    let d = dist(mouseX, mouseY, pt.x, pt.y);
    let offsetX = 0;
    let offsetY = 0;
    if (d < 50) {
      offsetX = random(-10, 10);
      offsetY = random(-10, 10);
    }
    ellipse(pt.x + offsetX, pt.y + offsetY, 5, 5);
  }
}
