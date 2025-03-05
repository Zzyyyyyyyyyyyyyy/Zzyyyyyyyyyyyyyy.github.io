// Global variables and preload function
let sceneSound;
let rect1Sound;
let rect2Sound;
let rect3Sound;
let rect5Sound;
let rect7Sound;
let rect8Sound;
let rect9Sound;
let rect10Sound;
let gunImage;
let pianoImage;    
let pianoLImage;   
let pianoRImage;   
let scene2Background;  

function preload() {
  sceneSound = loadSound('6.mp3');
  gunImage = loadImage("gun.png");
  pianoImage = loadImage("piano.png");        
  pianoLImage = loadImage("pianoL.png");      
  pianoRImage = loadImage("pianoR.png");      
  scene2Background = loadImage("Scene2bg.png");  


  rect1Sound = loadSound('1.mp3');
  rect2Sound = loadSound('2.mp3');
  rect3Sound = loadSound('3.mp3');
  rect5Sound = loadSound('5.mp3');
  rect7Sound = loadSound('7.mp3');
  rect8Sound = loadSound('8.mp3');
  rect9Sound = loadSound('9.mp3');
  rect10Sound = loadSound('10.mp3');
}

class firstScene {
  constructor() {
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.gunWidth = 80;
    this.gunHeight = 60;
    this.gunSpeed = 5;
    this.keys = {};
    this.bullets = [];
    this.rects = [];
    
    // Message prompt correlation
    this.showMessage = true;
    this.messageStartTime = millis();
    this.messageDuration = 4000; // 4秒

    this.recorder = new p5.SoundRecorder();
    this.soundFile = new p5.SoundFile();
    this.isRecording = false;
    this.recordButton = null;

    // Reset
    this.resetButton = null;

    this.initRects();
  }

  enterScene() {
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.keys = {};
    
    // Reset message status
    this.showMessage = true;
    this.messageStartTime = millis();

    if (sceneSound) {
      sceneSound.play();
    }
    this.recordButton = createButton("Record music");
    this.recordButton.position(160, 350);
    this.recordButton.mousePressed(() => this.toggleRecording());

    // Reset
    this.resetButton = createButton("Reset");
    this.resetButton.position(280, 350); // Adjust the position to avoid overlapping with other buttons
    this.resetButton.mousePressed(() => this.resetSketch());
  }

  exitScene() {
    if (this.recordButton) {
      this.recordButton.remove();
    }
    
    if (this.resetButton) {
      this.resetButton.remove();
    }
  }

  resetSketch() {

    location.reload(); 
  }

  toggleRecording() {
    if (!this.isRecording) {
      this.recorder.record(this.soundFile);
      this.isRecording = true;
      this.recordButton.html("Stop Recording");
    } else {
      this.recorder.stop();
      saveSound(this.soundFile, "my_music.mp3");
      this.isRecording = false;
      this.recordButton.html("Record music");
    }
  }

  initRects() {
    let margin = 0;
    let topBottomRects = 3;
    let rectWidthTopBottom = width / topBottomRects;
    let rectHeightTopBottom = 50;
    let leftRightRects = 2;
    let rectWidthLeftRight = 50;
    let rectHeightLeftRight = (height - 2 * rectHeightTopBottom) / leftRightRects;

    let labelCounter = 1;

 
    for (let i = 0; i < topBottomRects; i++) {
      let rectObj = {
        x: margin + i * rectWidthTopBottom,
        y: margin,
        width: rectWidthTopBottom,
        height: rectHeightTopBottom,
        label: labelCounter++,
      };
      rectObj.currentWidth = rectObj.width;
      rectObj.currentHeight = rectObj.height;
      rectObj.originalX = rectObj.x;
      rectObj.originalY = rectObj.y;
      this.rects.push(rectObj);      
    }

    // 下边的三个长方形
    for (let i = 0; i < topBottomRects; i++) {
      let rectObj = {
        x: margin + i * rectWidthTopBottom,
        y: height - rectHeightTopBottom - margin,
        width: rectWidthTopBottom,
        height: rectHeightTopBottom,
        label: labelCounter++,
      };
      rectObj.currentWidth = rectObj.width;
      rectObj.currentHeight = rectObj.height;
      rectObj.originalX = rectObj.x;
      rectObj.originalY = rectObj.y;
      this.rects.push(rectObj);
    }

// Two rectangles on the left
    for (let i = 0; i < leftRightRects; i++) {
      let rectObj = {
        x: margin,
        y: rectHeightTopBottom + margin + i * rectHeightLeftRight,
        width: rectWidthLeftRight,
        height: rectHeightLeftRight,
        label: labelCounter++,
      };
      rectObj.currentWidth = rectObj.width;
      rectObj.currentHeight = rectObj.height;
      rectObj.originalX = rectObj.x;
      rectObj.originalY = rectObj.y;
      this.rects.push(rectObj);
    }

// Two rectangles on the right
    for (let i = 0; i < leftRightRects; i++) {
      let rectObj = {
        x: width - rectWidthLeftRight - margin,
        y: rectHeightTopBottom + margin + i * rectHeightLeftRight,
        width: rectWidthLeftRight,
        height: rectHeightLeftRight,
        label: labelCounter++,
      };
      rectObj.currentWidth = rectObj.width;
      rectObj.currentHeight = rectObj.height;
      rectObj.originalX = rectObj.x;
      rectObj.originalY = rectObj.y;
      this.rects.push(rectObj);
    }
  }

  update() {
    // Update message display status
    if (this.showMessage && millis() - this.messageStartTime > this.messageDuration) {
      this.showMessage = false;
    }
    
    if (this.keys["w"]) this.gunY -= this.gunSpeed;
    if (this.keys["s"]) this.gunY += this.gunSpeed;
    if (this.keys["a"]) this.gunX -= this.gunSpeed;
    if (this.keys["d"]) this.gunX += this.gunSpeed;

    this.gunX = constrain(this.gunX, 0, width);
    this.gunY = constrain(this.gunY, 0, height);

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;

      for (let rect of this.rects) {
        if (this.isBulletCollidingWithRect(bullet, rect)) {
          this.reflectBullet(bullet, rect);
        }
      }

      if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
        this.bullets.splice(i, 1);
      }
    }

    for (let rect of this.rects) {
      rect.currentWidth += (rect.width - rect.currentWidth) * 0.05;
      rect.currentHeight += (rect.height - rect.currentHeight) * 0.05;
      rect.currentWidth = min(rect.currentWidth, rect.width);
      rect.currentHeight = min(rect.currentHeight, rect.height);
    }

    if (this.isGunInRect4()) {
      switchScenes(SecondScene);
    }

    if (this.isGunInRect6()) {
      switchScenes(ThirdScene);
    }
  }

  isGunInRect4() {
    let rect4 = this.rects.find((rect) => rect.label === 4);
    if (!rect4) return false;

    let gunLeft = this.gunX - this.gunWidth / 2;
    let gunRight = this.gunX + this.gunWidth / 2;
    let gunTop = this.gunY - this.gunHeight / 2;
    let gunBottom = this.gunY + this.gunHeight / 2;

    let rectLeft = rect4.x;
    let rectRight = rect4.x + rect4.currentWidth;
    let rectTop = rect4.y;
    let rectBottom = rect4.y + rect4.currentHeight;

    return (
      gunRight > rectLeft &&
      gunLeft < rectRight &&
      gunBottom > rectTop &&
      gunTop < rectBottom
    );
  }

  isGunInRect6() {
    let rect6 = this.rects.find((rect) => rect.label === 6);
    if (!rect6) return false;

    let gunLeft = this.gunX - this.gunWidth / 2;
    let gunRight = this.gunX + this.gunWidth / 2;
    let gunTop = this.gunY - this.gunHeight / 2;
    let gunBottom = this.gunY + this.gunHeight / 2;

    let rectLeft = rect6.x;
    let rectRight = rect6.x + rect6.currentWidth;
    let rectTop = rect6.y;
    let rectBottom = rect6.y + rect6.currentHeight;

    return (
      gunRight > rectLeft &&
      gunLeft < rectRight &&
      gunBottom > rectTop &&
      gunTop < rectBottom
    );
  }

  isBulletCollidingWithRect(bullet, rect) {
    return (
      bullet.x > rect.x &&
      bullet.x < rect.x + rect.currentWidth &&
      bullet.y > rect.y &&
      bullet.y < rect.y + rect.currentHeight
    );
  }

  reflectBullet(bullet, rect) {
    let prevX = bullet.x - bullet.vx;
    let prevY = bullet.y - bullet.vy;
    let collision = false;

    if (prevY <= rect.y && bullet.y > rect.y) {
      bullet.vy = -bullet.vy;
      collision = true;
    } else if (prevY >= rect.y + rect.currentHeight && bullet.y < rect.y + rect.currentHeight) {
      bullet.vy = -bullet.vy;
      collision = true;
    } else if (prevX <= rect.x && bullet.x > rect.x) {
      bullet.vx = -bullet.vx;
      collision = true;
    } else if (prevX >= rect.x + rect.currentWidth && bullet.x < rect.x + rect.currentWidth) {
      bullet.vx = -bullet.vx;
      collision = true;
    }

    if (collision) {
      bullet.x = prevX;
      bullet.y = prevY;
      bullet.angle = atan2(bullet.vy, bullet.vx);

      rect.currentWidth *= 0.9;
      rect.currentHeight *= 0.9;

      let minSize = 10;
      rect.currentWidth = max(rect.currentWidth, minSize);
      rect.currentHeight = max(rect.currentHeight, minSize);

      // 声音播放逻辑
      if (rect.label === 1) {
        if (rect1Sound && rect1Sound.isLoaded()) rect1Sound.play();
      } else if (rect.label === 2) {
        if (rect2Sound && rect2Sound.isLoaded()) rect2Sound.play();
      } else if (rect.label === 3) {
        if (rect3Sound && rect3Sound.isLoaded()) rect3Sound.play();
      } else if (rect.label === 5) {
        if (rect5Sound && rect5Sound.isLoaded()) rect5Sound.play();
      } else if (rect.label === 7) {
        if (rect7Sound && rect7Sound.isLoaded()) rect7Sound.play();
      } else if (rect.label === 8) {
        if (rect8Sound && rect8Sound.isLoaded()) rect8Sound.play();
      } else if (rect.label === 9) {
        if (rect9Sound && rect9Sound.isLoaded()) rect9Sound.play();
      } else if (rect.label === 10) {
        if (rect10Sound && rect10Sound.isLoaded()) rect10Sound.play();
      }
    }
  }

  display() {

    imageMode(CORNER);
    image(scene2Background, 0, 0, width, height);

    textAlign(CENTER, CENTER);
    textSize(20);
    rectMode(CORNER);
    noStroke();

    for (let rectObj of this.rects) {
      let offsetX = (rectObj.width - rectObj.currentWidth) / 2;
      let offsetY = (rectObj.height - rectObj.currentHeight) / 2;
      let drawX = rectObj.x + offsetX;
      let drawY = rectObj.y + offsetY;

      if (rectObj.label === 4) {
   
        fill(255);
        stroke(255, 255, 0);
        strokeWeight(4);
        rect(drawX, drawY, rectObj.currentWidth, rectObj.currentHeight);
        noStroke();
      } else if (rectObj.label === 6) {
      
        fill(255);
        stroke(0, 255, 0);
        strokeWeight(4);
        rect(drawX, drawY, rectObj.currentWidth, rectObj.currentHeight);
        noStroke();
      } else if (rectObj.label === 7 || rectObj.label === 8) {
   
        push();
        imageMode(CORNER);
        image(pianoLImage, drawX, drawY, rectObj.currentWidth, rectObj.currentHeight);
       
        fill(255);
        noStroke();
        text(rectObj.label, drawX + rectObj.currentWidth / 2, drawY + rectObj.currentHeight / 2);
        pop();
      } else if (rectObj.label === 9 || rectObj.label === 10) {
        // 使用 pianoRImage
        push();
        imageMode(CORNER);
        image(pianoRImage, drawX, drawY, rectObj.currentWidth, rectObj.currentHeight);
        // 绘制数字
        fill(255);
        noStroke();
        text(rectObj.label, drawX + rectObj.currentWidth / 2, drawY + rectObj.currentHeight / 2);
        pop();
      } else {
        // 使用默认钢琴图片
        push();
        imageMode(CORNER);
        image(pianoImage, drawX, drawY, rectObj.currentWidth, rectObj.currentHeight);
        // 绘制数字
        fill(255);
        noStroke();
        text(rectObj.label, drawX + rectObj.currentWidth / 2, drawY + rectObj.currentHeight / 2);
        pop();
      }
    }

    // gun
    let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);
    push();
    translate(this.gunX, this.gunY);
    rotate(angle);
    imageMode(CENTER);
    image(gunImage, 0, 0, this.gunWidth, this.gunHeight);
    pop();

 
    fill(255, 0, 0);
    for (let bullet of this.bullets) {
      ellipse(bullet.x, bullet.y, bullet.size);
    }

 
    if (this.showMessage) {
      push();
      textAlign(CENTER, CENTER);
      textSize(24);
      fill(255);
      text("Now you can have fun making music!\nBottom left and bottom right are two portals!", 
           width / 2, height / 2);
      pop();
    }
  }

  keyPressed() {
    this.keys[key.toLowerCase()] = true;
    if (key === " ") {
      this.shoot();
    }
  }

  keyReleased() {
    this.keys[key.toLowerCase()] = false;
  }

  shoot() {
    let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);
    let speed = 10;
    let vx = speed * cos(angle);
    let vy = speed * sin(angle);
    let bullet = {
      x: this.gunX + cos(angle) * 30,
      y: this.gunY + sin(angle) * 30,
      speed: speed,
      size: 5,
      angle: angle,
      vx: vx,
      vy: vy,
    };
    this.bullets.push(bullet);
  }

  mousePressed() {}
  mouseReleased() {}
  mouseMoved() {}
  mouseDragged() {}
  mouseClicked() {}
}
