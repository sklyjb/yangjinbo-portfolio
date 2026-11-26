/* Yang Jinbo — Portfolio 2026 */
(function () {
  "use strict";

  const DATA = window.PORTFOLIO || { sections: {}, videos: [] };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const thumbOf = (n) => `assets/thumb/${n}.webp`;
  const fullOf = (n) => `assets/img/${n}.webp`;
  const videoSrc = (n) => `assets/video/${n}.mp4`;
  const videoPoster = (n) => `assets/video/${n}-poster.webp`;

  const allImages = Object.values(DATA.sections).flat();

  /* ---------- theme ---------- */
  const THEME_KEY = "yjb-theme";
  const themeBtn = $("#themeToggle");
  function applyTheme(mode) {
    document.body.classList.toggle("light", mode === "light");
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(mode === "light"));
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "light" ? "#f2efe9" : "#0a0a0b");
  }
  applyTheme(localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- hero visual ---------- */
  const heroPicks = [
    "poster-reverse", "poster-annual", "poster-illegal",
  ];
  const heroBox = $("#heroVisual");
  if (heroBox) {
    heroPicks.forEach((slug) => {
      const item = allImages.find((i) => i.img === slug);
      if (!item) return;
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      img.src = thumbOf(slug);
      img.alt = "";
      img.decoding = "async";
      fig.appendChild(img);
      heroBox.appendChild(fig);
    });
  }

  /* ---------- render sections ---------- */
  const VIDEO_MAP = { videos: ["event", "ip", "team"] };
  const pad = (n) => String(n).padStart(2, "0") + " 件";

  $$("[data-section]").forEach((sec) => {
    const key = sec.dataset.section;
    const grid = $("[data-grid]", sec);
    const vgrid = $("[data-video-grid]", sec);
    const countEl = $("[data-count]", sec);
    const feat = $("[data-feature]", sec);

    if (grid) {
      const items = DATA.sections[key] || [];
      items.forEach((item, idx) => {
        if (idx === 0 && feat) feat.appendChild(buildFeature(item, idx, items));
        else grid.appendChild(buildImageCard(item, idx, items));
      });
      if (countEl) countEl.textContent = pad(items.length);
    } else if (vgrid) {
      const slugs = VIDEO_MAP[key] || [];
      const vids = DATA.videos.filter((v) => slugs.includes(v.img));
      vids.forEach((v, idx) => vgrid.appendChild(buildVideoCard(v, idx, vids)));
      if (countEl) countEl.textContent = pad(vids.length);
    }
  });

  function buildFeature(item, idx, list) {
    const box = document.createElement("article");
    box.className = "feature";
    box.innerHTML = `
      <div class="feature-media" role="button" tabindex="0" aria-label="${esc(item.title)}">
        <img src="${fullOf(item.img)}" alt="${esc(item.title)}" loading="lazy" decoding="async">
      </div>
      <div class="feature-caption">
        <span class="mono">Main Visual</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.desc)}</p>
      </div>`;
    const media = $(".feature-media", box);
    const open = () => openLightbox(list, idx);
    media.addEventListener("click", open);
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    return box;
  }

  function buildImageCard(item, idx, list) {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", item.title);

    const tall = item.r > 2.2;
    const wide = item.r > 0 && 1 / item.r > 1.15;
    const strip = item.r > 0 && item.r < 0.42;
    if (tall) card.classList.add("tall");
    if (wide) card.classList.add("wide");
    if (strip) card.classList.add("strip");

    card.innerHTML = `
      <div class="card-media">
        <img src="${thumbOf(item.img)}" alt="${esc(item.title)}" loading="lazy" decoding="async">
        <span class="card-tag">${tall ? "长图 · 点击查看" : "查看"}</span>
      </div>
      <div class="card-info">
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.desc)}</p>
      </div>`;

    const open = () => openLightbox(list, idx);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    return card;
  }

  function buildVideoCard(v, idx, list) {
    const card = document.createElement("article");
    card.className = "vcard" + (v.r > 1 ? " vertical" : "");
    const meta = `${v.dur} · ${v.ratio}`;
    card.innerHTML = `
      <div class="vcard-media" tabindex="0" role="button" aria-label="播放 ${esc(v.title)}">
        <img src="${videoPoster(v.img)}" alt="${esc(v.title)}" loading="lazy" decoding="async">
        <div class="vcard-play"><span>▶</span></div>
      </div>
      <span class="mono">${esc(meta)}</span>
      <div class="vcard-info">
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.desc)}</p>
      </div>`;
    const btn = $(".vcard-media", card);
    const open = () => openLightbox(list, idx);
    btn.addEventListener("click", open);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    return card;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* ---------- reveal ---------- */
  const revealEls = $$(".card, .vcard, .chapter-head, .stat, .about-grid, .contact h2, .contact-links");
  revealEls.forEach((el) => {
    if (!el.classList.contains("card") && !el.classList.contains("vcard")) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";
    }
  });

  function show(el) {
    el.classList.add("in");
    el.style.opacity = "1";
    el.style.transform = "none";
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        show(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    revealEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.94) show(el);
      else io.observe(el);
    });
  } else {
    revealEls.forEach(show);
  }

  /* ---------- nav active + progress ---------- */
  const navLinks = $$(".chapters a");
  const sections = $$("main section[id]");
  const topbar = $("#topbar");
  const bar = $(".progress i");

  function onScroll() {
    const y = window.scrollY || document.scrollingElement.scrollTop || 0;
    if (topbar) topbar.classList.toggle("solid", y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;

    let current = "";
    for (const s of sections) {
      if (s.offsetTop - 120 <= y) current = s.id;
    }
    if (current === "about" || current === "contact" || current === "top") current = "";
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === current));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox");
  const lbStage = $("#lbStage");
  const lbTitle = $("#lbTitle");
  const lbIndex = $("#lbIndex");
  const lbDesc = $("#lbDesc");
  let state = { list: [], i: 0 };

  function openLightbox(list, i) {
    if (!list || !list.length) return;
    state = { list, i };
    render();
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("open"));
    document.body.style.overflow = "hidden";
    $("#lbClose").focus({ preventScroll: true });
  }

  function render() {
    const it = state.list[state.i];
    if (!it) return;
    lbStage.innerHTML = "";
    if (it.dur) {
      const v = document.createElement("video");
      v.src = videoSrc(it.img);
      v.poster = videoPoster(it.img);
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.preload = "metadata";
      lbStage.appendChild(v);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      const n = it.slices || 1;
      for (let i = 1; i <= n; i++) {
        const img = document.createElement("img");
        img.src = i === 1 ? fullOf(it.img) : `assets/img/${it.img}-${i}.webp`;
        img.alt = i === 1 ? it.title : "";
        img.decoding = "async";
        if (i > 1) img.loading = "lazy";
        lbStage.appendChild(img);
      }
      lbStage.scrollTop = 0;
    }
    lbTitle.textContent = it.title;
    lbDesc.textContent = it.desc || "";
    lbIndex.textContent = `${String(state.i + 1).padStart(2, "0")} / ${String(state.list.length).padStart(2, "0")}`;
    $("#lbPrev").disabled = state.i === 0;
    $("#lbNext").disabled = state.i === state.list.length - 1;
  }

  function step(d) {
    const n = state.i + d;
    if (n < 0 || n >= state.list.length) return;
    const v = $("#lbStage video");
    if (v) { v.pause(); v.removeAttribute("src"); }
    state.i = n;
    render();
  }

  function closeLightbox() {
    const v = $("#lbStage video");
    if (v) v.pause();
    lb.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      lb.hidden = true;
      lbStage.innerHTML = "";
    }, 260);
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => step(-1));
  $("#lbNext").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target === lbStage) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  let tx = 0, ty = 0;
  lbStage.addEventListener("touchstart", (e) => {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  lbStage.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* contact links use native mailto: / tel: */
})();
