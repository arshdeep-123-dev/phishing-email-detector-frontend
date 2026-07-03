const quiz = [

{
question:"Which is safer?",
answers:[
"Click random links",
"Verify sender"
],
correct:1
},

{
question:"What should you check before clicking a link?",
answers:[
"URL",
"Wallpaper"
],
correct:0
},

{
question:"Which password is strongest?",
answers:[
"123456",
"P@ssW0rd#98!"
],
correct:1
},

{
question:"Phishing emails usually create?",
answers:[
"Urgency",
"Happiness"
],
correct:0
},

{
question:"Two-factor authentication provides?",
answers:[
"Extra security",
"Less security"
],
correct:0
},

{
question:"Which email looks suspicious?",
answers:[
"support@amazon.com",
"amaz0n-help@gmail.com"
],
correct:1
},

{
question:"Should you share OTP?",
answers:[
"Never",
"Always"
],
correct:0
},

{
question:"HTTPS means?",
answers:[
"Secure connection",
"Virus"
],
correct:0
},

{
question:"What is malware?",
answers:[
"Harmful software",
"Music player"
],
correct:0
},

{
question:"Public Wi-Fi should be used?",
answers:[
"Carefully",
"For banking always"
],
correct:0
}

];

let currentQuestion=0;
let score=0;

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const nextBtn=document.getElementById("nextBtn");
const scoreText=document.getElementById("score");
const progress=document.getElementById("progressBar");

function loadQuestion(){

nextBtn.style.display="none";

question.innerHTML=quiz[currentQuestion].question;

answers.innerHTML="";

progress.style.width=((currentQuestion)/quiz.length)*100+"%";

quiz[currentQuestion].answers.forEach((ans,index)=>{

const btn=document.createElement("button");

btn.innerText=ans;

btn.onclick=()=>selectAnswer(index,btn);

answers.appendChild(btn);

});

}

function selectAnswer(index,button){

const buttons=document.querySelectorAll(".answers button");

buttons.forEach(btn=>btn.disabled=true);

if(index===quiz[currentQuestion].correct){

button.classList.add("correct");

score++;

scoreText.innerText=score;

}else{

button.classList.add("wrong");

buttons[quiz[currentQuestion].correct].classList.add("correct");

}

nextBtn.style.display="block";

}

nextBtn.onclick=()=>{

currentQuestion++;

if(currentQuestion<quiz.length){

loadQuestion();

}else{

showResult();

}

}

function showResult(){

    progress.style.width = "100%";

    document.querySelector(".container").style.display = "none";

    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("finalScore").textContent = score + "/" + quiz.length;

    if(score >= 8){
        document.getElementById("certificate").classList.remove("hidden");
    }
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    scoreText.textContent = "0";

    document.getElementById("finalScore").textContent = "0/10";

    document.querySelector(".container").style.display = "block";

    document.getElementById("resultScreen").classList.add("hidden");

    document.getElementById("certificate").classList.add("hidden");

    loadQuestion();
}

loadQuestion();

document.getElementById("restartBtn").addEventListener("click", restartQuiz);