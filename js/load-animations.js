// Page-load flicker animations — exact replication of Webflow IX2 sequences
// Timings derived by tracing each actionItemGroup through the IX2 engine rules:
//   - Groups run sequentially; each group starts when its carrier (max delay+dur item) completes
//   - The last item in each actionItems array wins (FIFO subscriber order, last fires last)
//   - All times are absolute from page load (seconds)

const E = 'power4.out'; // outQuart — matches Webflow's default easing

// ── Logo (.logo.home) ──────────────────────────────────────────────────────
gsap.timeline()
  .set('.logo.home', { opacity: 0 })
  .to('.logo.home', { opacity: 1, duration: 0.05, ease: E }, 0.25)
  .to('.logo.home', { opacity: 0, duration: 0.05, ease: E }, 0.40)
  .to('.logo.home', { opacity: 1, duration: 0.05, ease: E }, 0.55)
  .to('.logo.home', { opacity: 0, duration: 0.05, ease: E }, 1.45)
  .to('.logo.home', { opacity: 1, duration: 0.05, ease: E }, 2.00);

// ── Logo Text (.logo-text) ─────────────────────────────────────────────────
gsap.timeline()
  .set('.logo-text', { opacity: 0 })
  .to('.logo-text', { opacity: 1, duration: 0.05, ease: E }, 0.55)
  .to('.logo-text', { opacity: 0, duration: 0.05, ease: E }, 1.60)
  .to('.logo-text', { opacity: 1, duration: 0.10, ease: E }, 2.40);

// ── H1 Top (.hero-top-line) ────────────────────────────────────────────────
// n-11 (instant) briefly suppresses n-12; after removal n-12 snaps to ~0.8
// then: flash, dim, pause, settle
gsap.timeline()
  .set('.hero-top-line', { opacity: 0 })
  .to('.hero-top-line', { opacity: 1, duration: 0.07, ease: E }, 1.033)
  .to('.hero-top-line', { opacity: 0, duration: 0.05, ease: E }, 1.50)
  .set('.hero-top-line', { opacity: 1 }, 1.55)
  .to('.hero-top-line', { opacity: 0.2, duration: 0.10, ease: E }, 1.70)
  .set('.hero-top-line', { opacity: 1 }, 1.80)
  .to('.hero-top-line', { opacity: 0, duration: 0.05, ease: E }, 1.90)
  .set('.hero-top-line', { opacity: 1 }, 2.30)
  .to('.hero-top-line', { opacity: 1, duration: 0.30 }, 2.30);

// ── H1 Bottom (.hero-bottom-line) ─────────────────────────────────────────
// n-3 (shorter LAST) flashes to 1, then n-2 (no-op) holds at 0
gsap.timeline()
  .set('.hero-bottom-line', { opacity: 0 })
  .to('.hero-bottom-line', { opacity: 1, duration: 0.05, ease: E }, 0.50)
  .set('.hero-bottom-line', { opacity: 0 }, 0.55)
  .to('.hero-bottom-line', { opacity: 1, duration: 0.10, ease: E }, 0.65)
  .to('.hero-bottom-line', { opacity: 0, duration: 0.10, ease: E }, 0.85)
  .to('.hero-bottom-line', { opacity: 1, duration: 0.10, ease: E }, 1.75)
  .to('.hero-bottom-line', { opacity: 0, duration: 0.05, ease: E }, 1.85)
  .to('.hero-bottom-line', { opacity: 1, duration: 0.05, ease: E }, 2.00);

// ── CTA Buttons (.hero-button-group) ──────────────────────────────────────
// n-2 (shorter LAST, no-op) suppresses until t=2.1, then n-3 snaps to ~0.99
gsap.timeline()
  .set('.hero-button-group', { opacity: 0 })
  .to('.hero-button-group', { opacity: 1, duration: 0.05, ease: E }, 2.10);

// ── Project List (.main-title__list) ──────────────────────────────────────
// Dim flash at 71%, snap off, dim to 50%, drop to 0, settle at 1
gsap.timeline()
  .set('.main-title__list', { opacity: 0 })
  .to('.main-title__list', { opacity: 0.71, duration: 0.05, ease: E }, 1.60)
  .set('.main-title__list', { opacity: 0 }, 1.80)
  .to('.main-title__list', { opacity: 0.5, duration: 0.05, ease: E }, 1.95)
  .to('.main-title__list', { opacity: 0, duration: 0.05, ease: E }, 2.00)
  .to('.main-title__list', { opacity: 1, duration: 0.05, ease: E }, 2.10);

// ── Project Headers (.project-headers) ────────────────────────────────────
gsap.timeline()
  .set('.project-headers', { opacity: 0 })
  .to('.project-headers', { opacity: 1, duration: 0.05, ease: E }, 1.90)
  .to('.project-headers', { opacity: 0, duration: 0.05, ease: E }, 1.95)
  .to('.project-headers', { opacity: 1, duration: 0.05, ease: E }, 2.05);

// ── Avatar Button (.avatar-button) ────────────────────────────────────────
gsap.timeline()
  .set('.avatar-button', { opacity: 0 })
  .to('.avatar-button', { opacity: 1, duration: 0.05, ease: E }, 1.90)
  .to('.avatar-button', { opacity: 0, duration: 0.05, ease: E }, 2.05)
  .to('.avatar-button', { opacity: 1, duration: 0.05, ease: E }, 2.10)
  .to('.avatar-button', { opacity: 0, duration: 0.05, ease: E }, 2.25)
  .to('.avatar-button', { opacity: 1, duration: 0.15, ease: E }, 2.30)
  .to('.avatar-button', { opacity: 0, duration: 0.05, ease: E }, 2.55)
  .to('.avatar-button', { opacity: 1, duration: 0.05, ease: E }, 2.60)
  .to('.avatar-button', { opacity: 0, duration: 0.15, ease: E }, 3.15)
  .to('.avatar-button', { opacity: 1, duration: 0.05, ease: E }, 3.80);

// ── Footer Text (.footer-text) ────────────────────────────────────────────
gsap.timeline()
  .set('.footer-text', { opacity: 0 })
  .to('.footer-text', { opacity: 1, duration: 0.25, ease: E }, 0.75)
  .to('.footer-text', { opacity: 0, duration: 0.25, ease: E }, 1.10)
  .to('.footer-text', { opacity: 1, duration: 0.25, ease: E }, 1.35)
  .to('.footer-text', { opacity: 0, duration: 0.25, ease: E }, 1.70)
  .to('.footer-text', { opacity: 1, duration: 0.25, ease: E }, 2.05)
  .to('.footer-text', { opacity: 0, duration: 0.10 }, 2.40)
  .to('.footer-text', { opacity: 1, duration: 0.05, ease: E }, 2.45)
  .to('.footer-text', { opacity: 0, duration: 0.05, ease: E }, 2.55)
  .to('.footer-text', { opacity: 1, duration: 0.05, ease: E }, 2.70);

// ── Social Links ───────────────────────────────────────────────────────────
// b1 (.socail-b1)
gsap.timeline()
  .set('.socail-b1', { opacity: 0 })
  .to('.socail-b1', { opacity: 1, duration: 0.05, ease: E }, 0.60)
  .to('.socail-b1', { opacity: 0, duration: 0.05, ease: E }, 0.75)
  .to('.socail-b1', { opacity: 1, duration: 0.05, ease: E }, 0.80)
  .to('.socail-b1', { opacity: 0, duration: 0.05, ease: E }, 0.85)
  .to('.socail-b1', { opacity: 1, duration: 0.05, ease: E }, 2.10)
  .to('.socail-b1', { opacity: 0, duration: 0.05, ease: E }, 2.25)
  .to('.socail-b1', { opacity: 1, duration: 0.05, ease: E }, 2.90);

// b2 (.socail-b2)
gsap.timeline()
  .set('.socail-b2', { opacity: 0 })
  .to('.socail-b2', { opacity: 0.6, duration: 0.05, ease: E }, 1.70)
  .to('.socail-b2', { opacity: 0, duration: 0.05, ease: E }, 1.85)
  .to('.socail-b2', { opacity: 1, duration: 0.05, ease: E }, 2.30)
  .to('.socail-b2', { opacity: 0, duration: 0.05, ease: E }, 2.35)
  .to('.socail-b2', { opacity: 1, duration: 0.05, ease: E }, 2.95);

// b3 (.socail-b3)
gsap.timeline()
  .set('.socail-b3', { opacity: 0 })
  .to('.socail-b3', { opacity: 1, duration: 0.05, ease: E }, 1.50)
  .to('.socail-b3', { opacity: 0, duration: 0.05, ease: E }, 1.65)
  .to('.socail-b3', { opacity: 1, duration: 0.05, ease: E }, 1.85)
  .to('.socail-b3', { opacity: 0, duration: 0.05, ease: E }, 2.10)
  .to('.socail-b3', { opacity: 1, duration: 0.05, ease: E }, 2.90);
