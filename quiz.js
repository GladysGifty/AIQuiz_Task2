// ================================
// LOAD QUIZ DATA
// ================================

const subject = localStorage.getItem("selectedSubject");
const difficulty = localStorage.getItem("selectedDifficulty");
const count = parseInt(localStorage.getItem("questionCount"));

const allQuestions = JSON.parse(localStorage.getItem("questions")) || [];

let quizQuestions = allQuestions.filter(function(q){

    return q.subject === subject &&
           q.difficulty === difficulty;

});

quizQuestions = quizQuestions.slice(0, count);

let currentQuestion = 0;
let score = 0;

let timeLeft = 30;
let timer;
// ================================
// HTML ELEMENTS
// ================================

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const timerText = document.getElementById("timer");
// ================================
// NO QUESTIONS
// ================================

if(quizQuestions.length==0){

alert("No Questions Available!");

window.location.href="index.html";

}

// ================================
// SHOW QUESTION
// ================================
function startTimer(){

    clearInterval(timer);

    timeLeft = 30;

    timerText.innerHTML = timeLeft + "s";

    timer = setInterval(function(){

        timeLeft--;

        timerText.innerHTML = timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(timer);

            nextBtn.click();

        }

    },1000);

}
function loadQuestion(){

const q=quizQuestions[currentQuestion];

question.innerHTML=q.question;

progress.innerHTML=
"Question "+(currentQuestion+1)+" / "+quizQuestions.length;

progressBar.style.width=
((currentQuestion+1)/quizQuestions.length)*100+"%";

options.innerHTML="";

const letters=["A","B","C","D"];

q.options.forEach(function(option,index){

const btn=document.createElement("button");

btn.className="answer-btn";

btn.innerHTML=
letters[index]+". "+option;

btn.onclick=function(){

Array.from(options.children).forEach(function(b){

b.disabled=true;

});

if(letters[index]==q.correct){

btn.style.background="green";

score++;

}

else{

btn.style.background="red";

}

};

options.appendChild(btn);

});

startTimer();

}

loadQuestion();

// ================================
// NEXT
// ================================

nextBtn.onclick=function(){

currentQuestion++;

if(currentQuestion<quizQuestions.length){

loadQuestion();

}

else{

localStorage.setItem("score",score);

localStorage.setItem("total",quizQuestions.length);

clearInterval(timer);

window.location.href="result.html";
}

};