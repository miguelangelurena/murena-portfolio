// Enhanced scroll behavior for nav
window.addEventListener("scroll", function () {
  const navList = document.querySelector("nav ul");
  if (window.scrollY > 50) {
    navList.classList.add("scrolled");
  } else {
    navList.classList.remove("scrolled");
  }
});

// Smooth scrolling with offset
document.querySelectorAll("nav a:not([href^='mailto:'])").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const offsetTop =
        targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active class handling based on scroll position
const navLinks = document.querySelectorAll("nav a:not([href^='mailto:'])");
const sections = Array.from(document.querySelectorAll("section")).filter(
  (section) => section.id
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  },
  { threshold: 0.3, rootMargin: "0px 0px -40% 0px" }
);

sections.forEach((section) => observer.observe(section));

// Scroll-triggered animations
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe all elements with animation classes
document.addEventListener("DOMContentLoaded", function () {
  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .timeline-item, .skills-column"
  );

  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });

  // Add animation classes to elements
  document.querySelectorAll(".timeline-item").forEach((el) => {
    el.classList.add("fade-in-left");
  });

  document.querySelectorAll(".skills-column").forEach((el) => {
    el.classList.add("fade-in-up");
  });

  document.querySelectorAll(".project-card").forEach((el) => {
    el.classList.add("scale-in");
  });

  // Image loading animation
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });

  // Add hover effect to hero image
  const heroImage = document.querySelector(".hero-content img");
  if (heroImage) {
    heroImage.addEventListener("mouseenter", () => {
      heroImage.style.transform = "scale(1.05)";
    });

    heroImage.addEventListener("mouseleave", () => {
      heroImage.style.transform = "scale(1)";
    });
  }

  // Enhanced button click effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation keyframes via JavaScript
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
