let font;
let points = [];
let textStr = "GLITCH";

// 直线连接的点间隔
let spacingIndex = 3;
// 多层直线的层数以及每层之间的垂直间距
let numLayers = 3;
let layerSpacing = 5;

// 为每个线段保存独立的拖拽偏移量
let segmentOffsets = [];
// 正在拖拽的线段索引（null表示没有拖拽）
let draggingSegment = null;
// 记录鼠标按下时的初始位置以及对应线段的偏移量
let dragMouseStart = { x: 0, y: 0 };
let dragStartOffset = { x: 0, y: 0 };

function preload() {
  // 加载常用字体，确保路径正确
  font = loadFont('SourceSansPro-Black.otf');
}

function setup() {
  createCanvas(600, 600);
  let fontSize = 150;
  // 计算文字边界，实现居中显示
  let bounds = font.textBounds(textStr, 0, 0, fontSize);
  let baseX = 50;
  let baseY = (height + bounds.h) / 2;
  // 生成文字点集
  points = font.textToPoints(textStr, baseX, baseY, fontSize, {
    sampleFactor: 0.1
  });
  
  // 初始化每个线段的拖拽偏移量为 {0,0}
  for (let i = 0; i < points.length - spacingIndex; i++) {
    segmentOffsets[i] = { x: 0, y: 0 };
  }
  
  noFill();
}

function draw() {
  background(30);
  
  // 定义渐变色：从红色到蓝色
  let colorStart = color(255, 50, 50);
  let colorEnd = color(50, 50, 255);
  strokeWeight(2);
  
  // 遍历每个线段，根据 spacingIndex 连接直线
  for (let i = 0; i < points.length - spacingIndex; i++) {
    let ptA = points[i];
    let ptB = points[i + spacingIndex];
    let offset = segmentOffsets[i];
    
    // 应用各自的拖拽偏移
    let x1 = ptA.x + offset.x;
    let y1 = ptA.y + offset.y;
    let x2 = ptB.x + offset.x;
    let y2 = ptB.y + offset.y;
    
    // 绘制多层直线，每层增加一定的垂直偏移并呈现颜色渐变
    for (let j = 0; j < numLayers; j++) {
      let t = j / (numLayers - 1);
      let layerColor = lerpColor(colorStart, colorEnd, t);
      stroke(layerColor);
      
      let vOffset = j * layerSpacing;
      line(x1, y1 + vOffset, x2, y2 + vOffset);
    }
  }
}

// 计算点到线段的距离
function pointToLineDistance(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;
  
  let dot = A * C + B * D;
  let len_sq = C * C + D * D;
  let param = len_sq !== 0 ? dot / len_sq : -1;
  
  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }
  let dx = px - xx;
  let dy = py - yy;
  return sqrt(dx * dx + dy * dy);
}

function mousePressed() {
  // 检测鼠标是否靠近某个线段（设定距离阈值，比如10像素）
  let threshold = 10;
  for (let i = 0; i < points.length - spacingIndex; i++) {
    let ptA = points[i];
    let ptB = points[i + spacingIndex];
    let offset = segmentOffsets[i];
    let x1 = ptA.x + offset.x;
    let y1 = ptA.y + offset.y;
    let x2 = ptB.x + offset.x;
    let y2 = ptB.y + offset.y;
    
    let d = pointToLineDistance(mouseX, mouseY, x1, y1, x2, y2);
    if (d < threshold) {
      draggingSegment = i;
      dragMouseStart.x = mouseX;
      dragMouseStart.y = mouseY;
      // 记录当前该线段的初始偏移量
      dragStartOffset.x = offset.x;
      dragStartOffset.y = offset.y;
      break;
    }
  }
}

function mouseDragged() {
  if (draggingSegment !== null) {
    // 更新选中线段的偏移量，使该线段跟随鼠标拖拽
    segmentOffsets[draggingSegment].x = dragStartOffset.x + (mouseX - dragMouseStart.x);
    segmentOffsets[draggingSegment].y = dragStartOffset.y + (mouseY - dragMouseStart.y);
  }
}

function mouseReleased() {
  draggingSegment = null;
}
