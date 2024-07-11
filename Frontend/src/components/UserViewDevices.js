import React, { useState, useEffect } from 'react';
import RegularUserService from '../services/RegularUserService';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AuthService from '../services/auth.service';

const UserViewDevices = () => {
  const [devices, setDevices] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); 

  useEffect(() => {
    fetchUserDevices(); 
  }, []);


  const fetchUserDevices = async () => {
    try {
      const currentUser = AuthService.getCurrentUser(); 
      const response = await RegularUserService.viewDevices(currentUser.id);
      setDevices(response);
      setErrorState(false); 
    } catch (error) {
      console.error('Error fetching devices:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch devices.'); 
    }
  };

  // Function to handle replacement request
  const handleReplacementRequest = async (device) => {
    try {
      const replaceDTO = {
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        deviceType: device.deviceType
      };
      const response = await RegularUserService.requestReplacement(replaceDTO);

      // Update devices state without modifying dateOfLastReplacement
      const updatedDevices = devices.map(d => {
        if (d.deviceId === device.deviceId) {
          return {
            ...d
          };
        }
        return d;
      });
      setDevices(updatedDevices);

      // Show alert with response message
      alert('Replacement requested successfully!'); // Modify alert as needed

      console.log('Request Replacement Response:', response); // Log response from backend

    } catch (error) {
      console.error('Error requesting replacement:', error);
      // Handle error as needed
      alert('Failed to request replacement.'); // Show error message to user
    }
  };

  // Function to handle search based on selected search type
  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === '') {
        fetchUserDevices(); // Reset to original devices list
        return;
      }

      let response;
      switch (searchType) {
        case 'name':
          response = await RegularUserService.searchDevicesByName(searchTerm);
          break;
        case 'status':
          response = await RegularUserService.searchDevicesByStatus(searchTerm);
          break;
        case 'type':
          response = await RegularUserService.searchDevicesByType(searchTerm);
          break;
        default:
          return;
      }
      setDevices(response); // Update devices state with search result
      setErrorState(false); // Reset error state
    } catch (error) {
      console.error('Error searching devices:', error);
      setErrorState(true);
      setErrorMessage('Failed to search devices.'); // Set error message
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Devices</h2>
      <div className="mb-3">
        <select
          className="form-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Search by Name</option>
          <option value="status">Search by Status</option>
          <option value="type">Search by Type</option>
        </select>
        <input
          type="text"
          className="form-control mt-2"
          placeholder={`Enter ${searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress on key press
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Purchase Date</th>
            <th>End Of Life</th>
            <th>End of Support Date</th>
            <th>Status</th>
            <th>Last Replacement Date</th> {/* New column for dateOfLastReplacement */}
            <th>Action</th> {/* New column for Action button */}
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.deviceId}>
              <td>{device.deviceName}</td>
              <td>{device.deviceType}</td>
              <td>{device.purchaseDate}</td>
              <td>{device.endOfLife}</td>
              <td>{device.endOfSupportDate}</td>
              <td>{device.status}</td>
              <td>{device.dateOfLastReplacement}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReplacementRequest(device)}
                >
                  Request Replacement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserViewDevices;
