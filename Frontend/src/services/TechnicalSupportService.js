// TechnicalSupportService.js

import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/technicalsupport';

const logFault = async (logFaultRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/support/faults`, logFaultRequest, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging fault:', error);
    throw error;
  }
};

const updateFaultLog = async (updateFaultLogRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/support/faults/update`, updateFaultLogRequest, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating fault log:', error);
    throw error;
  }
};

const viewEndOfSupportDates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/support/end-of-support-dates`, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching end of support dates:', error);
    throw error;
  }
};

const updateDeviceDates = async (hardwareUpdateDTO) => {
  try {
    console.log(hardwareUpdateDTO);
    const response = await axios.post(`${BASE_URL}/update/device`, hardwareUpdateDTO, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating device dates:', error);
    throw error;
  }
};

const updateSoftwareDates = async (softwareupdatedto) => {
  try {
    console.log(softwareupdatedto);
    const response = await axios.post(`${BASE_URL}/update/software`, softwareupdatedto, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating software dates:', error);
    throw error;
  }
};

const viewAllRequestLog = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/viewAllRequestLog`, {
      headers: {
        ...authHeader(),
      },
    });
    // Log entire response object
    return response.data;
  } catch (error) {
    console.error('Error fetching all request logs:', error);
    throw error;
  }
};

const deleteRequestLogById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/requestlog/${id}`, {
      headers: {
        ...authHeader(),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error deleting request log with ID ${id}:`, error);
    throw error;
  }
};

const TechnicalSupportService = {
  logFault,
  updateFaultLog,
  viewEndOfSupportDates,
  updateDeviceDates,
  updateSoftwareDates,
  viewAllRequestLog,
  deleteRequestLogById
};

export default TechnicalSupportService;
