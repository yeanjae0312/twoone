// node checks/check.mjs
// 1) pages/*.html, css/*.css 가 참조하는 로컬 자산이 모두 존재하는지
// 2) 필수 접근성 마크업(lang, h1, 건너뛰기 링크)이 있는지
// 3) 자립형 페이지가 KRDS CSS/JS 를 끌어오지 않는지
// 4) vendor CSS 에 외부 절대 URL(krds.go.kr)이 남아 있지 않은지
// 5) Edge/Chrome 헤드리스로 데스크톱·모바일·고대비·확대 스크린샷 생성 (checks/out/)
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
const fail = (msg) => { failures++; console.error("FAIL " + msg); };
const ok = (msg) => console.log("ok   " + msg);

const pagesDir = join(root, "pages");
const pageFiles = readdirSync(pagesDir).filter((n) => n.endsWith(".html")).sort();

// --- 1~3. 페이지 검사 ---
const isLocal = (u) => u && !/^(https?:|data:|#|mailto:|tel:|\/\/)/.test(u);
const checkRefs = (file, refs) => {
  for (const ref of refs) {
    if (!isLocal(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!existsSync(resolve(dirname(file), clean))) fail(`${file} → ${ref} (없음)`);
  }
};

/** 페이지가 KRDS 기반인지 자립형인지 구분한다. 스크린샷 URL 파라미터가 서로 다르다.
 *  KRDS 스타일을 불러오는지로 가른다. 자립형 템플릿이 늘어나도 그대로 동작한다. */
const variantOf = (html) => (/vendor\/krds\/css\//.test(html) ? "krds" : "standalone");

const pages = [];
for (const f of pageFiles) {
  const file = join(pagesDir, f);
  const html = readFileSync(file, "utf8");
  const variant = variantOf(html);
  pages.push({ file: f, variant });

  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1])
    .filter((u) => /\.(css|js|svg|png|ico|woff2?)$/.test(u.split(/[?#]/)[0]));
  checkRefs(file, refs);

  if (!/<html lang="ko">/.test(html)) fail(`${f}: <html lang="ko"> 누락`);
  if (!/<h1[\s>]/.test(html)) fail(`${f}: h1 누락`);
  if (!/(id="krds-skip-link"|class="[^"]*\bskip-link\b)/.test(html)) fail(`${f}: 건너뛰기 링크 누락`);

  // 자립형은 KRDS CSS/JS 를 끌어오면 안 된다 (글꼴·파비콘은 허용)
  if (variant === "standalone") {
    const krdsAssets = refs.filter((u) => /vendor\/krds\/.*\.(css|js)$/.test(u));
    if (krdsAssets.length) fail(`${f}: 자립형인데 KRDS 자산 참조 ${krdsAssets.join(", ")}`);
  }

  ok(`${f} [${variant}]: 자산 ${refs.length}개 참조 확인`);
}

// --- 4. CSS 검사 ---
for (const name of readdirSync(join(root, "css")).filter((n) => n.endsWith(".css"))) {
  const file = join(root, "css", name);
  checkRefs(file, [...readFileSync(file, "utf8").matchAll(/url\("?([^)"]+)"?\)/g)].map((m) => m[1]));
  ok(`css/${name}: url() 참조 확인`);
}

const vendorCss = join(root, "vendor", "krds", "css", "component", "output.css");
const vendorText = readFileSync(vendorCss, "utf8");
if (/https?:\/\/[^)\s"']*krds\.go\.kr/.test(vendorText)) fail("vendor output.css 에 krds.go.kr 절대 URL 존재");
else ok("vendor output.css: 외부 절대 URL 없음");
checkRefs(vendorCss, [...vendorText.matchAll(/url\(["']?([^)"']+)["']?\)/g)].map((m) => m[1]).slice(0, 400));
ok("vendor output.css: url() 참조 확인");

// --- 5. 헤드리스 스크린샷 ---
const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find(existsSync);

/** 템플릿마다 확대·고대비를 켜는 URL 파라미터가 다르다 */
const QUERY = {
  krds: { base: "?snr-scale=md", xlg: "?snr-scale=xlg", hc: "?snr-mode=high-contrast&snr-scale=md" },
  standalone: { base: "?ui-size=md", xlg: "?ui-size=xlg", hc: "?ui-contrast=on&ui-size=md" },
};

// 헤드리스 최소 창 폭이 약 492px 이라 모바일(360)은 iframe 래퍼로 감싸서 찍는다.
const SHOTS = [
  { suffix: "1280", w: 1280, h: 2400, key: "base" },
  { suffix: "1280-hc", w: 1280, h: 2400, key: "hc" },
  { suffix: "360", w: 360, h: 3600, key: "base", frame: true },
  { suffix: "360-xlg", w: 360, h: 6400, key: "xlg", frame: true },
  { suffix: "360-hc", w: 360, h: 3600, key: "hc", frame: true },
];

if (!browser) {
  console.warn("warn 헤드리스 브라우저 없음. 스크린샷 생략");
} else {
  const outDir = join(root, "checks", "out");
  mkdirSync(outDir, { recursive: true });
  let n = 0;

  for (const page of pages) {
    const pageUrl = pathToFileURL(join(pagesDir, page.file)).href;
    const stem = page.file.replace(".html", "");

    for (const s of SHOTS) {
      const out = join(outDir, `${stem}-${s.suffix}.png`);
      const query = QUERY[page.variant][s.key];
      let url = pageUrl + query, w = s.w;

      if (s.frame) {
        // 래퍼가 iframe 문서의 가로 넘침을 측정해 상단에 표시한다 (스크린샷으로 확인)
        const wrapper = join(outDir, `frame-${stem}-${s.suffix}.html`);
        writeFileSync(wrapper, `<!DOCTYPE html><html><body style="margin:0;background:#888">
<div id="m" style="font:bold 20px monospace;padding:6px;background:#fff">measuring…</div>
<iframe id="f" src="${pageUrl}${query}" style="border:0;display:block" width="${s.w}" height="${s.h}"></iframe>
<script>
document.getElementById("f").addEventListener("load", function () {
  var f = this;
  setTimeout(function () {
    var d = f.contentDocument, sw = d.documentElement.scrollWidth, cw = d.documentElement.clientWidth;
    var m = document.getElementById("m");
    m.textContent = (sw > cw ? "OVERFLOW " : "OK ") + "scrollWidth=" + sw + " clientWidth=" + cw;
    m.style.background = sw > cw ? "#ffb3b3" : "#c8f7c5";
  }, 800);
});
</script></body></html>`);
        url = pathToFileURL(wrapper).href;
        w = 600;
      }

      const r = spawnSync(browser, [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
        `--user-data-dir=${join(outDir, `.profile-${n++}`)}`, "--allow-file-access-from-files",
        // 가상 시간 예산이 없으면 스타일 적용 전에 캡처되어 색이 어긋난 화면이 나온다
        "--virtual-time-budget=3000",
        `--window-size=${w},${s.h}`, `--screenshot=${out}`, url,
      ], { timeout: 60000 });

      // 런처 프로세스는 파일을 다 쓰기 전에 종료하므로 최대 30초 대기
      const deadline = Date.now() + 30000;
      while (!existsSync(out) && Date.now() < deadline) spawnSync(process.execPath, ["-e", "setTimeout(()=>{},500)"]);

      if (r.status !== 0 || !existsSync(out)) fail(`스크린샷 실패 ${out}: ${r.stderr?.toString().slice(-300)}`);
      else ok(`스크린샷 ${stem}-${s.suffix}.png`);
    }
  }
}

if (failures) { console.error(`\n${failures}건 실패`); process.exit(1); }
console.log("\n모든 검사 통과");
