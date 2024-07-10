import React, { useState, useEffect } from 'react';
import TechnicalSupportService from '../services/TechnicalSupportService'; // Import TechnicalSupportService
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewEndOfSupportDates = () => {
  const [supportDates, setSupportDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupportDates();
  }, []);

  const fetchSupportDates = async () => {
    setLoading(true);
    try {
      const dates = await TechnicalSupportService.viewEndOfSupportDates(); // Call viewEndOfSupportDates function
      setSupportDates(dates);
    } catch (error) {
      console.error('Error fetching support dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-3">End of Support Dates</h2>
      {loading && <p>Loading...</p>}
      <ul className="list-group">
        {supportDates.map((date, index) => (
          <li key={index} className="list-group-item">{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEndOfSupportDates;
