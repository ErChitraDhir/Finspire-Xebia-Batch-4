import React, { useState } from 'react';
import "../assets/EmploymentDetails.css";
import { useForm } from 'react-hook-form';
import { useLocation,useNavigate } from 'react-router-dom';

const EmploymentDetails = ({onComplete}) => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state ? location.state.email : '';
  const handleStatusClick = (status,event) => {
    event.preventDefault();
    setEmploymentStatus(status);
    setActiveButton(status);
  };
  const onSubmit = async(data) => {
    if (!employmentStatus) {
      alert('Please select your employment status.');
      return
    }
    Object.keys(data).forEach(key => {
      if (data[key] === "Select your industry" || data[key] === "Select your occupation" || data[key]==="Select your Annual Income"){
        delete data[key];
      }
    });
    console.log(data);

    data.employmentStatus = employmentStatus;
    data.email = email;
    try {
      const response = await fetch('http://localhost:4001/customer/employment-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Employment details saved:', result);
        if (onComplete) {
          onComplete(); 
        }
        navigate('/upload-documents');
      } else {
        throw new Error('Failed to save employment details.');
      }
    } catch (error) {
      console.error('Error saving employment details:', error);
      // Handle error gracefully (e.g., show error message to user)
    }
  
  };
  
  const renderAdditionalQuestions = () => {
    switch (employmentStatus) {
      case 'Full-time employed':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Company Name</h2>
              <label>What is the name of the company you work in?</label>
              <input type="text" className="formInputED" placeholder="Company Name" {...register("companyName")} />
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Occupation</h2>
              <label>Please select the closest option to your occupation</label>
              <select className="formInputED" {...register("occupation")}>
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
              <select className="formInputED" {...register("annualIncome")}>
              <option>Select your Annual Income</option>
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
              <input type="text" className="formInputED" placeholder="Employer Name" {...register("employerName")} />
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Occupation</h2>
              <label>Please select the closest option to your occupation</label>
              <select className="formInputED" {...register("occupation")}>
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
              <input type="text" className="formInputED" placeholder="Hourly/Daily Wage" {...register("wage")} />
            </div>
          </div>
        );
      case 'Self-employed':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Industry</h2>
              <label>Please select the closest option to your industry</label>
              <select className="formInputED" {...register("industry")}>
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
              <select className="formInputED" {...register("occupation")}>
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
              <select className="formInputED" {...register("annualIncome")}>
              <option>Select your Annual Income</option>
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
              <select className="formInputED" {...register("previousOccupation")}>
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
              <select className="formInputED" {...register("pensionIncome")}>
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
              <input type="text" className="formInputED" placeholder="YYYY" {...register("retirementYear")} />
            </div>
          </div>
        );
      case 'Student':
        return (
          <div className="additional-questions">
            <div>
              <h2 className="additional-qtns-hdr">Institution Name</h2>
              <label>What is the name of your educational institution?</label>
              <input type="text" className="formInputED" placeholder="Institution Name" {...register("institutionName")} />
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Course/Program</h2>
              <label>What course or program are you enrolled in?</label>
              <select className="formInputED" {...register("courseProgram")}>
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
              <select className="formInputED" {...register("graduationYear")}>
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
              <input type="text" className="formInputED" placeholder="Reason for Unemployment" {...register("reasonForUnemployment")} />
            </div>
            <div>
              <h2 className="additional-qtns-hdr" style={{ marginTop: "10px" }}>Previous Occupation</h2>
              <label>What was your last occupation?</label>
              <select className="formInputED" {...register("previousOccupation")}>
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
              <select className="formInputED" {...register("durationOfUnemployment")}>
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
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="employment-container">
      <h3 className="employment-header"><span className="employment-header">07 </span>Employment details</h3>
      <div>
        <label style={{ marginBottom: "10px" }}>What's your employment status?</label>
        <div className="employment-status-buttons">
          <button type="button" className={activeButton === 'Full-time employed' ? 'active' : ''} onClick={(e) => handleStatusClick('Full-time employed',e)}>Full-time employed</button>
          <button type="button" className={activeButton === 'Part-time employed' ? 'active' : ''} onClick={(e) => handleStatusClick('Part-time employed',e)}>Part-time employed</button>
          <button type="button" className={activeButton === 'Self-employed' ? 'active' : ''} onClick={(e) => handleStatusClick('Self-employed',e)}>Self-employed</button>
          <button type="button" className={activeButton === 'Retired' ? 'active' : ''} onClick={(e) => handleStatusClick('Retired',e)}>Retired</button>
          <button type="button" className={activeButton === 'Student' ? 'active' : ''} onClick={(e) => handleStatusClick('Student',e)}>Student</button>
          <button type="button" className={activeButton === 'Not in employment' ? 'active' : ''} onClick={(e) => handleStatusClick('Not in employment',e)}>Not in employment</button>
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
    </form>
  );
};

export default EmploymentDetails;
