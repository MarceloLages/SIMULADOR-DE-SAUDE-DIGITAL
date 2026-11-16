/* Inicialização e integração dos módulos da aplicação. */
import { DEFAULTS, calculate, formatHours } from "./simulator.js";
import { saveState, loadState, clearState } from "./storage.js";
import { initializeTheme } from "./theme.js";
import { buildReport, copyReport, printReport } from "./report.js";

const $ = (selector) => document.querySelector(selector);
const inputs = ["estudo", "redes", "lazer", "sono"];
const questionIds = ["q1", "q2", "q3", "q4"];
const toast = $("#toast");
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function readValues() {
  return Object.fromEntries([...inputs, ...questionIds].map(id => [id, $(`#${id}`).value]));
}

function restoreValues(state) {
  if (!state) return;
  [...inputs, ...questionIds].forEach(id => {
    if (state[id] !== undefined && $(`#${id}`)) $(`#${id}`).value = state[id];
  });
}

function render() {
  const values = readValues();
  const result = calculate(values);

  $("#val-estudo").textContent = `${Number(values.estudo).toFixed(1).replace(".", ",")} h`;
  $("#val-redes").textContent = `${Number(values.redes).toFixed(1).replace(".", ",")} h`;
  $("#val-lazer").textContent = `${Number(values.lazer).toFixed(1).replace(".", ",")} h`;
  $("#val-sono").textContent = `${values.sono} min`;

  $("#total-dia").textContent = formatHours(result.totalDia);
  $("#total-semana").textContent = formatHours(result.totalSemana);
  $("#dias-ano").textContent = result.diasInteirosAno;
  $("#pct-produtivo").textContent = `${result.pctProdutivo}%`;
  $("#pct-lazer").textContent = `${result.pctLazer}%`;
  $("#bar-produtivo").style.width = `${result.pctProdutivo}%`;
  $("#bar-lazer").style.width = `${result.pctLazer}%`;
  $("#feedback-box").className = `feedback-box ${result.level === "balanced" ? "" : result.level}`;
  $("#feedback-titulo").textContent = result.classification;
  $("#feedback-texto").textContent = result.feedback;
  $("#sleep-alert").hidden = !result.sleepAlert;

  saveState(values);
  return result;
}

function generateReport() {
  const result = render();
  const report = buildReport(result, readValues());
  $("#resumo-gerado").textContent = report;
  $("#report-section").hidden = false;
  $("#copy-status").textContent = "";
  $("#report-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetSimulation() {
  const confirmed = window.confirm("Deseja reiniciar a simulação e apagar as respostas salvas neste dispositivo?");
  if (!confirmed) return;
  Object.entries(DEFAULTS).forEach(([id, value]) => { $(`#${id}`).value = value; });
  questionIds.forEach(id => { $(`#${id}`).value = ""; });
  $("#report-section").hidden = true;
  $("#resumo-gerado").textContent = "";
  clearState();
  render();
  notify("Simulação reiniciada.");
}

function init() {
  initializeTheme($("#theme-toggle"));
  restoreValues(loadState());
  inputs.forEach(id => $(`#${id}`).addEventListener("input", render));
  questionIds.forEach(id => $(`#${id}`).addEventListener("input", () => saveState(readValues())));
  $("#generate-report").addEventListener("click", generateReport);
  $("#reset-simulation").addEventListener("click", resetSimulation);
  $("#copy-report").addEventListener("click", async () => {
    try {
      await copyReport($("#resumo-gerado").textContent);
      $("#copy-status").textContent = "Relatório copiado para a área de transferência.";
      notify("Relatório copiado.");
    } catch (error) {
      $("#copy-status").textContent = "Não foi possível copiar. Selecione e copie o texto manualmente.";
    }
  });
  $("#print-report").addEventListener("click", printReport);
  render();

  // Registra o service worker somente em contexto seguro (HTTPS ou localhost).
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Falha ao registrar o modo offline:", error));
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
