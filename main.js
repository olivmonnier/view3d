var rotate = 100;
var pageX = $(document).width();
var pageY = $(document).height();
var mouseX = 0;
var mouseY = 0;
var scale = 1

function applyCssTransform($el) {
  $el.css('-webkit-transform', 'rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg) scale(' + scale + ')');
}

$(document).ready(function() {
  $('.scene-content').css({
    'position': 'relative',
    'perspective': '1000px',
    'perspective-origin': 'center center',
    '-webkit-transform-style': 'preserve-3d'
  });
});

$('.scene').bind('mousemove', function( event ) {
  mouseX = event.pageY;
  mouseY = event.pageX;
  rotateY = -(pageY / 2 - mouseY) / pageY * rotate;
  rotateX = (pageX/2 - mouseX) / pageX * rotate;
 });

$('.scene').bind('mousewheel', function( event ) {
  var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;
  scale = scale + n;
});

$('.scene').bind('mousemove mousewheel', function() {
  var $content = $(this).find('.scene-content');

  applyCssTransform($content);
});
