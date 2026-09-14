// site.js — funções compartilhadas entre acervo.html e artigo.html

async function carregarManifesto() {
  const resp = await fetch('dados/manifesto.json');
  if (!resp.ok) throw new Error('Não foi possível carregar o manifesto.');
  return resp.json();
}

async function carregarArtigo(id) {
  const resp = await fetch(`dados/artigos/${id}.json`);
  if (!resp.ok) throw new Error('Artigo não encontrado.');
  return resp.json();
}

function formatarData(iso) {
  if (!iso) return '';
  const partes = iso.split('-');
  if (partes.length < 3) return iso; // apenas ano, ou data incompleta
  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

// Renderiza a lista do acervo dentro de um <ul> ou <div> alvo
function renderizarLista(itens, container) {
  if (!itens.length) {
    container.innerHTML = '<p class="archive-empty-body">Nenhum artigo publicado ainda.</p>';
    return;
  }
  container.innerHTML = itens.map(item => `
    <li class="team-row">
      <a class="acervo-item-titulo" href="artigo.html?id=${encodeURIComponent(item.id)}">${item.titulo}</a>
      <span class="team-role">${item.area} · ${formatarData(item.data_resumo)}</span>
    </li>
  `).join('');
}

// Player de questões: uma pergunta por vez, com feedback e explicação
function iniciarQuiz(perguntas, container) {
  let atual = 0;
  let acertos = 0;

  function renderPergunta() {
    const q = perguntas[atual];
    container.innerHTML = `
      <p class="quiz-progress">Questão ${atual + 1} de ${perguntas.length}</p>
      <p class="quiz-pergunta">${q.pergunta}</p>
      <div class="quiz-alternativas" role="radiogroup"></div>
      <div class="quiz-feedback" hidden></div>
      <button class="quiz-avancar" type="button" hidden>Próxima questão</button>
    `;

    const lista = container.querySelector('.quiz-alternativas');
    const feedback = container.querySelector('.quiz-feedback');
    const btnAvancar = container.querySelector('.quiz-avancar');

    q.alternativas.forEach((texto, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-alternativa';
      btn.textContent = texto;
      btn.addEventListener('click', () => responder(i));
      lista.appendChild(btn);
    });

    function responder(i) {
      const botoes = lista.querySelectorAll('.quiz-alternativa');
      botoes.forEach(b => b.disabled = true);
      const correta = q.correta;
      botoes[correta].classList.add('quiz-correta');
      if (i !== correta) botoes[i].classList.add('quiz-incorreta');
      else acertos++;

      feedback.hidden = false;
      feedback.innerHTML = `
        <p class="quiz-veredito">${i === correta ? 'Resposta correta.' : 'Resposta incorreta.'}</p>
        <p>${q.explicacao}</p>
      `;

      if (atual < perguntas.length - 1) {
        btnAvancar.hidden = false;
        btnAvancar.onclick = () => { atual++; renderPergunta(); };
      } else {
        btnAvancar.hidden = false;
        btnAvancar.textContent = 'Ver resultado';
        btnAvancar.onclick = () => renderResultado();
      }
    }
  }

  function renderResultado() {
    container.innerHTML = `
      <p class="quiz-resultado">${acertos} de ${perguntas.length} questões corretas.</p>
      <button class="quiz-avancar" type="button" onclick="location.reload()">Refazer questões</button>
    `;
  }

  renderPergunta();
}
