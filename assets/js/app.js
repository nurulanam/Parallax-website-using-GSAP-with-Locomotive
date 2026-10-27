(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const progressBar = document.querySelector('.scroll-progress span');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Batch scroll reads/writes into one animation frame to keep the sticky header smooth.
  let headerFrame = 0;
  const updateHeader = () => {
    if (headerFrame) return;
    headerFrame = window.requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', window.scrollY > 24);
      headerFrame = 0;
    });
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
    navPanel?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navPanel?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  navPanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeMenu();
  }, { passive: true });

  // Demo story links open a local preview; no third-party video host is used.
  const storyDialog = document.querySelector('#story-demo');
  const storyDialogTitle = document.querySelector('#story-demo-title');
  document.querySelectorAll('[data-demo-open]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!storyDialog?.showModal) return;
      event.preventDefault();
      const storyTitle = link.querySelector('h3')?.childNodes[0]?.textContent?.trim();
      if (storyTitle && storyDialogTitle) storyDialogTitle.textContent = storyTitle;
      storyDialog.showModal();
    });
  });
  storyDialog?.querySelector('.dialog-close')?.addEventListener('click', () => storyDialog.close());
  storyDialog?.querySelector('[data-demo-contact]')?.addEventListener('click', () => storyDialog.close());
  storyDialog?.addEventListener('click', (event) => {
    if (event.target === storyDialog) storyDialog.close();
  });

  // This static demo has no backend configured; avoid a misleading silent form submission.
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    if (note) {
      note.textContent = 'Thanks for your interest. This demo form needs an email or CRM endpoint connected before it can deliver your message.';
      note.setAttribute('role', 'status');
      note.setAttribute('aria-live', 'polite');
    }
  });

  // Native scrolling avoids the touch, anchor, and layout jitter caused by scroll hijacking.
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'power2.out' });

  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true }
    });
  }

  // A restrained hero entrance; only opacity and transform are animated.
  gsap.fromTo('.hero-eyebrow, .hero h1, .hero-link',
    { autoAlpha: 0, y: 22 },
    { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12, delay: 0.12, clearProps: 'transform,opacity,visibility' }
  );

  const mm = gsap.matchMedia();
  mm.add('(min-width: 681px)', () => {
    // Gentle layered parallax; native scroll remains in control for consistent touch and trackpad feel.
    gsap.to('.hero-background', {
      scale: 1.12,
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.hero-photo-one', {
      yPercent: 16,
      rotation: -2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.hero-photo-two', {
      yPercent: -12,
      rotation: 2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.bush-left', {
      xPercent: -22,
      autoAlpha: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.bush-right', {
      xPercent: 22,
      autoAlpha: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.manifesto h2', {
      xPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.about-backdrop', {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.45 }
    });
    gsap.to('.contact-background', {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 0.45 }
    });
  });

  // Small staggered reveals are one-shot and do not affect document flow or pin sections.
  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.fromTo(element,
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.72,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true }
      }
    );
  });

  // ScrollTrigger refreshes on its own load/resize lifecycle; avoid duplicate refresh loops.
})();
