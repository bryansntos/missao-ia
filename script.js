// ===== PREVISÃO DE DESPERDÍCIO =====
function calcularPrevisao() {
  const alunos = parseInt(document.getElementById('alunos').value);
  const preparadas = parseInt(document.getElementById('preparadas').value);
  const resultadoDiv = document.getElementById('resultado');
  const kgPrevisto = document.getElementById('kg-previsto');
  const recomendacao = document.getElementById('recomendacao');

  // Validação
  if (!alunos || !preparadas || alunos <= 0 || preparadas <= 0) {
    alert('Por favor, preencha os dois campos com números válidos.');
    return;
  }

  // Média histórica fictícia (baseada nos dados de exemplo)
  const mediaHistorica = 9.4; // kg

  // Algoritmo simples de previsão (simulação de IA)
  const proporcao = preparadas / alunos;
  let desperdicio = mediaHistorica * (proporcao / 1.1);
  desperdicio = Math.round(desperdicio * 10) / 10; // 1 casa decimal

  // Gera recomendação
  let textoRecomendacao = '';
  let cor = '';

  if (desperdicio > 10) {
    textoRecomendacao = '⚠️ Alto risco de desperdício! Sugestão: reduzir 15% das porções e oferecer opção de meia-porção.';
    cor = '#c62828';
  } else if (desperdicio > 7) {
    textoRecomendacao = '⚡ Risco moderado. Sugestão: monitorar a fila e ajustar as últimas bandejas.';
    cor = '#ef6c00';
  } else {
    textoRecomendacao = '✅ Baixo risco. Continue o bom trabalho e incentive os alunos a não deixarem sobras.';
    cor = '#2e7d32';
  }

  // Mostra o resultado
  kgPrevisto.innerHTML = `Previsão de desperdício: <strong style="color:${cor}">${desperdicio} kg</strong>`;
  recomendacao.textContent = textoRecomendacao;
  resultadoDiv.classList.remove('hidden');
}

// ===== CHATBOT =====
const respostas = {
  oi: 'Olá! Eu sou o EcoBot 🌱 Posso te ajudar a reduzir o desperdício de comida na escola.',
  olá: 'Oi! Quer dicas para não desperdiçar comida na cantina?',
  desperdício: 'O desperdício acontece quando preparamos mais comida do que o necessário ou quando os alunos colocam demais no prato.',
  dicas: 'Dicas práticas:\n1. Pegue só o que vai comer.\n2. Peça meia-porção se estiver com pouca fome.\n3. Avise a cantina se não for almoçar.\n4. Reaproveite sobras em casa quando possível.',
  ia: 'A Inteligência Artificial ajuda a prever quantas refeições vão sobrar, mas a decisão final é sempre humana e ética.',
  'como ajudar': 'Você pode ajudar avisando a cantina, pegando apenas o necessário e conversando com os colegas sobre o tema.',
  ajuda: 'Você pode perguntar sobre: desperdício, dicas, ia ou como ajudar.'
};

function enviarMensagem() {
  const input = document.getElementById('pergunta');
  const chatContainer = document.getElementById('chat-container');
  const texto = input.value.trim().toLowerCase();

  if (!texto) return;

  // Mensagem do usuário
  const msgUsuario = document.createElement('div');
  msgUsuario.className = 'mensagem usuario';
  msgUsuario.textContent = input.value;
  chatContainer.appendChild(msgUsuario);

  // Resposta do bot
  let respostaBot = 'Ainda estou aprendendo 🌱 Tente perguntar sobre "dicas", "desperdício", "ia" ou "como ajudar".';

  for (const chave in respostas) {
    if (texto.includes(chave)) {
      respostaBot = respostas[chave];
      break;
    }
  }

  const msgBot = document.createElement('div');
  msgBot.className = 'mensagem bot';
  msgBot.innerHTML = respostaBot.replace(/\n/g, '<br>');
  chatContainer.appendChild(msgBot);

  // Limpa o input e rola para o final
  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;
}