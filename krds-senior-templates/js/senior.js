/* =====================================================================
   senior.js — 고령층 보조 기능 (의존성 없음, KRDS krds.js 뒤에 로드)
   - 화면크기 선택값 저장/복원 (KRDS krds_adjustContentScale 재사용)
   - 고대비 모드 토글 + 저장/복원 (<html data-krds-mode="high-contrast">)
   ===================================================================== */
(function () {
  "use strict";

  var KEY_SCALE = "snr-scale";
  var KEY_MODE = "snr-mode";
  var HC = "high-contrast";
  var html = document.documentElement;

  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch (e) { /* 저장 불가 환경은 무시 */ }
  }

  /* URL 파라미터로 강제 지정 가능 (QA·딥링크용): ?snr-mode=high-contrast&snr-scale=lg
     저장소가 막힌 환경(file:// iframe 등)에서도 동작하도록 저장을 거치지 않고 바로 적용한다 */
  var params = /[?&]snr-(mode|scale)=/.test(window.location.search)
    ? new URLSearchParams(window.location.search) : null;
  var initialMode = params && params.has("snr-mode")
    ? (params.get("snr-mode") === HC ? HC : null) : load(KEY_MODE);
  var initialScale = params && params.has("snr-scale")
    ? (params.get("snr-scale") === "md" ? null : params.get("snr-scale")) : load(KEY_SCALE);
  if (params) { save(KEY_MODE, initialMode); save(KEY_SCALE, initialScale); }

  /* 고대비: 화면 깜빡임 방지를 위해 DOM 파싱 전 즉시 적용 */
  if (initialMode === HC) html.setAttribute("data-krds-mode", HC);

  function isHighContrast() {
    return html.getAttribute("data-krds-mode") === HC;
  }
  function syncContrastButtons() {
    var on = isHighContrast();
    var buttons = document.querySelectorAll("[data-snr-contrast]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", on ? "true" : "false");
      var label = buttons[i].querySelector("[data-snr-contrast-label]");
      if (label) label.textContent = on ? "고대비 끄기" : "고대비 켜기";
    }
  }
  function toggleContrast() {
    if (isHighContrast()) {
      html.removeAttribute("data-krds-mode");
      save(KEY_MODE, null);
    } else {
      html.setAttribute("data-krds-mode", HC);
      save(KEY_MODE, HC);
    }
    syncContrastButtons();
  }

  /* 화면크기: 활성 표시 + 저장. 실제 확대는 KRDS가 처리 */
  function markActive(button) {
    var menu = button.closest(".drop-menu");
    if (!menu) return;
    var items = menu.querySelectorAll(".item-link");
    var scale = button.getAttribute("data-adjust-scale");
    for (var i = 0; i < items.length; i++) {
      var active = items[i].getAttribute("data-adjust-scale") === scale;
      items[i].classList.toggle("active", active);
      items[i].setAttribute("aria-selected", active ? "true" : "false");
      var sr = items[i].querySelector(".sr-only");
      if (sr) sr.textContent = active ? "선택됨" : "";
    }
  }

  /* KRDS는 window 에 DOMContentLoaded 를 건다. document 에 걸면 KRDS 보다 먼저 실행되어
     화면크기 복원 click() 이 바인딩 전에 발생하므로 반드시 window 에 등록한다 */
  window.addEventListener("DOMContentLoaded", function () {
    /* 고대비 버튼 */
    var contrastButtons = document.querySelectorAll("[data-snr-contrast]");
    for (var i = 0; i < contrastButtons.length; i++) {
      contrastButtons[i].addEventListener("click", toggleContrast);
    }
    syncContrastButtons();

    /* 하단 바 전체메뉴: KRDS는 [aria-controls=mobile-nav] 첫 요소(헤더 버튼)에만 바인딩하므로 대신 눌러 준다 */
    var headerMenuButton = document.querySelector('#krds-header [aria-controls="mobile-nav"]');
    var openMenuButtons = document.querySelectorAll("[data-snr-open-menu]");
    for (var k = 0; k < openMenuButtons.length; k++) {
      openMenuButtons[k].addEventListener("click", function () {
        if (headerMenuButton) headerMenuButton.click();
      });
    }

    /* 메뉴 닫기: KRDS 는 #close-nav 하나에만 닫기를 바인딩하고, 바깥(어두운 영역) 터치는 닫지 않는다.
       하단 큰 닫기 버튼과 바깥 터치 모두 #close-nav 를 대신 누른다 */
    var closeNav = document.getElementById("close-nav");
    var closeMenuButtons = document.querySelectorAll("[data-snr-close-menu]");
    for (var m = 0; m < closeMenuButtons.length; m++) {
      closeMenuButtons[m].addEventListener("click", function () {
        if (closeNav) closeNav.click();
      });
    }
    var mobileNav = document.getElementById("mobile-nav");
    if (mobileNav && closeNav) {
      mobileNav.addEventListener("click", function (event) {
        if (!event.target.closest(".gnb-wrap")) closeNav.click();
      });
    }

    /* 화면크기 버튼 */
    var scaleButtons = document.querySelectorAll("[data-adjust] [data-adjust-scale]");
    for (var j = 0; j < scaleButtons.length; j++) {
      scaleButtons[j].addEventListener("click", function () {
        var scale = this.getAttribute("data-adjust-scale");
        markActive(this);
        save(KEY_SCALE, scale === "md" ? null : scale);
      });
    }

    /* 저장된 화면크기 복원: KRDS 리스너가 먼저 등록되어 있으므로 click()으로 재생 */
    if (initialScale && initialScale !== "md") {
      var target = document.querySelector('[data-adjust] .drop-list [data-adjust-scale="' + initialScale + '"]');
      if (target) target.click();
    }
  });
})();
