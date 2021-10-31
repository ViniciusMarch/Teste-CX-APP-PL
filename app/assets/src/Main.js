import Core from "./Core.js?3134";

const client = ZAFClient.init();

const Main = async (requester_id) => {
  // Getting the list
  const tickets = await client.request(`/api/v2/search.json?query=type:ticket requester_id:${requester_id}`);
  Core.listRequesterTickets(tickets)

  const App = document.getElementById("app");

  const appBody = `<div id="main-content">${Core.form}</div>`;

  App.innerHTML = appBody;

  document.getElementById("form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const address = await Core.fetchAddress();

    if(address) {      
      const formattedAddress = Core.formatAddress(address);
      
      client.trigger('publish', formattedAddress);
    }
  });
};


export default Main;
