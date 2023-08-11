const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Define your quiz questions and answers here
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: {
      a: "Paris",
      b: "Berlin",
      c: "Madrid"
    },
    correctAnswer: "a"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: {
      a: "Leonardo da Vinci",
      b: "Pablo Picasso",
      c: "Vincent van Gogh"
    },
    correctAnswer: "a"
  },
  {
    question:"How many time zones are there in Russia? (11)",
    answers:{
        a:"12",
        b:"11",
        c:"10"
    },
    correctAnswer:"b"
  },
  {
    question:"What is the national flower of Japan? (Cherry blossom)",
    answers:{
        a:"cherry blossom",
        b:"lily",
        c:"rose"
    },
    correctAnswer:"a"
  },
  {
    question:"How many stripes are there on the US flag? (13)",
    answers:{
        a:"11",
        b:"12",
        c:"13"
    },
    correctAnswer:"c"
  },
  // Add more questions here
];

// Set the duration for each question in seconds
const questionDuration = 10;
let currentQuestionIndex = 0;
let timer;

// Function to generate the quiz
function generateQuiz() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const output = [];
  const answers = [];

  for (const letter in currentQuestion.answers) {
    answers.push(
      `<label>
         <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
         ${letter}: ${currentQuestion.answers[letter]}
       </label>`
    );
  }

  output.push(
    `<div class="question">${currentQuestion.question}</div>
     <div class="answers">${answers.join('')}</div>`
  );

  quizContainer.innerHTML = output.join('');

  startTimer();
}

// Function to start the timer
function startTimer() {
  let timeRemaining = questionDuration;
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.textContent = `Time Remaining: ${timeRemaining}`;

  quizContainer.appendChild(timerElement);

  timer = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = `Time Remaining: ${timeRemaining}`;

    if (timeRemaining === 0) {
      clearInterval(timer);
      goToNextQuestion();
    }
  }, 1000);
}

// Function to go to the next question
function goToNextQuestion() {
  clearInterval(timer);

  const selectedOption = quizContainer.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (userAnswer === currentQuestion.correctAnswer) {
      incrementScore();
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    generateQuiz();
  } else {
    showResults();
  }
}

// Function to increment the score
let score = 0;
function incrementScore() {
  score++;
}

// Function to calculate the score and display results
function showResults() {
  quizContainer.innerHTML = '';
  resultsContainer.innerHTML = '';

  const totalQuestions = quizQuestions.length;
  const percentageScore = (score / totalQuestions) * 100;

  let resultImage = '';
  if (percentageScore >= 50) {
    resultImage = '<img src="winning.gif" alt="Winner" width="100" height="100">';
  } else {
    resultImage = '<img src="losing.jpg" alt="Loser" width="100" height="100">';
  }

  resultsContainer.innerHTML = `You scored ${score} out of ${totalQuestions}. ${resultImage}`;
}

// Generate the quiz when the page loads
generateQuiz();

// Event listener for the submit button to go to the next question
submitButton.addEventListener('click', goToNextQuestion);
