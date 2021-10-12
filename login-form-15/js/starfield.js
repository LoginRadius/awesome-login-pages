;
(function($, window, document, undefined) {
  var Starfield = function(el, options) {
    this.el = el;
    this.$el = $(el);
    this.options = options;

    that = this;
  };

  var isPlaying;
  var isInited = false;
  var canCanvas = false;
  var animId;

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());

  Starfield.prototype = {
    defaults: {
      starColor: "rgba(255,255,255,1)",
      bgColor: "rgba(0,0,0,1)",
      mouseMove: true,
      mouseColor: "rgba(0,0,0,0.2)",
      mouseSpeed: 20,
      fps: 15,
      speed: 3,
      quantity: 512,
      ratio: 256,
      divclass: "starfield"
    },

    resizer: function() {
      var oldStar = this.star;
      var initW = this.context.canvas.width;
      var initH = this.context.canvas.height;
      this.w = this.$el.width();
      this.h = this.$el.height();
      this.x = Math.round(this.w / 2);
      this.y = Math.round(this.h / 2);
      this.portrait = this.w < this.h;
      var ratX = this.w / initW;
      var ratY = this.h / initH;

      this.context.canvas.width = this.w;
      this.context.canvas.height = this.h;

      for (var i = 0; i < this.n; i++) {
        this.star[i][0] = oldStar[i][0] * ratX;
        this.star[i][1] = oldStar[i][1] * ratY;

        this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
        this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
      }

      that.context.fillStyle = that.settings.bgColor;
      this.context.strokeStyle = this.settings.starColor;
    },

    init: function() {
      this.settings = $.extend({}, this.defaults, this.options);
      var url = document.location.href;
      this.n = parseInt(
        (url.indexOf('n=') != -1) ? url.substring(url.indexOf('n=') + 2, (
            (url.substring(
              url.indexOf('n=') + 2,
              url.length)).indexOf('&') != -1) ? url.indexOf('n=') + 2 + (url.substring(
            url.indexOf('n=') + 2,
            url.length)).indexOf('&') :
          url.length) :
        this.settings.quantity
      );

      this.flag = true;
      this.test = true;
      this.w = 0;
      this.h = 0;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.star_color_ratio = 0;
      this.star_x_save = 0;
      this.star_y_save = 0;
      this.star_ratio = this.settings.ratio;
      this.star_speed = this.settings.speed;
      this.star_speed_save = 0;
      this.star = new Array(this.n);
      this.color = this.settings.starColor;
      this.opacity = 0.1;

      this.cursor_x = 0;
      this.cursor_y = 0;
      this.mouse_x = 0;
      this.mouse_y = 0;

      this.canvas_x = 0;
      this.canvas_y = 0;
      this.canvas_w = 0;
      this.canvas_h = 0;

      this.fps = this.settings.fps;
      this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
      this.orientationSupport = window.DeviceOrientationEvent !== undefined;
      this.portrait = null;
      var canvasInit = function() {
        that.w = that.$el.width();
        that.h = that.$el.height();

        that.initW = that.w;
        that.initH = that.h;

        that.portrait = that.w < that.h;

        that.wrapper = $('<canvas />')
          .addClass(that.settings.divclass);

        that.wrapper.appendTo(that.el);

        that.starz = $('canvas', that.el);

        if (that.starz[0].getContext) {
          that.context = that.starz[0].getContext('2d');
          canCanvas = true;
        }

        that.context.canvas.width = that.w;
        that.context.canvas.height = that.h;
      }
      canvasInit();
      var starInit = function() {
        if (canCanvas) {
          that.x = Math.round(that.w / 2);
          that.y = Math.round(that.h / 2);
          that.z = (that.w + that.h) / 2;
          that.star_color_ratio = 1 / that.z;
          that.cursor_x = that.x;
          that.cursor_y = that.y;
          for (var i = 0; i < that.n; i++) {
            that.star[i] = new Array(5);

            that.star[i][0] = Math.random() * that.w * 2 - that.x * 2;
            that.star[i][1] = Math.random() * that.h * 2 - that.y * 2;
            that.star[i][2] = Math.round(Math.random() * that.z);
            that.star[i][3] = 0;
            that.star[i][4] = 0;
          }

          that.context.fillStyle = that.settings.bgColor;
          that.context.strokeStyle = that.settings.starColor;
        } else {
          return;
        }
      }
      starInit();

      isInited = true;
    },
    anim: function() {

      this.mouse_x = this.cursor_x - this.x;
      this.mouse_y = this.cursor_y - this.y;
      this.context.fillRect(0, 0, this.w, this.h);

      for (var i = 0; i < this.n; i++) {
        this.test = true;
        this.star_x_save = this.star[i][3];
        this.star_y_save = this.star[i][4];
        this.star[i][0] += this.mouse_x >> 4;
        if (this.star[i][0] > this.x << 1) {
          this.star[i][0] -= this.w << 1;
          this.test = false;
        }
        if (this.star[i][0] < -this.x << 1) {
          this.star[i][0] += this.w << 1;
          this.test = false;
        }
        this.star[i][1] += this.mouse_y >> 4;
        if (this.star[i][1] > this.y << 1) {
          this.star[i][1] -= this.h << 1;
          this.test = false;
        }
        if (this.star[i][1] < -this.y << 1) {
          this.star[i][1] += this.h << 1;
          this.test = false;
        }
        this.star[i][2] -= this.star_speed;
        if (this.star[i][2] > this.z) {
          this.star[i][2] -= this.z;
          this.test = false;
        }
        if (this.star[i][2] < 0) {
          this.star[i][2] += this.z;
          this.test = false;
        }

        this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
        this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;

        if (this.star_x_save > 0 &&
          this.star_x_save < this.w &&
          this.star_y_save > 0 &&
          this.star_y_save < this.h &&
          this.test) {
          this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 2;
          this.context.beginPath();
          this.context.moveTo(this.star_x_save, this.star_y_save);
          this.context.lineTo(this.star[i][3], this.star[i][4]);
          this.context.stroke();
          this.context.closePath();
        }
      }

    },

    loop: function() {
      this.anim();

      animId = window.requestAnimationFrame(function() {
        that.loop()
      });
    },

    move: function() {
      var doc = document.documentElement;

      if (this.orientationSupport && !this.desktop) {
        window.addEventListener('deviceorientation', handleOrientation, false);
      } else {
        window.addEventListener('mousemove', handleMousemove, false);
      }

      function handleOrientation(event) {
        if (event.beta !== null && event.gamma !== null) {
          var x = event.gamma,
            y = event.beta;

          if (!that.portrait) {
            x = event.beta * -1;
            y = event.gamma;
          }

          that.cursor_x = (that.w / 2) + (x * 5);
          that.cursor_y = (that.h / 2) + (y * 5);
        }
      }

      function handleMousemove(event) {
        that.cursor_x = event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
        that.cursor_y = event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
      }
    },

    stop: function() {
      window.cancelAnimationFrame(animId);

      isPlaying = false;
    },

    start: function() {
      if (!isInited) {
        isInited = true;
        this.init();
      }

      if (!isPlaying) {
        isPlaying = true;
        this.loop();
      }

      window.addEventListener('resize', function() {
        that.resizer()
      }, false);

      window.addEventListener('orientationchange', function() {
        that.resizer()
      }, false);

      if (this.settings.mouseMove) {
        this.move();
      }

      return this;
    }
  }

  Starfield.defaults = Starfield.prototype.defaults;
  $.fn.starfield = function(options) {
    return this.each(function() {
      new Starfield(this, options).start();
    });
  }
  window.Starfield = Starfield;
})(jQuery, window, document);

$('.starfield').starfield();