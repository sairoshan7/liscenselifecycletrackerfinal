import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const BASE_URL = "http://localhost:8080/api/user"; // Adjusted base URL for user-specific endpoints

const viewDevices = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/devices/${userId}`, {
      headers: { ...authHeader(),
        'Access-Control-Allow-Origin': '*',
       }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const viewSoftwareByDeviceName = async (deviceName) => {
  try {
    const response = await axios.get(`${BASE_URL}/software/${deviceName}`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const requestRenew = async (softwareDTO) => {
  try {
    const response = await axios.post(`${BASE_URL}/renew`, softwareDTO, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const requestReplacement = async (replaceDTO) => {
  try {
    const response = await axios.post(`${BASE_URL}/replace`, replaceDTO, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const RegularUserService = {
  viewDevices,
  viewSoftwareByDeviceName,
  requestRenew,
  requestReplacement,
  // Add other functions for searching devices and software as needed
};

export default RegularUserService;
