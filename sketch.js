var clientPosition;
// getting client position
function preload(){
clientPosition = getCurrentPosition();
}
// Setting variables to display the map
var mapSurface;
var canvas;
// Setting variable to have the map
var mapData = new Mappa("Leaflet");
var options = {
lat: 0,
lng: 0,
zoom: 8.5,
style:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",
}

// Variables which will contain just the latitude and longitude of client
var clientLat;
var clientLon;

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
}

// Defining my town coordinates

var myTownLat = 45.804828;
var myTownLon =  8.672905;

function draw() {
clear();

var distanceFromMeLong = calcGeoDistance(clientLat, clientLon, myTownLat, myTownLon, "km");
// toFixed lets you include just a chosen number of decimals
var distanceFromMe = distanceFromMeLong.toFixed(3);

// Creating dots at the client position and at my town position
var clientDot = mapSurface.latLngToPixel(clientLat, clientLon);
var myTownDot = mapSurface.latLngToPixel(myTownLat, myTownLon);
// Creating a line which connects the dots
push();
strokeWeight(4);
stroke(66, 133, 244)
line(clientDot.x, clientDot.y, myTownDot.x, myTownDot.y,)
pop();

push();
strokeWeight(3);
stroke(66, 133, 244);
fill(255, 255, 255);
ellipse(clientDot.x, clientDot.y, 25);
ellipse(myTownDot.x, myTownDot.y, 25);
pop();

push();
textFont("Trebuchet MS");
textSize(16);
textAlign(CENTER);
textStyle(BOLD);
text("Your house", clientDot.x, clientDot.y - 25);
text("My town", myTownDot.x, myTownDot.y - 25);
pop();

// Creating header and footer with introduction
push();
noStroke();
fill(255, 255, 255);
rect(0, 0, width, 1/9 * height);

fill(255, 255, 255);
rect(0, 8/9 * height, width, 1/9 * height);
pop();

// Creating a button to change window to have a new map style
var buttonX = width/2 + 328;
var buttonY = 43/44 * height - 32;
var buttonW = 73;
var buttonH = 21;

push();
noStroke();
fill(66, 133, 244);
rect(buttonX, buttonY, buttonW, buttonH);
pop();


// text for header
push();
textAlign(CENTER);
textFont("Trebuchet MS");
textSize(16);
push();
fill(20, 20, 20);
text("Let's say I invited you to a party in my hometown and that you accepted, your distance from my town is " + distanceFromMe + " km, so you start thinking wether it will be by train or car."
, width/2 - 450, height/11 - 30, 900, 500);
// text for footer
text("When suddenly you notice something, you look out of your window and you realize that..."
, width/2 - 425, 43/44 * height - 30, 850, 500);
pop();
// text for button
fill(255, 255, 255);
text("continue"
, buttonX + 2, buttonY + 2, buttonW, buttonH);
pop();


// mouse pressed on button opens a new window, which will have a new map
if(mouseIsPressed == true) {
if(mouseX > buttonX && mouseX < buttonX + buttonW &&
mouseY > buttonY && mouseY < buttonY + buttonH) {

window.open("page2.html", "_self");

}
}








}
