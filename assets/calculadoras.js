// calculadoras.js — escalas clínicas "apenas bolinhas" e datas importantes

const SOFA_DOMINIOS = [
  {
    nome: "Respiratório",
    unidade: "PaO₂/FiO₂ (mmHg)",
    opcoes: [
      { pontos: 0, texto: "≥ 400" },
      { pontos: 1, texto: "< 400" },
      { pontos: 2, texto: "< 300" },
      { pontos: 3, texto: "< 200, com suporte respiratório" },
      { pontos: 4, texto: "< 100, com suporte respiratório" }
    ]
  },
  {
    nome: "Coagulação",
    unidade: "Plaquetas (×10³/µL)",
    opcoes: [
      { pontos: 0, texto: "≥ 150" },
      { pontos: 1, texto: "< 150" },
      { pontos: 2, texto: "< 100" },
      { pontos: 3, texto: "< 50" },
      { pontos: 4, texto: "< 20" }
    ]
  },
  {
    nome: "Hepático",
    unidade: "Bilirrubina (mg/dL)",
    opcoes: [
      { pontos: 0, texto: "< 1,2" },
      { pontos: 1, texto: "1,2 – 1,9" },
      { pontos: 2, texto: "2,0 – 5,9" },
      { pontos: 3, texto: "6,0 – 11,9" },
      { pontos: 4, texto: "> 12,0" }
    ]
  },
  {
    nome: "Cardiovascular",
    unidade: "PAM ou aminas vasoativas",
    opcoes: [
      { pontos: 0, texto: "PAM ≥ 70 mmHg" },
      { pontos: 1, texto: "PAM < 70 mmHg" },
      { pontos: 2, texto: "Dopamina < 5 ou dobutamina, qualquer dose" },
      { pontos: 3, texto: "Dopamina 5,1–15 ou adrenalina ≤ 0,1 ou noradrenalina ≤ 0,1" },
      { pontos: 4, texto: "Dopamina > 15 ou adrenalina > 0,1 ou noradrenalina > 0,1" }
    ]
  },
  {
    nome: "Neurológico",
    unidade: "Escala de Glasgow",
    opcoes: [
      { pontos: 0, texto: "15" },
      { pontos: 1, texto: "13 – 14" },
      { pontos: 2, texto: "10 – 12" },
      { pontos: 3, texto: "6 – 9" },
      { pontos: 4, texto: "< 6" }
    ]
  },
  {
    nome: "Renal",
    unidade: "Creatinina (mg/dL) ou diurese",
    opcoes: [
      { pontos: 0, texto: "< 1,2" },
      { pontos: 1, texto: "1,2 – 1,9" },
      { pontos: 2, texto: "2,0 – 3,4" },
      { pontos: 3, texto: "3,5 – 4,9 ou diurese < 500 mL/dia" },
      { pontos: 4, texto: "> 5,0 ou diurese < 200 mL/dia" }
    ]
  }
];

const PADUA_ITENS = [
  { texto: "Câncer ativo (metástase local ou à distância, e/ou quimio ou radioterapia nos últimos 6 meses)", pontos: 3 },
  { texto: "TEV prévio (exceto trombose venosa superficial)", pontos: 3 },
  { texto: "Mobilidade reduzida (acamado com privilégio de banheiro por ≥ 3 dias, por limitação do paciente ou prescrição médica)", pontos: 3 },
  { texto: "Trombofilia conhecida (deficiência de antitrombina, proteína C ou S, fator V de Leiden, mutação da protrombina, síndrome antifosfolípide)", pontos: 3 },
  { texto: "Trauma ou cirurgia recente (≤ 1 mês)", pontos: 2 },
  { texto: "Idade ≥ 70 anos", pontos: 1 },
  { texto: "Insuficiência cardíaca e/ou respiratória", pontos: 1 },
  { texto: "IAM ou AVC isquêmico agudo", pontos: 1 },
  { texto: "Infecção aguda e/ou doença reumatológica", pontos: 1 },
  { texto: "Obesidade (IMC ≥ 30)", pontos: 1 },
  { texto: "Tratamento hormonal em curso", pontos: 1 }
];

// Domínios tipo SOFA: um clique por grupo, soma automática
function renderEscalaUnica(dominios, container) {
  const estado = new Array(dominios.length).fill(null);

  container.innerHTML = dominios.map((d, i) => `
    <div class="escala-grupo" data-grupo="${i}">
      <p class="escala-grupo-titulo">${d.nome}<span class="escala-grupo-unidade">${d.unidade}</span></p>
      <div class="escala-opcoes">
        ${d.opcoes.map(o => `<button type="button" class="escala-opcao" data-pontos="${o.pontos}">${o.texto}</button>`).join('')}
      </div>
    </div>
  `).join('') + `<p class="escala-total">Pontuação total: <strong><span id="total-${container.id}">0</span></strong> — <span id="progresso-${container.id}">0 de ${dominios.length} preenchidos</span></p>`;

  function atualizarTotal() {
    const preenchidos = estado.filter(v => v !== null).length;
    const total = estado.reduce((soma, v) => soma + (v || 0), 0);
    container.querySelector(`#total-${container.id}`).textContent = total;
    container.querySelector(`#progresso-${container.id}`).textContent = `${preenchidos} de ${dominios.length} preenchidos`;
  }

  container.querySelectorAll('.escala-grupo').forEach((grupo, i) => {
    grupo.querySelectorAll('.escala-opcao').forEach(btn => {
      btn.addEventListener('click', () => {
        grupo.querySelectorAll('.escala-opcao').forEach(b => b.classList.remove('escala-opcao-selecionada'));
        btn.classList.add('escala-opcao-selecionada');
        estado[i] = parseInt(btn.dataset.pontos, 10);
        atualizarTotal();
      });
    });
  });
}

// Checklist tipo PADUA: cada item liga/desliga, soma automática, com corte de risco
function renderEscalaChecklist(itens, container, cortePontos) {
  container.innerHTML = itens.map(item => `
    <button type="button" class="escala-item" data-pontos="${item.pontos}" data-ativo="false">
      <span class="escala-item-texto">${item.texto}</span>
      <span class="escala-item-pontos">${item.pontos} pt${item.pontos > 1 ? 's' : ''}</span>
    </button>
  `).join('') + `<p class="escala-total">Pontuação total: <strong><span id="total-${container.id}">0</span></strong>${cortePontos ? ` — <span id="risco-${container.id}"></span>` : ''}</p>`;

  function atualizarTotal() {
    let total = 0;
    container.querySelectorAll('.escala-item[data-ativo="true"]').forEach(el => total += parseFloat(el.dataset.pontos));
    container.querySelector(`#total-${container.id}`).textContent = total;
    if (cortePontos) {
      const riscoEl = container.querySelector(`#risco-${container.id}`);
      riscoEl.textContent = total >= cortePontos ? 'Alto risco' : 'Baixo risco';
      riscoEl.className = total >= cortePontos ? 'escala-risco-alto' : 'escala-risco-baixo';
    }
  }

  container.querySelectorAll('.escala-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const ativo = btn.dataset.ativo === 'true';
      btn.dataset.ativo = ativo ? 'false' : 'true';
      btn.classList.toggle('escala-item-selecionado', !ativo);
      atualizarTotal();
    });
  });
}

// Datas importantes
function formatarDataImportante(data) {
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const partes = data.split('-');
  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${parseInt(dia, 10)} ${meses[parseInt(mes, 10) - 1]} ${ano}`;
  }
  if (partes.length === 2 && partes[0].length === 4) {
    const [ano, mes] = partes;
    return `${meses[parseInt(mes, 10) - 1]} ${ano}`;
  }
  if (partes.length === 2) {
    const [mes, dia] = partes;
    return `${parseInt(dia, 10)} ${meses[parseInt(mes, 10) - 1]} (todo ano)`;
  }
  return data;
}

async function renderizarDatas(container) {
  try {
    const resp = await fetch('dados/datas.json');
    const datas = await resp.json();
    container.innerHTML = datas.map(d => `
      <li class="team-row">
        <span class="team-name">${d.titulo}</span>
        <span class="team-role">${formatarDataImportante(d.data)}${d.nota ? ' · ' + d.nota : ''}</span>
      </li>
    `).join('');
  } catch (e) {
    container.innerHTML = '<li class="team-row"><span class="team-name">Não foi possível carregar as datas agora.</span></li>';
  }
}
