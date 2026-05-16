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
    const firstLetter = client.name.charAt(0);

    clientsList.innerHTML += `

      <div class="client-card">

        <div class="client-header">

          <div class="client-avatar">
            ${firstLetter}
          </div>

          <div class="client-info">

            <h3>${client.name}</h3>

            <p class="client-email">
              ${client.email}
            </p>

          </div>

        </div>

        <div class="client-details">

          <p>
            <strong>Company:</strong>
            ${client.company}
          </p>

          <p>
            <strong>Phone:</strong>
            ${client.phone}
          </p>

          <p>
            <strong>Notes:</strong>
            ${client.notes}
          </p>

        </div>

        <div class="client-actions">

          <button onclick="deleteClient(${client.id})">
            Delete
          </button>

        </div>

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
