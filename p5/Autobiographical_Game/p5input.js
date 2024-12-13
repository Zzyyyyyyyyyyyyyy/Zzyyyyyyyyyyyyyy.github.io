function keyPressed() {
  if (currentScene && typeof currentScene.keyPressed === "function") {
    currentScene.keyPressed();
  }
}

function keyReleased() {
  if (currentScene && typeof currentScene.keyReleased === "function") {
    currentScene.keyReleased();
  }
}

function mousePressed() {
  if (currentScene && typeof currentScene.mousePressed === "function") {
    currentScene.mousePressed();
  }
}

function mouseReleased() {
  if (currentScene && typeof currentScene.mouseReleased === "function") {
    currentScene.mouseReleased();
  }
}

function mouseDragged() {
  if (currentScene && typeof currentScene.mouseDragged === "function") {
    currentScene.mouseDragged();
  }
}

function mouseClicked() {
  if (currentScene && typeof currentScene.mouseClicked === "function") {
    currentScene.mouseClicked();
  }
}
