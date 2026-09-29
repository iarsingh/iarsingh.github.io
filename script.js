(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const themeBtn = document.getElementById("themeToggle");
  const syncThemeLabel = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeLabel();
  });
  syncThemeLabel();

  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");
  const setMenu = (open) => {
    navList.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  navList.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (menuBtn.getAttribute("aria-expanded") === "true" && !header.contains(e.target)) setMenu(false);
  });
  matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  const links = [...document.querySelectorAll("[data-nav]")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const setActive = (id) => {
    links.forEach((a) => {
      const on = a === byId.get(id);
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  const spyTargets = [...document.querySelectorAll("main > section[id]")];
  const navFor = (id) => (byId.has(id) ? id : id === "approach" ? "about" : null);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = navFor(e.target.id);
      if (id) setActive(id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  spyTargets.forEach((s) => spy.observe(s));
  setActive("home");

  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        ro.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => ro.observe(el));
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const rules = {
    email: (v) => (!v ? "Please enter your email." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Please enter a valid email address."),
    subject: (v) => (v.length < 3 ? "Please add a short subject." : ""),
    message: (v) => (v.length < 10 ? "Please write at least a sentence." : "")
  };
  const check = (field) => {
    const msg = rules[field.name](field.value.trim());
    const err = document.getElementById(`${field.id}-err`);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    err.textContent = msg;
    err.hidden = !msg;
    return !msg;
  };
  form.querySelectorAll("input, textarea").forEach((f) => {
    f.addEventListener("blur", () => { if (f.value) check(f); });
    f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input, textarea")];
    const results = fields.map((f) => check(f));
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) {
      status.className = "form-status err";
      status.textContent = "Please fix the highlighted fields.";
      firstBad.focus();
      return;
    }
    const fd = new FormData(form);
    const subject = encodeURIComponent(fd.get("subject").trim());
    const body = encodeURIComponent(`From: ${fd.get("email").trim()}\n\n${fd.get("message").trim()}`);
    location.href = `mailto:akhileshranjan.ks@gmail.com?subject=${subject}&body=${body}`;
    status.className = "form-status ok";
    status.textContent = "Opening your email app… If nothing happens, email akhileshranjan.ks@gmail.com directly.";
  });
})();
