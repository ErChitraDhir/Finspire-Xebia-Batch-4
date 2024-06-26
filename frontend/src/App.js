import React from "react";
import "./App.css";
import AddressForm from "./pages/AddressForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails"
import EmploymentDetails from "./pages/EmploymentDetails";
import Email from "./pages/EmailForm"
import OTP from "./pages/Rgister_OTP_page.js"
import LoginOTP from "./pages/Login_OTP_page.js"
import Login from "./pages/Login"
import Register from "./pages/Register"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/address-form" element={<AddressForm />} />
                <Route path="/personal-details" element={< PersonalDetails/>} />
                <Route path="/employment-details" element={< EmploymentDetails/>} />
                <Route path="/email-verification" element={< Email/>} />
                <Route path="/otp-validation" element={< OTP/>} />
                <Route path="/otp-validation-page" element={< LoginOTP/>} />
                <Route path="/login" element={< Login/>} />
                <Route path="/register" element={< Register/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
