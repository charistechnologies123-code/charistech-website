// ============================================
// CHARIS TECHNOLOGIES - MAIN JAVASCRIPT
// Handles Navigation, Interactions, and Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;
  
  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
  }
  
  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (hamburger && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburger || !navMenu) return;

    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
  
  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (!navbar) return;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ============================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ============================================
  
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === '/' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveNavLink();
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // PROMO BANNER: dismiss & remember state
  // ============================================
  (function handlePromoBanner(){
    const promo = document.querySelector('.promo-banner');
    if (!promo) return;
    const promoClose = promo.querySelector('.promo-close');

    promoClose?.addEventListener('click', () => {
      promo.style.display = 'none';
    });
  })();
  
  // ============================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, .section-header, .contact-item').forEach(el => {
      observer.observe(el);
    });

    // Observe counters
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'));
      
      observer.observe(counter);
      counter.addEventListener('animationstart', function() {
        animateCounter(counter, target);
      }, { once: true });
    });
  }
  
  // ============================================
  // TESTIMONIAL CAROUSEL (if multiple testimonials)
  // ============================================
  
 // ============================================
// TESTIMONIAL SLIDER: Prev/Next + Dots + Swipe
// ============================================

const slider = document.querySelector('.testimonials-slider');
if (slider) {
  const viewport = slider.querySelector('.testimonials-viewport');
  const cards = Array.from(slider.querySelectorAll('.testimonial-card'));
  const prevBtn = slider.querySelector('.testimonial-btn.prev');
  const nextBtn = slider.querySelector('.testimonial-btn.next');
  const dotsWrap = slider.querySelector('.testimonials-dots');

  let index = 0;
  let autoId = null;
  const AUTO_MS = 6000;

  // Initialize
  cards.forEach((c, i) => c.classList.toggle('is-active', i === 0));
  updateAriaLabels();
  buildDots();
  setActiveDot(0);

  function show(i) {
    if (cards.length === 0) return;
    const nextIndex = (i + cards.length) % cards.length;

    cards[index].classList.remove('is-active');
    cards[nextIndex].classList.add('is-active');

    index = nextIndex;
    setActiveDot(index);
    updateAriaLabels();
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  // Dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';

    cards.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'testimonial-dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

      btn.addEventListener('click', () => {
        stopAuto();
        show(i);
      });

      dotsWrap.appendChild(btn);
    });
  }

  function setActiveDot(activeIndex) {
    if (!dotsWrap) return;
    const dots = Array.from(dotsWrap.querySelectorAll('.testimonial-dot'));
    dots.forEach((d, i) => d.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false'));
  }

  // Update "x of y" labels for screen readers
  function updateAriaLabels() {
    cards.forEach((card, i) => {
      card.setAttribute('aria-label', `${i + 1} of ${cards.length}`);
    });
  }

  // Buttons
  prevBtn?.addEventListener('click', () => { stopAuto(); prev(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); next(); });

  // Keyboard support on viewport
  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); stopAuto(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); stopAuto(); next(); }
  });

  // Auto-rotate (optional, modern behavior: pause on interaction)
  function startAuto() {
    if (cards.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (autoId) return;
    autoId = window.setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    if (!autoId) return;
    window.clearInterval(autoId);
    autoId = null;
  }

  // Pause on hover/focus (modern UX)
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  // Swipe support (mobile)
  let startX = 0;
  let isTouching = false;

  viewport?.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewport?.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      stopAuto();
      if (diff > 0) prev();
      else next();
    }
  }, { passive: true });

  // Start auto by default (remove this line if you want manual-only)
  startAuto();
}
  
 


// ============================================
// GALLERY LIGHTBOX (Modern Viewer: nav + keys + swipe + caption + focus)
// ============================================

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.querySelector('.gallery-lightbox');

if (galleryItems.length && lightbox) {
  const lbImg = lightbox.querySelector('.gallery-lightbox__img');
  const lbCaption = lightbox.querySelector('.gallery-lightbox__caption');
  const lbCounter = lightbox.querySelector('.gallery-lightbox__counter');
  const btnPrev = lightbox.querySelector('.gallery-lightbox__prev');
  const btnNext = lightbox.querySelector('.gallery-lightbox__next');
  const closeBtns = Array.from(lightbox.querySelectorAll('[data-close]'));
  const dialog = lightbox.querySelector('.gallery-lightbox__dialog');

  // Build a clean data list from the DOM
  const images = galleryItems.map((item) => {
    const img = item.querySelector('img');
    const overlayText = item.querySelector('.gallery-overlay p')?.textContent?.trim() || '';
    const caption = img?.getAttribute('data-caption') || overlayText || img?.alt || '';
    return {
      src: img?.src || '',
      alt: img?.alt || '',
      caption
    };
  }).filter(x => x.src);

  let currentIndex = 0;
  let lastFocusedEl = null;

  // Focus trap elements
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return Array.from(lightbox.querySelectorAll(focusableSelector))
      .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function preload(idx) {
    const i = (idx + images.length) % images.length;
    const pre = new Image();
    pre.src = images[i].src;
  }

  function render(idx) {
    currentIndex = (idx + images.length) % images.length;
    const item = images[currentIndex];

    lbImg.src = item.src;
    lbImg.alt = item.alt || 'Gallery image';
    lbCaption.textContent = item.caption || '';
    lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;

    // Preload neighbors for smoother nav
    preload(currentIndex + 1);
    preload(currentIndex - 1);
  }

  function openAt(idx) {
    lastFocusedEl = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    render(idx);

    // Move focus into the dialog (close button first is common)
    const focusables = getFocusable();
    (focusables[0] || dialog).focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  function next() { render(currentIndex + 1); }
  function prev() { render(currentIndex - 1); }

  // Click any gallery item to open
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openAt(idx));
  });

  // Controls
  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);
  closeBtns.forEach(btn => btn.addEventListener('click', close));

  // Keyboard navigation + focus trap
  lightbox.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
      return;
    }

    // Focus trap: Tab cycles inside lightbox
    if (e.key === 'Tab') {
      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Swipe support (mobile)
  let startX = 0;
  let isTouching = false;

  dialog.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  dialog.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) next();
      else prev();
    }
  }, { passive: true });
}







// ============================================
// HOMEPAGE GALLERY PREVIEW: show only first 6
// ============================================
const homeGallery = document.querySelector('#home-gallery');
if (homeGallery) {
  const items = Array.from(homeGallery.querySelectorAll('.gallery-item'));
  const INITIAL = 6;

  items.forEach((item, idx) => {
    if (idx >= INITIAL) item.style.display = 'none';
  });
}

  // ============================================
  // CONTACT FORM PREFILL FROM CTA LINKS
  // ============================================

  const params = new URLSearchParams(window.location.search);
  const programParam = params.get('program');
  const serviceParam = params.get('service');








  // ============================================
  // FORM VALIDATION
  // ============================================
  
  const contactForm = document.querySelector('.contact-form form');
  // Program details are filtered client-side so one page can serve multiple programs.
  const detailSections = Array.from(document.querySelectorAll('.program-detail-section'));
  const programDetailsEmpty = document.querySelector('.program-details-empty');
  
  if (contactForm) {
    const subjectField = contactForm.querySelector('[name="subject"]');
    const messageField = contactForm.querySelector('[name="message"]');

    if (subjectField && programParam) {
      subjectField.value = 'program';
    } else if (subjectField && serviceParam) {
      subjectField.value = 'service';
    }

    if (messageField && !messageField.value.trim()) {
      if (programParam) {
        messageField.value = `Hello, I would like to learn more about the ${formatInquiryLabel(programParam)} program.`;
      } else if (serviceParam) {
        messageField.value = `Hello, I would like to get started with your ${formatInquiryLabel(serviceParam)} service.`;
      }
    }

    contactForm.addEventListener('submit', function(e) {
      // Get form fields
      const name = this.querySelector('[name="name"]');
      const email = this.querySelector('[name="email"]');
      const message = this.querySelector('[name="message"]');
      
      let isValid = true;
      
      // Simple validation
      if (!name || name.value.trim() === '') {
        showError(name, 'Please enter your name');
        isValid = false;
      }
      
      if (!email || !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      if (!message || message.value.trim() === '') {
        showError(message, 'Please enter a message');
        isValid = false;
      }
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  if (detailSections.length) {
    // Accept either ?program=... or a legacy hash so older links keep working.
    const selectedProgram = params.get('program') || window.location.hash.replace('#', '');
    const defaultSection = detailSections[0];
    const targetSection = selectedProgram
      ? detailSections.find(section => section.id === selectedProgram)
      : defaultSection;

    // Hide every other section so only the requested program is visible.
    detailSections.forEach(section => {
      const shouldShow = targetSection ? section.id === targetSection.id : false;
      section.hidden = !shouldShow;
    });

    if (programDetailsEmpty) {
      programDetailsEmpty.hidden = !!targetSection;
    }

    if (targetSection) {
      document.title = `${targetSection.querySelector('h1')?.textContent?.trim() || 'Program Details'} - Charis Technologies`;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }
  
  function showError(field, message) {
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ff4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    
    field.parentElement.appendChild(error);
    field.style.borderColor = '#ff4444';
    
    // Remove error on input
    field.addEventListener('input', function() {
      error.remove();
      field.style.borderColor = '';
    }, { once: true });
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function formatInquiryLabel(value) {
    return value
      .split('-')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
  
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    successDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(function() {
      successDiv.style.animation = 'fadeOut 0.5s ease';
      setTimeout(function() {
        successDiv.remove();
      }, 500);
    }, 3000);
  }
  
  // ============================================
  // COUNTER ANIMATION (for stats if needed)
  // ============================================
  
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(function() {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }
  
  // ============================================
  // PROGRAM DETAILS MODAL/EXPANSION
  // ============================================
  
  const learnMoreButtons = document.querySelectorAll('[data-program-id]');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const programId = this.getAttribute('data-program-id');
      
      // Navigate to expanded program page with hash
      window.location.href = `program-details.html#${programId}`;
    });
  });
  
  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #8b2fc9 0%, #e91e63 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(backToTopBtn);

  // Global WhatsApp quick-action shown on every page.
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/2349010869268';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.className = 'floating-whatsapp';
  whatsappBtn.setAttribute('aria-label', 'Chat with Charis Technologies on WhatsApp');
  whatsappBtn.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';

  document.body.appendChild(whatsappBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
  
  // ============================================
  // LOADING ANIMATION (Optional)
  // ============================================
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ============================================
  // ENHANCED BUTTON INTERACTIVITY
  // ============================================

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      // Remove previous ripples
      const prevRipple = this.querySelector('.ripple');
      if (prevRipple) prevRipple.remove();

      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // CARD HOVER EFFECTS
  // ============================================

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
    });

    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (y - 0.5) * 5;
      const rotateY = (x - 0.5) * -5;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // ============================================
  // SCROLL ANIMATIONS FOR TECH ICONS
  // ============================================

  const techIcons = document.querySelectorAll('.tech-icon, .path-icon');
  const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pulse-icon');
      }
    });
  }, { threshold: 0.5 });

  techIcons.forEach(icon => iconObserver.observe(icon));

  // ============================================
  // STAGGERED CARD ANIMATION ON LOAD
  // ============================================

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // ============================================
  // INTERACTIVE TEXT GRADIENT ON HOVER
  // ============================================

  document.querySelectorAll('.text-gradient').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.animation = 'gradientShift 0.6s ease';
    });
  });

  // ============================================
  // ENHANCED FORM FOCUS EFFECTS
  // ============================================

  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
      this.parentElement.style.transition = 'all 0.2s ease';
    });

    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  console.log('Charis Technologies - Website Loaded Successfully! 🚀');
});
