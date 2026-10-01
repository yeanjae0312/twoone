/* =====================================================================
   immersive.js — 몰입형 자립 템플릿 동작
   의존성 없음. <head> 에서 defer 없이 불러 첫 화면이 그려지기 전에
   저장된 글자 크기·고대비를 적용한다(깜빡임 방지).

   하는 일
   1. 글자 크기 3단계 (루트 글꼴 크기 20 / 25 / 30px)
   2. 고대비 켜고 끄기
   3. 전체메뉴 열고 닫기 (Esc, 포커스 가두기)

   구획이 떠오르는 움직임은 여기서 다루지 않는다. immersive.css 가 CSS 만으로 처리한다.
   스크립트로 미리 감추면, 어쩌다 되살리지 못했을 때 내용이 영영 안 보이기 때문이다.

   저장 열쇠는 standalone.js 와 같다. 두 자립 템플릿 사이에 설정이 이어진다.
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

  /* --- 초기 상태: URL 파라미터가 저장값보다 우선한다 (점검·딥링크용) --- */
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


  document.addEventListener("DOMContentLoaded", function () {
    /* --- 글자 크기 --- */
    var sizeButtons = document.querySelectorAll("[data-size-set]");
    var contrastButtons = document.querySelectorAll("[data-contrast-toggle]");

    function syncSizes() {
      for (var i = 0; i < sizeButtons.length; i++) {
        sizeButtons[i].setAttribute("aria-pressed", sizeButtons[i].getAttribute("data-size-set") === size ? "true" : "false");
      }
    }
    function syncContrast() {
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
        syncSizes();
      });
    }
    for (var j = 0; j < contrastButtons.length; j++) {
      contrastButtons[j].addEventListener("click", function () {
        applyContrast(contrast !== "on");
        write(KEY_CONTRAST, contrast);
        syncContrast();
      });
    }
    syncSizes();
    syncContrast();

    /* --- 전체메뉴 --- */
    var sheet = document.getElementById("sheet");
    if (!sheet) return;

    var lastFocused = null;
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function openSheet() {
      lastFocused = document.activeElement;
      sheet.setAttribute("data-open", "true");
      document.body.setAttribute("data-sheet-open", "true");
      var first = sheet.querySelector(FOCUSABLE);
      if (first) first.focus();
    }
    function closeSheet() {
      sheet.removeAttribute("data-open");
      document.body.removeAttribute("data-sheet-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function isOpen() { return sheet.getAttribute("data-open") === "true"; }

    var openers = document.querySelectorAll("[data-sheet-open-btn]");
    for (var n = 0; n < openers.length; n++) openers[n].addEventListener("click", openSheet);

    var closers = sheet.querySelectorAll("[data-sheet-close-btn]");
    for (var p = 0; p < closers.length; p++) closers[p].addEventListener("click", closeSheet);

    /* 메뉴 안의 링크를 고르면 닫는다 */
    var links = sheet.querySelectorAll(".sheet-nav a");
    for (var q = 0; q < links.length; q++) links[q].addEventListener("click", closeSheet);

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;
      if (event.key === "Escape") { closeSheet(); return; }
      if (event.key !== "Tab") return;

      /* 포커스를 메뉴 안에 가둔다 */
      var items = sheet.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
})();
