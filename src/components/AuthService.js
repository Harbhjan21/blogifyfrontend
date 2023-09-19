import axios from "axios";

const AuthService = {
  register: (user) => {
    return axios.post("http://localhost:5000/auth/signup", user);
  },
  login: (user) => {
    return axios.post("http://localhost:5000/auth/signin", user);
  },
};

export default AuthService;
