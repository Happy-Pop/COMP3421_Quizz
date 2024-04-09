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

        questionElem.innerHTML = `<h3>Q${index + 1}: ${question.question} (${question.score} points)</h3>`;

        if (question.type === 'mcq') {
            
            const optionsHTML = question.options.map((option, idx) =>
                `<label class="${idx == question.answer ? 'correct-answer' : ''}">
                    <input type="radio" name="question${index}" value="${option}" disabled>
                    ${option}
                </label>`
            ).join('');
            questionElem.innerHTML += `<div class="options">${optionsHTML}</div>`;
            
            questionElem.innerHTML += `<p>Correct answer: ${question.options[question.answer]}</p>`;
        } else if (question.type === 'fillInTheBlanks') {
            
            const questionWithBlanks = question.question.replace('___', `<strong>${question.answer}</strong>`);
            questionElem.innerHTML += `<p>${questionWithBlanks}</p>`;
        } else if (question.type === 'shortAnswer') {
            questionElem.innerHTML += `<p>Answer: <strong>${question.answer}</strong></p>`;
        }

        questionsContainer.appendChild(questionElem);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');
    document.getElementById('quizNumberDisplay').textContent = quizNumber;
    fetch(`/api/submissions/${quizNumber}`)
        .then(response => response.json())
        .then(data => {
            const submissionsList = document.getElementById('submissionsList');
            data.submissions.forEach(submission => {
                const div = document.createElement('div');
                div.innerHTML = `Student ID: ${submission.studentId} <button onclick="viewSubmission('${submission.studentId}')">View</button>`;
                submissionsList.appendChild(div);
            });
        });
});

function viewSubmission(studentId) {
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');
    window.location.href = `grade.html?quizNumber=${quizNumber}&studentId=${studentId}`;
}
