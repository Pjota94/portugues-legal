registrarAnalises([
  {
    frase: "Eu amo chocolate.",
    termos: [
      { trecho: "Eu", resposta: "sujeito.simples", explicacao: "“Eu” é quem pratica a ação de amar. Tem um único núcleo, o pronome “eu”: sujeito simples." },
      { trecho: "amo", resposta: "predicacao.vtd", explicacao: "Quem ama, ama algo, e o complemento vem sem preposição: “amar” é verbo transitivo direto." },
      { trecho: "chocolate", resposta: "complemento.od", explicacao: "“Chocolate” completa o sentido de “amo” sem preposição: objeto direto." },
    ],
  },
  {
    frase: "Choveu forte ontem.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Chover” indica fenômeno da natureza e é impessoal: a oração não tem sujeito." },
      { trecho: "Choveu", resposta: "predicacao.vi", explicacao: "“Choveu” tem sentido completo e não exige complemento: verbo intransitivo." },
      { trecho: "forte", resposta: "adverbio.modo", explicacao: "“Forte” modifica o verbo, indicando como choveu. É invariável aqui: advérbio de modo." },
      { trecho: "ontem", resposta: "adverbio.tempo", explicacao: "“Ontem” indica quando choveu: advérbio de tempo." },
    ],
  },
  {
    frase: "Havia poucas pessoas por perto.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Haver” no sentido de existir é impessoal: a oração não tem sujeito, e o verbo fica no singular." },
      { trecho: "Havia", resposta: "predicacao.vtd", explicacao: "O “haver” impessoal pede complemento sem preposição (o que havia?): verbo transitivo direto." },
      { trecho: "poucas pessoas", resposta: "complemento.od", explicacao: "“Poucas pessoas” não é sujeito, e sim o complemento sem preposição de “havia”: objeto direto. Por isso o verbo não vai para o plural." },
      { trecho: "por perto", resposta: "adverbio.loc_lugar", explicacao: "“Por perto” é um grupo de palavras com valor de advérbio que indica onde: locução adverbial de lugar." },
    ],
  },
  {
    frase: "Anoiteceu cedo.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Anoitecer” indica fenômeno da natureza e é impessoal: oração sem sujeito." },
      { trecho: "Anoiteceu", resposta: "predicacao.vi", explicacao: "“Anoiteceu” tem sentido completo e não pede complemento: verbo intransitivo." },
      { trecho: "cedo", resposta: "adverbio.tempo", explicacao: "“Cedo” indica quando anoiteceu: advérbio de tempo." },
    ],
  },
  {
    frase: "Houve muitas reclamações ontem.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Haver” no sentido de existir ou ocorrer é impessoal: a oração não tem sujeito." },
      { trecho: "Houve", resposta: "predicacao.vtd", explicacao: "O “haver” impessoal tem complemento sem preposição: verbo transitivo direto. Fica no singular mesmo com complemento no plural." },
      { trecho: "muitas reclamações", resposta: "complemento.od", explicacao: "“Muitas reclamações” completa “houve” sem preposição: objeto direto (e não sujeito)." },
      { trecho: "ontem", resposta: "adverbio.tempo", explicacao: "“Ontem” indica quando houve as reclamações: advérbio de tempo." },
    ],
  },
  {
    frase: "Garoou de manhã.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Garoar” exprime fenômeno da natureza e é impessoal: oração sem sujeito." },
      { trecho: "Garoou", resposta: "predicacao.vi", explicacao: "“Garoou” tem sentido completo, sem complemento: verbo intransitivo." },
      { trecho: "de manhã", resposta: "adverbio.loc_tempo", explicacao: "“De manhã” é preposição + substantivo com valor de advérbio, indicando quando: locução adverbial de tempo." },
    ],
  },
  {
    frase: "Relampejou ao longe.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Relampejar” indica fenômeno da natureza e é impessoal: oração sem sujeito." },
      { trecho: "Relampejou", resposta: "predicacao.vi", explicacao: "“Relampejou” não exige complemento: verbo intransitivo." },
      { trecho: "ao longe", resposta: "adverbio.loc_lugar", explicacao: "“Ao longe” é um grupo de palavras com valor de advérbio que indica onde: locução adverbial de lugar." },
    ],
  },
  {
    frase: "Ventou de madrugada.",
    termos: [
      { sujeito: true, resposta: "sujeito.inexistente", explicacao: "“Ventar” indica fenômeno da natureza e é impessoal: oração sem sujeito." },
      { trecho: "Ventou", resposta: "predicacao.vi", explicacao: "“Ventou” tem sentido completo: verbo intransitivo." },
      { trecho: "de madrugada", resposta: "adverbio.loc_tempo", explicacao: "“De madrugada” indica quando ventou e é formada por preposição + substantivo: locução adverbial de tempo." },
    ],
  },
  {
    frase: "Precisa-se de funcionários.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "Verbo transitivo indireto na 3ª pessoa do singular + “se” (índice de indeterminação do sujeito): sujeito indeterminado." },
      { trecho: "Precisa-se", resposta: "predicacao.vti", explicacao: "Quem precisa, precisa de algo: o complemento vem com a preposição “de”, exigida pelo verbo. Verbo transitivo indireto." },
      { trecho: "de funcionários", resposta: "complemento.oi", explicacao: "“De funcionários” completa “precisa” por meio de preposição obrigatória: objeto indireto. Não é sujeito, por isso o verbo fica no singular." },
    ],
  },
  {
    frase: "Roubaram minha bicicleta ontem.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "Verbo na 3ª pessoa do plural sem referente no contexto: não se sabe quem roubou. Sujeito indeterminado." },
      { trecho: "Roubaram", resposta: "predicacao.vtd", explicacao: "Quem rouba, rouba algo, sem preposição: verbo transitivo direto." },
      { trecho: "minha bicicleta", resposta: "complemento.od", explicacao: "“Minha bicicleta” completa “roubaram” sem preposição: objeto direto." },
      { trecho: "ontem", resposta: "adverbio.tempo", explicacao: "“Ontem” indica quando o fato ocorreu: advérbio de tempo." },
    ],
  },
  {
    frase: "Trata-se de questões delicadas.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "“Tratar-se de” é verbo transitivo indireto + “se” (índice de indeterminação): sujeito indeterminado, com verbo sempre no singular." },
      { trecho: "Trata-se", resposta: "predicacao.vti", explicacao: "“Tratar-se” exige a preposição “de” no complemento: verbo transitivo indireto." },
      { trecho: "de questões delicadas", resposta: "complemento.oi", explicacao: "“De questões delicadas” completa o verbo com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "Vive-se bem aqui.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "Verbo intransitivo na 3ª pessoa do singular + “se” (índice de indeterminação): sujeito indeterminado." },
      { trecho: "Vive-se", resposta: "predicacao.vi", explicacao: "“Viver”, aqui, tem sentido completo e não pede complemento: verbo intransitivo." },
      { trecho: "bem", resposta: "adverbio.modo", explicacao: "“Bem” indica como se vive: advérbio de modo." },
      { trecho: "aqui", resposta: "adverbio.lugar", explicacao: "“Aqui” indica onde se vive: advérbio de lugar." },
    ],
  },
  {
    frase: "Obedece-se às leis.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "Verbo transitivo indireto + “se” (índice de indeterminação): sujeito indeterminado. Por isso o verbo não concorda com “leis”." },
      { trecho: "Obedece-se", resposta: "predicacao.vti", explicacao: "Quem obedece, obedece a algo ou a alguém: a preposição “a” é exigida. Verbo transitivo indireto." },
      { trecho: "às leis", resposta: "complemento.oi", explicacao: "“Às leis” (a + as) completa “obedece” com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "Ofereceram um emprego ao meu primo.",
    termos: [
      { sujeito: true, resposta: "sujeito.indeterminado", explicacao: "Verbo na 3ª pessoa do plural sem referente identificável: sujeito indeterminado." },
      { trecho: "Ofereceram", resposta: "predicacao.vtdi", explicacao: "Quem oferece, oferece algo (sem preposição) a alguém (com preposição): verbo transitivo direto e indireto." },
      { trecho: "um emprego", resposta: "complemento.od", explicacao: "“Um emprego” é o que foi oferecido, sem preposição: objeto direto." },
      { trecho: "ao meu primo", resposta: "complemento.oi", explicacao: "“Ao meu primo” é a quem se ofereceu, com a preposição “a” exigida pelo verbo: objeto indireto." },
    ],
  },
  {
    frase: "Assistimos ao jogo em silêncio.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “nós” não aparece, mas é identificado pela desinência “-mos”: sujeito oculto." },
      { trecho: "Assistimos", resposta: "predicacao.vti", explicacao: "“Assistir” no sentido de ver, presenciar exige a preposição “a”: verbo transitivo indireto." },
      { trecho: "ao jogo", resposta: "complemento.oi", explicacao: "“Ao jogo” completa “assistimos” com a preposição exigida pelo verbo: objeto indireto." },
      { trecho: "em silêncio", resposta: "adverbio.loc_modo", explicacao: "“Em silêncio” indica como assistimos: locução adverbial de modo." },
    ],
  },
  {
    frase: "Aspiramos ao cargo de diretor.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “nós” é identificado pela desinência verbal “-mos”: sujeito oculto." },
      { trecho: "Aspiramos", resposta: "predicacao.vti", explicacao: "“Aspirar” no sentido de desejar, almejar exige a preposição “a”: verbo transitivo indireto." },
      { trecho: "ao cargo de diretor", resposta: "complemento.oi", explicacao: "“Ao cargo de diretor” completa o verbo com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "Entreguei-lhe o documento.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “eu” não aparece, mas é identificado pela desinência de “entreguei”: sujeito oculto." },
      { trecho: "Entreguei", resposta: "predicacao.vtdi", explicacao: "Quem entrega, entrega algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "lhe", resposta: "complemento.oi", explicacao: "“Lhe” equivale a “a ele/a ela”, a pessoa a quem se entregou: objeto indireto." },
      { trecho: "o documento", resposta: "complemento.od", explicacao: "“O documento” é o que foi entregue, sem preposição: objeto direto." },
    ],
  },
  {
    frase: "Chegamos aqui cedo.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “nós” é identificado pela desinência “-mos”: sujeito oculto." },
      { trecho: "Chegamos", resposta: "predicacao.vi", explicacao: "“Chegar” não pede complemento; a indicação de lugar é adjunto adverbial. Verbo intransitivo." },
      { trecho: "aqui", resposta: "adverbio.lugar", explicacao: "“Aqui” indica onde chegamos: advérbio de lugar (adjunto, não complemento)." },
      { trecho: "cedo", resposta: "adverbio.tempo", explicacao: "“Cedo” indica quando chegamos: advérbio de tempo." },
    ],
  },
  {
    frase: "Vou lá amanhã.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “eu” é identificado pela forma verbal “vou”: sujeito oculto." },
      { trecho: "Vou", resposta: "predicacao.vi", explicacao: "Verbos de movimento como “ir” são intransitivos; o lugar para onde se vai é adjunto adverbial de lugar." },
      { trecho: "lá", resposta: "adverbio.lugar", explicacao: "“Lá” indica o lugar: advérbio de lugar." },
      { trecho: "amanhã", resposta: "adverbio.tempo", explicacao: "“Amanhã” indica quando: advérbio de tempo." },
    ],
  },
  {
    frase: "Vivi uma vida simples.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “eu” é identificado pela desinência de “vivi”: sujeito oculto." },
      { trecho: "Vivi", resposta: "predicacao.vtd", explicacao: "“Viver”, normalmente intransitivo, aqui recebe complemento sem preposição de mesmo radical: torna-se transitivo direto." },
      { trecho: "uma vida simples", resposta: "complemento.od_interno", explicacao: "“Vida” tem o mesmo radical de “vivi” e vem acompanhada de adjunto: objeto direto interno (cognato)." },
    ],
  },
  {
    frase: "Sonhei um sonho estranho.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “eu” é identificado pela desinência de “sonhei”: sujeito oculto." },
      { trecho: "Sonhei", resposta: "predicacao.vtd", explicacao: "O verbo recebe complemento sem preposição de mesmo radical: aqui é transitivo direto." },
      { trecho: "um sonho estranho", resposta: "complemento.od_interno", explicacao: "“Sonho” repete o radical de “sonhei” e vem com adjunto (“estranho”): objeto direto interno (cognato)." },
    ],
  },
  {
    frase: "Estamos cansados hoje.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “nós” é identificado pela desinência de “estamos”: sujeito oculto." },
      { trecho: "Estamos", resposta: "predicacao.vl", explicacao: "“Estar” não indica ação: liga o sujeito a um estado (“cansados”, predicativo). Verbo de ligação." },
      { trecho: "hoje", resposta: "adverbio.tempo", explicacao: "“Hoje” indica quando: advérbio de tempo." },
    ],
  },
  {
    frase: "Comemos do bolo em casa.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “nós” é identificado pela desinência “-mos”: sujeito oculto." },
      { trecho: "Comemos", resposta: "predicacao.vtd", explicacao: "Quem come, come algo; o verbo não exige preposição: verbo transitivo direto." },
      { trecho: "do bolo", resposta: "complemento.od_prep", explicacao: "A preposição “de” não é exigida pelo verbo; dá sentido partitivo (uma parte do bolo): objeto direto preposicionado." },
      { trecho: "em casa", resposta: "adverbio.loc_lugar", explicacao: "“Em casa” indica onde comemos: locução adverbial de lugar." },
    ],
  },
  {
    frase: "Devolvi o livro à biblioteca.",
    termos: [
      { sujeito: true, resposta: "sujeito.oculto", explicacao: "O sujeito “eu” é identificado pela desinência de “devolvi”: sujeito oculto." },
      { trecho: "Devolvi", resposta: "predicacao.vtdi", explicacao: "Quem devolve, devolve algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "o livro", resposta: "complemento.od", explicacao: "“O livro” é o que foi devolvido, sem preposição: objeto direto." },
      { trecho: "à biblioteca", resposta: "complemento.oi", explicacao: "“À biblioteca” (a + a) indica a quem se devolveu, com preposição exigida pelo verbo: objeto indireto." },
    ],
  },
  {
    frase: "Pedro e Ana estão felizes aqui.",
    termos: [
      { trecho: "Pedro e Ana", resposta: "sujeito.composto", explicacao: "O sujeito tem dois núcleos, “Pedro” e “Ana”: sujeito composto." },
      { trecho: "estão", resposta: "predicacao.vl", explicacao: "“Estar” liga o sujeito a um estado (“felizes”, predicativo): verbo de ligação." },
      { trecho: "aqui", resposta: "adverbio.lugar", explicacao: "“Aqui” indica onde: advérbio de lugar." },
    ],
  },
  {
    frase: "O pai e a mãe entregaram carinhosamente o presente à criança.",
    termos: [
      { trecho: "O pai e a mãe", resposta: "sujeito.composto", explicacao: "Dois núcleos, “pai” e “mãe”: sujeito composto." },
      { trecho: "entregaram", resposta: "predicacao.vtdi", explicacao: "Quem entrega, entrega algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "carinhosamente", resposta: "adverbio.modo", explicacao: "“Carinhosamente” indica como entregaram; termina em “-mente”: advérbio de modo." },
      { trecho: "o presente", resposta: "complemento.od", explicacao: "“O presente” é o que foi entregue, sem preposição: objeto direto." },
      { trecho: "à criança", resposta: "complemento.oi", explicacao: "“À criança” indica a quem se entregou, com preposição exigida: objeto indireto." },
    ],
  },
  {
    frase: "Os vizinhos e os parentes saíram às pressas.",
    termos: [
      { trecho: "Os vizinhos e os parentes", resposta: "sujeito.composto", explicacao: "Dois núcleos, “vizinhos” e “parentes”: sujeito composto." },
      { trecho: "saíram", resposta: "predicacao.vi", explicacao: "“Sair” tem sentido completo e não exige complemento: verbo intransitivo." },
      { trecho: "às pressas", resposta: "adverbio.loc_modo", explicacao: "“Às pressas” indica como saíram: locução adverbial de modo." },
    ],
  },
  {
    frase: "Maria e João gostam de cinema.",
    termos: [
      { trecho: "Maria e João", resposta: "sujeito.composto", explicacao: "Dois núcleos, “Maria” e “João”: sujeito composto." },
      { trecho: "gostam", resposta: "predicacao.vti", explicacao: "Quem gosta, gosta de algo: a preposição “de” é exigida. Verbo transitivo indireto." },
      { trecho: "de cinema", resposta: "complemento.oi", explicacao: "“De cinema” completa “gostam” com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "O professor e os alunos continuam animados.",
    termos: [
      { trecho: "O professor e os alunos", resposta: "sujeito.composto", explicacao: "Dois núcleos, “professor” e “alunos”: sujeito composto." },
      { trecho: "continuam", resposta: "predicacao.vl", explicacao: "“Continuar” indica permanência de estado e liga o sujeito ao predicativo “animados”: verbo de ligação." },
    ],
  },
  {
    frase: "O avô e a avó contaram uma história aos netos.",
    termos: [
      { trecho: "O avô e a avó", resposta: "sujeito.composto", explicacao: "Dois núcleos, “avô” e “avó”: sujeito composto." },
      { trecho: "contaram", resposta: "predicacao.vtdi", explicacao: "Quem conta, conta algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "uma história", resposta: "complemento.od", explicacao: "“Uma história” é o que foi contado, sem preposição: objeto direto." },
      { trecho: "aos netos", resposta: "complemento.oi", explicacao: "“Aos netos” indica a quem se contou, com preposição exigida: objeto indireto." },
    ],
  },
  {
    frase: "Ricos e pobres obedecem às mesmas leis.",
    termos: [
      { trecho: "Ricos e pobres", resposta: "sujeito.composto", explicacao: "Dois núcleos, “ricos” e “pobres” (adjetivos substantivados): sujeito composto." },
      { trecho: "obedecem", resposta: "predicacao.vti", explicacao: "Quem obedece, obedece a algo: preposição “a” exigida. Verbo transitivo indireto." },
      { trecho: "às mesmas leis", resposta: "complemento.oi", explicacao: "“Às mesmas leis” completa o verbo com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "Vendem-se casas aqui.",
    termos: [
      { trecho: "Vendem-se", resposta: "predicacao.vtd", explicacao: "Voz passiva sintética: “vender” é transitivo direto e o “se” é pronome apassivador (= casas são vendidas)." },
      { trecho: "casas", resposta: "sujeito.simples", explicacao: "Na passiva sintética, “casas” é o sujeito paciente, posposto, com um núcleo: sujeito simples. Por isso o verbo vai ao plural." },
      { trecho: "aqui", resposta: "adverbio.lugar", explicacao: "“Aqui” indica onde: advérbio de lugar." },
    ],
  },
  {
    frase: "A população confia nos bombeiros.",
    termos: [
      { trecho: "A população", resposta: "sujeito.simples", explicacao: "Um único núcleo, “população” (coletivo no singular): sujeito simples." },
      { trecho: "confia", resposta: "predicacao.vti", explicacao: "Quem confia, confia em alguém: preposição “em” exigida. Verbo transitivo indireto." },
      { trecho: "nos bombeiros", resposta: "complemento.oi", explicacao: "“Nos bombeiros” (em + os) completa “confia” com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "O médico assistiu o paciente.",
    termos: [
      { trecho: "O médico", resposta: "sujeito.simples", explicacao: "Um único núcleo, “médico”: sujeito simples." },
      { trecho: "assistiu", resposta: "predicacao.vtd", explicacao: "“Assistir” no sentido de ajudar, prestar assistência é transitivo direto." },
      { trecho: "o paciente", resposta: "complemento.od", explicacao: "“O paciente” completa “assistiu” sem preposição: objeto direto." },
    ],
  },
  {
    frase: "O atirador visou o alvo cuidadosamente.",
    termos: [
      { trecho: "O atirador", resposta: "sujeito.simples", explicacao: "Um único núcleo, “atirador”: sujeito simples." },
      { trecho: "visou", resposta: "predicacao.vtd", explicacao: "“Visar” no sentido de mirar é transitivo direto." },
      { trecho: "o alvo", resposta: "complemento.od", explicacao: "“O alvo” completa “visou” sem preposição: objeto direto." },
      { trecho: "cuidadosamente", resposta: "adverbio.modo", explicacao: "“Cuidadosamente” indica como visou: advérbio de modo." },
    ],
  },
  {
    frase: "Todo estudante visa ao sucesso.",
    termos: [
      { trecho: "Todo estudante", resposta: "sujeito.simples", explicacao: "Um único núcleo, “estudante”: sujeito simples." },
      { trecho: "visa", resposta: "predicacao.vti", explicacao: "“Visar” no sentido de pretender, almejar exige a preposição “a”: verbo transitivo indireto." },
      { trecho: "ao sucesso", resposta: "complemento.oi", explicacao: "“Ao sucesso” completa “visa” com preposição obrigatória: objeto indireto." },
    ],
  },
  {
    frase: "O agricultor aspirou o perfume das flores.",
    termos: [
      { trecho: "O agricultor", resposta: "sujeito.simples", explicacao: "Um único núcleo, “agricultor”: sujeito simples." },
      { trecho: "aspirou", resposta: "predicacao.vtd", explicacao: "“Aspirar” no sentido de cheirar, sorver é transitivo direto." },
      { trecho: "o perfume das flores", resposta: "complemento.od", explicacao: "“O perfume das flores” completa o verbo sem preposição: objeto direto (“das flores” é adjunto de “perfume”)." },
    ],
  },
  {
    frase: "Chegaram cedo os convidados.",
    termos: [
      { trecho: "Chegaram", resposta: "predicacao.vi", explicacao: "“Chegar” não exige complemento: verbo intransitivo." },
      { trecho: "cedo", resposta: "adverbio.tempo", explicacao: "“Cedo” indica quando chegaram: advérbio de tempo." },
      { trecho: "os convidados", resposta: "sujeito.simples", explicacao: "Quem chegou? “Os convidados”: sujeito posposto ao verbo, com um núcleo. Sujeito simples." },
    ],
  },
  {
    frase: "A verdade, todos a conhecem.",
    termos: [
      { trecho: "todos", resposta: "sujeito.simples", explicacao: "“Todos” é quem conhece; um único núcleo: sujeito simples." },
      { trecho: "a", resposta: "complemento.od_pleo", explicacao: "O pronome “a” repete o objeto direto “A verdade”, já antecipado, para dar ênfase: objeto direto pleonástico." },
      { trecho: "conhecem", resposta: "predicacao.vtd", explicacao: "Quem conhece, conhece algo, sem preposição: verbo transitivo direto." },
    ],
  },
  {
    frase: "Os documentos, o advogado analisou-os atentamente.",
    termos: [
      { trecho: "o advogado", resposta: "sujeito.simples", explicacao: "Um único núcleo, “advogado”: sujeito simples." },
      { trecho: "analisou", resposta: "predicacao.vtd", explicacao: "Quem analisa, analisa algo, sem preposição: verbo transitivo direto." },
      { trecho: "os", resposta: "complemento.od_pleo", explicacao: "O pronome “os” retoma “Os documentos”, objeto já antecipado no início: objeto direto pleonástico." },
      { trecho: "atentamente", resposta: "adverbio.modo", explicacao: "“Atentamente” indica como analisou: advérbio de modo." },
    ],
  },
  {
    frase: "Essa música, eu a ouço sempre.",
    termos: [
      { trecho: "eu", resposta: "sujeito.simples", explicacao: "Um único núcleo, o pronome “eu”: sujeito simples." },
      { trecho: "a", resposta: "complemento.od_pleo", explicacao: "O pronome “a” repete “Essa música”, objeto direto antecipado: objeto direto pleonástico." },
      { trecho: "ouço", resposta: "predicacao.vtd", explicacao: "Quem ouve, ouve algo, sem preposição: verbo transitivo direto." },
      { trecho: "sempre", resposta: "adverbio.tempo", explicacao: "“Sempre” indica frequência no tempo: advérbio de tempo." },
    ],
  },
  {
    frase: "Aos pobres, a prefeitura doou-lhes alimentos.",
    termos: [
      { trecho: "a prefeitura", resposta: "sujeito.simples", explicacao: "Um único núcleo, “prefeitura”: sujeito simples." },
      { trecho: "doou", resposta: "predicacao.vtdi", explicacao: "Quem doa, doa algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "lhes", resposta: "complemento.oi_pleo", explicacao: "O pronome “lhes” repete “Aos pobres”, objeto indireto antecipado: objeto indireto pleonástico." },
      { trecho: "alimentos", resposta: "complemento.od", explicacao: "“Alimentos” é o que foi doado, sem preposição: objeto direto." },
    ],
  },
  {
    frase: "Ao filho, o pai deu-lhe um conselho.",
    termos: [
      { trecho: "o pai", resposta: "sujeito.simples", explicacao: "Um único núcleo, “pai”: sujeito simples." },
      { trecho: "deu", resposta: "predicacao.vtdi", explicacao: "Quem dá, dá algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "lhe", resposta: "complemento.oi_pleo", explicacao: "“Lhe” retoma “Ao filho”, objeto indireto já expresso no início: objeto indireto pleonástico." },
      { trecho: "um conselho", resposta: "complemento.od", explicacao: "“Um conselho” é o que foi dado, sem preposição: objeto direto." },
    ],
  },
  {
    frase: "Aos alunos, o professor explicou-lhes a matéria passo a passo.",
    termos: [
      { trecho: "o professor", resposta: "sujeito.simples", explicacao: "Um único núcleo, “professor”: sujeito simples." },
      { trecho: "explicou", resposta: "predicacao.vtdi", explicacao: "Quem explica, explica algo a alguém: verbo transitivo direto e indireto." },
      { trecho: "lhes", resposta: "complemento.oi_pleo", explicacao: "“Lhes” repete “Aos alunos”, objeto indireto antecipado, para dar ênfase: objeto indireto pleonástico." },
      { trecho: "a matéria", resposta: "complemento.od", explicacao: "“A matéria” é o que foi explicado, sem preposição: objeto direto." },
      { trecho: "passo a passo", resposta: "adverbio.loc_modo", explicacao: "“Passo a passo” indica como explicou: locução adverbial de modo." },
    ],
  },
  {
    frase: "Os fiéis amam a Deus.",
    termos: [
      { trecho: "Os fiéis", resposta: "sujeito.simples", explicacao: "Um único núcleo, “fiéis”: sujeito simples." },
      { trecho: "amam", resposta: "predicacao.vtd", explicacao: "Quem ama, ama alguém, sem preposição obrigatória: verbo transitivo direto." },
      { trecho: "a Deus", resposta: "complemento.od_prep", explicacao: "A preposição “a” não é exigida por “amar”; é usada por tradição com o nome de Deus: objeto direto preposicionado." },
    ],
  },
  {
    frase: "O rapaz prejudicou a si mesmo.",
    termos: [
      { trecho: "O rapaz", resposta: "sujeito.simples", explicacao: "Um único núcleo, “rapaz”: sujeito simples." },
      { trecho: "prejudicou", resposta: "predicacao.vtd", explicacao: "Quem prejudica, prejudica alguém, sem preposição: verbo transitivo direto." },
      { trecho: "a si mesmo", resposta: "complemento.od_prep", explicacao: "Com pronome oblíquo tônico (“si”), o objeto direto vem obrigatoriamente com preposição: objeto direto preposicionado." },
    ],
  },
  {
    frase: "A criança dormiu um sono tranquilo.",
    termos: [
      { trecho: "A criança", resposta: "sujeito.simples", explicacao: "Um único núcleo, “criança”: sujeito simples." },
      { trecho: "dormiu", resposta: "predicacao.vtd", explicacao: "“Dormir”, em geral intransitivo, aqui recebe complemento sem preposição de mesmo campo de sentido: transitivo direto." },
      { trecho: "um sono tranquilo", resposta: "complemento.od_interno", explicacao: "“Sono” é cognato de “dormiu” e vem com adjunto (“tranquilo”): objeto direto interno." },
    ],
  },
  {
    frase: "A professora parece cansada.",
    termos: [
      { trecho: "A professora", resposta: "sujeito.simples", explicacao: "Um único núcleo, “professora”: sujeito simples." },
      { trecho: "parece", resposta: "predicacao.vl", explicacao: "“Parecer” não indica ação: liga o sujeito ao estado aparente “cansada” (predicativo). Verbo de ligação." },
    ],
  },
  {
    frase: "A loja permanece fechada à noite.",
    termos: [
      { trecho: "A loja", resposta: "sujeito.simples", explicacao: "Um único núcleo, “loja”: sujeito simples." },
      { trecho: "permanece", resposta: "predicacao.vl", explicacao: "“Permanecer” indica continuidade de estado e liga o sujeito ao predicativo “fechada”: verbo de ligação." },
      { trecho: "à noite", resposta: "adverbio.loc_tempo", explicacao: "“À noite” indica quando: locução adverbial de tempo." },
    ],
  },
  {
    frase: "Meu irmão anda triste ultimamente.",
    termos: [
      { trecho: "Meu irmão", resposta: "sujeito.simples", explicacao: "Um único núcleo, “irmão”: sujeito simples." },
      { trecho: "anda", resposta: "predicacao.vl", explicacao: "Aqui “andar” não indica movimento, e sim estado (= está): liga o sujeito ao predicativo “triste”. Verbo de ligação." },
      { trecho: "ultimamente", resposta: "adverbio.tempo", explicacao: "“Ultimamente” indica quando (nos últimos tempos): advérbio de tempo." },
    ],
  },
]);
