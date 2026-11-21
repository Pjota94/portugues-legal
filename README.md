# Português Legal

Site para treinar a identificação de classes gramaticais para concursos.

O usuário escolhe quais classes quer praticar, recebe frases com um termo destacado
e escreve a qual classe ele pertence. Se errar, o site explica o porquê.

Classes disponíveis: substantivo, artigo, adjetivo, preposição e verbo.

## Como usar

Abra o `index.html` no navegador. Não precisa instalar nada nem de servidor.
Também pode ser publicado direto no GitHub Pages.

## Estrutura

- `index.html`: página
- `css/style.css`: visual
- `js/app.js`: lógica do treino
- `js/exercicios.js`: classes gramaticais e banco de frases

## Adicionando frases

Em `js/exercicios.js`, adicione um item em `EXERCICIOS`. O termo a ser classificado fica entre colchetes:

```js
{
  frase: "Assistimos [a] seminários interessantes.",
  classe: "preposicao",
  explicacao: "O verbo \"assistir\" (no sentido de ver) exige a preposição \"a\"...",
},
```

## Adicionando uma nova classe

Inclua a classe em `CLASSES` (nome, respostas aceitas e um resumo usado quando o usuário erra)
e depois adicione frases com essa chave em `EXERCICIOS`.
