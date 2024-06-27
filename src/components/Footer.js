import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="footer-title">All Rights Reserved &copy;Finspire</h4>
      <p className="footer-links">
        <a href="/" className="f-link">
          Home
        </a>
        |
        <a href="/about" className="f-link">
          About
        </a>
        |
        <a href="/contact" className="f-link">
          Contact
        </a>
      </p>
    </div>
  );
};

export default Footer;
