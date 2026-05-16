import { clients, invoices, saveInvoices } from "./data.js";

import { generateID } from "./utils.js";

const invoiceForm = document.getElementById("invoiceForm");
const invoiceList = document.getElementById("invoiceList");
const clientSelect = document.getElementById("clientSelect");

function loadClients() {
  clientSelect.innerHTML = `
    <option value="">Select Client</option>
  `;

  clients.forEach((client) => {
    clientSelect.innerHTML += `
      <option value="${client.id}">
        ${client.name}
      </option>
    `;
  });
}

loadClients();
renderInvoices();

invoiceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newInvoice = {
    id: generateID(),
    clientId: Number(clientSelect.value),
    service: document.getElementById("service").value,
    description: document.getElementById("description").value,
    amount: Number(document.getElementById("amount").value),
    date: document.getElementById("date").value,
    paid: false,
  };

  invoices.push(newInvoice);

  saveInvoices();

  renderInvoices();

  invoiceForm.reset();
});

window.togglePaid = function (id) {
  const invoice = invoices.find((invoice) => invoice.id === id);

  invoice.paid = !invoice.paid;

  saveInvoices();
  renderInvoices();
};

function renderInvoices() {
  invoiceList.innerHTML = "";
  invoices.forEach((invoice) => {
    const client = clients.find((c) => c.id === invoice.clientId);
    invoiceList.innerHTML += `
        <div class="invoice-card">
            <h3>${client ? client.name : "Unknown Client"}</h3>
            <p>${invoice.service}</p>   
            <p>${invoice.description}</p>
            <p>$${invoice.amount}</p>
            <p>${invoice.date}</p>

          <div class="invoice-actions">

          <button onclick="togglePaid(${invoice.id})">
           ${invoice.paid ? "Mark Unpaid" : "Mark Paid"}
          </button>

          <button onclick="deleteInvoice(${invoice.id})">
            Delete
          </button>

          </div>
      </div>
        `;
  });
}
