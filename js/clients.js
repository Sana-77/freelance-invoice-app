import { clients, saveClients } from "./data.js";
import { generateID, validateEmail, fetchClients } from "./utils.js";

const clientsList = document.getElementById("clientsList");
const clientForm = document.getElementById("clientForm");

clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { name, email, company, notes } = clientForm.elements;

  if (!name || !email) {
    alert("Please fill required fields");
    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email");
    return;
  }

  const newClient = {
    id: generateID(),
    name,
    email,
    company,
    notes,
  };

  clients.push(newClient);

  saveClients();

  renderClients();

  clientForm.reset();
});

function renderClients() {
  clientsList.innerHTML = "";

  clients.forEach((client) => {
    clientsList.innerHTML += `
      <div class="client-card">

        <h3>${client.name}</h3>

        <p>${client.email}</p>

        <p>${client.company}</p>

        <p>${client.notes}</p>

        <button onclick="deleteClient(${client.id})">
          Delete
        </button>

      </div>
    `;
  });
}

window.deleteClient = function (id) {
  const updatedClients = clients.filter((client) => client.id !== id);

  clients.length = 0;

  clients.push(...updatedClients);

  saveClients();

  renderClients();
};
