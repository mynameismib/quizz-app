const form = document.getElementById("quiz-form");
const answers = Array.from(document.querySelectorAll(".answer"));
const questionItems = document.querySelectorAll(".question-item");
const alert = document.querySelector("#alert");
const timer = document.querySelector("#btnn");

const timerDisplay = document.getElementById("timer-display");
let timerSeconds = 0;
let timerInterval;

function updateTimerDisplay () {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer (){
    clearInterval(timerInterval)
}

startTimer();


form.addEventListener("submit", e=> {
    e.preventDefault();

    form.querySelector("#btnn").disabled = true
    if(timer.disabled){
        stopTimer()
        timer.style.backgroundColor = "#cacbd0";
        //timer.style.cursor = "none";
    }

    questionItems.forEach((questionItem) => {
        questionItem.classList.add("incorrect")
        questionItem.classList.remove("correct")
    });
    const checkedAnswers = answers.filter((answer) => answer.checked)
    checkedAnswers.forEach((answer) => {
        const isCorrect = answer.value === "true";
        const questionItem = answer.closest (".question-item");
        if (isCorrect) {
            questionItem.classList.add("correct")
            questionItem.classList.remove("incorrect")
        } else {
            questionItem.classList.add("incorrect")
            questionItem.classList.remove("correct")
        }
        const allTrue = checkedAnswers.every((answer) => answer.value === "true");
        const allAnswered = checkedAnswers.lenght === questionItem.lenght;

        if (allTrue && allAnswered){
            alert.classList.add("active");
            stopTimer ();
            alert.innerText = `Congratulations!!! Your time is: ${timerDisplay.textContent}. Try again to beat your score!`
            setTimeout(() => {
                alert.classList.remove("active")
            }, 5000);
        }
    });
});


document.querySelector("#resetButton").addEventListener("click", () => {
    location.reload();
})