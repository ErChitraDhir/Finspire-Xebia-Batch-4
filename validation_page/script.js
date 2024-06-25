function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorText = document.getElementById('errorText');

    // Reset error message
    errorText.textContent = '';

    // Email validation
    if (!email.endsWith('@gmail.com')) {
        errorText.textContent = 'Email must end with @gmail.com';
        return false;
    }

    // Password validation
    var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!password.match(passwordRegex)) {
        errorText.textContent = 'Password must contain at least one uppercase letter, one number, and one special character';
        return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        errorText.textContent = 'Passwords do not match';
        return false;
    }

    // If all validations pass, form submission is allowed
    return true;
}
