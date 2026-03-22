/* ============================================
   DECA DIGITAL — Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Smooth scroll behavior ---
  document.documentElement.style.scrollBehavior = 'auto'; // let GSAP handle it

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Nav scroll effect ---
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // --- Hero entrance: stagger with slight rotation ---
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroEls = heroContent.querySelectorAll('.reveal');
    gsap.fromTo(heroEls,
      { opacity: 0, y: 50, rotateX: 10 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power4.out',
        delay: 0.3
      }
    );
  }

  // --- Hero: fade out + parallax as you scroll away ---
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '60% top',
        scrub: true
      }
    });
  }

  // --- Hero parallax glows ---
  const glows = document.querySelectorAll('.hero-glow');
  glows.forEach((glow, i) => {
    gsap.to(glow, {
      y: i % 2 === 0 ? -200 : 150,
      x: i % 2 === 0 ? 50 : -50,
      scale: 1.3,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // --- Reveal animations (enhanced with rotation) ---
  gsap.utils.toArray('.reveal').forEach((el) => {
    // Skip hero elements (handled separately)
    if (el.closest('.hero-content')) return;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-scale').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // --- Service cards: stagger with 3D tilt ---
  const serviceCards = gsap.utils.toArray('.service-card');
  if (serviceCards.length) {
    gsap.fromTo(serviceCards,
      { opacity: 0, y: 80, rotateY: 5 },
      {
        opacity: 1, y: 0, rotateY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Interactive tilt on hover
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  // --- Stats: counter with scale pop ---
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const obj = { val: 0 };
    const parent = counter.closest('.stat-item');
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onStart: () => {
        if (parent) {
          gsap.fromTo(parent, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
        }
      },
      onUpdate: () => {
        counter.textContent = Math.round(obj.val);
      }
    });
  });

  // --- Testimonials horizontal scroll (pinned) ---
  const track = document.getElementById('testimonialsTrack');
  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length) {
      const totalWidth = Array.from(cards).reduce((w, c) => w + c.offsetWidth + 24, 0);
      const scrollDistance = totalWidth - window.innerWidth + 48;

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.testimonials',
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Fade in each card as it enters view
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1, scale: 1,
            scrollTrigger: {
              trigger: '.testimonials',
              start: `top+=${i * (scrollDistance / cards.length)} top`,
              end: `top+=${(i + 0.5) * (scrollDistance / cards.length)} top`,
              scrub: true
            }
          }
        );
      });
    }
  }

  // --- Service detail sections: parallax visuals ---
  gsap.utils.toArray('.service-visual').forEach((visual) => {
    gsap.fromTo(visual,
      { y: 60 },
      {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: visual,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  // --- Timeline items stagger (about page) ---
  const timelineItems = gsap.utils.toArray('.timeline-item');
  if (timelineItems.length) {
    timelineItems.forEach((item) => {
      const dot = item.querySelector('.timeline-dot');
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      if (dot) {
        gsap.fromTo(dot,
          { scale: 0, background: 'var(--bg)' },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }

  // --- Value cards: stagger with pop ---
  const valueCards = gsap.utils.toArray('.value-card');
  if (valueCards.length) {
    gsap.fromTo(valueCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // --- CTA box: glow pulse on scroll ---
  const ctaBox = document.querySelector('.cta-box');
  if (ctaBox) {
    gsap.to(ctaBox, {
      boxShadow: '0 0 80px rgba(108, 99, 255, 0.15), 0 0 160px rgba(0, 212, 170, 0.08)',
      scrollTrigger: {
        trigger: ctaBox,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }
    });
  }

  // --- Magnetic cursor effect on buttons ---
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // --- Smooth section transitions: slight zoom on scroll-in ---
  gsap.utils.toArray('section').forEach(section => {
    if (section.classList.contains('hero') || section.classList.contains('stats') || section.classList.contains('testimonials')) return;
    const container = section.querySelector('.container');
    if (!container) return;
    gsap.fromTo(container,
      { scale: 0.97 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 40%',
          scrub: true
        }
      }
    );
  });

  // --- Hero background fade on scroll ---
  const heroBackgrounds = document.querySelectorAll('.gradient-mesh, .hero-video-wrap');
  heroBackgrounds.forEach(el => {
    gsap.to(el, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '80% top',
        scrub: true
      }
    });
  });

  // --- Floating shapes parallax ---
  gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
    const speed = 30 + (i % 4) * 20; // 30-90px range
    const rotation = 10 + (i % 3) * 15; // 10-40deg range
    gsap.to(shape, {
      y: -speed,
      rotation: rotation,
      ease: 'none',
      scrollTrigger: {
        trigger: shape.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // --- Cursor glow follow ---
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('active');
      gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }

  // --- Page load fade-in ---
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
});
