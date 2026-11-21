registrarExercicios("sujeito", [
  // ===== SIMPLES =====
  {
    frase: "[Chegaram] os convidados do noivo.",
    resposta: "simples",
    explicacao: "O sujeito “os convidados do noivo” vem depois do verbo (sujeito posposto). Tem um só núcleo, “convidados”, por isso é simples.",
  },
  {
    frase: "A multidão [invadiu] a praça central.",
    resposta: "simples",
    explicacao: "O sujeito é “a multidão”, de núcleo “multidão”. Ser substantivo coletivo não torna o sujeito composto: continua havendo um único núcleo.",
  },
  {
    frase: "[Alugam-se] apartamentos mobiliados.",
    resposta: "simples",
    explicacao: "Voz passiva sintética: “alugar” é transitivo direto e o “se” é pronome apassivador. Equivale a “Apartamentos mobiliados são alugados”; o sujeito é “apartamentos mobiliados” (núcleo “apartamentos”), não indeterminado.",
  },
  {
    frase: "[Existem] várias soluções para o problema.",
    resposta: "simples",
    explicacao: "Diferentemente de “haver”, o verbo “existir” é pessoal e tem sujeito: “várias soluções para o problema”, de núcleo “soluções”. Por isso concorda no plural.",
  },
  {
    frase: "Ninguém [respondeu] ao chamado do síndico.",
    resposta: "simples",
    explicacao: "O pronome indefinido “ninguém” é o sujeito, com um único núcleo. Não confunda: o sujeito está expresso, apenas não identifica uma pessoa específica.",
  },
  {
    frase: "[Choveram] críticas ao novo projeto.",
    resposta: "simples",
    explicacao: "Em sentido figurado, “chover” deixa de ser impessoal e passa a ter sujeito: “críticas ao novo projeto”, de núcleo “críticas”. Por isso o verbo vai ao plural.",
  },
  {
    frase: "[Foi aprovado] o projeto de lei pelos deputados.",
    resposta: "simples",
    explicacao: "Voz passiva analítica com sujeito posposto: “o projeto de lei” (núcleo “projeto”). “Pelos deputados” é agente da passiva, não sujeito.",
  },
  {
    frase: "Tudo [parecia] tranquilo naquela manhã.",
    resposta: "simples",
    explicacao: "O pronome indefinido “tudo” é o sujeito, com núcleo único. O verbo de ligação “parecia” liga esse sujeito ao predicativo “tranquilo”.",
  },
  {
    frase: "[Faltam] dois dias para a prova.",
    resposta: "simples",
    explicacao: "O sujeito “dois dias” vem posposto ao verbo, e o núcleo é “dias”. “Faltar” é verbo pessoal: concorda com o sujeito no plural.",
  },
  {
    frase: "Nós [vamos viajar] nas férias de julho.",
    resposta: "simples",
    explicacao: "O pronome “nós” está expresso na frase, então o sujeito é simples, não oculto. Só seria oculto em “Vamos viajar nas férias de julho”.",
  },

  // ===== COMPOSTO =====
  {
    frase: "[Saíram] Pedro e Paulo antes do fim da reunião.",
    resposta: "composto",
    explicacao: "O sujeito “Pedro e Paulo” vem depois do verbo, mas tem dois núcleos (“Pedro” e “Paulo”). Sujeito posposto não deixa de ser composto.",
  },
  {
    frase: "O pai e a mãe [assinaram] a autorização.",
    resposta: "composto",
    explicacao: "O sujeito “o pai e a mãe” tem dois núcleos: “pai” e “mãe”.",
  },
  {
    frase: "Café, pão e manteiga [estavam] sobre a mesa.",
    resposta: "composto",
    explicacao: "O sujeito tem três núcleos: “café”, “pão” e “manteiga”. Basta haver dois ou mais núcleos para o sujeito ser composto.",
  },
  {
    frase: "Eu e você [faremos] o relatório juntos.",
    resposta: "composto",
    explicacao: "Os núcleos são os pronomes “eu” e “você”. O verbo vai para a 1ª pessoa do plural porque a 1ª pessoa prevalece na concordância com sujeito composto.",
  },
  {
    frase: "Nem o diretor nem o vice [compareceram] à cerimônia.",
    resposta: "composto",
    explicacao: "Mesmo com a negação “nem... nem”, há dois núcleos no sujeito: “diretor” e “vice”. O sujeito é composto.",
  },
  {
    frase: "[Venderam-se] a casa e o terreno.",
    resposta: "composto",
    explicacao: "Voz passiva sintética (“vender” é transitivo direto, “se” é apassivador). Equivale a “A casa e o terreno foram vendidos”: sujeito composto, de núcleos “casa” e “terreno”.",
  },
  {
    frase: "Tanto a chuva quanto o vento [prejudicaram] a colheita.",
    resposta: "composto",
    explicacao: "A correlação “tanto... quanto” une dois núcleos no sujeito: “chuva” e “vento”.",
  },
  {
    frase: "A lua e as estrelas [iluminavam] a estrada deserta.",
    resposta: "composto",
    explicacao: "O sujeito “a lua e as estrelas” tem dois núcleos: “lua” e “estrelas”.",
  },
  {
    frase: "O medo, a angústia e a solidão [tomaram] conta do viajante.",
    resposta: "composto",
    explicacao: "O sujeito tem três núcleos (“medo”, “angústia” e “solidão”), todos ligados ao mesmo verbo.",
  },
  {
    frase: "[Foram presos] o assaltante e seu cúmplice.",
    resposta: "composto",
    explicacao: "Voz passiva analítica com sujeito posposto: “o assaltante e seu cúmplice”, de núcleos “assaltante” e “cúmplice”.",
  },

  // ===== OCULTO =====
  {
    frase: "[Estudamos] gramática durante toda a madrugada.",
    resposta: "oculto",
    explicacao: "O sujeito “nós” não aparece, mas é identificado pela desinência “-mos” do verbo. É sujeito oculto (elíptico ou desinencial).",
  },
  {
    frase: "[Amanheci] cansado depois da viagem.",
    resposta: "oculto",
    explicacao: "Aqui “amanhecer” está em sentido figurado (= acordar, estar ao amanhecer), deixando de ser impessoal. O sujeito é “eu”, identificado pela desinência: sujeito oculto, não oração sem sujeito.",
  },
  {
    frase: "[Comprei] um livro de poemas na feira.",
    resposta: "oculto",
    explicacao: "A terminação do verbo indica a 1ª pessoa do singular: o sujeito é “eu”, que não está escrito na frase.",
  },
  {
    frase: "[Chegaste] tarde demais à estação.",
    resposta: "oculto",
    explicacao: "A desinência “-ste” identifica a 2ª pessoa do singular: o sujeito oculto é “tu”.",
  },
  {
    frase: "[Precisamos] de mais tempo para terminar o projeto.",
    resposta: "oculto",
    explicacao: "O sujeito é “nós”, identificado pela desinência “-mos”. Não confunda com “Precisa-se de mais tempo”, em que o “se” indetermina o sujeito.",
  },
  {
    frase: "[Vou sair] mais cedo hoje.",
    resposta: "oculto",
    explicacao: "Na locução verbal, o auxiliar “vou” indica a 1ª pessoa do singular: o sujeito oculto é “eu”.",
  },
  {
    frase: "Na semana passada, [visitamos] o museu da cidade.",
    resposta: "oculto",
    explicacao: "O sujeito “nós” está implícito na desinência verbal “-mos”. A expressão “na semana passada” é adjunto adverbial, não sujeito.",
  },
  {
    frase: "[Fiquei] satisfeito com o resultado.",
    resposta: "oculto",
    explicacao: "A forma “fiquei” só pode referir-se a “eu”, que não aparece na frase. É sujeito oculto; “satisfeito” é predicativo.",
  },
  {
    frase: "[Vendemos] o carro antigo da família.",
    resposta: "oculto",
    explicacao: "O sujeito é “nós”, identificado pela desinência. Compare com “Vendeu-se o carro”, em que o sujeito é “o carro” (passiva sintética).",
  },
  {
    frase: "[Fazes] sempre as mesmas perguntas.",
    resposta: "oculto",
    explicacao: "“Fazer” aqui é pessoal (tem sentido de realizar), e a desinência “-s” indica a 2ª pessoa: sujeito oculto “tu”. Não confunda com “Faz frio”, oração sem sujeito.",
  },

  // ===== INDETERMINADO =====
  {
    frase: "[Roubaram] a bicicleta do vizinho.",
    resposta: "indeterminado",
    explicacao: "Verbo na 3ª pessoa do plural sem nenhum referente na frase: alguém praticou a ação, mas não se sabe quem. O sujeito é indeterminado.",
  },
  {
    frase: "[Estão falando] mal de você no escritório.",
    resposta: "indeterminado",
    explicacao: "A locução está na 3ª pessoa do plural e não há a quem ela se refira na frase. Não se identifica quem fala: sujeito indeterminado.",
  },
  {
    frase: "[Precisa-se] de vendedores com experiência.",
    resposta: "indeterminado",
    explicacao: "“Precisar” é transitivo indireto (precisar de), então o “se” é índice de indeterminação do sujeito. “De vendedores” é objeto indireto, não sujeito; por isso o verbo fica no singular.",
  },
  {
    frase: "[Vive-se] bem nesta pequena cidade.",
    resposta: "indeterminado",
    explicacao: "“Viver” é intransitivo; com o “se” (índice de indeterminação do sujeito), não se identifica quem vive. Sujeito indeterminado.",
  },
  {
    frase: "[Trata-se] de um caso grave de corrupção.",
    resposta: "indeterminado",
    explicacao: "“Tratar-se de” é transitivo indireto, e o “se” indetermina o sujeito. “De um caso grave” é objeto indireto, por isso o verbo fica sempre no singular.",
  },
  {
    frase: "[Era-se] mais feliz antigamente.",
    resposta: "indeterminado",
    explicacao: "Verbo de ligação (“ser”) acompanhado de “se” indetermina o sujeito: não se diz quem era feliz. “Mais feliz” é predicativo.",
  },
  {
    frase: "[Bateram] à porta durante a madrugada.",
    resposta: "indeterminado",
    explicacao: "Verbo na 3ª pessoa do plural sem referente expresso: não se sabe quem bateu. “À porta” é adjunto adverbial, não sujeito.",
  },
  {
    frase: "[Confia-se] em bons profissionais.",
    resposta: "indeterminado",
    explicacao: "“Confiar” é transitivo indireto (confiar em); o “se” é índice de indeterminação do sujeito. “Em bons profissionais” é objeto indireto, e o verbo não vai ao plural.",
  },
  {
    frase: "[Obedeceu-se] às normas de segurança.",
    resposta: "indeterminado",
    explicacao: "“Obedecer” é transitivo indireto (obedecer a), então o “se” é índice de indeterminação. “Às normas” é objeto indireto, não sujeito; por isso o verbo fica no singular.",
  },
  {
    frase: "[Telefonaram] para você hoje cedo.",
    resposta: "indeterminado",
    explicacao: "Verbo na 3ª pessoa do plural sem referente: alguém telefonou, mas a frase não identifica quem. Sujeito indeterminado.",
  },

  // ===== INEXISTENTE =====
  {
    frase: "[Choveu] muito durante a madrugada.",
    resposta: "inexistente",
    explicacao: "Verbo que indica fenômeno da natureza, em sentido próprio, é impessoal: a oração não tem sujeito.",
  },
  {
    frase: "[Houve] problemas na apuração dos votos.",
    resposta: "inexistente",
    explicacao: "“Haver” no sentido de existir ou acontecer é impessoal e fica no singular. “Problemas” é objeto direto, não sujeito.",
  },
  {
    frase: "[Há] muitos candidatos inscritos neste concurso.",
    resposta: "inexistente",
    explicacao: "“Haver” = existir é impessoal: oração sem sujeito, e “muitos candidatos” é objeto direto. Compare: em “Existem muitos candidatos”, o sujeito é simples.",
  },
  {
    frase: "[Deve haver] erros na planilha.",
    resposta: "inexistente",
    explicacao: "O impessoal “haver” (= existir) transmite sua impessoalidade ao auxiliar “dever”, que fica no singular. “Erros” é objeto direto; a oração não tem sujeito.",
  },
  {
    frase: "[Fez] muito frio no último inverno.",
    resposta: "inexistente",
    explicacao: "“Fazer” indicando clima é impessoal: não há sujeito. “Muito frio” é objeto direto.",
  },
  {
    frase: "[São] dez horas da noite.",
    resposta: "inexistente",
    explicacao: "“Ser” indicando hora é impessoal. Ele concorda com o numeral (“dez horas”), mas isso não cria sujeito: é oração sem sujeito.",
  },
  {
    frase: "[Está] quente demais nesta sala.",
    resposta: "inexistente",
    explicacao: "“Estar” indicando clima ou temperatura é impessoal: a oração não tem sujeito.",
  },
  {
    frase: "Já [passava] das oito.",
    resposta: "inexistente",
    explicacao: "“Passar de” indicando tempo (horas) é impessoal e fica no singular. “Das oito” não é sujeito: a oração não tem sujeito.",
  },
  {
    frase: "[Faz] cinco anos que me formei.",
    resposta: "inexistente",
    explicacao: "“Fazer” indicando tempo decorrido é impessoal e não vai ao plural (nunca “fazem cinco anos”). “Cinco anos” é objeto direto; a oração não tem sujeito.",
  },
  {
    frase: "No verão, [amanhece] mais cedo.",
    resposta: "inexistente",
    explicacao: "“Amanhecer” em sentido próprio (o dia clarear) é fenômeno da natureza e é impessoal. Compare com “Amanheci cansado”, em sentido figurado, que tem sujeito oculto.",
  },
]);
