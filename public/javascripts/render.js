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
inputArea.on('click', function(e) {

    // If this triggered, we weren't in a circle
    // so bash a new one out, only on left-mouse.
    if(e.evt.button === 0){
        circleFactory(e.evt.layerX, e.evt.layerY);
        doUpdate();
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

    newCirc.on('dragmove', function(e){
        if(Circles.children.length > 1){
            for(var i = 0; i < Circles.children.length; i++){

                var c1 = {x: this.attrs.x, y: this.attrs.y};
                var c2 = {x: Circles.children[i].attrs.x, y: Circles.children[i].attrs.y};

                if(c1.x !== 0 && c1.y !== 0){
                    var circleReference = Circles.children[i];

                    if(isColliding(c1.x, c1.y, c2.x, c2.y)){
                        // Figure out intersection midpoint
                        var midx = 0.5*(c1.x + c2.x);
                        var midy = 0.5*(c1.y + c2.y);

                        // Distance vector between C1, C2.
                        var dist = Math.sqrt(Math.pow((c2.x - c1.x), 2) + Math.pow((c2.y - c1.y), 2));

                        // Solve for C1 new coordinates
                        this.attrs.x = midx + 98 * (c1.x - c2.x) / dist;
                        this.attrs.y = midy + 98 * (c1.y - c2.y) / dist;
                    }
                }
            }
        }
    });

    newCirc.on('dblclick dbltap', function(e) {
        this.destroy();
        e.cancelBubble = true;
        layer.draw();
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
function isColliding(x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dr = 100 + 2;

    if(dx === 0 && dy === 0){
        return false;
    } else {
        return (Math.pow(dx, 2) + Math.pow(dy, 2)) < Math.pow(dr, 2);
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