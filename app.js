/* Yang Jinbo — Portfolio 2026 */
(function () {
  "use strict";

  const DATA = window.PORTFOLIO || { images: [], videos: [] };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- hero mosaic ---------- */
  const heroPicks = [
    "poster-annual", "poster-reverse", "live-bg-2", "brand-cards-01",
    "poster-harmony", "detail-credit", "poster-xhs", "poster-acquire",
  ];
  const mosaic = $("#heroMosaic");
  if (mosaic) {
    const cells = 15;
    const pool = heroPicks
      .map((s) => DATA.images.find((i) => i.slug === s))
      .filter(Boolean);
    for (let i = 0; i < cells; i++) {
      const item = pool[i % pool.length];
      if (!item) break;
      const img = document.createElement("img");
      img.src = item.thumb;
      img.alt = "";
      img.decoding = "async";
      img.loading = i < 5 ? "eager" : "lazy";
      mosaic.appendChild(img);
    }
  }

  /* ---------- render grids ---------- */
  const sectionMap = {};
  $$("[data-section]").forEach((sec) => {
    const key = sec.dataset.section;
    const grid = $("[data-grid]", sec);
    const vgrid = $("[data-video-grid]", sec);
    const countEl = $("[data-count]", sec);

    let items = [];
    if (grid) {
      items = DATA.images.filter((i) => i.section === key);
      grid.style.setProperty("--ar", sec.style.getPropertyValue("--ar") || "4/5");
    } else if (vgrid) {
      items = DATA.videos.filter((v) => v.section === key);
    }
    sectionMap[key] = items;

    items.forEach((item, idx) => {
      const el = grid
        ? buildImageCard(item, idx, items)
        : buildVideoCard(item, idx);
      (grid || vgrid).appendChild(el);
    });

    if (countEl) {
      countEl.textContent = String(items.length).padStart(2, "0") + " 件";
    }
  });

  function buildImageCard(item, idx, list) {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", item.title);

    const tall = item.h / item.w > 2.2;
    const wide = item.w / item.h > 1.15;
    if (tall) card.classList.add("tall");
    if (wide) card.classList.add("wide");
    card.innerHTML = `
      <div class="card-media">
        <img src="${item.thumb}" alt="${esc(item.title)}" loading="lazy" decoding="async">
        ${tall ? '<span class="card-tag">长图 · 点击查看</span>' : '<span class="card-tag">查看</span>'}
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

  function buildVideoCard(v, idx) {
    const card = document.createElement("article");
    card.className = "vcard" + (v.h > v.w ? " vertical" : "");
    const dur = v.dur ? `${v.dur} · ${v.ratio}` : v.ratio;
    card.innerHTML = `
      <div class="vcard-media" tabindex="0" role="button" aria-label="播放 ${esc(v.title)}">
        <img src="${v.poster}" alt="${esc(v.title)}" loading="lazy" decoding="async">
        <div class="vcard-play"><span>▶</span></div>
      </div>
      <span class="mono">${esc(dur)}</span>
      <div class="vcard-info">
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.desc)}</p>
      </div>`;
    const btn = $(".vcard-media", card);
    const open = () => openLightbox(DATA.videos.filter((x) => x.section === v.section), idx);
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

  /* ---------- nav active + topbar + progress ---------- */
  const navLinks = $$(".chapters a");
  const sections = $$("main section[id]");
  const topbar = $("#topbar");
  const bar = $(".progress i");

  function onScroll() {
    const y = window.scrollY || 0;
    topbar.classList.toggle("solid", y > 40);
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
    if (it.kind === "video") {
      const v = document.createElement("video");
      v.src = it.src;
      v.poster = it.poster;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.preload = "metadata";
      lbStage.appendChild(v);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      const img = document.createElement("img");
      img.src = it.full;
      img.alt = it.title;
      img.decoding = "async";
      lbStage.appendChild(img);
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
    if (v) { v.pause(); }
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

  // touch swipe
  let tx = 0, ty = 0;
  lbStage.addEventListener("touchstart", (e) => {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  lbStage.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* contact links use native mailto: / tel: behaviour */

  let toastEl = null, toastTimer = 0;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }
})();
