const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const resultadoEl = document.getElementById("resultado");
const textoResultadoEl = document.getElementById("texto-resultado");
const btnReiniciar = document.getElementById("btn-reiniciar");
const stepsEl = document.getElementById("steps");

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

    const pergunta = perguntas[atual];
    perguntaEl.textContent = pergunta.enunciado;
    alternativasEl.innerHTML = "";
    resultadoEl.classList.add("hidden");

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

function mostrarResultado() {
    criarSteps();
    alternativasEl.innerHTML = "";
    document.querySelector(".question-box").style.display = "none";

    resultadoEl.classList.remove("hidden");
    textoResultadoEl.textContent = historiaFinal.trim();
}

function reiniciar() {
    atual = 0;
    historiaFinal = "";
    document.querySelector(".question-box").style.display = "block";
    resultadoEl.classList.add("hidden");
    mostrarPergunta();
}

btnReiniciar.addEventListener("click", reiniciar);

mostrarPergunta();