/* Motor de cálculo. Os limites e fórmulas reproduzem o simulador original. */
export const DEFAULTS = Object.freeze({ estudo: 2, redes: 2.5, lazer: 1.5, sono: 45 });

export function calculate(values) {
  const estudo = Number(values.estudo);
  const redes = Number(values.redes);
  const lazer = Number(values.lazer);
  const sono = Number(values.sono);

  const totalDia = estudo + redes + lazer;
  const totalSemana = totalDia * 7;
  const horasAno = totalDia * 365;
  const diasInteirosAno = Math.round(horasAno / 24);
  const recreativo = redes + lazer;

  let pctProdutivo = 0;
  let pctLazer = 0;
  if (totalDia > 0) {
    pctProdutivo = Math.round((estudo / totalDia) * 100);
    pctLazer = 100 - pctProdutivo;
  }

  let classification;
  let feedback;
  let level;
  if (recreativo <= 2.5 && totalDia <= 5) {
    classification = "Uso Equilibrado";
    feedback = "Seu tempo recreativo em telas está próximo da referência educativa adotada no simulador (até 2h–3h por dia de lazer). Isso pode favorecer o sono, a atividade física e o convívio presencial.";
    level = "balanced";
  } else if (recreativo <= 5 || totalDia <= 8) {
    classification = "Zona de Atenção";
    feedback = `Você passa ${recreativo.toFixed(1)}h diárias em redes e entretenimento (${diasInteirosAno} dias inteiros por ano no total). Vale observar se esse hábito está causando cansaço visual, sedentarismo ou distração nos estudos.`;
    level = "warning";
  } else {
    classification = "Uso Intenso";
    feedback = `Com ${totalDia.toFixed(1)}h por dia (${diasInteirosAno} dias completos de 24h ao longo de um ano!), há possibilidade de sobrecarga. Observe sono, postura, bem-estar e convívio social. Que tal testar pausas programadas?`;
    level = "danger";
  }

  return {
    estudo, redes, lazer, sono, recreativo, totalDia, totalSemana,
    horasAno, diasInteirosAno, pctProdutivo, pctLazer,
    classification, feedback, level, sleepAlert: sono >= 30
  };
}

export function formatHours(value) {
  return `${value.toFixed(1).replace(".", ",")}h`;
}
