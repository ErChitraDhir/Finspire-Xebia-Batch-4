import React from "react";
import "../assets/PersonalDetails.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PersonalDetailsForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        console.log(formData);
        navigate('/address-form', { state: formData });
    };

    return (
        <div className="full-container">
         <div className="header-container">
            <h1 style={{fontSize:"24px"}}>Your savings journey starts here</h1>
            <h2 style={{fontSize:"20px",fontWeight:"400"}}>Set up your account</h2>
        </div>
        <div className="container">
            <h2 className="header">
                <span className="sp">01 </span>Personal Details
            </h2>
            <h2 className="header2">Tell us a bit about yourself</h2>
            <hr className="hrline" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name*</label>
                        <input
                            type="text"
                            className={`formInput ${errors.firstName ? 'error' : ''}`}
                            {...register("firstName", { required: "First Name is required*" })}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="middleName" className="form-label">Middle Name (Optional)</label>
                        <input
                            type="text"
                            className="formInput"
                            {...register("middleName")}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name*</label>
                    <input
                        type="text"
                        style={{width:"49%"}}
                        className={`formInput ${errors.lastName ? 'error' : ''}`}
                        {...register("lastName", { required: "Last Name is required*" })}
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="dob" className="form-label">Date of Birth (DD/MM/YYYY)*</label>
                    <input
                        type="date"
                        className={`formInput ${errors.dob ? 'error' : ''}`}
                        {...register("dob", {
                            required: "Date of Birth is required*",
                            validate: {
                                isValid: (value) => !isNaN(Date.parse(value)) || "Invalid date*",
                                isAdult: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    let age = today.getFullYear() - selectedDate.getFullYear();
                                    if (today.getMonth() < selectedDate.getMonth() ||
                                        (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())) {
                                        age--;
                                    }
                                    return age >= 18 || "You must be at least 18 years old*";
                                }
                            }
                        })}
                    />
                    {errors.dob && <p className="error-message">{errors.dob.message}</p>}
                </div>

                <div className="button-container">
                    <button type="submit" className="CtnBtn">Continue</button>
                </div>
            </form>
        </div>
        </div>
    );
}
