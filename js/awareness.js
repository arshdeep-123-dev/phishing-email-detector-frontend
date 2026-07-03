const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popupTitle");

const popupText = document.getElementById("popupText");

const closeBtn = document.getElementById("close");

const info = [

{
title:"Never Click Unknown Links",
text:"Attackers often disguise malicious websites using shortened or fake URLs. Hover over links before clicking and verify the website address."
},

{
title:"Check Sender Email",
text:"Always inspect the sender's email carefully. Fake domains like support@paypa1.com are commonly used in phishing attacks."
},

{
title:"Verify Domains",
text:"Ensure the website domain exactly matches the official company website before entering login credentials."
},

{
title:"Enable Two-Factor Authentication",
text:"2FA provides an additional security layer. Even if your password is stolen, attackers cannot easily access your account."
},

{
title:"Use Spam Filters",
text:"Modern email providers detect and block many phishing emails automatically. Keep spam protection enabled."
},

{
title:"Report Phishing",
text:"Reporting phishing emails helps organizations improve their security and protects other users from similar attacks."
}

];

const buttons = document.querySelectorAll(".card button");

buttons.forEach((button,index)=>{

button.addEventListener("click",()=>{

popup.style.display="flex";

popupTitle.innerText=info[index].title;

popupText.innerText=info[index].text;

});

});

closeBtn.addEventListener("click",()=>{

popup.style.display="none";

});

window.addEventListener("click",(e)=>{

if(e.target===popup){

popup.style.display="none";

}

});