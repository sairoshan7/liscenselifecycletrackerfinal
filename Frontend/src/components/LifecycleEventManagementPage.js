
import React, { useState } from 'react';
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
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deviceId') {
      setDeviceId(value);
    } else {
        setNewEvent(prevEvent => ({
        ...prevEvent,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure deviceId is provided before adding an event
    if (!deviceId) {
      alert('Please enter a Device ID');
      return;
    }

    const eventData = {
      ...newEvent // Assuming deviceId needs to be an integer
    };

    DeviceService.addLifecycleEventToDevice(deviceId, eventData)

      .then(response => {
        setEvents([...events, response]);
        setNewEvent(initialEventState);
        alert('Event added successfully');
      })
      .catch(error => {
        console.error('Error adding event:', error);
        alert('Failed to add event');
      });
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
            <label htmlFor="deviceId" className="form-label">Device ID:</label>
            <input type="text" className="form-control" id="deviceId" name="deviceId" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default LifecycleEventManagementPage;
