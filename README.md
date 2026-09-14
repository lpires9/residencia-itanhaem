# Acervo Itanhaém

Página inicial do hub de material de ensino da residência do Hospital Regional de Itanhaém "Jorge Rossmann".

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `acervo-itanhaem`).
2. Suba os arquivos `index.html` e `style.css` para a raiz do repositório.
3. Vá em **Settings → Pages**.
4. Em "Source", selecione a branch `main` e a pasta `/ (root)`.
5. Salve. O GitHub gera uma URL do tipo `https://seu-usuario.github.io/acervo-itanhaem/`.

## O que ajustar antes de publicar

- Em `index.html`, na seção `Equipe`, troque "Nome do residente" e "Nome do egresso" pelos nomes reais.
- O título do hub ("Acervo Itanhaém") é um nome provisório — troque em `<title>`, no `masthead-name` e no `<h1>` se quiser outro.
- O logo em `assets/logo.svg` é um emblema estilizado (HRJR). Se vocês tiverem a marca oficial do hospital/ISG, troque o arquivo.

## Como adicionar um novo artigo ao acervo

Cada artigo precisa de duas coisas:

1. Um arquivo novo em `dados/artigos/`, com o mesmo formato de `dados/artigos/exemplo-artigo.json`
   (título, área, resumo em parágrafos, link do artigo original e as 5 questões com alternativas e a explicação de cada uma).
2. Uma entrada nova em `dados/manifesto.json` (título, área, data do resumo, autor) — é isso que faz o artigo aparecer na listagem do acervo.

Não é preciso criar nenhuma página HTML nova: `artigo.html` é um modelo único que monta a página de qualquer artigo a partir do JSON.

## Estrutura

```
index.html          → página inicial
acervo.html          → listagem do acervo
artigo.html          → modelo de página de artigo (lê ?id= da URL)
style.css            → estilo
assets/logo.svg       → emblema HRJR
assets/site.js        → carrega os JSON e monta a listagem e o player de questões
dados/manifesto.json  → lista resumida de todos os artigos (para a listagem)
dados/artigos/*.json  → um arquivo por artigo, com resumo completo e questões
```
