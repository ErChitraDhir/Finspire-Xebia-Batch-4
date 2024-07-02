import React from "react";
import { useForm } from "react-hook-form";
import "../assets/Login.css";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  
  const sendToForgot=async ()=>{
    navigate("/forgot/password");
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      const response = await fetch(
        "http://localhost:4001/customer/login/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
           credentials: "include",
        }
      );
      console.log("response : ", response.status);
      if (response.status === 200) {
        const result = await response.json();
        console.log("Logged in ! : ", result.message);
        navigate("/homepage");
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-body">
      <div className="containerLogin">
        <h2>Login to Your Account</h2>
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Enter your registered Email </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email must be a valid gmail.com address",
              },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
          <button type="submit">Login</button>
        </form>
          <button onClick={sendToForgot}>Forgot Password?</button>
      </div>
    </div>
  );
}

export default Login;
