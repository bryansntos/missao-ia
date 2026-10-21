const perguntas = [
  {
    pergunta: "O que significa a sigla IA?",
    opcoes: [
      "Internet Avançada",
      "Inteligência Artificial",
      "Informação Automática",
      "Instrução Assistida"
    ],
    correta: 1
  },
  {
    pergunta: "No projeto EcoCantina, qual é o papel principal da Inteligência Artificial?",
    opcoes: [
      "Decidir sozinha o que a cantina deve fazer",
      "Substituir os funcionários da cantina",
      "Ajudar a prever o desperdício e sugerir ações",
      "Controlar os alunos na fila"
    ],
    correta: 2
  },
  {
    pergunta: "Qual é a principal causa de desperdício de comida na cantina escolar?",
    opcoes: [
      "Falta de tempero na comida",
      "Preparar mais refeições do que o necessário e alunos pegarem mais do que comem",
      "Horário do almoço muito cedo",
      "Falta de refrigerante"
    ],
    correta: 1
  },
  {
    pergunta: "O que é Pensamento Computacional?",
    opcoes: [
      "Saber programar em várias linguagens",
      "Forma de resolver problemas quebrando-os em partes menores, encontrando padrões e criando algoritmos",
      "Usar apenas computadores para estudar",
      "Criar jogos digitais"
    ],
    correta: 1
  },
  {
    pergunta: "Por que é importante refletir sobre a ética ao usar Inteligência Artificial?",
    opcoes: [
      "Porque a IA é perfeita e nunca erra",
      "Porque a IA pode ter vieses, inventar informações e a decisão final deve ser humana",
      "Porque a IA é proibida nas escolas",
      "Porque só adultos podem usar IA"
    ],
    correta: 1
  },
  {
    pergunta: "O que significa 'decomposição' no Pensamento Computacional?",
    opcoes: [
      "Juntar vários problemas em um só",
      "Quebrar um problema grande em partes menores e mais fáceis de resolver",
      "Apagar dados do computador",
      "Criar um site bonito"
    ],
    correta: 1
  },
  {
    pergunta: "Em um sistema de previsão de desperdício, o que acontece se os dados de entrada forem ruins?",
    opcoes: [
      "A IA corrige automaticamente",
      "O resultado da previsão também será ruim ou impreciso",
      "Nada muda",
      "A cantina recebe mais comida"
    ],
    correta: 1
  },
  {
    pergunta: "Qual atitude é mais ética ao usar uma ferramenta de IA na escola?",
    opcoes: [
      "Copiar a resposta da IA sem pensar",
      "Usar a IA como ajuda, verificar as informações e tomar a decisão final você mesmo",
      "Esconder que usou a IA",
      "Deixar a IA fazer todo o trabalho sozinha"
    ],
    correta: 1
  },
  {
    pergunta: "O que a EcoCantina ensina sobre o uso de tecnologia?",
    opcoes: [
      "Que a tecnologia resolve todos os problemas sozinha",
      "Que a tecnologia deve ser usada de forma responsável, ética e sempre com supervisão humana",
      "Que não devemos usar tecnologia na escola",
      "Que só programadores podem usar IA"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a melhor forma de reduzir o desperdício de comida na cantina?",
    opcoes: [
      "Proibir os alunos de pegar comida",
      "Combinar dados + conscientização + comunicação entre alunos e cantina",
      "Servir apenas salada",
      "Aumentar o preço do almoço"
    ],
    correta: 1
  }
];

let perguntaAtual = 0;
let acertos = 0;
let respostaSelecionada = null;

function iniciarQuiz() {
  document.getElementById('tela-inicio').classList.remove('ativa');
  document.getElementById('tela-quiz').classList.add('ativa');
  perguntaAtual = 0;
  acertos = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  document.getElementById('pergunta-texto').textContent = p.pergunta;
  document.getElementById('contador').textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
  
  // Atualiza barra de progresso
  const porcentagem = ((perguntaAtual) / perguntas.length) * 100;
  document.getElementById('progresso-fill').style.width = `${porcentagem}%`;

  const opcoesDiv = document.getElementById('opcoes');
  opcoesDiv.innerHTML = '';

  p.opcoes.forEach((texto, index) => {
    const div = document.createElement('div');
    div.className = 'opcao';
    div.onclick = () => selecionarOpcao(index, div);
    
    div.innerHTML = `
      <div class="marcador">${String.fromCharCode(65 + index)}</div>
      <div class="texto-opcao">${texto}</div>
    `;
    
    opcoesDiv.appendChild(div);
  });

  document.getElementById('btn-proxima').disabled = true;
  respostaSelecionada = null;
}

function selecionarOpcao(index, elemento) {
  // Remove seleção anterior
  document.querySelectorAll('.opcao').forEach(op => {
    op.classList.remove('selecionada');
  });

  // Marca a nova
  elemento.classList.add('selecionada');
  respostaSelecionada = index;
  document.getElementById('btn-proxima').disabled = false;
}

function proximaPergunta() {
  if (respostaSelecionada === null) return;

  // Verifica se acertou
  if (respostaSelecionada === perguntas[perguntaAtual].correta) {
    acertos++;
  }

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById('tela-quiz').classList.remove('ativa');
  document.getElementById('tela-resultado').classList.add('ativa');

  // Preenche 100% da barra
  document.getElementById('progresso-fill').style.width = '100%';

  const porcentagem = Math.round((acertos / perguntas.length) * 100);
  document.getElementById('pontuacao').textContent = `Você acertou ${acertos} de ${perguntas.length} (${porcentagem}%)`;

  let emoji, titulo, mensagem;

  if (porcentagem >= 90) {
    emoji = '🏆';
    titulo = 'Excelente!';
    mensagem = 'Você dominou os conceitos de IA ética e desperdício. Parabéns!';
  } else if (porcentagem >= 70) {
    emoji = '🎉';
    titulo = 'Muito bem!';
    mensagem = 'Você entendeu bem a importância do uso responsável da Inteligência Artificial.';
  } else if (porcentagem >= 50) {
    emoji = '👍';
    titulo = 'Bom trabalho!';
    mensagem = 'Continue refletindo sobre ética e tecnologia. Você está no caminho certo.';
  } else {
    emoji = '📚';
    titulo = 'Continue estudando!';
    mensagem = 'Revise os conceitos de Pensamento Computacional e ética da IA. Você consegue melhorar!';
  }

  document.getElementById('emoji-resultado').textContent = emoji;
  document.getElementById('titulo-resultado').textContent = titulo;
  document.getElementById('mensagem-resultado').textContent = mensagem;
}

function reiniciarQuiz() {
  document.getElementById('tela-resultado').classList.remove('ativa');
  document.getElementById('tela-inicio').classList.add('ativa');
}