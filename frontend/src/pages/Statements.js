import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaKey, FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Statements = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/${userId}/dashboard`); 
};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const linkStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f05f5f',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '10px 10px 20px 0px',
    margin: '20px 0',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start'
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dummy data for statements
  const statements = [
    { id: 1, date: 'June 2023', downloadUrl: '#' },
    { id: 2, date: 'May 2023', downloadUrl: '#' },
    { id: 3, date: 'April 2023', downloadUrl: '#' },
    { id: 4, date: 'March 2023', downloadUrl: '#' },
    { id: 5, date: 'February 2023', downloadUrl: '#' },
    { id: 6, date: 'January 2023', downloadUrl: '#' },
    { id: 7, date: 'December 2022', downloadUrl: '#' },
    { id: 8, date: 'November 2022', downloadUrl: '#' },
    { id: 9, date: 'October 2022', downloadUrl: '#' },
    { id: 10, date: 'September 2022', downloadUrl: '#' },
    { id: 11, date: 'August 2022', downloadUrl: '#' },
    { id: 12, date: 'July 2022', downloadUrl: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#ff4e4e] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">Finesprire</span>
            </div>
            <div className="flex items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                   className="bg-transparent text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none hover:bg-[#ff2e2eda] transition duration-150 ease-in-out"
                   >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <button onClick={handleGoBack} style={linkStyle}>
                <FaArrowLeft className="icon" /> Go back
            </button>
        <div className="px-4 py-0 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Statements</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {statements.map((statement) => (
                <li key={statement.id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-[#000] truncate">{statement.date} Statement</span>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      
                       <a href={statement.downloadUrl}
                        className="px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-[#ff4e4e] hover:bg-red-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statements;