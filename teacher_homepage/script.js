var questionCount = 0;
var questions = [];
var questionList = [];
var MCQ_opt_count = {};
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
            questionContent = createMultipleChoiceQuestion(optionCount, questionCount);
            questionList.push("MCQ");
            break;
        case 'fillInTheBlanks':
            questionContent = createFillInTheBlankQuestion();
            questionList.push("fillInTheBlanks");
            break;
        case 'shortAnswer':
            questionContent = createShortAnswerQuestion();
            questionList.push("shortAnswer");
            break;
    }   
    questionDiv.innerHTML = questionContent;
    questionsContainer.appendChild(questionDiv);
}

function createMultipleChoiceQuestion(optionCount, questionCount) {
    
    let optionsHtml = '';
    let questionHTML = '';
    MCQ_opt_count[questionCount]=optionCount;
    for (let i = 1; i <= optionCount; i++) {
        optionsHtml += `
            <div class="option-container">
                <label for="question${questionCount}option${i}" class="option-label">Option ${i}:</label>
                <textarea type="text" id="MCQ_${questionCount}_option${i}" style="height: 100px; width:300" class="form-control"name="question${questionCount}option" class="option-input" required>
                </textarea>
                </div>`;
    }
    optionsHtml += `<div class="correct-answer-container">
                        <label for="question${questionCount}correct" class="correct-answer-label">Correct Answer:</label>
                        <textarea type="number" id="question${questionCount}correct" style="height: 100px; width:300" class="form-control"name="question${questionCount}correct" min="1" max="${optionCount}" required>
                        </textarea>
                        </div>`;

    questionHTML = `<div class="question-content">
                        <label>MCQ Question ${questionCount}:</label>
                        <textarea type="text" id="MCQ_${questionCount}_text" style="height: 100px; width:300" class="form-control" placeholder="Leave a comment here" name="question${questionCount}Text" class="question-text-input" required>
                        </textarea>
                        ${optionsHtml}
                        <div class="question-controls">
                            <button type="button" class="delete-button" onclick="deleteQuestion(this, ${questionCount})">Delete</button>
                        </div>
                    </div>`;

    return addScoreInput(questionHTML);
}


function createFillInTheBlankQuestion() {
    questionHTML = `<div class="question-content">
                        <label>Question ${questionCount} (use ___ for blanks):</label>
                        <textarea type="text" required id='fillInTheBlanks_${questionCount}_text' style="height: 100px; width:300" class="form-control" placeholder="Leave a comment here">
                        </textarea>
                        <div class="question-controls">                           
                            <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                        </div>
                    </div>`;
    return addScoreInput(questionHTML);
}

function createShortAnswerQuestion() {
    questionHTML = `<div class="question-content">
                        <label>Question ${questionCount}:</label>
                        <textarea id='shortAnswer_${questionCount}_text' style="height: 100px; width:300" class="form-control" placeholder="Leave a comment here"></textarea>
                        <div class="question-controls">                         
                            <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                        </div>
                    </div>`;
    return addScoreInput(questionHTML);
}

document.getElementById('addQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const quizNumber = Math.floor(100000 + Math.random() * 900000);
    const quizTitleInput = document.getElementById('addQuizTitle');
    const totalscore = document.getElementById('totalScore').innerHTML;
    const quizTitle = quizTitleInput.value.trim();

    if (!quizTitle) {
        alert('Please enter a title for the quiz.');
        return; 
    }

    for(var i=0;i<questionList.length;i++){
        let Question_type=questionList[i];
        var Q_number=i+1;
        
        let questionData = {
            "type": Question_type,
            "question": document.getElementById(Question_type+"_"+Q_number+"_text").value.trim(), 
            "score": document.getElementById(Q_number+"_questionScore").value.trim(),
            "options": [], 
            "answer": "" 
        };
              
        //alert('New quiz saved! (simulated), and the quiz number is: '+ Question_type);

        if (Question_type === 'MCQ') {
            //alert('New quiz saved! (simulated), and the quiz number is: '+ MCQ_opt_count[Q_number]);
            optionCount=MCQ_opt_count[Q_number];
            for (let i = 1; i <= optionCount; i++) {
                let optionID = "MCQ_"+questionCount+"_option"+i;
                let optionValue = document.getElementById(optionID).value.trim();
                if (optionValue) {
                    questionData.options.push(optionValue).trim();
                }
            }
            let correctOptionID = "question"+Q_number+"correct";
            questionData.answer = document.querySelector(`input[name="${correctOptionID}"]:checked`) ? 
                                  document.querySelector(`input[name="${correctOptionID}"]:checked`).value : "";
        }   
        questions.push(questionData);
    }

    


    var email = document.getElementById("author_of_quiz").innerHTML.trim();
    var created_time = new Date();
    var created_time2 = created_time.toISOString().replace(/:/g, '-').replace('.', '-');
    var where_to_save = "./Quiz_save_folder/" + email + "/" + created_time2 + ".json";
    const quizData = {
      author: email,
      title: quizTitle,
      created_time: created_time2,
      save_location: where_to_save,
      totalScore: totalscore,
      question: questions
    };
    
    fetch('./saveQuiz.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.cookie = `quizNumber=${quizNumber}; 
            path=/`;
            window.location.href = `#homepage`;
        } else {
            alert('Failed to create quiz.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });


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
            <input type="number" id="${questionCount}_questionScore" name="questionScore" class="question-score-input" required min="0" step="1" onchange="updateTotalScore()">
            <br>
            </div>
    `;
}