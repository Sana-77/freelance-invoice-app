import { clients, invoices } from "./data.js";

import { fetchQuote } from "./utils.js";

const totalClients = document.getElementById("totalClients");
const totalInvoices = document.getElementById("totalInvoices");
const totalRevenue = document.getElementById("totalRevenue");
const paidInvoices = document.getElementById("paidInvoices");
const unpaidInvoices = document.getElementById("unpaidInvoices");

const quote = document.getElementById("quote");
const author = document.getElementById("author");

function loadDashboard() {
  totalClients.textContent = clients.length;

  totalInvoices.textContent = invoices.length;

  const revenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  totalRevenue.textContent = `$${revenue}`;

  const paid = invoices.filter((invoice) => invoice.paid);

  const unpaid = invoices.filter((invoice) => !invoice.paid);

  paidInvoices.textContent = paid.length;

  unpaidInvoices.textContent = unpaid.length;
}

loadDashboard();

async function loadQuote() {
  const quoteData = await fetchQuote();

  if (quoteData) {
    quote.textContent = `"${quoteData.quote}"`;

    author.textContent = `— ${quoteData.author}`;
  }
}

loadQuote();
