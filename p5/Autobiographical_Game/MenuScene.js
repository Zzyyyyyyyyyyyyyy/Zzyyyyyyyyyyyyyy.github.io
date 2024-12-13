class menuScene {
  constructor() {
    // Core settings
    this.startY = height/2;
    this.amplitude = 10;
    this.speed = 0.002;
    
    // Load assets
    this.backgroundImg = loadImage('MenuScene.png', 
      () => console.log('Background image loaded successfully'),
      () => console.log('Failed to load background image')
    );
    
    // Load background music
    try {
      this.bgMusic = loadSound('bg1music.mp3', 
        () => {
          console.log('Background music loaded successfully');
          this.bgMusic.setVolume(0.5);  // Set volume to 50%
          // Start playing once loaded
          this.playMusic();
        },
        (err) => {
          console.log('Error loading background music:', err);
        }
      );
    } catch (error) {
      console.log('Could not load background music:', error);
      this.bgMusic = null;
    }
  }
  playMusic() {
    if (this.bgMusic && !this.bgMusic.isPlaying() && this.bgMusic.isLoaded()) {
      try {
        this.bgMusic.loop();
      } catch (error) {
        console.log('Error playing background music:', error);
      }
    }
  }
  
  enterScene() {
    this.playMusic();
  }
  update() {
  }
  display() {
    background(0);
    
    if (this.backgroundImg) {
      imageMode(CORNER);
      image(this.backgroundImg, 0, 0, width, height);
    }
    
    let floatingOffset = sin(millis() * this.speed) * this.amplitude;
    
    let startX = width/2;
    let startY = this.startY + floatingOffset;
    
    // Draw "START" text
    textAlign(CENTER);
    textSize(20);
    
    // White outline
    fill(255);
    text("START", startX-1, startY-1);
    text("START", startX+1, startY-1);
    text("START", startX-1, startY+1);
    text("START", startX+1, startY+1);
    
    // Black main text
    fill(0);
    text("START", startX, startY);
    
    // Draw subtitle with outline
    textSize(12);
    let subY = startY + 30;
    
    // White outline for subtitle
    fill(255);
    text("Press to start childhood dream", startX-1, subY-1);
    text("Press to start childhood dream", startX+1, subY-1);
    text("Press to start childhood dream", startX-1, subY+1);
    text("Press to start childhood dream", startX+1, subY+1);
    
    // Black main text for subtitle
    fill(0);
    text("Press to start childhood dream", startX, subY);
    
    // Draw additional text with outline
    let additionalY = subY + 20;
    
    // White outline for additional text
    fill(255);
    text("How to control the game: You just need to press \"W,A,S,D\" and \"Space\"", startX-1, additionalY-1);
    text("How to control the game: You just need to press \"W,A,S,D\" and \"Space\"", startX+1, additionalY-1);
    text("How to control the game: You just need to press \"W,A,S,D\" and \"Space\"", startX-1, additionalY+1);
    text("How to control the game: You just need to press \"W,A,S,D\" and \"Space\"", startX+1, additionalY+1);
    
    // Black main text for additional text
    fill(0);
    text("How to control the game: You just need to press \"W,A,S,D\" and \"Space\"", startX, additionalY);
  }
  
  exitScene() {
    if (this.bgMusic && this.bgMusic.isPlaying()) {
      try {
        this.bgMusic.stop();
      } catch (error) {
        console.log('Error stopping background music:', error);
      }
    }
  }
  
  keyPressed() {
  }
  
  keyReleased() {
  }
  
  mousePressed() {
    switchScenes(FirstScene);
  }
  
  mouseReleased() {
  }
  
  mouseMoved() {
  }
  
  mouseDragged() {
  }
  
  mouseClicked() {
  }
}