document.addEventListener("DOMContentLoaded", () => {

    const somvitoria = new Audio("../sound/vitoria.mp3");
    const somperda = new Audio("../sound/perda.mp3")

    const dadosSalvos = localStorage.getItem("dadosJogador1");
    
    let jogador1 = {
        nome: "Jogador 1",
        simbolo: "X",
        cor: "#e879c9"
    };

    let jogador2 = {
        nome: "User 2",
        simbolo: "O",
        cor: "#4a90e2"
    };

    if (dadosSalvos) {
        const dadosJogador1 = JSON.parse(dadosSalvos);

        document.querySelector(".jogador1 .nome").textContent = dadosJogador1.nome;

        const avatarJogador1 = document.querySelector(".jogador1 .avatar");
        avatarJogador1.innerHTML = `<img src="../img/image${dadosJogador1.personagem}.png">`;
        
        jogador1.nome = dadosJogador1.nome;
        jogador1.simbolo = dadosJogador1.simbolo;
        jogador1.cor = dadosJogador1.cor;

        jogador2.simbolo = jogador1.simbolo === "X" ? "O" : "X";
        jogador2.cor = jogador1.cor === "#4a90e2" ? "#e05252" : "#4a90e2";
    }

    // Aplica a cor correta nos nomes de ambos os jogadores na tela
    if (document.querySelector(".jogador1 .nome")) {
        document.querySelector(".jogador1 .nome").style.color = jogador1.cor;
    }
    if (document.querySelector(".jogador2 .nome")) {
        document.querySelector(".jogador2 .nome").style.color = jogador2.cor;
    }

    const badgeJ1 = document.querySelector(".jogador1 .simbolo-badge");
    const badgeJ2 = document.querySelector(".jogador2 .simbolo-badge");

    if (badgeJ1) {
        badgeJ1.textContent = jogador1.simbolo;
        badgeJ1.style.color = jogador1.cor;
    }
    if (badgeJ2) {
        badgeJ2.textContent = grandfatherColor(jogador2.simbolo);
        badgeJ2.style.color = grandfatherColor(jogador2.cor);
    }

    function grandfatherColor(cor) {
        return cor === "azul" ? "#4a90e2" : cor === "vermelho" ? "#e05252" : cor;
    }

    let pontosJ1 = parseInt(localStorage.getItem("pontosJ1")) || 0; 
    let pontosJ2 = parseInt(localStorage.getItem("pontosJ2")) || 0; 

    const placarTexto = document.querySelector(".placar-principal");
    
    function atualizarPlacarNaTela() {
        if (placarTexto) {
            placarTexto.textContent = `${pontosJ1} x ${pontosJ2}`;
        }
    }
    atualizarPlacarNaTela();

    const partes = document.querySelectorAll(".parte");
    const vezTexto = document.querySelector(".vez");
    
    let vezDoJogador1 = true;
    let jogadas = 0;

    if (vezTexto) {
        vezTexto.textContent = `Vez de ${jogador1.nome} jogar`;
    }

    partes.forEach(parte => {
        parte.addEventListener("click", () => {
            if (parte.textContent !== "") return;
            
            const jogadorAtual = vezDoJogador1 ? jogador1 : jogador2;
            
            parte.textContent = jogadorAtual.simbolo;
            parte.style.color = grandfatherColor(jogadorAtual.cor);
            
            jogadas++;
            
            if (checarVitoria()) {
                finalizarPartida(jogadorAtual);
                return;
            }

            if (jogadas === 9) {
                finalizarPartida(null);
                return;
            }

            vezDoJogador1 = !vezDoJogador1;
            const proximoJogador = vezDoJogador1 ? jogador1 : jogador2;
            vezTexto.textContent = `Vez de ${proximoJogador.nome} jogar`;
        });
    });

    function checarVitoria() {
        const p = Array.from(partes).map(box => box.textContent);
        const combinacoes = [ [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6] ];
        return combinacoes.some(combo => p[combo[0]] !== "" && p[combo[0]] === p[combo[1]] && p[combo[0]] === p[combo[2]]);
    }

    function finalizarPartida(vencedor) {
        const modal = document.getElementById("overlayResultado");
        if (!modal) return;

        const tituloModal = modal.querySelector(".resultado-titulo");
        const pontosModal = modal.querySelector(".resultado-pontos");

        if (vencedor) {
            if (vencedor.simbolo === jogador1.simbolo) {
                pontosJ1++;
                localStorage.setItem("pontosJ1", pontosJ1);
                
                if (tituloModal) {
                    tituloModal.textContent = "Vitória!";
                    tituloModal.style.color = jogador1.cor;
                    somvitoria.currentTime = 0;
                    somvitoria.play();

                }
            } else {
                pontosJ2++;
                localStorage.setItem("pontosJ2", pontosJ2);
                
                if (tituloModal) {
                    tituloModal.textContent = "Derrota!";
                    tituloModal.style.color = grandfatherColor(jogador2.cor);
                    somperda.currentTime = 0;
                    somperda.play();
                }
            }
            
            atualizarPlacarNaTela();
        } else {
            if (tituloModal) {
                tituloModal.textContent = "Empate!";
                tituloModal.style.color = "#989c9e";
            }
        }

        if (pontosModal) {
            pontosModal.textContent = `Placar final: ${pontosJ1} x ${pontosJ2}`;
        }

        modal.classList.add("ativo");
    }

    document.getElementById("botaoReiniciar").addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("botaoReiniciarModal").addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("botaoRegras").addEventListener("click", () => {
        document.getElementById("overlayRegras").classList.add("ativo");
    });

    document.getElementById("fecharRegras").addEventListener("click", () => {
        document.getElementById("overlayRegras").classList.remove("ativo");
    });

    document.getElementById("botaoCasa").addEventListener("click", () => {
        localStorage.removeItem("pontosJ1");
        localStorage.removeItem("pontosJ2");
        window.location.href = "inicio.html";
    });

});
