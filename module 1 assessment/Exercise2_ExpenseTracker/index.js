document.addEventListener("DOMContentLoaded", function () {
  const inputForm = document.getElementById("input-form");
  const expenseTableBody = document
    .getElementById("expense-table")
    .querySelector("tbody");
  const summary = document.getElementById("categorySummary");
  const chartCanvas = document.getElementById("expenseChart")

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const saveExpenses = () => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const displayExpenses = () => {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td><button class="btn btn-danger delete-button" data-index=${index}>Delete</button></td>
            `;
      expenseTableBody.appendChild(row);
    });

    displaySummary()
  };

  const displaySummary = () => {
    const categoryTotal = expenses.reduce((total, expense) => {
      total[expense.category] =
        total[expense.category] + expense.amount || expense.amount;
      return total;
    }, {});

    summary.innerHTML = Object.entries(categoryTotal)
      .map(
        ([category, amount]) => `<li>${category}: $${amount.toFixed(2)}</li>`
      )
      .join("");
  };



  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (!isNaN(amount) && description.trim()) {
      expenses.push({ amount, description, category });
      saveExpenses();
      displayExpenses();
      inputForm.reset();
    }
  });

  expenseTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const index = e.target.parentElement.parentElement.rowIndex - 1;
      expenses.splice(index, 1);
      saveExpenses();
      displayExpenses();
    }
  });

  displayExpenses();
});
