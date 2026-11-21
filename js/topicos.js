// Tópicos de treino e suas classificações.
//
// Cada tópico tem:
//   nome:      nome exibido na tela de seleção
//   pergunta:  o que o usuário deve responder sobre o trecho destacado
//   apelidos:  formas de escrever o nome do tópico sozinho (usado para avisar
//              que falta a classificação quando a pessoa escreve só "substantivo")
//   opcoes:    as classificações possíveis. Cada uma tem:
//                rotulo:  texto exibido na sugestão e na correção
//                curto:   (opcional) nome no botão de seleção; sem ele, usa o rótulo sem o nome do tópico
//                aceitas: outras formas de escrever a mesma resposta
//                resumo:  lembrete mostrado quando a pessoa erra
//
// Os exercícios ficam em js/dados/<tópico>.js e usam a chave da opção em "resposta".

const TOPICOS = {
  substantivo: {
    nome: "Substantivo",
    pergunta: "Classifique o substantivo destacado.",
    apelidos: ["substantivo", "subst"],
    opcoes: {
      concreto: {
        rotulo: "Substantivo Concreto",
        aceitas: ["concreto"],
        resumo: "Substantivo concreto nomeia seres que existem por si mesmos, reais ou imaginários: pessoas, animais, objetos, lugares e também seres como Deus, fada e saci.",
      },
      abstrato: {
        rotulo: "Substantivo Abstrato",
        aceitas: ["abstrato"],
        resumo: "Substantivo abstrato nomeia o que depende de outro ser para existir: sentimentos, ações, estados e qualidades (amor, corrida, cansaço, beleza).",
      },
    },
  },

  artigo: {
    nome: "Artigo",
    pergunta: "Classifique o artigo destacado.",
    apelidos: ["artigo", "art"],
    opcoes: {
      definido: {
        rotulo: "Artigo Definido",
        aceitas: ["definido"],
        resumo: "Artigo definido (o, a, os, as) determina o substantivo de forma precisa, indicando um ser já conhecido ou específico.",
      },
      indefinido: {
        rotulo: "Artigo Indefinido",
        aceitas: [],
        resumo: "Artigo indefinido (um, uma, uns, umas) apresenta o substantivo de forma vaga, indicando um ser qualquer, não especificado.",
      },
    },
  },

  adjetivo: {
    nome: "Adjetivo",
    pergunta: "Qual é a classe gramatical do termo destacado?",
    apelidos: [],
    opcoes: {
      adjetivo: {
        rotulo: "Adjetivo",
        aceitas: ["adj"],
        resumo: "Adjetivo é a palavra que caracteriza o substantivo, atribuindo-lhe qualidade, estado ou origem, e concorda com ele em gênero e número.",
      },
    },
  },

  preposicao: {
    nome: "Preposição",
    pergunta: "Qual é a classe gramatical do termo destacado?",
    apelidos: [],
    opcoes: {
      preposicao: {
        rotulo: "Preposição",
        aceitas: ["prep"],
        resumo: "Preposição é a palavra invariável que liga dois termos, estabelecendo relação de dependência entre eles (a, de, com, em, para, por, sem, sobre, até...).",
      },
    },
  },

  verbo: {
    nome: "Verbo",
    pergunta: "O termo destacado é um verbo ou uma locução verbal?",
    apelidos: [],
    opcoes: {
      verbo: {
        rotulo: "Verbo",
        aceitas: ["verbo simples", "forma simples"],
        resumo: "Verbo é a palavra que exprime ação, estado ou fenômeno da natureza. Quando aparece sozinho, sem auxiliar, forma o predicado com uma única palavra verbal.",
      },
      locucao: {
        rotulo: "Locução Verbal",
        aceitas: ["locucao"],
        resumo: "Locução verbal é a combinação de verbo auxiliar + verbo principal em forma nominal (infinitivo, gerúndio ou particípio), funcionando como um único verbo: vou estudar, estava dormindo, foi aprovado.",
      },
    },
  },

  adverbio: {
    nome: "Advérbio",
    pergunta: "Classifique o advérbio ou a locução adverbial destacada.",
    apelidos: ["adverbio", "locucao adverbial", "adv"],
    opcoes: {
      tempo: {
        curto: "Tempo",
        rotulo: "Advérbio de Tempo",
        aceitas: ["adv de tempo", "tempo"],
        resumo: "Advérbio de tempo indica quando o fato ocorre: hoje, ontem, amanhã, cedo, tarde, já, sempre, nunca, logo, depois.",
      },
      lugar: {
        curto: "Lugar",
        rotulo: "Advérbio de Lugar",
        aceitas: ["adv de lugar", "lugar"],
        resumo: "Advérbio de lugar indica onde o fato ocorre: aqui, ali, lá, cá, perto, longe, acima, abaixo, dentro, fora.",
      },
      modo: {
        curto: "Modo",
        rotulo: "Advérbio de Modo",
        aceitas: ["adv de modo", "modo"],
        resumo: "Advérbio de modo indica como o fato ocorre: bem, mal, assim, depressa, devagar e a maioria das palavras terminadas em -mente.",
      },
      loc_tempo: {
        curto: "Locução de Tempo",
        rotulo: "Locução Adverbial de Tempo",
        aceitas: [],
        resumo: "Locução adverbial é um grupo de palavras (geralmente preposição + substantivo/advérbio) com valor de advérbio. A de tempo indica quando: à noite, de manhã, de vez em quando, em breve.",
      },
      loc_lugar: {
        curto: "Locução de Lugar",
        rotulo: "Locução Adverbial de Lugar",
        aceitas: [],
        resumo: "Locução adverbial é um grupo de palavras com valor de advérbio. A de lugar indica onde: em casa, ao lado, por perto, de longe, à direita.",
      },
      loc_modo: {
        curto: "Locução de Modo",
        rotulo: "Locução Adverbial de Modo",
        aceitas: [],
        resumo: "Locução adverbial é um grupo de palavras com valor de advérbio. A de modo indica como: às pressas, em silêncio, à vontade, de cor, passo a passo.",
      },
    },
  },

  pronome: {
    nome: "Pronome",
    pergunta: "Classifique o pronome destacado.",
    apelidos: ["pronome"],
    opcoes: {
      pessoal: {
        rotulo: "Pronome Pessoal",
        aceitas: ["pessoal", "pronome pessoal reto", "pronome pessoal obliquo", "pronome pessoal do caso reto", "pronome pessoal do caso obliquo", "pronome de tratamento", "pronome pessoal de tratamento"],
        resumo: "Pronome pessoal indica as pessoas do discurso. Retos: eu, tu, ele, nós, vós, eles. Oblíquos: me, te, se, o, a, lhe, nos, vos, mim, ti, comigo... Também os de tratamento: você, Vossa Excelência.",
      },
      possessivo: {
        rotulo: "Pronome Possessivo",
        aceitas: ["possessivo"],
        resumo: "Pronome possessivo indica posse em relação às pessoas do discurso: meu, teu, seu, nosso, vosso, dele (e flexões).",
      },
      demonstrativo: {
        rotulo: "Pronome Demonstrativo",
        aceitas: ["demonstrativo"],
        resumo: "Pronome demonstrativo situa o ser no espaço, no tempo ou no texto: este, esse, aquele, isto, isso, aquilo, o/a (= aquele/aquela), mesmo, próprio, tal.",
      },
      indefinido: {
        rotulo: "Pronome Indefinido",
        aceitas: [],
        resumo: "Pronome indefinido refere-se à 3ª pessoa de modo vago ou impreciso: alguém, ninguém, tudo, nada, algum, nenhum, todo, outro, muito, pouco, cada, qualquer, certo.",
      },
      interrogativo: {
        rotulo: "Pronome Interrogativo",
        aceitas: ["interrogativo"],
        resumo: "Pronome interrogativo é usado para fazer perguntas, diretas ou indiretas: que, quem, qual, quanto.",
      },
    },
  },

  sujeito: {
    nome: "Sujeito",
    pergunta: "Classifique o sujeito do verbo destacado.",
    apelidos: ["sujeito"],
    opcoes: {
      simples: {
        rotulo: "Sujeito Simples",
        aceitas: ["simples"],
        resumo: "Sujeito simples tem um único núcleo: “Os alunos estudaram”, “Vendem-se casas” (casas é o sujeito).",
      },
      composto: {
        rotulo: "Sujeito Composto",
        aceitas: ["composto"],
        resumo: "Sujeito composto tem dois ou mais núcleos: “Pedro e Ana viajaram”.",
      },
      oculto: {
        rotulo: "Sujeito Oculto",
        aceitas: ["oculto", "sujeito eliptico", "sujeito desinencial", "sujeito implicito", "eliptico", "desinencial"],
        resumo: "Sujeito oculto (elíptico ou desinencial) não aparece na oração, mas é identificado pela terminação do verbo ou pelo contexto: “Estudamos muito” (nós).",
      },
      indeterminado: {
        rotulo: "Sujeito Indeterminado",
        aceitas: ["indeterminado"],
        resumo: "Sujeito indeterminado existe, mas não se pode ou não se quer identificá-lo: verbo na 3ª pessoa do plural sem referente (“Roubaram meu carro”) ou verbo não transitivo direto + se (“Precisa-se de vendedores”).",
      },
      inexistente: {
        rotulo: "Sujeito Inexistente",
        aceitas: ["inexistente", "oracao sem sujeito", "sem sujeito"],
        resumo: "Oração sem sujeito ocorre com verbos impessoais: fenômenos da natureza (choveu), haver no sentido de existir ou tempo decorrido, fazer/estar/ser indicando tempo ou clima.",
      },
    },
  },

  predicacao: {
    nome: "Predicação Verbal",
    pergunta: "Classifique a predicação do verbo destacado.",
    apelidos: ["predicacao verbal", "predicacao", "transitividade"],
    opcoes: {
      vtd: {
        curto: "VTD",
        rotulo: "Verbo Transitivo Direto (VTD)",
        aceitas: ["vtd", "verbo transitivo direto", "transitivo direto"],
        resumo: "VTD exige complemento sem preposição obrigatória (objeto direto): “Comprei um livro”.",
      },
      vti: {
        curto: "VTI",
        rotulo: "Verbo Transitivo Indireto (VTI)",
        aceitas: ["vti", "verbo transitivo indireto", "transitivo indireto"],
        resumo: "VTI exige complemento com preposição obrigatória (objeto indireto): “Gosto de música”, “Obedeça aos pais”.",
      },
      vtdi: {
        curto: "VTDI",
        rotulo: "Verbo Transitivo Direto e Indireto (VTDI)",
        aceitas: ["vtdi", "verbo transitivo direto e indireto", "transitivo direto e indireto", "bitransitivo", "verbo bitransitivo"],
        resumo: "VTDI exige dois complementos: um sem preposição (OD) e outro com preposição (OI): “Entreguei o relatório ao chefe”.",
      },
      vi: {
        curto: "VI",
        rotulo: "Verbo Intransitivo (VI)",
        aceitas: ["vi", "verbo intransitivo", "intransitivo"],
        resumo: "VI tem sentido completo e não exige complemento. Pode vir acompanhado de adjuntos adverbiais: “O bebê dormiu cedo”, “Fomos ao cinema”.",
      },
      vl: {
        curto: "VL",
        rotulo: "Verbo de Ligação (VL)",
        aceitas: ["vl", "verbo de ligacao", "ligacao"],
        resumo: "VL não indica ação: liga o sujeito a uma característica (predicativo do sujeito). Principais: ser, estar, parecer, permanecer, ficar, continuar, andar, virar, tornar-se.",
      },
    },
  },

  complemento: {
    nome: "Complemento Verbal",
    pergunta: "Classifique o complemento verbal destacado.",
    apelidos: ["complemento verbal", "complemento", "objeto"],
    opcoes: {
      od: {
        curto: "Direto",
        rotulo: "Objeto Direto",
        aceitas: ["od"],
        resumo: "Objeto direto completa o sentido de um VTD sem preposição: “Comprei frutas”.",
      },
      od_prep: {
        curto: "Direto Preposicionado",
        rotulo: "Objeto Direto Preposicionado",
        aceitas: ["od preposicionado", "odp"],
        resumo: "Objeto direto preposicionado completa um VTD, mas vem com preposição não exigida pelo verbo: com nomes de Deus/pessoas (“Amar a Deus”), pronomes oblíquos tônicos (“Feriu a si mesmo”), sentido partitivo (“Comeu do bolo”) ou para evitar ambiguidade.",
      },
      od_pleo: {
        curto: "Direto Pleonástico",
        rotulo: "Objeto Direto Pleonástico",
        aceitas: ["od pleonastico"],
        resumo: "Objeto direto pleonástico é a repetição do objeto direto por meio de pronome oblíquo, para dar ênfase: “O livro, li-o ontem”.",
      },
      od_interno: {
        curto: "Direto Interno",
        rotulo: "Objeto Direto Interno",
        aceitas: ["objeto direto cognato", "objeto direto interno ou cognato", "objeto cognato", "objeto interno", "od interno", "od cognato"],
        resumo: "Objeto direto interno (cognato) é o objeto de um verbo normalmente intransitivo, com o mesmo radical ou campo de sentido do verbo, geralmente acompanhado de adjunto: “Viveu uma vida tranquila”, “Chorou lágrimas amargas”.",
      },
      oi: {
        curto: "Indireto",
        rotulo: "Objeto Indireto",
        aceitas: ["oi"],
        resumo: "Objeto indireto completa o sentido de um VTI ou VTDI por meio de preposição exigida pelo verbo: “Gosto de música”, “Entreguei a carta ao diretor”. O pronome “lhe” costuma ser objeto indireto.",
      },
      oi_pleo: {
        curto: "Indireto Pleonástico",
        rotulo: "Objeto Indireto Pleonástico",
        aceitas: ["oi pleonastico"],
        resumo: "Objeto indireto pleonástico é a repetição do objeto indireto por meio de pronome oblíquo, para dar ênfase: “Ao diretor, entreguei-lhe a carta”.",
      },
    },
  },
};

// Exercícios agrupados por tópico. Os arquivos em js/dados/ chamam registrarExercicios.
const EXERCICIOS = [];

function registrarExercicios(topico, lista) {
  for (const ex of lista) EXERCICIOS.push({ topico, ...ex });
}
