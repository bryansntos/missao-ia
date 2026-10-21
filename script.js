const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const barra = document.getElementById("barra");

const perguntas = [
    {
        enunciado: "Você chega em um restaurante futurista e o menu é gerado por um chef de inteligência artificial. Qual a sua primeira reação?",
        alternativas: [
            {
                texto: "Prefiro o cardápio clássico feito por humanos!",
                afirmacao: "Você sempre valorizou a tradição e o toque humano na cozinha. "
            },
            {
                texto: "Que incrível! Quero provar tudo que a IA inventar.",
                afirmacao: "Você se apaixonou pelas possibilidades criativas da tecnologia na gastronomia. "
            }
        ]
    },
    {
        enunciado: "É final de semana e você decide cozinhar algo especial. Como prefere fazer?",
        alternativas: [
            {
                texto: "Sigo uma receita famosa à risca, medindo cada ingrediente.",
                afirmacao: "Você se tornou conhecido por pratos precisos e cheios de técnica. "
            },
            {
                texto: "Abro a geladeira e improviso com o que tem, no feeling.",
                afirmacao: "Sua criatividade na cozinha virou marca registrada entre amigos e família. "
            }
        ]
    },
    {
        enunciado: "Em um debate sobre o futuro da alimentação, como você se posiciona?",
        alternativas: [
            {
                texto: "Carne cultivada em laboratório e insetos são o caminho sustentável.",
                afirmacao: "Você ajudou a popularizar proteínas alternativas e mudou a forma como as pessoas comem. "
            },
            {
                texto: "Nada substitui a comida de verdade vinda da terra e dos animais.",
                afirmacao: "Você defendeu a agricultura tradicional e inspirou muitos a valorizarem o produto local. "
            }
        ]
    },
    {
        enunciado: "Você precisa apresentar um prato em um concurso de culinária. Qual estilo escolhe?",
        alternativas: [
            {
                texto: "Um prato sofisticado, com apresentação de restaurante estrelado.",
                afirmacao: "Seus pratos ganharam fama pela beleza e sofisticação. "
            },
            {
                texto: "Comida caseira reconfortante que lembra o abraço da vó.",
                afirmacao: "Você conquistou corações com o sabor de casa e aconchego. "
            }
        ]
    },
    {
        enunciado: "Um amigo usa uma IA para criar a receita inteira do jantar e não muda nada. O que você faz?",
        alternativas: [
            {
                texto: "Acho ótimo! A tecnologia existe para facilitar a vida.",
                afirmacao: "Com o tempo você passou a confiar cada vez mais na tecnologia para suas criações culinárias. "
            },
            {
                texto: "Reviso, experimento e adiciono meu toque pessoal, porque o segredo está no feeling.",
                afirmacao: "Você sempre lembrou que a verdadeira magia da cozinha está nas mãos e no coração de quem prepara. "
            }
        ]
    }
];

let atual = 0;
let historiaFinal = "";

function atualizarProgresso() {
    const porcentagem = (atual / perguntas.length) * 100;
    barra.style.width = `${porcentagem}%`;
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    atualizarProgresso();

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";
    textoResultado.textContent = "";

    perguntaAtual.alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        const span = document.createElement("span");
        span.textContent = alternativa.texto;
        botao.appendChild(span);
        botao.addEventListener("click", () => selecionarResposta(alternativa));
        caixaAlternativas.appendChild(botao);
    });
}

function selecionarResposta(opcao) {
    historiaFinal += opcao.afirmacao;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    atualizarProgresso();
    barra.style.width = "100%";

    caixaPerguntas.textContent = "Em 2049, na sua cozinha...";
    textoResultado.textContent = historiaFinal.trim();
    caixaAlternativas.innerHTML = "";

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.classList.add("botao-reiniciar");
    const span = document.createElement("span");
    span.textContent = "🔄  Cozinhar de novo";
    botaoReiniciar.appendChild(span);
    botaoReiniciar.addEventListener("click", reiniciarQuiz);
    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    textoResultado.textContent = "";
    barra.style.width = "0%";
    mostraPergunta();
}

mostraPergunta();