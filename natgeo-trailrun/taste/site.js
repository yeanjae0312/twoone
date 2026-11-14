/* 파일을 더블클릭해 열었을 때(file://)만 쓰는 대비책.
   브라우저가 키트의 모듈 스크립트(assets/system.js)를 막아 햄버거 메뉴가 열리지 않으므로, 같은 동작을 여기서 붙인다.
   서버(http)로 열면 키트가 처리하므로 아무것도 하지 않는다. */
(function () {
  if (location.protocol !== 'file:') return;
  var nav = document.querySelector('.nav');
  var toggle = nav && nav.querySelector('.nav__toggle');
  if (!toggle) return;
  var bars = toggle.innerHTML;
  var cross = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = open ? cross : bars;
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
  nav.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && e.target.closest('a[href]')) setOpen(false); });
})();
