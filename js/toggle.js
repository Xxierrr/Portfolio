$(function () {
  'use strict';

  var body = document.body;
  var input = document.getElementById('switch');
  if (!input) return;

  var savedTheme = null;
  try {
    savedTheme = window.localStorage.getItem('portfolio-theme');
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === 'light') {
    body.classList.remove('night');
    input.checked = false;
  } else {
    body.classList.add('night');
    input.checked = true;
  }

  input.addEventListener('change', function () {
    var isNight = input.checked;
    body.classList.toggle('night', isNight);
    try {
      window.localStorage.setItem('portfolio-theme', isNight ? 'dark' : 'light');
    } catch (error) {
      // The theme still works when storage is unavailable.
    }
  });
});
