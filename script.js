// ======================================
// TEACHER LOGIN
// ======================================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "admin@quiz.com" &&
            password === "admin123") {

            window.location.href = "teacher-panel.html";

        } else {

            alert("Invalid Email or Password");

        }

    });

}

// ======================================
// SUBJECT MANAGEMENT
// ======================================

let subjects =
JSON.parse(localStorage.getItem("subjects")) || [];

const addSubjectBtn =
document.getElementById("addSubjectBtn");

const subjectList =
document.getElementById("subjectList");

const questionSubject =
document.getElementById("questionSubject");

function loadSubjects(){

    if(!subjectList) return;

    subjectList.innerHTML="";

    if(questionSubject){

        questionSubject.innerHTML="";

    }

    subjects.forEach(function(subject,index){

        const li=document.createElement("li");

        li.style.display="flex";
        li.style.justifyContent="space-between";
        li.style.alignItems="center";
        li.style.margin="10px 0";
        li.style.padding="10px";
        li.style.background="#1e293b";
        li.style.borderRadius="8px";

        const span=document.createElement("span");

        span.textContent="📚 "+subject;

        const deleteBtn=document.createElement("button");

        deleteBtn.textContent="🗑️";

        deleteBtn.onclick=function(){

            if(confirm("Delete Subject?")){

                subjects.splice(index,1);

                localStorage.setItem(
                    "subjects",
                    JSON.stringify(subjects)
                );

                loadSubjects();

            }

        };

        li.appendChild(span);

        li.appendChild(deleteBtn);

        subjectList.appendChild(li);

        if(questionSubject){

            const option=document.createElement("option");

            option.value=subject;

            option.textContent=subject;

            questionSubject.appendChild(option);

        }

    });

}

if(addSubjectBtn){

    loadSubjects();

    addSubjectBtn.onclick=function(){

        let subject=prompt("Enter Subject Name");

        if(subject && subject.trim()!=""){

            subjects.push(subject);

            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects)
            );

            loadSubjects();

            alert("Subject Added Successfully!");

        }

    };

}
// ======================================
// QUESTION MANAGEMENT
// ======================================

let questions =
JSON.parse(localStorage.getItem("questions")) || [];

const saveQuestionBtn =
document.getElementById("saveQuestionBtn");

const questionList =
document.getElementById("questionList");

function displayQuestions(){

    if(!questionList) return;

    questionList.innerHTML="";

    if(questions.length===0){

        questionList.innerHTML="<p>No questions added yet.</p>";

        return;

    }

    questions.forEach(function(q,index){

        const card=document.createElement("div");

        card.style.background="#1e293b";
        card.style.padding="15px";
        card.style.margin="15px 0";
        card.style.borderRadius="10px";

        card.innerHTML=`

        <h3>${q.question}</h3>

        <p><b>Subject:</b> ${q.subject}</p>

        <p><b>Difficulty:</b> ${q.difficulty}</p>

        <p>A. ${q.options[0]}</p>

        <p>B. ${q.options[1]}</p>

        <p>C. ${q.options[2]}</p>

        <p>D. ${q.options[3]}</p>

        <p><b>Correct Answer:</b> ${q.correct}</p>

        `;

        // ==========================
        // EDIT BUTTON
        // ==========================

        const editBtn=document.createElement("button");

        editBtn.textContent="✏️ Edit";

        editBtn.style.marginRight="10px";

        editBtn.onclick=function(){

            const newQuestion=
            prompt("Edit Question",q.question);

            if(newQuestion){

                q.question=newQuestion;

                localStorage.setItem(
                "questions",
                JSON.stringify(questions)
                );

                displayQuestions();

            }

        };

        // ==========================
        // DELETE BUTTON
        // ==========================

        const deleteBtn=document.createElement("button");

        deleteBtn.textContent="🗑️ Delete";

        deleteBtn.onclick=function(){

            if(confirm("Delete this question?")){

                questions.splice(index,1);

                localStorage.setItem(
                "questions",
                JSON.stringify(questions)
                );

                displayQuestions();

            }

        };

        card.appendChild(editBtn);

        card.appendChild(deleteBtn);

        questionList.appendChild(card);

    });

}

if(saveQuestionBtn){

saveQuestionBtn.onclick=function(){

const subject=
document.getElementById("questionSubject").value;

const difficulty=
document.getElementById("questionDifficulty").value;

const question=
document.getElementById("questionText").value;

const optionA=
document.getElementById("optionA").value;

const optionB=
document.getElementById("optionB").value;

const optionC=
document.getElementById("optionC").value;

const optionD=
document.getElementById("optionD").value;

const correct=
document.getElementById("correctAnswer").value;

if(question.trim()==""){

alert("Please Enter Question");

return;

}

questions.push({

subject,

difficulty,

question,

options:[
optionA,
optionB,
optionC,
optionD
],

correct

});

localStorage.setItem(
"questions",
JSON.stringify(questions)
);

alert("Question Saved Successfully!");

displayQuestions();

};

}

displayQuestions();
// ======================================
// SEARCH QUESTIONS
// ======================================

const searchBox = document.getElementById("searchBox");

if(searchBox){

    searchBox.addEventListener("keyup", function(){

        const keyword = searchBox.value.trim().toLowerCase();

        const cards = questionList.querySelectorAll("div");

        cards.forEach(function(card){

            if(card.innerText.toLowerCase().includes(keyword)){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    });

}

// ======================================
// EXPORT QUESTIONS
// ======================================

const exportBtn = document.getElementById("exportBtn");

if(exportBtn){

    exportBtn.onclick = function(){

        const data = JSON.stringify(questions, null, 2);

        const blob = new Blob([data], {type:"application/json"});

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "QuestionBank.json";

        a.click();

        URL.revokeObjectURL(url);

    };

}

// ======================================
// IMPORT QUESTIONS
// ======================================

const importFile = document.getElementById("importFile");

if(importFile){

    importFile.addEventListener("change", function(e){

        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(event){

            try{

                const importedQuestions = JSON.parse(event.target.result);

                if(!Array.isArray(importedQuestions)){

                    alert("Invalid Question Bank!");

                    return;

                }

                questions = importedQuestions;

                localStorage.setItem(
                    "questions",
                    JSON.stringify(questions)
                );

                displayQuestions();

                alert("Question Bank Imported Successfully!");

            }

            catch(error){

                alert("Invalid JSON File!");

            }

        };

        reader.readAsText(file);

    });

}