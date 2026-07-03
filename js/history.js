const tableBody = document.getElementById("historyTable");

async function loadHistory() {

    try {

        const response = await fetch("http://localhost:5000/api/analyze/history");

        const history = await response.json();

        tableBody.innerHTML = "";

        if(history.length === 0){

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5">No Analysis Found</td>
                </tr>
            `;

            return;
        }

        history.forEach(item=>{

            let badgeClass="";

            if(item.level==="HIGH")
                badgeClass="danger";

            else if(item.level==="MEDIUM")
                badgeClass="warning";

            else
                badgeClass="success";

            tableBody.innerHTML +=`

            <tr>

                <td>${new Date(item.createdAt).toLocaleString()}</td>

                <td>${item.sender || "Unknown"}</td>

                <td>

                    <span class="${badgeClass}">

                        ${item.level}

                    </span>

                </td>

                <td>${item.score}</td>

                <td>

                    <button onclick='viewAnalysis(${JSON.stringify(item)})'>

                        View

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

function viewAnalysis(item){

    alert(

`Sender : ${item.sender}

Subject : ${item.subject}

Risk : ${item.level}

Score : ${item.score}

Reasons :

${item.reasons.join("\n")}`

    );

}

loadHistory();