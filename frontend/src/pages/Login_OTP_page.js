import React from "react";
import "../assets/EmailForm.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register_OTP_page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state.email;

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4001/customer/verify/email/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: data.OTP }),
            });
            console.log("response : ", response.status);
            if (response.status==200) {
                const result = await response.json();
                console.log("registered ! : ", result.message);
                navigate('/register');
            }else{
                throw new Error('Failed to verify OTP');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="containerEmail">
            <h2 className="header"><span className="sp">04 </span>OTP Verification</h2>
            <hr className="hrline" />
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "15px" }}>
                <label
                    htmlFor="OTP"
                    className="form-label"
                >
                   Enter Verification Code
                </label>
                <input
                    {...register("OTP", {
                        required: "OTP is required",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "Invalid OTP"
                        }
                    })}
                    type="text"
                    className={`formInput ${errors.OTP ? 'error' : ''}`}
                    id="OTP"
                    name="OTP"
                />
                {errors.OTP && (
                    <p className="error-message">{errors.OTP.message}</p>
                )}
                <button type="submit" className="CtnBtn">
                    Verify
                </button>
            </form>
        </div>
    );
}
