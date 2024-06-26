import React from "react";
import "../assets/EmailForm.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmailForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const formData = location.state;
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const combinedData = {
            ...formData,
            email: data.email,
        };
        console.log(combinedData)
        try {
            const response = await fetch('http://localhost:4001/customer/submitPersonalDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            });

            if (!response.ok) {
                throw new Error('Failed to register customer');
            }

            const result = await response.json();
            console.log(result);
            navigate('/otp-validation', { state: { email: combinedData.email } });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="containerEmail">
            <h2 className="header"><span className="sp">03 </span>Email Details</h2>
            <hr className="hrline" />
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "15px" }}>
                <label
                    htmlFor="email"
                    className="form-label"
                >
                   Enter you email address
                </label>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                    type="email"
                    className={`formInput ${errors.email ? 'error' : ''}`}
                    id="email"
                    name="email"
                />
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}
                <button type="submit" className="CtnBtn">
                    Send Verification Code
                </button>
            </form>
        </div>
    );
}
