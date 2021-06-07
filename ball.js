class Ball
 {
  constructor(x, y, width, height)
   {
    var options =
     {
      restitution: 1,
    };
    this.body = Bodies.rectangle(x, y, 50, 50, options);
    this.image = loadImage("ballon.png");
    this.width = width;
    this.height = height;
    World.add(world, this.body);
  }

  display()
   {
    var angle = this.body.angle;

    push();

    noStroke();
    ellipseMode(RADIUS);
    fill("pink");
    ellipse(
      this.body.position.x,
      this.body.position.y,
      this.width,
      this.height
    );
    pop();
  }
}
