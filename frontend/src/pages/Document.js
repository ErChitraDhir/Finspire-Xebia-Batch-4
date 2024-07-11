import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import "../assets/documentpg.css";
import Features from "../pdfs/Features.pdf";
import Finspire from "../pdfs/Finspire.pdf";
import PrivacyPolicy from "../pdfs/PrivacyPolicy.pdf";
import TermsConditions from "../pdfs/TermsConditions.pdf";
import { useNavigate } from "react-router-dom";

const Document = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [linksClicked, setLinksClicked] = useState({
    finspire: false,
    features: false,
    termsConditions: false,
    privacyPolicy: false,
  });

  const handleLinkClick = (link) => {
    setLinksClicked((prevState) => ({
      ...prevState,
      [link]: true,
    }));
  };

  const allLinksClicked = Object.values(linksClicked).every(
    (clicked) => clicked
  );
  const onSubmit = async () => {
    navigate('/personal-details');
};
  return (
    <>
      <Header></Header>
      <div className="doc-body">
        <h1 className="title" id="doc-title">
          Important Documents to Review
        </h1>
        <p className="para doc">
          Please review the privacy policy and terms and conditions documents to
          proceed with your bank application. Your cooperation is appreciated.
        </p>
        <br />
        <div className="doc-links">
          <div className="row">
            <a
              className={`link ${linksClicked.finspire ? "green" : ""}`}
              href={Finspire}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLinkClick("finspire")}
            >
              About Finspire
            </a>
            <a
              className={`link ${linksClicked.features ? "green" : ""}`}
              href={Features}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLinkClick("features")}
            >
              Key Features
            </a>
          </div>
          <div className="row">
            <a
              className={`link ${linksClicked.termsConditions ? "green" : ""}`}
              href={TermsConditions}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLinkClick("termsConditions")}
            >
              Terms and Conditions
            </a>
            <a
              className={`link ${linksClicked.privacyPolicy ? "green" : ""}`}
              href={PrivacyPolicy}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLinkClick("privacyPolicy")}
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="btn-for-next">
          <button className="next-btn" disabled={!allLinksClicked} onClick={handleSubmit(onSubmit)}>
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Document;
