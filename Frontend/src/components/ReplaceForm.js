import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import TechnicalSupportService from '../services/TechnicalSupportService'; // Import TechnicalSupportService

const ReplaceForm = () => {
    const { logId, assetid } = useParams(); // Get logId and assetId from URL params
    const [endOfLifeDate, setEndOfLifeDate] = useState('');
    const [endOfSupportDate, setEndOfSupportDate] = useState('');

    const handleUpdate = async () => {
        try {
            // Prepare hardwareUpdateDTO object
            const hardwareUpdateDTO = {
                deviceId: assetid, // Ensure assetId is parsed to Integer if necessary
                endOfLife: endOfLifeDate,
                endOfSupportDate: endOfSupportDate,
            };

            // Call updateDeviceDates API
            const response = await TechnicalSupportService.updateDeviceDates(hardwareUpdateDTO);
            console.log('Update Device Dates Response:', response); // Log response if needed

            // Delete request log after successful update
            const deleteResponse = await TechnicalSupportService.deleteRequestLogById(logId);
            console.log('Delete Request Log Response:', deleteResponse); // Log response if needed

            // Optionally, add feedback to the user on successful update and deletion
            alert('Device dates updated successfully');
        } catch (error) {
            console.error('Error updating device dates ', error);
            // Handle error scenario as needed (e.g., show error message to user)
            alert('Failed to update device dates or delete request log.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Replace Form</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="endOfLifeDate" className="form-label">End of Life Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endOfLifeDate"
                        value={endOfLifeDate}
                        onChange={(e) => setEndOfLifeDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endOfSupportDate" className="form-label">End of Support Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endOfSupportDate"
                        value={endOfSupportDate}
                        onChange={(e) => setEndOfSupportDate(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default ReplaceForm;
