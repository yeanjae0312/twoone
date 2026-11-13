// 시안용 임시 코스 데이터. 실제 코스가 정해지면 이 객체만 바꾸면 된다.
// elev[i] = (i+1)km 지점의 해발(m). base = 출발 지점 해발.
const COURSES = {
  50: {
    name: '50K', base: 420, start: '05:00', finish: '17:00',
    elev: [470, 540, 640, 760, 850, 900, 860, 790, 720, 690, 740, 830, 950, 1080, 1200, 1290, 1330, 1280, 1190, 1100, 1040, 1010, 1070, 1180, 1300, 1410, 1500, 1560, 1520, 1430, 1330, 1240, 1180, 1150, 1210, 1300, 1370, 1340, 1250, 1140, 1030, 940, 880, 910, 960, 900, 790, 660, 540, 440],
    cps: [{ km: 11, name: 'CP1', cut: '07:30' }, { km: 22, name: 'CP2', cut: '10:00' }, { km: 33, name: 'CP3', cut: '13:00' }, { km: 42, name: 'CP4', cut: '15:30' }],
  },
  25: {
    name: '25K', base: 420, start: '06:30', finish: '13:30',
    elev: [480, 570, 680, 800, 900, 960, 930, 850, 760, 700, 750, 840, 940, 1020, 1060, 1010, 920, 830, 760, 720, 760, 800, 740, 610, 450],
    cps: [{ km: 8, name: 'CP1', cut: '08:30' }, { km: 17, name: 'CP2', cut: '11:00' }],
  },
  10: {
    name: '10K', base: 420, start: '08:00', finish: '11:00',
    elev: [470, 540, 620, 690, 730, 700, 640, 570, 500, 440],
    cps: [{ km: 5, name: 'CP1', cut: '09:30' }],
  },
};
const LOW = 300, HIGH = 1600; // 코스 비교에 쓰는 세 코스 공통 세로 축척
const VW = 1000, VH = 400;    // 선을 그리는 좌표계

const fmt = (n) => n.toLocaleString('ko-KR');
const ratio = (m, high = HIGH) => (m - LOW) / (high - LOW);
const pct = (m, high = HIGH) => (ratio(m, high) * 100).toFixed(2) + '%';
const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const elapsed = (from, to) => {
  const d = mins(to) - mins(from);
  return `${Math.floor(d / 60)}시간${d % 60 ? ` ${d % 60}분` : ''}`;
};
const gain = (c) => c.elev.reduce((s, e, i) => s + Math.max(0, e - (i ? c.elev[i - 1] : c.base)), 0);
const peak = (c) => Math.max(...c.elev);
const limit = (c) => elapsed(c.start, c.finish);
const cpAt = (c, km) => c.cps.find((p) => p.km === km);
const elevAt = (c, km) => (km ? c.elev[km - 1] : c.base);

// 출발점과 km 지점들을 지나는 매끄러운 선 (Catmull-Rom → 3차 베지어)
function linePath(c, high) {
  const n = c.elev.length;
  const P = [c.base, ...c.elev].map((e, i) => [i / n * VW, VH - ratio(e, high) * VH]);
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
const svg = (inner) => `<svg viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="none" focusable="false">${inner}</svg>`;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const chart = $('#chart');
const plot = $('[data-plot]');
const ruler = $('[data-ruler]');
const readout = $('#readout');
let course = COURSES[50];
let key = '50';
let km = 1;

function renderChart() {
  const n = course.elev.length;
  const top = peak(course); // 히어로는 코스 자체 최고점이 그림 높이 100%
  const topKm = course.elev.indexOf(top) + 1;

  let grids = '';
  for (let m = 500; m < top; m += 500) grids += `<div class="grid" style="--b:${pct(m, top)}"><span>${fmt(m)} m</span></div>`;

  const pin = (k, text, cls = '') =>
    `<span class="pin ${cls}" style="--x:${k / n * 100}%;--b:${pct(elevAt(course, k), top)};--t:${k / n}"><i>${text}</i></span>`;
  let pins = pin(0, `START <span class="t">${course.start}</span>`);
  course.cps.forEach((p) => {
    if (p.km !== topKm) pins += pin(p.km, `${p.name} <span class="t">${p.cut}</span>`);
  });
  const topCp = cpAt(course, topKm);
  pins += pin(topKm, topCp ? `${topCp.name} <span class="t">${topCp.cut} · ${fmt(top)} m</span>` : `최고 <span class="t">${fmt(top)} m</span>`, 'peak');
  pins += pin(n, `FINISH <span class="t">${course.finish}</span>`, 'end');

  plot.innerHTML = grids + svg(`<path d="${linePath(course, top)}"/>`) + pins + '<span class="cursor"></span>';

  const step = n > 30 ? 10 : n > 12 ? 5 : 2;
  let marks = '<span style="left:0">0<span class="u"> km</span></span>';
  for (let k = step; k < n; k += step) marks += `<span style="left:${k / n * 100}%">${k}</span>`;
  marks += `<span class="end" style="left:100%">${n}<span class="u"> km</span></span>`;
  ruler.innerHTML = marks;

  chart.setAttribute('aria-valuemax', n);
  select(topKm);
}

function select(k) {
  const n = course.elev.length;
  km = Math.min(n, Math.max(1, k));
  const e = course.elev[km - 1];
  const grade = Math.round((e - elevAt(course, km - 1)) / 10);
  const next = course.cps.find((p) => p.km >= km);
  const nextText = next ? `${next.name} ${next.cut}` : `결승 ${course.finish}`;
  const cur = $('.cursor', plot);
  cur.style.setProperty('--x', km / n * 100 + '%');
  cur.style.setProperty('--b', pct(e, peak(course)));
  readout.innerHTML =
    `<span><b>${km}</b> km 지점</span><span>해발 <b>${fmt(e)}</b> m</span>` +
    `<span>직전 1km 경사 <b>${grade > 0 ? '+' : ''}${grade}</b> %</span><span>다음 컷오프 <b>${nextText}</b></span>`;
  placeReadout();
  chart.setAttribute('aria-valuenow', km);
  chart.setAttribute('aria-valuetext', `${km}km 지점, 해발 ${fmt(e)}미터, 직전 1km 경사 ${grade}퍼센트, 다음 컷오프 ${nextText}`);
}

// 읽기 줄을 선택한 지점 위로 옮긴다 (좌우 여백 안에서)
function placeReadout() {
  const box = readout.parentElement.getBoundingClientRect();
  const g = parseFloat(getComputedStyle(readout).marginLeft);
  const w = readout.offsetWidth;
  const want = box.width * km / course.elev.length - w / 2 - g;
  const max = Math.max(0, box.width - w - 2 * g);
  readout.style.setProperty('--shift', Math.round(Math.min(max, Math.max(0, want))) + 'px');
}

function renderFacts() {
  $('[data-facts]').innerHTML =
    `거리 <b>${course.elev.length}</b>km · 누적 고도 <b>+${fmt(gain(course))}</b>m<br>` +
    `제한 <b>${limit(course)}</b> · <b>${course.start}</b> 출발`;
  $$('[data-apply-label]').forEach((el) => { el.innerHTML = `<b class="n">${course.name}</b> 참가 신청`; });
}

function renderTable() {
  const rows = [
    { name: '출발', km: 0, e: course.base, t: course.start },
    ...course.cps.map((p) => ({ name: p.name, km: p.km, e: course.elev[p.km - 1], t: p.cut })),
    { name: '결승', km: course.elev.length, e: course.elev.at(-1), t: course.finish },
  ];
  $('[data-table]').innerHTML = rows.map((r) =>
    `<tr><th scope="row"${/^CP/.test(r.name) ? ' class="n"' : ''}>${r.name}</th><td class="num">${r.km} km</td><td class="num">${fmt(r.e)} m</td>` +
    `<td class="num cut">${r.t}</td><td class="num">${r.km ? elapsed(course.start, r.t) : '-'}</td></tr>`).join('');
}

function renderCompare() {
  const longest = Math.max(...Object.values(COURSES).map((c) => c.elev.length));
  let scale = '<span style="left:0">0<span class="u"> km</span></span>';
  for (let k = 10; k < longest; k += 10) scale += `<span style="left:${k / longest * 100}%">${k}</span>`;
  scale += `<span class="end" style="left:100%">${longest}<span class="u"> km</span></span>`;
  $('[data-compare]').innerHTML = `<li class="scale" aria-hidden="true"><div class="scale-ruler">${scale}</div></li>` + Object.entries(COURSES).reverse().map(([k, c]) =>
    `<li id="course-${k}"><h3>${c.name}</h3>` +
    `<div class="mini" style="--ref:${pct(1000)};--len:${c.elev.length / longest * 100}%" role="img" aria-label="${c.name} 고도. 최고 해발 ${fmt(peak(c))}미터">` +
    svg(`<path d="${linePath(c, HIGH)}"/>`) + `</div>` +
    `<div><p><b>누적 고도 +${fmt(gain(c))}m</b> · 최고 해발 ${fmt(peak(c))}m<br>` +
    `제한 ${limit(c)} · ${c.start} 출발 · 체크포인트 ${c.cps.length}곳</p>` +
    `<a href="#apply" data-pick="${k}"><b class="n">${c.name}</b>로 신청하기</a></div></li>`).join('');
}

// 진행 띠: 첫 화면을 지나면 위에 붙고, 페이지를 내린 만큼 선을 따라 달린다
const trail = $('#trail');
const trailLine = $('[data-trail]');
const still = matchMedia('(prefers-reduced-motion: reduce)');
let trailPath = null;
function renderTrail() {
  const d = linePath(course, peak(course));
  trailLine.innerHTML = svg(`<path class="rest" d="${d}"/>`) + `<div class="trail-done">${svg(`<path class="done" d="${d}"/>`)}</div>` + '<span class="trail-dot"></span>';
  trailPath = $('.rest', trailLine);
  $('[data-trail-n]').textContent = course.elev.length;
  runTrail();
}
function runTrail() {
  const n = course.elev.length;
  const start = $('.hero').offsetHeight - trail.offsetHeight;
  const end = document.documentElement.scrollHeight - innerHeight;
  trail.dataset.on = String(scrollY >= start - 1);
  // 움직임 줄이기 설정에서는 띠만 고정하고 위치 이동은 하지 않는다
  const p = still.matches ? 1 : end > start ? Math.min(1, Math.max(0, (scrollY - start) / (end - start))) : 0;
  const pt = trailPath.getPointAtLength(trailPath.getTotalLength() * p);
  trailLine.style.setProperty('--x', pt.x / VW * 100 + '%');
  trailLine.style.setProperty('--yy', pt.y / VH * 100 + '%');
  const dot = $('.trail-dot', trailLine);
  dot.hidden = still.matches;
  $('[data-trail-km]').textContent = Math.round(pt.x / VW * n);
}
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; runTrail(); });
}, { passive: true });

function setCourse(k) {
  key = String(k);
  course = COURSES[key];
  $$('.picker button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.course === key)));
  renderChart();
  renderTrail();
  renderFacts();
  renderTable();
}

document.addEventListener('click', (ev) => {
  // 아직 없는 페이지로 가는 링크는 제자리에 머문다
  if (ev.target.closest('a[href="#"]')) ev.preventDefault();
  const b = ev.target.closest('.picker button');
  if (b && b.dataset.course !== key) setCourse(b.dataset.course);
  const p = ev.target.closest('[data-pick]');
  if (p && p.dataset.pick !== key) setCourse(p.dataset.pick);
});

const fromX = (x) => {
  const r = plot.getBoundingClientRect();
  return Math.round((x - r.left) / r.width * course.elev.length);
};
chart.addEventListener('pointermove', (ev) => select(fromX(ev.clientX)));
chart.addEventListener('pointerdown', (ev) => select(fromX(ev.clientX)));
chart.addEventListener('keydown', (ev) => {
  const n = course.elev.length;
  const to = { ArrowRight: km + 1, ArrowUp: km + 1, ArrowLeft: km - 1, ArrowDown: km - 1, Home: 1, End: n, PageUp: km + 5, PageDown: km - 5 }[ev.key];
  if (to === undefined) return;
  ev.preventDefault();
  select(to);
});

addEventListener('resize', () => { placeReadout(); runTrail(); });
document.fonts?.ready.then(placeReadout);

const toggle = $('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = $('#nav-links').classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

renderCompare();
const asked = new URLSearchParams(location.search).get('course');
setCourse(COURSES[asked] ? asked : 50);
