<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Grading Submission</title>
    <link rel="stylesheet" href="grading.css">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sidebars/">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">

</head>
<body>
    <div id = "start">
        <h1 id="quizTitle">Grading Quiz:</h1>
        <p id="totalScore">Total Score: 0</p>
        <p id="studentId">Student ID: </p>
    </div>
   

    <div id="questionsContainer">
        
    </div>
    <div id = "conclu">
        <p id="totalGrade">Total Grade: <span id="totalGradeValue">0</span></p>
        <div id="commentContainer">
            <div id="commentTitle">Comment</div>
            <textarea id="comment" rows="4" placeholder="Enter your comment here..."></textarea>
        </div>
        <button id="prevBtn">Previous</button>
        <button id="nextBtn">Next</button>
        <button id="submitBtn">Submit</button>
        <button id="backBtn">Back</button>
    </div>
    
    <script src="grading.js"></script>
</body>
</html>
