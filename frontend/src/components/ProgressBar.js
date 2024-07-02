// ProgressBar.js
import React from 'react';
import '../assets/ProgressBar.css';

const ProgressBar = ({ title, completedForms, totalForms }) => {
    const percentage = (completedForms / totalForms) * 100;

    return (
        <div className="progress-container">
            <div className="progress">
                <div 
                    className="progress-bar" 
                    style={{ width: `${percentage}%` }} 
                ></div>
            </div>
            <div className="progress-title">{title}</div>
        </div>
    );
};

export default ProgressBar;
