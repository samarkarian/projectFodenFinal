document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }
  }

  // Appliquer le thème sauvegardé au chargement
  applyTheme(localStorage.getItem("theme") || "dark");

  toggle.addEventListener("click", () => {
    const isLight = html.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
});
