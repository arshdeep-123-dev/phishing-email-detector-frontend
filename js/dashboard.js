async function loadDashboard() {

    const response = await fetch("https://phishing-email-detector-51mg.onrender.com/api/analyze/history");

    const data = await response.json();

    const total = data.length;

    const high = data.filter(x => x.level === "HIGH").length;

    const medium = data.filter(x => x.level === "MEDIUM").length;

    const low = data.filter(x => x.level === "LOW").length;

    document.getElementById("totalEmails").innerText = total;

    document.getElementById("highRisk").innerText = high;

    document.getElementById("mediumRisk").innerText = medium;

    document.getElementById("lowRisk").innerText = low;

    const ctx = document.getElementById("riskChart");

    new Chart(ctx, {

        type: "pie",

        data: {

            labels: [

                "High",
                "Medium",
                "Low"

            ],

            datasets: [

                {

                    data: [

                        high,
                        medium,
                        low

                    ],

                    backgroundColor: [

                        "#ff3d57",
                        "#ff9800",
                        "#00c853"

                    ]

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

    const table = document.querySelector(".history-card table");

    table.innerHTML = `

        <tr>

            <th>Email</th>

            <th>Risk</th>

        </tr>

    `;

    data.slice(0, 5).forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item.sender || "Unknown"}</td>

            <td class="${item.level.toLowerCase()}">

                ${item.level}

            </td>

        </tr>

        `;

    });

}

loadDashboard();