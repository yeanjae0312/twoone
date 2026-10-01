/* =====================================================================
   standalone.js — 비(非)KRDS 자립형 템플릿 동작
   의존성 없음. <head> 에서 defer 없이 불러 첫 화면이 그려지기 전에
   저장된 글자크기·고대비를 적용한다(깜빡임 방지).

   하는 일
   1. 글자크기 3단계 (루트 글꼴 크기 20 / 25 / 30px)
   2. 고대비 켜고 끄기
   3. 모바일 전체메뉴 열고 닫기 (Esc, 바깥 누르기, 포커스 가두기)
   ===================================================================== */
(function () {
  "use strict";

  var KEY_SIZE = "ui-text-size";
  var KEY_CONTRAST = "ui-contrast";
  var SIZES = ["md", "lg", "xlg"];
  var html = document.documentElement;

  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch (e) { /* 저장이 막힌 환경은 그냥 넘어간다 */ }
  }

  /* --- 초기 상태: URL 파라미터가 저장값보다 우선한다 (QA·딥링크용) --- */
  var params = /[?&]ui-(size|contrast)=/.test(window.location.search)
    ? new URLSearchParams(window.location.search) : null;

  var size = params && params.has("ui-size") ? params.get("ui-size") : read(KEY_SIZE);
  if (SIZES.indexOf(size) < 0) size = "md";

  var contrast = params && params.has("ui-contrast")
    ? (params.get("ui-contrast") === "on" ? "on" : null)
    : (read(KEY_CONTRAST) === "on" ? "on" : null);

  if (params) { write(KEY_SIZE, size === "md" ? null : size); write(KEY_CONTRAST, contrast); }

  function applySize(value) {
    size = value;
    if (value === "md") html.removeAttribute("data-text-size");
    else html.setAttribute("data-text-size", value);
  }
  function applyContrast(on) {
    contrast = on ? "on" : null;
    if (on) html.setAttribute("data-contrast", "on");
    else html.removeAttribute("data-contrast");
  }

  applySize(size);
  applyContrast(contrast === "on");

  /* --- 화면이 준비되면 버튼을 연결한다 --- */
  document.addEventListener("DOMContentLoaded", function () {
    var sizeButtons = document.querySelectorAll("[data-size-set]");
    var contrastButtons = document.querySelectorAll("[data-contrast-toggle]");

    function syncSizeButtons() {
      for (var i = 0; i < sizeButtons.length; i++) {
        sizeButtons[i].setAttribute("aria-pressed", sizeButtons[i].getAttribute("data-size-set") === size ? "true" : "false");
      }
    }
    function syncContrastButtons() {
      var on = contrast === "on";
      for (var i = 0; i < contrastButtons.length; i++) {
        contrastButtons[i].setAttribute("aria-pressed", on ? "true" : "false");
        var label = contrastButtons[i].querySelector("[data-contrast-label]");
        if (label) label.textContent = on ? "고대비 끄기" : "고대비 켜기";
      }
    }

    for (var i = 0; i < sizeButtons.length; i++) {
      sizeButtons[i].addEventListener("click", function () {
        applySize(this.getAttribute("data-size-set"));
        write(KEY_SIZE, size === "md" ? null : size);
        syncSizeButtons();
      });
    }
    for (var j = 0; j < contrastButtons.length; j++) {
      contrastButtons[j].addEventListener("click", function () {
        applyContrast(contrast !== "on");
        write(KEY_CONTRAST, contrast);
        syncContrastButtons();
      });
    }
    syncSizeButtons();
    syncContrastButtons();

    /* --- 모바일 전체메뉴 --- */
    var panel = document.getElementById("menu-panel");
    if (!panel) return;

    var lastFocused = null;
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function openMenu() {
      lastFocused = document.activeElement;
      panel.setAttribute("data-open", "true");
      document.body.setAttribute("data-menu-open", "true");
      var first = panel.querySelector(FOCUSABLE);
      if (first) first.focus();
    }
    function closeMenu() {
      panel.removeAttribute("data-open");
      document.body.removeAttribute("data-menu-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function isOpen() { return panel.getAttribute("data-open") === "true"; }

    var openers = document.querySelectorAll("[data-menu-open-btn]");
    for (var k = 0; k < openers.length; k++) openers[k].addEventListener("click", openMenu);

    var closers = panel.querySelectorAll("[data-menu-close-btn]");
    for (var m = 0; m < closers.length; m++) closers[m].addEventListener("click", closeMenu);

    /* 메뉴 안의 링크를 고르면 닫는다 */
    var links = panel.querySelectorAll(".menu-list a");
    for (var n = 0; n < links.length; n++) links[n].addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;
      if (event.key === "Escape") { closeMenu(); return; }
      if (event.key !== "Tab") return;

      /* 포커스를 메뉴 안에 가둔다 */
      var items = panel.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
})();
