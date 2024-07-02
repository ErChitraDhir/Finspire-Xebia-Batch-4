import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaKey, FaEnvelope, FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import "../assets/PrivacyAndSecurity.css";

export default function PrivacyAndSecurity() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/homepage'); 
    };

    const handleChangePassword = () => {
        navigate('/homepage/privacy-and-security/change-password');
    };

    const handleChangeEmail = () => {
        navigate('/homepage/privacy-and-security/change-email');
    };

    const handleChangePersonalDetails = () => {
        navigate('/homepage/privacy-and-security/change-personal-details');
    };

    return (
        <div className="privacy-security-wrapper">
            <div className="privacy-security-container">
            <button onClick={handleGoBack} className="back-button">
                <FaArrowLeft className="icon" /> Go back
            </button>
                <div className="privacy-security-content">
                    <h2>Privacy & Security</h2>
                    <hr className="hrline1" />
                    <div className="section" onClick={handleChangePassword}>
                        <h3>Change password</h3>
                        <p>Update your password to keep your account safe and protect your data</p>
                        <FaKey className="section-icon" />
                    </div>
                    <div className="section" onClick={handleChangeEmail}>
                        <h3>Change email</h3>
                        <p>Update your email to keep your account safe and protect your data</p>
                        <FaEnvelope className="section-icon" />
                    </div>
                    <div className="section" onClick={handleChangePersonalDetails}>
                        <h3>Change Personal Details</h3>
                        <p>Update your personal details to keep your account information up to date</p>
                        <FaUser className="section-icon" />
                    </div>
                    <h3 className="WlcmUser"> <GoDotFill style={{color:"45E52D",}} /> Welcome, User</h3>
                </div>
            </div>
        </div>
    );
}
