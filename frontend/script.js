async function analyzeLogs() {
    const logs = document.getElementById("logs").value;

    if (!logs.trim()) {
        alert("Please enter logs!");
        return;
    }

    const response = await fetch("http://localhost:5000/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ logs })
    });

    const data = await response.json();

    const statusClass = data.status === "Stable"
        ? "status-good"
        : "status-bad";

    document.getElementById("result").innerHTML = `
        <div class="card">
            <h3>Total Logs</h3>
            <p>${data.totalLogs}</p>
        </div>
        <div class="card">
            <h3>Errors</h3>
            <p>${data.errors}</p>
        </div>
        <div class="card">
            <h3>Warnings</h3>
            <p>${data.warnings}</p>
        </div>
        <div class="card">
            <h3>Status</h3>
            <p class="${statusClass}">${data.status}</p>
        </div>
    `;
}