const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(
  "main > section, .story, .value, .project, .social-card, .section-block, .contact-card, .info-box, .cta-dark, .cta-light"
);

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!motionReduced && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach(target => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}

document.querySelectorAll("img").forEach(image => {
  image.decoding = "async";
  if (image.complete) {
    image.classList.add("is-loaded");
  } else {
    image.classList.add("is-loading");
    image.addEventListener(
      "load",
      () => {
        image.classList.remove("is-loading");
        image.classList.add("is-loaded");
      },
      { once: true }
    );
  }
});

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.textContent = "↑";
document.body.appendChild(backToTop);

const updateBackToTop = () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 600);
};

updateBackToTop();
window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: motionReduced ? "auto" : "smooth" });
});
