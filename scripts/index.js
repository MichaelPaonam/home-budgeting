document.addEventListener("DOMContentLoaded", loadExpenses);

async function loadExpenses() {
  try {
    const response = await fetch("http://192.168.0.12:3000/expenses");

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const expenses = await response.json();
    renderExpenses(expenses);
  } catch (err) {
    console.error("Failed to load expenses:", err);
    alert("Could not load expenses");
  }
}

function renderExpenses(expenses) {
  const tbody = document.querySelector("#expenses-table tbody");
  tbody.innerHTML = "";

  expenses.forEach(exp => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${exp.expense_date}</td>
      <td>${Number(exp.amount).toFixed(2)}</td>
      <td>${exp.note || ""}</td>
    `;

    tbody.appendChild(tr);
  });
}

