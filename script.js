// ============================
//  CLUB SHAWAYA - SCRIPT.JS
// ============================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Elements ----
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const orderBtn = document.getElementById('order-btn');
  const dropdown = document.getElementById('order-dropdown');
  const backdrop = document.getElementById('backdrop');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuGrids = document.querySelectorAll('.menu-grid');
  const animEls = document.querySelectorAll('[data-aos]');

  // ---- Sticky Header ----
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ---- Mobile Hamburger ----
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('active');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      // close order dropdown if open
      closeDropdown();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---- Order Now Dropdown ----
  function openDropdown() {
    dropdown.classList.add('open');
    orderBtn.classList.add('open');
    backdrop.classList.add('active');
    dropdown.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    orderBtn.classList.remove('open');
    backdrop.classList.remove('active');
    dropdown.setAttribute('aria-expanded', 'false');
  }

  orderBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
      closeMobileMenu();
    }
  });

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  backdrop.addEventListener('click', () => {
    closeDropdown();
    closeMobileMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      closeMobileMenu();
    }
  });

  // ---- Menu Category Tabs ----
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide grids
      menuGrids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.id === `cat-${category}`) {
          grid.classList.add('active');
          // Animate cards in
          const cards = grid.querySelectorAll('.menu-card');
          cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
        }
      });
    });
  });

  // ---- Scroll Animations (AOS-like) ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  animEls.forEach(el => observer.observe(el));

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 70;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.style.color = 'rgba(255,255,255,0.75)';
          link.style.background = 'none';
        });
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) {
          active.style.color = '#fff';
          active.style.background = 'rgba(255,255,255,0.18)';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Animate menu cards on initial load ----
  const firstGrid = document.querySelector('.menu-grid.active');
  if (firstGrid) {
    const cards = firstGrid.querySelectorAll('.menu-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + i * 100);
    });
  }

  // ---- Instagram grid card hover ripple effect ----
  document.querySelectorAll('.insta-card').forEach(card => {
    card.addEventListener('click', () => {
      window.open('https://www.instagram.com/club_shawaya', '_blank');
    });
  });

  /*
  // ---- Hero image parallax on mouse move ----
  const heroSection  = document.querySelector('.hero');
  const heroFoodImg  = document.getElementById('hero-food-img');

  if (heroSection && heroFoodImg) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const cx   = rect.width / 2;
      const cy   = rect.height / 2;
      const dx   = (e.clientX - rect.left - cx) / cx;
      const dy   = (e.clientY - rect.top - cy) / cy;
      heroFoodImg.style.transform = `translateY(${-18 + dy * -10}px) rotateY(${dx * 4}deg) rotateX(${dy * -4}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroFoodImg.style.transform = '';
      heroFoodImg.style.transition = 'transform 0.6s ease';
    });
  }
  */

  // ---- Auto-cycling Reviews for Mobile ----
  const reviews = document.querySelectorAll('.review-card');
  let currentReviewIndex = 0;
  let reviewInterval;

  function updateMobileReviews() {
    if (window.innerWidth <= 768) {
      reviews.forEach(card => card.classList.remove('show-mobile'));
      
      // Show two reviews starting from currentReviewIndex
      const first = currentReviewIndex;
      const second = (currentReviewIndex + 1) % reviews.length;
      
      reviews[first].classList.add('show-mobile');
      reviews[second].classList.add('show-mobile');
      
      currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    } else {
      // On desktop, ensure none have the mobile-only class or at least it doesn't interfere
      reviews.forEach(card => card.classList.remove('show-mobile'));
    }
  }

  function startReviewCycle() {
    if (reviewInterval) clearInterval(reviewInterval);
    if (window.innerWidth <= 768) {
      updateMobileReviews();
      reviewInterval = setInterval(updateMobileReviews, 5000);
    }
  }

  // Initial call and resize listener
  startReviewCycle();
  window.addEventListener('resize', () => {
    // Only restart if transition between mobile/desktop happened
    if (window.innerWidth <= 768) {
      if (!reviewInterval) startReviewCycle();
    } else {
      if (reviewInterval) {
        clearInterval(reviewInterval);
        reviewInterval = null;
        reviews.forEach(card => card.classList.remove('show-mobile'));
      }
    }
  });

});
