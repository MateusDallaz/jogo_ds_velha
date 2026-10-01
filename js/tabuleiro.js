const cores = {
    vermelho: "#e05252", rosa: "#e879c9", roxo: "#9b59e0",
    azul: "#4a90e2", verde: "#4caf7d", amarelo: "#e0c93e"
};


const config = JSON.parse(localStorage.getItem("configuracao")) || {
    nome: "Jogador 1", personagem: "../img/image1.png",
    simbolo: "X", cor: "vermelho", modo: "Amigo"
};

// "Computador" joga com estratégia, "Aleatório" joga em casas sorteadas
const maquina = config.modo === "Computador" || config.modo === "Aleatório";
const maquinaInteligente = config.modo === "Computador";
const simbolo1 = config.simbolo;
const simbolo2 = simbolo1 === "X" ? "O" : "X";
const nome1 = config.nome;
const nome2 = maquina ? "Computador" : (config.nomeAmigo || "Jogador 2");
const cor1 = cores[config.cor];
const cor2 = config.cor === "azul" ? cores.vermelho : cores.azul;
const imagem2 = config.personagem === "../img/image2.png" ? "../img/image1.png" : "../img/image2.png";

const partes = document.querySelectorAll(".parte");
const textoPlacar = document.getElementById("placar");
const textoVez = document.getElementById("vez");
const janelaResultado = document.getElementById("resultado");

document.querySelector(".jogador1 img").src = config.personagem;
document.querySelector(".jogador1 p").textContent = nome1 + " (" + simbolo1 + ")";
document.querySelector(".jogador1 p").style.color = cor1;
document.querySelector(".jogador2 img").src = imagem2;
document.querySelector(".jogador2 p").textContent = nome2 + " (" + simbolo2 + ")";
document.querySelector(".jogador2 p").style.color = cor2;

partes.forEach(function (parte, posicao) {
    parte.addEventListener("click", function () {
        clicarCasa(posicao);
    });
});
document.getElementById("reiniciar").addEventListener("click", novaRodada);
document.getElementById("jogar-de-novo").addEventListener("click", function () {
    janelaResultado.style.display = "none";
    novaRodada();
});

if (simbolo1 === "X") {
    novoJogo(nome1, nome2, maquina);
} else {
    novoJogo(nome2, nome1, maquina);
}
novaRodada();

// ---------------------------------------------

function novaRodada() {
    reiniciar();
    atualizarTela();
    vezDoComputador();
}

function clicarCasa(posicao) {
    if (contraMaquina && vez === simbolo2) return; 

    jogar(posicao);
    atualizarTela();
    vezDoComputador();
}

function vezDoComputador() {
    if (!contraMaquina || fim || vez !== simbolo2) return;

    setTimeout(function () {
        if (fim || vez !== simbolo2) return; 
        jogadaMaquina(maquinaInteligente);
        atualizarTela();
    }, 500);
}

function atualizarTela() {
    partes.forEach(function (parte, i) {
        parte.textContent = tabuleiro[i];
        parte.style.color = tabuleiro[i] === simbolo1 ? cor1 : cor2;
    });

    textoPlacar.textContent = placar[simbolo1] + " x " + placar[simbolo2];

    if (fim) {
        textoVez.textContent = "Fim da rodada";
        setTimeout(mostrarResultado, 600); 
    } else {
        textoVez.textContent = "Vez de " + nomes[vez] + " jogar";
    }
}

function mostrarResultado() {
    let titulo = "Empate!";
    if (venceu()) {
        titulo = nomes[vez] + " venceu!"; 

        // Contra o computador: vitória ou perda do jogador 1. Entre amigos: sempre vitória.
        if (maquina && vez === simbolo2) {
            tocarSom("perda").catch(function () {});
        } else {
            tocarSom("vitoria").catch(function () {});
        }
    }

    document.getElementById("titulo-resultado").textContent = titulo;
    document.getElementById("placar-final").textContent =
        "Placar: " + nome1 + " " + placar[simbolo1] + " x " + placar[simbolo2] + " " + nome2 +
        " | Empates: " + placar.empate;
    janelaResultado.style.display = "flex";
}
