import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getTechnicalSupportBoard = () => {
  return axios.get(API_URL + "technicalsupport", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getTechnicalSupportBoard,
  getManagerBoard,
  getAdminBoard,
};

export default UserService;
