import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import contact from "../images/contact.jpg";
import "../styles/contactpg.css";

const Contact = () => {
  return (
    <div>
      <Header></Header>
      <div className="contact">
        <p className="para c-para">
          Our dedicated team at the bank is available to assist you with any
          questions or concerns you may have. Feel free to reach out to us at
          any time via phone, email, or in person at our branch. Your
          satisfaction is our priority, and we are here to help you with all
          your banking needs.
        </p>
      </div>
      <div>
        <img src={contact} alt="contact" className="contact-img" />
        <div className="contact-details">
          <h4 className="sub-title">Email : </h4>
          <p className="para">help@finspire.com</p>
          <br />
          <h4 className="sub-title">Contact : </h4>
          <p className="para">012-3456-789</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
