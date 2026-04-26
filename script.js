function addTransaction() {

    let id = document.getElementById("id").value;
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let amount = Number(document.getElementById("amount").value) || 0;
    let category = document.getElementById("category").value;
    let note = document.getElementById("note").value;

    if (!date) {
        alert("ادخل التاريخ");
        return;
    }

    let exists = data.find(item => item.date === date);
    if (exists) {
        alert("هذا اليوم مسجل مسبقاً");
        return;
    }

    let transaction = { id, date, type, amount, category, note };

    data.push(transaction);

    saveData();
    displayData();
}

function displayData() {

    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    let balance = 0;

    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    data.forEach((item, index) => {

        if (item.type === "income") {
            balance += item.amount;
        } else {
            balance -= item.amount;
        }

        table.innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.date}</td>
        <td>${item.type === "income" ? "وارد" : "صادر"}</td>
        <td>${item.amount}</td>
        <td>${balance}</td>
        <td>${item.category}</td>
        <td>${item.note}</td>
        </tr>
        `;
    });

    document.getElementById("balance").innerText = balance;
}
function monthlyReport() {

    let month = document.getElementById("month").value;

    let totalIncome = 0;
    let totalExpense = 0;

    data.forEach(item => {
        if (item.date.startsWith(month)) {

            if (item.type === "income") {
                totalIncome += item.amount;
            } else {
                totalExpense += item.amount;
            }
        }
    });

    let net = totalIncome - totalExpense;

    document.getElementById("report").innerText =
        "الإيرادات: " + totalIncome +
        " | المصروفات: " + totalExpense +
        " | الصافي: " + net;
}
