# Vanilla JS Sierpinsky painter

See it live at [sierpinski.mikael.red](https://sierpinski.mikael.red)

## What is this?

This is a simple Sierpinski painter written in vanilla JS. It uses the HTML5 canvas element to draw the triangles.

## How does it work?

The user clicks three times to create a triangle. When there are three points, the canvas is cleared and the triangle is drawn. Then the user can click anywhere to create a new point which removes the oldest point and draws a new triangle with the three newest points.

## How to run

1. Clone the repo
2. Run `npm install`
3. Run `npm run serve`
4. Open `http://localhost:8080` in your browser
5. Click three times to create a triangle