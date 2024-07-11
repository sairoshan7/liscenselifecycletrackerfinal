import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceService from '../services/DeviceService';

const LifecycleEventManagementPage = () => {
  const initialEventState = {
    eventType: '',
    eventDate: '',
    description: '',
    category: ''
  };

  const [newEvent, setNewEvent] = useState(initialEventState);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const devices = await DeviceService.getAllDevices();
      setDevices(devices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setError('Failed to fetch devices');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDeviceId) {
      alert('Please select a device');
      return;
    }

    try {
      setLoading(true);
      const response = await DeviceService.addLifecycleEventToDevice(selectedDeviceId, newEvent);
      setEvents([...events, response]);
      setNewEvent(initialEventState);
      setLoading(false);
      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      setLoading(false);
      alert('Failed to add event');
    }
  };

  return (
    <div className="container">
      <h2>Lifecycle Event Management</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="eventType" className="form-label">Event Type:</label>
            <input type="text" className="form-control" id="eventType" name="eventType" value={newEvent.eventType} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">Event Date:</label>
            <input type="date" className="form-control" id="eventDate" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" name="description" value={newEvent.description} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <input type="text" className="form-control" id="category" name="category" value={newEvent.category} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="selectedDeviceId" className="form-label">Select Device:</label>
            <select
              className="form-select"
              id="selectedDeviceId"
              name="selectedDeviceId"
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              required
            >
              <option value="">Select Device</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>{device.deviceName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default LifecycleEventManagementPage;
