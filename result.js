const score = parseInt(localStorage.getItem("score")) || 0;
const total = parseInt(localStorage.getItem("total")) || 0;

const scoreText = document.getElementById("scoreText");
const percentage = document.getElementById("percentage");
const performance = document.getElementById("performance");
const restartBtn = document.getElementById("restartBtn");

scoreText.innerHTML = "Score : " + score + " / " + total;

let percent = 0;

if(total>0){

percent = (score/total)*100;

}

percentage.innerHTML = "Percentage : " + percent.toFixed(0) + "%";

if(percent>=80){

performance.innerHTML="🏆 Excellent";

}

else if(percent>=60){

performance.innerHTML="👏 Good Job";

}

else if(percent>=40){

performance.innerHTML="🙂 Average";

}

else{

performance.innerHTML="📚 Keep Practicing";

}

restartBtn.onclick=function(){

window.location.href="index.html";

}