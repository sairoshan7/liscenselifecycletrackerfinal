import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import TechnicalSupportService from '../services/TechnicalSupportService'; // Import TechnicalSupportService

const RenewForm = () => {
    const { logId, assetid } = useParams(); // Get logId and assetId from URL params
    const [expirationDate, setExpirationDate] = useState('');
    const [endOfSupportDate, setEndOfSupportDate] = useState('');

    const handleUpdate = async () => {
        try {
            // Prepare softwareUpdateDTO object
            const softwareUpdateDTO = {
                softwareId: assetid, // Ensure assetId is parsed to Integer if necessary
                expirationDate: expirationDate,
                supportEndDate: endOfSupportDate,
            };

            // Call updateSoftwareDates API
            console.log(softwareUpdateDTO);
            const updateResponse = await TechnicalSupportService.updateSoftwareDates(softwareUpdateDTO);
            console.log('Update Software Response:', updateResponse); // Log response if needed

            // Delete request log after successful update
            const deleteResponse = await TechnicalSupportService.deleteRequestLogById(logId);
            console.log('Delete Request Log Response:', deleteResponse); // Log response if needed

            // Optionally, add feedback to the user on successful update and deletion
            alert('Software dates updated successfully ');
        } catch (error) {
            console.error('Error updating software dates ', error);
            // Handle error scenario as needed (e.g., show error message to user)
            alert('Failed to update software dates');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Renew Form</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
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

export default RenewForm;
