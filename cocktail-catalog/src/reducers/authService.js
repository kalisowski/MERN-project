import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ADMIN + 'login/';

const loginAdmin = async (adminData) => {
  const response = await axios.post(API_URL, adminData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logoutAdmin = async () => {
  localStorage.removeItem('user');
};

const authService = {
  loginAdmin,
  logoutAdmin,
};

export default authService;
