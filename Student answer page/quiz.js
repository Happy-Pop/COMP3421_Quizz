function fetchQuizData(quizNumber) {
    return fetch(`https://your-backend.com/api/quizzes/${quizNumber}`)
        .then(response => {
            if (!response.ok) throw new Error('Quiz not found');
            return response.json();
        });
}


function displayQuiz(quiz) {
    document.getElementById('quizTitle').textContent = quiz.title;
    const questionsContainer = document.getElementById('questionsContainer');

    quiz.questions.forEach((question, index) => {
        const questionElem = document.createElement('div');
        questionElem.classList.add('question');
        questionElem.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

        if (question.type === 'mcq') {
            const optionsHTML = question.options.map((option, idx) =>
                `<label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label>`
            ).join('');
            questionElem.innerHTML += `<div class="options">${optionsHTML}</div>`;
        } else if (question.type === 'fillInTheBlanks') {
            const inputField = `<input type="text" name="question${index}" placeholder="Your answer">`;
            questionElem.innerHTML += inputField;
        } else if (question.type === 'shortAnswer') {
            const textarea = `<textarea name="question${index}"></textarea>`;
            questionElem.innerHTML += textarea;
        }

        questionsContainer.appendChild(questionElem);
    });
}

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const answers = collectAnswers();
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');

    fetch(`https://your-backend.com/api/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizNumber, answers })
    })
    .then(response => response.json())
    .then(data => alert('Answers submitted successfully!'))
    .catch(error => console.error('Error:', error));
});



function collectAnswers(quizTitle, quizNumber, studentId, score) {
    const answers = [];
    answers.push({
        quizTitle: quizTitle,
        quizNumber: quizNumber,
        studentId: studentId,
        Score: score
    });

    let questionIndex = 1;

    document.querySelectorAll('.question').forEach((questionDiv, index) => {
        let answerData = {
            questionIndex: questionIndex,
            type: document.getElementById('questionType').value,
            question: document.getElementById(`questionText${index}`).value, 
            score: document.getElementById(`question${index}Score`).value,
            options: [], 
            answer: ""
        };

        if (answerData.type === 'mcq') {
            const optionCount = document.getElementById('optionCount').value;
            for (let i = 1; i <= optionCount; i++) {
                let optionID = `question${index}option${i}`;
                let optionValue = document.getElementById(optionID).value;
                if (optionValue) {
                    answerData.options.push(optionValue);
                }
            }
            let correctOptionID = `question${index}correct`;
            answerData.answer = document.querySelector(`input[name="${correctOptionID}"]:checked`) ? 
                                  document.querySelector(`input[name="${correctOptionID}"]:checked`).value : "";
        } 

        const input = questionDiv.querySelector('input[type="radio"]:checked, input[type="text"], textarea');
        if (input) {
            answerData.studentanswer = input.value;
        } else {
            answerData.studentanswer = ''; 
        }

        answers.push(answerData);
        questionIndex++;
    });

    return answers;
}
