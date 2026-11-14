// 참가 신청: 세 단계를 한 번에 하나씩 보여 준다.
// 1 코스 선택 → 2 참가자·기념품 정보 → 3 결제와 신청 완료.
// 스크립트가 없으면 세 단계가 모두 펼쳐진 채로 보인다.
(function () {
  var form = document.getElementById('reg-form');
  if (!form) return;
  var q = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var steps = q('.step', form);
  var marks = q('[data-wiz]');
  var course = form.querySelector('input[name="course"]');
  var pkgs = q('.pkg', form);
  var current = 1;

  function set(k, v) { q('[data-sum="' + k + '"]').forEach(function (el) { el.textContent = v; }); }

  function show(n, focus) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
    marks.forEach(function (m) {
      var k = Number(m.dataset.wiz);
      if (k === n) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current');
      if (k < n) m.dataset.state = 'done'; else delete m.dataset.state;
    });
    if (focus) {
      var h = steps[n - 1].querySelector('.step__title');
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (h) h.focus({ preventScroll: true });
    }
  }

  function pick(value) {
    var card = pkgs.filter(function (p) { return p.dataset.pkg === value; })[0];
    if (!card) return false;
    course.value = value;
    pkgs.forEach(function (p) { p.toggleAttribute('data-picked', p === card); });
    set('dist', value + 'K');
    set('start', card.dataset.start);
    set('limit', card.dataset.limit);
    set('line', card.dataset.start + ' 출발 · 제한 ' + card.dataset.limit);
    return true;
  }

  // 1단계: 카드의 버튼을 누르면 그 코스로 다음 단계로 간다
  q('[data-pick]', form).forEach(function (b) { b.addEventListener('click', function () { if (pick(b.dataset.pick)) show(2, true); }); });
  q('[data-go]', form).forEach(function (b) { b.addEventListener('click', function () { show(Number(b.dataset.go), true); }); });

  // 2단계 검사: 다음으로 넘어갈 때만 확인하고, 틀린 칸 바로 아래에 이유를 적는다
  function mark(el, errId, bad, acc) {
    if (el.type !== 'radio' && el.type !== 'checkbox') el.setAttribute('aria-invalid', bad ? 'true' : 'false');
    var e = document.getElementById(errId); if (e) e.hidden = !bad;
    if (bad) { acc.count += 1; acc.first = acc.first || el; }
  }
  function jump(acc, status) {
    status.textContent = '고칠 곳이 ' + acc.count + '군데 있습니다.';
    acc.first.focus({ preventScroll: true });
    (acc.first.closest('.field, .agree') || acc.first).scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  var stepStatus = form.querySelector('[data-step-status]');
  form.querySelector('[data-next]').addEventListener('click', function () {
    var acc = { count: 0, first: null };
    q('.fields input:not([type="radio"])', steps[1]).forEach(function (el) { mark(el, el.getAttribute('aria-describedby'), !el.checkValidity(), acc); });
    [['sex', 'r-sex-err'], ['size', 'r-size-err']].forEach(function (p) {
      var group = q('input[name="' + p[0] + '"]', form);
      mark(group[0], p[1], !group.some(function (r) { return r.checked; }), acc);
    });
    if (acc.first) { jump(acc, stepStatus); return; }
    stepStatus.textContent = '';
    set('name', form.querySelector('#r-name').value.trim());
    set('size', form.querySelector('input[name="size"]:checked').value);
    show(3, true);
  });

  // 3단계: 전체 동의와 결제
  var all = document.getElementById('agree-all');
  var boxes = q('[data-agree]', form);
  all.addEventListener('change', function () { boxes.forEach(function (b) { b.checked = all.checked; }); });
  boxes.forEach(function (b) { b.addEventListener('change', function () { all.checked = boxes.every(function (x) { return x.checked; }); }); });
  var status = form.querySelector('[data-reg-status]');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (current !== 3) return;
    var acc = { count: 0, first: null };
    var need = boxes.filter(function (b) { return b.required; });
    var missing = need.filter(function (b) { return !b.checked; });
    mark(missing[0] || need[0], 'r-agree-err', missing.length > 0, acc);
    if (acc.first) { jump(acc, status); return; }
    status.textContent = '입력은 모두 확인했습니다. 시안 화면이라 실제 결제로는 넘어가지 않습니다.';
  });

  // "50K 신청하기" 같은 링크로 들어오면 그 코스를 고른 채 2단계에서 시작한다
  var want = new URLSearchParams(location.search).get('course');
  if (want && pick(want)) show(2, false); else show(1, false);

  // 대회 안내 페이지의 목차 표시는 main.js 가 맡는다
})();
