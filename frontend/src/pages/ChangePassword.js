import React, { useState } from "react";
import "../assets/ChangePassword.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";

export default function ChangePassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    number: false,
    upperCase: false,
  });

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const number = /\d/.test(password);
    const upperCase = /[A-Z]/.test(password);

    setPasswordValidations({ length, number, upperCase });
  };

  return (
    <div className="center-wrapper">
      <div className="container">
        <h2 className="header">
          Change Password
        </h2>
        <h2 className="header2">Update your password</h2>
        <hr className="hrline" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="currentPassword" className="form-label">Current Password*</label>
            <input
              type="password"
              className={`formInput ${errors.currentPassword ? 'error' : ''}`}
              {...register("currentPassword", { required: "Current Password is required*" })}
            />
            {errors.currentPassword && <p className="error-message">{errors.currentPassword.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password*</label>
            <input
              type="password"
              className={`formInput ${errors.newPassword ? 'error' : ''}`}
              {...register("newPassword", {
                required: "New Password is required*",
                onChange: (e) => validatePassword(e.target.value),
              })}
            />
            {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
          </div>

          <div className="password-conditions">
            <p className={passwordValidations.length ? "valid" : "invalid"}>
              {passwordValidations.length ? <FaCheck /> : <FaTimes />} Must be at least 8 characters long
            </p>
            <p className={passwordValidations.number ? "valid" : "invalid"}>
              {passwordValidations.number ? <FaCheck /> : <FaTimes />} Contain at least 1 number
            </p>
            <p className={passwordValidations.upperCase ? "valid" : "invalid"}>
              {passwordValidations.upperCase ? <FaCheck /> : <FaTimes />} Contain at least 1 UPPER case letter
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password*</label>
            <input
              type="password"
              className={`formInput ${errors.confirmNewPassword ? 'error' : ''}`}
              {...register("confirmNewPassword", {
                required: "Please confirm your new password*",
                validate: value => value === watch("newPassword") || "Passwords do not match*"
              })}
            />
            {errors.confirmNewPassword && <p className="error-message">{errors.confirmNewPassword.message}</p>}
          </div>

          <div className="button-container">
            <button type="submit" className="CtnBtn">Continue</button>
          </div>
        </form>
      </div>
      </div>
  );
}
