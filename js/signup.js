// signup - Jihad Abdelnaser
var form = document.getElementById("signupForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var photo = document.getElementById("photo").value;

    if (photo == "") {
        photo = "https://www.w3schools.com/howto/img_avatar.png";
    }

    if (password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    var user = {
        name: name,
        email: email,
        password: password,
        photo: photo,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully!");
    window.location.href = "login.html";
});
