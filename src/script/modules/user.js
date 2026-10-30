const entradas = [
        { horario: "09:41", placa: "OIT-2872", tipo: "Carro" },
        { horario: "09:37", placa: "ABC-1234", tipo: "Moto" },
        { horario: "09:32", placa: "OIT-2872", tipo: "Carro" },
        { horario: "09:28", placa: "DEF-5678", tipo: "Carro" },
        { horario: "09:21", placa: "OIT-2872", tipo: "Carro" },
        { horario: "08:54", placa: "GHI-9012", tipo: "Caminhão" }
    ];

    const saidas = [
        { horario: "12:57", placa: "OIT-2872", tipo: "Carro" },
        { horario: "12:22", placa: "ABC-1234", tipo: "Moto" },
        { horario: "11:43", placa: "DEF-5678", tipo: "Carro" },
        { horario: "10:28", placa: "OIT-2872", tipo: "Carro" },
        { horario: "09:19", placa: "GHI-9012", tipo: "Caminhão" },
        { horario: "08:21", placa: "OIT-2872", tipo: "Carro" }
    ];

    const campoPlaca = document.getElementById("placa");

    function criarLinha(item) {
        return `<tr><td>${item.horario}</td><td class="placa-tabela">${item.placa}</td><td><span class="tipo">${item.tipo}</span></td></tr>`;
    }

    function atualizarHistorico() {
        const placa = campoPlaca.value.trim().toUpperCase();
        const entradasFiltradas = entradas.filter(item => !placa || item.placa === placa).slice(0, 5);
        const saidasFiltradas = saidas.filter(item => !placa || item.placa === placa).slice(0, 5);

        document.getElementById("listaEntradas").innerHTML = entradasFiltradas.map(criarLinha).join("");
        document.getElementById("listaSaidas").innerHTML = saidasFiltradas.map(criarLinha).join("");
        document.getElementById("contadorEntradas").textContent = `${entradasFiltradas.length} registros`;
        document.getElementById("contadorSaidas").textContent = `${saidasFiltradas.length} registros`;
        document.getElementById("semEntradas").style.display = entradasFiltradas.length ? "none" : "block";
        document.getElementById("semSaidas").style.display = saidasFiltradas.length ? "none" : "block";
        document.getElementById("placaAtual").textContent = placa || "Todas as placas";
    }

    document.getElementById("buscar").addEventListener("click", atualizarHistorico);
    campoPlaca.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
        atualizarHistorico();
    });
    campoPlaca.addEventListener("keydown", function (event) {
        if (event.key === "Enter") atualizarHistorico();
    });
    atualizarHistorico();