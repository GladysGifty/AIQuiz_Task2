// ==========================
// LOAD SUBJECTS
// ==========================

const subjectDropdown = document.getElementById("subject");

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

if(subjectDropdown){

    subjectDropdown.innerHTML = "";

    if(subjects.length==0){

        let option=document.createElement("option");

        option.textContent="No Subjects Available";

        subjectDropdown.appendChild(option);

    }

    else{

        subjects.forEach(function(subject){

            let option=document.createElement("option");

            option.value=subject;

            option.textContent=subject;

            subjectDropdown.appendChild(option);

        });

    }

}

// ==========================
// START QUIZ
// ==========================

const startBtn=document.getElementById("startBtn");

if(startBtn){

startBtn.onclick=function(){

const selectedSubject=document.getElementById("subject").value;

const difficulty=document.getElementById("difficulty").value;

const count=document.getElementById("count").value;

localStorage.setItem("selectedSubject",selectedSubject);

localStorage.setItem("selectedDifficulty",difficulty);

localStorage.setItem("questionCount",count);

window.location.href="quiz.html";

}

}