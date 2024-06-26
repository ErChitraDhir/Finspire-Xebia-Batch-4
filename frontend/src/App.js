import React from "react";
import "./App.css";
import AddressForm from "./pages/AddressForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails"
import EmploymentDetails from "./pages/EmploymentDetails";
import Email from "./pages/EmailForm"
import OTP from "./pages/OTP_page"
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
