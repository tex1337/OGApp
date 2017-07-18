/**
 * Created by Sean Ryan on 7/14/2017.
 * Using KonvaJS: Don't reinvent the wheel.
 *
 * P.S: This is my first real use of HTML5 Canvas!
 *      Lucky I know some P5.js / Processing!
 *
 */

// Create a 'stage' as canvas
var stage = new Konva.Stage({
    container: 'container',
    width: 500,
    height: 500
});

// New drawing layer
var layer = new Konva.Layer();

// Rect as a target for mouse events
var inputArea = new Konva.Rect({
    width: 500,
    height: 500,
    fill: 'white'
});

// EventHandler click on inputArea
inputArea.on('tap', function(e) {

    // If this triggered, we weren't in a circle
    // so bash a new one out, only on left-mouse.
    var coords = stage.getPointerPosition();

    circleFactory(coords.x, coords.y);
    doUpdate();
    console.log("Tapped!");
    console.log(e);

});

inputArea.on('mousedown', function(e) {

    // If this triggered, we weren't in a circle
    // so bash a new one out, only on left-mouse.
    var coords = stage.getPointerPosition();

    if(e.evt.button === 0){
        circleFactory(coords.x, coords.y);
        layer.draw();
    }

});

// Storage for all circles on layer
var Circles = new Konva.Group();

// Render Input layer as the lowest in Z-Depth.
layer.add(inputArea).draw();
stage.add(layer);


// <canvas> is dynamically gen, need this to add CSS to the DOM element.
var canv = document.querySelector('canvas');
canv.style.border = "3px solid black";


// Function DoUpdate():
// Takes the current list of circles and adds them
// to the current layer, then forwards the layer to be drawn on
// the stage.
function doUpdate(){
    layer.add(Circles);
    stage.add(layer);

    try{
        getImageJSON();
    } catch (error){
        console.log("Failed to find the hidden input!");
    }
}

// Function circleFactory
// Takes coordinates (x, y) and creates a new Circle
// object on the layer group
function circleFactory(X, Y){

    var newCirc = new Konva.Circle({
        x: X,
        y: Y,
        radius: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
    });

    newCirc.on('mouseover', function(e) {
        this.moveToTop();
        e.cancelBubble = true;
        layer.draw();
    });

    newCirc.on('dblclick', function(e) {
        this.destroy();
        e.cancelBubble = true;
        layer.draw();
    });

    newCirc.on('dbltap', function() {
        this.destroy();
        layer.draw();
    });

    newCirc.on('dragmove', function(e) {
        resolveCollisions(e.target);
    });

    // Push new circle and update the view
    Circles.add(newCirc);
    doUpdate();
}

// Function isColliding
// This function simply detects if
// the coordinates are less than the
// combined radii of the circles.
// Foregoes Sqrt for sqr of reference,
// faster than Math.sqrt.
function isColliding(x1, y1, x2, y2, sr){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dr = sr + 50;

    if(dx === 0 && dy === 0){
        return false;
    } else {
        return (Math.pow(dx, 2) + Math.pow(dy, 2)) < Math.pow(dr, 2);
    }
}

// Function resolveCollisions
// This function finds all circles in
// vicinity of the owner circle and
// recursively solves the collisions
// for each circle in the chain.

function resolveCollisions(owner){
    var searchRadius = 80;
    var neighbours = [];
    var c1 = owner.attrs;

    Circles.children.forEach(function(child){
        var c2 = child.attrs;

        if(isColliding(c1.x, c1.y, c2.x, c2.y, searchRadius)){
            neighbours.push(child);
        }

    });

    neighbours.forEach(function(n){
        var c2 = n.attrs;
        if(isColliding(c1.x, c1.y, c2.x, c2.y, 50)){
            var dist = Math.abs(Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2)));
            var midX = (c1.x + c2.x) / 2;
            var midY = (c1.y + c2.y) / 2;

            owner.position({
                x: (midX + 50 * (c1.x - c2.x) / dist),
                y: (midY + 50 * (c1.y - c2.y) / dist)
            });

            n.position({
                x: (midX + 50 * (c2.x - c1.x) / dist),
                y: (midY + 50 * (c2.y - c1.y) / dist)
            });

            layer.draw();
            resolveCollisions(n);
        }
    });

    // Base case to prevent stack limit breaching.
    if(! owner){
    }
}

// Function getImageJSON
// Function triggers the target stage
// built-in method for serializing the
// canvas image. Assigns the output to
// a hidden form element.
function getImageJSON(){
    var elem = document.getElementById('canvasJSON');
    elem.value = stage.toJSON();
}