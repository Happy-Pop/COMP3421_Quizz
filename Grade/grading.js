document.addEventListener('DOMContentLoaded', function() {
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');
    fetchSubmissions(quizNumber).then(data => {
        submissions = data;
        displaySubmission(currentSubmissionIndex);
    });
});


let mcqtotal = 0;

function displayQuestion(index) {
    const quizTitleElement = document.getElementById('quizTitle');
    const studentInfoElement = document.getElementById('studentId');
    const totallyscoreElement = document.getElementById('totalScore');
    quizTitleElement.textContent = `Grading Quiz: ${answers[0].quizTitle}`;
    studentInfoElement.textContent = `Student ID: ${answers[0].studentId}`;
    totallyscoreElement.textContent = `Total Score: ${answers[0].totalScore}`;
    

    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    answers.forEach((answer, i) => {
        if(i != 0){
                const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        let contentHTML = `
            <h3>Question ${answer.questionIndex}: ${answer.question}</h3>
            <p>Question Score: ${answer.score}</p>
        `;

        if (answer.type === 'mcq') {
            let optionsHTML = answer.options.map((option, idx) => {
                let optionStyle = '';
                let additionalText = '';

                if (answer.options[idx] === answer.studentAnswer) {
                    additionalText = ' - Your Answer';
                    optionStyle = 'color: red;'; 
                }
                if (idx === answer.correctAnswer) {
                    additionalText = ' - Correct Answer';
                    optionStyle = 'color: green;';
                }
                return `<li style="${optionStyle}">${option}${additionalText}</li>`;
            }).join('');

            contentHTML += `<ul>${optionsHTML}</ul>`;
            scoreReceived = answer.studentAnswer === answer.answer ? answer.score : '0';
            contentHTML += `<p>Grade: ${scoreReceived}</p>`;
            updateTeacherScore(answer.questionIndex, scoreReceived)

            mcqtotal += parseInt(scoreReceived);

        }else {
            contentHTML += `
                <p>Student's Answer: ${answer.studentAnswer || 'No answer provided'}</p>
                <label for="grade${answer.questionIndex}">Teacher's Grade:</label>
                <input type="number" id="grade${answer.questionIndex}" placeholder="Enter grade" value="0" onchange="updateTeacherScore(${answer.questionIndex}, this.value)">

            `;
            
        }

        questionDiv.innerHTML = contentHTML;
        questionsContainer.appendChild(questionDiv);
        
        }
        
    });
}

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentQuestionIndex > 1) { 
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', function() {
    if (currentQuestionIndex < answers.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'Submissions.html'; 
});

document.getElementById('submitBtn').addEventListener('click', function() {
    let totalScore = mcqtotal;
    const comment = document.getElementById(`comment`).value;
    answers.forEach(answer => {
        if (answer.type !== 'mcq') {
            totalScore += answer.teacherScore || 0; 
        }
    })
    document.getElementById('totalScoreValue').textContent = totalScore;
});

document.getElementById('submitBtn').addEventListener('click', function() {
    let totalScore = mcqtotal;
    answers.forEach(answer => {
        if (answer.type !== 'mcq') {
            totalScore += answer.teacherScore || 0; 
        }
    })
    document.getElementById('totalScoreValue').textContent = totalScore;
    
});

function updateTeacherScore(questionIndex, newScore) {
    const answer = answers.find(answer => answer.questionIndex === questionIndex);
    if (answer) {
        
        const maxScore = answer.score; 
        if (parseInt(newScore) > maxScore) {
            alert(`Teacher's score cannot exceed ${maxScore} for question ${answer.questionIndex}.`);
            return; 
        }
        answer.teacherScore = parseInt(newScore);
    }
}


displayQuestion(currentQuestionIndex);

function submitGrades() {
    const grades = [];
    document.querySelectorAll('[id^="grade"]').forEach((gradeInput, index) => {
        grades.push({ questionId: submission.answers[index].questionId, grade: gradeInput.value });
    });

    
    fetch(`/api/submitGrades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId: submission.id, grades })
    })
    .then(response => response.json())
    .then(data => alert('Grades submitted successfully'))
    .catch(error => console.error('Error submitting grades:', error));
}

