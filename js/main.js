/* global $, TagCloud, kursor */
$(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var nav = $('#main-nav');
  var menu = $('.nav-menu');
  var menuButton = $('.responsive');
  var progressBar = $('#myBar');
  var navLinks = $('.nav-menu a[href^="#"]');
  var sections = $('main section[id], header[id]');
  var scrollTicking = false;

  function closeMenu() {
    menu.removeClass('menu-open');
    menuButton.attr('aria-expanded', 'false');
  }

  menuButton.on('click', function () {
    var isOpen = menu.toggleClass('menu-open').hasClass('menu-open');
    menuButton.attr('aria-expanded', String(isOpen));
  });

  $('.smoothScroll').on('click', function (event) {
    var target = $(this.hash);
    if (!target.length) return;

    event.preventDefault();
    closeMenu();
    var navOffset = window.scrollY > 80 ? 78 : 0;
    var top = Math.max(0, target.offset().top - navOffset);
    window.scrollTo({ top: top, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  function updateOnScroll() {
    var scrollTop = window.scrollY;
    var scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollRange > 0 ? (scrollTop / scrollRange) * 100 : 0;

    nav.toggleClass('nav-visible', scrollTop > 80);
    progressBar.css('width', Math.min(100, progress) + '%');

    if (!reducedMotion) {
      var theta = scrollTop / 300 % Math.PI;
      $('.leftgear').css('transform', 'rotate(' + theta + 'rad)');
      $('.rightgear').css('transform', 'rotate(' + -theta + 'rad)');
    }

    var currentSection = 'home';
    var marker = scrollTop + Math.min(window.innerHeight * 0.35, 260);
    sections.each(function () {
      if (this.offsetTop <= marker) currentSection = this.id;
    });
    navLinks.removeClass('active');
    navLinks.filter('[href="#' + currentSection + '"]').addClass('active');
    scrollTicking = false;
  }

  $(window).on('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateOnScroll);
      scrollTicking = true;
    }
  });

  $(window).on('resize', function () {
    if (window.innerWidth > 1100) closeMenu();
    updateOnScroll();
  });

  updateOnScroll();

  if ($.fn.typed && $('.typed').length) {
    $('.typed').typed({
      strings: ['CSE Student', 'Full-Stack Developer', 'AI/ML Enthusiast'],
      typeSpeed: 70,
      backSpeed: 35,
      backDelay: 1600,
      loop: true
    });
  }

  var skills = [
    'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'SQL',
    'React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js',
    'FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'PostgreSQL', 'MongoDB',
    'Supabase', 'Redis', 'TensorFlow', 'PyTorch', 'Generative AI', 'Gemini API',
    'AWS', 'Docker', 'Git', 'Kafka', 'Airflow', 'Unity', 'AR/VR', 'DSA'
  ];
  var tagCloudInstance;
  var sphereRadius = 0;
  var resizeTimer;

  function initSkillSphere() {
    var sphere = document.querySelector('.Sphere');
    if (!sphere || typeof TagCloud === 'undefined') return;

    var radius = window.innerWidth <= 340 ? 125 : window.innerWidth <= 480 ? 140 : window.innerWidth <= 767 ? 165 : 215;
    if (radius === sphereRadius) return;
    sphereRadius = radius;

    if (tagCloudInstance && typeof tagCloudInstance.destroy === 'function') {
      tagCloudInstance.destroy();
    }
    sphere.innerHTML = '';
    tagCloudInstance = TagCloud('.Sphere', skills, {
      radius: radius,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      direction: 135,
      keep: true
    });
  }

  initSkillSphere();
  $(window).on('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(initSkillSphere, 200);
  });

  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
    revealElements.forEach(function (element) { revealObserver.observe(element); });
  } else {
    revealElements.forEach(function (element) { element.classList.add('is-visible'); });
  }

  if (finePointer && !reducedMotion) {
    $('[data-tilt]').each(function () {
      var element = this;
      var isProject = element.classList.contains('project-showcase');
      var maxRotation = isProject ? 1.6 : 4;

      element.addEventListener('mousemove', function (event) {
        var rect = element.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--rotate-x', (-y * maxRotation) + 'deg');
        element.style.setProperty('--rotate-y', (x * maxRotation) + 'deg');
      });
      element.addEventListener('mouseleave', function () {
        element.style.setProperty('--rotate-x', '0deg');
        element.style.setProperty('--rotate-y', '0deg');
      });
    });

    if (typeof kursor !== 'undefined') {
      new kursor({ type: 1, removeDefaultCursor: true });
    }
  }

  var socialContainer = $('.social-media-container');
  var floatingButton = $('.floating-button');

  function closeSocialPanel() {
    socialContainer.removeClass('visible');
    floatingButton.attr('aria-expanded', 'false');
  }

  floatingButton.on('click', function () {
    var isOpen = socialContainer.toggleClass('visible').hasClass('visible');
    floatingButton.attr('aria-expanded', String(isOpen));
  });
  $('.close-button').on('click', closeSocialPanel);
  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      closeSocialPanel();
      closeMenu();
    }
  });

  $('#current-year').text(new Date().getFullYear());
});
