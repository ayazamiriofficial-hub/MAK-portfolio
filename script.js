const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navigationLinks = navigation.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

year.textContent = String(new Date().getFullYear());

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const message = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    "",
    String(formData.get("message"))
  ].join("\n");
  const subject = `Portfolio enquiry from ${formData.get("name")}`;
  const mailto = `mailto:ayaz.amiriofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const emailLink = document.querySelector("#form-email-link");
  emailLink.href = mailto;
  emailLink.hidden = false;
  document.querySelector("#form-note").textContent = "Your message is ready. Choose “Continue in email app” to open a draft. Nothing is sent until you send it.";
  emailLink.focus();
});

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
