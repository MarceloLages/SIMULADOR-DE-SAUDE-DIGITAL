/* Alternância de tema com preferência salva no navegador. */
const THEME_KEY = "simulador-saude-digital-theme";

export function initializeTheme(button) {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || preferred, button);

  button.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "light";
    applyTheme(current === "dark" ? "light" : "dark", button);
  });
}

function applyTheme(theme, button) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  const dark = theme === "dark";
  button.setAttribute("aria-label", dark ? "Ativar tema claro" : "Ativar tema escuro");
  button.title = dark ? "Ativar tema claro" : "Ativar tema escuro";
  const label = button.querySelector(".theme-label");
  if (label) label.textContent = dark ? "Claro" : "Escuro";
}
