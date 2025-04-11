// static/js/animations.js

// Make sure anime.js is loaded
if (typeof anime === 'undefined') {
  console.error('Anime.js is not loaded. Please include the library.');
}

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // 1. Animated Hero Section with Particles
  // ============================================================
  const createParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.inset = '0';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '0';

    // Insert particle container as the first child of hero section
    heroSection.insertBefore(particleContainer, heroSection.firstChild);

    const particleCount = window.innerWidth < 768 ? 30 : 60;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(42, 252, 231, 0.7)'; // Teal color
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.pointerEvents = 'none';

      particleContainer.appendChild(particle);
    }

    // Animate particles
    anime({
      targets: '.particle',
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      opacity: [0.2, 0.8],
      scale: () => anime.random(0.5, 2),
      easing: 'easeInOutQuad',
      duration: () => anime.random(2000, 4000),
      delay: () => anime.random(0, 1000),
      loop: true,
      direction: 'alternate',
    });
  };

  // Animated text reveal for hero heading
  const animateHeroText = () => {
    const heroHeading = document.querySelector('.hero-heading');
    if (!heroHeading) return;

    // Split text into spans for each letter
    const textWrapper = heroHeading.querySelector('.text-gradient');
    if (!textWrapper) return;

    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline()
      .add({
        targets: '.hero-heading .letter',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
      });
  };

  // ============================================================
  // 2. Scroll-Driven Animations
  // ============================================================
  const initScrollAnimations = () => {
    // Initialize Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const animation = target.getAttribute('data-animation');

          switch (animation) {
            case 'fadeInUp':
              anime({
                targets: target,
                opacity: [0, 1],
                translateY: [50, 0],
                easing: 'easeOutQuad',
                duration: 800,
                delay: target.getAttribute('data-delay') || 0
              });
              break;

            case 'fadeInRight':
              anime({
                targets: target,
                opacity: [0, 1],
                translateX: [-50, 0],
                easing: 'easeOutQuad',
                duration: 800,
                delay: target.getAttribute('data-delay') || 0
              });
              break;

            case 'fadeInLeft':
              anime({
                targets: target,
                opacity: [0, 1],
                translateX: [50, 0],
                easing: 'easeOutQuad',
                duration: 800,
                delay: target.getAttribute('data-delay') || 0
              });
              break;

            case 'scaleIn':
              anime({
                targets: target,
                opacity: [0, 1],
                scale: [0.8, 1],
                easing: 'easeOutQuad',
                duration: 800,
                delay: target.getAttribute('data-delay') || 0
              });
              break;

            case 'staggered':
              const children = target.querySelectorAll('.stagger-item');
              anime({
                targets: children,
                opacity: [0, 1],
                translateY: [20, 0],
                easing: 'easeOutQuad',
                duration: 600,
                delay: anime.stagger(100)
              });
              break;
          }

          // Unobserve after animation
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Add data-animation attributes to elements
    document.querySelectorAll('.about-content').forEach(el => {
      el.setAttribute('data-animation', 'fadeInRight');
      observer.observe(el);
    });

    document.querySelectorAll('.skills-card').forEach((el, i) => {
      el.setAttribute('data-animation', 'scaleIn');
      el.setAttribute('data-delay', i * 100);
      observer.observe(el);
    });

    document.querySelectorAll('.experience-item').forEach(el => {
      el.setAttribute('data-animation', 'fadeInUp');
      observer.observe(el);
    });

    document.querySelectorAll('.project-card').forEach((el, i) => {
      el.setAttribute('data-animation', 'fadeInUp');
      el.setAttribute('data-delay', i * 100);
      observer.observe(el);
    });

    document.querySelectorAll('.education-card').forEach((el, i) => {
      el.setAttribute('data-animation', 'fadeInLeft');
      el.setAttribute('data-delay', i * 150);
      observer.observe(el);
    });

    // For staggered list items
    document.querySelectorAll('.staggered-container').forEach(el => {
      el.setAttribute('data-animation', 'staggered');
      observer.observe(el);
    });
  };

  // ============================================================
  // 3. Interactive Project Cards
  // ============================================================
  const initProjectCardAnimations = () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      // Create overlay element for hover effect
      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      overlay.style.position = 'absolute';
      overlay.style.inset = '0';
      overlay.style.background = 'linear-gradient(to bottom, rgba(20, 184, 166, 0.9), rgba(37, 99, 235, 0.9))';
      overlay.style.opacity = '0';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.padding = '1.5rem';
      overlay.style.zIndex = '10';
      overlay.style.transition = 'opacity 0.3s ease';

      // Details content
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;

      // Create project details for overlay
      const detailsTitle = document.createElement('h4');
      detailsTitle.textContent = 'Project Details';
      detailsTitle.className = 'text-white text-xl font-bold mb-4';

      const detailsDesc = document.createElement('p');
      detailsDesc.textContent = desc;
      detailsDesc.className = 'text-white text-sm mb-6';

      const detailsBtn = document.createElement('a');
      detailsBtn.textContent = 'View Project';
      detailsBtn.href = '#'; // Set actual link
      detailsBtn.className = 'px-4 py-2 bg-white text-teal-600 rounded-full text-sm font-medium hover:bg-teal-50 transition-all';

      overlay.appendChild(detailsTitle);
      overlay.appendChild(detailsDesc);
      overlay.appendChild(detailsBtn);

      // Ensure card has relative positioning for absolute overlay
      card.style.position = 'relative';
      card.style.overflow = 'hidden';

      // Add overlay to card
      card.appendChild(overlay);

      // Add event listeners
      card.addEventListener('mouseenter', () => {
        anime({
          targets: overlay,
          opacity: 1,
          translateY: [20, 0],
          easing: 'easeOutQuad',
          duration: 300
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: overlay,
          opacity: 0,
          translateY: [0, 10],
          easing: 'easeInQuad',
          duration: 300
        });
      });
    });
  };

  // ============================================================
  // 4. Page Transitions and Loader
  // ============================================================
  const setupPageTransitions = () => {
    // Create page loader
    const loaderContainer = document.createElement('div');
    loaderContainer.id = 'page-loader';
    loaderContainer.style.position = 'fixed';
    loaderContainer.style.top = '0';
    loaderContainer.style.left = '0';
    loaderContainer.style.width = '100%';
    loaderContainer.style.height = '100%';
    loaderContainer.style.display = 'flex';
    loaderContainer.style.justifyContent = 'center';
    loaderContainer.style.alignItems = 'center';
    loaderContainer.style.backgroundColor = '#1f2937'; // Gray-800
    loaderContainer.style.zIndex = '9999';

    // Add logo or spinner to loader
    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';
    spinner.innerHTML = `
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#14b8a6" stroke-width="4" stroke-dasharray="60 20"></circle>
      </svg>
    `;

    loaderContainer.appendChild(spinner);
    document.body.appendChild(loaderContainer);

    // Animate the loader on page load
    anime({
      targets: '#page-loader circle',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: 300,
      direction: 'alternate',
      loop: true
    });

    // Hide loader after page is fully loaded
    window.addEventListener('load', () => {
      anime({
        targets: '#page-loader',
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutQuad',
        complete: function() {
          loaderContainer.style.display = 'none';
        }
      });
    });

    // Setup section transitions
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Scroll animation
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });

        // Animate target section
        anime({
          targets: targetSection,
          opacity: [0.5, 1],
          translateY: [20, 0],
          duration: 800,
          easing: 'easeOutQuad'
        });
      });
    });
  };

  // ============================================================
  // Initialize all animations
  // ============================================================
  const initAnimations = () => {
    createParticles();
    animateHeroText();
    initScrollAnimations();
    initProjectCardAnimations();
    setupPageTransitions();

    // Add parallax effect for background elements
    document.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Parallax for hero section
      const heroElements = document.querySelectorAll('.parallax');
      heroElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.1;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  };

  // Initialize when document is ready
  initAnimations();
});