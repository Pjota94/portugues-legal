(function () {
  "use strict";

  const STORAGE_KEY = "portugues-legal:classes";

  const $ = (sel) => document.querySelector(sel);

  const telaConfig = $("#tela-config");
  const telaTreino = $("#tela-treino");
  const listaClasses = $("#lista-classes");
  const avisoConfig = $("#aviso-config");
  const fraseEl = $("#frase");
  const form = $("#form-resposta");
  const input = $("#resposta");
  const btnResponder = $("#btn-responder");
  const btnProxima = $("#btn-proxima");
  const feedback = $("#feedback");
  const emTreino = $("#em-treino");
  const placarAcertos = $("#placar-acertos");
  const placarErros = $("#placar-erros");
  const progresso = $("#progresso");
  const desempenho = $("#desempenho");

  let selecionadas = [];
  let fila = [];
  let atual = null;
  let respondida = false;
  let totalRodada = 0;
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

  // Descobre qual classe o usuário escreveu (ou null se não reconhecer).
  function identificarClasse(resposta) {
    const r = normalizar(resposta);
    if (!r) return null;
    for (const [chave, info] of Object.entries(CLASSES)) {
      if (info.aceitas.some((a) => normalizar(a) === r)) return chave;
    }
    // Aceita respostas que começam com o nome da classe ("artigo definido feminino").
    for (const [chave, info] of Object.entries(CLASSES)) {
      if (r.split(" ")[0] === normalizar(info.nome)) return chave;
    }
    return null;
  }

  // ---------- tela de configuração ----------

  function carregarSelecao() {
    try {
      const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(salvo)) return salvo.filter((c) => c in CLASSES);
    } catch (_) {}
    return [];
  }

  function salvarSelecao() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selecionadas));
    } catch (_) {}
  }

  function montarConfig() {
    const salvas = carregarSelecao();
    listaClasses.textContent = "";
    for (const [chave, info] of Object.entries(CLASSES)) {
      const qtd = EXERCICIOS.filter((e) => e.classe === chave).length;
      const label = document.createElement("label");
      label.className = "classe-opcao";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = chave;
      cb.checked = salvas.includes(chave);

      const nome = document.createElement("span");
      nome.className = "classe-nome";
      nome.textContent = info.nome;

      const contagem = document.createElement("span");
      contagem.className = "classe-qtd";
      contagem.textContent = qtd + " frases";

      label.append(cb, nome, contagem);
      listaClasses.append(label);
    }
  }

  function lerSelecao() {
    return Array.from(listaClasses.querySelectorAll("input:checked")).map((cb) => cb.value);
  }

  $("#btn-todas").addEventListener("click", () => {
    const cbs = listaClasses.querySelectorAll("input");
    const todasMarcadas = Array.from(cbs).every((cb) => cb.checked);
    cbs.forEach((cb) => (cb.checked = !todasMarcadas));
  });

  $("#btn-comecar").addEventListener("click", () => {
    selecionadas = lerSelecao();
    if (selecionadas.length === 0) {
      avisoConfig.textContent = "Selecione pelo menos uma classe gramatical.";
      return;
    }
    avisoConfig.textContent = "";
    salvarSelecao();
    iniciarTreino();
  });

  $("#btn-voltar").addEventListener("click", () => {
    telaTreino.hidden = true;
    telaConfig.hidden = false;
  });

  // ---------- treino ----------

  function iniciarTreino() {
    stats = {};
    selecionadas.forEach((c) => (stats[c] = { acertos: 0, erros: 0 }));
    novaRodada();

    emTreino.textContent = "";
    selecionadas.forEach((c) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = CLASSES[c].nome;
      emTreino.append(chip);
    });

    atualizarPlacar();
    telaConfig.hidden = true;
    telaTreino.hidden = false;
    proxima();
  }

  function novaRodada() {
    fila = embaralhar(EXERCICIOS.filter((e) => selecionadas.includes(e.classe)));
    totalRodada = fila.length;
  }

  function renderFrase(frase) {
    fraseEl.textContent = "";
    const partes = frase.split(/\[(.+?)\]/);
    partes.forEach((parte, i) => {
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

  function proxima() {
    if (fila.length === 0) {
      novaRodada();
      mostrarFeedback("info", "Rodada completa!", "Você passou por todas as frases das classes selecionadas. As frases foram embaralhadas para uma nova rodada.");
      atual = null;
      respondida = true;
      input.disabled = true;
      btnResponder.hidden = true;
      btnProxima.hidden = false;
      btnProxima.focus();
      atualizarPlacar();
      return;
    }

    atual = fila.pop();
    respondida = false;
    renderFrase(atual.frase);
    feedback.hidden = true;
    feedback.className = "feedback";
    input.value = "";
    input.disabled = false;
    btnResponder.hidden = false;
    btnProxima.hidden = true;
    atualizarPlacar();
    input.focus();
  }

  function mostrarFeedback(tipo, titulo, ...paragrafos) {
    feedback.textContent = "";
    feedback.className = "feedback " + tipo;
    const h = document.createElement("strong");
    h.className = "feedback-titulo";
    h.textContent = titulo;
    feedback.append(h);
    paragrafos.filter(Boolean).forEach((txt) => {
      const p = document.createElement("p");
      p.textContent = txt;
      feedback.append(p);
    });
    feedback.hidden = false;
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    if (respondida) {
      proxima();
      return;
    }

    const resposta = input.value;
    if (!resposta.trim()) {
      input.focus();
      return;
    }

    const classeResposta = identificarClasse(resposta);
    const nomes = selecionadas.map((c) => CLASSES[c].nome.toLowerCase()).join(", ");

    if (!classeResposta) {
      mostrarFeedback(
        "aviso",
        "Não reconheci essa resposta.",
        "Digite o nome de uma classe gramatical. Classes em treino: " + nomes + "."
      );
      input.select();
      return;
    }

    const certa = CLASSES[atual.classe];
    const palavra = atual.frase.match(/\[(.+?)\]/)[1];

    if (classeResposta === atual.classe) {
      stats[atual.classe].acertos++;
      mostrarFeedback("acerto", "Acertou! É " + certa.nome.toLowerCase() + ".", atual.explicacao);
    } else {
      stats[atual.classe].erros++;
      const errada = CLASSES[classeResposta];
      mostrarFeedback(
        "erro",
        "Errou. \"" + palavra + "\" é " + certa.nome.toLowerCase() + ", não " + errada.nome.toLowerCase() + ".",
        atual.explicacao,
        "Lembre-se — " + certa.nome + ": " + certa.resumo
      );
    }

    respondida = true;
    input.disabled = true;
    btnResponder.hidden = true;
    btnProxima.hidden = false;
    btnProxima.focus();
    atualizarPlacar();
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
    progresso.textContent = (totalRodada - fila.length) + " / " + totalRodada;

    desempenho.textContent = "";
    for (const c of selecionadas) {
      const s = stats[c];
      const total = s.acertos + s.erros;
      const pct = total ? Math.round((s.acertos / total) * 100) : 0;

      const linha = document.createElement("div");
      linha.className = "desempenho-linha";

      const nome = document.createElement("span");
      nome.className = "desempenho-nome";
      nome.textContent = CLASSES[c].nome;

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
