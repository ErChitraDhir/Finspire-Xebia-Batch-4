import React from "react";
import Header from "../components/Header";
import "../styles/homepage.css";
import { CiLogin } from "react-icons/ci";
import { MdAccountBox } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { MdSavings } from "react-icons/md";
import { RiBankCardFill } from "react-icons/ri";
import { TbCashBanknoteFilled } from "react-icons/tb";
import Appimg from "../images/phone-app1.png";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="homepg">
      <Header></Header>
      <div className="hdr">
        <h2 className="title">Finspire</h2>
        <br />
        <p>Empowering your financial journey with trust and innovation.</p>
        <br />
        <a href="/document" className="apply-btn">
          Apply Now
        </a>
      </div>
      <div className="body">
        <h2 className="title" id="bank-title">
          Bank Features
        </h2>
        <p>
          Welcome to Finspire! We are thrilled to have you join us as a valued
          customer. Our team is here to support you in achieving your financial
          goals and providing you with exceptional services. Feel free to
          explore our range of banking products and services, and do not
          hesitate to reach out if you have any questions. We look forward to
          serving you and building a strong financial partnership together.
        </p>
      </div>
      <div className="features-list">
        <div className="feature">
          <p>
            Implement strong authentication methods such as biometric
            authentication, two-factor authentication, or secure password
            protocols to ensure the security of user accounts.
          </p>
          <div class="overlay">
            <h2>
              <CiLogin /> Secure Login
            </h2>
          </div>
        </div>
        <div class="feature">
          <p>
            Allow users to view their account balances, transaction history, and
            manage their accounts easily through the app.
          </p>
          <div class="overlay">
            <h2>
              <MdAccountBox /> Account Management
            </h2>
          </div>
        </div>
        <div class="feature">
          <p>
            Enable users to transfer funds between their own accounts, to other
            accounts within the same bank, or to external accounts securely and
            conveniently.
          </p>
          <div class="overlay">
            <h2>
              <RiExchangeFundsLine /> Fund Transfer
            </h2>
          </div>
        </div>
        <div class="feature">
          <p>
            Provide a feature that allows users to pay bills, set up recurring
            payments, and manage their bill payments directly through the app.
          </p>
          <div class="overlay">
            <h2>
              <RiBillFill /> Bill Payment
            </h2>
          </div>
        </div>
        <div class="feature">
          <p>
            Allow users to deposit checks by taking a photo of the check using
            their mobile device, eliminating the need to visit a physical bank
            branch.
          </p>
          <div class="overlay">
            <h2>
              <MdOutlineMobileFriendly /> Mobile Deposit
            </h2>
          </div>
        </div>
        <div class="feature">
          <p>
            Offer real-time alerts and notifications for account activity, such
            as large transactions, low balances, or payment due dates, to help
            users stay informed and monitor their finances effectively.
          </p>
          <div class="overlay">
            <h2>
              <MdNotificationsActive /> Alerts and Notifications
            </h2>
          </div>
        </div>
      </div>
      <div class="offers-container">
        <div class="offer-box">
          <div class="icon">
            <MdSavings />
          </div>
          <div>
            <h3 className="sub-title">Savings Account</h3>
            <p className="para">
              Unlock the power of savings with our high-interest savings
              account.
            </p>
            <br />
            <button className="btn">Open Account</button>
          </div>
        </div>
        <div class="offer-box">
          <div class="icon">
            <TbCashBanknoteFilled />
          </div>
          <div>
            <h3 className="sub-title">Bank Vouchers</h3>
            <p className="para">Buy our Bank vouchers at upto 40% discount.</p>
            <br />
            <button className="btn">Check Offer</button>
          </div>
        </div>
        <div class="offer-box">
          <div class="icon">
            <RiBankCardFill />
          </div>
          <div>
            <h3 className="sub-title">Credit Cards</h3>
            <p className="para">
              Don't miss out on exclusive credit card offers.
            </p>
            <br />
            <button className="btn">Apply Now</button>
          </div>
        </div>
      </div>
      <div className="app-install">
        <div className="app-content">
          <h1 className="title download-title">Finspire Mobile App</h1>
          <br />
          <h4 className="sub-title">
            Transform your financial journey with just a tap - download the
            Finspire mobile app now!
          </h4>
          <div className="install-btn">
            <button className="btn">
              <FaGooglePlay /> Play Store
            </button>
            <button className="btn">
              <FaAppStoreIos /> App Store
            </button>
          </div>
        </div>
        <div className="app">
          <img src={Appimg} alt="app" className="app-img"></img>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
