function Scene($el) {
  var self = this;

  this.$scene = $el;
  this.contents = [];

  $(document).on('keypress', function(e) {
    switch (e.keyCode) {
      case 122: //Up
        self.contents.forEach(function(content) {
          content.translateY -= 10;
          content.translateScale();
        });
        break;
      case 115: //Down
        self.contents.forEach(function(content) {
          content.translateY += 10;
          content.translateScale();
        });
        break;
      case 113: //left
        self.contents.forEach(function(content) {
          content.translateX -= 10;
          content.translateScale();
        });
        break;
      case 100: //Right
        self.contents.forEach(function(content) {
          content.translateX += 10;
          content.translateScale();
        });
        break;
    }
  });
}


function SceneContent($el) {
  var mouseDownStarted = [];
  var self = this;
  var pageX = $el.width();
  var pageY = $el.height();

  this.$content = $el;
  this.rotateX = 0;
  this.rotateY = 0;
  this.scale = 1;
  this.translateX = 0;
  this.translateY = 0;

  this.$content.on('mousedown', function( event ) {
    event.stopPropagation();

    mouseDownStarted = [event.pageX - self.translateX, event.pageY - self.translateY];
  });

  this.$content.on('mousemove', function(event) {
    event.stopPropagation();

    if (event.buttons == 1) {
      event.preventDefault();

      self.translateX = event.pageX - mouseDownStarted[0];
      self.translateY = event.pageY - mouseDownStarted[1];
    }

    if (self.$content.hasClass('rotation')) {
      var mouseX = event.pageY;
      var mouseY = event.pageX;

      self.rotateY = -(pageY / 2 - mouseY) / pageY * 240;
      self.rotateX = (pageX/2 - mouseX) / pageX * 240;
      self.rotate();
    }
  });

  this.$content.on('mousewheel', function( event ) {
    var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;

    self.scale += n;
  });

  this.$content.on('mousemove mousewheel', function() {
    self.translateScale();
  });

  this.$content.on('click', '.actions .rotate', function(e) {
    e.stopPropagation();

    self.$content.addClass('rotation');
  });

  this.$content.on('click', function() {
    if ($(this).hasClass('rotation')) {
      $(this).removeClass('rotation');
    }
  });
}

SceneContent.prototype.translateScale = function() {
  this.$content.css('transform', 'translate(' + this.translateX + 'px, ' + this.translateY + 'px) scale(' + this.scale + ')')
}

SceneContent.prototype.rotate = function() {
  this.$content.find('.object').css('transform', 'rotateY(' + this.rotateY + 'deg) rotateX(' + this.rotateX + 'deg)');
}

$(document).ready(function() {
  $('.scene').each(function() {
    var scene = new Scene($(this));

    $(this).find('.scene-content').each(function() {
      scene.contents.push(new SceneContent($(this)));
    });
  });
});
