// Login  - Jihad Abdelnaser 
var form = document.getElementById("loginForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = localStorage.getItem("user");

    if (userData != null) {
        var user = JSON.parse(userData);

        if (user.email == email) {
            if (user.password == password) {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "home.html";
            } else {
                alert("Wrong password");
            }
        } else {
            alert("No users found. Please sign up first.");
        }
    }
});
