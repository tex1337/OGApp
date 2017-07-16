# OG Skills Assessment - JS Canvas App

## Application Overview

### Aims of Application
This app was assigned as a programming exercise as part of a job
interview process. Although this is my first use of the HTML5 canvas,
it was an enjoyable task, utilizing my knowledge and experience pool to
find a simple and fast way to create an implementation.

This app is designed to fulfill the following criteria:

- Clicking anywhere on the canvas adds another circle.
- You can drag circles around using the mouse.
- When dragging circles around, they wont overlap each other.
- Take the code out of jsfiddle and wrap it up in a node.js + express +
mongodb web app where you can.

### Notes on Implementation

- Fully implemented all requested functionality.
- Used Konva lib for simplifying serialization and mouseevent
handling. Don't Re-invent the wheel.
- Wrote code for collision detection, didn't use any helper libs
for that.
- Implemented in Node + Express, deployed on Heroku cloud and
used the suggested mLab DB backend for you to peruse.
- Source is here on Github, setup Heroku to auto deploy on new push.


## Application Usage

Although this is quite a simple app, some of the logic behind the tools
available might be obscure or hidden in complexity, so this is a swift
guide to go over the way it works.

### Drawing
The canvas allows you to place a circle anywhere, but when you start to
drag it around, it will avoid other circles. It is this way to prevent
new circles popping up where you didn't intend them to.

To combat the fact that there can be overlaps in the creation and now
and again when placing the circle in an entrapped way, circles that have
been moused-over are pulled to the top to compensate for overlapping.

To delete a circle from the canvas, simply double-click on it.

### Saving
Files are saved to the database using a simple schema of filename and the
data JSON object for the drawing. New files require only the filename to
be a valid filename, no extension neccessary. You may create filenames
with spaces and digits, but beware! Pressing save with the filename of
an existing file in the database will overwrite the file with the current
canvas JSON.

### Loading
To load any file, simply type it's name into the text input area, select
load radio button and click submit. Names are case sensitive and may contain
spaces!

The loading mechanism uses a custom loading method in lieu of Konva.Node.Create
as the builtin method fails to provide support for dynamic object import
/ export. I.e: K.N.C fails to save the event handler methods assigned to
the circles for mouse events, and if they are crowbarred in, fails to
load them.

In order to load a file, the JSON is parsed for the list of Circles and
each is added to an empty shape group and reassigned it's helper methods
on initialization.

### Deleting
The filename is a unique index in the collection, so there may be only one
file with that filename. The delete simply searches and returns one file
and removes it from the collection.

## Notes

Please feel free to open an issue or email me if you stumble across this and would like to
let me know if there is a better solution, or if you find any bugs as I
do try to make sure that I learn from mistakes and take heed of constructive
criticism. Thanks in advance to you if you do decide to help me keep on
improving my craft!

[email](mailto:sean@tech1337.co.uk)
