/* ============================================
   DECA DIGITAL — Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

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

  // --- Reveal animations ---
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
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
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
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
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // --- Service cards stagger ---
  const serviceCards = gsap.utils.toArray('.service-card');
  if (serviceCards.length) {
    gsap.fromTo(serviceCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // --- Counter animation ---
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        counter.textContent = Math.round(obj.val);
      }
    });
  });

  // --- Testimonials horizontal scroll ---
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
    }
  }

  // --- Hero parallax glows ---
  const glows = document.querySelectorAll('.hero-glow');
  glows.forEach((glow, i) => {
    gsap.to(glow, {
      y: i % 2 === 0 ? -100 : 100,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // --- Hero text stagger entrance ---
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroEls = heroContent.querySelectorAll('.reveal');
    gsap.fromTo(heroEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }

  // --- Timeline items stagger (about page) ---
  const timelineItems = gsap.utils.toArray('.timeline-item');
  if (timelineItems.length) {
    timelineItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Animate the timeline line
    const timelineLine = document.querySelector('.timeline::before');
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      gsap.fromTo(timeline,
        { '--line-height': '0%' },
        {
          '--line-height': '100%',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );
    }
  }

  // --- Smooth anchor scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });
  });

  // --- Page load fade-in ---
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
});
