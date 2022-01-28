# Bird

Make the Bird (flappy bird) game where a bird flaps to stay in the air and navigate between pipes.

## 1. Checkout the template code

The initial code creates a canvas and a drawing function. The drawing function paints the canvas blue with the following code:

```
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

function draw() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, world.w, world.h);

    requestAnimationFrame(draw);
}

draw();
```

## 1. Draw the bird and it's world

Let's start with some contants that define the world and the bird outside of the draw function:

```
const world = {
    w: cvs.width,
    h: cvs.height,
    gravity: 1.5,
    ground: 394,

    pipeHeight: 200,
    pipeWidth: 52,
    pipeGap: 120,
};

const bird = {
    x: 10,
    y: 150,
    w: 35,
    h: 35,
    flap: 25,
};
```

Now lets draw the ground and the bird on the canvas in the draw function:

```
    ctx.fillStyle = "tan";
    ctx.fillRect(0, world.ground, cvs.width, cvs.height - world.ground);

    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
```

Load the html page and see the bird hovering over the ground

## 2. Add gravity

The bird should naturally fall. Let's change its position with gravity and then check to see if it died:

```
    bird.y = bird.y + world.gravity;
    const birdBottom = bird.y + bird.h;
    if (birdBottom >= world.ground) {
        location.reload();
    }
```

We reload the page if it dies... to try again.

Reload the html page to see the birds fate!

## 3. Flap bird, Flap!

To flap, we'll listen for key presses. To do this add a keyboard listener outside of draw function:

```
document.addEventListener("keydown", flap);
function flap() {
    bird.y -= bird.flap;
}
```

Now reload the html page. You should be able to keep the bird afloat.

## 4. Here come the pipes

We'll keep track of the pipes outside the draw function in this pipe list with one pipe to start.:

```
const pipes = [{ x: world.w, h: world.pipeHeight }];
```

Inside the draw function we'll iterate of the array of pipes and draw them:

```
    pipes.forEach(function (pipe) {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, world.pipeWidth, pipe.h);
        ctx.fillRect(
            pipe.x,
            pipe.h + world.pipeGap,
            world.pipeWidth,
            world.ground - pipe.h - world.pipeGap,
        );
    });
```

We need to move the pipes on each draw method, so inside the pipes for loop add this code, which moves the pipes and adds a new one if a pipe moves to the left 125 pixels:

```
        pipe.x = pipe.x - 1;
        if (pipe.x == 125) {
            pipes.push({
                x: world.w,
                h: Math.floor(Math.random() * world.pipeHeight),
            });
        }
```

Reload the html page a see your bird flying through the pipes.

## 5. Pipes are hard

When the bird hits the pipes it should be dead. So we need to check if that has happened. The following code, inside the pipes for loop will check if the bird has hit this pipe and will start over by reloading the page:

```
        const birdRight = bird.x + bird.w;
        const pipeRight = pipe.x + bird.w;
        const inPipeHorizontal = birdRight >= pipe.x && bird.x <= pipeRight;
        const inPipeVertical = bird.y < pipe.h || birdBottom > pipe.h + world.pipeGap;
        if (inPipeHorizontal && inPipeVertical) {
            location.reload(); // reload the page
        }
```

Reload the page and try to avoid those pipes.

## 6. Count your score

We need to count those pips and show a score. Track a score variable outside of the draw function:

```
let score = 0;
```

When a pipe goes far to the left lets count it as a score inside the pipe for loop:

```
        if (pipe.x === 5) {
            score++;
        }
```

Finally display the score in the draw function:

```
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, world.height - 20);
```

Now reload the page and try for a high score!

## Congratulations!
