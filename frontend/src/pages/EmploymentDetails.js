import React, { useState } from 'react';
import "../assets/EmploymentDetails.css";

const EmploymentDetails = () => {
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const handleStatusClick = (status) => {
    setEmploymentStatus(status);
    setActiveButton(status);
  };

  
  const renderAdditionalQuestions = () => {
    switch (employmentStatus) {
      case 'Full-time employed':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Company Name</h2>
              <label>What is the name of the company you work in?</label>
              <input type="text" className="formInput" placeholder="Company Name" />
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Occupation</h2>
              <label>Please select the closest option to your occupation</label>
              <select className="formInput">
                <option>Select your occupation</option>
                <option>Software Engineer</option>
                <option>Accountant</option>
                <option>Consultant</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Shop Owner</option>
                <option>Freelancer</option>
                <option>Other</option>
              </select>
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Annual Income</h2>
              <label>This includes your salary, benefits, investments, or income you receive</label>
              <select className="formInput">
                <option>₹0-₹2,00,000</option>
                <option>₹2,00,000-₹5,00,000</option>
                <option>₹5,00,000-₹10,00,000</option>
                <option>₹10,00,000-₹20,00,000</option>
                <option>₹20,00,000+</option>
              </select>
            </div>
          </div>
        );
      case 'Part-time employed':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Employer Name</h2>
              <label>What is the name of your employer?</label>
              <input type="text" className="formInput" placeholder="Employer Name" />
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Occupation</h2>
              <label>Please select the closest option to your occupation</label>
              <select className="formInput">
                <option>Select your occupation</option>
                <option>Software Engineer</option>
                <option>Accountant</option>
                <option>Consultant</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Shop Owner</option>
                <option>Freelancer</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Hourly or Daily Wage</h2>
              <label>What is your hourly wage or daily wage?</label>
              <input type="text" className="formInput" placeholder="Hourly/Daily Wage" />
            </div>
          </div>
        );
      case 'Self-employed':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Industry</h2>
              <label>Please select the closest option to your industry</label>
              <select className="formInput">
                <option>Select your industry</option>
                <option>IT</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Manufacturing</option>
                <option>Retail</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Occupation</h2>
              <label>Please select the closest option to your occupation</label>
              <select className="formInput">
                <option>Select your occupation</option>
                <option>Software Engineer</option>
                <option>Accountant</option>
                <option>Consultant</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Shop Owner</option>
                <option>Freelancer</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Annual Income</h2>
              <label>This includes your salary, benefits, investments, or income you receive</label>
              <select className="formInput">
                <option>₹0-₹2,00,000</option>
                <option>₹2,00,000-₹5,00,000</option>
                <option>₹5,00,000-₹10,00,000</option>
                <option>₹10,00,000-₹20,00,000</option>
                <option>₹20,00,000+</option>
              </select>
            </div>
          </div>
        );
      case 'Retired':
        return (
          <div className="additional-questions">
            <div>
            <h2 className="additional-qtns-hdr">Previous Occupation</h2>
              <label>What was your last occupation before retirement?</label>
              <select className="formInput">
                <option>Select your previous occupation</option>
                <option>Teacher</option>
                <option>Engineer</option>
                <option>Manager</option>
                <option>Doctor</option>
                <option>Accountant</option>
                <option>Artist</option>
                <option>Other</option>
              </select>
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Pension Income</h2>
              <label>What is your annual pension income?</label>
              <select className="formInput">
                <option>Select your pension income range</option>
                <option>₹0-₹1,00,000</option>
                <option>₹1,00,000-₹3,00,000</option>
                <option>₹3,00,000-₹5,00,000</option>
                <option>₹5,00,000-₹7,00,000</option>
                <option>₹7,00,000+</option>
              </select>
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Retirement Year</h2>
              <label>In which year did you retire?</label>
              <input type="text" className="formInput" placeholder="YYYY" />
            </div>
          </div>
        );
      case 'Student':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Institution Name</h2>
              <label>What is the name of your educational institution?</label>
              <input type="text" className="formInput" placeholder="Institution Name" />
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Course/Program</h2>
              <label>What course or program are you enrolled in?</label>
              <select className="formInput">
                <option>Select your course/program</option>
                <option>B.Tech (B.E)</option>
                <option>B.Sc</option>
                <option>B.Com</option>
                <option>BBA</option>
                <option>BCA</option>
                <option>MBBS</option>
                <option>LLB</option>
                <option>Other</option>
              </select>
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Graduation Year</h2>
              <label>When do you graduate?</label>
              <select className="formInput">
                <option>Select graduation year</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>After 2027</option>
              </select>
            </div>
          </div>
        );
      case 'Not in employment':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Reason for Unemployment</h2>
              <label>What is the reason for not being in employment?</label>
              <input type="text" className="formInput" placeholder="Reason for Unemployment" />
            </div>
            <div>
            <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Previous Occupation</h2>
              <label>What was your last occupation?</label>
              <select className="formInput">
                <option>Select your previous occupation</option>
                <option>Software Engineer</option>
                <option>Accountant</option>
                <option>Teacher</option>
                <option>Doctor</option>
                <option>Engineer</option>
                <option>Manager</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Duration of Unemployment</h2>
              <label>How long have you been unemployed?</label>
              <select className="formInput">
                <option>Select duration of unemployment</option>
                <option>Less than 6 months</option>
                <option>6 months to 1 year</option>
                <option>1 year to 2 years</option>
                <option>2 years to 5 years</option>
                <option>More than 5 years</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="employment-container">
      <h3 className="employment-header"><span className="employment-header">07 </span>Employment details</h3>
      <div>
        <label style={{ marginBottom: "10px" }}>What's your employment status?</label>
        <div className="employment-status-buttons">
          <button className={activeButton === 'Full-time employed' ? 'active' : ''} onClick={() => handleStatusClick('Full-time employed')}>Full-time employed</button>
          <button className={activeButton === 'Part-time employed' ? 'active' : ''} onClick={() => handleStatusClick('Part-time employed')}>Part-time employed</button>
          <button className={activeButton === 'Self-employed' ? 'active' : ''} onClick={() => handleStatusClick('Self-employed')}>Self-employed</button>
          <button className={activeButton === 'Retired' ? 'active' : ''} onClick={() => handleStatusClick('Retired')}>Retired</button>
          <button className={activeButton === 'Student' ? 'active' : ''} onClick={() => handleStatusClick('Student')}>Student</button>
          <button className={activeButton === 'Not in employment' ? 'active' : ''} onClick={() => handleStatusClick('Not in employment')}>Not in employment</button>
        </div>
      </div>
      {employmentStatus && (
        <div>
          {renderAdditionalQuestions()}
        </div>
      )}
      <div className="button-container">
        <button className="CtnBtn">Continue</button>
      </div>
    </div>
  );
};

export default EmploymentDetails;
