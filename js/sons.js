const sons = {
    clique: new Audio("../sound/clique.mp3"),
    vitoria: new Audio("../sound/vitoria.mp3"),
    perda: new Audio("../sound/perda.mp3")
};

function tocarSom(nome) {
    const som = sons[nome];
    som.currentTime = 0;
    return som.play();
}

Object.values(sons).forEach(function (som) {
    som.preload = "auto";
});

// Toca o clique em todos os botões, links, opções de seleção e casas do tabuleiro
document.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button, a, .personagem > div, .simbolo > div, .cor > div, .opcoes .modo, .parte");
    if (!botao) return;

    const tocando = tocarSom("clique");

    // Espera o som terminar antes de trocar de página (Play, Jogar, Início)
    const destino = botao.getAttribute("href");
    if (botao.tagName === "A" && destino && destino !== "#" && !evento.defaultPrevented) {
        evento.preventDefault();

        let saiu = false;
        function irPara() {
            if (saiu) return;
            saiu = true;
            window.location.href = destino;
        }

        sons.clique.addEventListener("ended", irPara, { once: true });
        setTimeout(irPara, 1000); // limite caso o som demore
        tocando.catch(irPara);    // se o navegador bloquear o som, troca de página na hora
    } else {
        tocando.catch(function () {});
    }
});
