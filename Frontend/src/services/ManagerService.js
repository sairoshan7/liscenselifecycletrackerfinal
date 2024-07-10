import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api/management";

const viewAllLifecycleEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lifecycle-events`, {
      headers: {
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ManagerService = {
  viewAllLifecycleEvents,
};

export default ManagerService;
