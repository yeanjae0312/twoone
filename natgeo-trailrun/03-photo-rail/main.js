// 03 시안의 동작: 테마 전환, 휴대전화 메뉴 펼침, 영상 일시정지, 사진 띠 멈춤.
// 모듈이 아닌 일반 스크립트라서 파일을 더블클릭해 열어도(file://) 그대로 동작한다.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var root = document.documentElement;

  // 테마: 기본은 밝은 테마. 오른쪽 아래 버튼으로 바꾸면 브라우저에 기억해 다른 페이지에서도 이어진다.
  var themeBtn = document.querySelector('[data-theme-toggle]');
  function setTheme(theme, save) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#000000' : '#ffffff';
    if (themeBtn) themeBtn.setAttribute('aria-label', theme === 'dark' ? '밝은 테마로 바꾸기' : '어두운 테마로 바꾸기');
    if (save) { try { localStorage.setItem('trailrun3-theme', theme); } catch (e) {} }
  }
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
  if (themeBtn) themeBtn.addEventListener('click', function () { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true); });

  // 휴대전화: 이름 옆 화살표로 링크 목록을 펼친다
  var nav = document.getElementById('nav');
  var more = nav && nav.querySelector('.nav__more');
  if (more) {
    var setMenu = function (open) {
      nav.toggleAttribute('data-open', open);
      more.setAttribute('aria-expanded', String(open));
      more.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    };
    more.addEventListener('click', function () { setMenu(!nav.hasAttribute('data-open')); });
    nav.querySelector('.nav__links').addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.hasAttribute('data-open')) { setMenu(false); more.focus(); } });
    document.addEventListener('click', function (e) { if (nav.hasAttribute('data-open') && !nav.contains(e.target)) setMenu(false); });
    window.matchMedia('(min-width: 640px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  // 버튼 하나로 켜고 끄는 것들: 눌린 상태(aria-pressed)가 "멈춤"이다
  function wire(btn, labels, apply) {
    function set(paused) {
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? labels[1] : labels[0]);
      apply(paused);
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-pressed') !== 'true'); });
    return set;
  }

  // 영상: 자동 재생. 움직임 줄이기 설정이면 멈춘 채 시작하고, 화면 밖에서는 쉰다.
  var film = document.querySelector('[data-film]');
  if (film) {
    var video = film.querySelector('video');
    var userPaused = false;
    var setFilm = wire(film.querySelector('[data-film-toggle]'), ['영상 일시정지', '영상 재생'], function (paused) {
      userPaused = paused;
      if (paused) video.pause(); else video.play().catch(function () {});
    });
    if (reduce.matches) setFilm(true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (userPaused) return;
        if (entries[0].isIntersecting) video.play().catch(function () {}); else video.pause();
      }, { threshold: 0.1 }).observe(film);
    }
  }

  // 사진 띠
  var rail = document.querySelector('[data-rail]');
  var railBtn = document.querySelector('[data-rail-toggle]');
  if (rail && railBtn) {
    var setRail = wire(railBtn, ['사진 흐름 멈추기', '사진 흐름 다시 시작'], function (paused) { rail.toggleAttribute('data-paused', paused); });
    if (reduce.matches) { setRail(true); railBtn.hidden = true; }
    // 터치 화면: 띠를 누르고 있는 동안은 멈춘다
    rail.addEventListener('touchstart', function () { rail.setAttribute('data-paused', ''); }, { passive: true });
    rail.addEventListener('touchend', function () { if (railBtn.getAttribute('aria-pressed') !== 'true') rail.removeAttribute('data-paused'); }, { passive: true });
  }
  // 대회 안내: 지금 읽는 항목을 목차에 표시한다
  var toc = document.querySelector('[data-toc]');
  if (toc && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          if (on) { a.setAttribute('aria-current', 'true'); if (toc.scrollWidth > toc.clientWidth) toc.scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' }); }
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    links.forEach(function (a) { var t = document.querySelector(a.getAttribute('href')); if (t) seen.observe(t); });
  }
})();
