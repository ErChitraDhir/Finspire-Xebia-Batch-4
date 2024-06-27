import React from "react";
import { useForm } from "react-hook-form";
import "../assets/Login.css";
import { useLocation, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      const response = await fetch(
        "http://localhost:4001/customer/forgot/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      console.log("response : ", response.status);
      if (response.status === 200) {
        const result = await response.json();
        console.log("Email Sent Checkit ! : ", result.message);
        // navigate("/");
      } else {
        throw new Error("Failed to send Email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-body">
      <div className="containerLogin">
        <h2>Recover Password of you Account!</h2>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
