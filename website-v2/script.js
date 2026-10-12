/* ==========================================================
   BDA – one-screen home
   Section 1: hero banner reel   Section 2: everything hub
   ========================================================== */

const SLIDES = [
  { src: "assets/hero/hero-1.jpg", w: { en: "with homes.", kn: "ಮನೆಗಳು." }, en: "BDA housing towers rising over the city's green edge", kn: "ನಗರದ ಹಸಿರು ಅಂಚಿನಲ್ಲಿ ಬಿಡಿಎ ವಸತಿ ಗೋಪುರಗಳು" },
  { src: "assets/hero/hero-2.jpg", w: { en: "block by block.", kn: "ಹಂತ ಹಂತವಾಗಿ." }, en: "New residential blocks taking shape", kn: "ಹೊಸ ವಸತಿ ಸಮುಚ್ಚಯಗಳು ರೂಪುಗೊಳ್ಳುತ್ತಿವೆ" },
  { src: "assets/hero/hero-3.jpg", w: { en: "of tomorrow.", kn: "ನಾಳೆಗಾಗಿ." }, en: "Bengaluru skyline at dusk", kn: "ಸಂಜೆಯ ಬೆಂಗಳೂರು ನಗರ ನೋಟ" },
  { src: "assets/hero/hero-4.jpg", w: { en: "around its lakes.", kn: "ಕೆರೆಗಳ ಸುತ್ತ." }, en: "Lakes and flyover corridors, planned together", kn: "ಕೆರೆಗಳು ಮತ್ತು ಮೇಲ್ಸೇತುವೆ ಕಾರಿಡಾರ್‌ಗಳು" },
  { src: "assets/hero/hero-5.jpg", w: { en: "with layouts.", kn: "ಬಡಾವಣೆಗಳು." }, en: "A planned layout, seen from above", kn: "ಮೇಲಿನಿಂದ ಕಾಣುವ ಯೋಜಿತ ಬಡಾವಣೆ" },
  { src: "assets/hero/hero-6.jpg", w: { en: "on the move.", kn: "ಸಂಚಾರ." }, en: "Keeping the city moving", kn: "ನಗರವನ್ನು ಚಲನಶೀಲವಾಗಿಡುವುದು" },
  { src: "assets/hero/hero-7.jpg", w: { en: "with green spaces.", kn: "ಉದ್ಯಾನಗಳು." }, en: "Layouts with parks and open spaces", kn: "ಉದ್ಯಾನ ಮತ್ತು ತೆರೆದ ಸ್ಥಳಗಳಿರುವ ಬಡಾವಣೆಗಳು" },
  { src: "assets/hero/hero-8.jpg", w: { en: "that grows.", kn: "ವಸತಿ." }, en: "High-rise housing for a growing city", kn: "ಬೆಳೆಯುತ್ತಿರುವ ನಗರಕ್ಕೆ ಬಹುಮಹಡಿ ವಸತಿ" },
  { src: "assets/hero/hero-9.jpg", w: { en: "with green.", kn: "ಹಸಿರು." }, en: "The green heart of the city", kn: "ನಗರದ ಹಸಿರು ಹೃದಯ" },
  { src: "assets/hero/hero-10.jpg", w: { en: "for everyone.", kn: "ಎಲ್ಲರಿಗಾಗಿ." }, en: "Homes, playgrounds and greenery", kn: "ಮನೆಗಳು, ಆಟದ ಮೈದಾನಗಳು ಮತ್ತು ಹಸಿರು" },
];

const B = "https://bdakarnataka.in";
const gp = (key, title) => `${B}/generalPage?sectionKey=${key}&title=${encodeURIComponent(title)}`;

/* All navigation links from bdakarnataka.in, grouped */
const GROUPS = [
  {
    id: "services", icon: "sparkles", tone: "blue",
    en: "Citizen services", kn: "ನಾಗರಿಕ ಸೇವೆಗಳು",
    links: [
      { en: "Online Services", kn: "ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು", href: `${B}/online-services`, icon: "globe", k: "apply application" },
      { en: "E-Auction", kn: "ಇ-ಹರಾಜು", href: `${B}/e-auction`, icon: "gavel", k: "auction bid" },
      { en: "Property Tax Payment", kn: "ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿ", href: gp("property-tax-payment", "Property Tax Payment"), icon: "wallet", k: "pay tax" },
      { en: "Property Tax Calculator", kn: "ಆಸ್ತಿ ತೆರಿಗೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್", href: `${B}/ptcalculator`, icon: "calculator", k: "tax" },
      { en: "CDRMS", kn: "ಸಿಡಿಆರ್ಎಂಎಸ್", href: `${B}/cdrms/admin/login`, icon: "database", k: "records login" },
      { en: "Ease of Doing Business", kn: "ವ್ಯವಹಾರ ಮಾಡಲು ಸುಲಭತೆ", href: gp("ease-of-doing-business", "Ease of doing Business"), icon: "rocket", k: "eodb" },
      { en: "Bengaluru Business Corridor", kn: "ಬೆಂಗಳೂರು ವ್ಯಾಪಾರ ಕಾರಿಡಾರ್", href: "https://bengalurubusinesscorridor.com/", icon: "route", k: "peripheral ring road prr", ext: true },
    ],
  },
  {
    id: "layouts", icon: "layout-grid", tone: "amber",
    en: "Layouts & sites", kn: "ಬಡಾವಣೆಗಳು ಮತ್ತು ನಿವೇಶನಗಳು",
    links: [
      { en: "BDA Layouts", kn: "ಬಿಡಿಎ ಲೇಔಟ್‌ಗಳು", href: `${B}/bda-layout`, icon: "map", k: "layout" },
      { en: "BDA Formed Layouts", kn: "ಬಿಡಿಎ ರಚಿಸಿದ ಬಡಾವಣೆಗಳು", href: gp("formed-layouts", "BDA Formed Layouts"), icon: "layers", k: "layout" },
      { en: "Formed Layouts – South Zone", kn: "ಬಿಡಿಎ ರಚಿಸಿದ ವಿನ್ಯಾಸಗಳು ದಕ್ಷಿಣ ವಲಯ", href: gp("bda-formed-layouts-south-zone", "BDA Formed Layouts South Zone"), icon: "compass", k: "layout south" },
      { en: "BDA Flats / Villas", kn: "ಬಿಡಿಎ ಫ್ಲಾಟ್‌ಗಳು/ವಿಲ್ಲಾಗಳು", href: gp("bda-flatsvillas-booking", "BDA Flats/Villas"), icon: "building-2", k: "housing apartment booking" },
      { en: "CA Sites", kn: "CA ಸೈಟ್", href: `${B}/casite`, icon: "square-dashed", k: "civic amenity site" },
      { en: "Stray Sites", kn: "ಬಿಡಿ ನಿವೇಶನೆಗಳ ವಿವರ", href: `${B}/stray-sites`, icon: "map-pinned", k: "site" },
      { en: "Jurisdiction Map", kn: "ನ್ಯಾಯವ್ಯಾಪ್ತಿಯ ನಕ್ಷೆ", href: `${B}/jurisdiction-map`, icon: "map-pin", k: "map boundary" },
    ],
  },
  {
    id: "about", icon: "landmark", tone: "violet",
    en: "About BDA", kn: "ಬಿಡಿಎ ಬಗ್ಗೆ",
    links: [
      { en: "About Us", kn: "ನಮ್ಮ ಬಗ್ಗೆ", href: `${B}/about-us`, icon: "info", k: "history" },
      { en: "Departments", kn: "ಇಲಾಖೆಗಳು", href: `${B}/section-layout`, icon: "network", k: "section office" },
      { en: "Commissioner's Corner", kn: "ಕಮಿಷನರ್ ಕಾರ್ನರ್", href: gp("commissioners-corner", "Commissioner's Corner"), icon: "user-round", k: "commissioner" },
      { en: "RTI", kn: "ಆರ್‌ಟಿಐ", href: `${B}/rti`, icon: "file-search", k: "right to information" },
      { en: "DSKL JCC Information", kn: "ಡಿ ಎಸ್ ಕೆ ಎಲ್ ಜೆಸಿಸಿ ಮಾಹಿತಿ", href: gp("dskl-jcc-information", "DSKL JCC Information"), icon: "file-text", k: "jcc" },
      { en: "Open House Invitation", kn: "ಓಪನ್ ಹೌಸ್‌ ಆಹ್ವಾನಿತರ ಪಟ್ಟಿ", href: `${B}/invitee-list`, icon: "door-open", k: "invitee list" },
      { en: "Gallery", kn: "ಗ್ಯಾಲರಿ", href: `${B}/photo-gallery`, icon: "images", k: "photo" },
      { en: "Contact Us", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", href: `${B}/contact`, icon: "phone", k: "address email" },
    ],
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let lang = "en";
try { lang = localStorage.getItem("bda-lang") || "en"; } catch (e) {}

/* ---------- Build hub groups ---------- */
function buildGroups() {
  const wrap = $("#groups");
  wrap.innerHTML = GROUPS.map((g) => `
    <div class="group g-${g.tone}" data-group="${g.id}">
      <p class="group-title"><i data-lucide="${g.icon}" aria-hidden="true"></i><span data-en="${g.en}" data-kn="${g.kn}">${g.en}</span><em>${g.links.length}</em></p>
      <ul>
        ${g.links.map((l) => `
          <li>
            <a class="hub-link" href="${l.href}" ${l.ext ? 'target="_blank" rel="noopener"' : ""} data-k="${(l.en + " " + l.k).toLowerCase()} ${l.kn}">
              <span class="ic"><i data-lucide="${l.icon}" aria-hidden="true"></i></span>
              <span class="lbl" data-en="${l.en}" data-kn="${l.kn}">${l.en}</span>
              ${l.ext ? '<i class="ext" data-lucide="arrow-up-right" aria-label="opens external site"></i>' : ""}
            </a>
          </li>`).join("")}
      </ul>
    </div>`).join("");
}

/* ---------- Main menu (built from the same link data) ---------- */
const findLink = (en) => GROUPS.flatMap((g) => g.links).find((l) => l.en === en);
const MENU = [
  { en: "Home", kn: "ಮುಖಪುಟ", href: `${B}/`, current: true },
  { en: "About BDA", kn: "ಬಿಡಿಎ ಬಗ್ಗೆ", href: `${B}/about-us` },
  { en: "Services", kn: "ಸೇವೆಗಳು", items: GROUPS[0].links },
  { en: "Layouts & Sites", kn: "ಬಡಾವಣೆಗಳು", items: GROUPS[1].links },
  { en: "Departments", kn: "ಇಲಾಖೆಗಳು", items: ["Departments", "Commissioner's Corner", "DSKL JCC Information", "Open House Invitation"].map(findLink) },
  { en: "RTI", kn: "ಆರ್‌ಟಿಐ", href: `${B}/rti` },
  { en: "Gallery", kn: "ಗ್ಯಾಲರಿ", href: `${B}/photo-gallery` },
  { en: "Contact Us", kn: "ಸಂಪರ್ಕ", href: `${B}/contact` },
];

function buildMenu() {
  const nav = $("#mainnav");
  nav.innerHTML = `<ul class="menu">${MENU.map((m, i) => m.items ? `
    <li class="has-drop">
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="drop-${i}">
        <span data-en="${m.en}" data-kn="${m.kn}">${m.en}</span><i data-lucide="chevron-down" aria-hidden="true"></i>
      </button>
      <ul class="drop" id="drop-${i}">
        ${m.items.map((l) => `<li><a href="${l.href}" ${l.ext ? 'target="_blank" rel="noopener"' : ""}>
          <span class="ic"><i data-lucide="${l.icon}" aria-hidden="true"></i></span>
          <span data-en="${l.en}" data-kn="${l.kn}">${l.en}</span></a></li>`).join("")}
      </ul>
    </li>` : `
    <li><a class="menu-link" href="${m.href}" ${m.current ? 'aria-current="page"' : ""}><span data-en="${m.en}" data-kn="${m.kn}">${m.en}</span></a></li>`).join("")}
  </ul>`;

  const closeAll = (except) => $$(".has-drop", nav).forEach((li) => {
    if (li === except) return;
    li.classList.remove("open");
    $(".menu-btn", li).setAttribute("aria-expanded", "false");
  });
  $$(".has-drop", nav).forEach((li) => {
    const btn = $(".menu-btn", li);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !li.classList.contains("open");
      closeAll(li);
      li.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) closeAll(); });
  nav.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const li = e.target.closest(".has-drop");
      closeAll();
      if (li) $(".menu-btn", li).focus();
    }
  });
}

/* ---------- Stats count-up ---------- */
function countUp() {
  $$(".count").forEach((el) => {
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    if (reduceMotion) { el.textContent = to.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (to * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ---------- Hero slideshow ---------- */
const FX = ["fx-wipe", "fx-iris", "fx-diag", "fx-blinds", "fx-fade"];
const KB = ["kb-1", "kb-2", "kb-3", "kb-4"];
const DURATION = 6500;
let current = 0, timer = null, playing = !reduceMotion;

function buildSlides() {
  const slides = $("#slides"), thumbs = $("#thumbs");
  slides.innerHTML = SLIDES.map((s, i) =>
    `<div class="slide ${KB[i % KB.length]}" data-i="${i}"><img src="${i === 0 ? s.src : ""}" data-src="${s.src}" alt="" decoding="async" /></div>`).join("");
  thumbs.innerHTML = SLIDES.map((s, i) =>
    `<button type="button" class="thumb" role="tab" aria-label="Banner ${i + 1}: ${s.en}" data-i="${i}">
       <img src="${s.src.replace("hero/hero-", "thumbs/thumb-")}" alt="" loading="lazy" />
       <span class="bar"><span></span></span>
     </button>`).join("");
  $("#slideTotal").textContent = String(SLIDES.length).padStart(2, "0");
  thumbs.addEventListener("click", (e) => { const b = e.target.closest(".thumb"); if (b) go(+b.dataset.i, true); });
  // lazy-load the rest after first paint
  window.addEventListener("load", () => $$(".slide img").forEach((img) => { if (!img.src.includes("hero")) img.src = img.dataset.src; }));
}

function go(n, user) {
  const slides = $$(".slide"), thumbs = $$(".thumb");
  const next = (n + SLIDES.length) % SLIDES.length;
  const prev = slides[current];
  const inc = slides[next];
  const img = inc.querySelector("img");
  if (!img.getAttribute("src")) img.src = img.dataset.src;

  slides.forEach((s) => s.classList.remove("is-prev"));
  if (next !== current) {
    prev.classList.remove("is-active", ...FX);
    prev.classList.add("is-prev");
  }
  inc.classList.remove(...FX);
  void inc.offsetWidth; // restart animations
  inc.classList.add("is-active", reduceMotion || next === current ? "fx-fade" : FX[next % FX.length]);
  current = next;

  thumbs.forEach((t, i) => {
    t.classList.toggle("is-active", i === next);
    t.setAttribute("aria-selected", i === next);
  });
  // keep active thumb in view inside the strip
  const at = thumbs[next], strip = $("#thumbs");
  strip.scrollTo({ left: at.offsetLeft - strip.clientWidth / 2 + at.clientWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });

  $("#slideNum").textContent = String(next + 1).padStart(2, "0");
  const cap = $("#slideCaption");
  cap.classList.remove("show"); void cap.offsetWidth;
  cap.textContent = SLIDES[next][lang];
  setWord(SLIDES[next].w[lang], true);
  cap.classList.add("show");

  if (user) restart();
  else schedule();
}

function schedule() {
  clearTimeout(timer);
  document.documentElement.style.setProperty("--dur", `${DURATION}ms`);
  $("#hero").classList.toggle("paused", !playing);
  if (playing) timer = setTimeout(() => go(current + 1), DURATION);
}
function restart() { schedule(); }

function setPlaying(p) {
  playing = p;
  const btn = $("#playBtn");
  btn.setAttribute("aria-label", p ? "Pause slideshow" : "Play slideshow");
  btn.innerHTML = `<i data-lucide="${p ? "pause" : "play"}"></i>`;
  window.lucide && lucide.createIcons();
  // restart the progress bar on the active thumb
  const t = $(".thumb.is-active"); if (t) { t.classList.remove("is-active"); void t.offsetWidth; t.classList.add("is-active"); }
  schedule();
}

/* ---------- Headline word — changes in step with each banner ---------- */
let wordTimer = null;
function setWord(text, animate) {
  const el = $("#rotWord");
  if (!el || el.textContent === text) return;
  clearTimeout(wordTimer);
  if (!animate || reduceMotion) { el.textContent = text; el.classList.remove("out"); return; }
  // slide old word out while the outgoing image is being covered, bring new word in as the new image lands
  el.classList.add("out");
  wordTimer = setTimeout(() => {
    el.textContent = text;
    el.classList.remove("out");
  }, 380);
}

/* ---------- Search across hub ---------- */
function search(q) {
  q = q.trim().toLowerCase();
  let hits = 0;
  $$(".hub-link, .spot-tile").forEach((a) => {
    const hay = (a.dataset.k || "") + " " + a.textContent.toLowerCase();
    const match = !q || hay.includes(q);
    a.classList.toggle("dim", !match);
    a.classList.toggle("hit", !!q && match);
    if (match) hits++;
  });
  $$(".group").forEach((g) => g.classList.toggle("dim", !!q && !g.querySelector(".hub-link.hit")));
  $("#noResults").hidden = hits > 0;
  updateCount(q ? hits : null);
}
function updateCount(hits) {
  const total = $$(".hub-link, .spot-tile").length;
  $("#hubCount").textContent = hits == null
    ? (lang === "kn" ? `${total} ಲಿಂಕ್‌ಗಳು` : `${total} links`)
    : (lang === "kn" ? `${hits}/${total} ಹೊಂದಾಣಿಕೆ` : `${hits} of ${total} match`);
}

/* ---------- Language ---------- */
function setLang(l) {
  lang = l;
  try { localStorage.setItem("bda-lang", l); } catch (e) {}
  document.documentElement.lang = l === "kn" ? "kn" : "en";
  document.body.classList.toggle("lang-kn", l === "kn");
  $$("[data-en]").forEach((el) => { el.textContent = el.dataset[l] || el.dataset.en; });
  const q = $("#q"); q.placeholder = q.dataset[l === "kn" ? "phKn" : "phEn"];
  const ci = $("#chatInput"); ci.placeholder = ci.dataset[l === "kn" ? "phKn" : "phEn"];
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === l));
  setWord(SLIDES[current].w[l], false);
  $("#slideCaption").textContent = SLIDES[current][l];
  search(q.value);
}

/* ---------- Init ---------- */
buildGroups();
buildMenu();
buildSlides();
window.lucide && lucide.createIcons();

$("#year").textContent = new Date().getFullYear();
$("#prevBtn").addEventListener("click", () => go(current - 1, true));
$("#nextBtn").addEventListener("click", () => go(current + 1, true));
$("#playBtn").addEventListener("click", () => setPlaying(!playing));
$$(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

const hero = $("#hero");
hero.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(current - 1, true);
  if (e.key === "ArrowRight") go(current + 1, true);
});
// swipe on touch
let sx = null;
hero.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
hero.addEventListener("touchend", (e) => {
  if (sx == null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1), true);
  sx = null;
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) clearTimeout(timer); else schedule();
});

const q = $("#q");
q.addEventListener("input", () => search(q.value));
q.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { const first = $(".hub-link.hit, .spot-tile.hit"); if (first) first.click(); }
  if (e.key === "Escape") { q.value = ""; search(""); q.blur(); }
});
document.addEventListener("keydown", (e) => {
  const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
    e.preventDefault(); q.focus(); q.select();
  }
});

// policies popover
const pBtn = $("#policyBtn"), pMenu = $("#policyMenu");
pBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = pMenu.hidden;
  pMenu.hidden = !open; pBtn.setAttribute("aria-expanded", open);
});
document.addEventListener("click", (e) => { if (!pMenu.hidden && !pMenu.contains(e.target)) { pMenu.hidden = true; pBtn.setAttribute("aria-expanded", false); } });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pMenu.hidden) { pMenu.hidden = true; pBtn.setAttribute("aria-expanded", false); pBtn.focus(); } });

// help desk: floating chat with quick links; typed text runs the page search
const chat = $("#chat"), chatPanel = $("#chatPanel"), chatFab = $("#chatFab");
function setChat(open) {
  chat.classList.toggle("open", open);
  chatPanel.hidden = !open;
  chatFab.setAttribute("aria-expanded", open);
  chatFab.setAttribute("aria-label", open ? "Close BDA help desk" : "Open BDA help desk");
  if (open) setTimeout(() => $("#chatInput").focus(), 50);
}
chatFab.addEventListener("click", () => setChat(chatPanel.hidden));
$("#chatClose").addEventListener("click", () => { setChat(false); chatFab.focus(); });
chat.addEventListener("keydown", (e) => { if (e.key === "Escape" && !chatPanel.hidden) { setChat(false); chatFab.focus(); } });
$("#chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = $("#chatInput").value.trim();
  if (!v) return;
  setChat(false);
  q.value = v; search(v);
  $("#hub").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  const first = $(".hub-link.hit, .spot-tile.hit");
  (first || q).focus();
});

// ticker: on phones show it right after the numbers strip instead of in the footer
const ticker = $(".ticker"), bottombar = $(".bottombar"), mqPhone = window.matchMedia("(max-width: 720px)");
function placeTicker() {
  if (mqPhone.matches) $(".stats").after(ticker);
  else bottombar.prepend(ticker);
}
placeTicker();
mqPhone.addEventListener("change", placeTicker);

// ticker: duplicate content for a seamless loop
const tm = $(".ticker-move");
tm.innerHTML += tm.innerHTML
  .replace('class="ticker-item"', 'class="ticker-item" aria-hidden="true"')
  .replace(/<a /g, '<a tabindex="-1" ');

setLang(lang);
go(0);
countUp();
