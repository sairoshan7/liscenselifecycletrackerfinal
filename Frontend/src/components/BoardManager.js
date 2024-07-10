import React, { useState, useEffect } from 'react';
import ManagerService from '../services/ManagerService';
import 'bootstrap/dist/css/bootstrap.min.css';

const BoardManager = () => {
  const [lifecycleEvents, setLifecycleEvents] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLifecycleEvents();
  }, []);

  const fetchLifecycleEvents = async () => {
    try {
      const events = await ManagerService.viewAllLifecycleEvents();
      setLifecycleEvents(events);
      setErrorState(false); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching lifecycle events:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch lifecycle events.'); // Set error message on fetch error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Board Management</h2>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Device ID</th>
            <th>Event Type</th>
            <th>Event Date</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {lifecycleEvents.map(event => (
            <tr key={event.eventId}>
              <td>{event.eventId}</td>
              <td>{event.deviceId}</td> {/* Displaying device ID */}
              <td>{event.eventType}</td>
              <td>{event.eventDate}</td>
              <td>{event.description}</td>
              <td>{event.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardManager;
