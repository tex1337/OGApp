/**
 * Created by Sean Ryan on 7/14/2017.
 * Using KonvaJS: Don't reinvent the wheel.
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
    fill: 'white',
    stroke: 'black',
    strokeWidth: 2
});

layer.add(inputArea).draw();
stage.add(layer);

// Storage for all circles on layer
var Circles = new Konva.Group();

// A sample circle to test the functionality of Konva
// var testCircle = new Konva.Circle({
//     x: stage.getWidth() / 2,
//     y: stage.getHeight() / 2,
//     radius: 50,
//     fill: 'yellow',
//     stroke: 'black',
//     strokeWidth: 4,
//     draggable: true
// });

// Push test to array
//Circles.add(testCircle);

// Detect mouseevent click on inputArea
inputArea.on('click', function(e) {

    // If this triggered, we weren't in a circle
    // so bash a new one out.
    var newCirc = new Konva.Circle({
        x: e.evt.clientX,
        y: e.evt.clientY,
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

    newCirc.on('dblclick dbltap', function(e) {
        this.destroy();
        layer.draw();
    });

    // There could be some
    Circles.add(newCirc);
    doUpdate();
});

// Run view update
doUpdate();


// Function DoUpdate():
// Takes the current list of circles and adds them
// to the current layer, then forwards the layer to be drawn on
// the stage.
function doUpdate(){
    layer.add(Circles);
    stage.add(layer);
}