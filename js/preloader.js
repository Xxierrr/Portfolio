document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var counterElement = document.querySelector('.counter');
  var loader = document.querySelector('.loader');
  var preloader = document.querySelector('.preloader');
  if (!counterElement || !loader || !preloader) return;

  var count = 0;
  var counter = window.setInterval(function () {
    if (count <= 100) {
      counterElement.textContent = count + '%';
      loader.style.width = count + '%';
      count += 2;
      return;
    }

    window.clearInterval(counter);
    preloader.style.transition = 'opacity 0.45s ease';
    preloader.style.opacity = '0';
    document.body.classList.remove('body-height');
    window.setTimeout(function () {
      preloader.style.display = 'none';
    }, 450);
  }, 50);
});
