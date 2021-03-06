---
---
  // Bulma navigation menu
  document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
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

    // hero image header
    var list = document.querySelectorAll('[data-header-image]')
    // console.log(list);
    for (let item of list) {
      var url = item.getAttribute('data-header-image');
      // console.log("Working!!", url)
      item.style.backgroundImage = "url('" + url + "')";
    }

    // button image
    var buttonList = document.querySelectorAll('[data-button-image]')
    // console.log(list);
    for (let item of buttonList) {
      var url = item.getAttribute('data-button-image');
      // console.log("Working!!", url)
      item.style.backgroundImage = "url('" + url + "')";
    }

    //dropdown menu
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
    });
  });
