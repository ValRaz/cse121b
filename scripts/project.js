///Defines API URL
const API_URL = "https://opentdb.com/api.php?amount=15&category=9&difficulty=easy";

//Instantiates varibale for storing questions, current question index, the score, and sets maximum high scores to ten
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const maxhighScores = 10;
let gameStarted = false;

//Gets references to HTML elements including buttons
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score-value");
const nextButton = document.getElementById("next");

// Initialize the game on page load
window.addEventListener("load", () => {
    startGame();
});

//Adds event listeners to next button
nextButton.addEventListener("click", () => {
    nextQuestion();
});

//Starts game, fetches questions and initiates the first question
function startGame() {
    fetch(API_URL)
    .then((response) => response.json())
    .then ((data) => {
        questions = data.results;
        currentQuestionIndex = 0;
        displayQuestion();
    });
}

//Displays the current question and answer options
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = he.decode(question.question);
        resultElement.textContent = "";
        //Clears previous options
        optionsElement.innerHTML = "";

        //Combines correct and incorrect answers into a single array
        const answers = [question.correct_answer, ...question.incorrect_answers];
        //Shuffles the answers array
        shuffleArray(answers);

        //Creates button for each answer
        const buttons = answers.map((answer) => createButton(answer));
    }
    else {
        endGame();
    }
}

//Function for shuffling an array
function shuffleArray(array) {
    for (let i = array.length - 1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Function that allows for creation of a button for each answer
function createButton(answer) {
    const button = document.createElement("button");
    button.classList.add("btn", "option");
    button.textContent = he.decode(answer);
    button.addEventListener("click", checkAnswer);
    optionsElement.appendChild(button);
    return button;
}

// Compares the user's answer with the correct answer
function areAnswersEqual(userAnswer, correctAnswer) {
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
}

//Checks if the selected answer is correct and updates score accordingly
function checkAnswer(event) {
    const userAnswer = event.target.textContent;
    const correctAnswer = he.decode(questions[currentQuestionIndex].correct_answer);

    if (areAnswersEqual(userAnswer, correctAnswer)) {
        score++;
        resultElement.textContent = "Correct!";
        scoreElement.textContent = score;
    }
    else {
        resultElement.textContent = `Incorrect! The right answer was ${correctAnswer}`;
    }

    nextQuestion();
}

//Moves to the next question
function nextQuestion() {
    resultElement.textContent = "";
    currentQuestionIndex++;
    displayQuestion();
}

//Ends game and updates high scores if appropriate
function endGame() {
    questionElement.textContent = "Game Over";
    optionsElement.innerHTML = "";
    resultElement.textContent = `Your final score is: ${score}`;
    nextButton.style.display = "none";
}