/* ==========================================================
   Bhumika Arora · Portfolio
   Theme toggle, typing, mouse effects, flip cards, gallery,
   lightbox, counters and the contact form.
   ========================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = $('#themeToggle');
  function setTheme(mode, persist) {
    root.setAttribute('data-theme', mode);
    themeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#0f1a2b' : '#dcecfb');
    if (persist) { try { localStorage.setItem('theme', mode); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') || 'light', false);
  themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Mobile menu ---------- */
  var burger = $('#burger');
  var links = $('#navLinks');
  function closeMenu() {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) {
    if (!links.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });

  /* ---------- Typing animation ---------- */
  var typedEl = $('#typed');
  var phrases = [
    'CSE student specialising in AI & ML',
    'Lead Software Dev Intern',
    'debater & public speaker',
    'writer working on her first book',
    'student leader & storyteller'
  ];
  if (reduceMotion) {
    typedEl.textContent = phrases[0];
  } else {
    var pi = 0, ci = 0, deleting = false;
    (function tick() {
      var full = phrases[pi];
      ci += deleting ? -1 : 1;
      typedEl.textContent = full.slice(0, ci);
      var delay = deleting ? 32 : 70;
      if (!deleting && ci === full.length) { deleting = true; delay = 1600; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Scroll: progress bar, to-top, active nav ---------- */
  var progress = $('#progress');
  var toTop = $('#toTop');
  var ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  var navAnchors = $$('.nav-links a');
  var sections = navAnchors.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Reveal on scroll (with small stagger) + counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion || target <= 1) { el.textContent = target; return; }
    var start = performance.now(), dur = 1400;
    (function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }
  var revealEls = $$('.reveal');
  revealEls.forEach(function (el) {
    var siblings = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
    var idx = siblings.indexOf(el);
    if (idx > 0) el.style.setProperty('--d', Math.min(idx * 0.07, 0.35) + 's');
  });
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); revObs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revObs.observe(el); });

    var cntObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cntObs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$('.count').forEach(function (el) { cntObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
    $$('.count').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Mouse effects (fine pointers only) ---------- */
  if (canHover && !reduceMotion) {
    // Soft light-blue glow that trails the cursor
    var glow = $('#cursorGlow');
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY; glow.classList.add('on');
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.classList.remove('on'); });
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      requestAnimationFrame(loop);
    })();

    // Hero blobs drift with the mouse
    var blobs = $$('.blob');
    var hero = $('.hero');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      blobs.forEach(function (b) {
        var d = parseFloat(b.getAttribute('data-depth')) || 20;
        b.style.transform = 'translate(' + nx * d * 2 + 'px,' + ny * d * 2 + 'px)';
      });
    });

    // 3D tilt on portrait, stats and skill cards
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (px * 9).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    // Magnetic buttons
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        var y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  // Tiny sparkles on click
  if (!reduceMotion) {
    document.addEventListener('click', function (e) {
      if (e.target.closest('input, textarea, .lightbox')) return;
      var marks = ['✦', '✧', '♡', '✶'];
      for (var i = 0; i < 6; i++) {
        var s = document.createElement('span');
        s.className = 'spark';
        s.textContent = marks[Math.floor(Math.random() * marks.length)];
        var ang = Math.random() * Math.PI * 2, dist = 26 + Math.random() * 40;
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
        document.body.appendChild(s);
        setTimeout(function (n) { return function () { n.remove(); }; }(s), 850);
      }
    });
  }

  /* ---------- Flip cards ---------- */
  function toggleFlip(card) {
    var on = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(on));
  }
  $$('.flip').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;           // let links work normally
      if (canHover) return;                         // hover already flips on desktop
      toggleFlip(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(card); }
    });
  });

  /* ---------- Gallery filter ---------- */
  var filterBtns = $$('.filter');
  var items = $$('.g-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      items.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.classList.toggle('hide', !show);
        if (show) it.classList.add('in');
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var current = 0;
  var lastFocus = null;
  function visibleItems() { return items.filter(function (it) { return !it.classList.contains('hide'); }); }
  function showAt(i) {
    var list = visibleItems();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var img = $('img', list[current]);
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lbCap.textContent = $('figcaption', list[current]).textContent;
  }
  function openLb(item) {
    lastFocus = document.activeElement;
    showAt(visibleItems().indexOf(item));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.lb-close', lb).focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (it) {
    $('.g-btn', it).addEventListener('click', function () { openLb(it); });
  });
  $('.lb-close', lb).addEventListener('click', closeLb);
  $('.lb-nav.prev', lb).addEventListener('click', function () { showAt(current - 1); });
  $('.lb-nav.next', lb).addEventListener('click', function () { showAt(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') showAt(current - 1);
    else if (e.key === 'ArrowRight') showAt(current + 1);
  });

  /* ---------- Contact form ----------
     Sends through FormSubmit (https://formsubmit.co), which forwards
     each message to the email address in the form's action URL.
     The very first submission triggers a one-time activation email. */
  var form = $('#contactForm');
  var statusEl = $('#formStatus');
  var submitBtn = $('.submit', form);
  var label = $('.btn-label', submitBtn);
  var EMAIL = 'abhumika24@gmail.com';

  function setStatus(msg, cls) { statusEl.textContent = msg; statusEl.className = 'form-status ' + (cls || ''); }
  function validate() {
    var ok = true;
    $$('.field', form).forEach(function (f) {
      var input = $('input, textarea', f);
      var valid = input.checkValidity() && input.value.trim().length > 0;
      f.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }
  $$('input, textarea', form).forEach(function (el) {
    el.addEventListener('input', function () { el.closest('.field') && el.closest('.field').classList.remove('invalid'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('', '');
    if (!validate()) { setStatus('Please fill in every field (and use a valid email).', 'err'); return; }

    var data = new FormData(form);
    if (data.get('_honey')) return; // bots fill the hidden field

    submitBtn.disabled = true;
    label.textContent = 'Sending…';

    // Sends the form the classic way (full page POST). It works everywhere,
    // including when the page is opened from a local file.
    function sendNatively() {
      setStatus('Sending…', '');
      try {
        if (/^https?:$/.test(location.protocol)) {
          var next = form.querySelector('input[name="_next"]');
          if (!next) {
            next = document.createElement('input');
            next.type = 'hidden'; next.name = '_next';
            form.appendChild(next);
          }
          next.value = location.href.split('#')[0].split('?')[0] + '?sent=1#contact';
        }
      } catch (e) {}
      form.submit();
    }

    fetch('https://formsubmit.co/ajax/' + EMAIL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(function (res) {
        return res.json().then(function (j) { return { ok: res.ok, body: j || {} }; });
      })
      .then(function (r) {
        var msg = String(r.body.message || '');
        if (r.ok && String(r.body.success) !== 'false') {
          form.reset();
          setStatus('Thank you! Your message is on its way to Bhumika ✨', 'ok');
        } else if (/activat/i.test(msg)) {
          setStatus('Almost there! FormSubmit just emailed ' + EMAIL + ' an activation link. Click it (check Spam), then send again.', 'ok');
        } else {
          throw new Error(msg || 'Request failed');
        }
      })
      .catch(function () {
        // Network/CORS problem (for example the page was opened as a local file):
        // fall back to a normal form submission.
        sendNatively();
      })
      .then(function () {
        submitBtn.disabled = false;
        label.textContent = 'Send message';
      });
  });

  // Back from the native fallback (?sent=1): show a thank-you
  try {
    if (/[?&]sent=1/.test(location.search)) {
      setStatus('Thank you! Your message is on its way to Bhumika ✨', 'ok');
      history.replaceState(null, '', location.pathname + '#contact');
    }
  } catch (e) {}

  /* ---------- Footer year ---------- */
  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
