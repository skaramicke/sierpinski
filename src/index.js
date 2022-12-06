const dots = 100000;

function randomPointInTriangle(vertices) {
  // Generate three random weights that sum to 1
  let weights = [Math.random(), Math.random(), Math.random()];
  weights = weights.map(
    (weight) => weight / weights.reduce((a, b) => a + b, 0)
  );

  // Compute the barycentric coordinates of the point
  let barycentric = weights.map((weight, i) =>
    vertices[i].map((coord) => coord * weight)
  );

  // Convert the barycentric coordinates to Cartesian coordinates
  let point = barycentric.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);

  return point;
}

const clear = (context, canvas) => {
  // Set the fill color to black
  context.fillStyle = "#000";

  // Fill the canvas with the color
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set draw style to white
  context.strokeStyle = "rgba(255, 255, 255, 1)";
};

const init = () => {
  const body = document.getElementsByTagName("body")[0];

  var canvas = document.createElement("canvas");
  body.appendChild(canvas);

  // Make the canvas fill the page
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Get the 2D drawing context
  var context = canvas.getContext("2d");

  clear(context, canvas);

  let polygonPoints = [];

  // Listen to single mouse clicks
  canvas.addEventListener("click", function (event) {
    // Add the point to the polygon
    polygonPoints.push([event.clientX, event.clientY]);

    if (polygonPoints.length > 3) {
      // If there are more than three points, remove the first point
      polygonPoints.shift();
    }

    // Clear the canvas
    clear(context, canvas);

    // Draw the polygon
    context.beginPath();
    context.moveTo(polygonPoints[0][0], polygonPoints[0][1]);
    for (let i = 1; i < polygonPoints.length; i++) {
      context.lineTo(polygonPoints[i][0], polygonPoints[i][1]);
    }
    context.closePath();
    context.stroke();

    // If there are three points, draw the triangle
    if (polygonPoints.length === 3) {
      // Pick a random point within the triangle
      let drawPoint = randomPointInTriangle(polygonPoints);

      for (let i = 0; i < dots; i++) {
        context.beginPath();
        // Draw a pixel at the point
        context.moveTo(drawPoint[0], drawPoint[1]);
        context.lineTo(drawPoint[0] + 1, drawPoint[1] + 1);

        context.stroke();
        context.closePath();

        // Pick a random vertex of the triangle
        let vertex =
          polygonPoints[Math.floor(Math.random() * polygonPoints.length)];

        // Move halfway to the vertex
        drawPoint[0] = (drawPoint[0] + vertex[0]) / 2;
        drawPoint[1] = (drawPoint[1] + vertex[1]) / 2;
      }
    } else {
      // Draw a small circle for each point in the polygon
      for (let i = 0; i < polygonPoints.length; i++) {
        context.beginPath();
        context.arc(
          polygonPoints[i][0],
          polygonPoints[i][1],
          5,
          0,
          2 * Math.PI
        );
        context.stroke();
        context.closePath();
      }
    }
  });
};

init();