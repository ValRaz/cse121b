//Imports the API url constant from the config module
import { API_URL } from "./projectconfig.js";

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
const showScoresButton = document.getElementById("show-scores");

//Retrieves high scores from local storage
let savedHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Initializes an array to store high scores
let highScores = savedHighScores;

// Initialize the game on page load
window.addEventListener('load', () => {
    startGame();
});

//Adds event listeners to each button
nextButton.addEventListener("click", () => {
    nextQuestion();
});
showScoresButton.addEventListener("click", () => displayHighScores(savedHighScores));

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
function displayQuestion(savedHighScores) {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = he.decode(question.question);
        resultElement.textContent = "";
        //Clears previous options
        optionsElement.innerHTML = "";
        //Creates button for the correct answer
        const correctButton = document.createElement("button");
        correctButton.classList.add("btn", "option");
        correctButton.textContent = question.correct_answer;
        optionsElement.appendChild(correctButton);
        correctButton.addEventListener("click", checkAnswer);
        //Creates buttons for incorrect answers
        question.incorrect_answers.forEach((incorrectAnswer) => {
            const button = document.createElement("button");
            button.classList.add("btn", "option");
            button.textContent = he.decode(incorrectAnswer);
            optionsElement.appendChild(button);
            button.addEventListener("click", checkAnswer); 
        });
    }
    else {
        endGame();
    }
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

    //Checks if the current score is higher than any high score currently existing on the array
    const currentScoreIndex = highScores.findIndex((existingScore) => score > existingScore);
    if (currentScoreIndex !== -1) {
        //Replaces the lowest high score with the current score if appropriate
        highScores.splice(currentScoreIndex, 1, score);
    }

    //Sorts the array of high scores in ascending order
    highScores.sort((a, b) => b - a);
    //Maintains a limit of 10 high scores stored on the array
    highScores = highScores.slice(0, maxhighScores);

    //Saves the updated high scores array in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
}

//Displays High Scores from the stored array in an unordered list
function displayHighScores() {
    const highScoresList = document.createElement("ul");
    highScoresList.classList.add("high-scores");

    highScores.forEach ((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index +1}: ${score}`;
        highScoresList.appendChild(listItem);
    });

    const container = document.querySelector(".container");
    container.appendChild(highScoresList);
}