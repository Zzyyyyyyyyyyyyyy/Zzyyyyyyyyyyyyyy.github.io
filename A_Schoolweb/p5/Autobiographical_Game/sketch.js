/*
INSTRUCTIONS:

Code all of your game logic in the specific scene files!

To create a new scene, create a new class that follows the template
of the other scene classes. If you are putting this in a new file,
make sure to include a reference to this file in the index.html!

When you finish coding your new class/scene, also make sure to create
a variable that will store an instance of this scene. This would
look something like...

let myScene;

and then in setup(): myScene = new MyScene();

... or however you want to name it!


notes:
- Any variable and class names that exist can be changed to fit
  your needs.
- Feel free to reach out to me with questions at any point.
- I've added all of the p5 input functions into a separate file
  called p5input.js. These are things like:
  - function mousePressed() {}
  - function keyPressed() {}
  - ... and so on.

*/


//在这下面加一个let newScene；， 然后跑去setup中在下面加多一个newScene=new newScene()
// these variable will store your scenes. You can name them whatever you'd like.
let MenuScene;
let FirstScene;
let SecondScene;
let ThirdScene;
let menuBgMusic;

//this stores the current scene
let currentScene;

function setup() {
  createCanvas(600, 400);
  
  // assign instances of your scene classes to variables.、这里的New后面的第一个一定要小写，大写也行，但是取决于前面的是小写还是大写
  MenuScene = new menuScene();
  FirstScene = new firstScene();
  SecondScene = new secondScene();
  ThirdScene = new thirdScene();
  
  // make sure to add any additional scenes you create here!
  
  //这下面的第一个就是最先开始的Scene
  currentScene = MenuScene;
  currentScene.enterScene();
}

function draw() {
  // calls the update/display logic of the current scene，这里的Update和display有什么区别
  currentScene.update();
  currentScene.display();
}

// handles switching scenes. Makes sure that we call any exit and enter
// conditions of the current, and the target scene.
function switchScenes(targetScene) {
  currentScene.exitScene();
  currentScene = targetScene;
  currentScene.enterScene();
}