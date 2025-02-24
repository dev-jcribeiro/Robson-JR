// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fleetForm');
    const tableBody = document.querySelector('#fleetTable tbody');
    const printButton = document.getElementById('printButton');

    // Função para adicionar dados à tabela
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const frota = document.getElementById('frota').value;
        const oficina = document.getElementById('oficina').value;
        const servico = document.getElementById('servico').value;
        const dataEntrada = document.getElementById('dataEntrada').value;
        const dataSaida = document.getElementById('dataSaida').value;
        const valor = document.getElementById('valor').value;
        const observacao = document.getElementById('observacao').value;

        // Criar uma nova linha na tabela
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${frota}</td>
            <td>${oficina}</td>
            <td>${servico}</td>
            <td>${dataEntrada}</td>
            <td>${dataSaida}</td>
            <td>R$ ${parseFloat(valor).toFixed(2)}</td>
            <td>${observacao}</td>
        `;

        tableBody.appendChild(newRow);

        // Limpar o formulário
        form.reset();
    });

    // Função para imprimir a planilha
    printButton.addEventListener('click', () => {
        window.print();
    });
});