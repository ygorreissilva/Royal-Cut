// ===== DADOS DA BARBEARIA (troque aqui pelos dados reais) =====
const CONFIG = {
  nome: "Royal Cut Barbearia",
  whatsapp: "5521999999999", // número fictício. Formato: 55 + 021 + 993840461, só dígitos
  servicos: [
    { nome: "Corte masculino", preco: 35, duracao: "40 min" },
    { nome: "Degradê", preco: 40, duracao: "45 min" },
    { nome: "Barba", preco: 25, duracao: "30 min" },
    { nome: "Corte + Barba", preco: 60, duracao: "1h 15min" },
    { nome: "Sobrancelha", preco: 10, duracao: "10 min" },
    { nome: "Pigmentação", preco: 30, duracao: "30 min" },
    { nome: "Corte infantil", preco: 30, duracao: "30 min" }
  ],
  horarios: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
};

// ===== FUNÇÕES AUXILIARES =====
function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function formatarData(dataISO) {
  // "2026-10-25" -> "25/10/2026"
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function dataDeHoje() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

// ===== MONTAR A PÁGINA COM OS DADOS =====
const listaServicos = document.getElementById("listaServicos");
const selectServico = document.getElementById("servico");
const selectHora = document.getElementById("hora");

CONFIG.servicos.forEach(function (s) {
  // cards da seção "Serviços"
  listaServicos.insertAdjacentHTML("beforeend", `
    <article class="card">
      <h3>${s.nome}</h3>
      <p class="card__duracao">Duração: ${s.duracao}</p>
      <p class="card__preco">${formatarPreco(s.preco)}</p>
    </article>
  `);

  // opções do formulário
  const opcao = document.createElement("option");
  opcao.value = s.nome;
  opcao.textContent = `${s.nome} (${formatarPreco(s.preco)})`;
  selectServico.appendChild(opcao);
});

CONFIG.horarios.forEach(function (h) {
  const opcao = document.createElement("option");
  opcao.value = h;
  opcao.textContent = h;
  selectHora.appendChild(opcao);
});

// não deixa escolher dias que já passaram
const campoData = document.getElementById("data");
campoData.min = dataDeHoje();

// link do WhatsApp na seção de contato e ano no rodapé
document.getElementById("linkWhats").href = `https://wa.me/${CONFIG.whatsapp}`;
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== FORMULÁRIO -> WHATSAPP =====
const form = document.getElementById("formAgendamento");
const erro = document.getElementById("erro");

form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  const nome = document.getElementById("nome").value.trim();
  const servico = selectServico.value;
  const data = campoData.value;
  const hora = selectHora.value;

  if (nome === "" || data === "") {
    erro.textContent = "Preencha seu nome e escolha o dia.";
    return;
  }
  if (data < dataDeHoje()) {
    erro.textContent = "Escolha uma data a partir de hoje.";
    return;
  }
  erro.textContent = "";

  const mensagem =
    `Olá! Gostaria de agendar um horário na ${CONFIG.nome}.\n\n` +
    `Nome: ${nome}\n` +
    `Serviço: ${servico}\n` +
    `Dia: ${formatarData(data)}\n` +
    `Horário: ${hora}`;

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});

// ===== MENU DO CELULAR =====
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});

// fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", false);
  });
});
