console.log("inicio.js carregado");

const telaPlay = document.getElementById("Play");
const telaConfig = document.getElementById("config");
const inputNome = document.getElementById("inputNome");
const botaoJogar = document.getElementById("botaoJogar");
const somclique = new Audio("../sound/clique.mp3");
const somvitoria = new Audio("../sound/vitoria.mp3");
const somperda = new Audio("../sound/perda.mp3");

let personagemEscolhido = null;
let modoEscolhido = null;
let simboloEscolhido = null;
let corEscolhida = null;

// Mapa de cores para converter o data-cor em cores CSS reais
const mapaCores = {
    "vermelho": "#e05252",
    "rosa": "#e879c9",
    "roxo": "#9b59e0",
    "azul": "#4a90e2",
    "verde": "#4caf7d",
    "amarelo": "#e0c93e"
};

document.addEventListener("click", function (e) {

    if (e.target.id === "botaoPlay") {
        somclique.currentTime = 0;
        somclique.play();
        telaPlay.classList.remove("ativa");
        telaConfig.classList.add("ativa");
    }

    const personaje = e.target.closest(".personagem");
    if (personaje) {
        somclique.currentTime = 0;
        somclique.play();
        document.querySelectorAll(".personagem").forEach(c => c.classList.remove("selecionado"));
        personaje.classList.add("selecionado");
        personagemEscolhido = personaje.dataset.personagem;
        verificarPronto();
    }

    const simbolo = e.target.closest(".simbolo");
    if (simbolo) {
        somclique.currentTime = 0;
        somclique.play();
        document.querySelectorAll(".simbolo").forEach(s => s.classList.remove("selecionado"));
        simbolo.classList.add("selecionado");
        simboloEscolhido = simbolo.dataset.simbolo;
        verificarPronto();
    }

    const cor = e.target.closest(".cor");
    if (cor) {
        somclique.currentTime = 0;
        somclique.play();
        document.querySelectorAll(".cor").forEach(c => c.classList.remove("selecionado"));
        cor.classList.add("selecionado");
        
        // Pega o nome (ex: "vermelho") e converte para Hexadecimal (ex: "#e05252")
        const nomeCor = cor.dataset.cor;
        corEscolhida = mapaCores[nomeCor] || "#ffffff"; 
        
        verificarPronto();
    }

    const modo = e.target.closest(".modo");
    if (modo) {
        somclique.currentTime = 0;
        somclique.play();
        document.querySelectorAll(".modo").forEach(m => m.classList.remove("selecionado"));
        modo.classList.add("selecionado");
        modoEscolhido = modo.dataset.modo;
        verificarPronto();
    }

    if (e.target.id === "botaoJogar" && !e.target.disabled) {
        const dadosJogador = {
            nome: inputNome.value.trim(),
            personagem: personagemEscolhido,
            modo: modoEscolhido,
            simbolo: simboloEscolhido,
            cor: corEscolhida // Agora salva o código hexadecimal real!
        };
        localStorage.setItem("dadosJogador1", JSON.stringify(dadosJogador));
        window.location.replace("index.html");
    }

});

if (inputNome) {
    inputNome.oninput = verificarPronto;
}

function verificarPronto() {
    const nomePreenchido = inputNome && inputNome.value.trim().length > 0;
    if (botaoJogar) {
        botaoJogar.disabled = !(nomePreenchido && personagemEscolhido && modoEscolhido && simboloEscolhido && corEscolhida);
    }
}
