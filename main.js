var rotate = 100;
var pageX = $(document).width();
var pageY = $(document).height();

function applyCssTransform($el, rX, rY, scale) {
  $el.css('-webkit-transform', 'rotateY(' + rY + 'deg) rotateX(' + rX + 'deg) scale(' + scale + ')');
}

function initSceneView() {
  $('.scene').each(function() {
    var $scene = $(this);
    var mouseX = 0;
    var mouseY = 0;
    var rotateX = 0;
    var rotateY = 0;
    var scale = 1

    $scene.find('.scene-content').css({
      'position': 'relative',
      'perspective': '1000px',
      'perspective-origin': 'center center',
      '-webkit-transform-style': 'preserve-3d'
    });

    $scene.bind('mousemove', function( event ) {
      mouseX = event.pageY;
      mouseY = event.pageX;
      rotateY = -(pageY / 2 - mouseY) / pageY * rotate;
      rotateX = (pageX/2 - mouseX) / pageX * rotate;
     });

    $scene.bind('mousewheel', function( event ) {
      var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;
      scale = scale + n;
    });

    $scene.bind('mousemove mousewheel', function() {
      var $content = $(this).find('.scene-content');

      applyCssTransform($content, rotateX, rotateY, scale);
    });
  });
}

$(document).ready(function() {
  initSceneView();
});
