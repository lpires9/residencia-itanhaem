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

// SAPS 3 — critérios e pontos conforme MDCalc (mdcalc.com/calc/10403), traduzidos
const SAPS3_GRUPOS = [
  { secao: "Box I — antes da UTI", nome: "Idade", opcoes: [
    { pontos: 0, texto: "< 40 anos" }, { pontos: 5, texto: "40 – 59 anos" }, { pontos: 9, texto: "60 – 69 anos" },
    { pontos: 13, texto: "70 – 74 anos" }, { pontos: 15, texto: "75 – 79 anos" }, { pontos: 18, texto: "≥ 80 anos" }
  ]},
  { secao: "Box I — antes da UTI", nome: "Tempo de internação hospitalar antes da UTI", opcoes: [
    { pontos: 0, texto: "< 14 dias" }, { pontos: 6, texto: "14 – 27 dias" }, { pontos: 7, texto: "≥ 28 dias" }
  ]},
  { secao: "Box I — antes da UTI", nome: "Local antes da admissão na UTI", opcoes: [
    { pontos: 0, texto: "Casa ou comunidade" }, { pontos: 5, texto: "Pronto-socorro" },
    { pontos: 7, texto: "Outra UTI" }, { pontos: 8, texto: "Outra enfermaria" }
  ]},
  { secao: "Box I — antes da UTI", nome: "Uso de drogas vasoativas antes da UTI", opcoes: [
    { pontos: 0, texto: "Não" }, { pontos: 3, texto: "Sim" }
  ]},
  { secao: "Box II — circunstâncias da admissão", nome: "Tipo de admissão", opcoes: [
    { pontos: 0, texto: "Planejada" }, { pontos: 3, texto: "Não planejada" }
  ]},
  { secao: "Box II — circunstâncias da admissão", nome: "Status cirúrgico na admissão", opcoes: [
    { pontos: 0, texto: "Cirurgia eletiva" }, { pontos: 5, texto: "Sem cirurgia" }, { pontos: 6, texto: "Cirurgia de urgência" }
  ]},
  { secao: "Box II — circunstâncias da admissão", nome: "Infecção na admissão", opcoes: [
    { pontos: 0, texto: "Nenhuma" }, { pontos: 4, texto: "Nosocomial" }, { pontos: 5, texto: "Respiratória" }
  ]},
  { secao: "Box II — circunstâncias da admissão", nome: "Motivo da admissão", opcoes: [
    { pontos: 0, texto: "Nenhum dos abaixo" },
    { pontos: -5, texto: "Cardiovascular: distúrbio do ritmo" },
    { pontos: -4, texto: "Neurológico: crise convulsiva" },
    { pontos: 3, texto: "Cardiovascular: choque hipovolêmico (hemorrágico ou não)" },
    { pontos: 5, texto: "Cardiovascular: choque séptico" },
    { pontos: 5, texto: "Cardiovascular: choque anafilático, misto ou indefinido" },
    { pontos: 4, texto: "Neurológico: coma, torpor, confusão, agitação ou delirium" },
    { pontos: 7, texto: "Neurológico: déficit focal" },
    { pontos: 10, texto: "Neurológico: efeito de massa intracraniana" },
    { pontos: 3, texto: "Digestivo: abdome agudo, outro" },
    { pontos: 9, texto: "Digestivo: pancreatite grave" },
    { pontos: 6, texto: "Hepático: insuficiência hepática" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Glasgow (menor valor)", opcoes: [
    { pontos: 0, texto: "≥ 13" }, { pontos: 2, texto: "7 – 12" }, { pontos: 7, texto: "6" }, { pontos: 10, texto: "5" }, { pontos: 15, texto: "3 – 4" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Bilirrubina total (maior valor)", opcoes: [
    { pontos: 0, texto: "< 2 mg/dL" }, { pontos: 4, texto: "2 – 5,9 mg/dL" }, { pontos: 5, texto: "≥ 6 mg/dL" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Temperatura corporal (maior valor)", opcoes: [
    { pontos: 0, texto: "≥ 35 °C" }, { pontos: 7, texto: "< 35 °C" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Creatinina (maior valor)", opcoes: [
    { pontos: 0, texto: "< 1,2 mg/dL" }, { pontos: 2, texto: "1,2 – 1,9 mg/dL" }, { pontos: 7, texto: "2,0 – 3,4 mg/dL" }, { pontos: 8, texto: "≥ 3,5 mg/dL" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Frequência cardíaca (maior valor)", opcoes: [
    { pontos: 0, texto: "< 120 bpm" }, { pontos: 5, texto: "120 – 159 bpm" }, { pontos: 7, texto: "≥ 160 bpm" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Leucócitos (maior valor)", opcoes: [
    { pontos: 0, texto: "< 15 G/L" }, { pontos: 2, texto: "≥ 15 G/L" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "pH (menor valor)", opcoes: [
    { pontos: 0, texto: "> 7,25" }, { pontos: 3, texto: "≤ 7,25" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Plaquetas (menor valor)", opcoes: [
    { pontos: 0, texto: "≥ 100 G/L" }, { pontos: 5, texto: "50 – 99 G/L" }, { pontos: 8, texto: "20 – 49 G/L" }, { pontos: 13, texto: "< 20 G/L" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Pressão arterial sistólica (menor valor)", opcoes: [
    { pontos: 0, texto: "≥ 120 mmHg" }, { pontos: 3, texto: "70 – 119 mmHg" }, { pontos: 8, texto: "40 – 69 mmHg" }, { pontos: 11, texto: "< 40 mmHg" }
  ]},
  { secao: "Box III — fisiologia na 1ª hora da UTI", nome: "Oxigenação", opcoes: [
    { pontos: 0, texto: "PaO₂ ≥ 60 sem ventilação mecânica" },
    { pontos: 5, texto: "PaO₂ < 60 sem ventilação mecânica" },
    { pontos: 7, texto: "PaO₂/FiO₂ ≥ 100 com ventilação mecânica" },
    { pontos: 11, texto: "PaO₂/FiO₂ < 100 com ventilação mecânica" }
  ]}
];

const SAPS3_COMORBIDADES = [
  { texto: "Quimioterapia, imunossupressão, radioterapia ou corticoterapia", pontos: 3 },
  { texto: "Insuficiência cardíaca crônica classe funcional IV (NYHA)", pontos: 6 },
  { texto: "Neoplasia hematológica", pontos: 6 },
  { texto: "Cirrose", pontos: 8 },
  { texto: "AIDS", pontos: 8 },
  { texto: "Câncer metastático", pontos: 11 }
];

const SAPS3_OFFSET = 16;

// IMPROVE Bleeding Risk Score — critérios e pontos conforme MDCalc (mdcalc.com/calc/10465), traduzidos
const IMPROVE_GRUPOS = [
  { nome: "Idade", opcoes: [
    { pontos: 0, texto: "< 40 anos" }, { pontos: 1.5, texto: "40 – 84 anos" }, { pontos: 3.5, texto: "≥ 85 anos" }
  ]},
  { nome: "Sexo", opcoes: [
    { pontos: 0, texto: "Feminino" }, { pontos: 1, texto: "Masculino" }
  ]},
  { nome: "Função renal (TFG, mL/min)", opcoes: [
    { pontos: 0, texto: "≥ 60" }, { pontos: 1, texto: "30 – 59" }, { pontos: 2.5, texto: "< 30" }
  ]}
];

const IMPROVE_ITENS = [
  { texto: "Câncer ativo (malignidade evidente nos últimos 6 meses)", pontos: 2 },
  { texto: "Doença reumatológica", pontos: 2 },
  { texto: "Cateter venoso central", pontos: 2 },
  { texto: "Internação em UTI/CTI", pontos: 2.5 },
  { texto: "Insuficiência hepática (INR > 1,5)", pontos: 2.5 },
  { texto: "Plaquetas < 50 × 10⁹/L", pontos: 4 },
  { texto: "Sangramento nos 3 meses antes da admissão", pontos: 4 },
  { texto: "Úlcera gastroduodenal ativa", pontos: 4.5 }
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

// Escala composta: grupos de seleção única + checklist opcional, com seções e offset fixo
function renderEscalaComposta(config, container) {
  const grupos = config.grupos || [];
  const itens = config.itens || [];
  const offset = config.offset || 0;
  const corte = config.corte || null;

  const estadoGrupos = new Array(grupos.length).fill(null);

  let secaoAtual = null;
  let html = '';
  grupos.forEach((g, i) => {
    if (g.secao && g.secao !== secaoAtual) {
      secaoAtual = g.secao;
      html += `<p class="escala-secao">${g.secao}</p>`;
    }
    html += `
      <div class="escala-grupo" data-grupo="${i}">
        <p class="escala-grupo-titulo">${g.nome}</p>
        <div class="escala-opcoes">
          ${g.opcoes.map(o => `<button type="button" class="escala-opcao" data-pontos="${o.pontos}">${o.texto}</button>`).join('')}
        </div>
      </div>`;
  });

  if (itens.length) {
    html += `<p class="escala-secao">Comorbidades / fatores adicionais</p>`;
    html += itens.map((item, i) => `
      <button type="button" class="escala-item" data-pontos="${item.pontos}" data-ativo="false" data-item="${i}">
        <span class="escala-item-texto">${item.texto}</span>
        <span class="escala-item-pontos">${item.pontos} pt${item.pontos > 1 ? 's' : ''}</span>
      </button>
    `).join('');
  }

  html += `<p class="escala-total">Pontuação total: <strong><span id="total-${container.id}">${offset}</span></strong>${offset ? ` <span class="escala-offset">(inclui offset fixo de ${offset})</span>` : ''}${corte ? ` — <span id="risco-${container.id}"></span>` : ''}</p>`;

  container.innerHTML = html;

  function atualizarTotal() {
    let total = offset;
    estadoGrupos.forEach(v => { if (v !== null) total += v; });
    container.querySelectorAll('.escala-item[data-ativo="true"]').forEach(el => total += parseFloat(el.dataset.pontos));
    container.querySelector(`#total-${container.id}`).textContent = total;
    if (corte) {
      const riscoEl = container.querySelector(`#risco-${container.id}`);
      riscoEl.textContent = total >= corte.valor ? corte.rotuloAlto : corte.rotuloBaixo;
      riscoEl.className = total >= corte.valor ? 'escala-risco-alto' : 'escala-risco-baixo';
    }
  }

  container.querySelectorAll('.escala-grupo').forEach((grupoEl, i) => {
    grupoEl.querySelectorAll('.escala-opcao').forEach(btn => {
      btn.addEventListener('click', () => {
        grupoEl.querySelectorAll('.escala-opcao').forEach(b => b.classList.remove('escala-opcao-selecionada'));
        btn.classList.add('escala-opcao-selecionada');
        estadoGrupos[i] = parseFloat(btn.dataset.pontos);
        atualizarTotal();
      });
    });
  });

  container.querySelectorAll('.escala-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const ativo = btn.dataset.ativo === 'true';
      btn.dataset.ativo = ativo ? 'false' : 'true';
      btn.classList.toggle('escala-item-selecionado', !ativo);
      atualizarTotal();
    });
  });

  atualizarTotal();
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
