const analyzeBtn = document.getElementById("analyzeBtn");
const API_URL = "https://phishing-email-detector-51mg.onrender.com";

analyzeBtn.addEventListener("click", analyzeEmail);

async function analyzeEmail() {

    const emailText = document.getElementById("emailInput").value.trim();

    if (!emailText) {

        alert("Paste an email first.");

        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/api/analyze`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: emailText

            })

        });

        const data = await response.json();

        document.getElementById("result").style.display = "block";

        //-------------------------
        // Extract Sender
        //-------------------------

        const senderMatch = emailText.match(/From:\s*(.*)/i);

        document.getElementById("sender").innerText =
            senderMatch ? senderMatch[1] : "Unknown";

        //-------------------------
        // Extract Subject
        //-------------------------

        const subjectMatch = emailText.match(/Subject:\s*(.*)/i);

        document.getElementById("subject").innerText =
            subjectMatch ? subjectMatch[1] : "No Subject";

        //-------------------------
        // Risk Score
        //-------------------------

        document.getElementById("risk").innerHTML =
            `${data.score}% (${data.level})`;

        //-------------------------
        // Reasons
        //-------------------------

        const reasons = document.getElementById("reasons");

        reasons.innerHTML = "";

        data.reasons.forEach(reason => {

            reasons.innerHTML += `<li>${reason}</li>`;

        });

        //-------------------------
        // Highlight Suspicious Words
        //-------------------------

        let highlighted = emailText;

        const keywords = [

            "urgent",
            "click here",
            "verify account",
            "free",
            "gift card",
            "lottery",
            "bitcoin",
            "password",
            "win money"

        ];

        keywords.forEach(word => {

            const regex = new RegExp(word, "gi");

            highlighted = highlighted.replace(

                regex,

                `<mark>${word}</mark>`

            );

        });

        document.getElementById("highlightedEmail").innerHTML = highlighted;

        //-------------------------
        // Recommendations
        //-------------------------

        const recommendations =
            document.getElementById("recommendations");

        recommendations.innerHTML = "";

        if (data.level === "HIGH") {

            recommendations.innerHTML = `

            <li>Delete the email immediately.</li>

            <li>Never click any suspicious links.</li>

            <li>Report it as phishing.</li>

            <li>Never share OTPs or passwords.</li>

            `;

        }

        else if (data.level === "MEDIUM") {

            recommendations.innerHTML = `

            <li>Verify the sender.</li>

            <li>Avoid downloading attachments.</li>

            <li>Do not share sensitive information.</li>

            `;

        }

        else {

            recommendations.innerHTML = `

            <li>No major threats detected.</li>

            <li>Still verify unknown senders.</li>

            `;

        }

    }

    catch (err) {

        console.error(err);

        alert("Backend connection failed.");

    }

}