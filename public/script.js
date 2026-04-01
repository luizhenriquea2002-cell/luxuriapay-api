async function loadDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch("/dashboard", {
    headers: { Authorization: token }
  });

  const data = await res.json();

  document.getElementById("saldo").innerText =
    "Saldo: R$ " + data.saldo;

  new Chart(document.getElementById("grafico"), {
    type: "line",
    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      datasets: [{
        label: "Receita",
        data: [12000, 19000, 3000, 5000, 20000]
      }]
    }
  });
}

loadDashboard();
