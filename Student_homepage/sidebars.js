document.getElementById("Sign_Out").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "block";
});

document.getElementById("confirmSignOut").addEventListener("click", function() {
    window.location.href = "/"; // Replace with your desired URL
});

document.getElementById("cancelSignOut").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
});

// Example JavaScript code to open/close the modal and populate the table
document.getElementById('Check_Grades').onclick = function() {
    showModal();
};

document.querySelector('.close').onclick = function() {
    closeModal();
};

function showModal() {
    fetch('exam.json')
    .then(response => response.json()) // 解析响应为JSON
    .then(data => {
        const tableBody = document.getElementById('gradesTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ""; // 清空现有的表格数据
        
        // 使用获取到的数据填充表格
        data.forEach(record => {
            let row = `<tr>
                <td>${record.Name}</td>
                <td>${record.Time}</td>
                <td>${record.Grade}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        document.getElementById('gradesModal').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching the JSON:', error);
        // 处理错误情况，比如显示一条消息告知用户发生了错误
    });
}

function closeModal() {
    document.getElementById('gradesModal').style.display = 'none';
}


