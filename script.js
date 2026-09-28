
(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const setTheme = (mode) => {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  };
  const current = () => root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  setTheme(stored || current());
  themeBtn.addEventListener("click", () => setTheme(current() === "dark" ? "light" : "dark"));

  const drawer = document.getElementById("drawer");
  const openMenu = () => { drawer.hidden = false; };
  const closeMenu = () => { drawer.hidden = true; };
  document.getElementById("menuToggle").addEventListener("click", openMenu);
  document.getElementById("drawerClose").addEventListener("click", closeMenu);
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  const phrases = [
    "Forward Deployed Engineer aspirant · Cloud & Platform · DevSecOps · AI Infrastructure",
    "I sit between users, software, and infrastructure.",
    "Problem → Prototype → API → Infrastructure → Production"
  ];
  const typed = document.getElementById("typedSub");
  let pi = 0, ci = 0, del = false;
  const tick = () => {
    const p = phrases[pi];
    typed.textContent = p.slice(0, ci);
    if (!del && ci < p.length) ci++;
    else if (!del && ci === p.length) { del = true; setTimeout(tick, 1600); return; }
    else if (del && ci > 0) ci--;
    else { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(tick, del ? 18 : 28);
  };
  tick();

  const links = [...document.querySelectorAll("[data-nav]")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = `#${e.target.id}`;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll(".exp-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".exp-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".exp-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add("active");
    });
  });

  const slides = [...document.querySelectorAll(".slide")];
  let si = 0;
  const show = (i) => {
    si = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("on", n === si));
  };
  show(0);
  document.getElementById("prevCert").addEventListener("click", () => show(si - 1));
  document.getElementById("nextCert").addEventListener("click", () => show(si + 1));
  setInterval(() => show(si + 1), 6500);

  const bars = document.querySelectorAll(".bar");
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.setProperty("--w", `${el.dataset.pct}%`);
      el.classList.add("on");
      barObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  bars.forEach((b) => barObs.observe(b));

  document.getElementById("downloadPdf").addEventListener("click", () => print());

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subject = encodeURIComponent(fd.get("subject"));
    const body = encodeURIComponent(`From: ${fd.get("email")}\n\n${fd.get("message")}`);
    location.href = `mailto:akhileshranjan.ks@gmail.com?subject=${subject}&body=${body}`;
    const st = document.getElementById("formStatus");
    st.hidden = false;
    st.textContent = "Opening your email client…";
  });

  const cursor = document.getElementById("cursor");
  addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const stage = document.getElementById("stage");
  stage.addEventListener("mousemove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    stage.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  stage.addEventListener("mouseleave", () => { stage.style.transform = ""; });

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });

  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  const net = document.getElementById("bgNet");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (net && !reduceMotion) {
    const ctx = net.getContext("2d");
    const mobile = matchMedia("(max-width: 700px)").matches;
    const nodes = [];
    const count = mobile ? 18 : 34;
    const maxD = mobile ? 90 : 128;
    const resize = () => {
      net.width = innerWidth;
      net.height = innerHeight;
    };
    const seed = () => {
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * net.width,
          y: Math.random() * net.height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16
        });
      }
    };
    resize();
    seed();
    addEventListener("resize", () => { resize(); seed(); }, { passive: true });
    const rgbOf = () => {
      const hex = getComputedStyle(root).getPropertyValue("--accent-2").trim();
      if (!hex.startsWith("#") || hex.length < 7) return [62, 207, 178];
      return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    };
    let raf = 0;
    const frame = () => {
      const [r, g, b] = rgbOf();
      ctx.clearRect(0, 0, net.width, net.height);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > net.width) n.vx *= -1;
        if (n.y < 0 || n.y > net.height) n.vy *= -1;
        ctx.fillStyle = `rgba(${r},${g},${b},0.32)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.1 * (1 - d / maxD)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else frame();
    });
    frame();
  }
})();
