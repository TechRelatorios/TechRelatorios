const LINK_PAGAMENTO = "https://mpago.la/SEU_LINK_AQUI";

document.addEventListener("DOMContentLoaded", () => {
  verificarPagamento();
});

function irParaPagamento() {
  window.location.href = LINK_PAGAMENTO;
}

function verificarPagamento() {
  const params = new URLSearchParams(window.location.search);
  const pagou = params.get("pago");

  const btnGerarPDF = document.getElementById("btnGerarPDF");
  const avisoPagamento = document.getElementById("avisoPagamento");

  if (pagou === "true") {
    btnGerarPDF.style.display = "block";
    avisoPagamento.style.display = "block";
  } else {
    btnGerarPDF.style.display = "none";
    avisoPagamento.style.display = "none";
  }
}

function lerImagem(input) {
  return new Promise((resolve) => {
    if (!input.files || !input.files[0]) {
      resolve("");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  });
}

async function gerarRelatorio() {
  const empresa = document.getElementById("empresa").value;
  const cliente = document.getElementById("cliente").value;
  const local = document.getElementById("local").value;
  const tecnico = document.getElementById("tecnico").value;
  const data = document.getElementById("data").value;
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;

  const obsAntes = document.getElementById("obsAntes").value;
  const obsDurante = document.getElementById("obsDurante").value;
  const obsDepois = document.getElementById("obsDepois").value;

  const fotoAntes = await lerImagem(document.getElementById("fotoAntes"));
  const fotoDurante = await lerImagem(document.getElementById("fotoDurante"));
  const fotoDepois = await lerImagem(document.getElementById("fotoDepois"));

  const conteudo = `
    <div class="info"><strong>Empresa:</strong> ${empresa}</div>
    <div class="info"><strong>Cliente/Unidade:</strong> ${cliente}</div>
    <div class="info"><strong>Local:</strong> ${local}</div>
    <div class="info"><strong>Técnico responsável:</strong> ${tecnico}</div>
    <div class="info"><strong>Data:</strong> ${data}</div>
    <div class="info"><strong>Tipo de serviço:</strong> ${tipo}</div>
    <div class="info"><strong>Descrição:</strong><br>${descricao}</div>

    <hr><br>

    <h3>Foto Antes</h3>
    <p>${obsAntes || "Sem observação."}</p>
    ${fotoAntes ? `<img class="foto-preview" src="${fotoAntes}">` : "<p>Sem foto anexada.</p>"}

    <br><br>

    <h3>Foto Durante</h3>
    <p>${obsDurante || "Sem observação."}</p>
    ${fotoDurante ? `<img class="foto-preview" src="${fotoDurante}">` : "<p>Sem foto anexada.</p>"}

    <br><br>

    <h3>Foto Depois</h3>
    <p>${obsDepois || "Sem observação."}</p>
    ${fotoDepois ? `<img class="foto-preview" src="${fotoDepois}">` : "<p>Sem foto anexada.</p>"}
  `;

  document.getElementById("conteudoRelatorio").innerHTML = conteudo;
  document.getElementById("relatorio").style.display = "block";

  alert("Relatório gerado com sucesso!");
}

function salvarPDF() {
  window.print();
}