let questions = [];

function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
        
        if (question.type === 'singleChoice') {
            question.answers.forEach(answer => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="question${index}" value="${answer.isCorrect}"> ${answer.answer}<br>`;
                questionElement.appendChild(label);
            });
        } else if (question.type === 'multipleChoice') {
            question.answers.forEach(answer => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" name="question${index}" value="${answer.isCorrect}"> ${answer.answer}<br>`;
                questionElement.appendChild(label);
            });
        } else if (question.type === 'inputText') {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', `question${index}`);
            questionElement.appendChild(input);
        }
        
        quizContainer.appendChild(questionElement);
    });
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const submitButton = document.getElementById('submit');
    const resultText = document.getElementById('results');
    let score = 0;
    
    questions.forEach((question, index) => {
        const answerInputs = document.getElementsByName(`question${index}`);
        let allCorrect = true;
        
        if (question.type === 'singleChoice') {
            answerInputs.forEach(input => {
                if (input.checked && JSON.parse(input.value)) {
                    score++;
                } else if (input.checked && !JSON.parse(input.value)) {
                    allCorrect = false;
                }
            });
        } else if (question.type === 'multipleChoice') {
            answerInputs.forEach(input => {
                if (input.checked && JSON.parse(input.value)) {
                    score++;
                } else if (!input.checked && JSON.parse(input.value)) {
                    allCorrect = false;
                } else if (input.checked && !JSON.parse(input.value)) {
                    allCorrect = false;
                }
            });
        } else if (question.type === 'inputText') {
            const userAnswer = answerInputs[0].value.trim().toLowerCase();
            if (userAnswer === question.isCorrect) {
                score++;
            } else {
                allCorrect = false;
            }
        }
        
        const questionElement = document.querySelector(`.question:nth-child(${index + 1})`);
        if (allCorrect) {
            questionElement.style.color = 'green';
        } else {
            questionElement.style.color = 'red';
        }
    });
    
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultText.innerHTML = `Ви набрали ${score} з 6 балів.`;
}

fetch('test.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        buildQuiz();
    })
    .catch(error => console.error('Error fetching questions:', error));

document.getElementById('submit').addEventListener('click', showResults);
