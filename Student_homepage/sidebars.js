document.getElementById("Sign_Out").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "block";
});

document.getElementById("confirmSignOut").addEventListener("click", function() {
    window.location.href = "/"; // Replace with your desired URL
});

document.getElementById("cancelSignOut").addEventListener("click", function() {
    document.getElementById("confirmationModal").style.display = "none";
});