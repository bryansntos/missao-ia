const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia: um chat que responde qualquer dúvida e ainda gera imagens e áudios hiper-realistas. Qual o seu primeiro pensamento?",
        alternativas: [
            {
                texto: "Isso é assustador!",
                afirmacao: "No início você ficou com medo do que essa tecnologia pode fazer. "
            },
            {
                texto: "Isso é maravilhoso!",
                afirmacao: "Você quis saber como usar IA no seu dia a dia. "
            }
        ]
    },
    {
        enunciado: "Uma professora de tecnologia decidiu fazer uma sequência de aulas sobre Inteligência Artificial. No final de uma aula, ela pede um trabalho sobre o uso de IA em sala de aula. O que você faz?",
        alternativas: [
            {
                texto: "Usa uma ferramenta de busca com IA para encontrar informações e explicar de forma clara.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis e relevantes. "
            },
            {
                texto: "Escreve o trabalho com base em conversas com colegas, pesquisas e seus próprios conhecimentos.",
                afirmacao: "Você preferiu usar seus próprios recursos e conhecimentos para construir o trabalho. "
            }
        ]
    },
    {
        enunciado: "Durante um debate na turma sobre como a IA impacta o trabalho do futuro, como você se posiciona?",
        alternativas: [
            {
                texto: "A IA pode criar novas oportunidades de emprego e melhorar habilidades humanas.",
                afirmacao: "Você passou a impulsionar a inovação e a buscar novos caminhos profissionais com IA. "
            },
            {
                texto: "Me preocupo com quem pode perder o emprego e defendo a proteção dos trabalhadores.",
                afirmacao: "Sua preocupação motivou a criação de um grupo de estudos sobre o uso ético da IA. "
            }
        ]
    },
    {
        enunciado: "Você precisa criar uma imagem que represente o que pensa sobre IA. Qual caminho escolhe?",
        alternativas: [
            {
                texto: "Cria a imagem usando uma ferramenta tradicional como o Paint.",
                afirmacao: "Você notou que muita gente ainda não domina ferramentas digitais e decidiu compartilhar seus conhecimentos de design. "
            },
            {
                texto: "Usa um gerador de imagens com Inteligência Artificial.",
                afirmacao: "Você acelerou a criação de imagens e agora ensina outras pessoas a usarem geradores de IA. "
            }
        ]
    },
    {
        enunciado: "No trabalho em grupo de biologia, um colega entregou um texto gerado por IA que ficou idêntico ao do chat. O que você faz?",
        alternativas: [
            {
                texto: "Acho que escrever comandos já é uma forma de contribuir, então não tem problema usar o texto inteiro.",
                afirmacao: "Com o tempo você acabou dependendo demais da IA para quase todas as tarefas. "
            },
            {
                texto: "Reviso o trabalho, corrijo e adiciono perspectivas pessoais, porque toda máquina pode errar.",
                afirmacao: "Você entendeu que a IA deve ser um auxílio, e não o resultado final. "
            }
        ]
    }
];

let atual = 0;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";
    textoResultado.textContent = "";

    perguntaAtual.alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
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
    caixaPerguntas.textContent = "Em 2049...";
    textoResultado.textContent = historiaFinal.trim();
    caixaAlternativas.innerHTML = "";

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Tentar novamente";
    botaoReiniciar.classList.add("botao-reiniciar");
    botaoReiniciar.addEventListener("click", reiniciarQuiz);
    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    textoResultado.textContent = "";
    mostraPergunta();
}

mostraPergunta();