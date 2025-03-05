class secondScene {
  constructor() {
    // Core game variables and settings
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.gunSpeed = 5;
    this.keys = {};
    this.isRectVisible = false;
    this.rectDistance = 50;
    this.rects = [];
    this.musicBars = [];
    this.gunImg = loadImage('gun.png');
    this.gunWidth = 80;
    this.gunHeight = 60;
    this.backgroundImg = loadImage('Guitar.png');

    // Load bullet image
    this.bulletImg = loadImage('Fire.png');
    this.bulletWidth = 50;  // Set appropriate width for the bullet image
    this.bulletHeight = 30; // Set appropriate height for the bullet image

    // Score and portal system
    this.score = 0;
    this.portalEnabled = false;
    this.hitBars = new Set();
    this.hasCompletedOnce = false;

    // Flashing system configuration
    this.activeBarIndexes = [];
    this.lastFlashTime = 0;
    this.currentPattern = 0;
    this.hitFeedback = new Map();
    this.patterns = [
      { interval: 1500, duration: 1000, count: 1 },
      { interval: 2000, duration: 2000, count: 2 },
      { interval: 1500, duration: 2000, count: 3 }
    ];

    // Intro and music system
    this.introState = 'message';
    this.introStartTime = 0;
    this.countdownStartTime = 0;
    this.gameStarted = false;
    this.backgroundMusic = loadSound('bg2music.mp3');

    this.initRects();
    this.initMusicBars();
    this.currentPattern = floor(random(this.patterns.length));
  }

  initMusicBars() {
    const barHeight = 4;
    const spacing = height / 7;
    const barWidth = width * 0.8;
    const startX = width * 0.1;
    
    for (let i = 0; i < 6; i++) {
      this.musicBars.push({
        x: startX,
        y: spacing * (i + 1),
        width: barWidth,
        height: barHeight,
        isFlashing: false,
        feedbackColor: null,
        feedbackTime: 0
      });
    }
  }

  initRects() {
    let margin = 0;
    let rectWidthTopBottom = width / 3;
    let rectHeightTopBottom = 50;
    let rect3 = {
      x: margin + 2 * rectWidthTopBottom,
      y: margin,
      width: rectWidthTopBottom,
      height: rectHeightTopBottom,
      label: 3,
    };
    this.rects.push(rect3);
  }

  enterScene() {
    // Reset necessary variables while keeping completion status
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.keys = {};
    this.isRectVisible = false;
    if (!this.hasCompletedOnce) {
      this.score = 0;
      this.portalEnabled = false;
    }
    this.lastFlashTime = millis();
    this.currentPattern = floor(random(this.patterns.length));
    this.hitBars = new Set();
    this.hitFeedback.clear();
    
    // Reset intro state only if haven't completed before
    if (!this.hasCompletedOnce) {
      this.introState = 'message';
      this.introStartTime = millis();
      this.gameStarted = false;
    } else {
      this.introState = 'playing';
      this.gameStarted = true;
      if (!this.backgroundMusic.isPlaying()) {
        this.backgroundMusic.play();
      }
    }
  }

  exitScene() {
    this.isRectVisible = false;
    if (this.backgroundMusic.isPlaying()) {
      this.backgroundMusic.stop();
    }
  }

  updateIntroState() {
    let currentTime = millis();
    
    if (this.introState === 'message' && currentTime - this.introStartTime >= 6000) {
      this.introState = 'countdown';
      this.countdownStartTime = currentTime;
    }
    else if (this.introState === 'countdown' && currentTime - this.countdownStartTime >= 5000) {
      this.introState = 'playing';
      this.gameStarted = true;
      if (!this.backgroundMusic.isPlaying()) {
        this.backgroundMusic.play();
      }
    }
  }

  getCountdownNumber() {
    if (this.introState !== 'countdown') return '';
    let elapsedTime = millis() - this.countdownStartTime;
    let secondsLeft = 5 - floor(elapsedTime / 1000);
    return max(1, secondsLeft).toString();
  }

  updateFlashingBars() {
    if (!this.gameStarted) return;
    
    let currentTime = millis();
    let pattern = this.patterns[this.currentPattern];
    
    if (currentTime - this.lastFlashTime >= pattern.interval) {
      this.musicBars.forEach(bar => bar.isFlashing = false);
      this.activeBarIndexes = [];
      this.hitBars.clear();

      let availableIndexes = Array.from(Array(this.musicBars.length).keys());
      for (let i = 0; i < pattern.count; i++) {
        if (availableIndexes.length > 0) {
          let randomIndex = floor(random(availableIndexes.length));
          let selectedIndex = availableIndexes.splice(randomIndex, 1)[0];
          this.activeBarIndexes.push(selectedIndex);
          this.musicBars[selectedIndex].isFlashing = true;
        }
      }
      
      this.lastFlashTime = currentTime;

      if (random() < 0.5) {
        let newPattern;
        do {
          newPattern = floor(random(this.patterns.length));
        } while (newPattern === this.currentPattern);
        this.currentPattern = newPattern;
      }
    }
    
    if (currentTime - this.lastFlashTime >= pattern.duration) {
      this.activeBarIndexes.forEach(index => {
        this.musicBars[index].isFlashing = false;
      });
    }

    this.musicBars.forEach((bar, index) => {
      if (bar.feedbackTime > 0 && millis() - bar.feedbackTime > 200) {
        bar.feedbackColor = null;
        bar.feedbackTime = 0;
      }
    });
  }

  checkBulletBarCollision() {
    if (!this.isRectVisible || !this.gameStarted) return;

    let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);
    let bulletX = this.gunX + cos(angle) * this.rectDistance;
    let bulletY = this.gunY + sin(angle) * this.rectDistance;

    this.musicBars.forEach((bar, index) => {
      let barCenterX = bar.x + bar.width / 2;
      let barLeft = barCenterX - bar.width / 2;
      let barRight = barCenterX + bar.width / 2;
      
      if (
        bulletX > barLeft && 
        bulletX < barRight &&
        bulletY > bar.y - bar.height / 2 && 
        bulletY < bar.y + bar.height / 2
      ) {
        if (bar.isFlashing && !this.hitBars.has(index)) {
          this.score += 1;
          this.hitBars.add(index);
          bar.feedbackColor = color(0, 0, 255);
          bar.feedbackTime = millis();
          if (this.score >= 60) {
            this.portalEnabled = true;
            this.hasCompletedOnce = true;
          }
        } else if (!bar.isFlashing && !bar.feedbackColor) {
          bar.feedbackColor = color(255, 0, 0);
          bar.feedbackTime = millis();
        }
      }
    });
  }

  update() {
    this.updateIntroState();
    
    if (this.keys["w"]) this.gunY -= this.gunSpeed;
    if (this.keys["s"]) this.gunY += this.gunSpeed;
    if (this.keys["a"]) this.gunX -= this.gunSpeed;
    if (this.keys["d"]) this.gunX += this.gunSpeed;

    this.gunX = constrain(this.gunX, 0, width);
    this.gunY = constrain(this.gunY, 0, height);

    this.updateFlashingBars();
    this.checkBulletBarCollision();

    if (this.portalEnabled && this.isGunInRect3()) {
      switchScenes(FirstScene);
    }
  }

  isGunInRect3() {
    let rect3 = this.rects[0];
    let gunLeft = this.gunX - this.gunWidth / 2;
    let gunRight = this.gunX + this.gunWidth / 2;
    let gunTop = this.gunY - this.gunHeight / 2;
    let gunBottom = this.gunY + this.gunHeight / 2;
    
    let rectLeft = rect3.x;
    let rectRight = rect3.x + rect3.width;
    let rectTop = rect3.y;
    let rectBottom = rect3.y + rect3.height;

    return (
      gunRight > rectLeft &&
      gunLeft < rectRight &&
      gunBottom > rectTop &&
      gunTop < rectBottom
    );
  }

  display() {
    // Clear background
    background(0);
    image(this.backgroundImg, 0, 0, width, height);
    
    push(); // Save current drawing state
    
    // Layer 1: Draw music bars
    rectMode(CENTER);
    this.musicBars.forEach((bar, index) => {
      if (!this.gameStarted) {
        fill(255);
        stroke(139, 69, 19);
      } else if (bar.feedbackColor) {
        fill(bar.feedbackColor);
        stroke(bar.feedbackColor);
      } else if (bar.isFlashing) {
        fill(0, 0, 139);
        stroke(139, 69, 19);
      } else {
        fill(255);
        stroke(139, 69, 19);
      }
      strokeWeight(2);
      rect(bar.x + bar.width / 2, bar.y, bar.width, bar.height);
      noStroke();
    });

    pop(); // Restore drawing state
    
    push(); // Save state for portal
    
    // Layer 2: Draw portal
    rectMode(CORNER);
    let rectObj = this.rects[0];
    fill(255);
    if (!this.portalEnabled) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
    } else {
      fill(255);
      stroke(139, 69, 19);
    }
    strokeWeight(4);
    rect(rectObj.x, rectObj.y, rectObj.width, rectObj.height);
    noStroke();
    
    pop(); // Restore state
    
    push(); // Save state for gun and bullet
    
    // Layer 3: Draw gun and bullet
    let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);

    if (this.isRectVisible) {
      push();
      translate(this.gunX, this.gunY);
      rotate(angle);
      imageMode(CENTER);
      image(this.bulletImg, this.rectDistance, 0, this.bulletWidth, this.bulletHeight);
      pop();
    }

    push();
    translate(this.gunX, this.gunY);
    rotate(angle);
    imageMode(CENTER);
    image(this.gunImg, 0, 0, this.gunWidth, this.gunHeight);
    pop();
    
    pop(); // Restore state

    // Layer 4: Draw text with background
    if (!this.hasCompletedOnce) {
      if (this.introState === 'message') {
        // Draw semi-transparent background for text
        push();
        fill(0, 180); // Black with alpha
        noStroke();
        rectMode(CENTER);
        rect(width / 2, 25, textWidth("You're in a trap！You need 60 points to get out of here") + 20, 40);
        pop();
        
        // Draw text
        fill(255);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("You're in a trap！You need 60 points to get out of here", width / 2, 25);
      } else if (this.introState === 'countdown') {
        // Draw countdown
        push();
        fill(0, 180);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, 25, 40, 40);
        pop();
        
        fill(255);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(this.getCountdownNumber(), width / 2, 25);
      } else {
        // Draw score or completion message
        let scoreText = this.score >= 60 ? "You did it!" : "Score: " + this.score;
        
        push();
        fill(0, 180);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, 25, textWidth(scoreText) + 20, 40);
        pop();
        
        fill(255);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(scoreText, width / 2, 25);
      }
    } else {
      // After task completion, always show the score
      let scoreText = this.score >= 60 ? "You did it!" : "Score: " + this.score;
      push();
      fill(0, 180);
      noStroke();
      rectMode(CENTER);
      rect(width / 2, 25, textWidth(scoreText) + 20, 40);
      pop();
      
      fill(255);
      textSize(18);
      textAlign(CENTER, CENTER);
      text(scoreText, width / 2, 25);
    }
  }

  keyPressed() {
    this.keys[key.toLowerCase()] = true;
    if (key === " ") {
      this.isRectVisible = true;
    }
  }

  keyReleased() {
    this.keys[key.toLowerCase()] = false;
    if (key === " ") {
      this.isRectVisible = false;
    }
  }

  mousePressed() {}
  mouseReleased() {}
  mouseMoved() {}
  mouseDragged() {}
  mouseClicked() {}
}
