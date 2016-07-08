function Scene($el) {
  var mouseDownStarted = [];
  var self = this;

  this.$scene = $el;
  this.translateX = 0;
  this.translateY = 0;
  this.scale = 1;

  this.$scene.on('mousedown', function( event ) {
    mouseDownStarted = [event.pageX - self.translateX, event.pageY - self.translateY];
  });

  this.$scene.on('mousemove', function( event ) {
    if (event.buttons == 1) {
      event.preventDefault();

      self.translateX = event.pageX - mouseDownStarted[0];
      self.translateY = event.pageY - mouseDownStarted[1];
    }
  });

  this.$scene.on('mousewheel', function( event ) {
    var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;

    self.scale += n;
  });

  this.$scene.on('mousemove mousewheel', function() {
    self.translateScale();
  });
}

Scene.prototype.translateScale = function() {
  this.$scene.find('.scene-content').css('transform', 'translate(' + this.translateX + 'px, ' + this.translateY + 'px) scale(' + this.scale + ')')
}

function SceneContent($el) {
  var mouseDownStarted = [];
  var self = this;

  this.$content = $el;
  this.rotateX = 0;
  this.rotateY = 0;

  this.$content.on('mousedown', function( event ) {
    event.stopPropagation();

    mouseDownStarted = [event.pageX, event.pageY];
  });

  this.$content.on('mousemove', function(event) {
    event.stopPropagation();

    if (event.buttons == 1) {
      event.preventDefault();

      self.rotateY = (event.pageX - mouseDownStarted[0]) / 2;
      self.rotateX = (event.pageY - mouseDownStarted[1]) / 2;

      self.rotate();
    }
  });
}

SceneContent.prototype.rotate = function() {
  this.$content.find('.page').css('transform', 'rotateY(' + this.rotateY + 'deg) rotateX(' + this.rotateX + 'deg)');
}

$(document).ready(function() {
  $('.scene').each(function() {
    new Scene($(this));
  });

  $('.scene-content').each(function() {
    new SceneContent($(this));
  });
});
