(function () {
  "use strict";

  const STORAGE_KEY = "portugues-legal:topicos";
  const MAX_SUGESTOES = 8;

  const $ = (sel) => document.querySelector(sel);

  const telaConfig = $("#tela-config");
  const telaTreino = $("#tela-treino");
  const listaTopicos = $("#lista-topicos");
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
  const placarAcertos = $("#placar-acertos");
  const placarErros = $("#placar-erros");
  const progresso = $("#progresso");
  const desempenho = $("#desempenho");

  let selecionados = [];
  let fila = [];
  let atual = null;
  let respondida = false;
  let totalRodada = 0;
  let feitas = 0;
  let stats = {};

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

  function rotulo(topico, chave) {
    return TOPICOS[topico].opcoes[chave].rotulo;
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
    // Pontuação: começar pela primeira palavra vale mais.
    return pal[0].startsWith(consulta[0]) ? 2 : 1;
  }

  function calcularSugestoes(texto) {
    const consulta = normalizar(texto).split(" ").filter(Boolean);
    if (!consulta.length) return [];
    const resultado = [];
    for (const o of RESPOSTAS) {
      if (!selecionados.includes(o.topico)) continue;
      let melhor = -1;
      for (const f of o.formas) melhor = Math.max(melhor, casa(consulta, f));
      if (melhor > 0) resultado.push({ o, pontos: melhor });
    }
    resultado.sort((a, b) => b.pontos - a.pontos || a.o.rotulo.localeCompare(b.o.rotulo, "pt"));
    // Se o texto já é exatamente uma resposta completa, não há o que sugerir.
    if (resultado.length === 1 && normalizar(resultado[0].o.rotulo) === normalizar(texto)) return [];
    return resultado.slice(0, MAX_SUGESTOES).map((r) => r.o);
  }

  function destacarCasamento(rot, texto) {
    // Deixa em negrito o começo das palavras que casaram com o que foi digitado.
    const consulta = normalizar(texto).split(" ").filter(Boolean);
    const frag = document.createDocumentFragment();
    const partes = rot.split(/(\s+)/);
    let qi = 0;
    for (const p of partes) {
      const pn = normalizar(p);
      if (qi < consulta.length && pn && pn.startsWith(consulta[qi])) {
        const n = consulta[qi].length;
        // As letras normalizadas correspondem 1:1 às originais (só acentos removidos).
        const b = document.createElement("b");
        b.textContent = p.slice(0, n);
        frag.append(b, document.createTextNode(p.slice(n)));
        qi++;
      } else {
        frag.append(document.createTextNode(p));
      }
    }
    return frag;
  }

  function mostrarSugestoes() {
    if (respondida) return fecharSugestoes();
    sugestoesAtuais = calcularSugestoes(input.value);
    ativa = -1;
    listaSugestoes.textContent = "";
    if (!sugestoesAtuais.length) return fecharSugestoes();

    sugestoesAtuais.forEach((o, i) => {
      const li = document.createElement("li");
      li.id = "sug-" + i;
      li.role = "option";
      li.className = "sugestao";
      const texto = document.createElement("span");
      texto.append(destacarCasamento(o.rotulo, input.value));
      li.append(texto);
      if (selecionados.length > 1) {
        const tag = document.createElement("span");
        tag.className = "sugestao-topico";
        tag.textContent = TOPICOS[o.topico].nome;
        li.append(tag);
      }
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
    } else {
      input.removeAttribute("aria-activedescendant");
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

  function carregarSelecao() {
    try {
      const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(salvo)) return salvo.filter((t) => t in TOPICOS);
    } catch (_) {}
    return [];
  }

  function salvarSelecao() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selecionados));
    } catch (_) {}
  }

  function montarConfig() {
    const salvos = carregarSelecao();
    listaTopicos.textContent = "";
    for (const [chave, info] of Object.entries(TOPICOS)) {
      const qtd = EXERCICIOS.filter((e) => e.topico === chave).length;
      if (!qtd) continue;

      const label = document.createElement("label");
      label.className = "topico-opcao";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = chave;
      cb.checked = salvos.includes(chave);

      const texto = document.createElement("span");
      texto.className = "topico-texto";

      const linha = document.createElement("span");
      linha.className = "topico-linha";
      const nome = document.createElement("span");
      nome.className = "topico-nome";
      nome.textContent = info.nome;
      const contagem = document.createElement("span");
      contagem.className = "topico-qtd";
      contagem.textContent = qtd + " frases";
      linha.append(nome, contagem);

      const classes = document.createElement("span");
      classes.className = "topico-classes";
      const rotulos = Object.values(info.opcoes).map((o) => o.rotulo.replace(/\s*\(.*?\)/, ""));
      classes.textContent = rotulos.length > 1 ? rotulos.join(" · ") : "Só a classe gramatical";

      texto.append(linha, classes);
      label.append(cb, texto);
      listaTopicos.append(label);
    }
  }

  function lerSelecao() {
    return Array.from(listaTopicos.querySelectorAll("input:checked")).map((cb) => cb.value);
  }

  $("#btn-todas").addEventListener("click", () => {
    const cbs = listaTopicos.querySelectorAll("input");
    const todas = Array.from(cbs).every((cb) => cb.checked);
    cbs.forEach((cb) => (cb.checked = !todas));
  });

  $("#btn-comecar").addEventListener("click", () => {
    selecionados = lerSelecao();
    if (!selecionados.length) {
      avisoConfig.textContent = "Selecione pelo menos um tópico.";
      return;
    }
    avisoConfig.textContent = "";
    salvarSelecao();
    iniciarTreino();
  });

  $("#btn-voltar").addEventListener("click", () => {
    fecharSugestoes();
    telaTreino.hidden = true;
    telaConfig.hidden = false;
    window.scrollTo(0, 0);
  });

  // ---------- treino ----------

  function iniciarTreino() {
    stats = {};
    selecionados.forEach((t) => (stats[t] = { acertos: 0, erros: 0 }));
    novaRodada();
    telaConfig.hidden = true;
    telaTreino.hidden = false;
    proxima();
  }

  function novaRodada() {
    fila = embaralhar(EXERCICIOS.filter((e) => selecionados.includes(e.topico)));
    totalRodada = fila.length;
    feitas = 0;
  }

  function renderFrase(frase) {
    fraseEl.textContent = "";
    frase.split(/\[(.+?)\]/).forEach((parte, i) => {
      if (i % 2 === 1) {
        const mark = document.createElement("mark");
        mark.className = "alvo";
        mark.textContent = parte;
        fraseEl.append(mark);
      } else if (parte) {
        fraseEl.append(document.createTextNode(parte));
      }
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
    if (!fila.length) {
      novaRodada();
      atual = null;
      mostrarFeedback("info", "Rodada completa!", ["Você passou por todas as frases dos tópicos selecionados. Elas foram embaralhadas para uma nova rodada."]);
      modoResposta(false);
      btnProxima.focus();
      atualizarPlacar();
      return;
    }

    atual = fila.pop();
    feitas++;
    perguntaEl.textContent = TOPICOS[atual.topico].pergunta;
    renderFrase(atual.frase);
    feedback.hidden = true;
    input.value = "";
    modoResposta(true);
    atualizarPlacar();
    // No celular, focar abre o teclado e pode esconder a frase; só foca em telas largas.
    if (window.matchMedia("(min-width: 700px)").matches) input.focus();
  }

  function mostrarFeedback(tipo, titulo, paragrafos) {
    feedback.textContent = "";
    feedback.className = "feedback " + tipo;
    const h = document.createElement("strong");
    h.className = "feedback-titulo";
    h.textContent = titulo;
    feedback.append(h);
    for (const p of paragrafos.filter(Boolean)) {
      const el = document.createElement("p");
      if (Array.isArray(p)) {
        const b = document.createElement("b");
        b.textContent = p[0];
        el.append(b, document.createTextNode(p[1]));
      } else {
        el.textContent = p;
      }
      feedback.append(el);
    }
    feedback.hidden = false;
  }

  function corrigir(escolha) {
    const certa = rotulo(atual.topico, atual.resposta);
    const resumoCerta = TOPICOS[atual.topico].opcoes[atual.resposta].resumo;

    if (escolha && escolha.topico === atual.topico && escolha.chave === atual.resposta) {
      stats[atual.topico].acertos++;
      mostrarFeedback("acerto", "Acertou! " + certa + ".", [atual.explicacao]);
    } else {
      stats[atual.topico].erros++;
      const paragrafos = [atual.explicacao, ["Lembre-se: ", resumoCerta]];
      if (escolha) {
        const resumoErrada = TOPICOS[escolha.topico].opcoes[escolha.chave].resumo;
        paragrafos.push(["Você respondeu " + escolha.rotulo + ": ", resumoErrada]);
      }
      const titulo = escolha ? "Errou. A resposta é " + certa + "." : "A resposta é " + certa + ".";
      mostrarFeedback("erro", titulo, paragrafos);
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

  function atualizarPlacar() {
    let acertos = 0;
    let erros = 0;
    for (const s of Object.values(stats)) {
      acertos += s.acertos;
      erros += s.erros;
    }
    placarAcertos.textContent = acertos;
    placarErros.textContent = erros;
    progresso.textContent = feitas + " / " + totalRodada;

    desempenho.textContent = "";
    for (const t of selecionados) {
      const s = stats[t];
      const total = s.acertos + s.erros;
      const pct = total ? Math.round((s.acertos / total) * 100) : 0;

      const linha = document.createElement("div");
      linha.className = "desempenho-linha";

      const nome = document.createElement("span");
      nome.className = "desempenho-nome";
      nome.textContent = TOPICOS[t].nome;

      const barra = document.createElement("span");
      barra.className = "barra";
      const preenchido = document.createElement("span");
      preenchido.className = "barra-preenchida";
      preenchido.style.width = pct + "%";
      barra.append(preenchido);

      const valor = document.createElement("span");
      valor.className = "desempenho-valor";
      valor.textContent = total ? s.acertos + "/" + total : "—";

      linha.append(nome, barra, valor);
      desempenho.append(linha);
    }
  }

  montarConfig();
})();
