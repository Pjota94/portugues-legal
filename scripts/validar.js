// Confere o banco de exercícios: formato, chaves de resposta, duplicatas e quantidades.
// Uso: node scripts/validar.js [topico]
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(raiz, "js/topicos.js"), "utf8") + "\nthis.TOPICOS=TOPICOS;this.EXERCICIOS=EXERCICIOS;", ctx);

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

for (const [t, c] of Object.entries(contagem)) {
  const total = Object.values(c).reduce((a, b) => a + b, 0);
  console.log(`${t}: ${total} frases`, c);
}
console.log(erros ? `\n${erros} problema(s) encontrado(s).` : "\nTudo certo.");
process.exit(erros ? 1 : 0);
