var clientPosition;
// Getting the client position
function preload() {
  clientPosition = getCurrentPosition();
  crossImg = loadImage("./assets/cross_red.png")
}
// Setting variables to display the map
var mapSurface;
var canvas;

// Setting variable to have the map
var mapData = new Mappa("MapboxGL", "pk.eyJ1Ijoic3Jkd2piIiwiYSI6ImNqb3IwZDQwOTBhdG8za3JuM2s4djc2Zm0ifQ.4TjgyjeOq_0JX7xcjEG0Cg");
var options = {
  lat: 0,
  lng: 0,
  zoom: 8,
  style: "mapbox://styles/srdwjb/cjor0hak3curi2rlmm8c1c6oa"
}

var clientLat;
var clientLon;

// Variables which will be used as true/false to determine which button is pressed
var button1Pressed;
var button2Pressed;
var button3Pressed;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
// Getting the client latitude and longitude
  clientLat = clientPosition.latitude;
  clientLon = clientPosition.longitude;

  // Changing coordinates in setup because they can't be set to be clientPosition.lat/lon
  // in var options, which is outside of any function
  options.lat = clientLat;
  options.lng = clientLon;

// Displaying the map on the canvas
  mapSurface = mapData.tileMap(options);
  mapSurface.overlay(canvas);

  // setting variables for triggering responses = false here in setup so they can be changed later
  button1Pressed = false;
  button2Pressed = false;
  button3Pressed = false;

}

// Defining my town coordinates

var myTownLat = 45.804828;
var myTownLon = 8.672905;

// Variables to be used to create buttons
var button1;
var button2;
var button3;

// Variables used to create the introduction text for this page
var noTechTextX;
var noTechTextY;

// Variables used to calculate time by foot and by horse
var resultWalkLong;
var resultHorseLong;

// Variables used to have just 2 decimals
var resultWalk;
var resultHorse;

function draw() {
  clear();

// calculating the distance between me and the client
  var distanceFromMeLong = calcGeoDistance(clientLat, clientLon, myTownLat, myTownLon, "km");
// settin it to have just 3 decimals
var distanceFromMe = distanceFromMeLong.toFixed(3);

// Calculating results for time of the travel
resultWalkLong = (distanceFromMe/2);
resultHorseLong = (distanceFromMe/6);
// toFixed lets you include just a chosen number of decimals
resultWalk = resultWalkLong.toFixed(2);
resultHorse = resultHorseLong.toFixed(2);

// Setting crosses in my town and at the client
  var clientDot = mapSurface.latLngToPixel(clientLat, clientLon);
  var myTownDot = mapSurface.latLngToPixel(myTownLat, myTownLon);

  push();
image(crossImg, clientDot.x - crossImg.width/40, clientDot.y - crossImg.height/40, crossImg.width/20, crossImg.height/20);
  image(crossImg, myTownDot.x - crossImg.width/40, myTownDot.y - crossImg.height/40, crossImg.width/20, crossImg.height/20);
  pop();

  push();
  textFont("MedievalSharp");
  textSize(16);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Your shack", clientDot.x, clientDot.y - 25);
  text("My village", myTownDot.x, myTownDot.y - 25);
  pop();

  // Creating header and footer with introduction
  push();
  noStroke();
  fill("#f5dcc6");
  rect(0, 0, width, 1 / 9 * height);

  fill("#f5dcc6");
  rect(0, 8 / 9 * height, width, 1 / 9 * height);
  pop();

  noTechTextX = 1 / 14 * width;
  noTechTextY = 43 / 44 * height - 30

  // Creating buttons to answer question and have responses
  // setting variables
  var button1X = noTechTextX - 5;
  var button1Y = noTechTextY + 15;
  var button1W = 172.5;
  var button1H = 21;

  var button2X = noTechTextX - 5 + 300;
  var button2Y = noTechTextY + 15;
  var button2W = 117.5;
  var button2H = 21;

  var button3X = noTechTextX - 5 + 545;
  var button3Y = noTechTextY + 15;
  var button3W = 267.5;
  var button3H = 21;

// creating them
  push();
  noStroke();
  fill(219, 68, 55);
  button1 = rect(button1X, button1Y, button1W, button1H);
  button2 = rect(button2X, button2Y, button2W, button2H);
  button3 = rect(button3X, button3Y, button3W, button3H);
  pop();

// Second page title
  push();
  textAlign(CENTER);
  textFont("MedievalSharp");
  textSize(40);

  fill(219, 68, 55);
  text("...IT IS THE MIDDLE AGES!", width / 2 - 450, height / 11 - 38, 900, 500);
  pop();

// Text for the question and the buttons
  push();

  textFont("Almendra");
  textSize(16);
  fill(0, 0, 0);


  text("Bye bye global warming and technology! So you're " + distanceFromMe + " km away, what do you do?", noTechTextX - 70, noTechTextY);
push();
fill(0, 255, 255);
  text("Join a caravan of farmers", noTechTextX, noTechTextY + 30);

  text("Borrow ;) a horse", noTechTextX + 300, noTechTextY + 30);

  text("It's so far! Ask Merlin for a teleportation", noTechTextX + 545, noTechTextY + 30);
  pop();
  pop();




  // Conditions to for triggering responses after clicking buttons
  if (mouseIsPressed == true) {
    // if mouse is pressed on the button
    if (mouseX > button1X && mouseX < button1X + button1W &&
      mouseY > button1Y && mouseY < button1Y + button1H) {

      button1Pressed = true;
      button2Pressed = false;
      button3Pressed = false;



    } else if (mouseX > button2X && mouseX < button2X + button2W &&
      mouseY > button2Y && mouseY < button2Y + button2H) {

        button1Pressed = false;
        button2Pressed = true;
        button3Pressed = false;


    } else if (mouseX > button3X && mouseX < button3X + button3W &&
      mouseY > button3Y && mouseY < button3Y + button3H) {

        button1Pressed = false;
        button2Pressed = false;
        button3Pressed = true;


    }
  }
// function which gives responses according to buttonPressed conditions
  responses();


}

// function which determines which response will be shown
function responses() {
  if (button1Pressed == true && button2Pressed == false && button3Pressed == false) {
push();
    textFont("Almendra");
    textSize(16);
    textStyle(BOLD);
    fill(20, 20, 20);
    text("You enjoy " + resultWalk + " hours walking with the farmers and talking about how near the harvesting season is", noTechTextX + width / 2 - 145, noTechTextY);
pop();
  } else if (button1Pressed == false && button2Pressed == true && button3Pressed == false) {
push();
    textFont("Almendra");
    textSize(16);
    textStyle(BOLD);
    fill(20, 20, 20);
    text("You ride for " + resultHorse + " hours, when you arrive your back hurts and you stink of manure", noTechTextX + width / 2 - 145, noTechTextY);
pop();
  } else if (button1Pressed == false && button2Pressed == false && button3Pressed == true) {
push();
    textFont("Almendra");
    textSize(16);
    textStyle(BOLD);
    fill(20, 20, 20);
    text("You fool! Merlin is in England! You probably thought you could ask him with your phone uh?", noTechTextX + width / 2 - 145, noTechTextY);
pop();
  }
}
