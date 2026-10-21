const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const resultadoEl = document.getElementById("resultado");
const textoResultadoEl = document.getElementById("texto-resultado");
const btnReiniciar = document.getElementById("btn-reiniciar");
const stepsEl = document.getElementById("steps");
const questionBox = document.getElementById("question-box");
const efeitoFinalEl = document.getElementById("efeito-final");
const efeitoTitulo = document.getElementById("efeito-titulo");
const efeitoSubtitulo = document.getElementById("efeito-subtitulo");
const particulasEl = document.getElementById("particulas");

const perguntas = [
    {
        enunciado: "Você entra em um restaurante onde o menu é criado por uma inteligência artificial a cada segundo. Qual a sua primeira reação?",
        alternativas: [
            {
                texto: "Prefiro o cardápio clássico, escrito por mãos humanas.",
                afirmacao: "Você sempre defendeu o valor da tradição e do toque humano na cozinha. "
            },
            {
                texto: "Quero provar tudo o que a IA inventar. O futuro chegou!",
                afirmacao: "Você se deixou seduzir pelas possibilidades infinitas da tecnologia na gastronomia. "
            }
        ]
    },
    {
        enunciado: "É sábado à noite e a cozinha está só sua. Como você decide criar o jantar?",
        alternativas: [
            {
                texto: "Abro um livro de receitas clássicas e sigo cada passo com precisão.",
                afirmacao: "Sua disciplina e respeito à técnica se tornaram sua assinatura. "
            },
            {
                texto: "Abro a geladeira e improviso. O feeling é o melhor tempero.",
                afirmacao: "Sua criatividade livre e espontânea conquistou todos ao seu redor. "
            }
        ]
    },
    {
        enunciado: "Em um grande debate sobre o futuro da alimentação, qual lado você toma?",
        alternativas: [
            {
                texto: "Carne cultivada, insetos e proteínas alternativas são o caminho.",
                afirmacao: "Você se tornou uma voz importante na revolução das proteínas sustentáveis. "
            },
            {
                texto: "Nada substitui o sabor verdadeiro da terra e do animal.",
                afirmacao: "Você lutou para preservar a agricultura tradicional e o produto local. "
            }
        ]
    },
    {
        enunciado: "Você precisa apresentar um prato em um concurso de alto prestígio. Qual estilo escolhe?",
        alternativas: [
            {
                texto: "Alta gastronomia: técnica impecável e apresentação de museu.",
                afirmacao: "Seus pratos ganharam fama pela beleza quase artística e pela perfeição técnica. "
            },
            {
                texto: "Comida de afeto: o sabor que abraça e lembra a casa da vó.",
                afirmacao: "Você conquistou o mundo com o poder do aconchego e da memória afetiva. "
            }
        ]
    },
    {
        enunciado: "Um colega entrega um prato inteiramente criado por IA, sem nenhuma alteração. O que você faz?",
        alternativas: [
            {
                texto: "Acho genial. A tecnologia existe para nos libertar.",
                afirmacao: "Com o tempo você passou a confiar cada vez mais na inteligência artificial como parceira criativa. "
            },
            {
                texto: "Reviso, experimento e coloco minha alma no prato. A magia está nas mãos.",
                afirmacao: "Você nunca esqueceu que a verdadeira cozinha nasce do coração e das mãos de quem prepara. "
            }
        ]
    }
];

// Efeitos aleatórios no final
const efeitosFinais = [
    {
        titulo: "2049",
        subtitulo: "Na sua cozinha lendária...",
        mensagem: "✨ Você se tornou um ícone da gastronomia!"
    },
    {
        titulo: "CHEF DO ANO",
        subtitulo: "O mundo celebra o seu sabor",
        mensagem: "🏆 Seu nome está em todos os cardápios do futuro!"
    },
    {
        titulo: "2049",
        subtitulo: "Um legado de sabores",
        mensagem: "🔥 Suas receitas mudaram a forma de cozinhar!"
    },
    {
        titulo: "MESTRE DOS SABORES",
        subtitulo: "A história te lembrará",
        mensagem: "🌟 Você criou uma nova era na culinária!"
    },
    {
        titulo: "2049",
        subtitulo: "O aroma do sucesso",
        mensagem: "🍽️ Restaurantes do mundo inteiro pedem a sua assinatura!"
    },
    {
        titulo: "LENDA VIVA",
        subtitulo: "Na sua cozinha...",
        mensagem: "💫 Até a IA pede dicas para você agora!"
    }
];

const emojisComida = ["🍕", "🍔", "🍣", "🍩", "🍰", "🍷", "🥐", "🥗", "🍜", "🍦", "🍪", "🧁", "🥑", "🧀", "🥩", "🍇"];

let atual = 0;
let historiaFinal = "";

function criarSteps() {
    stepsEl.innerHTML = "";
    perguntas.forEach((_, i) => {
        const step = document.createElement("div");
        step.classList.add("step");
        if (i < atual) step.classList.add("done");
        if (i === atual) step.classList.add("active");
        stepsEl.appendChild(step);
    });
}

function mostrarPergunta() {
    if (atual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    criarSteps();
    questionBox.style.display = "block";
    resultadoEl.classList.add("hidden");

    const pergunta = perguntas[atual];
    perguntaEl.textContent = pergunta.enunciado;
    alternativasEl.innerHTML = "";

    pergunta.alternativas.forEach(alt => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        const span = document.createElement("span");
        span.textContent = alt.texto;
        btn.appendChild(span);
        btn.addEventListener("click", () => escolher(alt));
        alternativasEl.appendChild(btn);
    });
}

function escolher(opcao) {
    historiaFinal += opcao.afirmacao;
    atual++;
    mostrarPergunta();
}

function soltarParticulas() {
    particulasEl.innerHTML = "";
    const quantidade = 28;

    for (let i = 0; i < quantidade; i++) {
        const el = document.createElement("div");
        el.classList.add("particula");
        el.textContent = emojisComida[Math.floor(Math.random() * emojisComida.length)];
        el.style.left = Math.random() * 100 + "vw";
        el.style.fontSize = (1.2 + Math.random() * 1.4) + "rem";