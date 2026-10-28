const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navigationLinks = navigation.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#current-year");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

year.textContent = String(new Date().getFullYear());

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

if ("IntersectionObserver" in window) {
  if (!reducedMotion) {
    document.documentElement.classList.add("has-motion");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const currentLink = navigation.querySelector(`a[href="#${entry.target.id}"]`);
      navigation.querySelectorAll("[aria-current]").forEach((link) => link.removeAttribute("aria-current"));
      currentLink?.setAttribute("aria-current", "location");
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
