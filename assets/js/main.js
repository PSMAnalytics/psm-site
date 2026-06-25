/* PSM Sports Analytics — FootballOS landing interactions */
(function () {
  'use strict';

  /* ---------- Year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1200, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Build the mock heatmap (gold→wine intensity grid) ---------- */
  var heat = document.getElementById('heatGrid');
  if (heat) {
    // 5 cols x 6 rows; weighted to look like a CM territory (central, slightly attacking)
    var weights = [
      0.10, 0.18, 0.28, 0.18, 0.10,
      0.18, 0.40, 0.62, 0.40, 0.18,
      0.30, 0.66, 0.95, 0.66, 0.30,
      0.34, 0.72, 0.88, 0.70, 0.32,
      0.22, 0.48, 0.66, 0.46, 0.22,
      0.12, 0.24, 0.34, 0.24, 0.12
    ];
    weights.forEach(function (w) {
      var cell = document.createElement('span');
      // interpolate transparent → wine → gold by intensity
      var bg;
      if (w < 0.4) {
        bg = 'rgba(123,27,56,' + (0.12 + w * 0.9).toFixed(2) + ')';
      } else if (w < 0.75) {
        bg = 'rgba(154,37,72,' + (0.45 + w * 0.4).toFixed(2) + ')';
      } else {
        bg = 'rgba(219,192,120,' + (0.55 + (w - 0.75) * 1.6).toFixed(2) + ')';
      }
      cell.style.background = bg;
      heat.appendChild(cell);
    });
  }
})();
