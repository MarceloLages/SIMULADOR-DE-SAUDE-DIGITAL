/* Montagem, cópia e impressão da ficha diagnóstica. */
const questions = [
  ["O que surpreendeu / atividades substituídas", "q1"],
  ["Impacto na autoestima e no foco", "q2"],
  ["Papel do design das plataformas", "q3"],
  ["Compromisso de atitude saudável", "q4"]
];

export function buildReport(result, values) {
  const answer = (id) => values[id]?.trim() || "(Não respondido)";
  return `FICHA DIAGNÓSTICA — CULTURA DIGITAL (EM13CO24)
============================================================

TEMPO E HÁBITOS
• Tempo diário total: ${result.totalDia.toFixed(1)}h (${result.totalSemana.toFixed(1)}h/semana | aproximadamente ${result.diasInteirosAno} dias inteiros/ano)
• Divisão: Estudo (${result.estudo.toFixed(1)} h) | Redes sociais (${result.redes.toFixed(1)} h) | Jogos/vídeos (${result.lazer.toFixed(1)} h)
• Uso antes de dormir: ${result.sono} min
• Classificação educativa: ${result.classification}
• Distribuição: Estudo ${result.pctProdutivo}% | Redes + lazer ${result.pctLazer}%

REFLEXÕES DO ESTUDANTE
${questions.map(([label, id], index) => `${index + 1}. ${label}: ${answer(id)}`).join("\n\n")}

Observação: esta ficha registra uma autoavaliação pedagógica. Não constitui diagnóstico médico ou psicológico.`;
}

export async function copyReport(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand("copy");
  helper.remove();
  if (!copied) throw new Error("A cópia não foi autorizada pelo navegador.");
}

export function printReport() {
  window.print(); // Na janela de impressão, selecionar “Salvar como PDF”.
}
