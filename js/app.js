(function () {
  "use strict";

  const CHAVE_TOPICOS = "portugues-legal:topicos";
  const CHAVE_QTD = "portugues-legal:quantidade";
  const CHAVE_HISTORICO = "portugues-legal:historico";
  const MAX_SUGESTOES = 8;
  const MAX_PERGUNTAS = 500;
  const LIMITE_BOM = 0.8; // a partir de 80% de acerto, é ponto forte
  const LIMITE_MELHORAR = 0.6; // abaixo de 60%, precisa melhorar

  const $ = (sel) => document.querySelector(sel);

  const telas = {
    config: $("#tela-config"),
    treino: $("#tela-treino"),
    relatorio: $("#tela-relatorio"),
  };
  const listaTopicos = $("#lista-topicos");
  const inputQtd = $("#qtd-perguntas");
  const infoQtd = $("#info-qtd");
  const avisoConfig = $("#aviso-config");
  const perguntaEl = $("#pergunta");
  const fraseEl = $("#frase");
  const form = $("#form-resposta");
  const input = $("#resposta");
  const listaSugestoes = $("#sugestoes");
  const btnResponder = $("#btn-responder");
  const btnNaoSei = $("#btn-nao-sei");
  const btnProxima = $("#btn-proxima");
  const feedback = $("#feedback");
  const cronometroEl = $("#cronometro");
  const placarAcertos = $("#placar-acertos");
  const placarErros = $("#placar-erros");
  const progresso = $("#progresso");
  const progressoBarra = $("#progresso-barra");

  // Estado da sessão
  let selecionados = [];
  let sessao = null; // { perguntas, indice, respostas, inicio, fim, topicos }
  let atual = null;
  let respondida = false;
  let inicioPergunta = 0;
  let relogio = null;

  // ---------- utilidades ----------

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function formatarTempo(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const seg = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${seg}` : `${m}:${seg}`;
  }

  function formatarSegundos(ms) {
    const s = ms / 1000;
    return s < 60 ? s.toFixed(s < 10 ? 1 : 0).replace(".", ",") + "s" : formatarTempo(ms);
  }

  function pct(a, t) {
    return t ? Math.round((a / t) * 100) : 0;
  }

  function lerStorage(chave, padrao) {
    try {
      const v = JSON.parse(localStorage.getItem(chave));
      return v ?? padrao;
    } catch (_) {
      return padrao;
    }
  }

  function gravarStorage(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (_) {}
  }

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  function mostrarTela(nome) {
    for (const [k, t] of Object.entries(telas)) t.hidden = k !== nome;
    window.scrollTo(0, 0);
  }

  function rotulo(topico, chave) {
    return TOPICOS[topico].opcoes[chave].rotulo;
  }

  function rotuloCurto(topico, chave) {
    return rotulo(topico, chave).replace(/\s*\(.*?\)/, "");
  }

  // Índice de todas as respostas possíveis: cada classificação com as formas aceitas.
  const RESPOSTAS = [];
  for (const [topico, info] of Object.entries(TOPICOS)) {
    for (const [chave, op] of Object.entries(info.opcoes)) {
      const formas = new Set([
        normalizar(op.rotulo),
        normalizar(op.rotulo.replace(/\(.*?\)/g, "")),
        ...op.aceitas.map(normalizar),
      ]);
      RESPOSTAS.push({ topico, chave, rotulo: op.rotulo, formas: [...formas] });
    }
  }

  // Descobre qual classificação o usuário escreveu.
  // Em caso de empate entre tópicos, dá preferência ao tópico da frase atual.
  function identificar(resposta) {
    const r = normalizar(resposta);
    if (!r) return null;
    const achadas = RESPOSTAS.filter((o) => o.formas.includes(r));
    if (!achadas.length) return null;
    return achadas.find((o) => atual && o.topico === atual.topico) || achadas[0];
  }

  // A pessoa escreveu só o nome do tópico (ex.: "substantivo"), sem a classificação?
  function soOTopico(resposta) {
    const r = normalizar(resposta);
    const info = TOPICOS[atual.topico];
    return [info.nome, ...info.apelidos].some((a) => normalizar(a) === r);
  }

  // ---------- sugestões (autocompletar) ----------

  let sugestoesAtuais = [];
  let ativa = -1;

  // Cada palavra digitada precisa ser o começo de uma palavra da forma, na mesma ordem.
  function casa(consulta, forma) {
    const pal = forma.split(" ");
    let i = 0;
    for (const q of consulta) {
      while (i < pal.length && !pal[i].startsWith(q)) i++;
      if (i === pal.length) return -1;
      i++;
    }
    return pal[0].startsWith(consulta[0]) ? 2 : 1;
  }

  function calcularSugestoes(texto) {
    const consulta = normalizar(texto).split(" ").filter(Boolean);
    if (!consulta.length) return [];
    const resultado = [];
    for (const o of RESPOSTAS) {
      if (!sessao.topicos.includes(o.topico)) continue;
      let melhor = -1;
      for (const f of o.formas) melhor = Math.max(melhor, casa(consulta, f));
      if (melhor > 0) resultado.push({ o, pontos: melhor });
    }
    resultado.sort((a, b) => b.pontos - a.pontos || a.o.rotulo.localeCompare(b.o.rotulo, "pt"));
    if (resultado.length === 1 && normalizar(resultado[0].o.rotulo) === normalizar(texto)) return [];
    return resultado.slice(0, MAX_SUGESTOES).map((r) => r.o);
  }

  function destacarCasamento(rot, texto) {
    const consulta = normalizar(texto).split(" ").filter(Boolean);
    const frag = document.createDocumentFragment();
    let qi = 0;
    for (const p of rot.split(/(\s+)/)) {
      const pn = normalizar(p);
      if (qi < consulta.length && pn && pn.startsWith(consulta[qi])) {
        const n = consulta[qi].length;
        frag.append(el("b", null, p.slice(0, n)), document.createTextNode(p.slice(n)));
        qi++;
      } else {
        frag.append(document.createTextNode(p));
      }
    }
    return frag;
  }

  function mostrarSugestoes() {
    if (respondida || !sessao) return fecharSugestoes();
    sugestoesAtuais = calcularSugestoes(input.value);
    ativa = -1;
    listaSugestoes.textContent = "";
    if (!sugestoesAtuais.length) return fecharSugestoes();

    sugestoesAtuais.forEach((o, i) => {
      const li = el("li", "sugestao");
      li.id = "sug-" + i;
      li.setAttribute("role", "option");
      const texto = el("span");
      texto.append(destacarCasamento(o.rotulo, input.value));
      li.append(texto);
      if (sessao.topicos.length > 1) li.append(el("span", "sugestao-topico", TOPICOS[o.topico].nome));
      // pointerdown + preventDefault mantém o foco no campo (o teclado do celular não fecha).
      li.addEventListener("pointerdown", (ev) => ev.preventDefault());
      li.addEventListener("click", () => escolherSugestao(i));
      listaSugestoes.append(li);
    });
    listaSugestoes.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function fecharSugestoes() {
    listaSugestoes.hidden = true;
    listaSugestoes.textContent = "";
    sugestoesAtuais = [];
    ativa = -1;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }

  function marcarAtiva(i) {
    const itens = listaSugestoes.children;
    if (ativa >= 0 && itens[ativa]) itens[ativa].classList.remove("ativa");
    ativa = i;
    if (ativa >= 0 && itens[ativa]) {
      itens[ativa].classList.add("ativa");
      itens[ativa].scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", itens[ativa].id);
    }
  }

  function escolherSugestao(i) {
    const o = sugestoesAtuais[i];
    if (!o) return;
    input.value = o.rotulo;
    fecharSugestoes();
    input.focus();
  }

  input.addEventListener("input", mostrarSugestoes);
  input.addEventListener("blur", () =>
    setTimeout(() => {
      if (document.activeElement !== input) fecharSugestoes();
    }, 150)
  );

  input.addEventListener("keydown", (ev) => {
    const aberta = !listaSugestoes.hidden && sugestoesAtuais.length;
    if (ev.key === "ArrowDown" && aberta) {
      ev.preventDefault();
      marcarAtiva((ativa + 1) % sugestoesAtuais.length);
    } else if (ev.key === "ArrowUp" && aberta) {
      ev.preventDefault();
      marcarAtiva(ativa <= 0 ? sugestoesAtuais.length - 1 : ativa - 1);
    } else if ((ev.key === "Enter" || ev.key === "Tab") && aberta && ativa >= 0) {
      ev.preventDefault();
      escolherSugestao(ativa);
    } else if (ev.key === "Tab" && aberta && sugestoesAtuais.length === 1) {
      ev.preventDefault();
      escolherSugestao(0);
    } else if (ev.key === "Escape" && aberta) {
      fecharSugestoes();
    }
  });

  // ---------- tela de configuração ----------

  function montarConfig() {
    const salvos = lerStorage(CHAVE_TOPICOS, []);
    listaTopicos.textContent = "";
    for (const [chave, info] of Object.entries(TOPICOS)) {
      const qtd = EXERCICIOS.filter((e) => e.topico === chave).length;
      if (!qtd) continue;

      const label = el("label", "topico-opcao");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = chave;
      cb.checked = Array.isArray(salvos) && salvos.includes(chave);

      const texto = el("span", "topico-texto");
      const linha = el("span", "topico-linha");
      linha.append(el("span", "topico-nome", info.nome), el("span", "topico-qtd", qtd + " frases"));
      const rotulos = Object.values(info.opcoes).map((o) => o.rotulo.replace(/\s*\(.*?\)/, ""));
      texto.append(linha, el("span", "topico-classes", rotulos.length > 1 ? rotulos.join(" · ") : "Só a classe gramatical"));

      label.append(cb, texto);
      listaTopicos.append(label);
    }

    const qtdSalva = Number(lerStorage(CHAVE_QTD, 20));
    if (qtdSalva >= 1 && qtdSalva <= MAX_PERGUNTAS) inputQtd.value = qtdSalva;
    atualizarInfoQtd();
    montarHistorico();
  }

  function lerSelecao() {
    return Array.from(listaTopicos.querySelectorAll("input:checked")).map((cb) => cb.value);
  }

  function atualizarInfoQtd() {
    const sel = lerSelecao();
    const disponiveis = EXERCICIOS.filter((e) => sel.includes(e.topico)).length;
    const qtd = Number(inputQtd.value);
    document.querySelectorAll("#atalhos-qtd .chip-btn").forEach((b) => {
      b.classList.toggle("ativo", Number(b.dataset.qtd) === qtd);
    });
    if (!sel.length) {
      infoQtd.textContent = "Selecione pelo menos um tópico.";
    } else if (qtd > disponiveis) {
      infoQtd.textContent = `Os tópicos escolhidos têm ${disponiveis} frases. Algumas vão se repetir.`;
    } else {
      infoQtd.textContent = `${disponiveis} frases disponíveis nos tópicos escolhidos.`;
    }
  }

  listaTopicos.addEventListener("change", atualizarInfoQtd);
  inputQtd.addEventListener("input", atualizarInfoQtd);
  $("#atalhos-qtd").addEventListener("click", (ev) => {
    const b = ev.target.closest(".chip-btn");
    if (!b) return;
    inputQtd.value = b.dataset.qtd;
    atualizarInfoQtd();
  });

  $("#btn-todas").addEventListener("click", () => {
    const cbs = listaTopicos.querySelectorAll("input");
    const todas = Array.from(cbs).every((cb) => cb.checked);
    cbs.forEach((cb) => (cb.checked = !todas));
    atualizarInfoQtd();
  });

  $("#btn-comecar").addEventListener("click", () => {
    selecionados = lerSelecao();
    const qtd = Math.floor(Number(inputQtd.value));
    if (!selecionados.length) {
      avisoConfig.textContent = "Selecione pelo menos um tópico.";
      return;
    }
    if (!(qtd >= 1 && qtd <= MAX_PERGUNTAS)) {
      avisoConfig.textContent = `Escolha uma quantidade entre 1 e ${MAX_PERGUNTAS} perguntas.`;
      inputQtd.focus();
      return;
    }
    avisoConfig.textContent = "";
    gravarStorage(CHAVE_TOPICOS, selecionados);
    gravarStorage(CHAVE_QTD, qtd);
    iniciarSessao(montarPerguntas(selecionados, qtd), selecionados);
  });

  // Monta a lista de perguntas alternando entre os tópicos, para que todos apareçam
  // de forma equilibrada. Só repete frases se a quantidade pedida for maior que o banco.
  function montarPerguntas(topicos, qtd) {
    const filas = {};
    const repor = (t) => (filas[t] = embaralhar(EXERCICIOS.filter((e) => e.topico === t)));
    topicos.forEach(repor);
    const ordem = embaralhar(topicos);
    const escolhidas = [];
    let i = 0;
    while (escolhidas.length < qtd) {
      const t = ordem[i++ % ordem.length];
      if (!filas[t].length) repor(t);
      escolhidas.push(filas[t].pop());
    }
    return embaralhar(escolhidas);
  }

  // ---------- histórico ----------

  function montarHistorico() {
    const hist = lerStorage(CHAVE_HISTORICO, []);
    const corpo = $("#historico");
    corpo.textContent = "";
    if (!Array.isArray(hist) || !hist.length) {
      $("#historico-cartao").hidden = true;
      return;
    }
    for (const h of hist.slice(0, 10)) {
      const tr = el("tr");
      const data = new Date(h.data);
      tr.append(
        el("td", null, data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })),
        el("td", "num", String(h.total)),
        el("td", "num", `${h.acertos} (${pct(h.acertos, h.total)}%)`),
        el("td", "num", formatarTempo(h.tempo))
      );
      tr.title = h.topicos.map((t) => TOPICOS[t]?.nome || t).join(", ");
      corpo.append(tr);
    }
    $("#historico-cartao").hidden = false;
  }

  function salvarNoHistorico(rel) {
    if (!rel.total) return;
    const hist = lerStorage(CHAVE_HISTORICO, []);
    const lista = Array.isArray(hist) ? hist : [];
    lista.unshift({ data: Date.now(), total: rel.total, acertos: rel.acertos, tempo: rel.tempo, topicos: sessao.topicos });
    gravarStorage(CHAVE_HISTORICO, lista.slice(0, 30));
  }

  // ---------- sessão de treino ----------

  function iniciarSessao(perguntas, topicos) {
    sessao = {
      perguntas,
      topicos: [...new Set(topicos)],
      indice: -1,
      respostas: [],
      inicio: Date.now(),
      fim: null,
    };
    mostrarTela("treino");
    clearInterval(relogio);
    relogio = setInterval(atualizarCronometro, 1000);
    atualizarCronometro();
    proxima();
  }

  function atualizarCronometro() {
    if (sessao) cronometroEl.textContent = formatarTempo((sessao.fim || Date.now()) - sessao.inicio);
  }

  function renderFrase(frase) {
    fraseEl.textContent = "";
    frase.split(/\[(.+?)\]/).forEach((parte, i) => {
      if (i % 2 === 1) fraseEl.append(el("mark", "alvo", parte));
      else if (parte) fraseEl.append(document.createTextNode(parte));
    });
  }

  function modoResposta(aberto) {
    respondida = !aberto;
    input.disabled = !aberto;
    btnResponder.hidden = !aberto;
    btnNaoSei.hidden = !aberto;
    btnProxima.hidden = aberto;
  }

  function proxima() {
    fecharSugestoes();
    sessao.indice++;
    if (sessao.indice >= sessao.perguntas.length) return finalizarSessao();

    atual = sessao.perguntas[sessao.indice];
    perguntaEl.textContent = TOPICOS[atual.topico].pergunta;
    renderFrase(atual.frase);
    feedback.hidden = true;
    input.value = "";
    modoResposta(true);
    btnProxima.textContent = sessao.indice === sessao.perguntas.length - 1 ? "Ver relatório →" : "Próxima →";
    atualizarPlacar();
    inicioPergunta = Date.now();
    // No celular, focar abre o teclado e pode esconder a frase; só foca em telas largas.
    if (window.matchMedia("(min-width: 700px)").matches) input.focus();
  }

  function mostrarFeedback(tipo, titulo, paragrafos) {
    feedback.textContent = "";
    feedback.className = "feedback " + tipo;
    feedback.append(el("strong", "feedback-titulo", titulo));
    for (const p of paragrafos.filter(Boolean)) {
      const par = el("p");
      if (Array.isArray(p)) par.append(el("b", null, p[0]), document.createTextNode(p[1]));
      else par.textContent = p;
      feedback.append(par);
    }
    feedback.hidden = false;
  }

  function corrigir(escolha) {
    const certa = rotulo(atual.topico, atual.resposta);
    const resumoCerta = TOPICOS[atual.topico].opcoes[atual.resposta].resumo;
    const acertou = !!escolha && escolha.topico === atual.topico && escolha.chave === atual.resposta;

    sessao.respostas.push({
      exercicio: atual,
      escolha: escolha ? { topico: escolha.topico, chave: escolha.chave } : null,
      acertou,
      tempo: Date.now() - inicioPergunta,
    });

    if (acertou) {
      mostrarFeedback("acerto", "Acertou! " + certa + ".", [atual.explicacao]);
    } else {
      const paragrafos = [atual.explicacao, ["Lembre-se: ", resumoCerta]];
      if (escolha) {
        paragrafos.push(["Você respondeu " + escolha.rotulo + ": ", TOPICOS[escolha.topico].opcoes[escolha.chave].resumo]);
      }
      mostrarFeedback("erro", (escolha ? "Errou. A resposta é " : "A resposta é ") + certa + ".", paragrafos);
    }

    modoResposta(false);
    fecharSugestoes();
    btnProxima.focus();
    atualizarPlacar();
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (respondida) return proxima();

    const resposta = input.value;
    if (!resposta.trim()) return input.focus();

    const escolha = identificar(resposta);
    if (!escolha) {
      const opcoes = Object.values(TOPICOS[atual.topico].opcoes).map((o) => o.rotulo).join(", ");
      if (soOTopico(resposta)) {
        mostrarFeedback("aviso", "Falta a classificação.", ["Escreva a resposta completa. As opções deste tópico são: " + opcoes + "."]);
      } else {
        mostrarFeedback("aviso", "Não reconheci essa resposta.", ["Use uma das sugestões que aparecem enquanto você digita. Para esta frase, as opções são: " + opcoes + "."]);
      }
      fecharSugestoes();
      input.select();
      return;
    }
    corrigir(escolha);
  });

  btnNaoSei.addEventListener("click", () => {
    if (!respondida) corrigir(null);
  });
  btnProxima.addEventListener("click", proxima);

  // Encerrar antes do fim gera o relatório só com o que foi respondido.
  $("#btn-encerrar").addEventListener("click", () => {
    if (!sessao.respostas.length) {
      clearInterval(relogio);
      sessao = null;
      montarConfig();
      mostrarTela("config");
      return;
    }
    finalizarSessao();
  });

  function atualizarPlacar() {
    const acertos = sessao.respostas.filter((r) => r.acertou).length;
    placarAcertos.textContent = acertos;
    placarErros.textContent = sessao.respostas.length - acertos;
    const total = sessao.perguntas.length;
    const n = Math.min(sessao.indice + 1, total);
    progresso.textContent = `${n} de ${total}`;
    progressoBarra.style.width = (sessao.respostas.length / total) * 100 + "%";
  }

  // ---------- relatório ----------

  function finalizarSessao() {
    sessao.fim = Date.now();
    clearInterval(relogio);
    fecharSugestoes();
    const rel = calcularRelatorio();
    salvarNoHistorico(rel);
    renderRelatorio(rel);
    mostrarTela("relatorio");
  }

  function calcularRelatorio() {
    const resp = sessao.respostas;
    const acertos = resp.filter((r) => r.acertou).length;
    const tempo = sessao.fim - sessao.inicio;

    const porTopico = {};
    const porClasse = {};
    const confusoes = {};
    for (const r of resp) {
      const ex = r.exercicio;
      const t = (porTopico[ex.topico] ??= { acertos: 0, total: 0, tempo: 0 });
      t.total++;
      t.tempo += r.tempo;
      if (r.acertou) t.acertos++;

      const k = ex.topico + "|" + ex.resposta;
      const c = (porClasse[k] ??= { topico: ex.topico, chave: ex.resposta, acertos: 0, total: 0 });
      c.total++;
      if (r.acertou) c.acertos++;

      if (!r.acertou && r.escolha) {
        const ck = k + ">" + r.escolha.topico + "|" + r.escolha.chave;
        (confusoes[ck] ??= { certa: [ex.topico, ex.resposta], dada: [r.escolha.topico, r.escolha.chave], vezes: 0 }).vezes++;
      }
    }

    return {
      total: resp.length,
      planejadas: sessao.perguntas.length,
      acertos,
      tempo,
      porTopico,
      classes: Object.values(porClasse),
      confusoes: Object.values(confusoes).sort((a, b) => b.vezes - a.vezes),
      erros: resp.filter((r) => !r.acertou),
    };
  }

  function linhaDesempenho(nome, acertos, total, extra) {
    const p = pct(acertos, total);
    const linha = el("div", "desempenho-linha");
    const barra = el("span", "barra");
    const preenchido = el("span", "barra-preenchida");
    preenchido.style.width = p + "%";
    if (p < LIMITE_MELHORAR * 100) preenchido.classList.add("ruim");
    else if (p < LIMITE_BOM * 100) preenchido.classList.add("medio");
    barra.append(preenchido);
    const nomeEl = el("span", "desempenho-nome", nome);
    if (extra) nomeEl.append(el("small", null, extra));
    linha.append(nomeEl, barra, el("span", "desempenho-valor", `${acertos}/${total}`));
    return linha;
  }

  function itemPonto(texto, detalhe) {
    const li = el("li");
    li.append(el("span", null, texto), el("span", "ponto-detalhe", detalhe));
    return li;
  }

  function renderRelatorio(rel) {
    const nota = pct(rel.acertos, rel.total);
    let titulo;
    if (!rel.total) titulo = "Sessão encerrada";
    else if (nota >= 90) titulo = "Excelente!";
    else if (nota >= 75) titulo = "Muito bom!";
    else if (nota >= 60) titulo = "Bom caminho!";
    else titulo = "Continue praticando!";
    $("#rel-titulo").textContent = titulo;

    const incompleta = rel.total < rel.planejadas;
    $("#rel-subtitulo").textContent =
      `Você respondeu ${rel.total} de ${rel.planejadas} perguntas` +
      (incompleta ? " (sessão encerrada antes do fim)." : ".");

    $("#rel-nota").textContent = nota + "%";
    $("#rel-acertos").textContent = rel.acertos;
    $("#rel-erros").textContent = rel.total - rel.acertos;
    $("#rel-tempo").textContent = formatarTempo(rel.tempo);
    $("#rel-media").textContent = rel.total ? formatarSegundos(rel.tempo / rel.total) : "—";

    // Por tópico
    const relTopicos = $("#rel-topicos");
    relTopicos.textContent = "";
    for (const t of sessao.topicos) {
      const d = rel.porTopico[t];
      if (!d) continue;
      relTopicos.append(linhaDesempenho(TOPICOS[t].nome, d.acertos, d.total, "média de " + formatarSegundos(d.tempo / d.total)));
    }

    // Pontos fortes e fracos, por classificação
    const bem = rel.classes
      .filter((c) => c.acertos / c.total >= LIMITE_BOM)
      .sort((a, b) => b.acertos / b.total - a.acertos / a.total || b.total - a.total);
    const melhorar = rel.classes
      .filter((c) => c.acertos / c.total < LIMITE_MELHORAR)
      .sort((a, b) => a.acertos / a.total - b.acertos / b.total || b.total - a.total);
    const meio = rel.classes.filter((c) => {
      const p = c.acertos / c.total;
      return p >= LIMITE_MELHORAR && p < LIMITE_BOM;
    });

    const ulBem = $("#rel-bem");
    ulBem.textContent = "";
    for (const c of bem) ulBem.append(itemPonto(rotuloCurto(c.topico, c.chave), `${c.acertos}/${c.total} · ${pct(c.acertos, c.total)}%`));
    if (!bem.length) ulBem.append(el("li", "vazio", "Nenhuma classificação com 80% ou mais de acertos ainda."));

    const ulMelhorar = $("#rel-melhorar");
    ulMelhorar.textContent = "";
    for (const c of [...melhorar, ...meio]) {
      const li = itemPonto(rotuloCurto(c.topico, c.chave), `${c.acertos}/${c.total} · ${pct(c.acertos, c.total)}%`);
      const dica = el("span", "ponto-dica", TOPICOS[c.topico].opcoes[c.chave].resumo);
      li.append(dica);
      ulMelhorar.append(li);
    }
    if (!melhorar.length && !meio.length) ulMelhorar.append(el("li", "vazio", "Nada por aqui. Você acertou pelo menos 80% em todas as classificações!"));

    // Confusões
    const ulConf = $("#rel-confusoes");
    ulConf.textContent = "";
    for (const c of rel.confusoes.slice(0, 6)) {
      ulConf.append(
        itemPonto(
          `Respondeu ${rotuloCurto(...c.dada)} quando era ${rotuloCurto(...c.certa)}`,
          c.vezes + (c.vezes > 1 ? " vezes" : " vez")
        )
      );
    }
    $("#rel-confusoes-cartao").hidden = !rel.confusoes.length;

    // Lista de erros
    const olErros = $("#rel-lista-erros");
    olErros.textContent = "";
    for (const r of rel.erros) {
      const ex = r.exercicio;
      const li = el("li", "erro-item");
      const frase = el("p", "erro-frase");
      ex.frase.split(/\[(.+?)\]/).forEach((parte, i) => {
        if (i % 2 === 1) frase.append(el("mark", "alvo", parte));
        else if (parte) frase.append(document.createTextNode(parte));
      });
      const resp = el("p", "erro-respostas");
      resp.append(
        el("span", "erro-sua", "Sua resposta: " + (r.escolha ? rotuloCurto(r.escolha.topico, r.escolha.chave) : "Não sei")),
        el("span", "erro-certa", "Correta: " + rotuloCurto(ex.topico, ex.resposta))
      );
      li.append(frase, resp, el("p", "erro-explicacao", ex.explicacao));
      olErros.append(li);
    }
    $("#rel-erros-cartao").hidden = !rel.erros.length;
    $("#btn-refazer-erros").hidden = !rel.erros.length;
  }

  $("#btn-refazer-erros").addEventListener("click", () => {
    const erros = sessao.respostas.filter((r) => !r.acertou).map((r) => r.exercicio);
    if (!erros.length) return;
    const topicos = [...new Set(erros.map((e) => e.topico))];
    iniciarSessao(embaralhar(erros), topicos);
  });

  $("#btn-nova-sessao").addEventListener("click", () => {
    sessao = null;
    montarConfig();
    mostrarTela("config");
  });

  montarConfig();
})();
