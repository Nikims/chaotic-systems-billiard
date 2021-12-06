x = 200;
y = 100;
dot = 0;
preset = 1;
velX = -4;
velY = -4;
function predictFutures(futureFrames, ball, virtualpoints) {
  framesInFuture = [];
  virtualX = ball.x;
  virtualY = ball.y;
  virtualVelX = ball.velX;
  virtualVelY = ball.velY;
  for (i = 0; i < futureFrames; i++) {
    virtualmindist = 9999999999;
    virtualmindistindex = 99999;

    for (j = 0; j < virtualpoints.length; j++) {
      dist = Math.sqrt(
        Math.pow(virtualpoints[j].x - virtualX, 2) +
          Math.pow(virtualpoints[j].y - virtualY, 2)
      );
      if (dist < virtualmindist) {
        virtualmindist = dist;
        virtualmindistindex = j;
      }
    }
    if (virtualmindistindex > 1) {
      angle = Math.atan2(
        virtualpoints[virtualmindistindex].y -
          virtualpoints[virtualmindistindex - 1].y,
        virtualpoints[virtualmindistindex].x -
          virtualpoints[virtualmindistindex - 1].x
      );
    }
    virtualNormalX = -Math.sin(angle);
    virtualNormalY = Math.cos(angle);
    virtualdot = virtualVelX * virtualNormalX + virtualVelY * virtualNormalY;

    virtualX += virtualVelX;
    virtualY += virtualVelY;
    if (virtualmindistindex < 99999) {
      if (
        areColliding(
          virtualX,
          virtualY,
          20,
          20,
          virtualpoints[virtualmindistindex].x,
          virtualpoints[virtualmindistindex].y,
          5,
          5
        )
      ) {
        virtualVelX = virtualVelX - 2 * virtualdot * virtualNormalX;
        virtualVelY = virtualVelY - 2 * virtualdot * virtualNormalY;
      }
    }
    if (virtualX < 0) {
      virtualVelX = -virtualVelX;
    }
    if (virtualY < 0) {
      virtualVelY = -virtualVelY;
    }
    framesInFuture.push({ x: virtualX, y: virtualY });
    // if (i == 1) {
    //   context.fillRect(
    //     virtualpoints[virtualmindistindex].x,
    //     virtualpoints[virtualmindistindex].y,
    //     30,
    //     30
    //   );
    // }
  }
  return framesInFuture;
}
function update() {
  for (m = 0; m < 200; m++) {
    velX += 0.05;
    if (velX > 4) {
      velX = -4;
      velY += 0.05;
    }

    // for (i = 0; i < points.length; i++) {
    //   context.fillRect(points[i].x, points[i].y, 10, 10);
    // }

    futureFrames = predictFutures(
      900,
      { x: x, y: y, velX: velX, velY: velY },
      points
    );
    if (preset == 0) {
      if (futureFrames[futureFrames.length - 1].x > 200) {
        if (futureFrames[futureFrames.length - 1].y < 100) {
          context.fillStyle = "blue";
        } else {
          context.fillStyle = "green";
        }
      } else {
        if (futureFrames[futureFrames.length - 1].y < 100) {
          context.fillStyle = "yellow";
        } else {
          context.fillStyle = "pink";
        }
      }
    }
    if (preset == 1) {
      dist = Math.sqrt(
        Math.pow(futureFrames[futureFrames.length - 1].x - 200, 2) +
          Math.pow(futureFrames[futureFrames.length - 1].y - 100, 2)
      );
      context.fillStyle = `rgb(${dist},${dist},${dist})`;
    }
    context.fillRect((velX + 5) * 100 - 100, (velY + 5) * 100 - 100, 5, 5);
  }
}
points = [];
for (i = -200; i < 300; i += 5) {
  points.push({ x: i + 200, y: (-i * i * i) / 100000 + 250 });
  //points.push({ x: i + 200, y: Math.sin(i) + 250 });
  // points.push({ x: i + 200, y: Math.sin(i) * 40 + 250 });
}
function draw() {}

function keyup(key) {
  console.log(mouseX, mouseY);
}
