import React, { useState, useEffect } from 'react';
import RegularUserService from '../services/RegularUserService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AuthService from '../services/auth.service';

const UserViewSoftware = () => {
  const [deviceName, setDeviceName] = useState('');
  const [software, setSoftware] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch software by device name
  const fetchSoftwareByDeviceName = async () => {
    try {
      const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
      setSoftware(response); // Set software state with fetched data
      setErrorState(false); // Reset error state
    } catch (error) {
      console.error('Error fetching software:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch software.'); // Set error message
    }
  };

  // Function to handle renewal request
  const handleRenewalRequest = async (softwareId, softwareName, version) => {
    try {
      const softwareDTO = {
        softwareId,
        softwareName,
        version
      };
      await RegularUserService.requestRenew(softwareDTO);

      // Refresh software list after successful renewal request
      fetchSoftwareByDeviceName();

      // Show alert with success message
      alert('Renewal requested successfully!'); // Modify alert as needed

    } catch (error) {
      console.error('Error requesting renewal:', error);
      // Handle error as needed
      alert('Failed to request renewal.'); // Show error message to user
    }
  };

  // Handle form submission to fetch software
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (deviceName.trim() === '') {
      setErrorState(true);
      setErrorMessage('Please enter a device name.');
      return;
    }
    fetchSoftwareByDeviceName();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Software by Device Name</h2>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="deviceName">Enter Device Name:</label>
          <input
            type="text"
            className="form-control"
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search Software
        </button>
      </form>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>License Key</th>
            <th>Version</th>
            <th>Purchase Date</th>
            <th>Expiration Date</th>
            <th>Support End Date</th>
            <th>Date of Last Renewal</th>
            <th>Status</th>
            <th>Action</th> {/* New column for action button */}
          </tr>
        </thead>
        <tbody>
          {software.map(softwareItem => (
            <tr key={softwareItem.softwareId}>
              <td>{softwareItem.softwareName}</td>
              <td>{softwareItem.licenseKey}</td>
              <td>{softwareItem.version}</td>
              <td>{softwareItem.purchaseDate}</td>
              <td>{softwareItem.expirationDate}</td>
              <td>{softwareItem.supportEndDate}</td>
              <td>{softwareItem.dateOfLastRenewal}</td>
              <td>{softwareItem.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
                >
                  Request Renewal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserViewSoftware;
