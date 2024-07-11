import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceService from '../services/DeviceService';

const SoftwareManagementPage = () => {
  const initialSoftwareState = {
    softwareName: '',
    version: '',
    licenseKey: '',
    purchaseDate: '',
    expirationDate: '',
    supportEndDate: '',
    status: '',
    dateOfLastRenewal: ''
  };

  const [newSoftware, setNewSoftware] = useState(initialSoftwareState);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    // Fetch all devices when component mounts
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    DeviceService.getAllDevices()
      .then(response => {
        setDevices(response); // Set the retrieved devices to the state
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
        alert('An error occurred while fetching devices');
      });
  };

  const handleSoftwareInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'selectedDeviceId') {
      setSelectedDeviceId(value);
    } else {
      setNewSoftware(prevSoftware => ({
        ...prevSoftware,
        [name]: value
      }));
    }
  };

  const handleSubmitSoftware = (e) => {
    e.preventDefault();

    // Ensure a device is selected before submitting
    if (!selectedDeviceId) {
      alert('Please select a device');
      return;
    }

    DeviceService.addSoftwareToDevice(selectedDeviceId, newSoftware)
      .then(() => {
        alert('Software added successfully');
        setNewSoftware(initialSoftwareState); // Resetting software state after successful addition
      })
      .catch(error => {
        console.error('Error adding software:', error);
        alert('An error occurred while adding software');
      });
  };

  return (
    <div className="container">
      <h2>Software Management Page</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmitSoftware}>
          <div className="mb-3">
            <label htmlFor="softwareName" className="form-label">Software Name:</label>
            <input type="text" className="form-control" id="softwareName" name="softwareName" value={newSoftware.softwareName} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="version" className="form-label">Version:</label>
            <input type="text" className="form-control" id="version" name="version" value={newSoftware.version} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseKey" className="form-label">License Key:</label>
            <input type="text" className="form-control" id="licenseKey" name="licenseKey" value={newSoftware.licenseKey} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
            <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={newSoftware.purchaseDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="expirationDate" className="form-label">Expiration Date:</label>
            <input type="date" className="form-control" id="expirationDate" name="expirationDate" value={newSoftware.expirationDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="supportEndDate" className="form-label">Support End Date:</label>
            <input type="date" className="form-control" id="supportEndDate" name="supportEndDate" value={newSoftware.supportEndDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <select className="form-select" id="status" name="status" value={newSoftware.status} onChange={handleSoftwareInputChange} required>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfLastRenewal" className="form-label">Date of Last Renewal:</label>
            <input type="date" className="form-control" id="dateOfLastRenewal" name="dateOfLastRenewal" value={newSoftware.dateOfLastRenewal} onChange={handleSoftwareInputChange} required />
          </div>
          {/* Dropdown for selecting device */}
          <div className="mb-3">
            <label htmlFor="selectedDeviceId" className="form-label">Select Device:</label>
            <select className="form-select" id="selectedDeviceId" name="selectedDeviceId" value={selectedDeviceId} onChange={handleSoftwareInputChange} required>
              <option value="">Select Device</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>{device.deviceName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Software</button>
        </form>
      </div>
    </div>
  );
};

export default SoftwareManagementPage;
