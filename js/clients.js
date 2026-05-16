import { clients, saveClients } from "./data.js";

import { generateID, validateEmail, fetchClients } from "./utils.js";

const clientsList = document.getElementById("clientsList");

const clientForm = document.getElementById("clientForm");

let editClientId = null;

/* -------------------- FETCH INITIAL CLIENTS -------------------- */

async function initializeClients() {
  // Fetch only if localStorage is empty
  if (clients.length === 0) {
    const apiClients = await fetchClients();

    clients.push(...apiClients);

    saveClients();
  }

  renderClients();
}

initializeClients();

/* ------------------- ADD CLIENT ---------------------- */

clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const company = document.getElementById("company").value;

  const phone = document.getElementById("phone").value;

  const notes = document.getElementById("notes").value;

  if (!name || !email) {
    alert("Please fill required fields");

    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email");

    return;
  }

  // ---------------- UPDATE CLIENT ----------------

  if (editClientId !== null) {
    const client = clients.find((client) => client.id === editClientId);

    client.name = name;
    client.email = email;
    client.company = company;
    client.phone = phone;
    client.notes = notes;

    editClientId = null;

    clientForm.querySelector("button").textContent = "Add Client";
  } else {
    // ---------------- ADD CLIENT ---------------

    const newClient = {
      id: generateID(),

      name,

      email,

      company,

      notes,

      phone,
    };

    clients.push(newClient);
  }

  saveClients();

  renderClients();

  clientForm.reset();
});

/* -------------------- RENDER CLIENTS -------------------- */

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

         <button onclick="editClient(${client.id})">
            Update
          </button>

          <button onclick="deleteClient(${client.id})">
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

window.editClient = function (id) {
  const client = clients.find((client) => client.id === id);

  editClientId = id;

  document.getElementById("name").value = client.name;

  document.getElementById("email").value = client.email;

  document.getElementById("company").value = client.company;

  document.getElementById("phone").value = client.phone;

  document.getElementById("notes").value = client.notes;

  clientForm.querySelector("button").textContent = "Update Client";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* ---------------- DELETE CLIENT ----------------- */

window.deleteClient = function (id) {
  const updatedClients = clients.filter((client) => client.id !== id);

  clients.length = 0;

  clients.push(...updatedClients);

  saveClients();

  renderClients();
};
