document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        // Validate username and password
        if (username === 'admin@satsangtechnologies.com' && password === 'Admin') {
            alert('Login successful!'); // Replace with your authentication logic
            // Redirect to admin dashboard or perform other actions
            window.location.href = "admin.html";
        } else {
            alert('Invalid username or password');
        }
    });
});