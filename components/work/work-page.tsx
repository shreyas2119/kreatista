"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { packageChoices, packages, reviews, steps, words } from "./content";
import { Ink } from "./ink";
import PixelCard from "./PixelCard";
import SlideCommit from "./SlideCommit";
import TextLoop from "./TextLoop";
import "./work.css";

// Folder derives its colours from a canvas, which only exists in the browser.
const Folder = dynamic(() => import("./Folder"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const overview =
  "A business site often loads slowly on a phone, never says what to do next, and looks finished without bringing in a call, a booking, or a sale.";

const decos = ["arch", "box", "disc", "arch", "box", "disc"] as const;

const navLinks = [
  { id: "steps", label: "Steps" },
  { id: "proof", label: "Work" },
  { id: "packages", label: "Packages" },
] as const;

function formatCount(value: number, decimals: number) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function countUp(el: HTMLElement, delay = 0) {
  if (el.dataset.done) return;
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const decimals = Number(el.dataset.decimals ?? 0);
  el.dataset.done = "1";
  const start = performance.now() + delay;
  const tick = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / 1800));
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = formatCount(target * eased, decimals);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Starts with only the first frame in view, flush right, and ends with the
// strip's right edge on the viewport's right edge.
function reelRange(reel: HTMLElement) {
  const frame = reel.querySelector<HTMLElement>(".shotframe");
  const pad = parseFloat(getComputedStyle(reel).paddingLeft) || 0;
  const first = (frame?.offsetWidth ?? 0) + pad * 2;
  const margin = reel.offsetLeft;
  return {
    from: Math.max(0, window.innerWidth - margin - first - margin),
    to: Math.min(0, window.innerWidth - margin - reel.offsetWidth),
  };
}

function Pill({
  href,
  children,
  className = "",
  onClick,
  external = false,
}: {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  return (
    <a
      className={`pill ${className}`}
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="pill-in"><span className="pill-t" data-text={children}>{children}</span></span>
    </a>
  );
}

export function WorkPage({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [pack, setPack] = useState<(typeof packageChoices)[number]>("Not sure yet");
  const [word, setWord] = useState<(typeof words)[number]>(words[0]);
  const [wordOut, setWordOut] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const sync = () => setNarrow(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    root.classList.add("motion");
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.add("is-ready"));
    });

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".rise"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => io.observe(node));

    const counters = Array.from(root.querySelectorAll<HTMLElement>(".stats [data-count]"));
    counters.forEach((el) => (el.textContent = formatCount(0, Number(el.dataset.decimals ?? 0))));
    const statsIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          statsIo.unobserve(entry.target);
          entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => countUp(el, i * 120));
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 1 }
    );
    root.querySelectorAll(".stats").forEach((row) => statsIo.observe(row));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      statsIo.disconnect();
    };
  }, []);

  // Opening a card changes the page height under the cards, so each card reads
  // its own live position instead of a trigger measured in advance.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".card")).map((card) => ({
      card,
      body: card.querySelector<HTMLElement>(".card-body")!,
      cols: card.querySelector<HTMLElement>(".card-cols")!,
      deco: card.querySelector<HTMLElement>(".deco"),
      p: -1,
    }));
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const smooth = (v: number) => v * v * (3 - 2 * v);
    let raf = 0;

    const clear = () => {
      cards.forEach((c) => {
        c.p = -1;
        c.card.style.removeProperty("background-color");
        c.card.style.removeProperty("color");
        c.body.style.removeProperty("height");
        c.cols.style.removeProperty("opacity");
        c.cols.style.removeProperty("transform");
        c.deco?.style.removeProperty("opacity");
      });
    };

    const update = () => {
      raf = 0;
      if (reduce.matches) return;
      const vh = window.innerHeight;
      for (const c of cards) {
        const p = clamp((vh * 0.78 - c.card.getBoundingClientRect().top) / (vh * 0.4));
        if (Math.abs(p - c.p) < 0.002) continue;
        c.p = p;
        const bg = Math.round(236 * (1 - p));
        // A linear fade would match text to background mid-way; flip near the
        // grey where black and white text have equal contrast.
        const fg = Math.round(255 * smooth(clamp((p - 0.47) / 0.06)));
        const open = smooth(clamp(p / 0.85));
        const show = clamp((p - 0.35) / 0.65);
        c.card.style.backgroundColor = `rgb(${bg}, ${bg}, ${bg})`;
        c.card.style.color = `rgb(${fg}, ${fg}, ${fg})`;
        c.body.style.height = `${(c.cols.offsetHeight + c.cols.offsetTop) * open}px`;
        c.cols.style.opacity = String(show);
        c.cols.style.transform = `translateY(${(1 - show) * 24}px)`;
        if (c.deco) c.deco.style.opacity = String(p);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const remeasure = () => {
      cards.forEach((c) => (c.p = -1));
      schedule();
    };
    const onReduce = () => {
      if (reduce.matches) clear();
      remeasure();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    reduce.addEventListener("change", onReduce);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      reduce.removeEventListener("change", onReduce);
      clear();
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval = 0;
    let timeout = 0;
    const start = () => {
      window.clearInterval(interval);
      if (reduce.matches) return;
      interval = window.setInterval(() => {
        setWordOut(true);
        timeout = window.setTimeout(() => {
          setWord((current) => words[(words.indexOf(current) + 1) % words.length]);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setWordOut(false));
          });
        }, 180);
      }, 2600);
    };
    start();
    reduce.addEventListener("change", start);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      reduce.removeEventListener("change", start);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 920px)");
    let ctx: gsap.Context | null = null;
    let resizeTimer = 0;

    // The strip pins for exactly as long as it needs to travel, so it stops
    // the moment its last frame is fully in view.
    const previewEl = root.querySelector<HTMLElement>(".preview");
    const reelEl = root.querySelector<HTMLElement>(".reel");
    const sizePreview = () => {
      if (!previewEl || !reelEl) return;
      if (reduce.matches) {
        previewEl.style.removeProperty("height");
        return;
      }
      const { from, to } = reelRange(reelEl);
      const pinned = Math.max(window.innerHeight * 0.5, (from - to) * 1.4);
      previewEl.style.height = `${Math.round(window.innerHeight + pinned)}px`;
    };
    ScrollTrigger.addEventListener("refreshInit", sizePreview);

    const mount = () => {
      ctx?.revert();
      sizePreview();
      ctx = gsap.context(() => {
        const proof = root.querySelector(".proof");
        if (proof) {
          ScrollTrigger.create({
            trigger: proof,
            start: "top 55%",
            end: "bottom 45%",
            toggleClass: { targets: root, className: "is-dark" },
          });
        }

        if (reduce.matches) return;

        const words = root.querySelectorAll(".overview .w");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: ".overview .big", start: "top 85%", end: "bottom 50%", scrub: true },
            }
          );
        }

        const preview = root.querySelector(".preview");
        const reel = root.querySelector<HTMLElement>(".reel");
        const frame = root.querySelector<HTMLElement>(".shotframe");
        if (preview && reel && frame) {
          gsap.fromTo(
            reel,
            { x: () => reelRange(reel).from },
            {
              x: () => reelRange(reel).to,
              ease: "none",
              scrollTrigger: { trigger: preview, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
            }
          );
        }

        const squiggle = root.querySelector(".squiggle path");
        if (preview && squiggle) {
          gsap.fromTo(
            squiggle,
            { strokeDasharray: 1000, strokeDashoffset: 1000 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: { trigger: preview, start: "top 60%", end: "bottom bottom", scrub: true },
            }
          );
        }

        if (narrow.matches) return;

        root.querySelectorAll<HTMLElement>(".shot").forEach((shot) => {
          const img = shot.querySelector(".shot-img");
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      }, root);
      ScrollTrigger.refresh();
    };

    mount();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // Trigger positions are measured once, so any later change in page height
    // (hero size, images, fonts, the site loader) would leave them stale.
    let height = root.offsetHeight;
    let refreshTimer = 0;
    const ro = new ResizeObserver(() => {
      if (root.offsetHeight === height) return;
      height = root.offsetHeight;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    });
    ro.observe(root);

    const onChange = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(mount, 150);
    };
    narrow.addEventListener("change", onChange);
    reduce.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(resizeTimer);
      window.clearTimeout(refreshTimer);
      ScrollTrigger.removeEventListener("refreshInit", sizePreview);
      previewEl?.style.removeProperty("height");
      ro.disconnect();
      ctx?.revert();
      narrow.removeEventListener("change", onChange);
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const nav = root?.querySelector(".nav");
    if (!nav) return;
    const spies = Array.from(nav.querySelectorAll<HTMLElement>(".nav-link")).map((link) => ({
      link,
      section: document.getElementById(link.dataset.section ?? ""),
    }));
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 160 || last - y > 4) nav.classList.remove("is-hidden");
      else if (y - last > 4) nav.classList.add("is-hidden");
      if (Math.abs(y - last) > 4) last = y;
      const line = window.innerHeight * 0.4;
      spies.forEach(({ link, section }) => {
        const box = section?.getBoundingClientRect();
        link.classList.toggle("is-active", !!box && box.top <= line && box.bottom > line);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const track = rootRef.current?.querySelector<HTMLElement>(".marquee-track");
    const half = track?.firstElementChild as HTMLElement | null;
    if (!track || !half) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let dir = -1;
    let boost = 0;
    let lastY = window.scrollY;
    let lastT = 0;
    let raf = 0;
    let visible = false;

    const onScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(delta) < 1) return;
      dir = delta > 0 ? -1 : 1;
      boost = Math.min(boost + Math.abs(delta) * 6, 2400);
    };

    const tick = (now: number) => {
      const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0;
      lastT = now;
      const width = half.offsetWidth;
      x += dir * (60 + boost) * dt;
      if (x <= -width) x += width;
      if (x > 0) x -= width;
      boost *= 0.92;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        lastT = 0;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nBusiness: ${business}\nI need a: ${pack}\n\nWhat the website should achieve:\n${message}`;
    window.location.href = `mailto:work@socioryx.com?subject=${encodeURIComponent(`Website enquiry, ${business}`)}&body=${encodeURIComponent(body)}`;
  }

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className={`work ${className}`} ref={rootRef}>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="logo" href="https://socioryx.com">socioryx</a>
          <nav className="nav-links" aria-label="Page">
            {navLinks.map((link) => (
              <a className="nav-link" href={`#${link.id}`} key={link.id} data-section={link.id}>
                <span className="pill-in"><span className="pill-t" data-text={link.label}>{link.label}</span></span>
              </a>
            ))}
            <Pill href="#book" className="roll calm small">Book a call</Pill>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-label="Outcome">
          <Ink />
          <div className="wrap">
            <h1>
              <span className="line">
                <span>
                  We build <span className={wordOut ? "word is-out" : "word"}>{word}</span>
                </span>
              </span>
              <span className="line"><span>that bring in business.</span></span>
            </h1>
            <p className="lede">The path below is how yours gets built.</p>
            <Pill href="#book" className="roll calm">Book a call</Pill>
          </div>
          <span className="cue" aria-hidden="true">Scroll</span>
        </section>

        <section className="preview" aria-label="Live work">
          <div className="stage">
            <svg className="squiggle" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="squiggle-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
                  <stop offset="0" stopColor="#5b4f9a" />
                  <stop offset="0.35" stopColor="#ff5c8a" />
                  <stop offset="0.65" stopColor="#ffb23e" />
                  <stop offset="1" stopColor="#2ec4b6" />
                </linearGradient>
              </defs>
              <path
                pathLength={1000}
                d="M -60 770 C 200 870, 380 650, 300 520 C 230 390, 420 110, 610 140 C 810 170, 760 390, 640 335 C 520 280, 600 50, 830 75 C 1050 100, 990 830, 1180 805 C 1360 780, 1310 615, 1220 655 C 1120 705, 1250 905, 1420 790 C 1560 690, 1500 210, 1680 110"
              />
            </svg>
            <div className="reel">
              <figure className="shotframe">
                <Image src="/work/dental-desktop.jpg" alt="Indore Dental Hospital homepage" fill sizes="(max-width: 920px) 100vw, 1000px" />
                <figcaption className="frame-tag">Indore Dental Hospital, live</figcaption>
              </figure>
              <figure className="shotframe is-main">
                <Image src="/work/puja-desktop.jpg" alt="Puja Shraddha homepage" fill sizes="(max-width: 920px) 100vw, 1000px" priority />
                <figcaption className="frame-tag">Puja Shraddha, live</figcaption>
              </figure>
              <div className="shotframe is-next" aria-hidden="true">
                <span>Your site, next.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="overview" aria-labelledby="problem-title">
          <div className="wrap">
            <h2 id="problem-title" className="rise">Slow. Unclear. It does not convert.</h2>
            <p className="big">
              {overview.split(" ").map((w, i) => (
                <span className="w" key={i}>{w}{" "}</span>
              ))}
            </p>
          </div>
        </section>

        <section className="steps" id="steps" aria-labelledby="steps-title">
          <div className="wrap">
            <div className="steps-head">
              <h2 id="steps-title" className="rise">From the first call to a site that sells.</h2>
              <p className="rise">Six steps, from a thirty-minute discovery call to a live site. A fixed quote comes after the short discovery call.</p>
            </div>
            <ol className="cards">
              {steps.map((step, index) => (
                <li className="card" id={step.id} key={step.id}>
                  <div className="card-top">
                    <h3>{step.title}</h3>
                    <span className="num" aria-hidden="true">{step.n}</span>
                  </div>
                  {"when" in step && step.when ? <p className="when">{step.when}</p> : null}
                  <div className="card-body">
                    <div className="card-cols">
                      <div>
                        <h4>What Socioryx does</h4>
                        <p>{step.does}</p>
                      </div>
                      <div>
                        <h4>What you leave with</h4>
                        <p>{step.leave}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`deco ${decos[index]}`} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="proof" id="proof" aria-labelledby="proof-title">
          <div className="wrap">
            <h2 id="proof-title" className="rise">Two builds, already live.</h2>
            <div className="cases">
              <article className="case rise" id="case-dental">
                <a className="shot" href="https://www.indoredental.co.in/" target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                  <div className="shot-img">
                    <Image src="/work/dental-desktop.jpg" alt="" fill sizes="(max-width: 920px) 100vw, 600px" />
                  </div>
                </a>
                <h3>Indore Dental Hospital</h3>
                <p className="promise">The trust ladder.</p>
                <div className="case-copy">
                  <p>Healthcare, since 2012. Promise, doctor credentials, proof, safety, results, then booking. Every section answers one patient doubt. Nobody books an implant from a pretty homepage. They book when the page removes fear, step by step.</p>
                  <p>The clinic was premium and easy to miss online. An internationally trained specialist, M.D.S., with fellowships in Karnataka, the USA, and Israel, whose digital presence did not match the room.</p>
                </div>
                <div className="stats">
                  <div><b><span data-count="4.9" data-decimals="1">4.9</span></b><span>out of 5</span></div>
                  <div><b><span data-count="15000">15,000</span>+</b><span>patients</span></div>
                  <div><b><span data-count="3">3</span></b><span>locations</span></div>
                </div>
                <div className="case-copy">
                  <p>What shipped: a doctor profile, before and after drag sliders, booking by treatment and time slot, FAQs, and patient stories. Next.js, local search, mobile-first.</p>
                </div>
                <Pill href="https://www.indoredental.co.in/" className="roll visit" external>Visit indoredental.co.in</Pill>
              </article>

              <article className="case rise" id="case-puja">
                <a className="shot" href="https://pujashraddha.com" target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                  <div className="shot-img">
                    <Image src="/work/puja-desktop.jpg" alt="" fill sizes="(max-width: 920px) 100vw, 600px" />
                  </div>
                </a>
                <h3>Puja Shraddha</h3>
                <p className="promise">Tradition, without the friction.</p>
                <div className="case-copy">
                  <p>A booking platform, pan-India. Booking a pandit lived on word of mouth. Three questions had to be answered before the button: is he verified, what will it cost, and does he follow our tradition.</p>
                  <p>The line on the work is Sacred Devotion. Modern Access. Warmth on top of a clear flow, not a shop layout.</p>
                </div>
                <div className="stats">
                  <div><b><span data-count="10000">10,000</span>+</b><span>families</span></div>
                  <div><b><span data-count="50">50</span>+</b><span>cities</span></div>
                  <div><b>Verified</b><span>pandits only</span></div>
                </div>
                <div className="case-copy">
                  <p>What shipped: pujas by occasion, pandits by city and language, price shown before booking, samagri lists, and same-day help. New cities slot in without a redesign.</p>
                </div>
                <Pill href="https://pujashraddha.com" className="roll visit" external>Visit pujashraddha.com</Pill>
              </article>
            </div>

            <div className="reviews">
              <div className="reviews-head rise">
                <h3>In their words.</h3>
                <p>{narrow ? "Tap the folder to open it, then tap a card to read it." : "Open the folder, then click a card to read it up close."}</p>
              </div>
              <div className="reviews-stage">
                <Folder
                  label="Reviews"
                  color="#5b4f9a"
                  tabPosition="left"
                  size={narrow ? 1.5 : 2.4}
                  layout={narrow ? "stack" : "spread"}
                  tilt={0.4}
                >
                  {reviews.map((review) => (
                    <figure className="review-card" key={review.id}>
                      <span className="review-brand">{review.brand}</span>
                      <blockquote>{review.quote}</blockquote>
                      <figcaption>
                        <b>{review.name}</b>
                        <span>{review.role}</span>
                      </figcaption>
                    </figure>
                  ))}
                </Folder>
              </div>
            </div>
          </div>
        </section>

        <div className="tape">
          <TextLoop
            text="Custom code ✦ Mobile-first ✦ Measured from day one ✦ You own everything"
            shape="wave"
            speed={70}
            curviness={34}
            fontSize={34}
            fontWeight={700}
            letterSpacing={1.5}
            ribbonColor="#5b4f9a"
            ribbonWidth={72}
            cross
            crossAngle={10}
            scrollBoost={1}
          />
        </div>

        <section className="packages" id="packages" aria-labelledby="packages-title">
          <div className="wrap">
            <div className="packages-head">
              <h2 id="packages-title" className="rise">Pick a shape.</h2>
              <p className="rise">A fixed quote comes after a short discovery call. The package links fill the form.</p>
            </div>
            <div className="offers">
              {packages.map((item, index) => {
                const hot = item.id === "Booking Platform";
                return (
                  <PixelCard
                    key={item.id}
                    className={hot ? "offer hot rise" : "offer rise"}
                    style={{ transitionDelay: `${index * 60}ms` }}
                    theme={hot ? "dark" : "light"}
                    colors={hot ? ["#ffffff", "#c9c2f2", "#8b7fe0"] : ["#5b4f9a", "#8b7fe0", "#c9c2f2"]}
                    glowColor="#8b7fe0"
                    gap={7}
                    speed={30}
                    opacity={hot ? 0.55 : 0.45}
                    fade={0.75}
                    origin="pointer"
                    introDelay={index * 180}
                    radius={24}
                    noFocus
                  >
                    <article className="offer-in">
                      <div>
                        <h3>{item.id}</h3>
                        <p className="time">{item.time}</p>
                      </div>
                      <p>{"note" in item && item.note ? `${item.note}. ${item.text}` : item.text}</p>
                      <ul>
                        {item.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                      <Pill href="#book" className="small" onClick={() => setPack(item.id)}>Book a call</Pill>
                    </article>
                  </PixelCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="book" id="book" aria-labelledby="book-title">
          <div className="glow" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="wrap">
            <h2 id="book-title" className="rise">Your project here.</h2>
            <p className="hand rise">this slot is yours</p>
            <p className="intro rise">Tell us which shape is closest. Replies within one business day. This form opens your email. Nothing is stored on this page.</p>
            <form onSubmit={onSubmit} ref={formRef}>
              <div className="field">
                <label htmlFor="fName">Your name</label>
                <input id="fName" name="name" required autoComplete="name" placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="fBiz">Business</label>
                <input id="fBiz" name="business" required placeholder="What you do" />
              </div>
              <fieldset>
                <legend>I need a</legend>
                <div className="choices">
                  {packageChoices.map((choice) => (
                    <label className="choice" key={choice}>
                      <input
                        type="radio"
                        name="package"
                        value={choice}
                        checked={pack === choice}
                        onChange={() => setPack(choice)}
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field full">
                <label htmlFor="fMsg">What should the website achieve?</label>
                <textarea id="fMsg" name="message" placeholder="More appointments, online bookings, a clearer presence" />
              </div>
              <div className="form-end">
                <SlideCommit
                  className="book-slide"
                  label="Slide to book a call"
                  doneLabel="Opening email"
                  errorLabel="Fill in the form first"
                  onConfirm={() => {
                    const form = formRef.current;
                    if (!form) return;
                    if (!form.reportValidity()) throw new Error("invalid form");
                    form.requestSubmit();
                  }}
                  trackColor="#ffffff"
                  handleColor="#000000"
                  successColor="#5b4f9a"
                  width={268}
                  height={56}
                  radius={28}
                  holdMs={1400}
                />
                <button className="sr-submit" type="submit" tabIndex={-1} aria-hidden="true">Book a call</button>
                <p className="form-note">Or write to <a href="mailto:work@socioryx.com">work@socioryx.com</a>.</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <h3>Page</h3>
              <div className="foot-links">
                <a href="#steps">Steps</a>
                <a href="#proof">Work</a>
                <a href="#packages">Packages</a>
                <a href="#book">Book a call</a>
              </div>
            </div>
            <div>
              <h3>Live work</h3>
              <div className="foot-links">
                <a href="https://www.indoredental.co.in/" target="_blank" rel="noopener noreferrer">indoredental.co.in</a>
                <a href="https://pujashraddha.com" target="_blank" rel="noopener noreferrer">pujashraddha.com</a>
                <a href="https://socioryx.com">socioryx.com</a>
              </div>
            </div>
            <div>
              <h3>Follow</h3>
              <div className="foot-links">
                <a href="https://www.linkedin.com/company/socioryx" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/socioryx_network" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://x.com/SocioryxN79343" target="_blank" rel="noopener noreferrer">X</a>
              </div>
            </div>
            <div className="foot-contact">
              <h3>Contact</h3>
              <a className="mail" href="mailto:work@socioryx.com">work@socioryx.com</a>
            </div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((half) => (
              <div className="marquee-half" key={half}>
                {[0, 1, 2].map((i) => (
                  <span className="marquee-item" key={i}>
                    socioryx<i className="marquee-star">✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          <p className="foot-line">
            Built in custom code.
            <br />
            Mobile-first, measured from day one.
          </p>
          <div className="legal">
            <span>Socioryx Network</span>
            <span>{new Date().getFullYear()}</span>
            <a href="#main" onClick={(event) => { event.preventDefault(); toTop(); }}>Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
