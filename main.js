const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", (!expanded).toString());
  });
}

// Smooth Scrolling for internal links
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerEl = document.getElementById("header");
      const headerOffset = headerEl ? headerEl.offsetHeight : 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
      // Close mobile menu after clicking a link
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// Update Copyright Year
const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Intersection Observer for Fade-in Animations on Scroll
const sections = document.querySelectorAll(".fade-in-section");
if ("IntersectionObserver" in window) {
  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element is visible
  };
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // observerInstance.unobserve(entry.target); // Optional: stop observing after animation
        }
      });
    },
    observerOptions
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
} else {
  // Fallback for browsers that don't support IntersectionObserver
  sections.forEach((section) => {
    section.classList.add("is-visible");
  });
}

// Theme Toggle Functionality
const themeToggleButtons = [
  document.getElementById("theme-toggle"),
  document.getElementById("theme-toggle-mobile"),
].filter(Boolean); // Filter out nulls if an ID is not found
const sunIcons = [
  document.getElementById("theme-icon-sun"),
  document.getElementById("theme-icon-sun-mobile"),
].filter(Boolean);
const moonIcons = [
  document.getElementById("theme-icon-moon"),
  document.getElementById("theme-icon-moon-mobile"),
].filter(Boolean);
const body = document.body;

const applyTheme = (theme) => {
  body.classList.remove("light-theme", "dark-theme", "dark");
  if (theme === "light") {
    body.classList.add("light-theme");
    body.classList.remove("dark");
    sunIcons.forEach((icon) => icon.classList.add("hidden"));
    moonIcons.forEach((icon) => icon.classList.remove("hidden"));
  } else {
    body.classList.add("dark");
    body.classList.remove("light-theme");
    sunIcons.forEach((icon) => icon.classList.remove("hidden"));
    moonIcons.forEach((icon) => icon.classList.add("hidden"));
  }
  localStorage.setItem("theme", theme); // Save preference
};

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
});

// Apply saved theme on initial load, or default to dark
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "dark"); // Default to dark if no theme saved or invalid value
