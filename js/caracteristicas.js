let escolha = {
    nome: "",
    nomeAmigo: "",
    personagem: "",
    simbolo: "",
    cor: "",
    modo: ""
};


function marcar(grupo, item) {
    grupo.forEach(function (outro) {
        outro.classList.remove("selecionado");
    });
    item.classList.add("selecionado");
}

function criarGrupo(seletor, campo, pegarValor) {
    const itens = document.querySelectorAll(seletor);

    itens.forEach(function (item) {
        item.addEventListener("click", function () {
            marcar(itens, item);
            escolha[campo] = pegarValor(item);
        });
    });
}

criarGrupo(".personagem > div", "personagem", function (item) {
    return item.querySelector("img").getAttribute("src");
});
criarGrupo(".simbolo > div", "simbolo", function (item) {
    return item.textContent;
});
criarGrupo(".cor > div", "cor", function (item) {
    return item.classList[1]; 
});
criarGrupo(".opcoes .modo", "modo", function (item) {
    const campoAmigo = document.getElementById("nome-amigo");
    campoAmigo.classList.toggle("visivel", item.textContent === "Amigo");
    return item.textContent;
});


document.getElementById("jogar").addEventListener("click", function (evento) {
    escolha.nome = document.getElementById("nome").value.trim();

    if (escolha.nome === "") {
        evento.preventDefault(); 
        alert("Digite seu nome para jogar.");
        return;
    }

    if (!escolha.personagem || !escolha.simbolo || !escolha.cor || !escolha.modo) {
        evento.preventDefault();
        alert("Escolha personagem, símbolo, cor e modo para jogar.");
        return;
    }

    if (escolha.modo === "Amigo") {
        escolha.nomeAmigo = document.getElementById("nome-amigo").value.trim();

        if (escolha.nomeAmigo === "") {
            evento.preventDefault();
            alert("Digite o nome do seu amigo para jogar.");
            return;
        }
    }

    localStorage.setItem("configuracao", JSON.stringify(escolha));
});
