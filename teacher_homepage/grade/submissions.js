function fetchQuizData(quizNumber) {
    return fetch(`http://localhost/COMP3421_Quizz/Grade/2024-04-12T16-42-38-880Z.json`)
        .then(response => {
            if (!response.ok) throw new Error('Quiz not found');
            return response.json();
        });
}

function displayQuizInfo(quizData) {
    const quizInfoDiv = document.getElementById('quizInfo');
    quizInfoDiv.innerHTML = `<h2>${quizData.quizTitle}</h2>
                             <p>Number of Questions: ${quizData.questions.length}</p>
                             <div class="questions">
                                ${quizData.questions.map(q => `<div>Q${q.questionIndex}: ${q.question}</div>`).join('')}
                             </div>`;
}

function displaySubmissions(submissions) {
    const submissionsListDiv = document.getElementById('submissionsList');
    submissionsListDiv.innerHTML = `<h2>Submissions</h2>
                                    <p>Number of Submissions: ${submissions.length}</p>
                                ${submissions.map(sub => `<div>Student ID: ${sub.studentId}
                                    <a href="Grading%20detail%20page.html?quizNumber=${quizNumber}&studentId=${sub.studentId}">View</a>
                                    </div>`).join('')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const quizNumber = new URLSearchParams(window.location.search).get('quizNumber');
    document.getElementById('quizNumberDisplay').textContent = quizNumber;

    fetchQuizData(quizNumber)
        .then(quizData => {
            displayQuizInfo(quizData);
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
        });

    fetch(`http://localhost/COMP3421_Quizz/Grade/2024-04-12T16-42-38-880Z.json`)
        .then(response => response.json())
        .then(data => {
            displaySubmissions(data.submissions);
        })
        .catch(error => {
            console.error('Error fetching submissions:', error);
        });
});
