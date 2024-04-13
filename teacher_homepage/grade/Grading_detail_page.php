<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Grading Submission</title>
    <link rel="stylesheet" href="grading.css">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sidebars/">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">

</head>
<?php
    $studentId=$_REQUEST['studentId'];
    $quiz_folder=$_REQUEST['quiz_folder'];
    $submit_index=$_REQUEST['submit_id'];
    $data = file_get_contents('.'.$quiz_folder);
    $quiz_json_data=json_decode($data,true);

?>
<body>
    <div id = "start">
        <h1 id="quizTitle">Grading Quiz: <?php echo $quiz_json_data['title'];?></h1>
        <p id="totalScore">Total Score: 0</p>
        <p id="studentId">Student ID: </p>
    </div>
   

    <div id="questionsContainer">
        <?php
            $answer= $quiz_json_data['submissions'][0]['studentId'];
        ?>
    </div>
    <div id = "conclu">
        <p id="totalGrade">Total Grade: <span id="totalGradeValue">0</span></p>
        <div id="commentContainer">
            <div id="commentTitle">Comment</div>
            <textarea id="comment" rows="4" placeholder="Enter your comment here..."></textarea>
        </div>
        <button id="prevBtn">Previous</button>
        <button id="nextBtn" onclick="next()">Next</button>
        <button id="submitBtn" onclick="submitGrades();" href="window.opener=null;window.open('','_self');window.close();">Submit</button>
        <button id="backBtn" >Back</button>
    </div>
    
 <script>
let currentStudentIndex = 0;
let mcqTotal = 0;
let totalGrade = 0;  
var answers = (<?php echo json_encode($quiz_json_data['submissions'][$submit_index]['answers']);?>,false);
const student =<?php echo $data?>;
var quizTitle= '<?php echo $quiz_json_data['title'];?>';
function displayStudent(studentIndex) {

    const quizTitleElement = document.getElementById('quizTitle');
    const studentIdElement = document.getElementById('studentId');
    const totalScoreElement = document.getElementById('totalScore');
    const questionsContainer = document.getElementById('questionsContainer');

    quizTitleElement.innerHTML = "Grading Quiz:<?php echo $quiz_json_data['title'];?>";
    studentIdElement.textContent = `Student ID: ${student.submissions[<?php echo $submit_index?>].studentId}`;
    totalScoreElement.textContent = `Total Score: ${totalGrade}`;

    questionsContainer.innerHTML = '';
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        let contentHTML = `
            <h3>Question ${currentStudentIndex+1}: ${student.question[currentStudentIndex].question}</h3>
            <p>Question Score: ${student.question[currentStudentIndex].score}</p>
        `;
        if (student.question[currentStudentIndex].type === 'mcq') {
            var optionsHTML=``;
            for(let i=0;i<(student.question[currentStudentIndex].options.length);i++){
                let optionStyle = '';
                let additionalText = '';
                
                if ((i) == student.submissions[<?php echo $submit_index?>].answers[currentStudentIndex]) {
                    additionalText = ' - Chosen Answer';
                    optionStyle = 'color: red;'; 
                }
                if ((i) == student.question[currentStudentIndex].answer) {
                additionalText = ' - Correct Answer';
                optionStyle = 'color: green;';
                }
               
            optionsHTML+=`<li style="${optionStyle}">${student.question[currentStudentIndex].options[i]}${additionalText}</li>`;
            }
            contentHTML += `<ul>${optionsHTML}</ul>`;
            let scoreReceived = student.submissions[<?php echo $submit_index?>].answers[currentStudentIndex] === student.question[currentStudentIndex].answer ? student.question[currentStudentIndex].score : '0';
            contentHTML += `<p>Grade: ${scoreReceived}</p>`;
            updateTeacherScore(<?php echo $submit_index?>, currentStudentIndex, scoreReceived);
        }
        else {
            contentHTML += `
                <p>Student's Answer: ${student.submissions[<?php echo $submit_index?>].answers[currentStudentIndex] || 'No answer provided'}</p>
                <label for="grade${currentStudentIndex}">Teacher's Grade:</label>
                <input type="number" id="grade${currentStudentIndex}" placeholder="Enter grade" value="" onchange="updateTeacherScore(${studentIndex}, ${currentStudentIndex}, this.value)">
            `;
        }
        questionDiv.innerHTML = contentHTML;
        questionsContainer.appendChild(questionDiv);
    updateTotalGrade();
}
        

function updateTotalGrade() {
    totalGrade=0;
    for(let i=0;i<student.submissions[<?php echo $submit_index?>].teacherScore.length;i++){
        totalGrade += student.submissions[<?php echo $submit_index?>].teacherScore[i];
    }   
    student.submissions[<?php echo $submit_index?>].totalScore=totalGrade;
    document.getElementById('totalGradeValue').textContent = totalGrade;
}

function updateTeacherScore(studentIndex, questionIndex, newScore){   
        const maxScore = student.question[currentStudentIndex].score;
        if (parseInt(newScore) > maxScore){
            return; 
        }
        student.submissions[<?php echo $submit_index?>].teacherScore[currentStudentIndex] = parseInt(newScore);
        updateTotalGrade();
}
            

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentStudentIndex > 0) { 
        currentStudentIndex--;
        displayStudent(currentStudentIndex);
    }
});

function next(){
    if (currentStudentIndex < student.question.length - 1) {
        currentStudentIndex++;
        displayStudent(currentStudentIndex);
    }
}

document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'Submissions.html'; 
});

displayStudent(currentStudentIndex);

function submitGrades(){
    alert('Total Grade: ' + totalGrade);
    fetch('./savegrade.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    }).then(response => response.json())
    myWindow=window.open("",'_self');
    myWindow.close();
}
    </script>
</body>
</html>
