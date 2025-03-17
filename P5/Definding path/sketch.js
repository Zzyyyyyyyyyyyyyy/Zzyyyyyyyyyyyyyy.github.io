let ball;
let sceneManager;
let sceneImages = [];
let ballImage; // Ball image variable
let natureSound; // Sound variable
let footstepsSound; // Footsteps sound variable
let pianoSound; // Piano sound variable
let windSound; // Wind sound effect variable
let bgMusic; // Background music variable
let mouseClicksSound; // Mouse clicks sound variable
let keyboardTypingSound; // Keyboard typing sound variable
let soundPlaying = false; // Track if sound is playing
let isWalking = false; // Track if character is walking
let pianoPLaying = false; // Track if piano sound is playing
let windPlaying = false; // Track if wind sound is playing
let bgMusicPlaying = false; // Track if background music is playing
let mouseClicksPlaying = false; // Track if mouse clicks sound is playing
let keyboardTypingPlaying = false; // Track if keyboard typing sound is playing
let showNextSceneTip = false; // Whether to show next scene tip
let startScene; // Start scene image

function preload() {
  // Preload scene images and ball image with error handling
  try {
    console.log("Loading images...");
    
    // Load start scene image (simple black background)
    startScene = createGraphics(800, 600);
    startScene.background(0);
    
    // Add start scene to scene array
    sceneImages[0] = startScene;
    
    // Original scenes now become second and third scenes
    sceneImages[1] = loadImage('Sources/1.png', 
      // Success callback
      function() { console.log("1.png loaded successfully"); },
      // Error callback
      function(e) { 
        console.error("Failed to load 1.png", e);
      }
    );
    
    sceneImages[2] = loadImage('Sources/2.png',
      // Success callback
      function() { console.log("2.png loaded successfully"); },
      // Error callback
      function(e) { 
        console.error("Failed to load 2.png", e); 
      }
    );
    
    // Load ball image
    ballImage = loadImage('Sources/C.png',
      // Success callback
      function() { console.log("C.png loaded successfully"); },
      // Error callback
      function(e) { 
        console.error("Failed to load C.png", e); 
      }
    );
    
    // Load sound files
    natureSound = loadSound('Sources/nature.mp3',
      // Success callback
      function() { 
        console.log("nature.mp3 loaded successfully"); 
        // Set to loop
        natureSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load nature.mp3", e); 
      }
    );
    
    // Load footsteps sound
    footstepsSound = loadSound('Sources/Footsteps Walking in Dry Sand  HQ Sound Effects_01.mp3',
      // Success callback
      function() { 
        console.log("Footsteps sound loaded successfully"); 
        // Set to loop
        footstepsSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load footsteps sound", e); 
      }
    );
    
    // Load piano sound
    pianoSound = loadSound('Sources/Piano.wav',
      // Success callback
      function() { 
        console.log("Piano sound loaded successfully"); 
        // Set to loop
        pianoSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load piano sound", e); 
      }
    );
    
    // Load wind sound effect
    windSound = loadSound('Sources/Wind Sound Effect_01.mp3',
      // Success callback
      function() { 
        console.log("Wind sound effect loaded successfully"); 
        // Set to loop
        windSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load wind sound effect", e); 
      }
    );
    
    // Load background music
    bgMusic = loadSound('Sources/bg1.mp3',
      // Success callback
      function() { 
        console.log("Background music loaded successfully"); 
        // Set to loop
        bgMusic.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load background music", e); 
      }
    );
    
    // Load mouse clicks sound
    mouseClicksSound = loadSound('Sources/mouse-clicks.wav',
      // Success callback
      function() { 
        console.log("Mouse clicks sound loaded successfully"); 
        // Set to loop
        mouseClicksSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load mouse clicks sound", e); 
      }
    );
    
    // Load keyboard typing sound
    keyboardTypingSound = loadSound('Sources/pc-keyboard-typing.wav',
      // Success callback
      function() { 
        console.log("Keyboard typing sound loaded successfully"); 
        // Set to loop
        keyboardTypingSound.setLoop(true);
      },
      // Error callback
      function(e) { 
        console.error("Failed to load keyboard typing sound", e); 
      }
    );
  } catch (e) {
    console.error("Error loading images and sounds:", e);
  }
}

function setup() {
  console.log("Setup starting...");
  
  // Create canvas with same size as background image
  if (sceneImages[0] && sceneImages[0].width > 0) {
    let cnv = createCanvas(sceneImages[0].width, sceneImages[0].height);
    console.log("Canvas created with image dimensions:", sceneImages[0].width, "x", sceneImages[0].height);
  } else {
    // If image not loaded, create a default size canvas
    let cnv = createCanvas(800, 600);
    console.log("Image not loaded, created default canvas:", 800, "x", 600);
  }
  
  // Initialize nature sound and autoplay
  if (natureSound && natureSound.isLoaded()) {
    // First set volume to 0, then adjust after checking position in first frame
    natureSound.setVolume(0);
    natureSound.loop(); // Start loop playback
    soundPlaying = true;
    console.log("Nature sound initialized and started playback");
  } else {
    console.warn("Warning: Nature sound not defined or not loaded, will autoplay after loading");
  }
  
  // Initialize footsteps sound
  if (footstepsSound && footstepsSound.isLoaded()) {
    footstepsSound.setVolume(0.6); // Set appropriate volume
    console.log("Footsteps sound initialized");
  }
  
  // Initialize piano sound
  if (pianoSound && pianoSound.isLoaded()) {
    pianoSound.setVolume(0); // Initial volume 0
    console.log("Piano sound initialized");
  }
  
  // Initialize wind sound effect
  if (windSound && windSound.isLoaded()) {
    windSound.setVolume(0); // Initial volume 0
    console.log("Wind sound effect initialized");
  }
  
  // Initialize background music
  if (bgMusic && bgMusic.isLoaded()) {
    bgMusic.setVolume(0.15); // Set small volume
    console.log("Background music initialized");
  }
  
  // Initialize mouse clicks sound
  if (mouseClicksSound && mouseClicksSound.isLoaded()) {
    mouseClicksSound.setVolume(0); // Initial volume 0
    console.log("Mouse clicks sound initialized");
  }
  
  // Initialize keyboard typing sound
  if (keyboardTypingSound && keyboardTypingSound.isLoaded()) {
    keyboardTypingSound.setVolume(0); // Initial volume 0
    console.log("Keyboard typing sound initialized");
  }
  
  // Initialize scene manager
  sceneManager = new SceneManager();
  
  // Create a ball object
  ball = new Ball();
  console.log("Setup complete");
}

function draw() {
  // Display current scene and ball
  background(0); // Add black background to ensure always content visible
  
  // Try to display scene
  try {
    sceneManager.display();
    
    // If start scene, show title and instructions
    if (sceneManager.currentScene === 0) {
      displayStartScene();
    }
  } catch (e) {
    console.error("Error displaying scene:", e);
  }
  
  // Display ball, but not in start scene
  try {
    if (sceneManager.currentScene !== 0) {
      ball.graphic();
      ball.move();
      
      // Update background music
      updateBgMusic();
      
      // Adjust nature sound based on ball position
      updateSound();
      
      // Adjust piano sound based on ball position
      updatePianoSound();
      
      // Adjust wind sound effect based on ball position
      updateWindSound();
      
      // Adjust second scene specific area sounds based on ball position
      updateSecondSceneSounds();
      
      // Control footsteps sound based on key state
      updateFootstepsSound();
      
      // Check if reached tip position(x=541), only in first game scene (now scene 1)
      if (sceneManager.currentScene === 1 && ball.x >= 541) {
        showNextSceneTip = true;
      } else {
        showNextSceneTip = false;
      }
    }
  } catch (e) {
    console.error("Error displaying ball:", e);
  }
  
  // Display next scene tip
  if (showNextSceneTip) {
    push();
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(2);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Continue walking right to the next scene", width / 2, height / 4);
    
    // Add a flashing arrow tip
    let arrowAlpha = 128 + 127 * sin(frameCount * 0.1);
    fill(255, 255, 0, arrowAlpha);
    noStroke();
    let arrowX = width / 2 + 150;
    let arrowY = height / 4;
    triangle(arrowX, arrowY, arrowX - 20, arrowY - 10, arrowX - 20, arrowY + 10);
    pop();
  }
}

// Display start scene content
function displayStartScene() {
  push();
  // Set title
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Definding path", width/2, height/3);
  
  // Set instructions
  textSize(24);
  text("Instructions", width/2, height/2 - 20);
  
  textSize(18);
  let instructions = [
    "Arrow Keys ← → ↑ ↓ : Control character movement",
    "",
    "Press Space to start the game"
  ];
  
  for (let i = 0; i < instructions.length; i++) {
    text(instructions[i], width/2, height/2 + 20 + i * 30);
  }
  pop();
}

// Update background music state
function updateBgMusic() {
  // Only play background music in second scene (originally first scene, now second scene)
  if (sceneManager.currentScene !== 1) {
    // If not second scene but background music still playing, stop music
    if (bgMusic && bgMusicPlaying) {
      bgMusic.stop();
      bgMusicPlaying = false;
      console.log("Scene change, stopping background music");
    }
    return;
  }
  
  // Code below only executes in second scene
  // Check if background music is available
  if (!bgMusic || !bgMusic.isLoaded()) {
    return;
  }
  
  // Play background music in second scene
  if (!bgMusicPlaying) {
    try {
      bgMusic.loop();
      bgMusicPlaying = true;
      console.log("Starting background music");
    } catch (e) {
      console.error("Error playing background music:", e);
    }
  }
}

// Update wind sound effect state
function updateWindSound() {
  // Check if sound is available
  if (!windSound || !windSound.isLoaded()) {
    return;
  }
  
  // Handle wind sound effect based on current scene
  if (sceneManager.currentScene === 1) { // Originally first scene, now second scene
    // Second scene: Play wind sound in specific area
    // Define wind sound area
    const windCenter = 612;  // Position where wind is loudest
    const windStart = 468;   // Position where wind starts
    const fadeDistance = windCenter - windStart; // Fade-in distance
    
    // Calculate volume based on ball's x position
    let vol = 0;
    
    // Maximum volume when near centerX
    if (ball.x >= windCenter) {
      vol = 2.0; // Maximum volume, increased from 1.0 to 2.0
    } 
    // Fade-in area
    else if (ball.x >= windStart && ball.x < windCenter) {
      // Within transition zone, calculate volume ratio (from 0.0 to 2.0)
      vol = map(ball.x, windStart, windCenter, 0.0, 2.0);
    }
    
    // Set volume
    windSound.setVolume(vol, 0.1); // Second parameter is fade-in/out time (seconds)
    
    // Control playback based on volume
    if (vol > 0) {
      if (!windPlaying) {
        try {
          windSound.loop();
          windPlaying = true;
          console.log("Starting wind sound effect, volume:", vol);
        } catch (e) {
          console.error("Error playing wind sound effect:", e);
        }
      }
    } else if (vol <= 0 && windPlaying) {
      try {
        windSound.stop();
        windPlaying = false;
        console.log("Stopping wind sound effect");
      } catch (e) {
        console.error("Error stopping wind sound effect:", e);
      }
    }
  } 
  else if (sceneManager.currentScene === 2) { // Originally second scene, now third scene
    // Third scene: Play wind sound as background music
    if (!windPlaying) {
      try {
        windSound.setVolume(1.0); // Set appropriate volume
        windSound.loop();
        windPlaying = true;
        console.log("Third scene starting wind background music");
      } catch (e) {
        console.error("Error playing third scene wind background music:", e);
      }
    }
  }
  else {
    // Other scenes: Stop wind sound
    if (windPlaying) {
      try {
        windSound.stop();
        windPlaying = false;
        console.log("Switching to other scene, stopping wind sound effect");
      } catch (e) {
        console.error("Error stopping wind sound effect:", e);
      }
    }
  }
}

// Update environment sound state
function updateSound(forceUpdate = false) {
  // Only activate environment sound in second scene
  if (sceneManager.currentScene !== 1) { // Originally first scene, now second scene
    // If not second scene but sound still playing, stop sound
    if (natureSound && soundPlaying) {
      natureSound.stop();
      soundPlaying = false;
      console.log("Scene change, stopping environment sound");
    }
    return;
  }
  
  // Code below only executes in second scene
  // Check if sound is available
  if (!natureSound) {
    return;
  }
  
  // Check if sound is loaded
  if (!natureSound.isLoaded()) {
    // If sound just finished loading, start playing immediately
    if (natureSound.isLoaded() && !soundPlaying) {
      natureSound.loop();
      soundPlaying = true;
      console.log("Environment sound loaded, starting playback");
    }
    return;
  }
  
  // Define sound area
  const fullVolumeX = 50; // Volume is maximum when x is less than this value
  const noVolumeX = 160; // Volume is 0 when x is greater than this value (changed from 130 to 160)
  
  // Calculate volume based on ball's x position
  let vol = 0;
  if (ball.x <= fullVolumeX) {
    vol = 1.0; // Maximum volume
  } else if (ball.x > fullVolumeX && ball.x < noVolumeX) {
    // Within transition zone, calculate volume ratio (from 1.0 to 0.0)
    vol = map(ball.x, fullVolumeX, noVolumeX, 1.0, 0.0);
  }
  
  // Set volume
  natureSound.setVolume(vol, 0.1); // Second parameter is fade-in/out time (seconds)
  
  // Control playback based on volume
  if (vol > 0) {
    if (!soundPlaying || forceUpdate) {
      try {
        natureSound.loop();
        soundPlaying = true;
        console.log("Starting environment sound, volume:", vol);
      } catch (e) {
        console.error("Error playing environment sound:", e);
      }
    }
  } else if (vol <= 0 && soundPlaying) {
    try {
      natureSound.stop();
      soundPlaying = false;
      console.log("Stopping environment sound");
    } catch (e) {
      console.error("Error stopping environment sound:", e);
    }
  }
}

// Update piano sound state
function updatePianoSound() {
  // Only activate piano sound in second scene
  if (sceneManager.currentScene !== 1) { // Originally first scene, now second scene
    // If not second scene but piano sound still playing, stop sound
    if (pianoSound && pianoPLaying) {
      pianoSound.stop();
      pianoPLaying = false;
      console.log("Scene change, stopping piano sound");
    }
    return;
  }
  
  // Code below only executes in second scene
  // Check if sound is available
  if (!pianoSound || !pianoSound.isLoaded()) {
    return;
  }
  
  // Define piano sound area
  const pianoStartX = 300; // X coordinate where piano sound starts
  const pianoEndX = 360;   // X coordinate where piano sound ends
  const fadeDistance = 40; // Transition distance for fade-in/out, increased from 20 to 40
  
  // Calculate volume based on ball's x position
  let vol = 0;
  
  // Maximum volume when completely inside piano area
  if (ball.x >= pianoStartX + fadeDistance && ball.x <= pianoEndX - fadeDistance) {
    vol = 1.0;
  } 
  // Fade-in area
  else if (ball.x >= pianoStartX - fadeDistance && ball.x < pianoStartX + fadeDistance) {
    vol = map(ball.x, pianoStartX - fadeDistance, pianoStartX + fadeDistance, 0.0, 1.0);
  } 
  // Fade-out area
  else if (ball.x > pianoEndX - fadeDistance && ball.x <= pianoEndX + fadeDistance) {
    vol = map(ball.x, pianoEndX - fadeDistance, pianoEndX + fadeDistance, 1.0, 0.0);
  }
  
  // Set volume
  pianoSound.setVolume(vol, 0.1); // Second parameter is fade-in/out time (seconds)
  
  // Control playback based on volume
  if (vol > 0) {
    if (!pianoPLaying) {
      try {
        pianoSound.loop();
        pianoPLaying = true;
        console.log("Starting piano sound, volume:", vol);
      } catch (e) {
        console.error("Error playing piano sound:", e);
      }
    }
  } else if (vol <= 0 && pianoPLaying) {
    try {
      pianoSound.stop();
      pianoPLaying = false;
      console.log("Stopping piano sound");
    } catch (e) {
      console.error("Error stopping piano sound:", e);
    }
  }
}

// Update footsteps sound
function updateFootstepsSound() {
  if (!footstepsSound || !footstepsSound.isLoaded()) {
    return;
  }
  
  // Detect if moving (any direction key pressed)
  let walking = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || 
                keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW);
  
  // Handle sound on state change
  if (walking && !isWalking) {
    // Start moving, play footsteps sound
    footstepsSound.loop();
    isWalking = true;
  } else if (!walking && isWalking) {
    // Stop moving, stop footsteps sound
    footstepsSound.stop();
    isWalking = false;
  }
}

// Update second scene specific area sounds
function updateSecondSceneSounds() {
  // Only enable these sounds in third scene
  if (sceneManager.currentScene !== 2) { // Originally second scene, now third scene
    // If not third scene but sound still playing, stop sound
    if (mouseClicksSound && mouseClicksPlaying) {
      mouseClicksSound.stop();
      mouseClicksPlaying = false;
      console.log("Scene change, stopping mouse clicks sound");
    }
    if (keyboardTypingSound && keyboardTypingPlaying) {
      keyboardTypingSound.stop();
      keyboardTypingPlaying = false;
      console.log("Scene change, stopping keyboard typing sound");
    }
    return;
  }
  
  // Code below only executes in third scene
  // Check if sound is available
  if ((!mouseClicksSound || !mouseClicksSound.isLoaded()) && 
      (!keyboardTypingSound || !keyboardTypingSound.isLoaded())) {
    return;
  }
  
  // Define sound area
  const soundStartX = 285;  // X coordinate where sound starts
  const soundEndX = 485;    // X coordinate where sound ends
  const soundCenterX = 396; // Center X coordinate where sound is loudest
  const maxDistance = Math.max(soundCenterX - soundStartX, soundEndX - soundCenterX);
  
  // Only play sound within specified area
  if (ball.x >= soundStartX && ball.x <= soundEndX) {
    // Calculate distance from center point
    let distance = Math.abs(ball.x - soundCenterX);
    
    // Calculate volume based on distance (closer = louder)
    let vol = 1.0 - (distance / maxDistance);
    // Ensure volume is within 0-1 range
    vol = Math.max(0, Math.min(1, vol));
    
    // Set mouse clicks sound volume
    if (mouseClicksSound && mouseClicksSound.isLoaded()) {
      mouseClicksSound.setVolume(vol, 0.1);
      
      // If not playing yet, start playing
      if (!mouseClicksPlaying) {
        try {
          mouseClicksSound.loop();
          mouseClicksPlaying = true;
          console.log("Starting mouse clicks sound, volume:", vol);
        } catch (e) {
          console.error("Error playing mouse clicks sound:", e);
        }
      }
    }
    
    // Set keyboard typing sound volume
    if (keyboardTypingSound && keyboardTypingSound.isLoaded()) {
      keyboardTypingSound.setVolume(vol, 0.1);
      
      // If not playing yet, start playing
      if (!keyboardTypingPlaying) {
        try {
          keyboardTypingSound.loop();
          keyboardTypingPlaying = true;
          console.log("Starting keyboard typing sound, volume:", vol);
        } catch (e) {
          console.error("Error playing keyboard typing sound:", e);
        }
      }
    }
  } else {
    // If not in trigger area but sound still playing, stop sound
    if (mouseClicksSound && mouseClicksPlaying) {
      mouseClicksSound.stop();
      mouseClicksPlaying = false;
      console.log("Leaving area, stopping mouse clicks sound");
    }
    if (keyboardTypingSound && keyboardTypingPlaying) {
      keyboardTypingSound.stop();
      keyboardTypingPlaying = false;
      console.log("Leaving area, stopping keyboard typing sound");
    }
  }
}

function keyPressed() {
  // If in start scene and Space pressed, switch to game scene
  if (key === ' ' && sceneManager.currentScene === 0) {
    sceneManager.nextScene();
    console.log("Starting game, switching to scene:", sceneManager.currentScene);
    return;
  }
  
  // Press Space to switch scenes (only enabled in non-start scenes)
  if (key === ' ' && sceneManager.currentScene > 0) {
    sceneManager.nextScene();
    console.log("Switching to scene:", sceneManager.currentScene);
  }
}

function keyReleased() {
  // When all direction keys are released, stop footsteps sound
  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && 
      !keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
    if (footstepsSound && isWalking) {
      footstepsSound.stop();
      isWalking = false;
    }
  }
  return false; // Prevent default behavior
}

// Adjust canvas size when window is resized
function windowResized() {
  // No longer adjust canvas size, keep consistent with background image
  console.log("Window size changed, but canvas size remains unchanged");
}

class Ball {
  constructor() {
    this.s = 50; // Set size first
    
    // Initial position in bottom left corner
    if (ballImage && ballImage.width > 0) {
      // If image loaded, consider actual image dimensions
      let ballHeight = this.s * (ballImage.height / ballImage.width);
      this.x = this.s / 2 + 20; // Some distance from left edge
      this.y = height - ballHeight / 2 - 20; // Some distance from bottom edge
      // Save initial y coordinate for limiting vertical movement range
      this.initialY = this.y;
    } else {
      // Default position
      this.x = this.s / 2 + 20;
      this.y = height - this.s / 2 - 20;
      // Save initial y coordinate for limiting vertical movement range
      this.initialY = this.y;
    }
    
    this.speed = 1; // Reduced movement speed (from 2 to 1)
    this.reachedRightBoundary = false; // Whether reached right boundary and switched scenes
    this.reachedLeftBoundary = false; // Whether reached left boundary and switched scenes
  }
  
  graphic() {
    if (ballImage && ballImage.width > 0) {
      // Use image instead of ball, maintain original aspect ratio
      push();
      imageMode(CENTER);
      // Only specify width, maintain original aspect ratio
      image(ballImage, this.x, this.y, this.s, null);
      pop();
    } else {
      // If image not loaded, display yellow circle as fallback
      fill(255, 255, 50);
      noStroke();
      ellipse(this.x, this.y, this.s, this.s);
    }
  }
  
  move() {
    let imgWidth = this.s;
    let imgHeight = this.s;
    
    // If image loaded, get actual image height (after maintaining aspect ratio)
    if (ballImage && ballImage.width > 0) {
      imgHeight = this.s * (ballImage.height / ballImage.width);
    }
    
    // Reset boundary detection flags
    this.reachedRightBoundary = false;
    this.reachedLeftBoundary = false;
    
    // X-direction movement unrestricted
    if (keyIsDown(RIGHT_ARROW)) {
      let newX = this.x + this.speed;
      
      // Check if reached right boundary
      if (newX >= width - imgWidth/2) {
        // Reached right boundary, mark as needing scene switch
        this.reachedRightBoundary = true;
        
        // If second scene (originally first scene), switch to next scene
        if (sceneManager.currentScene === 1) {
          sceneManager.nextScene();
          // Reposition ball to x=63
          this.x = 63;
        } else {
          // If third scene (originally second scene) or other scene, stay at edge
          this.x = width - imgWidth/2;
        }
      } else {
        // Normal movement
        this.x = newX;
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      let newX = this.x - this.speed;
      
      // Check if in second scene and reached left boundary (x = 0)
      if (sceneManager.currentScene > 0 && newX <= imgWidth/2) {
        // Reached left boundary, mark as needing switch back to previous scene
        this.reachedLeftBoundary = true;
        
        // Switch back to previous scene
        sceneManager.previousScene();
        
        // Reposition ball near right edge
        this.x = width - imgWidth/2 - 20;
      } else {
        // Normal movement
        this.x = max(imgWidth/2, newX);
      }
    }
    
    // Y-direction limited to within 30 pixels above initial position
    if (keyIsDown(DOWN_ARROW)) {
      // Downward movement cannot exceed initial position
      this.y = min(this.initialY, this.y + this.speed);
    }
    if (keyIsDown(UP_ARROW)) {
      // Upward movement cannot exceed 30 pixels above initial position
      this.y = max(this.initialY - 30, this.y - this.speed);
    }
  }
}

class SceneManager {
  constructor() {
    this.currentScene = 0;
    this.totalScenes = sceneImages.length;
    console.log("Scene manager initialized, total scenes:", this.totalScenes);
  }
  
  display() {
    // Ensure scene image is loaded
    if (sceneImages[this.currentScene] && sceneImages[this.currentScene].width > 0) {
      // Draw current scene using original resolution
      push();
      imageMode(CORNER); // Use top-left corner mode for background
      // Draw image directly, no scaling needed
      image(sceneImages[this.currentScene], 0, 0);
      pop();
    } else {
      // If image not loaded, display placeholder content
      push();
      fill(100, 0, 100);
      textSize(24);
      textAlign(CENTER, CENTER);
      text("Scene " + (this.currentScene + 1) + " loading...", width/2, height/2);
      pop();
    }
  }
  
  nextScene() {
    // Switch to next scene
    this.currentScene = (this.currentScene + 1) % this.totalScenes;
    this.adjustCanvasAndBallPosition();
  }
  
  previousScene() {
    // Switch to previous scene
    this.currentScene = (this.currentScene - 1 + this.totalScenes) % this.totalScenes;
    this.adjustCanvasAndBallPosition();
  }
  
  adjustCanvasAndBallPosition() {
    // If two scenes have different sizes, readjust canvas size
    if (sceneImages[this.currentScene] && 
        sceneImages[this.currentScene].width > 0 &&
        (width != sceneImages[this.currentScene].width || 
         height != sceneImages[this.currentScene].height)) {
      resizeCanvas(sceneImages[this.currentScene].width, sceneImages[this.currentScene].height);
      console.log("Adjusting canvas size to match new scene:", sceneImages[this.currentScene].width, "x", sceneImages[this.currentScene].height);
      
      // Readjust ball's y coordinate to keep it on the ground
      if (ball) {
        let ballHeight = ball.s;
        if (ballImage && ballImage.width > 0) {
          ballHeight = ball.s * (ballImage.height / ballImage.width);
        }
        // Only adjust y coordinate, x coordinate determined by scene switching logic in move method
        ball.y = height - ballHeight / 2 - 20;
        ball.initialY = ball.y;
      }
    }
  }
} 