import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddressForm from "./pages/AddressForm";
import PersonalDetails from "./pages/PersonalDetails";
import EmploymentDetails from "./pages/EmploymentDetails";
import Email from "./pages/EmailForm";
import OTP from "./pages/Rgister_OTP_page";
import LoginOTP from "./pages/Login_OTP_page";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PrivacyAndSecurity from "./pages/PrivacyAndSecurity";
import ChangePassword from "./pages/ChangePassword";
import ProgressBar from "./components/ProgressBar";
import UploadDocuments from "./pages/UploadDocuments";
import Dashboard from "./pages/Dashboard"
import Statements from "./pages/Statements"
import "./App.css";

const AppContent = () => {
    const location = useLocation();
    const [personalFormsCompleted, setPersonalFormsCompleted] = useState(0);
    const [emailFormsCompleted, setEmailFormsCompleted] = useState(0);
    const [finalDetailsformsCompleted, setAuthFormsCompleted] = useState(0);

    const totalPersonalForms = 2; // PersonalDetails and AddressForm
    const totalEmailForms = 3; // EmailForm and OTP
    const totalFinalDetailsForms = 2; // Register and Login

    const incrementPersonalForms = () => setPersonalFormsCompleted(prev => prev + 1);
    const incrementEmailForms = () => setEmailFormsCompleted(prev => prev + 1);
    const incrementFinalDetailsForms = () => setAuthFormsCompleted(prev => prev + 1);

    const excludeProgressBarRoutes = [
        "/",
        "/login",
        "/:userId/privacy-and-security",
        "/:userId/privacy-and-security/change-password",
        "/:userId/dashboard",
        "/:userId/dashboard/statement",
        "/forgot/password",
    ];

    const shouldExcludeProgressBars = excludeProgressBarRoutes.some(route =>
        new RegExp(`^${route.replace(":userId", "[^/]+")}(\/|$)`).test(location.pathname)
    );
    
    return (
        <>
            {!shouldExcludeProgressBars && (
                <div className="progress-bars">
                    <ProgressBar 
                        title="Personal details" 
                        completedForms={personalFormsCompleted} 
                        totalForms={totalPersonalForms} 
                    />
                    <ProgressBar 
                        title="Account Details" 
                        completedForms={emailFormsCompleted} 
                        totalForms={totalEmailForms} 
                    />
                    <ProgressBar 
                        title="Final Details" 
                        completedForms={finalDetailsformsCompleted} 
                        totalForms={totalFinalDetailsForms} 
                    />
                </div>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/address-form" element={<AddressForm onComplete={incrementPersonalForms} />} />
                <Route path="/personal-details" element={<PersonalDetails onComplete={incrementPersonalForms} />} />
                <Route path="/employment-details" element={<EmploymentDetails onComplete={incrementFinalDetailsForms }/>} />
                <Route path="/upload-documents" element={<UploadDocuments onComplete={incrementFinalDetailsForms }/>} />
                <Route path="/email-verification" element={<Email onComplete={incrementEmailForms} />} />
                <Route path="/otp-validation" element={<OTP onComplete={incrementEmailForms} />} />
                <Route path="/otp-validation-page" element={<LoginOTP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register onComplete={incrementEmailForms} />} />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/:userId/privacy-and-security" element={<PrivacyAndSecurity />} />
                <Route path="/:userId/privacy-and-security/change-password" element={<ChangePassword />} />
                <Route path="/:userId/dashboard" element={<Dashboard />} />
                <Route path="/:userId/dashboard/statement" element={<Statements />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
