let Day1WaterAmounts=[240, 290, 370, 200, 170, 330, 360, 270, 260, 280]
let Day1WaterWaterTimes=[15, 18, 7, 7, 8, 17, 18, 21, 21, 16]

let Day2WaterAmounts=[ 280, 310, 180, 280, 300, 260, 370, 280, 250, 360]
let Day2WaterWaterTimes=[14, 8, 18, 7, 18, 18, 14, 18, 7, 11]

let Day3WaterAmounts=[210, 240, 250, 200, 350, 300, 250, 390, 390, 220]
let Day3WaterWaterTimes=[13, 7, 12, 20, 12, 6, 10, 9, 19, 20]

let Day4WaterAmounts=[200, 250, 290, 210, 380, 320, 160, 500]
let Day4WaterWaterTimes=[20, 6, 21, 20, 20, 14, 8, 17]

let Day5WaterAmounts=[220, 340, 170, 230, 370, 150, 210, 260, 210, 390]
let Day5WaterWaterTimes=[ 6, 7, 13, 8, 16, 20, 18, 18, 15, 6]

let Day6WaterAmounts=[260, 310, 250, 290, 360, 340, 210, 240, 300, 190]
let Day6WaterWaterTimes=[17, 12, 7, 17, 17, 12, 19, 11, 17, 11]

let Day7WaterAmounts=[340, 210, 340, 230, 260, 350, 240, 440]
let Day7WaterWaterTimes=[14, 7, 21, 20, 16, 16, 12, 12, 22, 19]



let daysWaterAmounts = [Day1WaterAmounts, Day2WaterAmounts, Day3WaterAmounts, Day4WaterAmounts, Day5WaterAmounts, Day6WaterAmounts, Day7WaterAmounts];

let daysWaterTimes = [Day1WaterWaterTimes, Day2WaterWaterTimes, Day3WaterWaterTimes, Day4WaterWaterTimes, Day5WaterWaterTimes, Day6WaterWaterTimes, Day7WaterWaterTimes];

let currentDay = 0;
let maxBubbleSize = 300;//max bubble size
let animationSpeeds = [];
// create variable to store color array
let bgColors;

// start index at 0
let idx = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  bgColors =
    [   color(173, 216, 230), color(135, 206, 235), color(100, 149, 237), color(70, 130, 180),color(65, 105, 225),color(0, 105, 240),color(0, 105, 250)]
  for (let i = 0; i < daysWaterAmounts.length; i++) {
    animationSpeeds[i] = new Array(daysWaterAmounts[i].length).fill(0);
  }

}

function draw() {
  background(bgColors[idx]);
  drawBubbles();
  drawLabels();
}

function drawBubbles() {
  let dayData = daysWaterAmounts[currentDay];
  let dayTimes = daysWaterTimes[currentDay];
  let centerX = width / 2;
  let centerY = height / 2;
  let angleStep = TWO_PI / dayData.length;
  
  for (let i = 0; i < dayData.length; i++) {
    let angle = angleStep * i;// Calculate the angle bubble around the center
    let targetSize = map(dayData[i], 0, 500, 0, maxBubbleSize);// water amount to a bubble size
    animationSpeeds[currentDay][i] = lerp(animationSpeeds[currentDay][i], targetSize, 0.05);//chatgpt Helped me with the math
    
    let bubbleSize = animationSpeeds[currentDay][i];
    let x = centerX + cos(angle) * 150;
    let y = centerY + sin(angle) * 150;
    
    //Each bubble
    fill(map(dayTimes[i], 0, 24, 0, 255), 100, 200, 150);
    ellipse(x, y, bubbleSize);
    
    // Draw time label
    fill(0);
    textSize(12);
    text(dayTimes[i] + ":00", x, y - bubbleSize / 2 - 10);
    
    // Draw amount labal
    textSize(14);
    text(dayData[i] + "ml", x, y + bubbleSize / 2 + 15);
  }
}

function drawLabels() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Day: 10-" + (8 + currentDay), 50, 50);
  textSize(14);
  text("Press LEFT or RIGHT arrow keys to change days", 50, 30);
}

function keyPressed() {
   idx++;
    idx %= bgColors.length;
  
  //adjust day
  if (keyCode === RIGHT_ARROW) {
    currentDay = (currentDay + 1) % 7;
  } else if (keyCode === LEFT_ARROW) {
    currentDay = (currentDay - 1 + 7) % 7;
  }
}