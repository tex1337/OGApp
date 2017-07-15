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

var inputArea = new Konva.Rect({
    width: 500,
    height: 500,
    fill: 'white'
});

// Storage for all circles on layer
var Circles = new Konva.Group();

layer.add(inputArea).draw();
stage.add(layer);

// EventHandler click on inputArea
inputArea.on('click', function(e) {
    // If this triggered, we weren't in a circle
    // so bash a new one out, only on left-mouse.
    if(e.evt.button === 0){
        circleFactory(e.evt.clientX, e.evt.clientY);
        doUpdate();
    }

});

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

    newCirc.on('mouseover dragstart', function() {
        this.moveToTop();
        layer.draw();
    });

    newCirc.on('dblclick dbltap', function() {
        this.destroy();
        layer.draw();
    });

    // Push new circle and update the view
    Circles.add(newCirc);
    doUpdate();
}