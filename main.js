function applyCssTransform($el, rX, rY, tX, tY, scale) {
  $el.css('transform', 'translate(' + tX + 'px, ' + tY + 'px) scale(' + scale + ')');
  $el.find('.page').css('transform', 'rotateY(' + rY + 'deg) rotateX(' + rX + 'deg)');
}

function initSceneView() {
  $('.scene').each(function() {
    var $scene = $(this);
    var $content = $(this).find('.scene-content');
    var rotateX = 0;
    var rotateY = 0;
    var translateX = 0;
    var translateY = 0;
    var scale = 1
    var mouseDownStarted = [[0, 0], [0, 0]];

    $scene.on('mousedown', function( event ) {
      mouseDownStarted[0] = [event.pageX - translateX, event.pageY - translateY];
    });

    $scene.on('mousemove', function( event ) {
      if (event.buttons == 1) {
        event.preventDefault();
        translateX = event.pageX - mouseDownStarted[0][0];
        translateY = event.pageY - mouseDownStarted[0][1];
      }
    });

    $scene.on('mousewheel', function( event ) {
      var n = (event.originalEvent.wheelDelta /120 > 0) ? .1 : -.1;
      scale = scale + n;
    });

    $scene.on('mousemove mousewheel', function() {
      applyCssTransform($content, rotateX, rotateY, translateX, translateY, scale);
    });

    $content.on('mousedown', function( event ) {
      event.stopPropagation();

      mouseDownStarted[1] = [event.pageX, event.pageY];
    });

    $content.on('mousemove', function(event) {
      event.stopPropagation();

      if (event.buttons == 1) {
        event.preventDefault();
        rotateY = (event.pageX - mouseDownStarted[1][0]) / 2;
        rotateX = (event.pageY - mouseDownStarted[1][1]) / 2;
      }

      applyCssTransform($(this), rotateX, rotateY, translateX, translateY, scale);
    });
  });
}

$(document).ready(function() {
  initSceneView();
});
