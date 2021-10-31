const form = `
  <form id="form">
    <h2>Pesquise por um endereço a partir do CEP: </h2>
    <div>
      <input id="cep" type="text" placeholder="Ex: 24220100" />
      <button type="submit">Pesquisar</button>
    </div>
    <span id="error-msg"></span>
  </form>
  <hr>
  <div id="tickets-list"></div>
`;

// Calling the external API and saving in address var
const fetchAddress = async () => {
  const cep = document.getElementById("cep").value;

  if(cep.length !== 8 || cep.toLowerCase() !== cep.toUpperCase()) {
    document.getElementById("error-msg").innerHTML = 'Erro: insira 8 caracteres numéricos';
    return undefined;
  }

  const address = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
  
  if(address.erro) {
    document.getElementById("error-msg").innerHTML = 'Erro: CEP não encontrado';
    return undefined;
  }

  document.getElementById("error-msg").innerHTML = '';

  return address;
};

// Formatting the address
const formatAddress = (address) => {
  const formattedAddress = `
    Oi! Seguem os dados referentes ao CEP: ${address.cep}. \n
    Logradouro: ${address.logradouro} 
    Complemento: ${address.complemento} 
    Bairro: ${address.bairro} 
    Cidade: ${address.localidade} 
    Estado: ${address.uf}
  `
  return formattedAddress;
}

// Listing the requester tickets
const listRequesterTickets = async (tickets) => {
  const ticketsFormatted = await tickets.results.map(ticket => {
    const ticketPageLink = ticket.url.replace('api/v2', 'agent').split('.json')[0];
    return {
      title: ticket.raw_subject ? ticket.raw_subject : ticket.description, // Sometimes the title is null. So, it can be substitute by the description
      link: ticketPageLink
    }
  });

  let ticketsList = '<div><h2>Tickets do solicitante:</h2>';

  ticketsFormatted.forEach(ticket => {
    ticketsList += `<a href="${ticket.link}" target="_blank">${ticket.title}</a><br>`;
  })

  ticketsList += '</div>';

  document.getElementById('tickets-list').innerHTML = ticketsList;
}

const Core = {
  form,
  fetchAddress,
  formatAddress,
  listRequesterTickets,
};

export default Core;
