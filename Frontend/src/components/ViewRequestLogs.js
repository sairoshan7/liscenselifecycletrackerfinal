import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import TechnicalSupportService from '../services/TechnicalSupportService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ViewRequestLogs = () => {
  const [requestLogs, setRequestLogs] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchAllRequestLogs();
  }, []);

  const fetchAllRequestLogs = async () => {
    try {
      const response = await TechnicalSupportService.viewAllRequestLog();
      console.log('Response Data:', response); // Log response.data to console
      setRequestLogs(response); // Assuming response.data is an array of request log objects
      setErrorState(false); // Reset error state
    } catch (error) {
      console.error('Error fetching request logs:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch request logs.'); // Set error message
    }
  };

  const handleConfirmAction = (logId, assetid) => {
    // Navigate to RenewForm or ReplaceForm based on the type of action
    const log = requestLogs.find(log => log.assetid === assetid && log.logId === logId);
    if (!log) {
      console.error('Log not found for asset ID and log ID:', assetid, logId);
      return;
    }

    switch (log.type) {
      case 'Renew':
        navigate(`/renew/${logId}/${assetid}`); // Navigate to RenewForm with logId and assetid
        break;
      case 'Replace':
        navigate(`/replace/${logId}/${assetid}`); // Navigate to ReplaceForm with logId and assetid
        break;
      default:
        console.error(`Unknown log type: ${log.type}`);
        // Optionally handle the case where the log type is unknown or not handled
        break;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Request Logs</h2>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset ID</th>
            <th>Type</th>
            <th>Item</th>
            <th>Details</th>
            <th>Request Date</th>
            <th>Action</th> {/* Added Action column header */}
          </tr>
        </thead>
        <tbody>
          {requestLogs.map((log) => (
            <tr key={log.logId}>
              <td>{log.logId}</td>
              <td>{log.assetid}</td>
              <td>{log.type}</td>
              <td>{log.item}</td>
              <td>{log.details}</td>
              <td>{log.requestDate}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleConfirmAction(log.logId, log.assetid)}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequestLogs;
