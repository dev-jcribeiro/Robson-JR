document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("fleetForm");
  const tableBody = document.querySelector("#fleetTable tbody");
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const whatsappButton = document.getElementById("whatsappButton");
  const emailButton = document.getElementById("emailButton");
  const printSelectedButton = document.getElementById("printSelectedButton");

  // Função para formatar a data de 'yyyy-mm-dd' para 'dd/mm/yyyy'
  function formatDate(dateString) {
    if (!dateString) return "-";
    const dateParts = dateString.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }

  // Função para adicionar um novo registro à tabela
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const frota = document.getElementById("frota").value.trim();
    const oficina = document.getElementById("oficina").value.trim();
    const servico = document.getElementById("servico").value.trim();
    const dataSolicitacao = document.getElementById("dataSolicitacao").value;
    const status = document.getElementById("status").value;
    const observacao =
      document.getElementById("observacao").value.trim() || "-";

    if (!frota || !oficina || !servico || !dataSolicitacao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Formatar a data para 'dd/mm/yyyy'
    const formattedDate = formatDate(dataSolicitacao);

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="checkbox" class="rowCheckbox"></td>
            <td>${frota}</td>
            <td>${oficina}</td>
            <td>${servico}</td>
            <td>${formattedDate}</td> <!-- Data formatada -->
            <td>${status === "pendente" ? "Pendente" : "Pronto"}</td>
            <td>${observacao}</td>
        `;

    tableBody.appendChild(newRow);
    form.reset();
  });

  // Função para selecionar/desselecionar todas as linhas
  selectAllCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".rowCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // Função para obter as linhas selecionadas
  function getSelectedRows() {
    const checkboxes = document.querySelectorAll(".rowCheckbox:checked");
    return Array.from(checkboxes).map((checkbox) => checkbox.closest("tr"));
  }

  // Função para enviar dados via WhatsApp
  whatsappButton.addEventListener("click", () => {
    const selectedRows = getSelectedRows();
    if (selectedRows.length === 0) {
      alert("Selecione pelo menos uma linha para enviar por WhatsApp.");
      return;
    }

    const message = selectedRows
      .map((row) => {
        const cells = row.querySelectorAll("td");
        return `Frota: ${cells[1].innerText}, Oficina: ${cells[2].innerText}, Serviço: ${cells[3].innerText}, Data de Solicitação: ${cells[4].innerText}, Status: ${cells[5].innerText}, Observação: ${cells[6].innerText}`;
      })
      .join("\n\n");

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });

  // Função para enviar dados via E-mail
  emailButton.addEventListener("click", () => {
    const selectedRows = getSelectedRows();
    if (selectedRows.length === 0) {
      alert("Selecione pelo menos uma linha para enviar por E-mail.");
      return;
    }

    const body = selectedRows
      .map((row) => {
        const cells = row.querySelectorAll("td");
        return `Frota: ${cells[1].innerText}, Oficina: ${cells[2].innerText}, Serviço: ${cells[3].innerText}, Data de Solicitação: ${cells[4].innerText}, Status: ${cells[5].innerText}, Observação: ${cells[6].innerText}`;
      })
      .join("\n\n");

    const mailtoUrl = `mailto:?subject=Planilha de Frota&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = mailtoUrl;
  });

  // Função para imprimir registros selecionados
  printSelectedButton.addEventListener("click", () => {
    const selectedRows = getSelectedRows();
    if (selectedRows.length === 0) {
      alert("Selecione pelo menos uma linha para imprimir.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <html>
                <head>
                    <title>Impressão de Registros Selecionados</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #4a90e2; color: white; font-weight: bold; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                    </style>
                </head>
                <body>
                    <h1>Registros Selecionados</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Frota</th>
                                <th>Oficina</th>
                                <th>Serviço</th>
                                <th>Data de Solicitação</th>
                                <th>Status</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedRows
                              .map((row) => {
                                const cells = row.querySelectorAll("td");
                                return `
                                    <tr>
                                        <td>${cells[1].innerText}</td>
                                        <td>${cells[2].innerText}</td>
                                        <td>${cells[3].innerText}</td>
                                        <td>${cells[4].innerText}</td>
                                        <td>${cells[5].innerText}</td>
                                        <td>${cells[6].innerText}</td>
                                    </tr>
                                `;
                              })
                              .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
  });
});
