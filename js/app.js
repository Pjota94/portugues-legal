(function () {
  "use strict";

  const CHAVE_TOPICOS = "portugues-legal:topicos";
  const CHAVE_QTD = "portugues-legal:quantidade";
  const CHAVE_MODO = "portugues-legal:modo";
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
  const blocoTopicos = $("#bloco-topicos");
  const inputQtd = $("#qtd-perguntas");
  const infoQtd = $("#info-qtd");
  const avisoConfig = $("#aviso-config");
  const cronometroEl = $("#cronometro");
  const placarAcertos = $("#placar-acertos");
  const placarErros = $("#placar-erros");
  const progresso = $("#progresso");
  const progressoBarra = $("#progresso-barra");

  // Modo "termo"
  const cartaoTermo = $("#cartao-termo");
  const perguntaEl = $("#pergunta");
  const fraseEl = $("#frase");
  const form = $("#form-resposta");
  const input = $("#resposta");
  const btnResponder = $("#btn-responder");
  const btnNaoSei = $("#btn-nao-sei");
  const btnProxima = $("#btn-proxima");
  const feedback = $("#feedback");

  // Modo "análise"
  const cartaoAnalise = $("#cartao-analise");
  const fraseAnaliseEl = $("#frase-analise");
  const formAnalise = $("#form-analise");
  const camposAnalise = $("#campos-analise");
  const btnCorrigir = $("#btn-corrigir");
  const btnNaoSeiAnalise = $("#btn-nao-sei-analise");
  const btnProximaAnalise = $("#btn-proxima-analise");
  const feedbackAnalise = $("#feedback-analise");

  // Estado
  // sessao: { modo, perguntas, selecao, topicos, indice, respostas, inicio, fim }
  //   respostas: um registro por termo respondido (no modo análise, vários por frase)
  let sessao = null;
  let atual = null;
  let respondida = false;
  let inicioPergunta = 0;
  let relogio = null;
  let camposAtuais = []; // modo análise: [{ termo, input, auto, resultado }]

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

  function telaLarga() {
    return window.matchMedia("(min-width: 700px)").matches;
  }

  // Frase com [trecho] → nós DOM com o trecho destacado.
  function fraseComDestaque(frase) {
    const frag = document.createDocumentFragment();
    frase.split(/\[(.+?)\]/).forEach((parte, i) => {
      if (i % 2 === 1) frag.append(el("mark", "alvo", parte));
      else if (parte) frag.append(document.createTextNode(parte));
    });
    return frag;
  }

  // ---------- reconhecimento de respostas ----------

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

  // Descobre qual classificação o usuário escreveu. Em caso de empate entre tópicos,
  // dá preferência às classificações permitidas e ao tópico esperado.
  function identificar(resposta, topicoEsperado, permitido) {
    const r = normalizar(resposta);
    if (!r) return null;
    const achadas = RESPOSTAS.filter((o) => o.formas.includes(r));
    if (!achadas.length) return null;
    return (
      achadas.find((o) => o.topico === topicoEsperado) ||
      achadas.find((o) => permitido && permitido(o)) ||
      achadas[0]
    );
  }

  // A pessoa escreveu só o nome de um tópico (ex.: "substantivo"), sem a classificação?
  function soOTopico(resposta, topico) {
    const r = normalizar(resposta);
    const info = TOPICOS[topico];
    return [info.nome, ...info.apelidos].some((a) => normalizar(a) === r);
  }

  // ---------- sugestões (autocompletar) ----------

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

  function calcularSugestoes(texto, permitido) {
    const consulta = normalizar(texto).split(" ").filter(Boolean);
    if (!consulta.length) return [];
    const resultado = [];
    for (const o of RESPOSTAS) {
      if (!permitido(o)) continue;
      let melhor = -1;
      for (const f of o.formas) melhor = Math.max(melhor, casa(consulta, f));
      if (melhor > 0) resultado.push({ o, pontos: melhor });
    }
    resultado.sort((a, b) => b.pontos - a.pontos || a.o.rotulo.localeCompare(b.o.rotulo, "pt"));
    // Texto já é uma resposta completa: não sugere nada (a lista não cobre os botões).
    const alvo = normalizar(texto);
    if (resultado.some((r) => normalizar(r.o.rotulo) === alvo)) return [];
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

  let contadorAuto = 0;

  // Liga o autocompletar a um campo de texto.
  //   permitido(o): quais classificações sugerir
  //   mostrarTopico(): se exibe o nome do tópico ao lado de cada sugestão
  //   aoEnter(ev): chamado quando Enter é pressionado sem sugestão ativa (opcional)
  function ligarAutocompletar(campo, lista, permitido, mostrarTopico, aoEnter) {
    const prefixo = "sug" + ++contadorAuto + "-";
    let itens = [];
    let ativa = -1;

    function fechar() {
      lista.hidden = true;
      lista.textContent = "";
      itens = [];
      ativa = -1;
      campo.setAttribute("aria-expanded", "false");
      campo.removeAttribute("aria-activedescendant");
    }

    function escolher(i) {
      const o = itens[i];
      if (!o) return;
      campo.value = o.rotulo;
      fechar();
      campo.focus();
      campo.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function marcar(i) {
      const lis = lista.children;
      if (ativa >= 0 && lis[ativa]) lis[ativa].classList.remove("ativa");
      ativa = i;
      if (ativa >= 0 && lis[ativa]) {
        lis[ativa].classList.add("ativa");
        lis[ativa].scrollIntoView({ block: "nearest" });
        campo.setAttribute("aria-activedescendant", lis[ativa].id);
      }
    }

    function mostrar() {
      if (campo.disabled) return fechar();
      itens = calcularSugestoes(campo.value, permitido);
      ativa = -1;
      lista.textContent = "";
      if (!itens.length) return fechar();
      itens.forEach((o, i) => {
        const li = el("li", "sugestao");
        li.id = prefixo + i;
        li.setAttribute("role", "option");
        const texto = el("span");
        texto.append(destacarCasamento(o.rotulo, campo.value));
        li.append(texto);
        if (mostrarTopico()) li.append(el("span", "sugestao-topico", TOPICOS[o.topico].nome));
        // pointerdown + preventDefault mantém o foco no campo (o teclado do celular não fecha).
        li.addEventListener("pointerdown", (ev) => ev.preventDefault());
        li.addEventListener("click", () => escolher(i));
        lista.append(li);
      });
      lista.hidden = false;
      campo.setAttribute("aria-expanded", "true");
    }

    campo.setAttribute("role", "combobox");
    campo.setAttribute("aria-autocomplete", "list");
    campo.setAttribute("aria-expanded", "false");
    if (!lista.id) lista.id = prefixo + "lista";
    campo.setAttribute("aria-controls", lista.id);
    lista.setAttribute("role", "listbox");

    campo.addEventListener("input", mostrar);
    campo.addEventListener("blur", () =>
      setTimeout(() => {
        if (document.activeElement !== campo) fechar();
      }, 150)
    );
    campo.addEventListener("keydown", (ev) => {
      const aberta = !lista.hidden && itens.length;
      if (ev.key === "ArrowDown" && aberta) {
        ev.preventDefault();
        marcar((ativa + 1) % itens.length);
      } else if (ev.key === "ArrowUp" && aberta) {
        ev.preventDefault();
        marcar(ativa <= 0 ? itens.length - 1 : ativa - 1);
      } else if ((ev.key === "Enter" || ev.key === "Tab") && aberta && ativa >= 0) {
        ev.preventDefault();
        escolher(ativa);
      } else if (ev.key === "Tab" && aberta && itens.length === 1) {
        ev.preventDefault();
        escolher(0);
      } else if (ev.key === "Escape" && aberta) {
        fechar();
      } else if (ev.key === "Enter" && aoEnter) {
        aoEnter(ev);
      }
    });

    return { fechar };
  }

  // ---------- tela de configuração ----------

  function modoEscolhido() {
    return document.querySelector('input[name="modo"]:checked').value;
  }

  // Seleção salva: { topico: [chaves das classificações] }.
  // Versões antigas salvavam só a lista de tópicos; nesse caso, marca todas as classificações.
  function carregarSelecaoSalva() {
    const salvo = lerStorage(CHAVE_TOPICOS, {});
    const sel = {};
    if (Array.isArray(salvo)) {
      for (const t of salvo) if (TOPICOS[t]) sel[t] = Object.keys(TOPICOS[t].opcoes);
    } else if (salvo && typeof salvo === "object") {
      for (const [t, chaves] of Object.entries(salvo)) {
        if (!TOPICOS[t] || !Array.isArray(chaves)) continue;
        const validas = chaves.filter((c) => c in TOPICOS[t].opcoes);
        if (validas.length) sel[t] = validas;
      }
    }
    return sel;
  }

  // Deixa a caixa do tópico coerente com os botões das classificações:
  // marcada (todas), desmarcada (nenhuma) ou parcial (algumas).
  function sincronizarTopico(cartao) {
    const cb = cartao.querySelector(".topico-cb");
    const pilulas = [...cartao.querySelectorAll(".pilula")];
    if (!pilulas.length) {
      cartao.classList.toggle("marcado", cb.checked);
      return;
    }
    const ligadas = pilulas.filter((p) => p.getAttribute("aria-pressed") === "true").length;
    cb.checked = ligadas > 0;
    cb.indeterminate = ligadas > 0 && ligadas < pilulas.length;
    cartao.dataset.parcial = cb.indeterminate ? "1" : "";
    cartao.classList.toggle("marcado", ligadas > 0);
    cartao.querySelector(".topico-qtd").textContent = contarFrases(cartao.dataset.topico, lerOpcoesCartao(cartao)) + " frases";
  }

  function lerOpcoesCartao(cartao) {
    const pilulas = [...cartao.querySelectorAll(".pilula")];
    if (!pilulas.length) {
      return cartao.querySelector(".topico-cb").checked ? Object.keys(TOPICOS[cartao.dataset.topico].opcoes) : [];
    }
    return pilulas.filter((p) => p.getAttribute("aria-pressed") === "true").map((p) => p.dataset.chave);
  }

  function contarFrases(topico, chaves) {
    return EXERCICIOS.filter((e) => e.topico === topico && (!chaves || chaves.includes(e.resposta))).length;
  }

  function montarConfig() {
    const salvos = carregarSelecaoSalva();
    listaTopicos.textContent = "";
    for (const [topico, info] of Object.entries(TOPICOS)) {
      const total = contarFrases(topico);
      if (!total) continue;

      const cartao = el("div", "topico-opcao");
      cartao.dataset.topico = topico;

      const cabecalho = el("label", "topico-cabecalho");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "topico-cb";
      cb.checked = !!salvos[topico];
      const linha = el("span", "topico-linha");
      linha.append(el("span", "topico-nome", info.nome), el("span", "topico-qtd", total + " frases"));
      cabecalho.append(cb, linha);
      cartao.append(cabecalho);

      const opcoes = Object.entries(info.opcoes);
      if (opcoes.length > 1) {
        const grupo = el("div", "pilulas");
        grupo.setAttribute("role", "group");
        grupo.setAttribute("aria-label", "Classificações de " + info.nome);
        for (const [chave, op] of opcoes) {
          const n = contarFrases(topico, [chave]);
          if (!n) continue;
          const b = el("button", "pilula");
          b.type = "button";
          b.dataset.chave = chave;
          b.setAttribute("aria-pressed", String(!!salvos[topico]?.includes(chave)));
          const nomeCurto = op.curto || op.rotulo.replace(/\s*\(.*?\)/, "").replace(info.nome + " ", "");
          b.append(el("span", null, nomeCurto), el("small", null, String(n)));
          b.title = op.rotulo + " · " + n + " frases";
          grupo.append(b);
        }
        cartao.append(grupo);
      } else {
        cartao.append(el("span", "topico-classes", "Só a classe gramatical"));
      }

      listaTopicos.append(cartao);
      sincronizarTopico(cartao);
    }

    const modoSalvo = lerStorage(CHAVE_MODO, "termo");
    const radio = document.querySelector(`input[name="modo"][value="${modoSalvo === "analise" ? "analise" : "termo"}"]`);
    radio.checked = true;

    const qtdSalva = Number(lerStorage(CHAVE_QTD, 20));
    if (qtdSalva >= 1 && qtdSalva <= MAX_PERGUNTAS) inputQtd.value = qtdSalva;
    atualizarModo();
    montarHistorico();
  }

  function atualizarModo() {
    const analise = modoEscolhido() === "analise";
    blocoTopicos.hidden = analise;
    $("#titulo-qtd").textContent = analise ? "Quantidade de frases" : "Quantidade de perguntas";
    atualizarInfoQtd();
  }

  document.querySelectorAll('input[name="modo"]').forEach((r) => r.addEventListener("change", atualizarModo));

  // Caixa do tópico: liga ou desliga todas as classificações dele.
  listaTopicos.addEventListener("change", (ev) => {
    const cb = ev.target.closest(".topico-cb");
    if (!cb) return;
    const cartao = cb.closest(".topico-opcao");
    // Tópico parcialmente marcado: o clique completa a seleção em vez de limpar.
    if (cartao.dataset.parcial === "1") cb.checked = true;
    cartao.querySelectorAll(".pilula").forEach((p) => p.setAttribute("aria-pressed", String(cb.checked)));
    sincronizarTopico(cartao);
    atualizarInfoQtd();
  });

  // Botão de classificação: liga ou desliga só ela.
  listaTopicos.addEventListener("click", (ev) => {
    const p = ev.target.closest(".pilula");
    if (!p) return;
    p.setAttribute("aria-pressed", String(p.getAttribute("aria-pressed") !== "true"));
    sincronizarTopico(p.closest(".topico-opcao"));
    atualizarInfoQtd();
  });

  function lerSelecao() {
    const sel = {};
    for (const cartao of listaTopicos.querySelectorAll(".topico-opcao")) {
      const chaves = lerOpcoesCartao(cartao);
      if (chaves.length) sel[cartao.dataset.topico] = chaves;
    }
    return sel;
  }

  function frasesDaSelecao(sel) {
    return EXERCICIOS.filter((e) => sel[e.topico]?.includes(e.resposta));
  }

  function atualizarInfoQtd() {
    const analise = modoEscolhido() === "analise";
    const disponiveis = analise ? ANALISES.length : frasesDaSelecao(lerSelecao()).length;
    const qtd = Number(inputQtd.value);
    document.querySelectorAll("#atalhos-qtd .chip-btn").forEach((b) => {
      b.classList.toggle("ativo", Number(b.dataset.qtd) === qtd);
    });
    if (!disponiveis) {
      infoQtd.textContent = "Selecione pelo menos um tópico ou classificação.";
    } else if (qtd > disponiveis) {
      infoQtd.textContent = `${analise ? "O modo avançado" : "A seleção"} tem ${disponiveis} frases. Algumas vão se repetir.`;
    } else {
      infoQtd.textContent = analise
        ? `${disponiveis} frases para análise completa.`
        : `${disponiveis} frases disponíveis na seleção.`;
    }
  }

  inputQtd.addEventListener("input", atualizarInfoQtd);
  $("#atalhos-qtd").addEventListener("click", (ev) => {
    const b = ev.target.closest(".chip-btn");
    if (!b) return;
    inputQtd.value = b.dataset.qtd;
    atualizarInfoQtd();
  });

  $("#btn-todas").addEventListener("click", () => {
    const cartoes = [...listaTopicos.querySelectorAll(".topico-opcao")];
    const tudo = cartoes.every((c) => {
      const cb = c.querySelector(".topico-cb");
      return cb.checked && !cb.indeterminate;
    });
    for (const c of cartoes) {
      c.querySelector(".topico-cb").checked = !tudo;
      c.querySelectorAll(".pilula").forEach((p) => p.setAttribute("aria-pressed", String(!tudo)));
      sincronizarTopico(c);
    }
    atualizarInfoQtd();
  });

  $("#btn-comecar").addEventListener("click", () => {
    const modo = modoEscolhido();
    const qtd = Math.floor(Number(inputQtd.value));
    if (!(qtd >= 1 && qtd <= MAX_PERGUNTAS)) {
      avisoConfig.textContent = `Escolha uma quantidade entre 1 e ${MAX_PERGUNTAS}.`;
      inputQtd.focus();
      return;
    }
    gravarStorage(CHAVE_MODO, modo);
    gravarStorage(CHAVE_QTD, qtd);

    if (modo === "analise") {
      avisoConfig.textContent = "";
      iniciarSessao("analise", montarAnalises(qtd), selecaoAnalise());
      return;
    }

    const sel = lerSelecao();
    if (!frasesDaSelecao(sel).length) {
      avisoConfig.textContent = "Selecione pelo menos um tópico ou classificação.";
      return;
    }
    avisoConfig.textContent = "";
    gravarStorage(CHAVE_TOPICOS, sel);
    iniciarSessao("termo", montarPerguntas(sel, qtd), sel);
  });

  // No modo análise, as sugestões incluem todas as classificações dos tópicos de análise.
  function selecaoAnalise() {
    const sel = {};
    for (const t of TOPICOS_ANALISE) sel[t] = Object.keys(TOPICOS[t].opcoes);
    return sel;
  }

  // Modo termo: alterna entre os tópicos para que todos apareçam de forma equilibrada.
  // Só repete frases se a quantidade pedida for maior que o banco.
  function montarPerguntas(sel, qtd) {
    const filas = {};
    const repor = (t) => (filas[t] = embaralhar(EXERCICIOS.filter((e) => e.topico === t && sel[t].includes(e.resposta))));
    const topicos = Object.keys(sel);
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

  function montarAnalises(qtd) {
    const escolhidas = [];
    let fila = [];
    while (escolhidas.length < qtd) {
      if (!fila.length) fila = embaralhar(ANALISES);
      escolhidas.push(fila.pop());
    }
    return escolhidas;
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
      const tdData = el("td", null, data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
      if (h.modo === "analise") tdData.append(" ", el("span", "selo", "Avançado"));
      const qtd = h.modo === "analise" ? `${h.frases} frases` : String(h.total);
      tr.append(
        tdData,
        el("td", "num", qtd),
        el("td", "num", `${h.acertos}/${h.total} (${pct(h.acertos, h.total)}%)`),
        el("td", "num", formatarTempo(h.tempo))
      );
      tr.title = (h.topicos || []).map((t) => TOPICOS[t]?.nome || t).join(", ");
      corpo.append(tr);
    }
    $("#historico-cartao").hidden = false;
  }

  function salvarNoHistorico(rel) {
    if (!rel.total) return;
    const hist = lerStorage(CHAVE_HISTORICO, []);
    const lista = Array.isArray(hist) ? hist : [];
    lista.unshift({
      data: Date.now(),
      modo: sessao.modo,
      total: rel.total,
      frases: rel.unidades,
      acertos: rel.acertos,
      tempo: rel.tempo,
      topicos: sessao.topicos,
    });
    gravarStorage(CHAVE_HISTORICO, lista.slice(0, 30));
  }

  // ---------- sessão ----------

  function iniciarSessao(modo, perguntas, sel) {
    sessao = {
      modo,
      perguntas,
      selecao: sel,
      topicos: Object.keys(sel),
      indice: -1,
      respondidas: 0, // perguntas (modo termo) ou frases (modo análise) concluídas
      respostas: [],
      inicio: Date.now(),
      fim: null,
    };
    cartaoTermo.hidden = modo !== "termo";
    cartaoAnalise.hidden = modo !== "analise";
    mostrarTela("treino");
    clearInterval(relogio);
    relogio = setInterval(atualizarCronometro, 1000);
    atualizarCronometro();
    proxima();
  }

  function atualizarCronometro() {
    if (sessao) cronometroEl.textContent = formatarTempo((sessao.fim || Date.now()) - sessao.inicio);
  }

  function proxima() {
    autoTermo.fechar();
    sessao.indice++;
    if (sessao.indice >= sessao.perguntas.length) return finalizarSessao();
    atual = sessao.perguntas[sessao.indice];
    inicioPergunta = Date.now();
    if (sessao.modo === "analise") mostrarAnalise();
    else mostrarTermo();
    atualizarPlacar();
  }

  function rotuloBotaoProxima() {
    return sessao.indice === sessao.perguntas.length - 1 ? "Ver relatório →" : "Próxima →";
  }

  function mostrarFeedback(alvo, tipo, titulo, paragrafos) {
    alvo.textContent = "";
    alvo.className = "feedback " + tipo;
    alvo.append(el("strong", "feedback-titulo", titulo));
    for (const p of paragrafos.filter(Boolean)) {
      const par = el("p");
      if (Array.isArray(p)) par.append(el("b", null, p[0]), document.createTextNode(p[1]));
      else par.textContent = p;
      alvo.append(par);
    }
    alvo.hidden = false;
  }

  function atualizarPlacar() {
    const acertos = sessao.respostas.filter((r) => r.acertou).length;
    placarAcertos.textContent = acertos;
    placarErros.textContent = sessao.respostas.length - acertos;
    const total = sessao.perguntas.length;
    const n = Math.min(sessao.indice + 1, total);
    progresso.textContent = sessao.modo === "analise" ? `Frase ${n} de ${total}` : `Pergunta ${n} de ${total}`;
    progressoBarra.style.width = (sessao.respondidas / total) * 100 + "%";
  }

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

  // ---------- modo termo ----------

  const autoTermo = ligarAutocompletar(
    input,
    $("#sugestoes"),
    (o) => !!sessao?.selecao[o.topico]?.includes(o.chave),
    () => !!sessao && sessao.topicos.length > 1
  );

  function modoRespostaTermo(aberto) {
    respondida = !aberto;
    input.disabled = !aberto;
    btnResponder.hidden = !aberto;
    btnNaoSei.hidden = !aberto;
    btnProxima.hidden = aberto;
  }

  function mostrarTermo() {
    perguntaEl.textContent = TOPICOS[atual.topico].pergunta;
    fraseEl.textContent = "";
    fraseEl.append(fraseComDestaque(atual.frase));
    feedback.hidden = true;
    input.value = "";
    modoRespostaTermo(true);
    btnProxima.textContent = rotuloBotaoProxima();
    // No celular, focar abre o teclado e pode esconder a frase; só foca em telas largas.
    if (telaLarga()) input.focus();
  }

  function corrigirTermo(escolha) {
    const certa = rotulo(atual.topico, atual.resposta);
    const resumoCerta = TOPICOS[atual.topico].opcoes[atual.resposta].resumo;
    const acertou = !!escolha && escolha.topico === atual.topico && escolha.chave === atual.resposta;

    sessao.respostas.push({
      exercicio: atual,
      escolha: escolha ? { topico: escolha.topico, chave: escolha.chave } : null,
      acertou,
      tempo: Date.now() - inicioPergunta,
    });
    sessao.respondidas++;

    if (acertou) {
      mostrarFeedback(feedback, "acerto", "Acertou! " + certa + ".", [atual.explicacao]);
    } else {
      const paragrafos = [atual.explicacao, ["Lembre-se: ", resumoCerta]];
      if (escolha) {
        paragrafos.push(["Você respondeu " + escolha.rotulo + ": ", TOPICOS[escolha.topico].opcoes[escolha.chave].resumo]);
      }
      mostrarFeedback(feedback, "erro", (escolha ? "Errou. A resposta é " : "A resposta é ") + certa + ".", paragrafos);
    }

    modoRespostaTermo(false);
    autoTermo.fechar();
    btnProxima.focus();
    atualizarPlacar();
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (respondida) return proxima();

    const resposta = input.value;
    if (!resposta.trim()) return input.focus();

    const permitido = (o) => !!sessao.selecao[o.topico]?.includes(o.chave);
    const escolha = identificar(resposta, atual.topico, permitido);
    if (!escolha) {
      const opcoes = sessao.selecao[atual.topico].map((k) => rotulo(atual.topico, k)).join(", ");
      if (soOTopico(resposta, atual.topico)) {
        mostrarFeedback(feedback, "aviso", "Falta a classificação.", ["Escreva a resposta completa. As opções deste tópico são: " + opcoes + "."]);
      } else {
        mostrarFeedback(feedback, "aviso", "Não reconheci essa resposta.", ["Use uma das sugestões que aparecem enquanto você digita. Para esta frase, as opções são: " + opcoes + "."]);
      }
      autoTermo.fechar();
      input.select();
      return;
    }
    corrigirTermo(escolha);
  });

  btnNaoSei.addEventListener("click", () => {
    if (!respondida) corrigirTermo(null);
  });
  btnProxima.addEventListener("click", proxima);

  // ---------- modo análise ----------

  const permitidoAnalise = (o) => TOPICOS_ANALISE.includes(o.topico);

  // Frase da análise com cada termo destacado e numerado.
  function renderFraseAnalise(analise, alvo) {
    alvo.textContent = "";
    const posicoes = localizarTermos(analise);
    let cursor = 0;
    posicoes.forEach((pos, i) => {
      if (!pos) return;
      if (pos.inicio > cursor) alvo.append(document.createTextNode(analise.frase.slice(cursor, pos.inicio)));
      const mark = el("mark", "alvo alvo-num", analise.frase.slice(pos.inicio, pos.fim));
      mark.append(el("sup", "num-termo", String(i + 1)));
      mark.dataset.termo = String(i);
      alvo.append(mark);
      cursor = pos.fim;
    });
    if (cursor < analise.frase.length) alvo.append(document.createTextNode(analise.frase.slice(cursor)));
  }

  function mostrarAnalise() {
    renderFraseAnalise(atual, fraseAnaliseEl);
    camposAnalise.textContent = "";
    feedbackAnalise.hidden = true;
    camposAtuais = atual.termos.map((termo, i) => {
      const li = el("li", "campo-termo");
      const id = "termo-" + i;
      const label = el("label", "termo-rotulo");
      label.htmlFor = id;
      label.append(el("span", "termo-num", String(i + 1)));
      if (termo.sujeito) {
        label.append(el("span", "termo-texto", "Sujeito"), el("span", "termo-obs", "não aparece na frase"));
      } else {
        label.append(el("span", "termo-texto", termo.trecho));
      }
      const campo = el("div", "campo");
      const inp = document.createElement("input");
      inp.id = id;
      inp.type = "text";
      inp.placeholder = "Classificação...";
      inp.spellcheck = false;
      inp.setAttribute("autocapitalize", "off");
      inp.setAttribute("autocorrect", "off");
      inp.setAttribute("enterkeyhint", i === atual.termos.length - 1 ? "done" : "next");
      const lista = el("ul", "sugestoes");
      lista.hidden = true;
      campo.append(inp, lista);
      const resultado = el("div", "termo-resultado");
      resultado.hidden = true;
      li.append(label, campo, resultado);
      camposAnalise.append(li);

      // Enter sem sugestão ativa: vai para o próximo campo (ou corrige, no último).
      const auto = ligarAutocompletar(inp, lista, permitidoAnalise, () => true, (ev) => {
        ev.preventDefault();
        const prox = camposAtuais[i + 1];
        if (prox) prox.input.focus();
        else formAnalise.requestSubmit();
      });
      inp.addEventListener("input", () => li.classList.remove("pendente"));
      // Destaca na frase o termo do campo em foco.
      inp.addEventListener("focus", () => destacarTermo(i));
      inp.addEventListener("blur", () => destacarTermo(-1));
      return { termo, input: inp, auto, resultado, li };
    });

    respondida = false;
    btnCorrigir.hidden = false;
    btnNaoSeiAnalise.hidden = false;
    btnProximaAnalise.hidden = true;
    btnProximaAnalise.textContent = rotuloBotaoProxima();
    if (telaLarga()) camposAtuais[0].input.focus();
  }

  function destacarTermo(i) {
    fraseAnaliseEl.querySelectorAll(".alvo-num").forEach((m) => m.classList.toggle("em-foco", m.dataset.termo === String(i)));
  }

  function corrigirAnalise(desistiu) {
    // Antes de corrigir, confere se todos os campos têm uma classificação reconhecida.
    const escolhas = [];
    if (!desistiu) {
      let primeiroProblema = null;
      for (const c of camposAtuais) {
        const valor = c.input.value;
        const [topico] = c.termo.resposta.split(".");
        const escolha = valor.trim() ? identificar(valor, topico, permitidoAnalise) : null;
        c.li.classList.toggle("pendente", !escolha);
        if (!escolha && !primeiroProblema) primeiroProblema = c;
        escolhas.push(escolha);
      }
      if (primeiroProblema) {
        mostrarFeedback(feedbackAnalise, "aviso", "Preencha todos os termos.", [
          "Cada campo precisa de uma classificação reconhecida. Use as sugestões que aparecem enquanto você digita, ou toque em “Não sei” para ver as respostas.",
        ]);
        primeiroProblema.input.focus();
        return;
      }
    }

    const tempoPorTermo = (Date.now() - inicioPergunta) / camposAtuais.length;
    let acertos = 0;
    camposAtuais.forEach((c, i) => {
      const [topico, chave] = c.termo.resposta.split(".");
      const escolha = desistiu ? null : escolhas[i];
      const acertou = !!escolha && escolha.topico === topico && escolha.chave === chave;
      if (acertou) acertos++;

      // Registro no mesmo formato do modo termo, para o relatório funcionar igual.
      const fraseMarcada = c.termo.sujeito
        ? atual.frase
        : (() => {
            const pos = localizarTermos(atual)[i];
            return atual.frase.slice(0, pos.inicio) + "[" + c.termo.trecho + "]" + atual.frase.slice(pos.fim);
          })();
      sessao.respostas.push({
        exercicio: {
          topico,
          resposta: chave,
          frase: fraseMarcada,
          explicacao: c.termo.explicacao,
          termoOculto: !!c.termo.sujeito,
          analise: atual,
        },
        escolha: escolha ? { topico: escolha.topico, chave: escolha.chave } : null,
        acertou,
        tempo: tempoPorTermo,
      });

      c.auto.fechar();
      c.input.disabled = true;
      c.li.classList.remove("pendente");
      c.li.classList.add(acertou ? "certo" : "errado");
      c.resultado.textContent = "";
      const linha = el("p", "termo-linha");
      if (acertou) {
        linha.append(el("span", "termo-status acerto", "✓ Correto"));
      } else {
        linha.append(el("span", "termo-status erro", escolha ? "✗ Errado" : "✗ Resposta"));
        linha.append(" ", el("b", null, rotulo(topico, chave)));
      }
      c.resultado.append(linha, el("p", "termo-explicacao", c.termo.explicacao));
      c.resultado.hidden = false;
    });
    sessao.respondidas++;

    const total = camposAtuais.length;
    if (acertos === total) {
      mostrarFeedback(feedbackAnalise, "acerto", `Perfeito! ${acertos} de ${total} termos corretos.`, []);
    } else if (desistiu) {
      mostrarFeedback(feedbackAnalise, "erro", "Veja a análise completa acima.", []);
    } else {
      mostrarFeedback(feedbackAnalise, "erro", `${acertos} de ${total} termos corretos.`, ["Veja a correção e a explicação em cada termo acima."]);
    }

    respondida = true;
    btnCorrigir.hidden = true;
    btnNaoSeiAnalise.hidden = true;
    btnProximaAnalise.hidden = false;
    btnProximaAnalise.focus();
    atualizarPlacar();
  }

  formAnalise.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (respondida) return proxima();
    corrigirAnalise(false);
  });
  btnNaoSeiAnalise.addEventListener("click", () => {
    if (!respondida) corrigirAnalise(true);
  });
  btnProximaAnalise.addEventListener("click", proxima);

  // ---------- relatório ----------

  function finalizarSessao() {
    sessao.fim = Date.now();
    clearInterval(relogio);
    autoTermo.fechar();
    camposAtuais.forEach((c) => c.auto.fechar());
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
      unidades: sessao.respondidas,
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
    const analise = sessao.modo === "analise";
    const nota = pct(rel.acertos, rel.total);
    let titulo;
    if (!rel.total) titulo = "Sessão encerrada";
    else if (nota >= 90) titulo = "Excelente!";
    else if (nota >= 75) titulo = "Muito bom!";
    else if (nota >= 60) titulo = "Bom caminho!";
    else titulo = "Continue praticando!";
    $("#rel-titulo").textContent = titulo;

    const incompleta = rel.unidades < rel.planejadas;
    $("#rel-subtitulo").textContent =
      (analise
        ? `Análise da frase (avançado): você analisou ${rel.unidades} de ${rel.planejadas} frases, com ${rel.total} termos ao todo`
        : `Você respondeu ${rel.unidades} de ${rel.planejadas} perguntas`) +
      (incompleta ? " (sessão encerrada antes do fim)." : ".");

    $("#rel-nota").textContent = nota + "%";
    $("#rel-acertos").textContent = rel.acertos;
    $("#rel-erros").textContent = rel.total - rel.acertos;
    $("#rel-tempo").textContent = formatarTempo(rel.tempo);
    $("#rel-media").textContent = rel.unidades ? formatarSegundos(rel.tempo / rel.unidades) : "—";
    $("#rel-media-rotulo").textContent = analise ? "por frase" : "por pergunta";

    // Por tópico
    const relTopicos = $("#rel-topicos");
    relTopicos.textContent = "";
    for (const t of Object.keys(TOPICOS)) {
      const d = rel.porTopico[t];
      if (!d) continue;
      relTopicos.append(linhaDesempenho(TOPICOS[t].nome, d.acertos, d.total, analise ? null : "média de " + formatarSegundos(d.tempo / d.total)));
    }

    // Pontos fortes e fracos, por classificação
    const taxa = (c) => c.acertos / c.total;
    const bem = rel.classes.filter((c) => taxa(c) >= LIMITE_BOM).sort((a, b) => taxa(b) - taxa(a) || b.total - a.total);
    const melhorar = rel.classes.filter((c) => taxa(c) < LIMITE_BOM).sort((a, b) => taxa(a) - taxa(b) || b.total - a.total);

    const ulBem = $("#rel-bem");
    ulBem.textContent = "";
    for (const c of bem) ulBem.append(itemPonto(rotuloCurto(c.topico, c.chave), `${c.acertos}/${c.total} · ${pct(c.acertos, c.total)}%`));
    if (!bem.length) ulBem.append(el("li", "vazio", "Nenhuma classificação com 80% ou mais de acertos ainda."));

    const ulMelhorar = $("#rel-melhorar");
    ulMelhorar.textContent = "";
    for (const c of melhorar) {
      const li = itemPonto(rotuloCurto(c.topico, c.chave), `${c.acertos}/${c.total} · ${pct(c.acertos, c.total)}%`);
      li.append(el("span", "ponto-dica", TOPICOS[c.topico].opcoes[c.chave].resumo));
      ulMelhorar.append(li);
    }
    if (!melhorar.length) ulMelhorar.append(el("li", "vazio", "Nada por aqui. Você acertou pelo menos 80% em todas as classificações!"));

    // Confusões
    const ulConf = $("#rel-confusoes");
    ulConf.textContent = "";
    for (const c of rel.confusoes.slice(0, 6)) {
      ulConf.append(
        itemPonto(`Respondeu ${rotuloCurto(...c.dada)} quando era ${rotuloCurto(...c.certa)}`, c.vezes + (c.vezes > 1 ? " vezes" : " vez"))
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
      if (ex.termoOculto) frase.append(el("span", "erro-oculto", "Sujeito (não aparece) · "));
      frase.append(fraseComDestaque(ex.frase));
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
    const erradas = sessao.respostas.filter((r) => !r.acertou);
    if (!erradas.length) return;
    if (sessao.modo === "analise") {
      // Refaz as frases que tiveram pelo menos um termo errado.
      const frases = [...new Set(erradas.map((r) => r.exercicio.analise))];
      iniciarSessao("analise", embaralhar(frases), selecaoAnalise());
      return;
    }
    // Mantém as mesmas classificações da sessão original nas sugestões.
    const exercicios = erradas.map((r) => r.exercicio);
    const sel = {};
    for (const e of exercicios) sel[e.topico] = sessao.selecao[e.topico];
    iniciarSessao("termo", embaralhar(exercicios), sel);
  });

  $("#btn-nova-sessao").addEventListener("click", () => {
    sessao = null;
    montarConfig();
    mostrarTela("config");
  });

  montarConfig();
})();
