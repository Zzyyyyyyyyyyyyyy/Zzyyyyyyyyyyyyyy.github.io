let font;
let points = [];
let textStr = "GLITCH";

function preload() {
  // 加载字体文件，确保路径正确
  font = loadFont('otf/SourceSansPro-Black.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 设置文本大小，并计算文本边界以便居中显示
  let fontSize = 200;
  let bounds = font.textBounds(textStr, 0, 0, fontSize);
  let x = (width - bounds.w) / 2;
  let y = (height + bounds.h) / 2;
  // 利用 textToPoints 方法将文字转为点集，sampleFactor 调整采样密度
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
    // 当鼠标靠近（50像素范围内），让该点随机偏移
    if (d < 50) {
      offsetX = random(-10, 10);
      offsetY = random(-10, 10);
    }
    ellipse(pt.x + offsetX, pt.y + offsetY, 5, 5);
  }
}
