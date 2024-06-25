import React from "react";
import "./App.css";
import AddressForm from "./pages/AddressForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails"
import EmploymentDetails from "./pages/EmploymentDetails";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/address-form" element={<AddressForm />} />
                <Route path="/personal-details" element={< PersonalDetails/>} />
                <Route path="/employment-details" element={< EmploymentDetails/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
