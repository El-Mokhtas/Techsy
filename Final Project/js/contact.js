function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document
        .querySelector('input[placeholder="First Name"]')
        .value.trim();
    const lastName = document
        .querySelector('input[placeholder="Last Name"]')
        .value.trim();
    const email = document
        .querySelector('input[placeholder="Email Address"]')
        .value.trim();
    const phone = document
        .querySelector('input[placeholder="Phone Number"]')
        .value.trim();
    const message = document.querySelector("textarea").value.trim();

    if (!firstName || !lastName || !email || !phone || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number (10-15 digits).");
        return;
    }

    showToast("Message sent successfully!");
    this.reset();
});
