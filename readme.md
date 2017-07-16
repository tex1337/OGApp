# OG Skills Assessment - JS Canvas App

## Application Overview

### Aims of Application
This app was assigned as a programming exercise as part of a job interview process. Although this is my first use of the HTML5 canvas, it was an enjoyable task with
This app is designed to fulfill the following criteria:

- Clicking anywhere on the canvas adds another circle.
- You can drag circles around using the mouse.
- When dragging circles around, they wont overlap each other.
- Take the code out of jsfiddle and wrap it up in a node.js + express + mongodb web app where you can.

### Current State of Project

- Aim Completion
	- All aims completed save for the collision detection, this was put on the backburner until I can work out the cause of the mouse discrepancy with margin and padding styles causing the values to go off the charts. (Used Vector impetus, might shift to simpler cartesian transform from min/max values).

	- A great source of collision detection comes from a find when I worked on a robotic car: [Steering Behaviours (Craig Reynolds)](http://www.red3d.com/cwr/steer/). Although nowhere near as complex, my aim was to follow around the collider stroke to stroke tangentially. Great read for managing large groups of entities being simulated at once.

- Frontend
	- Although fully functional, the user facing end of the application does require a little more finessing.

	- The form is as minimal as possible, so might go well with a little notification area or something similar.

	- For now, it's stuck to a relative top-left position as any change in margin or padding blows the mouse x & y coordinates off the charts. That needs solving.

	- Templates for errors and notifications also require a bit of TLC

	- Needs final check for spelling errors and overly verbose comments.

- Backend