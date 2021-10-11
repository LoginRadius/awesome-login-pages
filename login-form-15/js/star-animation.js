var fps = 60,
  interval = 1000 / fps,
  lastTime = (new Date()).getTime(),
  currentTime = 0,
  delta = 0;

var starsCount = 500,
  starsMinSpeed = 0.01,
  starsMaxSpeed = 0.5,
  starsSpeed = starsMinSpeed,
  stars = [];


(function() {
  "use strict";

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  function init() {
    window.onresize();
    window.requestAnimationFrame(render);
  }

  window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillStyle = "white";
    context.strokeStyle = "white";
    context.translate(canvas.width / 2, canvas.height / 2);
  };


  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = this.random(-canvas.width / 2, canvas.width / 2);
      this.y = this.random(-canvas.height / 2, canvas.height / 2);
      this.z = 0;
      this.origX = this.x;
      this.origY = this.y;
    }

    random(min, max) {
      return min + Math.random() * (max - min);
    }

    update() {
      this.origX = this.x;
      this.origY = this.y;
      this.z += starsSpeed;
      this.x += this.x * this.z * starsSpeed;
      this.y += this.y * this.z * starsSpeed;
    }

    draw() {
      context.lineWidth = this.z;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.origX, this.origY);
      context.stroke();
    }
  }

  function update() {
    for (var i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.update();

      if (
        star.x - star.z > canvas.width / 2 ||
        star.x + star.z < -canvas.width / 2 ||
        star.y - star.z > canvas.height / 2 ||
        star.y + star.z < -canvas.height / 2
      ) {
        star.reset();
      }
    }

    if (stars.length < starsCount)
      stars.push(new Star());
  }

  function draw() {
    for (var i = 0; i < stars.length; i++) {
      stars[i].draw();
    }
  }

  function clear() {
    context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  }

  function render() {
    currentTime = (new Date()).getTime();
    delta = currentTime - lastTime;

    if (delta > interval) {

      update();

      clear();
      draw();

      lastTime = currentTime - (delta % interval);
    }

    window.requestAnimationFrame(() => {
      render();
    });
  }

  init();

})();