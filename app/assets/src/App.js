import Main from "./Main.js?1322";

// Start client and resize app
const client = ZAFClient.init();

client.on("app.registered", async (e) => {
  client.invoke("resize", { width: "100%", height: "300px" });  
});

const data = await client.get(['ticket.id', 'ticket.requester.id']);
const ticket_id = data['ticket.id'];
const ticket_requester_id = data['ticket.requester.id']

client.on('publish', (address) => {  
  client.request({ url: `/api/v2/tickets/${ticket_id}.json`, type:"PUT",
    data: {
      ticket: {
        comment: {
          body: address,
        },
      }
    }
  });
});

// Create screen context
Main(ticket_requester_id);
