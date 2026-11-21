// Confere o banco de exercícios: formato, chaves de resposta, duplicatas e quantidades.
// Uso: node scripts/validar.js [topico]
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(raiz, "js/topicos.js"), "utf8") +
    "\nthis.TOPICOS=TOPICOS;this.EXERCICIOS=EXERCICIOS;this.ANALISES=ANALISES;this.TOPICOS_ANALISE=TOPICOS_ANALISE;this.localizarTermos=localizarTermos;",
  ctx
);

const filtro = process.argv[2];
const dir = path.join(raiz, "js/dados");
for (const arq of fs.readdirSync(dir).sort()) {
  if (filtro && arq !== filtro + ".js") continue;
  vm.runInContext(fs.readFileSync(path.join(dir, arq), "utf8"), ctx, { filename: arq });
}

let erros = 0;
const vistos = new Set();
const contagem = {};
for (const [i, ex] of ctx.EXERCICIOS.entries()) {
  if (filtro === "analise") break;
  const onde = `#${i} (${ex.topico}) "${ex.frase}"`;
  const top = ctx.TOPICOS[ex.topico];
  if (!top) { console.log("Tópico inválido:", onde); erros++; continue; }
  if (!top.opcoes[ex.resposta]) { console.log(`Resposta "${ex.resposta}" inválida:`, onde); erros++; }
  const alvos = (ex.frase.match(/\[[^\]]+\]/g) || []).length;
  if (alvos !== 1 || /[\[\]]/.test(ex.frase.replace(/\[[^\]]+\]/, ""))) { console.log("A frase deve ter exatamente um [trecho]:", onde); erros++; }
  if (!ex.explicacao || ex.explicacao.length < 20) { console.log("Explicação ausente ou curta:", onde); erros++; }
  const chave = ex.topico + "|" + ex.frase;
  if (vistos.has(chave)) { console.log("Duplicada:", onde); erros++; }
  vistos.add(chave);
  contagem[ex.topico] ??= {};
  contagem[ex.topico][ex.resposta] = (contagem[ex.topico][ex.resposta] || 0) + 1;
}

// ---------- Modo avançado (análise da frase) ----------
const frasesAnalise = new Set();
const contagemAnalise = {};
for (const [i, a] of ctx.ANALISES.entries()) {
  const onde = `análise #${i} "${a.frase}"`;
  if (!a.frase || /[\[\]]/.test(a.frase)) { console.log("Frase ausente ou com colchetes:", onde); erros++; }
  if (frasesAnalise.has(a.frase)) { console.log("Análise duplicada:", onde); erros++; }
  frasesAnalise.add(a.frase);
  if (!Array.isArray(a.termos) || a.termos.length < 2) { console.log("Precisa de pelo menos 2 termos:", onde); erros++; continue; }
  try { ctx.localizarTermos(a); } catch (e) { console.log(e.message); erros++; }
  let sujeitos = 0;
  for (const t of a.termos) {
    const [top, chave] = String(t.resposta).split(".");
    if (!ctx.TOPICOS_ANALISE.includes(top) || !ctx.TOPICOS[top]?.opcoes[chave]) {
      console.log(`Resposta "${t.resposta}" inválida:`, onde); erros++;
    }
    if (top === "sujeito") sujeitos++;
    if (t.sujeito && !["oculto", "indeterminado", "inexistente"].includes(chave)) {
      console.log("Sujeito sem trecho deve ser oculto, indeterminado ou inexistente:", onde); erros++;
    }
    if (!t.sujeito && top === "sujeito" && !["simples", "composto"].includes(chave)) {
      console.log("Sujeito com trecho deve ser simples ou composto:", onde); erros++;
    }
    if (!t.explicacao || t.explicacao.length < 20) { console.log("Explicação ausente ou curta:", onde, t.trecho || "(sujeito)"); erros++; }
    contagemAnalise[t.resposta] = (contagemAnalise[t.resposta] || 0) + 1;
  }
  if (sujeitos !== 1) { console.log(`Deve ter exatamente 1 termo de sujeito (tem ${sujeitos}):`, onde); erros++; }
}
if (ctx.ANALISES.length) console.log(`análise: ${ctx.ANALISES.length} frases`, contagemAnalise);

for (const [t, c] of Object.entries(contagem)) {
  const total = Object.values(c).reduce((a, b) => a + b, 0);
  console.log(`${t}: ${total} frases`, c);
}
console.log(erros ? `\n${erros} problema(s) encontrado(s).` : "\nTudo certo.");
process.exit(erros ? 1 : 0);
