// Bulma navigation menu
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  });


// Start of broken text functions
  var tmax_optionsGlobal = {
    repeat: -1,
    repeatDelay: 0.65,
    yoyo: true
  };
  
  CSSPlugin.useSVGTransformAttr = true;
  
  var tl = new TimelineMax(tmax_optionsGlobal),
      path = 'svg *',
      stagger_val = 0.0125,
      duration = 0.75;
  
  $.each($(path), function(i, el) {
    tl.set($(this), {
      x: '+=' + getRandom(-500, 500),
      y: '+=' + getRandom(-500, 500),
      rotation: '+=' + getRandom(-720, 720),
      scale: 0,
      opacity: 0
    });
  });
  
  var stagger_opts_to = {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
    ease: Power4.easeInOut
  };
  
  tl.staggerTo(path, duration, stagger_opts_to, stagger_val);
  
  var $svg = $('svg');
  $svg.hover(
    function() {
      tl.timeScale(0.15);
    },
    function() {
      tl.timeScale(1);
    });
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
// End of broken text functions