import React, { useState } from 'react';
import DeviceService from '../services/DeviceService';
 
const DeleteDeviceForm = () => {
  const [deviceId, setDeviceId] = useState('');
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await DeviceService.deleteDevice(deviceId);
      alert('Device deleted successfully.');
      setDeviceId(''); // Clear input after successful deletion
    } catch (error) {
      console.error('Error deleting device:', error);
      setError('Failed to delete device.');
    }
  };
 
  const handleDeviceIdChange = (e) => {
    setDeviceId(e.target.value);
  };
 
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 rounded">
            <h2 className="mb-4">Delete Device</h2>
            <form onSubmit={handleDelete}>
              <div className="form-group">
                <label htmlFor="deviceId">Enter Device ID:</label>
                <input
                  type="text"
                  id="deviceId"
                  name="deviceId"
                  value={deviceId}
                  onChange={handleDeviceIdChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger mb-3">
                Delete Device
              </button>
              {error && <p className="text-danger">{error}</p>}
              {responseMessage && <p className="mt-4">{responseMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DeleteDeviceForm;