/* Persistência local: nenhuma informação é enviada a um servidor. */
const STORAGE_KEY = "simulador-saude-digital-v1";

export function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (error) { console.warn("Não foi possível salvar os dados localmente.", error); }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Não foi possível recuperar os dados locais.", error);
    return null;
  }
}

export function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); }
  catch (error) { console.warn("Não foi possível limpar os dados locais.", error); }
}
