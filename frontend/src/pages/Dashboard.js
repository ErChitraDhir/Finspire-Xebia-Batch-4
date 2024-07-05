import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLogin, getEmail } from "../utils/auth";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userEmail, setUser] = useState({ email: "" });
  const [allTransactions, setTransactions] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const navigateToStatement = async () => {
    navigate(`/${userId}/dashboard/statement`);
  };
  const navigateToPrivacy = async () => {
    navigate(`/${userId}/privacy-and-security`);
  };
  const getStatementOnEmail = async () => {
    const response = await fetch(
      `http://localhost:4001/customer/transactions/${userEmail}/statement/july/pdf`
    );
    const data = await response.json();
    console.log(response);
    if(response.status==200){
      alert("Statement sent to your email");
    }

  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log("loggedIn", loggedIn);

      if (loggedIn.auth) {
        setUser(loggedIn.data.email);
        console.log(
          "Email in dashboard from token in function : ",
          loggedIn.data.email
        );
      } else {
        navigate("/login");
      }
    };

    authenticate();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getTransaction = async () => {
      const tempEmail = getEmail();
      setUser(tempEmail);
      if (tempEmail) {
        const response = await fetch(
          `http://localhost:4001/customer/transactions/${tempEmail}`
        );
        const data = await response.json();
        console.log("All Transations pre : ", data.transactions);
        setTransactions(data.transactions);
        console.log("All Transations : ", allTransactions);
      }
    };

    getTransaction();
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ fontFamily: "Prompt", fontWeight: "500" }}
    >
      {/* Navbar */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      onClick={navigateToPrivacy}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Privacy and Security
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Account Dashboard
          </h1>

          {/* Account details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Account Balance */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Total Balance
                </h3>
                <div className="mt-2 text-3xl font-bold text-[#ff4e4e]">
                  $12,345.67
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Available: $10,234.56
                </p>
              </div>
            </div>

            {/* Account Number */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Account Number
                </h3>
                <div className="mt-2 text-xl text-gray-900">
                  **** **** **** 1234
                </div>
                <p className="mt-1 text-sm text-gray-500">Savings Account</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quick Actions
                </h3>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={navigateToStatement}
                    className="w-full bg-[#ff4e4e] text-white px-4 py-2 rounded hover:bg-red-900 transition duration-150 ease-in-out"
                  >
                    My Statements
                  </button>
                  <button onClick={getStatementOnEmail} className="w-full bg-[#04b17a] text-white px-4 py-2 rounded hover:bg-green-500 transition duration-150 ease-in-out">
                    Get Statements on Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0
                            ? `+${transaction.amount}`
                            : `${transaction.amount}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.balance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
