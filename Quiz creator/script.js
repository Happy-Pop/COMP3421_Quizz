let questionCount = 0;

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
}

function createMultipleChoiceQuestion(optionCount) {
    let optionsHtml = '';
    for (let i = 1; i <= optionCount; i++) {
        optionsHtml += `
            <div>
                <label for="question${questionCount}option${i}" class="option-label">Option ${i}:</label>
                <input type="text" id="option${i}" name="option${i}" required>
            </div>
        `;
    }
    return `<div class="question-content">
                <label>Question ${questionCount}:</label><input type="text" required>${optionsHtml}
                <div class="question-controls">
                    
                    <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                </div>
            </div>`;
}

function createFillInTheBlankQuestion() {
    return `<div class="question-content">
                <label>Question ${questionCount} (use ___ for blanks):</label><input type="text" required>
                <div class="question-controls">
                    
                    <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                </div>
            </div>`;
}

function createShortAnswerQuestion() {
    return `<div class="question-content">
                <label>Question ${questionCount}:</label><input type="text" required>
                <div class="question-controls">
                    
                    <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                </div>
            </div>`;
}

document.getElementById('addQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('New quiz saved! (simulated)');

    const quizTitleInput = document.getElementById('quizTitle');
    const quizTitle = quizTitleInput.value.trim();

    if (quizTitle) {
        addNewQuiz(quizTitle);
        quizTitleInput.value = ''; 
        showForm(''); 
    } else {
        alert('Please enter a title for the quiz.');
    }
});

document.getElementById('editQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Quiz changes saved! (simulated)');
});

function deleteQuestion(deleteButton) {
    
    const questionDiv = deleteButton.parentNode.parentNode;
    questionDiv.remove(); 
}

