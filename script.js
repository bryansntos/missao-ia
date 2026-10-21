// ===== TEMA =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== GRÁFICO =====
const ctx = document.getElementById('chartDesperdicio');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [{
      label: 'Desperdício (kg)',
      data: [8.2, 9.1, 10.5, 7.8, 11.3],
      backgroundColor: [
        'rgba(22, 163, 74, 0.7)',
        'rgba(22, 163, 74, 0.7)',
        'rgba(234, 88, 12, 0.7)',
        'rgba(22, 163, 74, 0.7)',
        'rgba(220, 38, 38, 0.7)'
      ],
      borderRadius: 10,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

// ===== PREVISÃO =====
function calcularPrevisao() {
  const alunos = parseInt(document.getElementById('alunos').value);
  const preparadas = parseInt(document.getElementById('preparadas').value);
  const fatorCardapio = parseFloat(document.getElementById('cardapio').value);

  if (!alunos || !preparadas || alunos <= 0 || preparadas <= 0) {
    alert('Preencha os campos com números válidos.');
    return;
  }

  // Lógica melhorada (simulação de IA)
  const mediaHistorica = 9.4;
  const proporcao = preparadas / alunos;
  let desperdicio = mediaHistorica * (proporcao / 1.08) * fatorCardapio;
  desperdicio = Math.round(desperdicio * 10) / 10;

  // Classificação
  let nivel, classe, texto;
  if (desperdicio > 11) {
    nivel = 'ALTO RISCO';
    classe = 'alto';
    texto = '⚠️ Alto risco de desperdício. Recomendação: reduzir 15–20% das porções, oferecer meia-porção e avisar a cozinha com antecedência.';
  } else if (desperdicio > 8) {
    nivel = 'RISCO MODERADO';
    classe = 'medio';
    texto = '⚡ Risco moderado. Monitore a fila, ajuste as últimas bandejas e incentive os alunos a pegarem só o necessário.';
  } else {
    nivel = 'BAIXO RISCO';
    classe = 'baixo';
    texto = '✅ Baixo risco. Continue o bom trabalho! Mantenha a comunicação com a cantina e incentive a conscientização.';
  }

  // Atualiza interface
  document.getElementById('placeholder').classList.add('hidden');
  document.getElementById('result-content').classList.remove('hidden');

  const badge = document.getElementById('nivel-risco');
  badge.textContent = nivel;
  badge.className = 'result-badge ' + classe;

  document.getElementById('kg-previsto').textContent = desperdicio + ' kg';
  document.getElementById('recomendacao').textContent = texto;
  document.getElementById('proporcao').textContent = proporcao.toFixed(2);
  document.getElementById('fator').textContent = fatorCardapio.toFixed(2);

  // Guarda temporariamente para salvar
  window.ultimaSimulacao = {
    data: new Date().toLocaleString('pt-BR'),
    alunos,
    preparadas,
    desperdicio,
    nivel
  };
}

// ===== HISTÓRICO =====
function salvarSimulacao() {
  if (!window.ultimaSimulacao) return;

  let historico = JSON.parse(localStorage.getItem('ecocantina-historico') || '[]');
  historico.unshift(window.ultimaSimulacao);
  if (historico.length > 10) historico = historico.slice(0, 10);
  localStorage.setItem('ecocantina-historico', JSON.stringify(historico));
  renderHistorico();
}

function renderHistorico() {
  const lista = document.getElementById('historico-lista');
  const historico = JSON.parse(localStorage.getItem('ecocantina-historico') || '[]');

  if (historico.length === 0) {
    lista.innerHTML = '<p class="empty">Nenhuma simulação salva ainda.</p>';
    return;
  }

  lista.innerHTML = historico.map(item => `
    <div class="historico-item">
      <strong>${item.desperdicio} kg</strong> — ${item.nivel}<br>
      <small>${item.alunos} alunos • ${item.preparadas} refeições • ${item.data}</small>
    </div>
  `).join('');
}

function limparHistorico() {
  if (confirm('Tem certeza que deseja apagar o histórico?')) {
    localStorage.removeItem('ecocantina-historico');
    renderHistorico();
  }
}

renderHistorico();

// ===== CHATBOT =====
const respostas = {
  'dicas': 'Dicas práticas para reduzir o desperdício:\n\n1. Pegue apenas o que realmente vai comer\n2. Peça meia-porção se estiver com pouca fome\n3. Avise a cantina se não for almoçar\n4. Converse com os colegas sobre o tema\n5. Valorize a comida — alguém trabalhou para prepará-la',
  'ia ética': 'A Inteligência Artificial deve ser usada de forma ética:\n\n• Ela sugere, mas não decide sozinha\n• Os dados precisam ser reais e transparentes\n• Sempre questionamos os resultados\n• O ser humano tem a palavra final\n• Tecnologia a serviço das pessoas e do planeta',
  'como funciona': 'A previsão funciona assim:\n\n1. Coletamos dados (alunos + refeições preparadas)\n2. Comparamos com a média histórica\n3. Aplicamos um fator do tipo de cardápio\n4. Geramos uma estimativa de desperdício\n5. Sugerimos ações concretas\n\nÉ uma simulação educativa de como uma IA simples pode ajudar.',
  'limites': 'Limites importantes da IA neste projeto:\n\n• Usa dados de exemplo (não reais da sua escola)\n• Não considera clima, eventos especiais ou preferências individuais\n• Não substitui o conhecimento da cozinha e dos funcionários\n• Pode errar se os dados de entrada forem ruins\n• Sempre precisa de supervisão humana',
  'oi': 'Olá! Eu sou o EcoBot 🌱\nPosso te ajudar a entender o desperdício de comida e o uso responsável de Inteligência Artificial. O que você gostaria de saber?',
  'olá': 'Oi! Pronto para aprender sobre sustentabilidade e IA ética?',
  'desperdício': 'O desperdício de comida na escola acontece principalmente quando:\n• Preparamos mais do que o necessário\n• Os alunos colocam no prato mais do que comem\n• Não há comunicação entre cantina e estudantes\n\nA boa notícia: com dados + consciência dá para reduzir bastante!',
  'obrigado': 'Por nada! 🌱 Qualquer dúvida, é só chamar. Juntos reduzimos o desperdício!'
};

function adicionarMensagem(texto, tipo) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `message ${tipo}`;
  div.innerHTML = texto.replace(/\n/g, '<br>');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function mostrarDigitando() {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message bot typing';
  div.id = 'typing';
  div.textContent = 'EcoBot está digitando...';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removerDigitando() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

function enviarMensagem() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem(texto, 'user');
  input.value = '';

  mostrarDigitando();

  setTimeout(() => {
    removerDigitando();
    let resposta = 'Ainda estou aprendendo 🌱\nTente perguntar sobre: dicas, IA ética, como funciona a previsão ou limites da IA.';

    const lower = texto.toLowerCase();
    for (const chave in respostas) {
      if (lower.includes(chave)) {
        resposta = respostas[chave];
        break;
      }
    }

    adicionarMensagem(resposta, 'bot');
  }, 700 + Math.random() * 600);
}

function perguntaRapida(texto) {
  document.getElementById('chat-input').value = texto;
  enviarMensagem();
}

// Mensagem inicial do bot
setTimeout(() => {
  adicionarMensagem('Olá! Eu sou o EcoBot 🌱\nPosso te ajudar com dicas de sustentabilidade e explicar como a Inteligência Artificial é usada neste projeto de forma ética. O que você quer saber?', 'bot');
}, 400);

// ===== NAV ACTIVE =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});