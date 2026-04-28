document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    const tryPlay = () => {
      heroVideo.play().catch(() => {
        document.addEventListener("click", () => heroVideo.play().catch(() => {}), { once: true });
        document.addEventListener("touchstart", () => heroVideo.play().catch(() => {}), { once: true });
      });
    };

    if (heroVideo.readyState >= 2) {
      tryPlay();
    } else {
      heroVideo.addEventListener("canplay", tryPlay, { once: true });
    }
  }

  document.querySelectorAll("[data-scroll-to]").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(anchor.getAttribute("data-scroll-to"));
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 71.5, behavior: "smooth" });
      }
    });
  });
});
