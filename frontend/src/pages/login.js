import React, { useState } from 'react';
import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const validateForm = () => {
        // Reset error message
        setErrorText('');

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!email.match(emailRegex)) {
            setErrorText('Email must be a valid gmail.com address');
            return false;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!password.match(passwordRegex)) {
            setErrorText('Password must contain at least one uppercase letter, one number, and one special character');
            return false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            setErrorText('Passwords do not match');
            return false;
        }

        // If all validations pass, form submission is allowed
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, submit form
            console.log('Form submitted');
        }
    };

    return (
        <div className="container">
            <h2>Login to Your Account</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email (must include @gmail.com):</label><br />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                /><br /><br />

                <label htmlFor="password">Password (at least one uppercase letter, one number, one special character):</label><br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                /><br /><br />

                <label htmlFor="confirmPassword">Confirm Password:</label><br />
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                /><br /><br />

                <button type="submit">Login</button>
            </form>
            <p id="errorText" className="error-text">{errorText}</p>
        </div>
    );
}

export default Login;
