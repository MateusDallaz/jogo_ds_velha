let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let vez = "X";             
let fim = false;        
let contraMaquina = false;
let nomes = { X: "", O: "" };
let placar = { X: 0, O: 0, empate: 0 };

// Todas as formas de vencer
const vitorias = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function novoJogo(nomeX, nomeO, modoMaquina) {
    nomes.X = nomeX;
    nomes.O = nomeO;
    contraMaquina = modoMaquina;
    placar = { X: 0, O: 0, empate: 0 };
    reiniciar();
}

function reiniciar() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    vez = "X";
    fim = false;
}

function jogar(posicao) {
    if (fim || tabuleiro[posicao] !== "") return; 

    tabuleiro[posicao] = vez;

    if (venceu()) {
        terminar(vez);
    } else if (!tabuleiro.includes("")) {
        terminar("empate");
    } else {
        vez = vez === "X" ? "O" : "X"; 
    }
}

function venceu() {
    for (const [a, b, c] of vitorias) {
        if (tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }
    return false;
}


function jogadaMaquina(inteligente) {
    const livres = [];
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[i] === "") livres.push(i);
    }

    if (inteligente) {
        const adversario = vez === "X" ? "O" : "X";
        const posicao =
            casaParaCompletar(vez) ??        // 1. vence se puder
            casaParaCompletar(adversario) ?? // 2. bloqueia o adversário
            (tabuleiro[4] === "" ? 4 : null) ?? // 3. pega o centro
            sortear([0, 2, 6, 8].filter(function (i) { return tabuleiro[i] === ""; })); // 4. pega um canto
        if (posicao !== null && posicao !== undefined) {
            jogar(posicao);
            return;
        }
    }

    jogar(sortear(livres));
}

// Casa que completa uma linha com dois símbolos iguais
function casaParaCompletar(simbolo) {
    for (const linha of vitorias) {
        const marcadas = linha.filter(function (i) { return tabuleiro[i] === simbolo; });
        const vazias = linha.filter(function (i) { return tabuleiro[i] === ""; });
        if (marcadas.length === 2 && vazias.length === 1) return vazias[0];
    }
    return null;
}

function sortear(lista) {
    if (lista.length === 0) return null;
    return lista[Math.floor(Math.random() * lista.length)];
}

function terminar(resultado) {
    fim = true;
    placar[resultado]++;
}
