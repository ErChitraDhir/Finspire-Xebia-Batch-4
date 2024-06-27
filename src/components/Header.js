import React from "react";
import Logo from "../images/logo.jpeg";

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="logo" className="logo-img" />
        <a href="/" className="title">
          Finspire
        </a>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <div className="navbar-right">
        <ul>
          <li>Signup</li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
