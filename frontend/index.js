document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-option");

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    let activeSection = null;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection = entry.target;
      }
    });

    if (activeSection) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href").slice(1) === activeSection.id) {
          link.classList.add("active");
        }
      });
    }
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  const hamburger = document.querySelector(".hamburger");
  document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".mobile-menu").classList.toggle("active");
  });
});
