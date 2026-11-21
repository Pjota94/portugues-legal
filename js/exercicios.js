// Banco de exercícios.
//
// Cada exercício tem:
//   frase:       a frase completa; o trecho a ser classificado fica entre [colchetes]
//   classe:      a chave da classe gramatical correta (ver CLASSES abaixo)
//   explicacao:  por que o trecho destacado pertence a essa classe
//
// Para adicionar uma nova classe gramatical:
//   1. Inclua a chave em CLASSES (com nome e sinônimos aceitos na resposta).
//   2. Adicione exercícios com essa chave em EXERCICIOS.

const CLASSES = {
  substantivo: {
    nome: "Substantivo",
    aceitas: ["substantivo", "subst", "sub", "substantivo proprio", "substantivo comum", "substantivo abstrato", "substantivo concreto", "substantivo coletivo"],
    resumo: "Palavra que nomeia seres, objetos, lugares, sentimentos, ações e qualidades. Costuma vir acompanhada de artigo e pode ser núcleo do sujeito ou do objeto.",
  },
  artigo: {
    nome: "Artigo",
    aceitas: ["artigo", "art", "artigo definido", "artigo indefinido"],
    resumo: "Palavra que vem antes do substantivo para determiná-lo (o, a, os, as) ou indeterminá-lo (um, uma, uns, umas), concordando com ele em gênero e número.",
  },
  adjetivo: {
    nome: "Adjetivo",
    aceitas: ["adjetivo", "adj", "adjetivo patrio"],
    resumo: "Palavra que caracteriza o substantivo, atribuindo-lhe qualidade, estado ou origem, e concorda com ele em gênero e número.",
  },
  preposicao: {
    nome: "Preposição",
    aceitas: ["preposicao", "prep", "preposicao essencial"],
    resumo: "Palavra invariável que liga dois termos, estabelecendo relação de dependência entre eles (a, de, com, em, para, por, sem, sobre, até...).",
  },
  verbo: {
    nome: "Verbo",
    aceitas: ["verbo", "v", "verbo de ligacao", "verbo auxiliar", "verbo intransitivo", "verbo transitivo", "verbo transitivo direto", "verbo transitivo indireto", "vtd", "vti", "vtdi", "vi", "vl"],
    resumo: "Palavra que exprime ação, estado ou fenômeno da natureza, situando-o no tempo. Varia em pessoa, número, tempo e modo.",
  },
};

const EXERCICIOS = [
  // ---------------- SUBSTANTIVO ----------------
  {
    frase: "O [cachorro] latiu a noite toda.",
    classe: "substantivo",
    explicacao: "\"Cachorro\" nomeia um ser. Vem determinado pelo artigo \"o\" e é o núcleo do sujeito da oração.",
  },
  {
    frase: "A [felicidade] dele contagiava a todos.",
    classe: "substantivo",
    explicacao: "\"Felicidade\" é um substantivo abstrato: nomeia um sentimento. Note que vem precedido do artigo \"a\", algo típico de substantivos.",
  },
  {
    frase: "Comprei um [livro] novo na feira.",
    classe: "substantivo",
    explicacao: "\"Livro\" nomeia um objeto. É determinado pelo artigo indefinido \"um\" e caracterizado pelo adjetivo \"novo\".",
  },
  {
    frase: "O [jantar] estava delicioso.",
    classe: "substantivo",
    explicacao: "\"Jantar\" é originalmente um verbo, mas aqui está substantivado pelo artigo \"o\" (derivação imprópria). É o núcleo do sujeito e recebe a característica \"delicioso\". Esse tipo de questão é muito cobrado em concursos!",
  },
  {
    frase: "[Brasília] é a capital do país.",
    classe: "substantivo",
    explicacao: "\"Brasília\" é um substantivo próprio: nomeia um lugar específico e, por isso, é escrito com inicial maiúscula.",
  },
  {
    frase: "O [sim] dela surpreendeu a família.",
    classe: "substantivo",
    explicacao: "\"Sim\" normalmente é advérbio, mas aqui foi substantivado pelo artigo \"o\". Qualquer palavra precedida de artigo passa a funcionar como substantivo.",
  },
  {
    frase: "Os [alunos] estudiosos foram aprovados.",
    classe: "substantivo",
    explicacao: "\"Alunos\" nomeia seres e é o núcleo do sujeito. É determinado pelo artigo \"os\" e caracterizado pelo adjetivo \"estudiosos\".",
  },
  {
    frase: "O [cardume] atravessou o rio.",
    classe: "substantivo",
    explicacao: "\"Cardume\" é um substantivo coletivo: mesmo no singular, nomeia um conjunto de seres da mesma espécie (peixes).",
  },
  {
    frase: "Tenho [saudade] da minha terra.",
    classe: "substantivo",
    explicacao: "\"Saudade\" é um substantivo abstrato: nomeia um sentimento. Funciona como objeto direto do verbo \"ter\".",
  },
  {
    frase: "O [azul] do céu encantava os turistas.",
    classe: "substantivo",
    explicacao: "\"Azul\" geralmente é adjetivo, mas aqui está substantivado pelo artigo \"o\": nomeia a cor e é o núcleo do sujeito.",
  },
  {
    frase: "A [cidade] amanheceu silenciosa.",
    classe: "substantivo",
    explicacao: "\"Cidade\" nomeia um lugar. É determinado pelo artigo \"a\" e é o núcleo do sujeito.",
  },

  // ---------------- ARTIGO ----------------
  {
    frase: "[A] menina chegou cedo.",
    classe: "artigo",
    explicacao: "\"A\" é artigo definido feminino singular: vem antes do substantivo \"menina\", determinando-o e concordando com ele em gênero e número.",
  },
  {
    frase: "Comprei [a] casa da esquina.",
    classe: "artigo",
    explicacao: "O verbo \"comprar\" é transitivo direto (quem compra, compra algo), ou seja, não exige preposição. Logo, o \"a\" apenas determina o substantivo \"casa\": é artigo definido.",
  },
  {
    frase: "Encontrei [um] amigo no mercado.",
    classe: "artigo",
    explicacao: "\"Um\" é artigo indefinido: apresenta o substantivo \"amigo\" de forma indeterminada (um amigo qualquer, não especificado).",
  },
  {
    frase: "[Os] candidatos aguardavam o resultado.",
    classe: "artigo",
    explicacao: "\"Os\" é artigo definido masculino plural, determinando o substantivo \"candidatos\" e concordando com ele.",
  },
  {
    frase: "Ela trouxe [umas] flores para a mãe.",
    classe: "artigo",
    explicacao: "\"Umas\" é artigo indefinido feminino plural, indeterminando o substantivo \"flores\".",
  },
  {
    frase: "[O] jantar estava delicioso.",
    classe: "artigo",
    explicacao: "\"O\" é artigo definido. Além de determinar, ele tem aqui o poder de substantivar o verbo \"jantar\", transformando-o em substantivo.",
  },
  {
    frase: "Todos [os] alunos foram aprovados.",
    classe: "artigo",
    explicacao: "\"Os\" é artigo definido que determina \"alunos\". O pronome \"todos\" vem antes do artigo, mas quem determina diretamente o substantivo é o artigo.",
  },
  {
    frase: "[Uma] dúvida surgiu durante a prova.",
    classe: "artigo",
    explicacao: "\"Uma\" é artigo indefinido: indetermina o substantivo \"dúvida\" (uma dúvida qualquer), sem ideia de quantidade exata.",
  },
  {
    frase: "Vi [as] crianças brincando no parque.",
    classe: "artigo",
    explicacao: "O verbo \"ver\" é transitivo direto e não exige preposição. O \"as\" concorda com \"crianças\" (feminino plural) e a determina: é artigo definido.",
  },
  {
    frase: "Li [o] livro que você indicou.",
    classe: "artigo",
    explicacao: "\"O\" é artigo definido: acompanha o substantivo \"livro\", indicando que se trata de um livro específico (o que você indicou).",
  },

  // ---------------- ADJETIVO ----------------
  {
    frase: "O céu [azul] encantava os turistas.",
    classe: "adjetivo",
    explicacao: "\"Azul\" caracteriza o substantivo \"céu\", atribuindo-lhe uma qualidade (cor). Compare com \"O azul do céu\", em que \"azul\" vira substantivo.",
  },
  {
    frase: "Os alunos [estudiosos] foram aprovados.",
    classe: "adjetivo",
    explicacao: "\"Estudiosos\" caracteriza o substantivo \"alunos\" e concorda com ele em gênero (masculino) e número (plural).",
  },
  {
    frase: "A prova estava [difícil].",
    classe: "adjetivo",
    explicacao: "\"Difícil\" atribui uma característica ao substantivo \"prova\". Sintaticamente é predicativo do sujeito (ligado pelo verbo \"estar\"), mas sua classe gramatical é adjetivo.",
  },
  {
    frase: "Ganhei um presente [lindo].",
    classe: "adjetivo",
    explicacao: "\"Lindo\" qualifica o substantivo \"presente\", concordando com ele em gênero e número.",
  },
  {
    frase: "A água [gelada] refrescou os atletas.",
    classe: "adjetivo",
    explicacao: "\"Gelada\" indica um estado do substantivo \"água\" e concorda com ele (feminino singular).",
  },
  {
    frase: "Ela é uma pessoa [gentil].",
    classe: "adjetivo",
    explicacao: "\"Gentil\" atribui uma qualidade ao substantivo \"pessoa\".",
  },
  {
    frase: "O [velho] casarão foi demolido.",
    classe: "adjetivo",
    explicacao: "\"Velho\" caracteriza o substantivo \"casarão\". O adjetivo pode vir antes do substantivo; quem é o núcleo aqui é \"casarão\", e não \"velho\".",
  },
  {
    frase: "Recebemos [boas] notícias hoje.",
    classe: "adjetivo",
    explicacao: "\"Boas\" qualifica o substantivo \"notícias\" e concorda com ele em gênero e número (feminino plural).",
  },
  {
    frase: "A sala [escura] assustava as crianças.",
    classe: "adjetivo",
    explicacao: "\"Escura\" caracteriza o substantivo \"sala\", indicando um estado.",
  },
  {
    frase: "Ele usava uma camisa [brasileira].",
    classe: "adjetivo",
    explicacao: "\"Brasileira\" é adjetivo pátrio: indica a origem/nacionalidade do substantivo \"camisa\".",
  },
  {
    frase: "A cidade amanheceu [silenciosa].",
    classe: "adjetivo",
    explicacao: "\"Silenciosa\" atribui um estado ao substantivo \"cidade\" e concorda com ele (feminino singular). Sintaticamente é predicativo do sujeito, mas a classe é adjetivo.",
  },

  // ---------------- PREPOSIÇÃO ----------------
  {
    frase: "Assistimos [a] seminários interessantes.",
    classe: "preposicao",
    explicacao: "O verbo \"assistir\" (no sentido de ver) exige a preposição \"a\". Além disso, não pode ser artigo: um artigo feminino singular \"a\" não concordaria com \"seminários\" (masculino plural).",
  },
  {
    frase: "Fui [a] Roma nas férias.",
    classe: "preposicao",
    explicacao: "O verbo \"ir\" pede a preposição \"a\". \"Roma\" não admite artigo (dizemos \"venho de Roma\", e não \"venho da Roma\"), então o \"a\" só pode ser preposição.",
  },
  {
    frase: "O livro [de] Maria está na mesa.",
    classe: "preposicao",
    explicacao: "\"De\" liga dois substantivos (\"livro\" e \"Maria\"), estabelecendo relação de posse entre eles.",
  },
  {
    frase: "Gosto [de] chocolate.",
    classe: "preposicao",
    explicacao: "O verbo \"gostar\" é transitivo indireto e exige a preposição \"de\" (quem gosta, gosta de algo).",
  },
  {
    frase: "Ela saiu [com] as amigas.",
    classe: "preposicao",
    explicacao: "\"Com\" liga o verbo \"saiu\" ao termo \"as amigas\", estabelecendo relação de companhia.",
  },
  {
    frase: "O presente é [para] você.",
    classe: "preposicao",
    explicacao: "\"Para\" liga termos, estabelecendo relação de destino/finalidade.",
  },
  {
    frase: "A caneta está [sobre] a mesa.",
    classe: "preposicao",
    explicacao: "\"Sobre\" relaciona \"caneta\" e \"mesa\", indicando posição (lugar).",
  },
  {
    frase: "Ele agiu [sem] pensar.",
    classe: "preposicao",
    explicacao: "\"Sem\" liga o verbo \"agiu\" ao infinitivo \"pensar\", indicando ausência/modo.",
  },
  {
    frase: "Dei o livro [a] ele.",
    classe: "preposicao",
    explicacao: "Artigo nunca acompanha pronome pessoal reto como \"ele\". O \"a\" é preposição exigida pelo verbo \"dar\" (quem dá, dá algo a alguém).",
  },
  {
    frase: "Começou [a] chover.",
    classe: "preposicao",
    explicacao: "Antes de verbo no infinitivo (\"chover\"), o \"a\" é preposição: ela liga o verbo \"começar\" ao infinitivo, formando uma locução verbal.",
  },
  {
    frase: "Ficamos [em] casa no domingo.",
    classe: "preposicao",
    explicacao: "\"Em\" liga o verbo \"ficamos\" ao substantivo \"casa\", indicando lugar.",
  },

  // ---------------- VERBO ----------------
  {
    frase: "Os alunos [estudaram] para a prova.",
    classe: "verbo",
    explicacao: "\"Estudaram\" exprime uma ação e está flexionado no pretérito perfeito, 3ª pessoa do plural.",
  },
  {
    frase: "A cidade [amanheceu] silenciosa.",
    classe: "verbo",
    explicacao: "\"Amanheceu\" é verbo flexionado no pretérito perfeito. Aqui funciona como verbo de ligação, ligando o sujeito \"a cidade\" ao predicativo \"silenciosa\".",
  },
  {
    frase: "Ela [é] professora.",
    classe: "verbo",
    explicacao: "\"É\" é forma do verbo \"ser\" (presente do indicativo). Funciona como verbo de ligação, ligando o sujeito \"ela\" à característica \"professora\".",
  },
  {
    frase: "Nós [assistimos] a seminários interessantes.",
    classe: "verbo",
    explicacao: "\"Assistimos\" exprime ação e está flexionado na 1ª pessoa do plural. No sentido de \"ver\", é transitivo indireto (exige a preposição \"a\").",
  },
  {
    frase: "[Choveu] muito ontem.",
    classe: "verbo",
    explicacao: "\"Choveu\" exprime um fenômeno da natureza. É um verbo impessoal: a oração não tem sujeito.",
  },
  {
    frase: "Eles [vão] viajar amanhã.",
    classe: "verbo",
    explicacao: "\"Vão\" é o verbo \"ir\" funcionando como auxiliar na locução verbal \"vão viajar\" (indica tempo futuro).",
  },
  {
    frase: "Quero [aprender] português.",
    classe: "verbo",
    explicacao: "\"Aprender\" é verbo no infinitivo (forma nominal terminada em -r), que exprime uma ação.",
  },
  {
    frase: "O menino [correu] até a praça.",
    classe: "verbo",
    explicacao: "\"Correu\" exprime uma ação e está flexionado no pretérito perfeito, 3ª pessoa do singular.",
  },
  {
    frase: "Ela [parece] cansada.",
    classe: "verbo",
    explicacao: "\"Parece\" é verbo de ligação: não indica ação, apenas liga o sujeito \"ela\" ao estado \"cansada\".",
  },
  {
    frase: "[Existem] muitas dúvidas sobre o tema.",
    classe: "verbo",
    explicacao: "\"Existem\" é verbo e concorda com o sujeito \"muitas dúvidas\" (plural). Atenção: diferente de \"haver\", o verbo \"existir\" é pessoal e vai para o plural.",
  },
  {
    frase: "Os turistas [estavam] encantados.",
    classe: "verbo",
    explicacao: "\"Estavam\" é forma do verbo \"estar\" (pretérito imperfeito), funcionando como verbo de ligação entre \"os turistas\" e \"encantados\".",
  },
];
