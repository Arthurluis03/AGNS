const button = document.getElementById("sair_button")
const menuItems = document.querySelectorAll(".menu a");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const ctxLinha = document.getElementById("Grafico_Movimento");



button.addEventListener('click', ()=>{
    window.location.href="/index.html"
})

const menuSalvo = localStorage.getItem("menuSelecionado");

if (menuSalvo) {
    const itemSalvo = document.querySelector(
        `.menu a[data-menu="${menuSalvo}"]`
    );

    if (itemSalvo) {
        menuItems.forEach(item => item.classList.remove("active"));
        itemSalvo.classList.add("active");
    }
}

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(link => link.classList.remove("active"));
        item.classList.add("active");

        localStorage.setItem(
            "menuSelecionado",
            item.dataset.menu
        );

        if (window.innerWidth <= 600) {
            sidebar.classList.remove("menu-open");
            document.body.classList.remove("menu-visible");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
    });
});

menuToggle.addEventListener("click", () => {
    const aberto = sidebar.classList.toggle("menu-open");

    document.body.classList.toggle("menu-visible", aberto);
    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
});

// usar o target pra ver qual elemento foi clicado


document.addEventListener("click", (event) => {
    const clickF =
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target);

    if (clickF && sidebar.classList.contains("menu-open")) {
        sidebar.classList.remove("menu-open");
        document.body.classList.remove("menu-visible");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }
});




//  fazer parte dos graficos 


new Chart(ctxLinha, {
    type: "line",
    data: {
        labels: ["08h", "10h", "12h", "14h", "16h", "18h"],
        datasets: [
            {
                label: "Entradas",
                data: [12, 19, 15, 25, 20, 30],
                borderColor: "#16a77b",
                backgroundColor: "#16a77b",
                tension: 0.4
            },
            {
                label: "Saídas",
                data: [8, 14, 12, 18, 22, 25],
                borderColor: "#ed3861",
                backgroundColor: "#ed3861",
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});




const ctxPizza = document.getElementById("Grafico_Pizza");

new Chart(ctxPizza, {
    type: "doughnut",
    data: {
        labels: ["Dentro", "Fora"],
        datasets: [{
            data: [138, 110],
            backgroundColor: ["#16a77b", "#F64468"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});




const modal = document.getElementById("modalVeiculo");
const formulario = document.getElementById("formVeiculo");

let movimentacao = "entrada";

function abrirModal(tipo) {
    movimentacao = tipo;

    if (tipo === "entrada") {
        document.getElementById("tituloModal").textContent = "Adicionar entrada";
    } else {
        document.getElementById("tituloModal").textContent = "Adicionar saída";
    }

    formulario.reset();
    modal.hidden = false;
}

function fecharModal() {
    modal.hidden = true;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let horario = document.getElementById("horarioVeiculo").value;
    let placa = document.getElementById("placaVeiculo").value.toUpperCase();
    let tipo = document.getElementById("tipoVeiculo").value;

    if (horario === "" || placa === "" || tipo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let historico;

    if (movimentacao === "entrada") {
        historico = document.querySelector(
            ".historico-grid .historico-card:first-child .historico-tabela"
        );
    } else {
        historico = document.querySelector(
            ".historico-grid .historico-card:last-child .historico-tabela"
        );
    }

    let linha = document.createElement("div");
    linha.className = "historico-linha";

    let horarioTexto = document.createElement("span");
    horarioTexto.textContent = horario;

    let placaTexto = document.createElement("span");
    placaTexto.textContent = placa;

    let tipoTexto = document.createElement("span");
    tipoTexto.textContent = tipo;
    tipoTexto.className = "tipo-veiculo";

    if (movimentacao === "entrada") {
        tipoTexto.classList.add("entrada-tipo");
    } else {
        tipoTexto.classList.add("saida-tipo");
    }

    linha.appendChild(horarioTexto);
    linha.appendChild(placaTexto);
    linha.appendChild(tipoTexto);

    let cabecalho = historico.querySelector(".historico-colunas");
    cabecalho.insertAdjacentElement("afterend", linha);

    fecharModal();
});