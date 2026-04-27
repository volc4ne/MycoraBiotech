const particles = document.querySelector(".hero-particles");
const revealItems = document.querySelectorAll(".reveal");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.documentElement.classList.add("has-reveal");

if (particles) {
  for (let i = 0; i < 34; i += 1) {
    const particle = document.createElement("span");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty("--duration", `${6 + Math.random() * 8}s`);
    particle.style.setProperty("--delay", `${Math.random() * -8}s`);
    particle.style.setProperty("--opacity", `${0.08 + Math.random() * 0.22}`);
    particles.appendChild(particle);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -70px 0px" }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

if (cursor && cursorRing && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let lastRingX = ringX;
  let lastRingY = ringY;
  let ringRot = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    const velX = ringX - lastRingX;
    const velY = ringY - lastRingY;
    ringRot += (Math.atan2(velY, velX) * 180) / Math.PI * 0.08;
    cursorRing.style.setProperty("--ring-rot", `${ringRot}deg`);
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    lastRingX = ringX;
    lastRingY = ringY;
    requestAnimationFrame(animateRing);
  };

  animateRing();

  document.querySelectorAll("a, button, input, textarea").forEach((node) => {
    node.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
    node.addEventListener("mouseleave", () => cursorRing.classList.remove("is-active"));
  });

  window.addEventListener("mousedown", () => cursorRing.classList.add("is-press"));
  window.addEventListener("mouseup", () => cursorRing.classList.remove("is-press"));
}
