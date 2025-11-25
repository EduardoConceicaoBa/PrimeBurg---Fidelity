// Detecta nomes femininos 
function isFemaleName(nome) {
    if (!nome) return false;

    nome = nome.trim().toLowerCase();

    const nomesFemininos = [
        "ana", "maria", "julia", "beatriz", "lara", "laura", "helena",
        "mariana", "sofia", "isabela", "giovanna", "aline", "camila",
        "carla", "bruna", "natalia", "rebeca", "luiza", "amanda",
        "fabiana", "patricia", "valentina", "alicia", "yasmin"
    ];

    if (nomesFemininos.includes(nome)) return true;
    if (nome.endsWith("a")) return true;

    return false;
}

let planoSelecionado = "";


// ------------------- 1) Seleção do Plano -------------------
function selecionarPlano(plano) {
    planoSelecionado = plano;
    document.getElementById("planoEscolhido").textContent = planoSelecionado;

    document.getElementById("planSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}


// ------------------- 2) Login -------------------
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "" || pass === "") {
        alert("Preencha usuário e senha.");
        return;
    }

    alert("Login realizado com sucesso!");
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("idadeSection").classList.remove("hidden");
});


// ------------------- 3) Verificação de idade -------------------
document.getElementById("verificarBtn").addEventListener("click", () => {
    const idade = Number(document.getElementById("idadeInput").value);
    const res = document.getElementById("resultado");

    if (!idade || idade <= 0 || idade > 120) {
        res.textContent = "Idade inválida. Parece mentira!";
        res.style.color = "tomato";
        return;
    }

    if (idade < 18) {
        res.textContent = "❌ Menor de idade. Ação bloqueada.";
        res.style.color = "red";
        return;
    }

    res.textContent = "Maior de idade!";
    res.style.color = "#9de28a";

    setTimeout(() => {
        document.getElementById("idadeSection").classList.add("hidden");
        document.getElementById("gastoSection").classList.remove("hidden");
    }, 800);
});




// 4) Cálculo do gasto + adaptação de gênero 
document.getElementById("calcularBtn").addEventListener("click", () => {
    const nome = document.getElementById("nomeInput").value.trim() || "Cliente";
    const gasto = Number(document.getElementById("gastoInput").value);
    const saida = document.getElementById("gastoResultado");
    const proximoBtn = document.getElementById("proximoClienteBtn");

    if (isNaN(gasto) || gasto < 0) {
        saida.textContent = "Valor inválido!";
        saida.style.color = "tomato";
        return;
    }

    // Detectar gênero
    const feminino = isFemaleName(nome);
    const artCliente = feminino ? "A cliente" : "O cliente";
    const promovido = feminino ? "promovida" : "promovido";
    const beneficiado = feminino ? "beneficiada" : "beneficiado";

    let desconto = 0;
    let alerta = "";
    let houvePromocao = false;

    // --- Regras Bronze ---
    if (planoSelecionado === "Bronze") {
        if (gasto >= 500) {
            alerta = `ALERTA: ${artCliente} ${nome}, Bronze, foi ${promovido} a Prata.`;
            houvePromocao = true;
        } else if (gasto > 300) {
            desconto = 12;
        } else if (gasto > 150) {
            desconto = 8;
        } else if (gasto < 50) {
            alerta = `ALERTA: ${artCliente} ${nome}, Bronze, está com engajamento baixo.`;
        }
    }

    // --- Regras Prata ---
    else if (planoSelecionado === "Prata") {
        if (gasto >= 1200) {
            alerta = `ALERTA: ${artCliente} ${nome}, Prata, foi ${promovido} a Ouro.`;
            houvePromocao = true;
        } else if (gasto > 700) {
            desconto = 18;
        } else if (gasto > 400) {
            desconto = 10;
        } else if (gasto < 150) {
            alerta = `ALERTA: ${artCliente} ${nome}, Prata, corre risco de voltar para Bronze.`;
        }
    }

    // --- Regras Ouro ---
    else if (planoSelecionado === "Ouro") {
        if (gasto >= 2500) {
            alerta = `ALERTA: ${artCliente} ${nome}, Ouro, ganhou Combo Vitalício por 1 mês!`;
            houvePromocao = true;
        } else if (gasto > 1200) {
            desconto = 25;
        } else if (gasto > 800) {
            desconto = 15;
        } else if (gasto < 300) {
            alerta = `ALERTA: ${artCliente} ${nome}, Ouro, corre risco de voltar para Prata.`;
        }
    }

    // --- Exibição ---
    saida.classList.remove("animPromocao", "animDesconto");

    // ALERTA
    if (alerta !== "") {
        saida.textContent = alerta;
        saida.style.color = "#ffb3a1";

        if (houvePromocao) saida.classList.add("animPromocao");

        proximoBtn.classList.remove("hidden");
        return;
    }

    // DESCONTO
    if (desconto > 0) {
        saida.textContent = `${artCliente} ${nome}, plano ${planoSelecionado}, será ${beneficiado} com um desconto de ${desconto}% no próximo mês.`;
        saida.style.color = "#9de28a";

        saida.classList.add("animDesconto");
        proximoBtn.classList.remove("hidden");
        return;
    }

    // NADA APLICADO
    saida.textContent = "Nenhum benefício aplicado.";
    saida.style.color = "#f7e9d7";
    proximoBtn.classList.remove("hidden");
});




// ------------------- 5) Função para atender próximo cliente -------------------
function reiniciarAtendimento() {
    planoSelecionado = "";

    // limpar inputs
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("idadeInput").value = "";
    document.getElementById("nomeInput").value = "";
    document.getElementById("gastoInput").value = "";

    // limpar textos
    document.getElementById("resultado").textContent = "";
    document.getElementById("gastoResultado").textContent = "";

    // esconder seções
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("idadeSection").classList.add("hidden");
    document.getElementById("gastoSection").classList.add("hidden");
    document.getElementById("proximoClienteBtn").classList.add("hidden");

    // voltar ao início
    document.getElementById("planSection").classList.remove("hidden");
}


// ------------------- 6) Evento do botão "Atender Próximo Cliente" -------------------
document.getElementById("proximoClienteBtn").addEventListener("click", reiniciarAtendimento);
