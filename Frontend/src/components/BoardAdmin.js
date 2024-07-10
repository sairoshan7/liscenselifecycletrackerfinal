

import React, { useState, useEffect } from "react";
import "../styles/BoardAdmin.css";

const BoardAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    const selectedPage = event.target.value;
    setSelectedOption(selectedPage);

    switch (selectedPage) {
      case "device":
        window.location.href = "/admin/device-management";
        break;
      case "software":
        window.location.href = "/admin/software-management";
        break;
      case "lifecycleEvent":
        window.location.href = "/admin/lifecycleEvent-management";
        break;
      case "updateuserrole":
        window.location.href = "/admin/updateuserrole-management";
        break;
      case "updatedeviceform":
        window.location.href = "/admin/updatedeviceform";
        break;
      case "deletedeviceform":
        window.location.href = "/admin/deletedeviceform";
        break;
      default:
        // Handle default case if needed
        break;
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header jumbotron">
      <h1 className="admin-heading">Admin Dashboard</h1>
        <label htmlFor="crud" className="admin-dropdown-label">CRUD operations:</label>
        <select id="crud" className="admin-form-select form-select" value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          <option value="device">Device Management</option>
          <option value="software">Software Management</option>
          <option value="lifecycleEvent">Lifecycle Event Management</option>
          <option value="updateuserrole">Update User Role</option>
          <option value="updatedeviceform">Update Device Form</option>
          <option value="deletedeviceform">Delete Device Form</option>
        </select>
      </header>
    </div>
  );
};

export default BoardAdmin;