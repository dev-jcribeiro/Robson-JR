// Função para adicionar dados à tabela
document.getElementById('fleetForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const frota = document.getElementById('frota').value.trim();
    const oficina = document.getElementById('oficina').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const observacao = document.getElementById('observacao').value.trim();

    // Validação básica
    if (!frota || !oficina || !servico || !dataEntrada || !dataSaida || isNaN(valor)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Cria uma nova linha na tabela
    const tableBody = document.querySelector('#fleetTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${frota}</td>
        <td>${oficina}</td>
        <td>${servico}</td>
        <td>${dataEntrada}</td>
        <td>${dataSaida}</td>
        <td>R$ ${valor}</td>
        <td>${observacao || '-'}</td>
    `;

    tableBody.appendChild(newRow);

    // Limpa o formulário após adicionar os dados
    document.getElementById('fleetForm').reset();
});

// Função para enviar por WhatsApp
document.getElementById('whatsappButton').addEventListener('click', function () {
    const frota = document.getElementById('frota').value.trim();
    const oficina = document.getElementById('oficina').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const observacao = document.getElementById('observacao').value.trim();

    if (!frota || !oficina || !servico || !dataEntrada || !dataSaida || isNaN(valor)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const mensagem = encodeURIComponent(
        `Frota: ${frota}\nOficina: ${oficina}\nServiço: ${servico}\nData de Entrada: ${dataEntrada}\nData de Saída: ${dataSaida}\nValor: R$ ${valor}\nObservação: ${observacao}`
    );

    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
});

// Função para enviar por e-mail
document.getElementById('emailButton').addEventListener('click', function () {
    const frota = document.getElementById('frota').value.trim();
    const oficina = document.getElementById('oficina').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const observacao = document.getElementById('observacao').value.trim();

    if (!frota || !oficina || !servico || !dataEntrada || !dataSaida || isNaN(valor)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const assunto = encodeURIComponent('Dados da Frota');
    const corpo = encodeURIComponent(
        `Frota: ${frota}\nOficina: ${oficina}\nServiço: ${servico}\nData de Entrada: ${dataEntrada}\nData de Saída: ${dataSaida}\nValor: R$ ${valor}\nObservação: ${observacao}`
    );

    window.location.href = `mailto:?subject=${assunto}&body=${corpo}`;
});

// Função para imprimir a planilha
document.getElementById('printButton').addEventListener('click', function () {
    window.print();
});