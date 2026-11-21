# Português Legal

Site para treinar gramática para concursos.

O usuário escolhe os tópicos, recebe frases com um trecho destacado e escreve a
classificação completa (ex.: “Substantivo Abstrato”, “Objeto Direto Pleonástico”).
Enquanto digita, o site sugere as classificações possíveis. Se errar, o site explica o porquê.

## Tópicos

| Tópico | Classificações | Frases |
|---|---|---|
| Substantivo | Concreto, Abstrato | 50 |
| Artigo | Definido, Indefinido | 50 |
| Verbo | Verbo, Locução Verbal | 50 |
| Advérbio | Advérbio de Tempo/Lugar/Modo, Locução Adverbial de Tempo/Lugar/Modo | 50 |
| Pronome | Pessoal, Possessivo, Demonstrativo, Indefinido, Interrogativo | 50 |
| Sujeito | Simples, Composto, Oculto, Indeterminado, Inexistente | 50 |
| Predicação Verbal | VTD, VTI, VTDI, VI, VL | 50 |
| Complemento Verbal | Objeto Direto, OD Preposicionado, OD Pleonástico, OD Interno (cognato), Objeto Indireto, OI Pleonástico | 50 |
| Adjetivo | (só a classe) | 11 |
| Preposição | (só a classe) | 11 |

## Como usar

Abra o `index.html` no navegador. Não precisa instalar nada nem de servidor.
Também pode ser publicado direto no GitHub Pages.

## Estrutura

- `index.html`: página
- `css/style.css`: visual (responsivo, tema claro e escuro)
- `js/app.js`: lógica do treino e das sugestões
- `js/topicos.js`: tópicos, classificações, respostas aceitas e resumos
- `js/dados/<tópico>.js`: frases de cada tópico
- `scripts/validar.js`: confere o banco de frases

## Adicionando frases

Em `js/dados/<tópico>.js`, adicione um item. O trecho a ser classificado fica entre colchetes
e `resposta` é a chave da classificação definida em `js/topicos.js`:

```js
{
  frase: "Os fiéis amam [a Deus] sobre todas as coisas.",
  resposta: "od_prep",
  explicacao: "“Amar” é VTD; a preposição aparece por se tratar de Deus...",
},
```

Depois rode `node scripts/validar.js` para conferir formato, chaves e duplicatas.

## Adicionando um tópico

1. Inclua o tópico em `TOPICOS` (`js/topicos.js`) com suas opções.
2. Crie `js/dados/<tópico>.js` chamando `registrarExercicios("<tópico>", [...])`.
3. Adicione o `<script>` do novo arquivo no `index.html`, antes do `js/app.js`.
