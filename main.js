var rotate = 100;
var pageX = $(document).width();
var pageY = $(document).height();

function applyCssTransform($el, rX, rY, tX, tY, scale) {
  $el.css('transform', 'rotateY(' + rY + 'deg) rotateX(' + rX + 'deg) translate(' + tX + 'px, ' + tY + 'px) scale(' + scale + ')');
}

function initSceneView() {
  $('.scene').each(function() {
    var $scene = $(this);
    var mouseX = 0;
    var mouseY = 0;
    var rotateX = 0;
    var rotateY = 0;
    var translateX = 0;
    var translateY = 0;
    var scale = 1
    var mouseDownStarted = [];

    $scene.on('mousedown', function( event ) {
      mouseDownStarted = [event.pageX - translateX, event.pageY - translateY];
    });

    $scene.on('mouseup', function( event ) {
      $scene.bind('mousedown')
    });

    $scene.on('mousemove', function( event ) {
      if (event.buttons == 1) {
        event.preventDefault();
        translateX = event.pageX - mouseDownStarted[0];
        translateY = event.pageY - mouseDownStarted[1];
      } else {
        mouseX = event.pageY;
        mouseY = event.pageX;
        rotateY = -(pageY / 2 - mouseY) / pageY * rotate;
        rotateX = (pageX/2 - mouseX) / pageX * rotate;
      }
    });

    $scene.on('mousewheel', function( event ) {
      var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;
      scale = scale + n;
    });

    $scene.on('mousemove mousewheel', function() {
      var $content = $(this).find('.scene-content');

      applyCssTransform($content, rotateX, rotateY, translateX, translateY, scale);
    });
  });
}

$(document).ready(function() {
  initSceneView();
});
