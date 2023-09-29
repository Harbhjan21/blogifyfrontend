import axios from "axios";
import { API } from "../Backend";

const AuthService = {
  register: (user) => {
    return axios.post(`${API}/auth/signup`, user);
  },
  login: (user) => {
    return axios.post(`${API}/auth/signin`, user);
  },
};

export default AuthService;
