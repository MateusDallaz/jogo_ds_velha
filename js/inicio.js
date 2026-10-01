
function ligarJanela(idLink, idJanela, idFechar) {
    const janela = document.getElementById(idJanela);

    document.getElementById(idLink).addEventListener("click", function (evento) {
        evento.preventDefault(); 
        janela.style.display = "flex";
    });

    document.getElementById(idFechar).addEventListener("click", function () {
        janela.style.display = "none";
    });
}

ligarJanela("abrir-regras", "regras", "fechar-regras");
ligarJanela("abrir-apresentacao", "janela-apresentacao", "fechar-apresentacao");
