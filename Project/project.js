//Imports the SPI url constant from the config module
import { API_URL } from "./projectconfig";

//Instantiates varibale for storing questions, current question index, the score, and sets maximum high scores to ten
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const maxhighScores = 10;
let gameStarted = false;

//Gets references to HTML elements including buttons
const questionElement = document.getElementById("question");
const optionsElement = document.getElementsById("options");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score-value");
const nextButton = document.getElementById("next");
const showScoresButton = document.getElementById("show-scores");

//Adds event listeners to each button includes functionality to start the game when next question button is pressed on page load
nextButton.addEventlistern("click", () => {
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
    nextQuestion();
});

showScoresButton.addEventListener("click", displayHighScores);

//Initializes an array to store high scores
let highScores = [];

//Starts game, fetches questions and initiates the first question
function startGame() {
    fetch(API_URL)
    .then((response) => response.json())
    .then ((data) => {
        questions = data.results;
        displayQuestion();
    });
}

//Displays the current question and answer options
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.testContent = question.question;
        optionsElement.innerHTML = "";

        question.incorrect_answers.foreach((option) => {
            optionsElement.innerHTML += `<button class = "btn option>${option}</button`;
        });
        optionsElement.innerHTML += `<button class = "btn option"${question.correct_answer}</button>$`;
        const optionButtons = document.querySelectorAll(".option");
        optionButtons.forEach((button) => {
            button.addEventListener("click", checkAnswer);
        });
    }
    else {
        endGame();
    }
}

//Checks if the selected answer is correct and updates score accordingly
function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedOption ===correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
        scoreElement.textContent = score;
    }
    else {
        resultElement = `Incorrect! The right answer was ${correctAnswer}`;
    }

    nextButton.style.display = "block";
    currentQuestionIndex++;
}

//Moves to the next question
function nextQuestion() {
    resultElement.textContent = "";
    nextButton.style.display = "none";
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
    if (currentscoreIndex !== -1) {
        //Replaces the lowest high score with the current score if appropriate
        highScores.splice(currentScoreIndex, 1, score);
    }

    //Sorts the array of high scores in ascending order
    highScores.sort((a, b) => b - a);
    //Maintains a limit of 10 high scores stored on the array
    highScores = highScores.slice(0, maxhighScores);

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