import React from 'react';
import { useForm } from 'react-hook-form';
import "../assets/Login.css";

function Login() {
    const { register, handleSubmit, watch,formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };

    return (
        <div className='login-body'>
        <div className="containerLogin">
            <h2>Login to Your Account</h2>
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Enter your registered email address </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                            message: 'Email must be a valid gmail.com address'
                        }
                    })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}

                <label htmlFor="password">Enter your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                            message: 'Password must contain at least one uppercase letter, one number, and one special character'
                        }
                    })}
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    {...register('confirmPassword', {
                        required: 'Password is required',
                        validate: value =>
                            value === watch('password') || 'Passwords do not match'
                    })}
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                <button>Forgot Password?</button>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
