(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
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

  // No scroll hijacking: native scrolling keeps touch, keyboard and anchor navigation reliable.
  // GSAP animations are progressive enhancement and safely skipped if scripts are unavailable.
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power2.out' });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 681px)', () => {
    gsap.to('.hero-background', {
      scale: 1.16,
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    });

    gsap.to('.hero-photo-one', {
      yPercent: 24,
      rotation: -2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-photo-two', {
      yPercent: -18,
      rotation: 2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.bush-left', {
      xPercent: -30,
      autoAlpha: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.bush-right', {
      xPercent: 30,
      autoAlpha: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    gsap.to('.manifesto h2', {
      xPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.manifesto',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.from('.about-image', {
      y: 70,
      autoAlpha: 0,
      duration: 1.1,
      scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true }
    });
  });

  mm.add('(min-width: 681px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.to('.about-backdrop', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.contact-background', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    });
  });

  // Ensure image dimensions and layout have settled before calculating trigger positions.
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  window.addEventListener('resize', gsap.utils.debounce(() => ScrollTrigger.refresh(), 180), { passive: true });

})();
