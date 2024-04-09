let currentStudentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');
    fetchSubmissions(quizNumber).then(data => {
        submissions = data;
        displaySubmission(currentSubmissionIndex);
    });
});


let mcqTotal = 0;
let totalGrade = 0;  


function displayStudent(studentIndex) {
    const student = answers[studentIndex];
    const quizTitleElement = document.getElementById('quizTitle');
    const studentIdElement = document.getElementById('studentId');
    const totalScoreElement = document.getElementById('totalScore');
    const questionsContainer = document.getElementById('questionsContainer');

    quizTitleElement.textContent = `Grading Quiz: ${student.quizTitle}`;
    studentIdElement.textContent = `Student ID: ${student.studentId}`;
    totalScoreElement.textContent = `Total Score: ${student.totalScore}`;

    questionsContainer.innerHTML = '';

    student.submission.forEach(submission => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        let contentHTML = `
            <h3>Question ${submission.questionIndex}: ${submission.question}</h3>
            <p>Question Score: ${submission.score}</p>
        `;

        if (submission.type === 'mcq') {
            let optionsHTML = submission.options.map((option, idx) => {
                let optionStyle = '';
                let additionalText = '';

                if (submission.options[idx] === submission.studentAnswer) {
                    additionalText = ' - Chosen Answer';
                    optionStyle = 'color: red;'; 
                }
                if (idx === submission.correctAnswer) {
                    additionalText = ' - Correct Answer';
                    optionStyle = 'color: green;';
                }
                return `<li style="${optionStyle}">${option}${additionalText}</li>`;
            }).join('');

            contentHTML += `<ul>${optionsHTML}</ul>`;
            let scoreReceived = submission.studentAnswer === submission.answer ? submission.score : '0';
            contentHTML += `<p>Grade: ${scoreReceived}</p>`;
            updateTeacherScore(studentIndex, submission.questionIndex, scoreReceived);

        } else {
            contentHTML += `
                <p>Student's Answer: ${submission.studentAnswer || 'No answer provided'}</p>
                <label for="grade${submission.questionIndex}">Teacher's Grade:</label>
                <input type="number" id="grade${submission.questionIndex}" placeholder="Enter grade" value="${submission.teacherScore || 0}" onchange="updateTeacherScore(${studentIndex}, ${submission.questionIndex}, this.value)">
            `;
        }

        questionDiv.innerHTML = contentHTML;
        questionsContainer.appendChild(questionDiv);
    });

    updateTotalGrade();

}
        

function updateTotalGrade() {
    totalGrade = 0;
    answers[currentStudentIndex].submission.forEach(submission => {
        totalGrade += submission.teacherScore || 0; 
    });
    document.getElementById('totalGradeValue').textContent = totalGrade;
}

function updateTeacherScore(studentIndex, questionIndex, newScore) {
    const submission = answers[studentIndex].submission.find(submission => submission.questionIndex === questionIndex);
    if (submission) {
        const maxScore = submission.score; 
        if (parseInt(newScore) > maxScore) {
            alert(`Teacher's score cannot exceed ${maxScore} for question ${submission.questionIndex}.`);
            return; 
        }
        submission.teacherScore = parseInt(newScore);
        updateTotalGrade();
    }
}
            

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentStudentIndex > 0) { 
        currentStudentIndex--;
        displayStudent(currentStudentIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', function() {
    if (currentStudentIndex < answers.length - 1) {
        currentStudentIndex++;
        displayStudent(currentStudentIndex);
    }
});

document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'Submissions.html'; 
});

document.getElementById('submitBtn').addEventListener('click', function() {
    alert('Total Grade: ' + totalGrade);
});

displayStudent(currentStudentIndex);


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

