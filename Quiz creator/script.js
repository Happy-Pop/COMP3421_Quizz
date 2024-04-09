let questionCount = 0;
let questions = [];

function toggleContent(contentType) {
    document.getElementById('choiceContainer').style.display = contentType ? 'none' : 'flex';
    document.getElementById('addQuizContainer').style.display = contentType === 'add' ? 'block' : 'none';
    document.getElementById('editQuizContainer').style.display = contentType === 'edit' ? 'block' : 'none';
}

function toggleOptionCount(questionType) {
    const optionCountField = document.getElementById('optionCount');
    const optionCountLabel = document.getElementById('optionCountLabel');
    
    if (questionType === 'mcq') {
        optionCountField.style.display = 'block';
        optionCountLabel.style.display = 'block';
    } else {
        optionCountField.style.display = 'none';
        optionCountLabel.style.display = 'none';
    }
}

function prepareQuestion() {
    var title = document.getElementById('addQuizTitle').value.trim();
    
    if (title === '') {
        alert('Please enter a title for the quiz.');
        return;
    }
    const questionType = document.getElementById('questionType').value;
    const optionCount = document.getElementById('optionCount').value;
    addQuestion(questionType, optionCount);
}


function addQuestion(questionType, optionCount) {
    questionCount++;

    const questionsContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    let questionContent = '';
    switch (questionType) {
        case 'mcq':
            questionContent = createMultipleChoiceQuestion(optionCount);
            break;
        case 'fillInTheBlanks':
            questionContent = createFillInTheBlankQuestion();
            break;
        case 'shortAnswer':
            questionContent = createShortAnswerQuestion();
            break;
    }
    
    questionDiv.innerHTML = questionContent;
    questionsContainer.appendChild(questionDiv);

    let questionData = {
        type: questionType,
        question: document.getElementById(`questionText${questionCount}`).value, 
        score: document.getElementById(`question${questionCount}Score`).value,
        options: [], 
        answer: "" 
    };

    if (questionType === 'mcq') {
        for (let i = 1; i <= optionCount; i++) {
            let optionID = `question${questionCount}option${i}`;
            let optionValue = document.getElementById(optionID).value;
            if (optionValue) {
                questionData.options.push(optionValue);
            }
        }
        let correctOptionID = `question${questionCount}correct`;
        questionData.answer = document.querySelector(`input[name="${correctOptionID}"]:checked`) ? 
                              document.querySelector(`input[name="${correctOptionID}"]:checked`).value : "";
    } 
    
    questions.push(questionData);
}

function createMultipleChoiceQuestion(optionCount, questionCount) {
    
    let optionsHtml = '';
    for (let i = 1; i <= optionCount; i++) {
        optionsHtml += `
            <div class="option-container">
                <label for="question${questionCount}option${i}" class="option-label">Option ${i}:</label>
                <input type="text" id="question${questionCount}option${i}" name="question${questionCount}option" class="option-input" required>
            </div>`;
    }
    optionsHtml += `<div class="correct-answer-container">
                        <label for="question${questionCount}correct" class="correct-answer-label">Correct Answer:</label>
                        <input type="number" id="question${questionCount}correct" name="question${questionCount}correct" min="1" max="${optionCount}" required>
                    </div>`;

    questionHTML = `<div class="question-content">
                        <label for="question${questionCount}Text">Question ${questionCount}:</label>
                        <input type="text" id="question${questionCount}Text" name="question${questionCount}Text" class="question-text-input" required>
                        ${optionsHtml}
                        <div class="question-controls">
                            <button type="button" class="delete-button" onclick="deleteQuestion(this, ${questionCount})">Delete</button>
                        </div>
                    </div>`;

    return addScoreInput(questionHTML);
}


function createFillInTheBlankQuestion() {
    questionHTML = `<div class="question-content">
                        <label>Question ${questionCount} (use ___ for blanks):</label><input type="text" required>
                        <div class="question-controls">
                            
                            <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                        </div>
                    </div>`;
    return addScoreInput(questionHTML);
}

function createShortAnswerQuestion() {
    questionHTML += `<div class="question-content">
                        <label>Question ${questionCount}:</label><input type="text" required>
                        <div class="question-controls">
                            
                            <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                        </div>
                    </div>`;

    return addScoreInput(questionHTML);
}

document.getElementById('addQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const quizNumber = Math.floor(100000 + Math.random() * 900000);
    alert('New quiz saved! (simulated), and the quiz number is: '+ quizNumber);

    const quizTitleInput = document.getElementById('quizTitle');
    const totalscore = document.getElementById('totalScore');
    const quizTitle = quizTitleInput.value.trim();

    if (!quizTitle) {
        alert('Please enter a title for the quiz.');
        return; 
    }

    const quizData = {
        title: quizTitle,
        totalScore: totalscore,
        question: questions
    };

    fetch('/saveQuiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.cookie = `quizNumber=${quizNumber}; path=/`;
            window.location.href = `quizSuccess.html`;
        } else {
            alert('Failed to create quiz.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

});




document.getElementById('editQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Quiz changes saved! (simulated)');
});

function deleteQuestion(deleteButton) {
    const questionDiv = deleteButton.closest('.question');
    if (questionDiv) {
        questionDiv.remove();
    }

    questionCount--;

    const remainingQuestions = document.querySelectorAll('.question');
    remainingQuestions.forEach((questionDiv, index) => {
        const newQuestionNumber = index + 1;
        questionDiv.querySelector('.question-label').textContent = `Question ${newQuestionNumber}:`;
        
        const inputs = questionDiv.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const name = input.name;
            if (name) {
            
                const newName = name.replace(/\d+/, newQuestionNumber);
                input.id = newName;
                input.name = newName;
                
                
                const label = questionDiv.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    label.setAttribute('for', newName);
                }
            }
        });
        
        const deleteButton = questionDiv.querySelector('.delete-button');
        deleteButton.setAttribute('onclick', `deleteQuestion(this)`);
    });
}


function updateTotalScore() {
    const scoreInputs = document.querySelectorAll('.question-score-input');
    let totalScore = 0;
    scoreInputs.forEach(input => {
        totalScore += parseInt(input.value) || 0;
    });
    document.getElementById('totalScore').textContent = totalScore;
}


questionsContainer.appendChild(questionDiv);
updateTotalScore();

function addScoreInput(questionContent) {
    return `
        ${questionContent}
        <div class="score-input-container">
            <label for="questionScore">Score:</label>
            <input type="number" id="questionScore" name="questionScore" class="question-score-input" required min="0" step="1" onchange="updateTotalScore()">
        </div>
    `;
}

