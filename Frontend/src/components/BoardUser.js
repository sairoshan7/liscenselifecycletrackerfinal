import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../styles/BoardUser.css";
 

const BoardUser = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State for selected option

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    const selectedPage = event.target.value; // Get selected page from dropdown
    setSelectedOption(selectedPage); // Set selected option state

    // Navigate to the selected page
    if (selectedPage === "device") {
      window.location.href = "/user/view-devices";
    } else if (selectedPage === "software") {
      window.location.href = "/user/view-software";
    }
  };

  return (
    <div className="container mt-5 board-user-container">
      <header className="jumbotron board-user-header">
        <h2 className="text-center">User Dashboard</h2>
        <div className="form-group mt-3">
          <label htmlFor="viewSelect">Select View:</label>
          <select
            id="viewSelect"
            value={selectedOption}
            onChange={handleDropdownChange}
            className="form-control"
          >
            <option value="">Select an option</option>
            <option value="device">View Devices</option>
            <option value="software">View Software</option>
          </select>
        </div>
      </header>
    </div>
  );
};

export default BoardUser;