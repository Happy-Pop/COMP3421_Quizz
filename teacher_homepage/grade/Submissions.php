<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz Submissions</title>
    <link rel="stylesheet" href="submissions.css">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sidebars/">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
    <style>
        body, html {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Roboto', sans-serif;
    color: #333;
}

.container {
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #0056b3;
    text-align: center;
    margin-bottom: 20px;
}
.questions{
    border: 1px solid #e7e7e7;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
}
.submissions div, .questions div {
    border: 1px solid #e7e7e7;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
    </style>
</head>
<?php
session_start();
$quiz_folder = $_REQUEST["quiz_folder"];
$data = file_get_contents('.'.$quiz_folder);
$quiz_json_data=json_decode($data,true);
?>
<body>
    <div class="container">
        <h1>Submissions for Quiz: <span id="quizTitleDisplay">
        <?php 
        echo $quiz_json_data['title'];
        echo '<br>';
        echo '<p style="text-align:left">'.$quiz_json_data['title'].'</p>';      
        ?>       
        </span></h1>
        <div id="quizInfo">
            <?php
                echo '<p>Number of Questions:'.count($quiz_json_data['question']).'</p>';
                for($i=0;$i<count($quiz_json_data['question']); $i++){
                    echo '<div class="questions">';
                    echo  'Q'.$i+1 .' '.$quiz_json_data['question'][0]['question'];
                    echo '</div>';
                }
            ?>
        </div>
        <div id="submissionsList">
        <?php
            echo "<h2>Submissions</h2>";
            echo '<p>Number of Submissions:'.count($quiz_json_data['submissions']).'</p>';
            echo '<div class="questions">';
            for($i=0;$i<count($quiz_json_data['question']); $i++){             
                echo  'studentId:'.$i+1 .' '.$quiz_json_data['submissions'][0]['studentId'].'<a onclick="go_to_student_answer('.$quiz_json_data['submissions'][0]['studentId'].')"> view</a>';
                
            }
            echo '</div>';
            ?>
        </div>
    </div>

    <script>
        function go_to_student_answer(studentId){
            var form1 = document.createElement("form");
            var user_email= document.createElement("input");
            user_email.value=studentId;
            form1.target="_blank"
            user_email.type="text";
            user_email.name="studentId";
            form1.method = "POST";
            form1.action = "./Grading_detail_page.php";
            form1.appendChild(user_email);
            document.body.appendChild(form1);
            form1.submit();
            document.body.removeChild(form1);
        }
function displaySubmissions(submissions) {
    const submissionsListDiv = document.getElementById('submissionsList');
    submissionsListDiv.innerHTML = `<h2>Submissions</h2>
                                    Number of Submissions: ${submissions.length}</p>
                                ${submissions.map(sub => `<div>Student ID: ${sub.studentId}
                                    <a href="Grading%20detail%20page.html?quizNumber=${quizNumber}&studentId=${sub.studentId}">View</a>
                                    </div>`).join('')}`;
}
    </script>
</body>
</html>
