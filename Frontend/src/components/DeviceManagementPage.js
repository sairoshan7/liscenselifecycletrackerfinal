import React, { useState, useEffect } from 'react';
import DeviceService from '../services/DeviceService';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeviceManagementPage = () => {
  const initialDeviceState = {
    deviceName: '',
    deviceType: '',
    purchaseDate: '',
    endOfLife: '',
    endOfSupportDate: '',
    status: '',
    dateOfLastReplacement: '',
    user: {
      userId: null
    }
  };

  const [newDevice, setNewDevice] = useState(initialDeviceState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    DeviceService.getAllUsers()
      .then(response => {
        setUsers(response); // Set the retrieved users to the state
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('An error occurred while fetching users');
      });
  };

  const handleDeviceInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const nestedKeys = name.split('.');
      setNewDevice(prevDevice => ({
        ...prevDevice,
        [nestedKeys[0]]: {
          ...prevDevice[nestedKeys[0]],
          [nestedKeys[1]]: value
        }
      }));
    } else {
      setNewDevice(prevDevice => ({
        ...prevDevice,
        [name]: value
      }));
    }
  };

  const handleSubmitDevice = (e) => {
    e.preventDefault();
    DeviceService.addDevice(newDevice)
      .then(() => {
        alert('Device added successfully');
        setNewDevice(initialDeviceState); // Resetting to initial state after successful submission
      })
      .catch(error => {
        console.error('Error adding device:', error);
        alert('An error occurred while adding device');
      });
  };

  return (
    <div className="container">
      <h2 className="page-title">Device Management Page</h2>
      <div className="card card-container">
        {/* Form to add a new device */}
        <form onSubmit={handleSubmitDevice}>
          <div className="form-group">
            <label htmlFor="deviceName">Device Name:</label>
            <input type="text" className="form-control" id="deviceName" name="deviceName" value={newDevice.deviceName} onChange={handleDeviceInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type:</label>
            <input type="text" className="form-control" id="deviceType" name="deviceType" value={newDevice.deviceType} onChange={handleDeviceInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date:</label>
            <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={newDevice.purchaseDate} onChange={handleDeviceInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="endOfLife">End of Life:</label>
            <input type="date" className="form-control" id="endOfLife" name="endOfLife" value={newDevice.endOfLife} onChange={handleDeviceInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="endOfSupportDate">End of Support Date:</label>
            <input type="date" className="form-control" id="endOfSupportDate" name="endOfSupportDate" value={newDevice.endOfSupportDate} onChange={handleDeviceInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select className="form-control" id="status" name="status" value={newDevice.status} onChange={handleDeviceInputChange} required>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Unsupported">Unsupported</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dateOfLastReplacement">Date of Last Replacement:</label>
            <input type="date" className="form-control" id="dateOfLastReplacement" name="dateOfLastReplacement" value={newDevice.dateOfLastReplacement} onChange={handleDeviceInputChange} required />
          </div>

          {/* Dropdown for selecting user */}
          <div className="form-group">
            <label htmlFor="userId">User:</label>
            <select className="form-control" id="userId" name="user.userId" value={newDevice.user.userId} onChange={handleDeviceInputChange}>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.userId} value={user.userId}>{user.username}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Device</button>
        </form>
      </div>
    </div>
  );
};

export default DeviceManagementPage;
