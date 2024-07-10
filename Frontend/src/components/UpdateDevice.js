


import React, { useState, useEffect } from 'react';
import DeviceService from '../services/DeviceService';

const UpdateDevice = ({ device, setResponseMessage, setError }) => {
  const [updatedDevice, setUpdatedDevice] = useState({
    deviceId: device.deviceId,
    deviceName: device.deviceName,
    deviceType: device.deviceType,
    purchaseDate: device.purchaseDate,
    endOfLife: device.endOfLife,
    endOfSupportDate: device.endOfSupportDate,
    status: device.status,
    dateOfLastReplacement: device.dateOfLastReplacement,
    user: {
      userId: device.user.userId
    },
    softwareList: device.softwareList.map(software => ({
      softwareId: software.softwareId,
      softwareName: software.softwareName,
      version: software.version,
      licenseKey: software.licenseKey,
      purchaseDate: software.purchaseDate,
      expirationDate: software.expirationDate,
      supportEndDate: software.supportEndDate,
      status: software.status,
      dateOfLastRenewal: software.dateOfLastRenewal
    })),
    lifecycleEvent: {
      eventId: device.lifecycleEvent.eventId,
      eventType: device.lifecycleEvent.eventType,
      eventDate: device.lifecycleEvent.eventDate,
      description: device.lifecycleEvent.description,
      category: device.lifecycleEvent.category
    }
  });

  // Update state when props change
  useEffect(() => {
    setUpdatedDevice({
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      deviceType: device.deviceType,
      purchaseDate: device.purchaseDate,
      endOfLife: device.endOfLife,
      endOfSupportDate: device.endOfSupportDate,
      status: device.status,
      dateOfLastReplacement: device.dateOfLastReplacement,
      user: {
        userId: device.user.userId
      },
      softwareList: device.softwareList.map(software => ({
        softwareId: software.softwareId,
        softwareName: software.softwareName,
        version: software.version,
        licenseKey: software.licenseKey,
        purchaseDate: software.purchaseDate,
        expirationDate: software.expirationDate,
        supportEndDate: software.supportEndDate,
        status: software.status,
        dateOfLastRenewal: software.dateOfLastRenewal
      })),
      lifecycleEvent: {
        eventId: device.lifecycleEvent.eventId,
        eventType: device.lifecycleEvent.eventType,
        eventDate: device.lifecycleEvent.eventDate,
        description: device.lifecycleEvent.description,
        category: device.lifecycleEvent.category
      }
    });
  }, [device]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the input field is in the softwareList array
    if (name.startsWith('softwareList')) {
      const [, index, fieldName] = name.match(/softwareList\[(\d+)\]\.(.*)/);
      
      // Create a copy of the updatedDevice state
      const updatedDeviceCopy = { ...updatedDevice };
      
      // Update the specific field in the softwareList array
      updatedDeviceCopy.softwareList[index][fieldName] = value;
      
      // Update the state with the modified softwareList
      setUpdatedDevice(updatedDeviceCopy);
    } else {
      // Handle other fields not in softwareList (top-level or nested)
      if (name.includes('.')) {
        const fieldNames = name.split('.'); // Split into an array of field names
        let nestedObject = { ...updatedDevice }; // Start with a copy of updatedDevice
    
        // Traverse nested objects, creating empty objects if they don't exist
        for (let i = 0; i < fieldNames.length - 1; i++) {
          if (!nestedObject[fieldNames[i]]) {
            nestedObject[fieldNames[i]] = {}; // Initialize if not defined
          }
          nestedObject = nestedObject[fieldNames[i]]; // Move to the next nested level
        }
    
        nestedObject[fieldNames[fieldNames.length - 1]] = value; // Update the leaf node value
    
        setUpdatedDevice({ ...updatedDevice }); // Update state
      } else {
        setUpdatedDevice({ ...updatedDevice, [name]: value }); // Update top-level fields
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await DeviceService.updateDevice(updatedDevice.deviceId, updatedDevice);
      window.alert('Device updated successfully.');
    } catch (error) {
      console.error('Error updating device:', error);
      setError('Error updating device.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="deviceId">Device ID:</label>
        <input
          type="number"
          id="deviceId"
          name="deviceId"
          value={updatedDevice.deviceId}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deviceName">Device Name:</label>
        <input
          type="text"
          id="deviceName"
          name="deviceName"
          value={updatedDevice.deviceName}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deviceType">Device Type:</label>
        <input
          type="text"
          id="deviceType"
          name="deviceType"
          value={updatedDevice.deviceType}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="purchaseDate">Purchase Date:</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={updatedDevice.purchaseDate}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="endOfLife">End of Life:</label>
        <input
          type="date"
          id="endOfLife"
          name="endOfLife"
          value={updatedDevice.endOfLife}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="endOfSupportDate">End of Support Date:</label>
        <input
          type="date"
          id="endOfSupportDate"
          name="endOfSupportDate"
          value={updatedDevice.endOfSupportDate}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={updatedDevice.status}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfLastReplacement">Date of Last Replacement:</label>
        <input
          type="date"
          id="dateOfLastReplacement"
          name="dateOfLastReplacement"
          value={updatedDevice.dateOfLastReplacement}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userUserId">User ID:</label>
        <input
          type="number"
          id="userUserId"
          name="user.userId"
          value={updatedDevice.user.userId}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      {/* Render software list fields dynamically */}
      {updatedDevice.softwareList.map((software, index) => (
        <div key={`softwareList${index}`} className="border p-3 mb-3">
          <h4>Software {index + 1}</h4>
          <div className="form-group">
            <label htmlFor={`softwareList${index}SoftwareId`}>Software ID:</label>
            <input
              type="number"
              id={`softwareList${index}SoftwareId`}
              name={`softwareList[${index}].softwareId`}
              value={software.softwareId}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}SoftwareName`}>Software Name:</label>
            <input
              type="text"
              id={`softwareList${index}SoftwareName`}
              name={`softwareList[${index}].softwareName`}
              value={software.softwareName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}Version`}>Software Version:</label>
            <input
              type="text"
              id={`softwareList${index}Version`}
              name={`softwareList[${index}].version`}
              value={software.version}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}LicenseKey`}>License Key:</label>
            <input
              type="text"
              id={`softwareList${index}LicenseKey`}
              name={`softwareList[${index}].licenseKey`}
              value={software.licenseKey}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}PurchaseDate`}>Software Purchase Date:</label>
            <input
              type="date"
              id={`softwareList${index}PurchaseDate`}
              name={`softwareList[${index}].purchaseDate`}
              value={software.purchaseDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}ExpirationDate`}>Software Expiration Date:</label>
            <input
              type="date"
              id={`softwareList${index}ExpirationDate`}
              name={`softwareList[${index}].expirationDate`}
              value={software.expirationDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}SupportEndDate`}>Software Support End Date:</label>
            <input
              type="date"
              id={`softwareList${index}SupportEndDate`}
              name={`softwareList[${index}].supportEndDate`}
              value={software.supportEndDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}Status`}>Software Status:</label>
            <input
              type="text"
              id={`softwareList${index}Status`}
              name={`softwareList[${index}].status`}
              value={software.status}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`softwareList${index}DateOfLastRenewal`}>Software Last Renewal Date:</label>
            <input
              type="date"
              id={`softwareList${index}DateOfLastRenewal`}
              name={`softwareList[${index}].dateOfLastRenewal`}
              value={software.dateOfLastRenewal}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
      ))}
      {/* Lifecycle event fields */}
      <div className="form-group">
        <label htmlFor="lifecycleEventEventId">Lifecycle Event ID:</label>
        <input
          type="number"
          id="lifecycleEventEventId"
          name="lifecycleEvent.eventId"
          value={updatedDevice.lifecycleEvent.eventId}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lifecycleEventEventType">Lifecycle Event Type:</label>
        <input
          type="text"
          id="lifecycleEventEventType"
          name="lifecycleEvent.eventType"
          value={updatedDevice.lifecycleEvent.eventType}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lifecycleEventEventDate">Lifecycle Event Date:</label>
        <input
          type="date"
          id="lifecycleEventEventDate"
          name="lifecycleEvent.eventDate"
          value={updatedDevice.lifecycleEvent.eventDate}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lifecycleEventDescription">Lifecycle Event Description:</label>
        <input
          type="text"
          id="lifecycleEventDescription"
          name="lifecycleEvent.description"
          value={updatedDevice.lifecycleEvent.description}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lifecycleEventCategory">Lifecycle Event Category:</label>
        <input
          type="text"
          id="lifecycleEventCategory"
          name="lifecycleEvent.category"
          value={updatedDevice.lifecycleEvent.category}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      {/* Add more input fields as needed */}
      <button type="submit" className="btn btn-primary">
        Update Device
      </button>
    </form>
  );
};

export default UpdateDevice;
