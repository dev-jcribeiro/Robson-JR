document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fleetForm");
    const tableBody = document.querySelector("#fleetTable tbody");
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    const printAllButton = document.getElementById("printAllButton");
    const printSelectedButton = document.getElementById("printSelectedButton");
    const whatsappButton = document.getElementById("whatsappButton");
    const emailButton = document.getElementById("emailButton");

    // Função para adicionar dados à tabela
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const frota = document.getElementById("frota").value;
        const oficina = document.getElementById("oficina").value;
        const servico = document.getElementById("servico").value;
        const dataEntrada = document.getElementById("dataEntrada").value;
        const dataSaida = document.getElementById("dataSaida").value;
        const valor = document.getElementById("valor").value;
        const observacao = document.getElementById("observacao").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${frota}</td>
            <td>${oficina}</td>
            <td>${servico}</td>
            <td>${dataEntrada}</td>
            <td>${dataSaida}</td>
            <td>R$ ${parseFloat(valor).toFixed(2)}</td>
            <td>${observacao}</td>
        `;
        tableBody.appendChild(newRow);

        form.reset();
    });

    // Função para selecionar/desselecionar todas as linhas
    selectAllCheckbox.addEventListener("change", () => {
        const checkboxes = document.querySelectorAll(".row-checkbox");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;
            checkbox.closest("tr").classList.toggle("selected", checkbox.checked);
        });
    });

    // Função para destacar linhas selecionadas
    tableBody.addEventListener("change", (e) => {
        if (e.target.classList.contains("row-checkbox")) {
            const row = e.target.closest("tr");
            row.classList.toggle("selected", e.target.checked);
        }
    });

    // Função para imprimir tudo
    printAllButton.addEventListener("click", () => {
        window.print();
    });

    // Função para imprimir selecionados
    printSelectedButton.addEventListener("click", () => {
        const selectedRows = Array.from(document.querySelectorAll(".row-checkbox:checked"))
            .map((checkbox) => checkbox.closest("tr").outerHTML)
            .join("");

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Planilha Selecionada</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                <th>Frota</th>
                                <th>Oficina</th>
                                <th>Serviço</th>
                                <th>Data de Entrada</th>
                                <th>Data de Saída</th>
                                <th>Valor (R$)</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedRows}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });

    // Função para enviar por WhatsApp
    whatsappButton.addEventListener("click", () => {
        const selectedRows = Array.from(document.querySelectorAll(".row-checkbox:checked"))
            .map((checkbox) => {
                const cells = checkbox.closest("tr").querySelectorAll("td");
                return `Frota: ${cells[1].innerText}, Oficina: ${cells[2].innerText}, Serviço: ${cells[3].innerText}`;
            })
            .join("%0A");

        const message = encodeURIComponent(`Planilha de Frota:%0A${selectedRows}`);
        window.open(`https://wa.me/?text=${message}`);
    });

    // Função para enviar por e-mail
    emailButton.addEventListener("click", () => {
        const selectedRows = Array.from(document.querySelectorAll(".row-checkbox:checked"))
            .map((checkbox) => {
                const cells = checkbox.closest("tr").querySelectorAll("td");
                return `Frota: ${cells[1].innerText}, Oficina: ${cells[2].innerText}, Serviço: ${cells[3].innerText}`;
            })
            .join("\n");

        const subject = encodeURIComponent("Planilha de Frota");
        const body = encodeURIComponent(selectedRows);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
});