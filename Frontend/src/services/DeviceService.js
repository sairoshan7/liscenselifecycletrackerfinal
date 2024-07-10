
 

import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api";

// Function to fetch the authentication token (replace with your actual logic)
const fetchAuthToken = async () => {
  // Implement your token retrieval logic here
  // For example, fetching from localStorage or sessionStorage
  const token = localStorage.getItem('accessToken'); // Replace with your actual token retrieval logic
  return token;
};

// Axios instance with default headers and request interceptor
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  async config => {
    const token = await fetchAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Error handler interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Add device with token in headers
const addDevice = async (device) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/addDevices`, device, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
// Update device with token in headers
const updateDevice = async (deviceId, deviceDTO) => {
  try {
    const response = await axios.put(`${BASE_URL}/admin/update/${deviceId}`, deviceDTO, {
      headers: {
         ...authHeader() ,
        'Access-Control-Allow-Origin': '*'
        }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Delete device with token in headers
const deleteDevice = async (deviceId) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/delete`,deviceId,  {
      headers: {
        ...authHeader(),
        'Access-Control-Allow-Origin': '*', // Ensure CORS is configured properly
        // Add any additional headers if needed
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Get device by ID with token in headers
const getDeviceById = async (deviceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/getdevice/${deviceId}`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const addSoftwareToDevice = async (deviceId, softwareDTO) => {
  try {
    // First, fetch the device details by deviceId
    const response1 = await getDeviceById(deviceId);
    console.log(response1);
    const device = response1;

    // Add the software to the device object
    const updatedDevice = {
      ...device,
      softwareList: [...device.softwareList, softwareDTO]
    };

    // Send a PUT request to update the device with the added software
    const response = await axiosInstance.post(`/admin/${deviceId}/addSoftware`,softwareDTO, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const addLifecycleEventToDevice = async (deviceId, lifecycleEventDTO) => {
  try {
    // First, fetch the device details by deviceId
    const response2 = await getDeviceById(deviceId);
    console.log(response2);
    const device = response2;
    console.log(lifecycleEventDTO);

    // Construct the updated device object with the new lifecycle event
    // const updatedDevice = {
    //   ...device,
    //   lifecycleEvent: [...device.lifecycleEvent, lifecycleEventDTO]
    // };

    // Send a POST request to add the lifecycle event to the device
    const response = await axiosInstance.post(`${BASE_URL}/admin/${deviceId}/lifecycle-events`, lifecycleEventDTO, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};


const DeviceService = {
  addDevice,
  updateDevice,
  deleteDevice,
  getDeviceById,
  addSoftwareToDevice,
  addLifecycleEventToDevice,
};

export default DeviceService;
