class thirdScene {
  constructor() {
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.gunSpeed = 5;
    this.keys = {};
    this.bullets = [];
    this.rects = [];
    this.bubbles = [];
    
    // Status variables
    this.portalEnabled = false;
    this.score = 0;
    this.hasCompletedOnce = false;  // Track if scene has been completed before
    
    this.gunImg = loadImage('Weapon3.png');
    this.gunWidth = 40;    // Reduced width to half
    this.gunHeight = 30;   // Reduced height to half
    this.backgroundImg = loadImage('3bg.png');
    this.gunShootDistance = 20;
    this.isGunShooting = false;
    this.bubbleImg = loadImage('bubble.png');

    // Bubble sizes
    this.bubbleSize1 = {w: 30, h: 30, points: 1};
    this.bubbleSize2 = {w: 60, h: 60, points: 2};
    this.bubbleSize3 = {w: 90, h: 90, points: 3};

    this.lastBubbleSpawnTime = 0;

    
    this.sceneStartTime = 0;
    this.displayState = 'message'; 
    this.countdownStartTime = 0;
    this.countdownNumber = 3;

    // Load the background music
    this.bgMusic = loadSound('bg3.mp3');
    this.musicPlayed = false; 

    this.initRects();

    // Define the attack range radius (adjust as needed)
    this.attackRange = 40; 
  }

  enterScene() {
    this.gunX = width / 2;
    this.gunY = height / 2;
    this.keys = {};

    if (!this.hasCompletedOnce) {
      // Only reset score and portal if not completed before
      this.portalEnabled = false;
      this.score = 0;
      this.bubbles = [];

      // Initialize scene start variables
      this.sceneStartTime = millis();
      this.displayState = 'message';
      this.countdownStartTime = 0;
      this.countdownNumber = 3;

      // Reset music played flag
      this.musicPlayed = false;

    } else {
      
      this.displayState = 'score';
      // Ensure the portal remains open
      this.portalEnabled = true;
      // Start the music if it wasn't playing
      if (!this.bgMusic.isPlaying()) {
        this.bgMusic.loop();
      }
    }
  }

  exitScene() {
    // Stop the music when exiting the scene
    if (this.bgMusic.isPlaying()) {
      this.bgMusic.stop();
    }
  }

  initRects() {
    let margin = 0;
    let rectWidthTopBottom = width / 3;
    let rectHeightTopBottom = 50;
    
    let rect1 = {
      x: margin,
      y: margin,
      width: rectWidthTopBottom,
      height: rectHeightTopBottom,
      label: 1,
    };
    
    this.rects.push(rect1);
  }

  update() {
    if (this.keys["w"]) this.gunY -= this.gunSpeed;
    if (this.keys["s"]) this.gunY += this.gunSpeed;
    if (this.keys["a"]) this.gunX -= this.gunSpeed;
    if (this.keys["d"]) this.gunX += this.gunSpeed;

    this.gunX = constrain(this.gunX, 0, width);
    this.gunY = constrain(this.gunY, 0, height);

    // Update displayState based on elapsed time
    if (!this.hasCompletedOnce) {
      let elapsed = millis() - this.sceneStartTime;
      if (this.displayState === 'message' && elapsed >= 3000) {
        // After 3 seconds, start countdown
        this.displayState = 'countdown';
        this.countdownStartTime = millis();
        this.countdownNumber = 3;
      } else if (this.displayState === 'countdown' && this.countdownNumber > 0) {
        let countdownElapsed = millis() - this.countdownStartTime;
        if (countdownElapsed >= 1000 * (4 - this.countdownNumber)) {
          this.countdownNumber--;
          if (this.countdownNumber === 0) {
            this.displayState = 'score';
            // Play the background music when countdown ends
            if (!this.musicPlayed) {
              this.bgMusic.loop();
              this.musicPlayed = true;
            }
          }
        }
      }
    }

    // Only update game logic if displayState is 'score'
    if (this.displayState === 'score') {

      // Check score and update portal status
      if (this.score >= 100 && !this.portalEnabled) {
        this.portalEnabled = true;
        this.hasCompletedOnce = true;
      }

      if (this.isGunInRect1() && this.portalEnabled) {
        switchScenes(FirstScene);
      }

      
      if (this.keys[" "] && !this.isGunShooting) {
        this.isGunShooting = true;
        this.gunShootTimer = millis();
      }

      if (this.isGunShooting) {
        let elapsedTime = millis() - this.gunShootTimer;
        let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);
        let gunTargetX = this.gunX + this.gunShootDistance * cos(angle);
        let gunTargetY = this.gunY + this.gunShootDistance * sin(angle);

        if (elapsedTime <= 500) {
          this.gunX += (gunTargetX - this.gunX) / 10;
          this.gunY += (gunTargetY - this.gunY) / 10;
        } else {
    
          this.gunX += (width / 2 - this.gunX) / 50;
          this.gunY += (height / 2 - this.gunY) / 50;
          if (elapsedTime >= 1000) {
            this.isGunShooting = false;
          }
        }
      }

      // Spawn bubbles
      let currentTime = millis();
      if (currentTime - this.lastBubbleSpawnTime >= 3000) {
        this.lastBubbleSpawnTime = currentTime;
        this.spawnBubbles();
      }

      // Update and check for bubble collisions
      for (let i = 0; i < this.bubbles.length; i++) {
        let bubble = this.bubbles[i];
        
     
        bubble.x = constrain(bubble.x, bubble.width / 2, width - bubble.width / 2);
        bubble.y = constrain(bubble.y, bubble.height / 2, height - bubble.height / 2);

        // Check if the gun is within attack range of the bubble
        let distance = dist(this.gunX, this.gunY, bubble.x, bubble.y);
        if (distance <= this.attackRange + bubble.width / 2) {
          // The gun is within attack range of the bubble
          if (this.isGunShooting) {
            this.score += bubble.points;
            this.bubbles.splice(i, 1);
            i--;
          }
        }
      }

    } // End of if displayState === 'score'
  }

  spawnBubbles() {
    let numBubbles = floor(random(1, 4)); // random between 1 and 3 inclusive
    for (let i = 0; i < numBubbles; i++) {
      let bubble;
      let bubbleSize = random(0, 3);
      if (bubbleSize < 1) {
        bubble = {
          x: random(this.bubbleSize1.w / 2, width - this.bubbleSize1.w / 2),
          y: random(this.bubbleSize1.h / 2, height - this.bubbleSize1.h / 2),
          width: this.bubbleSize1.w,
          height: this.bubbleSize1.h,
          speedX: random(-2, 2),
          speedY: random(-2, 2),
          points: this.bubbleSize1.points
        };
      } else if (bubbleSize < 2) {
        bubble = {
          x: random(this.bubbleSize2.w / 2, width - this.bubbleSize2.w / 2),
          y: random(this.bubbleSize2.h / 2, height - this.bubbleSize2.h / 2),
          width: this.bubbleSize2.w,
          height: this.bubbleSize2.h,
          speedX: random(-2, 2),
          speedY: random(-2, 2),
          points: this.bubbleSize2.points
        };
      } else {
        bubble = {
          x: random(this.bubbleSize3.w / 2, width - this.bubbleSize3.w / 2),
          y: random(this.bubbleSize3.h / 2, height - this.bubbleSize3.h / 2),
          width: this.bubbleSize3.w,
          height: this.bubbleSize3.h,
          speedX: random(-2, 2),
          speedY: random(-2, 2),
          points: this.bubbleSize3.points
        };
      }
      this.bubbles.push(bubble);
    }
  }

  isGunInRect1() {
    let rect1 = this.rects[0];

    let gunLeft = this.gunX - this.gunWidth / 2;
    let gunRight = this.gunX + this.gunWidth / 2;
    let gunTop = this.gunY - this.gunHeight / 2;
    let gunBottom = this.gunY + this.gunHeight / 2;

    let rectLeft = rect1.x;
    let rectRight = rect1.x + rect1.width;
    let rectTop = rect1.y;
    let rectBottom = rect1.y + rect1.height;

    return (
      gunRight > rectLeft &&
      gunLeft < rectRight &&
      gunBottom > rectTop &&
      gunTop < rectBottom
    );
  }

  display() {
    background(0);
    image(this.backgroundImg, 0, 0, width, height);

    // Draw portal
    rectMode(CORNER);
    let rectObj = this.rects[0];
    
    if (this.portalEnabled) {
      // Portal is unlocked
      fill(255);              // White fill
      stroke(139, 69, 19);    // Brown border
    } else {
      // Portal is locked
      fill(255, 0, 0);        // Red fill
      stroke(255, 0, 0);      // Red border
    }
    strokeWeight(4);
    rect(rectObj.x, rectObj.y, rectObj.width, rectObj.height);
    noStroke();

    // Draw gun
    let angle = atan2(mouseY - this.gunY, mouseX - this.gunX);
    push();
    translate(this.gunX, this.gunY);
    rotate(angle);
    imageMode(CENTER);
    image(this.gunImg, 0, 0, this.gunWidth, this.gunHeight);
    pop();

    // Draw bubbles
    for (let bubble of this.bubbles) {
      image(this.bubbleImg, bubble.x, bubble.y, bubble.width, bubble.height);
    }

    // Draw score display with background
    push();
    // Draw semi-transparent background for text
    fill(0, 180);
    noStroke();
    rectMode(CENTER);

    let scoreText = '';
    if (!this.hasCompletedOnce) {
      if (this.displayState === 'message') {
        scoreText = 'Pop those bubbles!';
      } else if (this.displayState === 'countdown') {
        scoreText = this.countdownNumber.toString();
      } else {
        scoreText = this.score >= 100 ? "You did it!" : "Score: " + this.score;
      }
    } else {
      // After task completion, always show the score
      scoreText = this.score >= 100 ? "You did it!" : "Score: " + this.score;
    }

    rect(width/2, 25, textWidth(scoreText) + 20, 40);

    // Draw score text
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(scoreText, width/2, 25);
    pop();
  }

  keyPressed() {
    this.keys[key.toLowerCase()] = true;
    if (key === " ") {
      // Trigger gun shooting
      this.isGunShooting = true;
      this.gunShootTimer = millis();
    }
  }

  keyReleased() {
    this.keys[key.toLowerCase()] = false;
  }

  mousePressed() {}
  mouseReleased() {}
  mouseMoved() {}
  mouseDragged() {}
  mouseClicked() {}
}
