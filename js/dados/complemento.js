registrarExercicios("complemento", [
  // ---------- Objeto direto ----------
  {
    frase: "Vendi [a casa da praia] no ano passado.",
    resposta: "od",
    explicacao: "“Vender” é VTD e “a casa da praia” é seu objeto direto. Pegadinha: o “a” é artigo definido (feminino de “o”), e não preposição; compare com “Vendi o carro”.",
  },
  {
    frase: "Encontrei-[o] na saída do cinema.",
    resposta: "od",
    explicacao: "“Encontrar” é VTD (encontrar alguém). O pronome oblíquo átono “o” funciona como objeto direto; os pronomes o, a, os, as nunca são objeto indireto.",
  },
  {
    frase: "O médico assistiu [o paciente] durante toda a madrugada.",
    resposta: "od",
    explicacao: "No sentido de “prestar assistência, socorrer”, “assistir” é VTD, por isso “o paciente” é objeto direto. Pegadinha: no sentido de “ver”, o verbo é VTI (“assistir ao jogo”).",
  },
  {
    frase: "A empresa contratou [novos engenheiros] para o projeto.",
    resposta: "od",
    explicacao: "“Contratar” é VTD: quem contrata contrata alguém. “Novos engenheiros” completa o verbo sem preposição; “para o projeto” é adjunto adverbial de finalidade.",
  },
  {
    frase: "Os moradores pintaram [a fachada do prédio] em mutirão.",
    resposta: "od",
    explicacao: "“Pintar” é VTD e “a fachada do prédio” é o objeto direto, com o adjunto adnominal “do prédio”. O “a” inicial é artigo, não preposição.",
  },
  {
    frase: "Visitamos [a avó materna] no último domingo.",
    resposta: "od",
    explicacao: "“Visitar” é VTD (visitar alguém). Pegadinha: diante de nome de pessoa, o “a” parece preposição, mas é artigo; no masculino ficaria “visitamos o avô”, sem preposição.",
  },
  {
    frase: "Quando a carta chegou, li-[a] imediatamente.",
    resposta: "od",
    explicacao: "“Ler” é VTD e o pronome oblíquo átono “a” (= a carta) é objeto direto. Não é pleonástico, porque “a carta” é sujeito de outra oração, e não um objeto repetido.",
  },
  {
    frase: "Ninguém esperava [aquela resposta tão rápida].",
    resposta: "od",
    explicacao: "“Esperar” é VTD (esperar algo) e “aquela resposta tão rápida” completa o verbo sem preposição. O sujeito é “ninguém”.",
  },
  {
    frase: "Aspirei [o pó dos tapetes] antes da visita.",
    resposta: "od",
    explicacao: "No sentido de “sorver, sugar”, “aspirar” é VTD, e “o pó dos tapetes” é objeto direto. Pegadinha: no sentido de “almejar”, o verbo é VTI (“aspirar a um cargo”).",
  },
  {
    frase: "Esqueci [as chaves] em cima da mesa.",
    resposta: "od",
    explicacao: "Sem pronome, “esquecer” é VTD: “as chaves” é objeto direto. Pegadinha: na forma pronominal o verbo pede preposição (“Esqueci-me das chaves”), e aí o complemento é objeto indireto.",
  },

  // ---------- Objeto direto preposicionado ----------
  {
    frase: "Os fiéis amam [a Deus] sobre todas as coisas.",
    resposta: "od_prep",
    explicacao: "“Amar” é VTD (amar alguém), mas, com o nome “Deus”, a tradição usa a preposição “a”, que o verbo não exige. Por isso “a Deus” é objeto direto preposicionado, e não objeto indireto.",
  },
  {
    frase: "Com aquela desculpa esfarrapada, ele não enganou [a mim].",
    resposta: "od_prep",
    explicacao: "“Enganar” é VTD (enganar alguém). Quando o objeto é pronome oblíquo tônico (“mim”), a preposição “a” é obrigatória pela forma do pronome, não pela regência do verbo: objeto direto preposicionado.",
  },
  {
    frase: "Na discussão, o rapaz acabou ferindo [a si mesmo] com as próprias palavras.",
    resposta: "od_prep",
    explicacao: "“Ferir” é VTD (ferir alguém). O pronome tônico “si” exige a preposição “a”, que não vem do verbo; logo, “a si mesmo” é objeto direto preposicionado.",
  },
  {
    frase: "Os convidados beberam [do vinho] trazido da Itália.",
    resposta: "od_prep",
    explicacao: "“Beber” é VTD (beber algo). A preposição “de” indica sentido partitivo (beberam uma parte do vinho, não todo ele); por isso o complemento é objeto direto preposicionado.",
  },
  {
    frase: "Faminto, o viajante comeu [do pão] que estava sobre a mesa.",
    resposta: "od_prep",
    explicacao: "“Comer” é VTD. A preposição “de” não é exigida pelo verbo: expressa a ideia partitiva de “um pouco do pão”. Compare: “comeu o pão” (todo ele).",
  },
  {
    frase: "A diretora respeita [a todos] da mesma maneira.",
    resposta: "od_prep",
    explicacao: "“Respeitar” é VTD (respeitar alguém). Com o pronome indefinido “todos” referente a pessoas, é comum a preposição “a”, não exigida pelo verbo: objeto direto preposicionado.",
  },
  {
    frase: "O chefe elogiou [a ambos] durante a reunião.",
    resposta: "od_prep",
    explicacao: "“Elogiar” é VTD (elogiar alguém). O numeral “ambos”, referido a pessoas, costuma vir antecedido de “a” por realce, preposição que o verbo não pede. Trata-se de objeto direto preposicionado.",
  },
  {
    frase: "Antes da cerimônia, o padrinho abençoou [a nós] com emoção.",
    resposta: "od_prep",
    explicacao: "“Abençoar” é VTD (abençoar alguém). Como o objeto é o pronome tônico “nós”, a preposição “a” é necessária pela forma do pronome; o verbo não a exige. Objeto direto preposicionado.",
  },

  // ---------- Objeto direto pleonástico ----------
  {
    frase: "Esse romance, li-[o] em dois dias de férias.",
    resposta: "od_pleo",
    explicacao: "“Ler” é VTD. O objeto direto “esse romance”, deslocado para o início, é retomado pelo pronome “o” para dar ênfase: o pronome é objeto direto pleonástico.",
  },
  {
    frase: "As flores, regou-[as] o jardineiro antes do sol forte.",
    resposta: "od_pleo",
    explicacao: "“Regar” é VTD. O pronome “as” repete o objeto direto “as flores”, que abre a frase. Pegadinha: “o jardineiro” é o sujeito, posposto ao verbo.",
  },
  {
    frase: "A verdade, ninguém [a] quis ouvir.",
    resposta: "od_pleo",
    explicacao: "“Ouvir” é VTD. O pronome “a” retoma o objeto direto “a verdade”, antecipado no início da frase, para enfatizá-lo: objeto direto pleonástico (a próclise se deve a “ninguém”).",
  },
  {
    frase: "Os documentos, a secretária arquivou-[os] ontem à tarde.",
    resposta: "od_pleo",
    explicacao: "“Arquivar” é VTD. “Os documentos” é o objeto direto topicalizado, e o pronome “os” o repete junto ao verbo. Esse pronome redundante é o objeto direto pleonástico.",
  },
  {
    frase: "O dinheiro da herança, gastou-[o] todo em viagens.",
    resposta: "od_pleo",
    explicacao: "“Gastar” é VTD. O pronome “o” retoma “o dinheiro da herança”, objeto direto deslocado para o início da frase, criando ênfase: objeto direto pleonástico.",
  },
  {
    frase: "Essa canção, sempre [a] canto para meus filhos.",
    resposta: "od_pleo",
    explicacao: "“Cantar” é VTD aqui (cantar algo). O pronome “a” repete o objeto direto “essa canção”, colocado em destaque no começo da frase. É objeto direto pleonástico.",
  },
  {
    frase: "O carro velho, vendeu-[o] o mecânico por um bom preço.",
    resposta: "od_pleo",
    explicacao: "“Vender” é VTD. O pronome “o” retoma o objeto direto “o carro velho”. Pegadinha: “o mecânico”, depois do verbo, é o sujeito, e não outro objeto.",
  },
  {
    frase: "Seus conselhos, jamais [os] esquecerei.",
    resposta: "od_pleo",
    explicacao: "“Esquecer”, sem pronome reflexivo, é VTD. O pronome “os” repete o objeto direto “seus conselhos”, antecipado para dar ênfase: objeto direto pleonástico.",
  },

  // ---------- Objeto direto interno ----------
  {
    frase: "O velho pescador viveu [uma vida simples] à beira-mar.",
    resposta: "od_interno",
    explicacao: "“Viver” costuma ser intransitivo, mas aqui recebe um objeto do mesmo radical (“vida”), acompanhado do adjunto “simples”. É objeto direto interno ou cognato.",
  },
  {
    frase: "Naquela noite, a menina sonhou [um sonho estranho].",
    resposta: "od_interno",
    explicacao: "“Sonhar”, normalmente intransitivo ou transitivo indireto (“sonhar com”), aparece com objeto de mesmo radical, “sonho”, qualificado por “estranho”: objeto direto interno.",
  },
  {
    frase: "A viúva chorou [lágrimas amargas] diante do túmulo.",
    resposta: "od_interno",
    explicacao: "“Chorar” é, em geral, intransitivo. “Lágrimas amargas” pertence ao mesmo campo de sentido do verbo e só intensifica a ação; por isso é objeto direto interno (cognato).",
  },
  {
    frase: "O soldado morreu [uma morte heroica] na batalha.",
    resposta: "od_interno",
    explicacao: "“Morrer” é intransitivo, mas aqui recebe o objeto de mesmo radical “morte”, especificado pelo adjunto “heroica”. Trata-se de objeto direto interno.",
  },
  {
    frase: "Depois do plantão, o enfermeiro dormiu [o sono dos justos].",
    resposta: "od_interno",
    explicacao: "“Dormir” é intransitivo. “O sono dos justos” pertence ao mesmo campo semântico do verbo e vem com adjunto (“dos justos”): objeto direto interno ou cognato.",
  },
  {
    frase: "Até o último dia de vida, o líder lutou [o bom combate].",
    resposta: "od_interno",
    explicacao: "“Lutar” é normalmente intransitivo ou transitivo indireto (“lutar por”). “O bom combate” é da mesma área de sentido do verbo e o reforça: objeto direto interno.",
  },
  {
    frase: "Ao ler a carta do filho, a mãe suspirou [um longo suspiro].",
    resposta: "od_interno",
    explicacao: "“Suspirar” é intransitivo, mas aqui leva um objeto de mesmo radical, “suspiro”, com o adjunto “longo”. É objeto direto interno (cognato).",
  },
  {
    frase: "A menina sorriu [um sorriso tímido] para o fotógrafo.",
    resposta: "od_interno",
    explicacao: "“Sorrir” é intransitivo. “Um sorriso tímido” repete a ideia do verbo com o mesmo radical e acrescenta uma qualidade: objeto direto interno. “Para o fotógrafo” é adjunto.",
  },

  // ---------- Objeto indireto ----------
  {
    frase: "Muitos jovens gostam [de música clássica].",
    resposta: "oi",
    explicacao: "“Gostar” é VTI: quem gosta gosta de algo. A preposição “de” é exigida pelo verbo, por isso “de música clássica” é objeto indireto.",
  },
  {
    frase: "Entreguei o relatório [ao diretor da escola].",
    resposta: "oi",
    explicacao: "“Entregar” é VTDI: entrega-se algo (o relatório, OD) a alguém. “Ao diretor da escola” vem com a preposição “a” exigida pelo verbo (a + o): objeto indireto.",
  },
  {
    frase: "Quando o pai fala, o menino obedece-[lhe] prontamente.",
    resposta: "oi",
    explicacao: "“Obedecer” é VTI (obedecer a alguém). O pronome “lhe” equivale a “a ele” e funciona como objeto indireto. Pegadinha: na norma culta não se diz “obedece-o”.",
  },
  {
    frase: "Milhões de pessoas assistiram [ao jogo final] pela televisão.",
    resposta: "oi",
    explicacao: "No sentido de “ver, presenciar”, “assistir” é VTI e exige a preposição “a”: “ao jogo final” é objeto indireto. Pegadinha: em “assistiu o doente” (= ajudou), o verbo é VTD.",
  },
  {
    frase: "Ela aspira [a um cargo público] há anos.",
    resposta: "oi",
    explicacao: "No sentido de “almejar, desejar”, “aspirar” é VTI e rege a preposição “a”. Por isso “a um cargo público” é objeto indireto; já “aspirar o pó” (= sorver) é VTD.",
  },
  {
    frase: "O ministro não simpatizou [com a proposta] dos sindicatos.",
    resposta: "oi",
    explicacao: "“Simpatizar” é VTI e exige a preposição “com”. Pegadinha: o verbo não é pronominal; “simpatizar-se” é considerado incorreto pela norma culta.",
  },
  {
    frase: "Todos precisamos [de descanso] depois de uma semana intensa.",
    resposta: "oi",
    explicacao: "“Precisar”, no sentido de “necessitar”, é VTI e pede a preposição “de”. “De descanso” é, portanto, objeto indireto; “depois de uma semana intensa” é adjunto adverbial.",
  },
  {
    frase: "Os herdeiros não concordaram [com a partilha dos bens].",
    resposta: "oi",
    explicacao: "“Concordar” é VTI (concordar com algo) e a preposição “com” vem da regência do verbo. Logo, “com a partilha dos bens” é objeto indireto.",
  },
  {
    frase: "O professor informou [aos alunos] a data da prova.",
    resposta: "oi",
    explicacao: "“Informar” é VTDI: informa-se algo (a data da prova, OD) a alguém. “Aos alunos” é objeto indireto, mesmo aparecendo antes do objeto direto.",
  },

  // ---------- Objeto indireto pleonástico ----------
  {
    frase: "Ao gerente, entregamos-[lhe] o relatório na segunda-feira.",
    resposta: "oi_pleo",
    explicacao: "“Entregar” é VTDI. O objeto indireto “ao gerente”, deslocado para o início, é retomado pelo pronome “lhe” para dar ênfase: o “lhe” é objeto indireto pleonástico.",
  },
  {
    frase: "A mim, não [me] interessa essa proposta.",
    resposta: "oi_pleo",
    explicacao: "“Interessar” é VTI (algo interessa a alguém). O pronome “me” repete o objeto indireto “a mim”: objeto indireto pleonástico. Pegadinha: “essa proposta” é o sujeito.",
  },
  {
    frase: "Aos pobres, o benfeitor doou-[lhes] toda a herança.",
    resposta: "oi_pleo",
    explicacao: "“Doar” é VTDI: doa-se algo (toda a herança, OD) a alguém. O pronome “lhes” retoma o objeto indireto “aos pobres”, antecipado para realce: objeto indireto pleonástico.",
  },
  {
    frase: "A você, ninguém [lhe] pediu opinião.",
    resposta: "oi_pleo",
    explicacao: "“Pedir” é VTDI: pede-se algo (opinião, OD) a alguém. O “lhe” repete o objeto indireto “a você”, já expresso no início da frase: objeto indireto pleonástico.",
  },
  {
    frase: "Aos filhos, a mãe ensinou-[lhes] o valor do trabalho.",
    resposta: "oi_pleo",
    explicacao: "“Ensinar” é VTDI: ensina-se algo (o valor do trabalho, OD) a alguém. O pronome “lhes” retoma o objeto indireto “aos filhos”: objeto indireto pleonástico.",
  },
  {
    frase: "À nova funcionária, ofereceram-[lhe] uma promoção inesperada.",
    resposta: "oi_pleo",
    explicacao: "“Oferecer” é VTDI. O objeto indireto “à nova funcionária” (com crase: a + a) é repetido pelo pronome “lhe” para dar ênfase: objeto indireto pleonástico.",
  },
  {
    frase: "A nós, graças a Deus, nada [nos] falta.",
    resposta: "oi_pleo",
    explicacao: "“Faltar” é VTI (algo falta a alguém). O pronome “nos” retoma o objeto indireto “a nós”: objeto indireto pleonástico. Pegadinha: o sujeito de “falta” é “nada”.",
  },
]);
